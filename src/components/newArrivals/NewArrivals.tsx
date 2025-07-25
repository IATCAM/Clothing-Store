import { headers } from "next/headers";
import Products from "../products/Products";
import { supabase } from "@/lib/supabaseClient";

async function NewArrivals() {
  // const result = await fetch("http://localhost:8000/products?section=new")
  // const data = await (result.json()) as Iproducts[];

  const { data, error } = await supabase
    .from("products")  // ← نام جدول در Supabase
    .select("*")
    .eq("section", "new");

  if (error) {
    console.error("Error fetching products:", error.message);
    return <div>Error loading products</div>;
  }
  
  const headersList = await headers(); 
  const userAgent = headersList.get("user-agent") || "";
  const isDesktop = userAgent.includes("Windows") || userAgent.includes("Mac");
  const initialCount = isDesktop ? 4 : 2;

  return (
    <div id="newArrivals" className="mx-4 mt-12 lg:mx-24 lg:mt-20">
      <h1 className="text-center font1 text-2xl mb-8 lg:text-5xl lg:mb-[3.44rem] font-bold tracking-wider">NEW ARRIVALS</h1>
      <Products data={data} initialCount={initialCount} />
      <div className="bg-black opacity-10 w-full h-[0.06rem] mb-10 lg:mb-16"></div>
    </div>
  );
}

export default NewArrivals;
