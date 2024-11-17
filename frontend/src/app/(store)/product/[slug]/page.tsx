import { AddToCartButton } from "../../../../components/add-to-cart-button";
import { api } from "../../../../data/api";
import { Product } from "../../../../data/product";
import { Metadata } from "next";
import Image from "next/image";

// Next.js v14
// interface ProductProps {
//   params: { slug: string };
// }
interface ProductProps {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string): Promise<Product> {
  console.log(`/api/products/${slug}`);

  const response = await api(`/api/products/${slug}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  });

  const product = await response.json();

  return product;
}

export async function generateMetadata({
  params,
}: ProductProps): Promise<Metadata> {
  const { slug } = await params; // next.js v14 => params.slug (no await needed)

  const product = await getProduct(slug);

  return {
    title: product.title,
  };
}

export async function generateStaticParams() {
  // Since our api is tight coupled to the frontend on this project, it must be running when building it
  const response = await api("/api/products/featured");
  const products: Product[] = await response.json();

  return products.map((product) => {
    return { slug: product.slug };
  });
}

export default async function ProductPage({ params }: ProductProps) {
  const { slug } = await params; // next.js v14 => params.slug (no await needed)

  const product = await getProduct(slug);

  return (
    <div className="relative grid max-h-[860px] grid-cols-3">
      <div className="col-span-2 overflow-hidden">
        <Image
          src={product.image}
          alt=""
          width={1000}
          height={1000}
          quality={100}
        />
      </div>
      <div className="flex flex-col justify-center px-12">
        <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>

        <p className="mt-2 leading-relaxed text-zinc-400">
          {product.description}
        </p>
        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block rounded-full bg-violet-500 px-5 py-2.5 font-semibold">
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
            })}
          </span>
          <span className="text-sm text-zinc-400">
            Em 12x s/juros de{" "}
            {(product.price / 12).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>

        <div className="mt-8 space-y-4">
          <span className="block font-semibold">Tamanhos</span>
          <div className="flex gap-2">
            {Array.from(["P", "M", "G", "GG"]).map((size) => {
              return (
                <button
                  key={size}
                  type="button"
                  className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        <AddToCartButton productId={product.id} />
      </div>
    </div>
  );
}
