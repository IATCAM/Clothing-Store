// app/api/rating/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { productId, rating } = await request.json();

  // شبیه‌سازی ذخیره در دیتابیس (مثلاً JSON Server یا Supabase)
  console.log(`📥 productId: ${productId}, rating: ${rating}`);

  // اینجا مثلاً می‌فرستیم به یک endpoint خارجی:
  const res = await fetch(`http://localhost:3001/products/${productId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rate: rating }),
  });

  const data = await res.json();

  return NextResponse.json({ message: "Saved", data });
}
