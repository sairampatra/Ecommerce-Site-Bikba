import { create } from "zustand";

export const useStore = create((set) => ({
  searchSuggestions: [],
  setSearchSuggestions: (data) => set(() => ({ searchSuggestions: data })),
  isInputOnFocus: false,
  setisInputOnFocus: (data) => set(() => ({ isInputOnFocus: data })),

  searchQuerry:'',
  setSearchQuerry: (data)=> set(()=>({searchQuerry:data}))

}  




));
