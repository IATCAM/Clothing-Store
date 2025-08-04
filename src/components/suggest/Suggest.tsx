"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { Iproducts } from "@/type";

function Suggest() {
  const [data, setData] = useState<Iproducts[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // useEffect(() => {
  //   fetch("http://localhost:8000/products")
  //     .then((res) => res.json())
  //     .then((json) => setData(json))
  //     .catch((err) => console.error("Fetch error:", err));
  // }, []);


   useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("products").select("*");

      if (error) {
        console.error("Supabase fetch error:", error.message);
        return;
      }

      setData(data || []);
    }

    fetchData();
  }, []);


  // شناسایی حالت موبایل
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize(); // بار اول
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (data.length === 0) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>

    <h1 className="font1 text-[2rem] font-bold leading-9 tracking-wider text-center mt-[3.11rem] lg:text-5xl lg:mt-16">You might also like</h1>
      {isMobile ? (
        // اسلایدر موبایل (2 عکس با کشیدن)
        <Swiper spaceBetween={16} slidesPerView={2} className="px-4 mt-10">
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <Link href={`/product/${item.id}`}>
                <div className="mb-4">
                  <img src={item.image} alt="" className="w-full h-48 object-cover rounded-xl"/>
                  <h2 className="text-base font-bold mt-2">{item.title}</h2>
                  <p className="text-sm text-gray-600">{item.rate}/5</p>
                  <p className="text-lg font-bold">${item.cost}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        // حالت دسکتاپ (4 کارت ساده)
        <div className="grid grid-cols-4 gap-6 px-24 mt-10">
          {data.slice(0, 4).map((item) => (
            <Link key={item.id} href={`/product/${item.id}`} className="group">
              <div className="mb-4 transition-transform duration-300 group-hover:scale-105">
                <img src={item.image} alt="" className="w-full h-72 object-cover rounded-xl shadow-md"/>
                <h2 className="text-xl font-bold mt-2">{item.title}</h2>
                <p className="text-sm text-gray-600">{item.rate}/5</p>
                <p className="text-lg font-bold">${item.cost}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default Suggest;
