import axiosinstance from "../helpers/axiosinstance";

export async function fetchProductData(productId) {
  
    try {
        const {data}= await axiosinstance.get(`https://dummyjson.com/products/${productId}`)
        console.log(data)
        return data
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  