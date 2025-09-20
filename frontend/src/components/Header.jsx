import React, { useState } from 'react'
import logo from '../assets/Blinkit-yellow-app-icon.svg.png'
import Search from './Search'
import { Link } from 'react-router-dom'
import { FaCartArrowDown } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from './UserMenu';

const Header = () => {
  const [openMenu, setMenu] = useState(false)
  const user = useSelector((state) => state?.user)
  // console.log("user from store", user);

  return (
    <>
      <header className="flex items-center justify-between px-6 py-3 shadow-md bg-white relative">
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
          total Price
          {/* Cart Count Badge */}
          <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            0
          </span>
        </Link>
      </header>
    </>
  )
}

export default Header
