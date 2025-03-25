import React, { useEffect } from "react";
import axiosinstance from "../helpers/axiosinstance";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchInfiniteCardData,fetchSearchCardData } from "../services/fetchCardData";
import { useStore } from "../State/store";
import { useDebounce } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();

  const{searchQuerry} = useStore()
  const debouncedQuery = useDebounce(searchQuerry,1000)
const LIMIT = 8
  const { isLoading, isFetchingNextPage,fetchNextPage,hasNextPage, isError, error, data } = useInfiniteQuery({
    queryKey: ["searchProduct"],
    
    queryFn: ({pageParam=0})=>fetchInfiniteCardData(LIMIT,pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.products?.length === LIMIT) {
        return allPages?.length * LIMIT; 
      }
      return null;       
    },
    retry:2,
    retryDelay: 2000,
    gcTime: 1000 * 60 * 2,

  })

  const { isLoading : isLoadingSearch , isFetching:isFetchingSearch, data:dataSearch }=useQuery({
    queryKey: ["searchProduct", debouncedQuery],
    queryFn: fetchSearchCardData(debouncedQuery),
    enabled: debouncedQuery.length > 0  
  });
  const handleInfiniteScroll = ()=>{

    if (window.innerHeight+document.documentElement.scrollTop + 1 >= 
      document.documentElement.scrollHeight
    ) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
        
      }
    }
  }
 
  useEffect(()=>{
    if (!debouncedQuery) {

      window.addEventListener("scroll",handleInfiniteScroll)
      return ()=> window.removeEventListener("scroll", handleInfiniteScroll)
    }
  },[hasNextPage,isFetchingNextPage,fetchNextPage,debouncedQuery])
  const finalData =
  debouncedQuery && debouncedQuery.length > 0
    ? dataSearch?.products
    : data?.pages.flatMap((page) => page.products);

    if (isLoadingSearch || isLoading ) {
      return <div className="mt-20">Loading...</div>
    }
    console.log(finalData)
 if (finalData.length == 0 ) {
  console.log('jagan')
  return <div className="mt-20">no data...</div>

 }
  return (
<div className="mt-12">
<div className={`w-full  py-5 ${debouncedQuery.length > 0  ? 'hidden':"block"} ` }>
  <h1 className="text-7xl px-4">Infinite Products</h1>
</div>

    <div className="grid  w-full h-full grid-cols-4  ">
 {
  finalData?.map((item,index)=>(
<div key={index}  className="rounded-lg mb-0    m-auto w-[88%] h-[92%]  group relative cursor-pointer flex items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
    <div className="h-[68vh] w-full bg-[#E7E6EB] ">
      <img
        className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
        src={item?.thumbnail}
        alt=""
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70">
     
    </div>
    <div className="absolute inset-0 flex translate-y-[56%] text-white flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
      <h1 className="font-dmserif text-3xl mb-2 font-bold text-white">{item.title}</h1>
      <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
       {item.description}
      </p>
      <button 
      onClick={()=>navigate(`/SingleProduct/${item.id}`) }
      className="hover:scale-110 ease-out duration-300 rounded-full  mb-6 bg-[#3f4142a4]   py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60">
        see more
      </button>
    </div>
  </div>
  ))
 }

 

      </div>

      {isFetchingNextPage &&     <div className="w-full flex items-center justify-center "> <span className="loading loading-dots   mt-2 text-[#00BADB]  loading-xl mb-2"></span></div>}
      </div>

      
   
  );
}

export default Search;
