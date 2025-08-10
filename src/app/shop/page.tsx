
// import { supabase } from "@/lib/supabaseClient";
// import { headers } from "next/headers";
// import Link from "next/link";

// async function Shop({ searchParams = {} }: { searchParams?: { title?: string } }) {

//   const title = searchParams?.title || "";

//   let query = supabase.from("products").select("*");

//   if (title) {
//     query = query.ilike("title", `%${title}%`);
//   }

//   const { data, error } = await query;

//   if (error) {
//     console.error("Error fetching products:", error.message);
//     return <div>Error loading products</div>;
//   }
  
//   const headersList = await headers();
//   const userAgent = headersList.get("user-agent") || "";
//   const isDesktop = userAgent.includes("Windows") || userAgent.includes("Mac");
//   const initialCount = isDesktop ? 4 : 2;

//   return (
//     <div>
//         <div className="bg-black opacity-10 w-full h-[0.06rem] mb-[1.41rem] lg:my-6"></div>

//         <div className="flex items-center gap-1 lg:gap-3 px-4 lg:mx-24">
//           <h3 className="text-sm font-normal opacity-60 lg:text-base">Home</h3>
//           <span>
//             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
//               <path d="M5.71433 2.6607L10.0893 7.0357C10.1505 7.09666 10.1991 7.16911 10.2322 7.24888C10.2653 7.32865 10.2823 7.41417 10.2823 7.50054C10.2823 7.58691 10.2653 7.67243 10.2322 7.7522C10.1991 7.83197 10.1505 7.90442 10.0893 7.96538L5.71433 12.3404C5.59105 12.4637 5.42384 12.5329 5.24949 12.5329C5.07514 12.5329 4.90793 12.4637 4.78464 12.3404C4.66136 12.2171 4.5921 12.0499 4.5921 11.8755C4.5921 11.7012 4.66136 11.534 4.78464 11.4107L8.69535 7.49999L4.7841 3.58929C4.66081 3.46601 4.59155 3.2988 4.59155 3.12445C4.59155 2.9501 4.66081 2.78289 4.7841 2.6596C4.90738 2.53632 5.07459 2.46706 5.24894 2.46706C5.42329 2.46706 5.5905 2.53632 5.71379 2.6596L5.71433 2.6607Z" fill="black" fillOpacity="0.6"/>
//             </svg>
//           </span>
//           <h3 className="text-sm font-normal lg:text-base capitalize">Shop</h3>
//         </div>

//         <div className="mx-4 mt-12 lg:mx-24 lg:mt-20">
//             <h1 className="text-center font1 text-2xl mb-8 lg:text-5xl lg:mb-[3.44rem] font-bold tracking-wider">
//                 SHOP
//             </h1>
            
//             <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6 mb-30 lg:mb-20">
//                 {data.map((item)=>(
//                 <Link key={item.id} href={`/product/${item.id}`} className="group">
//                     <div className="mb-4 transition-transform duration-300 group-hover:scale-105">
//                         <img src={item.image} alt="" className="w-full h-48 lg:h-72 object-cover rounded-xl shadow-md"/>
//                         <h2 className="text-base font-bold mt-2 lg:text-xl">{item.title}</h2>
//                         <p className="text-sm text-gray-600">{item.rate}/5</p>
//                         <p className="text-lg font-bold">${item.cost}</p>
//                     </div>
//                 </Link>
//                 ))}
//             </div>

//             <div className="bg-black opacity-10 w-full h-[0.06rem] mb-10 lg:mb-16"></div>
//         </div>
//     </div>
   
//   );
// }

// export default Shop;





import InfiniteProducts from "@/components/infiniteScroll/InfiniteScroll";
import { supabase } from "@/lib/supabaseClient";

interface ShopPageProps {
  searchParams: Promise<{title?: string;}>
}

async function Shop({ searchParams }: ShopPageProps) {
   const resolvedSearchParams = await searchParams;
  const title = resolvedSearchParams?.title || "";
  const PAGE_SIZE = 8;

  let query = supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true })
    .range(0, PAGE_SIZE - 1);

  if (title) {
    query = query.ilike("title", `%${title}%`);
  }

  const { data, error } = await query;

  if (error) {
    return <div>خطا در دریافت داده‌ها</div>;
  }

  return (
    <div className="mx-4 lg:mx-24">
        <div className="bg-black opacity-10 w-full h-[0.06rem] mb-[1.41rem] lg:my-6"></div>
        <div className="flex items-center gap-1 lg:gap-3">
          <h3 className="text-sm font-normal opacity-60 lg:text-base">Home</h3>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
              <path d="M5.71433 2.6607L10.0893 7.0357C10.1505 7.09666 10.1991 7.16911 10.2322 7.24888C10.2653 7.32865 10.2823 7.41417 10.2823 7.50054C10.2823 7.58691 10.2653 7.67243 10.2322 7.7522C10.1991 7.83197 10.1505 7.90442 10.0893 7.96538L5.71433 12.3404C5.59105 12.4637 5.42384 12.5329 5.24949 12.5329C5.07514 12.5329 4.90793 12.4637 4.78464 12.3404C4.66136 12.2171 4.5921 12.0499 4.5921 11.8755C4.5921 11.7012 4.66136 11.534 4.78464 11.4107L8.69535 7.49999L4.7841 3.58929C4.66081 3.46601 4.59155 3.2988 4.59155 3.12445C4.59155 2.9501 4.66081 2.78289 4.7841 2.6596C4.90738 2.53632 5.07459 2.46706 5.24894 2.46706C5.42329 2.46706 5.5905 2.53632 5.71379 2.6596L5.71433 2.6607Z" fill="black" fillOpacity="0.6"/>
            </svg>
          </span>
          <h3 className="text-sm font-normal lg:text-base capitalize">Shop</h3>
        </div>

      <h1 className="text-center font1 text-2xl mb-8 lg:text-5xl lg:mb-[3.44rem] font-bold tracking-wider">SHOP</h1>

      {/* key اینجا باعث می‌شود هر بار title تغییر کرد کامپوننت ریست شود */}
      <InfiniteProducts key={title} initialProducts={data} searchTitle={title} />
    </div>
  );
}

export default Shop;
