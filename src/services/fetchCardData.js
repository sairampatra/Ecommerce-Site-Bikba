import axiosinstance from "../helpers/axiosinstance";

export async function fetchInfiniteCardData(limit,skip,order) {
  const ll = `&sortBy=price&order=${order}`;
  try {
      const {data}= await axiosinstance.get(`?limit=${limit}&skip=${skip}${order ? ll : ''}`)
      return data
    
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function fetchSearchCardData(searchQuery,order) {
  const ll = `&sortBy=price&order=${order}`;

  try {
      const {data}= await axiosinstance.get(`/search?q=${searchQuery}${order ? ll : ''}`)
      console.log(data,'sdjhfbsdjgvg')
      return data
    
  } catch (error) {
    console.log(error);
    return error;
  }
}
