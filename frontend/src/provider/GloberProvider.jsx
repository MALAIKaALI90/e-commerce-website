import { createContext,useContext, useEffect,  } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from '../utils/axios';
import summaryApi from "../common/summaryApi";
import { handleAddItemInCard } from "../store/cardSlice";

export const GlobalContext = createContext(null)

export const useGlobalContext = ()=> useContext(GlobalContext)

const GlobalProvider = ({children}) => {
     const dispatch = useDispatch()

    const cartItem = useSelector(state => state.cardItem.card)
    const user = useSelector(state => state?.user)

    const fetchCartItem = async()=>{
        try {
          const response = await Axios({
            ...summaryApi.getCardItem
          })
          const { data : responseData } = response
    
          if(responseData.success){
            dispatch(handleAddItemInCard(responseData.data))
           
          }
    
        } catch (error) {
          console.log(error)
        }
    }


    useEffect(()=>{
      fetchCartItem()
 
    },[user])
    
    return(
        <GlobalContext.Provider value={{
            fetchCartItem,
          
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider