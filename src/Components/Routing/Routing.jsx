import { Route, Routes } from "react-router-dom";
// import Login from "../../pages/Login";
import { lazy, Suspense } from "react";
import JaganLoading from "../Loading/JaganLoading";
const Login = lazy(() => import("../../pages/Login"));
const Signup = lazy(() => import("../../pages/Signup"));
const Home = lazy(() => import("../../pages/Home"));
const Search = lazy(() => import("../../pages/Search"));
const MainLayout = lazy(() => import("../../pages/Layout"));
const SingleProductPage = lazy(() => import("../../pages/SingleProductPage"));

function Routing() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<JaganLoading />}>
            <MainLayout />
          </Suspense>
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<h1 className="text-black mt-20">Loading...</h1>}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/search"
          element={
            <Suspense fallback={<h1 className="text-black mt-20">Loading...</h1>}>
              <Search />
            </Suspense>
          }
        />
         <Route
          path="/SingleProduct/:productId"
          element={
            <Suspense fallback={<h1 className="text-black mt-20">Loading...</h1>}>
              <SingleProductPage />
            </Suspense>
          }
        />
        
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default Routing;
