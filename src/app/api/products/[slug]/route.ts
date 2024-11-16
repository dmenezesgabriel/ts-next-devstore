import data from "../data.json";
import { z } from "zod";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string }> } // { params: { slug: string } } next.js v14
) {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay to simulate real api

  const { slug } = await params; // next.js v14 => params.slug (no await needed)

  const parsedSlug = z.string().parse(slug);

  const product = data.products.find((product) => product.slug === parsedSlug);

  if (!product) {
    return Response.json(
      { message: "Product not found" },
      {
        status: 400,
      }
    );
  }

  return Response.json(product);
}
