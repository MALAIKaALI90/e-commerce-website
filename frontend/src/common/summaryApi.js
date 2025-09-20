 export const baseUrl="http://localhost:8080"
 const summaryApi={
    register:{
        url:'/api/user/register',
        method:'post'
    },
    login:{
        url:'/api/user/login',
        method:'post'
    },
    forgot_password:{
        url:'/api/user/forgot-password',
        method:'put'
    },
        otp_verify:{
            url:'/api/user/verify-forgot-password-otp',
            method:'put'
        },
        reset_pass:{
             url:'/api/user/reset-password',
             method:"put"

        },
        refresh_token:{
            url:'/api/user/refresh-token',
            method:"post"
        },
        user_detail:{
            url:'/api/user/user-detail',
            method:"get"
        },
        user_logout:{
            url:'/api/user/logout',
            method:"get"
        },
        update_avatar:{
            url:'/api/user/update-avatar',
            method:"put"
        },
          upload_catagory:{
            url:'/api/catagory/upload-catagory',
            method:"post"
        },
        get_catagories:{
            url:"/api/catagory/All-catagories",
            method:"get"
        },
       
            update_catagory:{
url:"/api/catagory/update-catagories",
method:"put"
            },
              delete_catagory:{
url:"/api/catagory/delete-catagory",
method:"delete"
            },
            upload_subcatagory:{
                url:"/api/subcatagory/create",
                method:"post"
            },
            get_subcatagories:{
                url:"/api/subcatagory/All-subcatagories",
                method:"post"
            },
            update_subCatagory:{
                url:"/api/subcatagory/update",
                method:"put"
            },
            delete_subcatagory:{
                url:"/api/subcatagory/delete",
                method:"delete"
            },
            upload_product:{
                url:'/api/product/create',
                 method:"post"
                
            },
            get_product:{
                url:"/api/product/get",
                method:"post"
            }
        
        

    

 }
 export default summaryApi