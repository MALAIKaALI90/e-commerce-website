import { createSlice } from "@reduxjs/toolkit";
const initialState={
    card:[]
}
const cardSlice=createSlice({
    name:"cardItem",
    initialState,
    reducers:{
        handleAddItemInCard:(state,action)=>{
            state.card=[...action.payload]
        }
    }
})
export default cardSlice.reducer
export const {handleAddItemInCard}=cardSlice.actions