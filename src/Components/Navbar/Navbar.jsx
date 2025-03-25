import {
  CircleUser,
  ChevronDown,
  ShoppingCart,
  Search,
  EllipsisVertical,
  Bell,
  Headset,
  ChartNoAxesCombined,
  Download,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Searchbox from "./Searchbox";
import { useDebounce } from "@uidotdev/usehooks";
import { useQuery } from "@tanstack/react-query";
import axiosinstance from "../../helpers/axiosinstance";
import { useStore } from "../../State/store";

function Navbar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const { logout, userCredentials, currentUser } = useAuth();
  const [display, setDisplay] = useState(false);
  const {  setSearchSuggestions,setSearchQuerry,isInputOnFocus,setisInputOnFocus } = useStore();
  const { isLoading, isFetching, isError, error, data } = useQuery({
    queryKey: ["searchProduct", debouncedSearchTerm],
    queryFn: async () => {
      const { data } = await axiosinstance.get(
        `/search?q=${debouncedSearchTerm}&limit=10`
      );
      setSearchSuggestions(data?.products);
      return data;
    },
    enabled:debouncedSearchTerm.trim().length>0
  });
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchSuggestions([]);
    }
  }, [searchTerm, setSearchSuggestions]);
  const handleChange = (e)=>{
    setSearchTerm(e.target.value)
    setSearchQuerry(e.target.value)
  }
  // console.log(userCredentials)
  return (
    <div className="top-0 h-16  flex py-2 bg-base-100 items-center fixed z-40 w-full  justify-between px-[2%] text-black drop-shadow-md  ">
      <div className="flex">
        <a className="btn btn-ghost text-xl">Bikba</a>
      </div>
      <div className="form-control relative w-[50%] flex flex-col justify-center items-center">
        <div onClick={() => navigate("/search")} className="flex flex-row bg-[#EAE8E9] rounded-lg px-3 w-full justify-center items-center">
          <Search strokeWidth={1.5} className="cursor-pointer" />
          <input
            type="text"
            placeholder="Search for Products, Brands and More"
            value={searchTerm}
            className="input w-full h-10 bg-[#EAE8E9] rounded-lg focus:outline-none focus:ring-0 focus:border-transparent"
            onChange={handleChange}
            onFocus={()=>setisInputOnFocus(true)}
            onBlur={()=>setisInputOnFocus(false)}
          />
        </div>
        {searchTerm &&  <Searchbox />}
       
      </div>

      <div className="flex-none gap-2 ">
        <div className="dropdown dropdown-end cursor-pointer px-3 hover:text-blue-700">
          <div className="   flex flex-row items-center justify-center gap-2 align-middle content-center">
            {currentUser ? (
              <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-300">
                
                <img
                  src={userCredentials?.photoURL}
                  
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <strong
                onClick={() => navigate("/login")}
                className="font-medium"
              >
                {" "}
                Login/Signup
              </strong>
            )}
          </div>
        </div>

        <div className="cursor-pointer indicator mx-3 ">
          <div className="   flex flex-row items-center justify-center  align-middle content-center">
            <ShoppingCart strokeWidth={1.5} className="hover:text-blue-700" />
          </div>
          <span className="rounded-[50%] badge-xs indicator-item bg-[#00BADB] p-1 text-white flex justify-center items-center h-5 w-5 text-[12px]">
            1{/* {watchList?.length > 99 ? "99+" : watchList?.length} */}
          </span>
        </div>

        <div
          onMouseEnter={() => setDisplay(true)}
          onMouseLeave={() => setDisplay(false)}
          className="dropdown dropdown-end cursor-pointer  px-3 relative"
        >
          <div
            // onMouseEnter={()=>setDisplay(true)}
            // onMouseLeave={()=>setDisplay(false)}
            className="   flex flex-row items-center justify-center gap-2 align-middle content-center h-10"
          >
            <EllipsisVertical
              strokeWidth={1.5}
              className={`hover:text-blue-700 `}
            />
          </div>
          <ul
            className={`  absolute right-[30%] top-[97%]   ${
              display ? "block" : "hidden"
            } rounded-md shadow-xl bg-[#F0F5FF] z-20 `}
          >
            <li className="flex items-center gap-3 m-3">
              <Bell size={20} className="shrink-0 " />
              <strong className="flex-1 text-[14px] text-nowrap">
                Notification Preferences
              </strong>
            </li>
            <li className="flex items-center gap-3 m-3">
              <Headset size={20} className="shrink-0" />
              <strong className="flex-1 text-[14px] text-nowrap">
                24x7 Customer Care
              </strong>
            </li>
            <li className="flex items-center gap-3 m-3">
              <ChartNoAxesCombined size={20} className="shrink-0" />
              <strong className="flex-1 text-[14px] text-nowrap">
                Advertise
              </strong>
            </li>
            <li className="flex items-center gap-3 m-3 ">
              <Download size={20} className="shrink-0" />
              <strong className="flex-1 text-[14px] text-nowrap">
                Download App
              </strong>
            </li>
            <li
              onClick={() => logout()}
              className="flex items-center justify-center gap-3 bg-red-500 w-full rounded-b-md p-2 text-white"
            >
              <strong className="flex text-[14px] text-nowrap ">Logout</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
