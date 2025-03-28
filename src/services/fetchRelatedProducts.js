import axiosinstance from "../helpers/axiosinstance";

export async function fetchRelatedProductData(category){
try {
    // console.log(category)
    const {data}= await axiosinstance.get(`https://dummyjson.com/products/category/${category}`)
    return data.products
} catch (error) {
  console.log(error);
  return null;
}
}