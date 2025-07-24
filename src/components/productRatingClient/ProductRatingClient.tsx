"use client";

import { useState } from "react";
import RatingStars from "@/components/ratingStars/RatingStars";

interface ProductRatingClientProps {
  defaultValue: number;
  productId: number;
}

export default function ProductRatingClient({ defaultValue, productId }: ProductRatingClientProps) {
  const [userRating, setUserRating] = useState(defaultValue);
  const [loading, setLoading] = useState(false);

  const handleRatingChange = async (newRating: number) => {
    setUserRating(newRating);
    setLoading(true);

    try {
      const res = await fetch(`/api/rating`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, rating: newRating }),
      });

      if (!res.ok) throw new Error("خطا در ذخیره امتیاز");

      const result = await res.json();
      console.log("✅ ذخیره شد:", result);
    } catch (err) {
      console.error("❌ خطا:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2 pb-3 lg:pb-4">
      <RatingStars value={userRating} onChange={handleRatingChange} />
      <span className="text-sm opacity-60">
        {loading ? "در حال ذخیره..." : `(${userRating}/5)`}
      </span>
    </div>
  );
}
