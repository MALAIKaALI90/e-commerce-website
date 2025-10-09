import React from 'react'
import { data, Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import  { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import FetchUserDetail from './utils/FetchUserDetail';
import {setUserDetail} from "./store/userSlice"
import {useDispatch} from "react-redux"
import summaryApi from './common/summaryApi';
import Axios from './utils/axios';
import { setAllCatagory } from './store/ProductSlice';
import { setAllSubCatagory, } from './store/ProductSlice';
import { handleAddItemInCard } from './store/cardSlice';
import { handleAddAddress } from './store/AddressSlice';
import { setOrders } from './store/orderSlice';
import GlobalProvider from './provider/GloberProvider';
const App = () => {
  const dispatch=useDispatch()

  const fetchUser=async()=>{
  const userData=await FetchUserDetail()
  // console.log("user data",userData.data);
dispatch(setUserDetail(userData.data.data))
  }

    const fetchCatagory = async () => {
      try {
        // setloading(true);
        const res = await Axios({ ...summaryApi.get_catagories });

        dispatch(setAllCatagory(res.data.data))
        // setcatagoryData(res.data.data);
      } catch (error) {
       console.log(error);
       
      } 
    };
      const fetchSubCatagory=async () => {
    try {
    
      const res=await Axios({
        ...summaryApi.get_subcatagories
      })
        dispatch(setAllSubCatagory(res.data.data))
     
      

    } catch (error) {
       console.log(error);

    } 
    
  }

const fetchAddress=async()=>{
  try {
    const res= await Axios({
      ...summaryApi.getAllAddreses
    })
    dispatch(handleAddAddress (res.data.data))
      // console.log("res",res.data);
  
  } catch (error) {
    console.log(error);
    
  }

}
  
const fetchOrders=async()=>{
  const res=await Axios({
    ...summaryApi.getOrdersItems
  })

  //  console.log("data",res.data.data);
   
  dispatch(setOrders(res.data.data))
}
    useEffect(() => {
      fetchUser()
      fetchCatagory()
      fetchSubCatagory()
      fetchAddress()
      fetchOrders()
    }, []);

  return (
    <GlobalProvider> 
      <Header/>
      <main className='min-h-[78vh]'>
          <Outlet/>
      </main>
      <Footer/>
      <Toaster/>
     
    </GlobalProvider>

  )
}

export default App
