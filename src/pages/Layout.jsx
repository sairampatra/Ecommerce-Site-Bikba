import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Chatbot from "../Components/Chatbot/Chatbot";

function MainLayout() {
    return <div className="relative">
    <Navbar/>
    <Outlet/>
    <Chatbot/>
    </div>
}
export default MainLayout