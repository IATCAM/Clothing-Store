"use client";

import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { supabase } from "@/lib/supabaseClient";
import { ITestimonial } from "@/type";



function Testimonial() {
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);

  // useEffect(() => {
  //   fetch("http://localhost:8000/testimonial")
  //     .then((res) => res.json())
  //     .then((data) => setTestimonials(data));
  // }, []);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase.from("testimonials").select("*");

      if (error) {
        console.error("Error fetching testimonials:", error.message);
        return;
      }

      setTestimonials(data || []);
    };

    fetchTestimonials();
  }, []);

  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="mb-[11.55rem] lg:mb-[10.65rem]">
        <div className="mx-4 lg:mx-24 flex justify-between items-center mb-6 lg:mb-10">
            <div>
                <h1 className="font1 text-[2rem] font-bold leading-[2.25rem] lg:text-5xl lg:leading-normal tracking-wider">
                    <span className="block lg:inline">OUR HAPPY</span>
                    <span className="block lg:inline">CUSTOMERS</span>
                </h1>
            </div>
            <div className="flex gap-4">
                <button className="cursor-pointer transition-transform duration-300 hover:scale-125" onClick={() => swiperRef.current?.slidePrev()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9.70406 4.4541L2.95406 11.2041C2.84918 11.3086 2.76597 11.4328 2.70919 11.5696C2.6524 11.7063 2.62317 11.8529 2.62317 12.001C2.62317 12.149 2.6524 12.2957 2.70919 12.4324C2.76597 12.5691 2.84918 12.6933 2.95406 12.7979L9.70406 19.5479C9.91541 19.7592 10.2021 19.8779 10.5009 19.8779C10.7998 19.8779 11.0865 19.7592 11.2978 19.5479C11.5092 19.3365 11.6279 19.0499 11.6279 18.751C11.6279 18.4521 11.5092 18.1654 11.2978 17.9541L6.46875 13.125L20.25 13.125C20.5484 13.125 20.8345 13.0065 21.0455 12.7955C21.2565 12.5846 21.375 12.2984 21.375 12C21.375 11.7017 21.2565 11.4155 21.0455 11.2045C20.8345 10.9936 20.5484 10.875 20.25 10.875L6.46875 10.875L11.2987 6.04598C11.5101 5.83463 11.6288 5.54799 11.6288 5.2491C11.6288 4.95022 11.5101 4.66357 11.2987 4.45223C11.0874 4.24088 10.8008 4.12215 10.5019 4.12215C10.203 4.12215 9.91634 4.24088 9.705 4.45223L9.70406 4.4541Z" fill="black"/>
                    </svg>
                </button>
                <button className="cursor-pointer transition-transform duration-300 hover:scale-125" onClick={() => swiperRef.current?.slideNext()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M14.2959 4.4541L21.0459 11.2041C21.1508 11.3086 21.234 11.4328 21.2908 11.5696C21.3476 11.7063 21.3768 11.8529 21.3768 12.001C21.3768 12.149 21.3476 12.2957 21.2908 12.4324C21.234 12.5691 21.1508 12.6933 21.0459 12.7979L14.2959 19.5479C14.0846 19.7592 13.7979 19.8779 13.4991 19.8779C13.2002 19.8779 12.9135 19.7592 12.7022 19.5479C12.4908 19.3365 12.3721 19.0499 12.3721 18.751C12.3721 18.4521 12.4908 18.1654 12.7022 17.9541L17.5313 13.125L3.75 13.125C3.45163 13.125 3.16548 13.0065 2.9545 12.7955C2.74353 12.5846 2.625 12.2984 2.625 12C2.625 11.7017 2.74353 11.4155 2.95451 11.2045C3.16548 10.9936 3.45163 10.875 3.75 10.875L17.5313 10.875L12.7013 6.04598C12.4899 5.83463 12.3712 5.54799 12.3712 5.2491C12.3712 4.95022 12.4899 4.66357 12.7013 4.45223C12.9126 4.24088 13.1992 4.12215 13.4981 4.12215C13.797 4.12215 14.0837 4.24088 14.295 4.45223L14.2959 4.4541Z" fill="black"/>
                    </svg>
                </button>
            </div>
        </div>

        <div>

        <Swiper
        modules={[Navigation]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        navigation={false}
        loop={true}
        spaceBetween={40}
        centeredSlides={false}
        slidesPerView={1.2}
        breakpoints={{
          768: {
            slidesPerView: 2.7,
          },
          1024: {
            slidesPerView: 2.7,
            spaceBetween: 50,
          },
          1280: {
            slidesPerView: 3.3,
            spaceBetween: 90,
          },
        }}>
        {testimonials.map((item) => (
          <SwiperSlide key={item.id} className="group transition-all duration-300">
            <div className="border border-[#0000001a] rounded-[1.25rem] cursor-grabbing p-6 w-[22.37rem] h-[11.63rem] lg:px-8 lg:py-[1.75rem] lg:w-[25rem] lg:h-[12.97rem]">
                <h3 className="text-base font-bold leading-[1.37rem] lg:text-xl flex items-center">
                    {item.name} 
                    <span className="pl-1 lg:w-6 lg:h-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
                            <path d="M9.5 1.97095C7.97338 1.97095 6.48104 2.42364 5.2117 3.27179C3.94235 4.11994 2.95302 5.32544 2.36881 6.73586C1.78459 8.14628 1.63174 9.69826 1.92957 11.1956C2.2274 12.6928 2.96254 14.0682 4.04202 15.1477C5.12151 16.2272 6.49686 16.9623 7.99415 17.2601C9.49144 17.558 11.0434 17.4051 12.4538 16.8209C13.8643 16.2367 15.0698 15.2473 15.9179 13.978C16.7661 12.7087 17.2188 11.2163 17.2188 9.6897C17.2166 7.64322 16.4027 5.68118 14.9556 4.2341C13.5085 2.78703 11.5465 1.97311 9.5 1.97095ZM12.8888 8.32853L8.73258 12.4848C8.67744 12.54 8.61195 12.5838 8.53987 12.6137C8.46779 12.6435 8.39053 12.6589 8.3125 12.6589C8.23448 12.6589 8.15721 12.6435 8.08513 12.6137C8.01305 12.5838 7.94757 12.54 7.89243 12.4848L6.11118 10.7035C5.99976 10.5921 5.93717 10.441 5.93717 10.2834C5.93717 10.1259 5.99976 9.97478 6.11118 9.86337C6.22259 9.75196 6.37369 9.68937 6.53125 9.68937C6.68881 9.68937 6.83992 9.75196 6.95133 9.86337L8.3125 11.2253L12.0487 7.48837C12.1038 7.4332 12.1693 7.38944 12.2414 7.35959C12.3135 7.32973 12.3907 7.31437 12.4688 7.31437C12.5468 7.31437 12.624 7.32973 12.6961 7.35959C12.7682 7.38944 12.8337 7.4332 12.8888 7.48837C12.944 7.54353 12.9878 7.60903 13.0176 7.6811C13.0475 7.75318 13.0628 7.83043 13.0628 7.90845C13.0628 7.98646 13.0475 8.06371 13.0176 8.13579C12.9878 8.20787 12.944 8.27336 12.8888 8.32853Z" fill="#01AB31"/>
                        </svg>
                    </span>
                </h3>
                <p className="text-sm leading-[1.25rem] opacity-60 lg:text-base lg:leading-[1.37rem] pt-2 lg:pt-3">{item.comment}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

        </div>
    </div>
  )
}

export default Testimonial;
