"use client"

import { useState } from "react";

interface IcolorSelection{
  colors: string[];
}

function ColorSelection({ colors }: IcolorSelection) {
     const [selectedColor, setSelectedColor] = useState<string | null>(null);
  return (
    <div>
      <h3 className="text-sm font-normal opacity-60 mb-4 lg:text-base">Select Colors</h3>
      <div className="flex items-center gap-[0.77rem] lg:gap-4">
        {colors.map((color) => (
          <button key={color} onClick={() => setSelectedColor(color)} className="rounded-full w-[2.44rem] h-[2.44rem]" style={{ backgroundColor: color }}>
            {selectedColor === color && (
              <span className="flex  justify-center item-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M15.9463 5.89809L7.48459 14.3598C7.41089 14.4337 7.32332 14.4924 7.22689 14.5325C7.13047 14.5725 7.02708 14.5931 6.92268 14.5931C6.81827 14.5931 6.71489 14.5725 6.61846 14.5325C6.52204 14.4924 6.43447 14.4337 6.36077 14.3598L2.65878 10.6578C2.58498 10.584 2.52645 10.4964 2.48652 10.4C2.44658 10.3036 2.42603 10.2002 2.42603 10.0959C2.42603 9.99153 2.44658 9.8882 2.48652 9.79179C2.52645 9.69537 2.58498 9.60777 2.65878 9.53398C2.73257 9.46019 2.82017 9.40166 2.91658 9.36172C3.01299 9.32178 3.11633 9.30123 3.22069 9.30123C3.32504 9.30123 3.42838 9.32178 3.52479 9.36172C3.6212 9.40166 3.7088 9.46019 3.7826 9.53398L6.92334 12.6747L14.8238 4.7756C14.9728 4.62657 15.1749 4.54285 15.3857 4.54285C15.5965 4.54285 15.7986 4.62657 15.9476 4.7756C16.0966 4.92462 16.1804 5.12675 16.1804 5.33751C16.1804 5.54826 16.0966 5.75039 15.9476 5.89942L15.9463 5.89809Z" fill="white"/>
                </svg>
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ColorSelection;
