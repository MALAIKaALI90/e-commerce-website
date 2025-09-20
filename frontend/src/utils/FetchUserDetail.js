import Axios from "./axios"
import summaryApi from "../common/summaryApi"
const FetchUserDetail=async()=>{
    try {
        const res=await Axios({
            ...summaryApi.user_detail
        })
       return res
        
    } catch (error) {
        console.log(error);
        
    }
}
export default FetchUserDetail