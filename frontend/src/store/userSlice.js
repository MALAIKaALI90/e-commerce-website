import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    username: "",
    email: "",
    _id: "",
    avatar: "",
    mobileNum: "",
    verifyEmail: "",
    lastLoginDate: "",
    status: "",
    addressDetail: [],
    OrderHistory: [],
    shoppingCart: [],
    role: ""


}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserDetail: (state, action) => {
            state._id = action.payload._id;
            // state={...action.payload}
            state.username = action.payload?.username;
            state.email = action.payload?.email;
            state.avatar = action.payload?.avatar;
            state.mobileNum = action.payload?.mobileNum;
            state.verifyEmail = action.payload?.verifyEmail;
            state.lastLoginDate = action.payload?.lastLoginDate;
            state.status = action.payload?.status;
            state.addressDetail = action.payload?.addressDetail;
            state.OrderHistory = action.payload?.OrderHistory;
            state.shoppingCart = action.payload?.shoppingCart;
            state.role = action.payload?.role;
        },
        logout:(state,action)=>{
             state.username = ""
            state.email = ""
            state.avatar = ""
            state.mobileNum = ''
            state.verifyEmail =''
            state.lastLoginDate = ''
            state.status = ''
            state.addressDetail =[]
            state.OrderHistory =[]
            state.shoppingCart = []
            state.role = ''
        },
        AvatarUPdate:(state,action)=>{
            state.avatar=action.payload.avatar
        }
    }
})
export const { setUserDetail,logout ,AvatarUPdate} = userSlice.actions
export default userSlice.reducer