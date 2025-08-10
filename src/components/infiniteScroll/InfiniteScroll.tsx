"use client";

import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";

interface Product {
  id: number;
  title: string;
  image: string;
  rate: number;
  cost: number;
}

interface Props {
  initialProducts: Product[];
  searchTitle: string;
}

const PAGE_SIZE = 8;

export default function InfiniteProducts({ initialProducts, searchTitle }: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMore = async () => {
    let query = supabase
      .from("products")
      .select("*")
      .order("id", { ascending: true })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

    if (searchTitle) {
      query = query.ilike("title", `%${searchTitle}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching more products:", error.message);
      setHasMore(false);
      return;
    }

    if (!data || data.length === 0) {
      setHasMore(false);
      return;
    }

    setProducts((prev) => [...prev, ...data]);
    setPage(page + 1);
  };

  return (
    <InfiniteScroll style={{overflow: "hidden"}}
      dataLength={products.length}
      next={fetchMore}
      hasMore={hasMore}
      loader= {<div className="flex justify-center mb-40"><LoadingSpinner /></div>}
    >
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6 mb-40 lg:mb-30">
        {products.map((item) => (
          <Link key={item.id} href={`/product/${item.id}`} className="group">
            <div className="mb-4 transition-transform duration-300 group-hover:scale-105 hover:rounded-xl">
              <img src={item.image} alt={item.title} className="w-full h-48 lg:h-72 object-cover rounded-xl shadow-md"/>
              <h2 className="text-base font-bold mt-2 lg:text-xl">{item.title}</h2>
              <p className="text-sm text-gray-600">{item.rate}/5</p>
              <p className="text-lg font-bold">${item.cost}</p>
            </div>
          </Link>
        ))}
      </div>
    </InfiniteScroll>
  );
}
