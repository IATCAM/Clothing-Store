import { headers } from "next/headers";
import { Iproducts } from "../newArrivals/NewArrivals";
import Products from "../products/Products";

async function TopSelling() {
  const result = await fetch("http://localhost:8000/products?section=top");
  const data = (await result.json()) as Iproducts[];

  const userAgent = headers().get("user-agent") || "";
  const isDesktop = userAgent.includes("Windows") || userAgent.includes("Mac");
  const initialCount = isDesktop ? 4 : 2;
  return (
    <div className="mx-4 lg:mx-24">
      <h1 className="text-center font1 text-2xl mb-8 lg:text-5xl lg:mb-[3.44rem] font-bold tracking-wider">
        TOP SELLING
      </h1>
      <Products data={data} initialCount={initialCount} />
    </div>
  );
}

export default TopSelling;
