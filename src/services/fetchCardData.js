import axiosinstance from "../helpers/axiosinstance";

export async function fetchInfiniteCardData(limit,skip) {
  
  try {
    // const URL = searchQuerry ?  `/search?q=${searchQuerry}&limit=${limit}&skip=${skip}`:`?limit=${limit}&skip=${skip}`
      const {data}= await axiosinstance.get(`?limit=${limit}&skip=${skip}`)
      return data
    
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchSearchCardData(searchQuery) {
  
  try {
      const {data}= await axiosinstance.get(`/search?q=${searchQuery}`)
      return data
    
  } catch (error) {
    console.log(error);
    return null;
  }
}
