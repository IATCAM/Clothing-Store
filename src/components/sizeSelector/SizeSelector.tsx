"use client"

import { useState } from "react";

const sizes = ["Small", "Medium", "Large", "X-Large"];

export default function SizeSelector() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <div>
      <h3 className="text-sm font-normal opacity-60 mb-4 lg:text-base">Choose Size</h3>
      <div className="flex items-center justify-between gap-2 lg:gap-3 lg:justify-start">
        {sizes.map((size) => (
          <button key={size} onClick={() => setSelectedSize(size)} className={`px-5 py-[0.62rem] rounded-[3.87rem] text-sm font-normal transition-colors duration-200 ${
              selectedSize === size
                ? "bg-black text-white"
                : "bg1 text-[#00000099]"
            }`}>{size}</button>
        ))}
      </div>
    </div>
  );
}
