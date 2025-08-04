"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { ITestimonial } from "@/type";

const tabs = ["Product Details", "Rating & Reviews", "FAQs"];

function Comments() {
  const [activeTab, setActiveTab] = useState("Rating & Reviews");
  const [reviews, setReviews] = useState<ITestimonial[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);

  
  // useEffect(()=>{
  //   const fetchReviews = async () => {
  //     try {
  //       const result = await fetch("http://localhost:8000/testimonial");
  //       const data = (await result.json()) as ITestimonial[];
  //       setReviews(data);
  //     }
  //     catch (error){
  //       console.error("Failed to fetch reviews:", error);
  //     }
  //   };
  //   fetchReviews();
  // }, []);


  useEffect(() => {
  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*");

    if (error) {
      console.error("Failed to fetch reviews:", error.message);
    } else {
      setReviews(data);
    }
  };

  fetchReviews();
}, []);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setVisibleCount(isMobile ? 3 : 6);
  }, []);

  const handleLoadMore = ()=>{
    const isMobile = window.innerWidth < 768;
    setVisibleCount((prev) => prev + (isMobile ? 3 : 6));
  };

  return (
    <div className="mx-auto px-4 pt-10">
      {/* Tabs */}
      <div className="flex justify-between lg:justify-around items-center border-b border-[#0000001a] mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 text-base whitespace-nowrap font-normal lg:text-xl cursor-pointer hover:border-b-1 ${
              activeTab === tab ? "border-b-2 border-black text-black" : "text-gray-500"}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      {activeTab === "Product Details" && (
        <div className="text-gray-700 text-center">
          <p className="texxt-xl font-bold">Product Details</p>
        </div>
      )}

      {activeTab === "FAQs" && (
        <div className="text-gray-700 text-center">
          <p className="texxt-xl font-bold">Frequently Asked Questions</p>
        </div>
      )}

      {activeTab === "Rating & Reviews" && (
        <div>
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 lg:gap-5">
            {reviews.slice(0, visibleCount).map((review) => (
              <div key={review.id} className="border border-[#0000001a] rounded-[1.25rem] p-6 w-[22.37rem] h-[11.63rem] lg:px-8 lg:py-[1.75rem] lg:w-full lg:h-[15.09rem]">
                <h3 className="text-base font-bold leading-[1.37rem] lg:text-xl flex items-center">
                    {review.name} 
                    <span className="pl-1 lg:w-6 lg:h-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
                            <path d="M9.5 1.97095C7.97338 1.97095 6.48104 2.42364 5.2117 3.27179C3.94235 4.11994 2.95302 5.32544 2.36881 6.73586C1.78459 8.14628 1.63174 9.69826 1.92957 11.1956C2.2274 12.6928 2.96254 14.0682 4.04202 15.1477C5.12151 16.2272 6.49686 16.9623 7.99415 17.2601C9.49144 17.558 11.0434 17.4051 12.4538 16.8209C13.8643 16.2367 15.0698 15.2473 15.9179 13.978C16.7661 12.7087 17.2188 11.2163 17.2188 9.6897C17.2166 7.64322 16.4027 5.68118 14.9556 4.2341C13.5085 2.78703 11.5465 1.97311 9.5 1.97095ZM12.8888 8.32853L8.73258 12.4848C8.67744 12.54 8.61195 12.5838 8.53987 12.6137C8.46779 12.6435 8.39053 12.6589 8.3125 12.6589C8.23448 12.6589 8.15721 12.6435 8.08513 12.6137C8.01305 12.5838 7.94757 12.54 7.89243 12.4848L6.11118 10.7035C5.99976 10.5921 5.93717 10.441 5.93717 10.2834C5.93717 10.1259 5.99976 9.97478 6.11118 9.86337C6.22259 9.75196 6.37369 9.68937 6.53125 9.68937C6.68881 9.68937 6.83992 9.75196 6.95133 9.86337L8.3125 11.2253L12.0487 7.48837C12.1038 7.4332 12.1693 7.38944 12.2414 7.35959C12.3135 7.32973 12.3907 7.31437 12.4688 7.31437C12.5468 7.31437 12.624 7.32973 12.6961 7.35959C12.7682 7.38944 12.8337 7.4332 12.8888 7.48837C12.944 7.54353 12.9878 7.60903 13.0176 7.6811C13.0475 7.75318 13.0628 7.83043 13.0628 7.90845C13.0628 7.98646 13.0475 8.06371 13.0176 8.13579C12.9878 8.20787 12.944 8.27336 12.8888 8.32853Z" fill="#01AB31"/>
                        </svg>
                    </span>
                </h3>
                <p className="text-sm leading-[1.25rem] opacity-60 lg:text-base lg:leading-[1.37rem] pt-2 lg:pt-3">{review.comment}</p>
            </div>
            ))}
          </div>

          {reviews.length && (
            <div className="mt-5 text-center lg:mt-[2.28rem]">
              <button onClick={handleLoadMore} className="text-sm font-medium py-[0.88rem] px-9 border border-[#0000001a] rounded-[3.87rem] lg:px-[3.38rem] lg:py-4 lg:text-base cursor-pointer transition-colors duration-400 hover:bg-black hover:text-white">Load More Reviews</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Comments;
