import { Link, useParams } from "react-router-dom";
import ProductImageZoom from "../Components/ProductImageZoom/ProductImageZoom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductData } from "../services/fetchProductData";
import { useEffect, useState } from "react";
import StarRatingComponent from "../Components/Stars/Stars";

export default function ProductPage() {
  const { productId } = useParams();
  const { isLoading, data, error } = useQuery({
    queryKey: ["singleProduct"],
    queryFn: () => fetchProductData(productId),
  });
  const [mainImage, setMainImage] = useState(null);
  useEffect(() => {
    if (data?.thumbnail) {
      setMainImage(data?.thumbnail);
    }
    return () => {
      setMainImage(null);
    };
  }, [data?.images[0]]);
  if (isLoading) {
    console.log(isLoading);
    return <div className="mt-20">Loading....</div>;
  }
  return (
    <div className="container px-2   mt-20 ">
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        {/* Product Gallery */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-2 order-2 md:order-1">
            {data?.images?.map((image, index) => (
              <div
                key={index}
                className={`border cursor-pointer w-16 h-16 md:w-20 md:h-20 }`}
              >
                <img
                  src={image}
                  alt={`Product thumbnail ${index}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                  onClick={() => setMainImage(image)}
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 order-1 md:order-2">
            <ProductImageZoom
              imageSrc={mainImage}
              alt="Product Name"
              width={550}
              height={550}
              zoomScale={2.5}
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6 ">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif mb-2">
              {data?.title}
            </h1>
            <div className="flex   ">
              <StarRatingComponent rating={data?.rating} />
              <span className=" ml-1 text-lg">
                {data?.reviews?.length} reviews
              </span>
            </div>
            <p className="text-2xl font-serif ">$ {data?.price}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <div className="join border border-gray-300">
                <button className="btn btn-ghost join-item">-</button>
                <div className="flex items-center justify-center h-12 w-12 border-l border-r border-gray-300">
                  1
                </div>
                <button className="btn btn-ghost join-item">+</button>
              </div>
            </div>

            <button className="btn btn-outline w-[70%] h-12 border-black text-black hover:bg-gray-100 hover:border-black">
              ADD TO CART
            </button>

            <button className="btn w-[70%] h-12 bg-[#00BADB] text-white hover:bg-[#0096b0f5] border-none">
              Buy Now
            </button>

            <button className="btn btn-link w-full text-gray-600 hover:text-gray-800">
              More payment options
            </button>
          </div>
          <div className=" w-[80%] text-gray-600">
            <p>{data?.description}</p>
          </div>
        </div>
      </div>
      <div className="border-2 border-red-700 overflow-x-auto w-full">
  <div className="inline-flex gap-6">
    <div className="flex h-[43vh] min-w-[20vw] border-2 "> 
      <img src="https://cdn.dummyjson.com/products/images/fragrances/Dolce%20Shine%20Eau%20de/1.png" className="transition-transform duration-700 transform hover:scale-110 w-full h-full object-cover " alt="" />
    </div>
    <div className="flex h-[28vh] min-w-[23vw] border-2 "> sfv</div>
    <div className="flex h-[28vh] min-w-[23vw] border-2 "> sfv</div>
    <div className="flex h-[28vh] min-w-[23vw] border-2 "> sfv</div>
    <div className="flex h-[28vh] min-w-[23vw] border-2 "> sfv</div>
    <div className="flex h-[28vh] min-w-[23vw] border-2 "> sfv</div>
    <div className="flex h-[28vh] min-w-[23vw] border-2 "> sfv</div>
    <div className="flex h-[28vh] min-w-[23vw] border-2 "> sfv</div>
    
   
  </div>
</div>

    </div>
  );
}
