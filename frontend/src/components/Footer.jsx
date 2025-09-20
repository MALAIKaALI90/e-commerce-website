import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
const Footer = () => {
  return (
    <>
   <footer className="bg-gray-900 text-white py-6 mt-10">
  <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
    
    
    <p className="text-sm">&copy; 2025 Blinkit. All rights reserved.</p>

    <div className="flex space-x-6 mt-4 md:mt-0">
      <a href="https://facebook.com" target="_blank" className="hover:text-blue-500">
        <i ><FaFacebook />
</i>
      </a>
      <a href="https://instagram.com" target="_blank" className="hover:text-pink-500">
        <i ><FaInstagramSquare/> </i>
      </a>
      <a href="https://twitter.com" target="_blank" className="hover:text-blue-400">
        <i><FaTwitter /></i>
      </a>
    </div>

  </div>
</footer>

</>
  )
}
export default Footer
