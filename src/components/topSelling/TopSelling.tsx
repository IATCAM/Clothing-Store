import { headers } from "next/headers";
import Products from "../products/Products";
import { supabase } from "@/lib/supabaseClient";

async function TopSelling() {
  // const result = await fetch("http://localhost:8000/products?section=top");
  // const data = (await result.json()) as Iproducts[];

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("section", "top");

    if (error) {
      console.error("Supabase fetch error:", error.message);
      return <p className="text-center mt-10">Error loading data</p>;
    }

    console.log("Fetched data:", data);

  const headersList = await headers(); 
  const userAgent = headersList.get("user-agent") || "";
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
