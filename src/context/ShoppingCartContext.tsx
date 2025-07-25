"use client"

import { createContext, useContext, useEffect, useState } from "react";

interface IShoppingCartContextProvider{
    children: React.ReactNode
}

interface IcartItems{
    id: number,
    qty: number
}

interface IshoppingCartContext{
    cartItems: IcartItems[],
    handleIncreaseQty: (id: number)=> void,
    productQty: (id: number)=> number,
    handleDecreaseQty: (id: number)=> void,
    handleRemoveProduct: (id: number)=> void
}


const shoppingCartContext = createContext({} as IshoppingCartContext);

export const useShoppingCartContext = ()=>{
    return(
        useContext(shoppingCartContext)
    );
}


export const ShoppingCartContextProvider = ({children}: IShoppingCartContextProvider)=>{

    const [cartItems , setCartItems] = useState<IcartItems[]>([])

    const handleIncreaseQty = (id: number)=>{
        setCartItems((currentItems)=>{
            const isProductExist = currentItems.find((item)=> item.id == id) == null;
            if(isProductExist){
                return [...currentItems , {id: id , qty: 1}];
            }
            else{
                return(currentItems.map((item)=>{
                    if(item.id == id){
                        return{...item , qty: item.qty + 1};
                    }
                    else{
                        return item;
                    }
                }))
            }
        })
    };

    const productQty = (id: number)=>{
        return cartItems.find((item)=> item.id == id)?.qty || 0;
    }

    const handleDecreaseQty = (id: number)=>{
        setCartItems((currentItems)=>{
            const isLastOne = currentItems.find((item)=> item.id == id)?.qty == 1;
            if(isLastOne){
                return(currentItems.filter((item)=> item.id != id));
            }
            else{
                return(currentItems.map((item)=>{
                    if(item.id == id){
                        return{...item , qty: item.qty - 1};
                    }
                    else{
                        return item;
                    }
                }))
            }
        })
    };

    const handleRemoveProduct = (id: number)=>{
        setCartItems((currentItems)=>{
            return (currentItems.filter((item)=> item.id != id));
        })
    }

    useEffect(()=>{
        const storedCartItems = localStorage.getItem("cartItems");
        if(storedCartItems){
            setCartItems(JSON.parse(storedCartItems));
        }
    } , [])


    useEffect(()=>{
        localStorage.setItem("cartItems" , JSON.stringify(cartItems))
    } , [cartItems])




    return(
        <shoppingCartContext.Provider value={{cartItems , handleIncreaseQty , productQty , handleDecreaseQty , handleRemoveProduct}}>
            {children}
        </shoppingCartContext.Provider>
    )
}