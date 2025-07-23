"use client"

import { useState } from "react";
import { Iproducts } from "../newArrivals/NewArrivals";
import Link from "next/link";

interface InewArrivalsProps{
    data: Iproducts[],
    initialCount: number
}

function Products({data , initialCount}: InewArrivalsProps) {

    const [showAll, setShowAll] = useState(false);
    const visibleProducts = showAll ? data : data.slice(0, initialCount);
  return (
    <>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {visibleProducts.map((item) => (
          <Link key={item.id} href={`/product/${item.id}`}>
            <div className="mb-4">
            <img src={item.image} alt="" className="w-full h-48 lg:h-72 object-cover rounded-xl shadow-md"/>
            <h2 className="text-base font-bold mt-2 lg:text-xl">{item.title}</h2>
            <p className="text-sm text-gray-600">{item.rate}/5</p>
            <p className="text-lg font-bold">${item.cost}</p>
          </div>
          </Link>
        ))}
      </div>

      {!showAll && data.length > initialCount && (
        <div className="flex justify-center mt-6">
          <button onClick={() => setShowAll(true)} className="text-black text-sm font-medium w-full border border-[#0000001a] mx-4 px-[3.375rem] py-4 rounded-[3.87rem] lg:text-base lg:w-[13.62rem] cursor-pointer mb-10 lg:mb-16">View All</button>
        </div>
      )}
    </>
  );
}

export default Products;
