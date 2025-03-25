import { useStore } from "../../State/store"


function Searchbox() {
const {searchSuggestions,isInputOnFocus}=useStore()
if (!isInputOnFocus || searchSuggestions.length === 0) {
  return null; // Don't render if input isn't focused or no suggestions
}

  return (
    <div  className={`border-2  absolute top-full left-0 w-full bg-[#EAE8E9] shadow-lg rounded-lg mt-1 p-3 z-50 `}>
      {searchSuggestions.map((data,index)=>{
      // {  console.log(data.title)}
       return <p key={index} className="bg-[#EAE8E9]">{data.title}</p>

      })}
      
          </div>
  )
}

export default Searchbox
