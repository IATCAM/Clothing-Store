"use client";

import { useState } from "react";

interface RatingStarsProps {
  value: number;
  onChange?: (rating: number) => void;
  editable?: boolean;
}

export default function RatingStars({ value, onChange, editable = true }: RatingStarsProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const isFilled = (index: number) =>
    hovered !== null ? index <= hovered : index <= value;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!editable}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(null)}
          className="w-6 h-6 transition-transform duration-150 hover:scale-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23" viewBox="0 0 24 23" fill={isFilled(star) ? "#FFC633" : "none"}>
            <path d="M11.9805 0L15.4812 7.53796L23.7319 8.53794L17.6447 14.1966L19.2433 22.3526L11.9805 18.3119L4.71768 22.3526L6.31628 14.1966L0.229024 8.53794L8.47981 7.53796L11.9805 0Z" fill={isFilled(star) ? "#FFC633" : "none"} stroke="#FFC633"/>
          </svg>
        </button>
      ))}
    </div>
  );
}
