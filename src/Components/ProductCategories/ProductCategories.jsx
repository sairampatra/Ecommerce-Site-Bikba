import { getDatabase, ref, set } from "firebase/database";

import app from "../../firebaseConfig";
import { useAuth } from "../../context/AuthContext";
import { useStore } from "../../State/store";
const db = getDatabase(app);
function ProductCategories() {
  const{theme}=useStore()
  return (
    <div className={`${theme}`}>
    <div className=" grid grid-cols-[0.9fr_0.6fr_0.7fr]   gap-6 mx-36 mt-11 pb-4">
      <div className="relative flex flex-row justify-center ">
        <img
          className="h-[600px] w-full object-cover dark:grayscale"
          src="https://zevon-ecommerce.netlify.app/static/media/cat-1.e57cf87edad036eefc78.webp"
          alt=""
        />
        <button className="dark:bg-black dark:text-[#C5C7CA] dark:hover:text-[black] dark:hover:bg-[#C5C7CA] absolute bottom-7  w-[30%] h-14 bg-white  hover:bg-black hover:text-white transition duration-500 ease-in-out">
          adf
        </button>
        <div style={{ width: "100%", maxWidth: "500px" }}>
      
    </div>
      </div>
      <div className="h-[600px] flex flex-col  items-center justify-center gap-6">
        <div className="relative flex flex-row justify-center  w-full h-[48%]  ">
          <img
            className="  w-full  h-full dark: "
            src="https://zevon-ecommerce.netlify.app/static/media/cat-2.df1f8d0fd74f16c0ce9e.avif"
            alt=""
          />
          <button className=" absolute bottom-4  w-[40%] h-14 bg-white  hover:bg-black hover:text-white transition duration-500 ease-in-out dark:bg-black dark:text-[#C5C7CA] dark:hover:text-[black] dark:hover:bg-[#C5C7CA]">
            adf
          </button>
        </div>
        <div className=" relative flex flex-row justify-center  w-full h-[48%] object-cover  ">
          <img
            className=" w-full object-cover h-full dark:"
            src="https://zevon-ecommerce.netlify.app/static/media/cat-3.4c0d0fe766fccd43142f.jpg"
            alt=""
          />
          <button className=" absolute bottom-4  w-[40%] h-14 bg-white  hover:bg-black hover:text-white transition duration-500 ease-in-out dark:bg-black dark:text-[#C5C7CA] dark:hover:text-[black] dark:hover:bg-[#C5C7CA]">
            adf
          </button>
        </div>
      </div>
      <div className="relative flex flex-row justify-center ">
        <img
          className="h-[600px] w-full object-cover  dark:grayscale"
          src="	https://zevon-ecommerce.netlify.app/static/media/cat-02.7828f9a6769dc616a9b1.webp"
          alt=""
        />
        <button className="dark:bg-black dark:text-[#C5C7CA] dark:hover:text-[black] dark:hover:bg-[#C5C7CA] absolute bottom-6  w-[40%] h-14 bg-white  hover:bg-black hover:text-white transition duration-500 ease-in-out ">
          adf
        </button>
      </div>
      <div className="col-span-3 flex items-center justify-center gap-4 mx-auto w-full">
        <div className="h-[3px] w-28 bg-black dark:bg-[#C5C7CA]" ></div>
        <div className="text-center">
          <h2 className="text-3xl font-bold dark:text-[#F4F6F6]">TRENDING</h2>
          <p className="text-gray-500 italic dark:text-[#EDEDF0]">Top view in this week</p>
        </div>
        <div className="h-[3px] w-28 bg-black dark:bg-[#C5C7CA]"></div>
      </div>
    </div>
    </div>
  );
}

export default ProductCategories;
