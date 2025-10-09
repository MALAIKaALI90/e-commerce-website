import { createSlice } from "@reduxjs/toolkit";
 const initialSate={
AllAddressList:[]
 }
 const addressSlice=createSlice({
    name:"address",
    initialState:initialSate,
    reducers:{
        handleAddAddress:(state,action)=>{
            state.AllAddressList=[...action.payload]
        }
    }

 })
 export const {handleAddAddress}=addressSlice.actions
 export default addressSlice.reducer