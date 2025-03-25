import { useState } from "react";
import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom"
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function Signup() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { signup,signinWithGoogle ,currcurrentUser, userCredentials} = useAuth();
  const navigate = useNavigate();
  
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      console.error("Email and password are required.");
      return;
    }
    try {
      await signup(email, password);
      navigate("/");
    } catch (error) {
      console.error("Signup failed:", error.message);
    }
  };
  const handleGoogleSignup = async (e) => {
    e.stopPropagation()
       
    try {
      const user = await signinWithGoogle();
      console.log(user)
navigate("/");
      
    } catch (error) {
      console.error("googleSignup failed:", error.message);
    }
  };
  return (
    <div className="  flex items-center justify-center w-screen h-screen bg-no-repeat bg-center bg-cover bg-[url('https://img.freepik.com/free-photo/black-white-mountain-background_23-2150530958.jpg?semt=ais_hybrid')]">
      <div className=" rounded-2xl bg-[#e6e6e659] backdrop-blur-sm shadow-lg w-[350px] flex flex-col items-center text-gray-800 mt-10">
        {/* Title */}
        <h2 className="rounded-t-2xl p-3 flex items-center content-center justify-center bg-[#25272962] backdrop-blur-lg text-lg font-semibold tracking-wider mb-6  w-full">
          CUSTOMER SIGNUP
        </h2>

        {/* Form */}
        <form onSubmit={handleSignup} className="w-full flex flex-col gap-4 ">
          {/* Email Input */}
          <div className="mx-4  relative flex items-center border-b  border-gray-800/50 pb-2 ">
            <input
              type="email"
              className=" placeholder-gray-800  text-gray-800 w-full bg-transparent pl-2 outline-none  "
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="mx-4 relative flex items-center border-b border-gray-800/50 pb-2 ">
            <input
              type="password"
              className=" placeholder-gray-800  text-gray-800 w-full bg-transparent pl-2 outline-none "
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-row mx-4 mt-3 items-center text-center space-x-2">
            <div className="flex-grow border-t border-gray-800/50"></div>
            <div className="text-gray-500 text-sm">OR</div>
            <div className="flex-grow border-t border-gray-800/50"></div>
          </div>
          <button 
          onClick={handleGoogleSignup}
          className="rounded-md font-medium flex flex-row items-center text-center gap-2 text-[#006affbd] justify-center border-2 p-1 border-[#006affbd] mx-5 #0069FF">
            <FcGoogle size={24} />
            Signup with Google
          </button>
          <div className="flex flex-row text-sm text-gray-500 space-x-1 mx-4">
            <span>Alredy have an account? </span>
            <Link
              to="/login"
              className="underline text-gray-500  mx-2 hover:text-black"
            >
              Login
            </Link>
          </div>
          {/* Login Button */}
          <button
            type="submit"
            className="outline-0 text-gray-800 mb-6 bg-[#25272946] backdrop-blur-lg w-[50%] mt-4 m-auto py-2 rounded-lg  font-semibold tracking-wide hover:bg-[#2527296a] transition"
          >
            SIGNUP
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
