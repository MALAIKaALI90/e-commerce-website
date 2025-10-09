import React from 'react';
import image from "../assets/banner.webp";
import { useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import CatagoryWiseProducts from '../components/CatagoryWiseProducts';
const Home = () => {
  const navigate=useNavigate()
  const catagoryData = useSelector(state => state.product.allCatagory);
  const subcatagoryData = useSelector(state => state.product.setAllSubCatagory);
  // console.log({subcatagoryData});
  
const handleRedirectProductListPage = (id, name) => {
  const flatSubCatagoryData = subcatagoryData.flat();  // 🔥 flatten

  const subCatagory = flatSubCatagoryData.find(sub =>
    sub.catagory?.some(c => c._id.toString() === id.toString())
  );

  // console.log( subCatagory);
  
  const url=`/${name.replaceAll( " " ,"-").replaceAll(",","-").replaceAll("&","-")}-${id}/${subCatagory.name}-${subCatagory._id}`
  // console.log(url);
  navigate(url)
  
};
  return (
    <div className="font-sans bg-gray-50 min-h-screen">
     
      <div className="container mx-auto px-4 py-8">
        <img 
          src={image}
          alt='banner'
          className="w-full rounded-lg shadow-lg mb-8"
        />
        
        <div>
          
          
          {/* First row of 10 categories */}
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-4 mb-8">
            {catagoryData.slice(0, 10).map((catagory, index) => (
              
              <div  onClick={()=>handleRedirectProductListPage(catagory._id,catagory.name)}
                key={index} 
                className="bg-white rounded-lg shadow-md p-2 flex flex-col items-center justify-center transition-shadow duration-300 hover:shadow-xl"
              >
                <img 
                  src={catagory.image}
                  alt={catagory.name}
                  className="w-full h-auto object-cover object-center rounded-lg"
                />
              </div>
            ))}
          </div>

          {/* Second row of 10 categories */}
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-4">
            {catagoryData.slice(10, 20).map((catagory, index) => (
              <div
                key={index} 
                className="bg-white rounded-lg shadow-md p-2 flex flex-col items-center justify-center transition-shadow duration-300 hover:shadow-xl"
              >
                <img 
                  src={catagory.image}
                  alt={catagory.name}
                  className="w-full h-auto object-cover object-center rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
     
     
      </div>
      {catagoryData.map((catagory,index)=>
         <CatagoryWiseProducts key={catagory?._id+"CatagoryWiseProduct"} id={catagory?._id} name={catagory?.name}/>
      )}
  
    </div>
  );
}

export default Home;

