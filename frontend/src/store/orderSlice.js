import { createSlice } from "@reduxjs/toolkit";
const initialState={
    order:[]
}
const orderSlice=createSlice({
    name:"order",
    initialState,
    reducers:{
        setOrders:(state,action)=>{
            state.order=[...action.payload]
        }
    }
})
export default orderSlice.reducer
  export const {setOrders} =orderSlice.actions