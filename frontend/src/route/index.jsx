import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Searchpage from "../pages/Searchpage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyOtp from "../pages/VerifyOtp";
import ResetPAssword from "../pages/ResetPAssword";
import Dashboard from "../layout/Dashboard";
import Profile from "../pages/Profile";
import MyOrders from "../pages/MyOrders";
import MyAddress from "../pages/MyAddress";
import AdminProduct from "../pages/AdminProduct";
import Catagory from "../pages/Catagory";
import SubCatagory from "../pages/SubCatagory";
import UploadProduct from "../pages/UploadProduct";
import Permission from "../components/permision";
import ProductList from "../pages/ProductList";
import ProductDisplayPage from "../pages/ProductDisplayPage";
import CheckOut from "../pages/CheckOut";
import Success from "../components/Success";
import Cancel from "../components/Cancel"
const router=createBrowserRouter([
    {
         path:"/",
        element:<App/>,
        children:[{
            path:"",
            element:<Home/>
        },
    {
        path:"search",
        element:<Searchpage/>
    },{
        path:"login",
        element:<Login/>
    },
    {
        path:"register",
        element:<Register/>
    },
    {
        path:'forgot-password',
        element:<ForgotPassword/>
    },
    {
        path:"verify-otp",
        element:<VerifyOtp/>
    },
    {
        path:"reset-pass",
        element:<ResetPAssword/>
    },
    {
        path:"dashboard",
        element:<Dashboard/>,
        children:[
            {
                path:"profile",
                element:<Profile/>
            },
                {
                path:"orders",
                element:<MyOrders/>
            },
                {
                path:"address",
                element:<MyAddress/>
            },
              {
                path:"admin-products",
                element:<Permission><AdminProduct/></Permission>
            },
            {
                path:"catagory",
                element:<Permission><Catagory/></Permission>
            },
            {
                path:"sub-catagory",
                element:<Permission><SubCatagory/></Permission>
            },
            {
                path:"upload-product",
                element:<Permission><UploadProduct/></Permission>

            }
        ]
    },
    {
        path:":catagory",
        children:[
            {
                path :":subCatagory",
                element :<ProductList/>
            }
        ]

    },
    {
        path:"product/:product",
        element:<ProductDisplayPage/>
    },
    {
        path:"checkout",
        element:<CheckOut/>
    },
    {
        path:"success",
        element: <Success/>
    },{
        path:"cancel",
        element:<Cancel/>
    }


]
    }
])
export default router