import React, { useEffect, useState } from 'react'
import logo from '../assets/Blinkit-yellow-app-icon.svg.png'
import Search from './Search'
import { Link, useLocation } from 'react-router-dom'
import { FaCartArrowDown } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from './UserMenu';
import OpenCartMenu from './OpenCartMenu';

const Header = () => {
  const [totalPrice,settotalPrice]=useState(0)
  const location=useLocation()
  const [openMenu, setMenu] = useState(false)
  const user = useSelector((state) => state?.user)

  const [opencartMenu,setopencartMenu]=useState(false)
  // console.log("user from store", user);
// console.log(location.search.slice(3)
// );
const cardItem=useSelector(state=>state.cardItem.card)
// console.log(cardItem);

useEffect(()=>{
 const total = cardItem.reduce((prev, curr) => {
    // ✅ Check that productId exists and has at least one item
    if (curr.productId && curr.productId.length > 0 && curr.productId[0].price) {
      return prev + curr.productId[0].price * curr.quantity
    }
    return prev
  }, 0)

  settotalPrice(total)

}, [cardItem])

  return (
    <>
        <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-3 shadow-md bg-white">
        {/* Logo */}
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="h-12 w-auto"
          />
        </Link>

        {/* Search */}
        <Search />

        {/* Account Section */}
        {user._id ? (
          <div className="relative">
            <div
              onClick={() => setMenu((prev) => !prev)}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <p className="text-gray-700 font-medium">Account</p>
              {openMenu ? <GoTriangleUp /> : <GoTriangleDown className="text-gray-600" />}
            </div>

            {/* Dropdown Menu */}
            {openMenu && (
              <div className="absolute right-0 mt-2 z-50">
                <UserMenu />
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-6">
            {/* Login Button */}
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-yellow-400 hover:text-white transition-colors duration-200"
            >
              Login
            </Link>
          </div>
        )}

        {/* Cart Button */}
        <Link className="relative flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-yellow-400 hover:text-white transition-colors duration-200">
         <FaCartArrowDown size={18} />
<span onClick={()=>setopencartMenu(true)}>Total: Rs. {totalPrice.toLocaleString()}</span>
          {/* Cart Count Badge */}
          <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            {cardItem [0]?(<p>{cardItem.length}</p>):(0)}

          </span>
        </Link>
      </header>
        <div className="h-[80px]"></div>
      {opencartMenu && <OpenCartMenu close={()=>setopencartMenu(false)}/> }
    </>
  )
}

export default Header
