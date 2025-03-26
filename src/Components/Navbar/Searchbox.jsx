import { useNavigate } from "react-router-dom";
import { useStore } from "../../State/store"


function Searchbox() {
  const navigate = useNavigate();

const {searchSuggestions,isInputOnFocus}=useStore()
if (!isInputOnFocus || searchSuggestions.length === 0) {
  return null; 
}

  return (
    <div  className={`border-2  absolute top-full left-0 w-full bg-[#EAE8E9] shadow-lg rounded-lg mt-1 p-3 z-50 flex flex-col items-start gap-1`}>
      {searchSuggestions.map((data,index)=>{
       return <button onClick={()=>navigate(`/SingleProduct/${data.id}`)} key={index} className="bg-[#EAE8E9]  w-full outline-none flex items-start">{data.title}</button>

      })}
      
          </div>
  )
}

export default Searchbox
