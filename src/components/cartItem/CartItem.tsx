"use client"

import { supabase } from "@/lib/supabaseClient";
import { useShoppingCartContext } from "@/context/ShoppingCartContext";
import Button, { IaddProduct } from "../button/Button";
import { useEffect, useState } from "react";
import { Iproducts } from "@/type";


function CartItem({id}: IaddProduct) {

  const {handleRemoveProduct} = useShoppingCartContext();

  const [productData , setProductData] = useState({} as Iproducts);

  // useEffect(()=>{
  //   axios.get(`http://localhost:8000/products/${id}`)
  //   .then((result)=>{
  //     const {data} = result;
  //     setProductData(data);
  //     console.log(setProductData(data));
      
  //   })
  // } , [])


  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching product:", error.message);
      } else {
        setProductData(data);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <div className="grid grid-cols-4 gap-[0.88rem]">
      <div className="col-span-1">
        <img className="rounded-[0.54rem] h-[6.18rem] lg:h-[7.75rem] w-full" src={productData.image} alt="" />
      </div>

      <div className="col-span-3 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-base font-bold lg:text-xl">{productData.title}</h1>
            <h3 className="text-sm font-normal">
              Size: <span className="opacity-60">Large</span>
            </h3>
            <h3 className="text-sm font-normal">
              Color: <span className="opacity-60">White</span>
            </h3>
          </div>
          <div>
            <button onClick={()=> handleRemoveProduct(id)}>
              <svg className="lg:w-5 lg:h-6" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M16.875 3.75H13.75V3.125C13.75 2.62772 13.5525 2.15081 13.2008 1.79917C12.8492 1.44754 12.3723 1.25 11.875 1.25H8.125C7.62772 1.25 7.15081 1.44754 6.79917 1.79917C6.44754 2.15081 6.25 2.62772 6.25 3.125V3.75H3.125C2.95924 3.75 2.80027 3.81585 2.68306 3.93306C2.56585 4.05027 2.5 4.20924 2.5 4.375C2.5 4.54076 2.56585 4.69973 2.68306 4.81694C2.80027 4.93415 2.95924 5 3.125 5H3.75V16.25C3.75 16.5815 3.8817 16.8995 4.11612 17.1339C4.35054 17.3683 4.66848 17.5 5 17.5H15C15.3315 17.5 15.6495 17.3683 15.8839 17.1339C16.1183 16.8995 16.25 16.5815 16.25 16.25V5H16.875C17.0408 5 17.1997 4.93415 17.3169 4.81694C17.4342 4.69973 17.5 4.54076 17.5 4.375C17.5 4.20924 17.4342 4.05027 17.3169 3.93306C17.1997 3.81585 17.0408 3.75 16.875 3.75ZM8.75 13.125C8.75 13.2908 8.68415 13.4497 8.56694 13.5669C8.44973 13.6842 8.29076 13.75 8.125 13.75C7.95924 13.75 7.80027 13.6842 7.68306 13.5669C7.56585 13.4497 7.5 13.2908 7.5 13.125V8.125C7.5 7.95924 7.56585 7.80027 7.68306 7.68306C7.80027 7.56585 7.95924 7.5 8.125 7.5C8.29076 7.5 8.44973 7.56585 8.56694 7.68306C8.68415 7.80027 8.75 7.95924 8.75 8.125V13.125ZM12.5 13.125C12.5 13.2908 12.4342 13.4497 12.3169 13.5669C12.1997 13.6842 12.0408 13.75 11.875 13.75C11.7092 13.75 11.5503 13.6842 11.4331 13.5669C11.3158 13.4497 11.25 13.2908 11.25 13.125V8.125C11.25 7.95924 11.3158 7.80027 11.4331 7.68306C11.5503 7.56585 11.7092 7.5 11.875 7.5C12.0408 7.5 12.1997 7.56585 12.3169 7.68306C12.4342 7.80027 12.5 7.95924 12.5 8.125V13.125ZM12.5 3.75H7.5V3.125C7.5 2.95924 7.56585 2.80027 7.68306 2.68306C7.80027 2.56585 7.95924 2.5 8.125 2.5H11.875C12.0408 2.5 12.1997 2.56585 12.3169 2.68306C12.4342 2.80027 12.5 2.95924 12.5 3.125V3.75Z" fill="#FF3333"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-[1.25rem] font-bold lg:text-2xl">${productData.cost}</h1>
          <Button id={id} />
        </div>
      </div>
      </div>
      <div className="bg-black opacity-10 w-full h-[0.06rem] my-4 lg:my-6"></div>
    </div>
  );
}

export default CartItem;
