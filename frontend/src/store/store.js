import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice"
import productReducer from './ProductSlice'
import cardReducer from "./cardSlice"
import addressReducer from "./AddressSlice"
import orderReducer from "./orderSlice"
export const store = configureStore({
  reducer: {
    user:userReducer,
    product:productReducer,
  cardItem:cardReducer,
addresses:addressReducer,
orders:orderReducer
}
})