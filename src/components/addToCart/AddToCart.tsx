"use client"

import { useShoppingCartContext } from "@/context/ShoppingCartContext";
import { IaddProduct } from "../button/Button";

function AddToCart({id}: IaddProduct) {

    const {handleIncreaseQty} = useShoppingCartContext();

  return (
    <div className="bg-black text-white text-sm text-center font-medium py-3 lg:py-4 rounded-[3.87rem] w-full lg:text-base  border border-black transition-colors duration-400 hover:border hover:border-[#0000001a] hover:bg-white hover:text-black">
        <button onClick={()=>handleIncreaseQty(id)} className="px-15 lg:px-40 cursor-pointer transition-transform ">Add to Cart</button>
    </div>
  )
}

export default AddToCart;
