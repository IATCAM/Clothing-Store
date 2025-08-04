"use client";

import { usePathname, useRouter } from "next/navigation";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";

function Pagination({ pageCount }: { pageCount: number }) {
  const router = useRouter();
  const [perPage, setPerPage] = useState(9);
  const pathname = usePathname();

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    setPerPage(isMobile ? 6 : 9);
  }, []);

  const handlePageClick = (e: { selected: number }) => {
    const page = e.selected + 1;
    router.push(`${pathname}?page=${page}&per_page=${perPage}`);
  };

  return (
    <div>
      <ReactPaginate
        className="flex items-center justify-center gap-6 cursor-pointer"
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageLinkClassName="flex items-center text-gray-400 font-medium text-sm"
        activeLinkClassName="bg1 rounded-lg py-[0.75rem] px-4 text-gray-700"
        previousLinkClassName="flex items-center border border-gray-200 py-2 px-[0.88rem] rounded-lg text-sm font-medium mr-2 transition-colors duration-400 hover:bg-black hover:text-white"
        nextLinkClassName="flex items-center  border border-gray-200 py-2 px-[0.88rem] rounded-lg text-sm font-medium ml-2 transition-colors duration-400 hover:bg-black hover:text-white"
        breakLinkClassName="flex items-center text-sm font-medium"
        previousClassName=""
      />
    </div>
  );
}

export default Pagination;
