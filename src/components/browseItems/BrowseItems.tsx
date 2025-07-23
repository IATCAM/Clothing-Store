"use client"

import { useState } from "react";
import { Iproducts } from "../newArrivals/NewArrivals";
import Link from "next/link";

interface IBrowseItems{
    data: Iproducts[],
    initialCount: number
}

function BrowseItems({data , initialCount}: IBrowseItems) {

    const [showAll, setShowAll] = useState(false);
    const visibleProducts = showAll ? data : data.slice(0, initialCount);
  return (
    <>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
        {visibleProducts.map((item) => (
          <Link key={item.id} href={`/casual/${item.id}`}>
            <div className="mb-4">
            <img src={item.image} alt="" className="w-full h-48 lg:h-72 object-cover rounded-xl shadow-md"/>
            <h2 className="text-base font-bold mt-2 lg:text-xl">{item.title}</h2>
            <p className="text-sm text-gray-600">{item.rate}/5</p>
            <p className="text-lg font-bold">${item.cost}</p>
          </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default BrowseItems;
