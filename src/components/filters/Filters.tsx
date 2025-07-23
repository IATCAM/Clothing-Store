"use client";

import { useEffect, useState } from "react";


const MIN = 0;
const MAX = 250;

const sizes = ["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "3X-Large", "4X-Large"];
const colors = ["#00C12B" , "#F50606" , "#F5DD06" , "#F57906" , "#06CAF5" , "#063AF5" , "#7D06F5" , "#F506A4" , "#FFFFFF" , "#000000"];

function Filters() {
  const [isFilter, setIsFilter] = useState(false);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(250);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState({
    price: true,
    color: true,
    size: true,
    dressStyle: true,
  });

  const category = [
        {
            title: "T-shirts",
            link: "#",
        },
        {
            title: "Shorts",
            link: "#",
        },
        {
            title: "Shirts",
            link: "#",
        },
        {
            title: "Hoodie",
            link: "#",
        },
        {
            title: "Jeans",
            link: "#",
        }
    ];

    const style = [
        {
            title: "Casual",
            link: "#",
        },
        {
            title: "Formal",
            link: "#",
        },
        {
            title: "Party",
            link: "#",
        },
        {
            title: "Gym",
            link: "#",
        }
    ];

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxValue - 1);
    setMinValue(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minValue + 1);
    setMaxValue(value);
  };

    useEffect(()=>{
        const isDesktop = window.innerWidth >= 1024;

        if(!isDesktop && isFilter){
            document.body.style.overflow = "hidden";
        }
        else{
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    } , [isFilter]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsFilter(true);
      } else {
        setIsFilter(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <>
      <button className="lg:hidden bg1 p-4 rounded-full" onClick={()=> setIsFilter(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8.75 7.75V13.5C8.75 13.6989 8.67098 13.8897 8.53033 14.0303C8.38968 14.171 8.19891 14.25 8 14.25C7.80109 14.25 7.61032 14.171 7.46967 14.0303C7.32902 13.8897 7.25 13.6989 7.25 13.5V7.75C7.25 7.55109 7.32902 7.36032 7.46967 7.21967C7.61032 7.07902 7.80109 7 8 7C8.19891 7 8.38968 7.07902 8.53033 7.21967C8.67098 7.36032 8.75 7.55109 8.75 7.75ZM12.5 12C12.3011 12 12.1103 12.079 11.9697 12.2197C11.829 12.3603 11.75 12.5511 11.75 12.75V13.5C11.75 13.6989 11.829 13.8897 11.9697 14.0303C12.1103 14.171 12.3011 14.25 12.5 14.25C12.6989 14.25 12.8897 14.171 13.0303 14.0303C13.171 13.8897 13.25 13.6989 13.25 13.5V12.75C13.25 12.5511 13.171 12.3603 13.0303 12.2197C12.8897 12.079 12.6989 12 12.5 12ZM14 9.5H13.25V2.5C13.25 2.30109 13.171 2.11032 13.0303 1.96967C12.8897 1.82902 12.6989 1.75 12.5 1.75C12.3011 1.75 12.1103 1.82902 11.9697 1.96967C11.829 2.11032 11.75 2.30109 11.75 2.5V9.5H11C10.8011 9.5 10.6103 9.57902 10.4697 9.71967C10.329 9.86032 10.25 10.0511 10.25 10.25C10.25 10.4489 10.329 10.6397 10.4697 10.7803C10.6103 10.921 10.8011 11 11 11H14C14.1989 11 14.3897 10.921 14.5303 10.7803C14.671 10.6397 14.75 10.4489 14.75 10.25C14.75 10.0511 14.671 9.86032 14.5303 9.71967C14.3897 9.57902 14.1989 9.5 14 9.5ZM3.5 10C3.30109 10 3.11032 10.079 2.96967 10.2197C2.82902 10.3603 2.75 10.5511 2.75 10.75V13.5C2.75 13.6989 2.82902 13.8897 2.96967 14.0303C3.11032 14.171 3.30109 14.25 3.5 14.25C3.69891 14.25 3.88968 14.171 4.03033 14.0303C4.17098 13.8897 4.25 13.6989 4.25 13.5V10.75C4.25 10.5511 4.17098 10.3603 4.03033 10.2197C3.88968 10.079 3.69891 10 3.5 10ZM5 7.5H4.25V2.5C4.25 2.30109 4.17098 2.11032 4.03033 1.96967C3.88968 1.82902 3.69891 1.75 3.5 1.75C3.30109 1.75 3.11032 1.82902 2.96967 1.96967C2.82902 2.11032 2.75 2.30109 2.75 2.5V7.5H2C1.80109 7.5 1.61032 7.57902 1.46967 7.71967C1.32902 7.86032 1.25 8.05109 1.25 8.25C1.25 8.44891 1.32902 8.63968 1.46967 8.78033C1.61032 8.92098 1.80109 9 2 9H5C5.19891 9 5.38968 8.92098 5.53033 8.78033C5.67098 8.63968 5.75 8.44891 5.75 8.25C5.75 8.05109 5.67098 7.86032 5.53033 7.71967C5.38968 7.57902 5.19891 7.5 5 7.5ZM9.5 4.5H8.75V2.5C8.75 2.30109 8.67098 2.11032 8.53033 1.96967C8.38968 1.82902 8.19891 1.75 8 1.75C7.80109 1.75 7.61032 1.82902 7.46967 1.96967C7.32902 2.11032 7.25 2.30109 7.25 2.5V4.5H6.5C6.30109 4.5 6.11032 4.57902 5.96967 4.71967C5.82902 4.86032 5.75 5.05109 5.75 5.25C5.75 5.44891 5.82902 5.63968 5.96967 5.78033C6.11032 5.92098 6.30109 6 6.5 6H9.5C9.69891 6 9.88968 5.92098 10.0303 5.78033C10.171 5.63968 10.25 5.44891 10.25 5.25C10.25 5.05109 10.171 4.86032 10.0303 4.71967C9.88968 4.57902 9.69891 4.5 9.5 4.5Z" fill="black"/>
        </svg>
      </button>

      {
        isFilter && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-50 lg:bg-transparent lg:backdrop-blur-none lg:static">
            <div className="absolute top-[7rem] left-0 w-full h-full bg-white shadow-lg rounded-t-[1.25rem] px-6 pt-6 overflow-y-auto max-h-[calc(100vh-7rem)] lg:static lg:max-h-full lg:shadow-none lg:border-1 lg:border-[#0000001a] lg:rounded-[1.25rem]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Filters</h2>
              <button className="lg:hidden" onClick={()=> setIsFilter(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <path d="M15.5459 14.4541C15.7572 14.6654 15.876 14.952 15.876 15.2509C15.876 15.5498 15.7572 15.8365 15.5459 16.0478C15.3346 16.2592 15.0479 16.3779 14.749 16.3779C14.4501 16.3779 14.1635 16.2592 13.9521 16.0478L7.99996 10.0937L2.0459 16.0459C1.83455 16.2573 1.54791 16.376 1.24902 16.376C0.950136 16.376 0.663491 16.2573 0.452147 16.0459C0.240802 15.8346 0.12207 15.5479 0.12207 15.2491C0.12207 14.9502 0.240803 14.6635 0.452147 14.4522L6.40621 8.5L0.454022 2.54593C0.242677 2.33459 0.123945 2.04795 0.123945 1.74906C0.123945 1.45017 0.242677 1.16353 0.454022 0.952184C0.665366 0.74084 0.95201 0.622107 1.2509 0.622107C1.54978 0.622107 1.83643 0.74084 2.04777 0.952184L7.99996 6.90625L13.954 0.951246C14.1654 0.739902 14.452 0.62117 14.7509 0.62117C15.0498 0.62117 15.3364 0.739902 15.5478 0.951246C15.7591 1.16259 15.8778 1.44924 15.8778 1.74812C15.8778 2.04701 15.7591 2.33365 15.5478 2.545L9.59371 8.5L15.5459 14.4541Z" fill="black" fillOpacity="0.4"/>
                  </svg>
              </button>
            </div>

            <div className="bg-black opacity-10 w-full h-[0.06rem] mb-5 mt-4"></div>

            <ul className="space-y-5">
                {
                    category.map((item)=>(
                        <li key={item.title} className="text-base font-normal opacity-60 flex justify-between items-center">
                            {item.title}
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M6.53073 2.4694L11.5307 7.4694C11.6007 7.53908 11.6561 7.62187 11.694 7.71304C11.7318 7.8042 11.7513 7.90194 11.7513 8.00065C11.7513 8.09936 11.7318 8.1971 11.694 8.28827C11.6561 8.37943 11.6007 8.46222 11.5307 8.5319L6.53073 13.5319C6.38984 13.6728 6.19874 13.752 5.99948 13.752C5.80023 13.752 5.60913 13.6728 5.46823 13.5319C5.32734 13.391 5.24818 13.1999 5.24818 13.0007C5.24818 12.8014 5.32734 12.6103 5.46823 12.4694L9.93761 8.00003L5.46761 3.53065C5.32671 3.38976 5.24756 3.19866 5.24756 2.9994C5.24756 2.80015 5.32671 2.60905 5.46761 2.46815C5.60851 2.32726 5.7996 2.2481 5.99886 2.2481C6.19812 2.2481 6.38921 2.32726 6.53011 2.46815L6.53073 2.4694Z" fill="black" fillOpacity="0.6"/>
                                </svg>
                            </span>
                        </li>
                    ))
                }
            </ul>

            <div className="bg-black opacity-10 w-full h-[0.06rem] mb-5 mt-4"></div>

            <div>
                
                 <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Price</h2>
                    <span  onClick={() => toggleSection("price")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M2.4694 9.96939L7.4694 4.96939C7.53908 4.89947 7.62187 4.84399 7.71304 4.80614C7.8042 4.76828 7.90194 4.7488 8.00065 4.7488C8.09936 4.7488 8.1971 4.76828 8.28827 4.80614C8.37943 4.84399 8.46222 4.89947 8.5319 4.96939L13.5319 9.96939C13.6728 10.1103 13.752 10.3014 13.752 10.5006C13.752 10.6999 13.6728 10.891 13.5319 11.0319C13.391 11.1728 13.1999 11.2519 13.0007 11.2519C12.8014 11.2519 12.6103 11.1728 12.4694 11.0319L8.00003 6.56251L3.53065 11.0325C3.38976 11.1734 3.19866 11.2526 2.9994 11.2526C2.80015 11.2526 2.60905 11.1734 2.46815 11.0325C2.32726 10.8916 2.2481 10.7005 2.2481 10.5013C2.2481 10.302 2.32726 10.1109 2.46815 9.97001L2.4694 9.96939Z" fill="black"/>
                        </svg>
                    </span>
                </div>
               
                {openSections.price &&
                <div className="w-full mx-auto px-4 mt-6">
                    {/* Range slider track */}
                    <div className="relative h-2 bg-gray-300 rounded-full">
                        {/* Active range (black fill) */}
                        <div
                        className="absolute h-2 bg-black rounded-full"
                        style={{
                            left: `${(minValue / MAX) * 100}%`,
                            width: `${((maxValue - minValue) / MAX) * 100}%`,
                        }}
                        ></div>

                        {/* Min range input */}
                        <input
                        type="range"
                        min={MIN}
                        max={MAX}
                        value={minValue}
                        onChange={handleMinChange}
                        className="absolute w-full h-2 appearance-none bg-transparent "
                        style={{ zIndex: 10 }}
                        />

                        {/* Max range input */}
                        <input
                        type="range"
                        min={MIN}
                        max={MAX}
                        value={maxValue}
                        onChange={handleMaxChange}
                        className="absolute w-full h-2 appearance-none bg-transparent "
                        style={{ zIndex: 10 }}
                        />
                    </div>

                    {/* Price Display */}
                    <div className="flex justify-between text-sm text-gray-700 mt-4">
                        <span>${minValue}</span>
                        <span>${maxValue}</span>
                    </div>
                </div>
                }

            </div>

            <div className="bg-black opacity-10 w-full h-[0.06rem] mb-5 mt-4"></div>

            <div>
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Colors</h2>
                    <span  onClick={() => toggleSection("color")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M2.4694 9.96939L7.4694 4.96939C7.53908 4.89947 7.62187 4.84399 7.71304 4.80614C7.8042 4.76828 7.90194 4.7488 8.00065 4.7488C8.09936 4.7488 8.1971 4.76828 8.28827 4.80614C8.37943 4.84399 8.46222 4.89947 8.5319 4.96939L13.5319 9.96939C13.6728 10.1103 13.752 10.3014 13.752 10.5006C13.752 10.6999 13.6728 10.891 13.5319 11.0319C13.391 11.1728 13.1999 11.2519 13.0007 11.2519C12.8014 11.2519 12.6103 11.1728 12.4694 11.0319L8.00003 6.56251L3.53065 11.0325C3.38976 11.1734 3.19866 11.2526 2.9994 11.2526C2.80015 11.2526 2.60905 11.1734 2.46815 11.0325C2.32726 10.8916 2.2481 10.7005 2.2481 10.5013C2.2481 10.302 2.32726 10.1109 2.46815 9.97001L2.4694 9.96939Z" fill="black"/>
                        </svg>
                    </span>
                </div>

                {openSections.color &&
                <div>
                     <div className="flex flex-wrap items-center gap-[0.77rem] mt-4 lg:gap-4">
                        {colors.map((color) => (
                        <button key={color} onClick={() => setSelectedColor(color)} className="border border-gray-200 stroke-black rounded-full w-[2.44rem] h-[2.44rem]" style={{ backgroundColor: color }}>
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
                }
            </div>
            

            <div className="bg-black opacity-10 w-full h-[0.06rem] mb-5 mt-4"></div>

            <div>
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Size</h2>
                    <span  onClick={() => toggleSection("size")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M2.4694 9.96939L7.4694 4.96939C7.53908 4.89947 7.62187 4.84399 7.71304 4.80614C7.8042 4.76828 7.90194 4.7488 8.00065 4.7488C8.09936 4.7488 8.1971 4.76828 8.28827 4.80614C8.37943 4.84399 8.46222 4.89947 8.5319 4.96939L13.5319 9.96939C13.6728 10.1103 13.752 10.3014 13.752 10.5006C13.752 10.6999 13.6728 10.891 13.5319 11.0319C13.391 11.1728 13.1999 11.2519 13.0007 11.2519C12.8014 11.2519 12.6103 11.1728 12.4694 11.0319L8.00003 6.56251L3.53065 11.0325C3.38976 11.1734 3.19866 11.2526 2.9994 11.2526C2.80015 11.2526 2.60905 11.1734 2.46815 11.0325C2.32726 10.8916 2.2481 10.7005 2.2481 10.5013C2.2481 10.302 2.32726 10.1109 2.46815 9.97001L2.4694 9.96939Z" fill="black"/>
                        </svg>
                    </span>
                </div>

                {openSections.size &&
                <div className="flex items-center flex-wrap mt-4 gap-2 lg:gap-3 lg:justify-start">
                    {sizes.map((size) => (
                    <button key={size} onClick={() => setSelectedSize(size)} className={`px-5 py-[0.62rem] rounded-[3.87rem] text-sm font-normal transition-colors duration-200 ${
                        selectedSize === size
                            ? "bg-black text-white"
                            : "bg1 text-[#00000099]"
                        }`}>{size}</button>
                    ))}
                </div>
                } 
            </div>

            <div className="bg-black opacity-10 w-full h-[0.06rem] mb-5 mt-4"></div>

            <div>
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Dress Style</h2>
                    <span  onClick={() => toggleSection("dressStyle")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M2.4694 9.96939L7.4694 4.96939C7.53908 4.89947 7.62187 4.84399 7.71304 4.80614C7.8042 4.76828 7.90194 4.7488 8.00065 4.7488C8.09936 4.7488 8.1971 4.76828 8.28827 4.80614C8.37943 4.84399 8.46222 4.89947 8.5319 4.96939L13.5319 9.96939C13.6728 10.1103 13.752 10.3014 13.752 10.5006C13.752 10.6999 13.6728 10.891 13.5319 11.0319C13.391 11.1728 13.1999 11.2519 13.0007 11.2519C12.8014 11.2519 12.6103 11.1728 12.4694 11.0319L8.00003 6.56251L3.53065 11.0325C3.38976 11.1734 3.19866 11.2526 2.9994 11.2526C2.80015 11.2526 2.60905 11.1734 2.46815 11.0325C2.32726 10.8916 2.2481 10.7005 2.2481 10.5013C2.2481 10.302 2.32726 10.1109 2.46815 9.97001L2.4694 9.96939Z" fill="black"/>
                        </svg>
                    </span>
                </div>

                {openSections.dressStyle &&
                <ul className="space-y-5 mt-4">
                    {
                        style.map((item)=>(
                            <li key={item.title} className="text-base font-normal opacity-60 flex justify-between items-center">
                            {item.title}
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M6.53073 2.4694L11.5307 7.4694C11.6007 7.53908 11.6561 7.62187 11.694 7.71304C11.7318 7.8042 11.7513 7.90194 11.7513 8.00065C11.7513 8.09936 11.7318 8.1971 11.694 8.28827C11.6561 8.37943 11.6007 8.46222 11.5307 8.5319L6.53073 13.5319C6.38984 13.6728 6.19874 13.752 5.99948 13.752C5.80023 13.752 5.60913 13.6728 5.46823 13.5319C5.32734 13.391 5.24818 13.1999 5.24818 13.0007C5.24818 12.8014 5.32734 12.6103 5.46823 12.4694L9.93761 8.00003L5.46761 3.53065C5.32671 3.38976 5.24756 3.19866 5.24756 2.9994C5.24756 2.80015 5.32671 2.60905 5.46761 2.46815C5.60851 2.32726 5.7996 2.2481 5.99886 2.2481C6.19812 2.2481 6.38921 2.32726 6.53011 2.46815L6.53073 2.4694Z" fill="black" fillOpacity="0.6"/>
                                </svg>
                            </span>
                            </li>
                        ))
                    }
                </ul>
                }
            </div>

            <div className="flex justify-center items-center mt-5 mb-16 lg:my-5">
                <button className="w-full py-4 text-sm font-medium bg-black rounded-[3.87rem] text-white">Apply Filter</button>
            </div>

          </div>
        </div>
        )
      }
    </>
  );
}

export default Filters;