import React from 'react'
import { Outlet } from 'react-router-dom'
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
  
    useEffect(() => {
      fetchUser()
      fetchCatagory()
      fetchSubCatagory()
    }, []);

  return (
    <>
    <Header/>
    <main>
      <Outlet/>
      </main>
     <Footer/>
     <Toaster/>
    </>
  )
}

export default App
