import { createSlice } from "@reduxjs/toolkit";
const initialState={

  allCatagory:[],
  setAllSubCatagory:[],
  product:[]
}
const productSlice=createSlice({
    name:"product",
    initialState,
    reducers:{
        setAllCatagory:(state,action)=>{
state.allCatagory=[...action.payload]
        },
        setAllSubCatagory:(state,action)=>{
          state.setAllSubCatagory=[action.payload]
        }
      } 
})
export const {setAllCatagory,setAllSubCatagory}=productSlice.actions
export default productSlice.reducer