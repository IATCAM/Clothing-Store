import BrowseItems from "@/components/browseItems/BrowseItems";
import Filters from "@/components/filters/Filters";
import { Ipagination } from "@/components/newArrivals/NewArrivals";
import Pagination from "@/components/pagination/Pagination";
import { headers } from "next/headers";

interface IbrowseProps{
  params: {},
  searchParams: {page?: string , per_page?: string}
}


async function Casual({searchParams}: IbrowseProps) {

  const userAgent = headers().get("user-agent") || "";
  const isDesktop = userAgent.includes("Windows") || userAgent.includes("Mac");
  const initialCount = isDesktop ? 9 : 6;

  const page = searchParams.page ?? "1";
  const per_page = searchParams.per_page ?? initialCount.toString();
  
  const result = await fetch(`http://localhost:8000/casual?_page=${page}&_per_page=${per_page}`);
  const data = await result.json() as Ipagination;

  return (
    <div>
        <div className="mx-4 lg:mx-24 lg:mb-42 mb-[11.56rem]">
        <div className="bg-black opacity-10 w-full h-[0.06rem] mb-[1.41rem] lg:my-6"></div>

        <div className="flex items-center gap-1 lg:gap-3">
          <h3 className="text-sm font-normal opacity-60 lg:text-base">Home</h3>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
              <path d="M5.71433 2.6607L10.0893 7.0357C10.1505 7.09666 10.1991 7.16911 10.2322 7.24888C10.2653 7.32865 10.2823 7.41417 10.2823 7.50054C10.2823 7.58691 10.2653 7.67243 10.2322 7.7522C10.1991 7.83197 10.1505 7.90442 10.0893 7.96538L5.71433 12.3404C5.59105 12.4637 5.42384 12.5329 5.24949 12.5329C5.07514 12.5329 4.90793 12.4637 4.78464 12.3404C4.66136 12.2171 4.5921 12.0499 4.5921 11.8755C4.5921 11.7012 4.66136 11.534 4.78464 11.4107L8.69535 7.49999L4.7841 3.58929C4.66081 3.46601 4.59155 3.2988 4.59155 3.12445C4.59155 2.9501 4.66081 2.78289 4.7841 2.6596C4.90738 2.53632 5.07459 2.46706 5.24894 2.46706C5.42329 2.46706 5.5905 2.53632 5.71379 2.6596L5.71433 2.6607Z" fill="black" fillOpacity="0.6"/>
            </svg>
          </span>
          <h3 className="text-sm font-normal lg:text-base">Casual</h3>
        </div>

        <div className="lg:grid lg:grid-cols-4 gap-5">

        <div className="hidden lg:block lg:col-span-1 lg:mt-6">
          <Filters />
        </div>

          <div className="col-span-3">
            <div className="flex justify-between items-center pt-[0.91rem]">
              <div className="flex items-center gap-2 lg:justify-between lg:w-full">
                 <span className="text-2xl font-bold lg:text-[2rem]">Casual</span>
                  <span className="text-sm font-normal opacity-60 lg:text-base">Showing 1-10 of 100 Products</span>
              </div>
              <div className="block lg:hidden">
                <Filters />
              </div>
            </div>

            <div className="mt-6">
              <BrowseItems data={data.data} initialCount={initialCount} />
            </div>

            <div className="bg-black opacity-10 w-full h-[0.06rem] mb-5 lg:my-6"></div>

            <div>
              <Pagination pageCount={data.pages} />
            </div>
          </div>
      </div>
      </div>
    </div>
    
  )
}

export default Casual;
