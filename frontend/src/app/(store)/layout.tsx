import { CartProvider } from "../../contexts/cart-context";
import { Header } from "../../components/header";
import { ReactNode } from "react";
import { Suspense } from "react";

interface Props {
  children: ReactNode;
}

export default function StoreLayout({ children }: Readonly<Props>) {
  return (
    <CartProvider>
      <div className="mx-auto grid min-h-screen max-w-[1600px] grid-rows-app gap-5 p-8">
        <Suspense>
          <Header />
          {children}
        </Suspense>
      </div>
    </CartProvider>
  );
}
