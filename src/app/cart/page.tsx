"use client"

import CartItem from "@/components/cartItem/CartItem";
import { useShoppingCartContext } from "@/context/ShoppingCartContext";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Iproducts } from "@/type";

interface Idiscounts{
  id: number,
  code: string,
  percentage: number
}

function Cart() {

  const {cartItems} = useShoppingCartContext();
  
  const [productData , setProductData] = useState<Iproducts[]>([]);
  const [discountCode , setDiscountCode] = useState("");
  const [finalPrice , setFinalPrice] = useState(0);
  const [discountPrice , setDiscountPrice] = useState(0);

  // useEffect(()=>{
  //   axios.get(`http://localhost:8000/products`)
  //   .then((result)=>{
  //     const {data} = result; 
  //     setProductData(data);
  //   })
  // } , []);

   useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (!error && data) setProductData(data as Iproducts[]);
    };

    fetchProducts();
  }, []);

  // const handleSubmitDiscount = ()=>{
  //   axios.get(`http://localhost:8000/discounts?code=${discountCode}`)
  //   .then((result)=>{
  //     const data = result.data as Idiscounts[];

  //     let discountPrice = (totalPrice * data[0].percentage) / 100
  //     let finalPrice = totalPrice - discountPrice;

  //     setFinalPrice(finalPrice);
  //     setDiscountPrice(discountPrice);
  //   })
  // }


  const handleSubmitDiscount = async () => {
    const { data, error } = await supabase
      .from("discounts")
      .select("*")
      .eq("code", discountCode);

    if (data && data.length > 0) {
      const discount = data[0];
      const discountValue = (totalPrice * discount.percentage) / 100;
      setDiscountPrice(discountValue);
      setFinalPrice(totalPrice - discountValue);
    }
  };
  

  let totalPrice = cartItems.reduce((total , item)=>{
                    let selected = productData.find((product)=> product.id == (item.id).toString());
                    return(total + (selected?.cost || 0) * item.qty);
                  } , 0)

  return (
    <div className="mb-[11.56rem] mx-4 lg:mx-24 lg:mb-[13.75rem]">
      <div className="bg-black opacity-10 w-full h-[0.06rem] mb-[1.41rem] lg:my-6"></div>
      <div className="flex items-center gap-1 lg:gap-3">
        <h3 className="text-sm font-normal opacity-60 lg:text-base">Home</h3>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
              <path d="M5.71433 2.6607L10.0893 7.0357C10.1505 7.09666 10.1991 7.16911 10.2322 7.24888C10.2653 7.32865 10.2823 7.41417 10.2823 7.50054C10.2823 7.58691 10.2653 7.67243 10.2322 7.7522C10.1991 7.83197 10.1505 7.90442 10.0893 7.96538L5.71433 12.3404C5.59105 12.4637 5.42384 12.5329 5.24949 12.5329C5.07514 12.5329 4.90793 12.4637 4.78464 12.3404C4.66136 12.2171 4.5921 12.0499 4.5921 11.8755C4.5921 11.7012 4.66136 11.534 4.78464 11.4107L8.69535 7.49999L4.7841 3.58929C4.66081 3.46601 4.59155 3.2988 4.59155 3.12445C4.59155 2.9501 4.66081 2.78289 4.7841 2.6596C4.90738 2.53632 5.07459 2.46706 5.24894 2.46706C5.42329 2.46706 5.5905 2.53632 5.71379 2.6596L5.71433 2.6607Z" fill="black" fillOpacity="0.6"/>
            </svg>
          </span>
        <h3 className="text-sm font-normal lg:text-base">Cart</h3>
      </div>

      <h1 className="uppercase text-[2rem] font-bold font1 tracking-wider mt-2 mb-5 lg:text-[2.5rem] lg:my-6">Your cart</h1>

      <div className="lg:grid lg:grid-cols-7 lg:gap-5 items-start">
        <div className="border-1 border-[#0000001a] rounded-[1.25rem] w-full p-[0.88rem] lg:col-span-4 lg:px-6 lg:py-5">
          {
            cartItems.map((item)=>(
              <CartItem key={item.id} {...item} />
            ))
          }
        </div>

        <div className="border-1 border-[#0000001a] rounded-[1.25rem] w-full p-5 mt-5 lg:col-span-3 lg:mt-0 lg:px-6 lg:py-5">
          <h1 className="text-[1.25rem] font-bold lg:text-2xl">Order Summary</h1>
          <div className="flex flex-col mt-4 lg:mt-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-normal opacity-60 lg:text-xl">Subtotal</h3>
                <h3 className="text-base font-normal opacity-60 lg:text-xl my-5">Discount</h3>
                <h3 className="text-base font-normal opacity-60 lg:text-xl">Delivery Fee</h3>
              </div>
              <div className="text-end">
                <h4 className="text-base font-bold lg:text-xl">${totalPrice}</h4>
                <h4 className="text-base font-bold text-[#FF3333] lg:text-xl my-5">-${discountPrice}</h4>
                <h4 className="text-base font-bold lg:text-xl">$15</h4>
              </div>
            </div>
          </div>

          <div className="bg-black opacity-10 w-full h-[0.06rem] my-5 lg:my-6"></div>

          <div className="flex justify-between items-center">
            <h3 className="text-base font-normal lg:text-xl">Total</h3>
            <h4 className="text-xl font-bold lg:text-2xl">${finalPrice || totalPrice}</h4>
          </div>

          <div className="flex justify-between items-center my-4">
            <div className="flex items-center gap-[0.62rem] bg1 rounded-[3.87rem] py-3 px-4 w-[230px] lg:w-[350px]">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M19.2305 10.4047L11.4711 2.64532C11.3264 2.4997 11.1543 2.38424 10.9647 2.30565C10.775 2.22707 10.5717 2.18691 10.3664 2.18751H3.12501C2.87637 2.18751 2.63791 2.28628 2.46209 2.46209C2.28628 2.63791 2.18751 2.87637 2.18751 3.12501V10.3664C2.18691 10.5717 2.22707 10.775 2.30565 10.9647C2.38424 11.1543 2.4997 11.3264 2.64532 11.4711L10.4047 19.2305C10.6977 19.5234 11.0951 19.688 11.5094 19.688C11.9237 19.688 12.3211 19.5234 12.6141 19.2305L19.2305 12.6141C19.5234 12.3211 19.688 11.9237 19.688 11.5094C19.688 11.0951 19.5234 10.6977 19.2305 10.4047ZM11.5094 17.6836L4.06251 10.2344V4.06251H10.2344L17.6813 11.5094L11.5094 17.6836ZM7.81251 6.56251C7.81251 6.80973 7.7392 7.05141 7.60184 7.25697C7.46449 7.46253 7.26927 7.62275 7.04086 7.71736C6.81245 7.81197 6.56112 7.83672 6.31864 7.78849C6.07617 7.74026 5.85344 7.62121 5.67862 7.44639C5.50381 7.27157 5.38476 7.04885 5.33652 6.80637C5.28829 6.56389 5.31305 6.31256 5.40766 6.08415C5.50227 5.85574 5.66248 5.66052 5.86804 5.52317C6.07361 5.38582 6.31528 5.31251 6.56251 5.31251C6.89403 5.31251 7.21197 5.4442 7.44639 5.67862C7.68081 5.91304 7.81251 6.23099 7.81251 6.56251Z" fill="black" fillOpacity="0.4"/>
                </svg>
              </span>
              <input onChange={(e)=>setDiscountCode(e.target.value)} className="opacity-60 outline-none" type="text" placeholder="Add promo code" />
            </div>
            <div>
              <button onClick={handleSubmitDiscount} className="bg-black text-sm font-medium py-3 px-8 rounded-[3.87rem] text-white cursor-pointer lg:text-base">Apply</button>
            </div>
          </div>

          <button className="bg-black text-white py-4 w-full rounded-[3.87rem] text-sm lg:text-base font-medium flex items-center justify-center cursor-pointer">
            Go to Checkout
            <span className="ml-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M11.9133 3.71169L17.5383 9.33669C17.6257 9.42379 17.695 9.52728 17.7423 9.64124C17.7897 9.75519 17.814 9.87737 17.814 10.0008C17.814 10.1241 17.7897 10.2463 17.7423 10.3603C17.695 10.4742 17.6257 10.5777 17.5383 10.6648L11.9133 16.2898C11.7372 16.4659 11.4983 16.5649 11.2492 16.5649C11.0001 16.5649 10.7613 16.4659 10.5852 16.2898C10.409 16.1137 10.3101 15.8748 10.3101 15.6258C10.3101 15.3767 10.409 15.1378 10.5852 14.9617L14.6094 10.9375L3.125 10.9375C2.87636 10.9375 2.6379 10.8387 2.46209 10.6629C2.28627 10.4871 2.1875 10.2486 2.1875 9.99997C2.1875 9.75133 2.28627 9.51288 2.46209 9.33706C2.6379 9.16125 2.87636 9.06247 3.125 9.06247L14.6094 9.06247L10.5844 5.03826C10.4083 4.86214 10.3093 4.62326 10.3093 4.37419C10.3093 4.12512 10.4083 3.88625 10.5844 3.71013C10.7605 3.53401 10.9994 3.43506 11.2484 3.43506C11.4975 3.43506 11.7364 3.53401 11.9125 3.71013L11.9133 3.71169Z" fill="white"/>
              </svg>
            </span>
          </button>
        </div>

      </div>
    </div>
  )
}

export default Cart;
