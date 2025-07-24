"use client"

import { useShoppingCartContext } from "@/context/ShoppingCartContext";
import { IaddProduct } from "../button/Button";

function AddToCart({id}: IaddProduct) {

    const {handleIncreaseQty} = useShoppingCartContext();

  return (
    <div className="bg-black text-white text-sm text-center font-medium py-3 lg:py-4 rounded-[3.87rem] flex-wrap w-full lg:text-base">
        <button onClick={()=>handleIncreaseQty(id)} className="px-15 lg:px-40">Add to Cart</button>
    </div>
  )
}

export default AddToCart;
