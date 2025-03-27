import React, { useEffect, useState } from "react";
import axiosinstance from "../helpers/axiosinstance";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  fetchInfiniteCardData,
  fetchSearchCardData,
} from "../services/fetchCardData";
import { useStore } from "../State/store";
import { useDebounce } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState(null);
  const handleOrderBy = (par)=>{
 setOrder(par);
  setIsOpen(false);
  }
  const { searchQuerry,theme } = useStore();
  const debouncedQuery = useDebounce(searchQuerry, 1000);
  const LIMIT = 8;
  const {
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
    data,
  } = useInfiniteQuery({
    queryKey: ["infiniteProducts",order],

    queryFn: ({ pageParam = 0 }) => fetchInfiniteCardData(LIMIT, pageParam,order),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.products?.length === LIMIT) {
        return allPages?.length * LIMIT;
      }
      return null;
    },
    retry: 2,
    retryDelay: 2000,
    gcTime: 1000 * 60 * 2,
  });

  const {
    isLoading: isLoadingSearch,
    isFetching: isFetchingSearch,
    data: dataSearch,
  } = useQuery({
    queryKey: ["searchProduct", debouncedQuery,order],
    queryFn:() => fetchSearchCardData(debouncedQuery , order),
    enabled: debouncedQuery.length > 0,
  });
  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  };

  useEffect(() => {
    if (!debouncedQuery) {
      window.addEventListener("scroll", handleInfiniteScroll);
      return () => window.removeEventListener("scroll", handleInfiniteScroll);
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, debouncedQuery]);
  const finalData =
    debouncedQuery && debouncedQuery.length > 0
      ? dataSearch?.products
      : data?.pages.flatMap((page) => page?.products);

  if (isLoadingSearch || isLoading) {
    return <div className="mt-20">Loading...</div>;
  }
  console.log(error);
  if ((finalData?.length == 0 ) ) {
    // console.log(finalData);
    return <div className="mt-20">no data...</div>;
  }
  return ( 
    <div className={`${theme}`}>

    <div className="mt-16 dark:bg-[#161616]">
      <div className="w-full flex justify-end px-5 ">
      <div className="relative">
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="dark:text-[#141618] font-medium  dark:bg-[#EFEFEF] mt-4 border-2 p-1 px-3 rounded-md shadow-md w-[6vw] active:scale-90 transition-transform duration-150 ease-in-out"
    >
    Filter
  </button>

  {isOpen && (
    <ul className="dark:bg-[#EFEFEF] absolute w-[230%] right-5 mt-3 z-10 rounded-lg flex flex-col shadow-xl bg-white border-[1px] py-1 transition-all duration-200 origin-top transform opacity-100 scale-100">
      <li
        onClick={() => handleOrderBy("asc")}
        className="p-1 hover:bg-[#F3F4F6] cursor-pointer font-normal dark:text-[#141618]"
        >
        Price: Low to High
      </li>
      <li
        onClick={() => handleOrderBy("desc")}
        className="p-1 hover:bg-[#F3F4F6] cursor-pointer font-normal dark:text-[#141618]"
        >
        Price: High to Low
      </li>
    </ul>
  )}
</div>

      </div>
      <div
        className={`w-[100vh]   ${
          debouncedQuery.length > 0 ? "hidden" : "block"
        } `}
        >
        <h1 className=" text-6xl px-4 dark:text-[#ECEEF0]">Infinite Products</h1>
      </div>

      <div className="grid  w-full h-full grid-cols-4  ">
        {finalData?.map((item, index) => (
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
              <h3>${item?.price}</h3>
            </div>
          </div>
        ))}
      </div>

      {isFetchingNextPage && (
        <div className="w-full flex items-center justify-center ">
          {" "}
          <span className="loading loading-dots   mt-2 text-[#00BADB] dark:text-[#6885B1]   loading-xl mb-2"></span>
        </div>
      )}
    </div>
      </div>
  );
}

export default Search;
