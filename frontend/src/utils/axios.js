import axios from 'axios'
import summaryApi, { baseUrl } from '../common/summaryApi'
 const Axios=axios.create({
    baseURL:baseUrl,
    withCredentials:true
})
//sending access token in header
Axios.interceptors.request.use(
    async (config)=>{
const accessToken=localStorage.getItem('accessToken')
if (accessToken) {
    config.headers.Authorization=`Bearer ${accessToken}`
    
}
return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)
//extend of life of access token with the help of refresh token
Axios.interceptors.request.use(
    (res)=>{
        return res
    },
     async(error)=>{
        let originalreq=error.config
        if (error.res.status===401&&!originalreq.retry) {
            originalreq.retry=true
            const RefreshToken=localStorage.getItem("RefreshToken")
            if (RefreshToken) {

                const newAccessToken=await RefreshAccessToken(RefreshToken)
                if (newAccessToken) {
                    originalreq.headers.Authorization=`Bearer ${newAccessToken}`
                    return Axios(originalreq)
                }
            }

            
        }
        return Promise.reject(error)
    }
)
const RefreshAccessToken=async (RefreshToken) => {
    try {
        const res=await Axios({
            ...summaryApi. refresh_token,
            headers:{
                Authorization:`Bearer ${RefreshToken}`
            }
        })
        const accessToken=res.data.data.accessToken
        localStorage.setItem("accessToken")
        return accessToken
        
    } catch (error) {
       console.log(error);
        
    }
}
export default Axios;