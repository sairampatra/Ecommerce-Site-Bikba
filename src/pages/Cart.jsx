import React, { useState } from "react";
import { useStore } from "../State/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { theme,cart,setCart } = useStore();

  const navigate = useNavigate();

  useEffect(() => {
    const localCartData = localStorage.getItem("cart");
    if (localCartData) {
        setCart(JSON.parse(localCartData));
    }
  }, []);
  const RemoveProduct = (id)=>{
    const updatedCart = cart.filter(
        (product) => product.id !== id
      );
      setCart(updatedCart);

      localStorage.setItem('cart',JSON.stringify(updatedCart))
      toast("Movie removed from watchlist");
      // console.log("Movie removed from watchlist");
   

  }
  return (
    <div className={`${theme}`}>
      <div className="mt-16 dark:bg-[#161616] min-h-[91vh]">
        <div className="grid  w-full h-full grid-cols-4  ">
          {cart?.map((item, index) => (
            <div
              key={index}
              className="rounded-lg mb-0  dark:rounded-none  m-auto w-[88%] h-[92%]  group relative cursor-pointer flex items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30"
            >
              <div className="h-[68vh] w-full bg-[#E7E6EB]  dark:bg-[#BEBEBE] ">
                <img
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
                  src={item?.thumbnail}
                  alt=""
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
              <div className="absolute inset-0 flex translate-y-[56%] text-white flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                <h1 className="font-dmserif text-3xl mb-2 font-bold text-white">
                  {item?.title}
                </h1>
                <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {item?.description}
                </p>
                <button
                  onClick={() => navigate(`/SingleProduct/${item.id}`)}
                  className="dark:text-[#141618] font-medium  dark:bg-[#EFEFEF] hover:scale-110 ease-out duration-300 rounded-full  mb-4 bg-[#3f4142a4]   py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60"
                >
                  see more
                </button> 
                <button
                  onClick={() => RemoveProduct(item.id)}
                  className="dark:text-[#141618] font-medium  dark:bg-[#EFEFEF] hover:scale-110 ease-out duration-300 rounded-full  mb-4 bg-[#3f4142a4]   py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60"
                >
                  Remove from cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cart;
