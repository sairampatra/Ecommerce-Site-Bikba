import { useStore } from "../State/store"
import Caregorybar from "../Components/Categorybar/Caregorybar"
import Crousal from "../Components/Crousal/Crousal"
import ProductCategories from "../Components/ProductCategories/ProductCategories"

function Home(){
    const{theme}=useStore()
    return <>
    <div className={`${theme}`}>
    <div className="dark:bg-[#161616]">

    <Crousal/>
    <Caregorybar/>
    <ProductCategories/>
    </div>

    </div>
    </>
}
export default Home