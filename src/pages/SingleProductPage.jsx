import { Link, useNavigate, useParams } from "react-router-dom";
import ProductImageZoom from "../Components/ProductImageZoom/ProductImageZoom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductData } from "../services/fetchProductData";
import { useEffect, useState } from "react";
import StarRatingComponent from "../Components/Stars/Stars";
import { fetchRelatedProductData } from "../services/fetchRelatedProducts";
import { useStore } from "../State/store";
import { Slide, toast,ToastContainer } from "react-toastify";

export default function ProductPage() {
  const navigate = useNavigate();
  const { theme, cart, setCart } = useStore();
  const { productId } = useParams();
  const { isLoading, data, error } = useQuery({
    queryKey: ["singleProduct", productId],
    queryFn: () => fetchProductData(productId),
  });
  const {
    isLoading: isRelatedProductLoading,
    data: relatedProductData,
    error: relatedProductError,
  } = useQuery({
    queryKey: ["relatedProduct", data],
    queryFn: () => fetchRelatedProductData(data?.category),
    enabled: !!data?.category,
  });

  const handleCart = () => {
    const hasProduct = cart?.some((item) =>    item.id === data.id);
    console.log(cart)
    if (hasProduct) {
      toast(" Product already exist in cart", {
        className: `rounded-md ${theme=== "light" ? "bg-[#00BADB] text-white" : "bg-[#E1DDD7] text-black"} `,
        hideProgressBar: true,
        bodyClassName: "text-xs",
        transition: Slide,
              autoClose: 3000,
            });    
    } else {
      const newCart = [...cart, data];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      toast(" Product added to cart", {
        className:  `rounded-md ${theme=== "light" ? "bg-[#00BADB] text-white" : "bg-[#E1DDD7] text-black"} `,
        hideProgressBar: true,
        bodyClassName: "text-xs",
        
        transition: Slide,
              autoClose: 3000,
      });
    }
  };

  const [mainImage, setMainImage] = useState(null);
console.log(data)
  useEffect(() => {
    if (data?.thumbnail) {
      setMainImage(data?.thumbnail);
    }
    return () => {
      setMainImage(null);
    };
  }, [data?.images[0]]);

  useEffect(()=>{
    const oldCart = localStorage.getItem('cart')
    setCart(JSON.parse(oldCart) || [])
  },[])

  if (isLoading) {
    return <div className="mt-20 text-center">Loading....</div>;
  }

  return (
    <div className={`${theme} w-full min-w-full overflow-x-hidden`}>
      <div className="w-full max-w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10 mt-11 dark:bg-[#161616]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 w-full">
          {/* Product Gallery Section */}
          <div className="w-full flex flex-col-reverse lg:flex-row">
            {/* Thumbnail Gallery - Vertical on Large Screens */}
            <div
              className="flex lg:flex-col gap-2 
            overflow-x-auto lg:overflow-visible 
            pb-2 lg:pb-0 
            order-2 lg:order-1 
            lg:w-24 
            flex-shrink-0"
            >
              {data?.images?.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 border cursor-pointer 
              w-16 h-16 lg:w-20 lg:h-20 
              hover:border-[#00BADB] 
              dark:hover:border-[#6885b1] 
              transition-all duration-300"
                >
                  <img
                    src={image}
                    alt={`Product thumbnail ${index}`}
                    className="w-full h-full object-cover"
                    onClick={() => setMainImage(image)}
                  />
                </div>
              ))}
            </div>

            {/* Main Image Container - Takes Remaining Space */}
            <div className="w-full lg:w-[calc(100%-6rem)] aspect-square max-h-[590px] order-1 lg:order-2">
              <ProductImageZoom
                imageSrc={mainImage}
                alt="Product Name"
                width="100%"
                height="100%"
                zoomScale={2.5}
              />
            </div>
          </div>

          {/* Product Details Section */}
          <div className="w-full space-y-6">
            <div className="dark:text-[#ECEEF0]">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif mb-2">
                {data?.title}
              </h1>
              <div className="flex items-center mb-2">
                <StarRatingComponent
                  rating={data?.rating}
                  color={theme == "dark" ? "#ECEEF0" : "black"}
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-[#ECEEF0]">
                  ({data?.reviews?.length} reviews)
                </span>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-[#ECEEF0]">
                ${data?.price}
              </p>
            </div>

            <div className="space-y-4">
              {/* Quantity Selector */}
              <div className="flex items-center space-x-4 dark:text-[#ECEEF0]">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <button className="px-3 py-1 text-xl font-bold">-</button>
                  <span className="px-4 py-1 border-x">1</span>
                  <button className="px-3 py-1 text-xl font-bold">+</button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleCart}
                  className="w-full btn btn-outline 
                border-black text-black 
                hover:bg-black hover:text-white 
                transition duration-500 ease-in-out dark:bg-[#EEEEEE] dark:text-[#161616]"
                >
                  ADD TO CART
                </button>
                <button
                  className="w-full btn outline-none border-0
                bg-[#00BADB] text-white 
                hover:bg-[#0096b0] dark:bg-[#6885b1]
                dark:hover:bg-[#5e79a1]
                transition duration-500 ease-in-out"
                >
                  BUY NOW
                </button>
                <button
                  className="w-full text-sm text-gray-600 
                hover:text-black 
                transition-colors duration-300 dark:text-[#ECEEF0] dark:hover:text-[#9a9a9b]"
                >
                  More payment options
                </button>
              </div>
            </div>

            {/* Product Description */}
            <div className="bg-gray-50 p-4 rounded-lg dark:bg-[#E1DDD7] dark:text-[#111111]">
              <h3 className="text-lg font-semibold mb-2">
                Product Description
              </h3>
              <p className="text-gray-700">{data?.description}</p>
            </div>
          </div>
        </div>

        {/* Related Products Horizontal Scroll */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4 dark:text-[#ECEEF0]">
            You may also like
          </h3>
          <div className="flex gap-4 pb-4 overflow-x-auto hide-scrollbar">
            {relatedProductData?.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 
            w-48 sm:w-64 md:w-72 
            h-48 sm:h-64 md:h-72 
            border rounded-lg dark:bg-[#E1DDD7] dark:border-none 
            overflow-hidden bg-gradient-to-b from-transparent via-transparent transition-transform group-hover:via-black/60 hover:to-black/70 to-black/20"
                onClick={() => navigate(`/SingleProduct/${item.id}`)}
              >
                <img
                  src={item?.thumbnail}
                  className="w-full h-full object-cover 
                  transform hover:scale-125
                  transition-transform duration-700"
                  alt="Related Product"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer  limit={3} />
    </div>
  );
}