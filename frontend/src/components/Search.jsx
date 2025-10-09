import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa"
import { useLocation, useNavigate } from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation'

const Search = () => {
  const navigate = useNavigate()
  const location = useLocation()
const searchText=location.search.slice(3)

  const [isSearchPage, setIsSearchPage] = useState(false)

  useEffect(() => {
    const isSearch = location.pathname === "/search"
    setIsSearchPage(isSearch)
  }, [location])

  const redirectToSearch = () => {
    navigate("/search")
  }
const handleOnChange=(e)=>{
  const value=e.target.value
  const url=`/search?q=${value}`
  navigate(url)
  // console.log(value);

}
  
  return (
    <div className="flex flex-1 max-w-xl mx-6">
      <div className="relative w-full min-w-[300px] lg:min-w-[420px] h-12 rounded-full border flex items-center px-5 shadow-md bg-white">

        {!isSearchPage ? (
          <div onClick={redirectToSearch} className="flex-1 cursor-pointer">
            <TypeAnimation
              sequence={[
                'Search for Milk 🥛',
                1500,
                'Search for Bread 🍞',
                1500,
                'Search for Sugar 🍬',
                1500,
                'Search for Cheese 🧀',
                1500,
                'Search for Atta 🌾',
                1500,
                'Search for Chawal 🍚',
                1500,
                'Search for Eggs 🥚',
                1500,
                'Search for Oil 🛢️',
                1500,
                'Search for Tea ☕',
                1500,
                'Search for Coffee 🍵',
                1500,
                'Search for Butter 🧈',
                1500,
                'Search for Fruits 🍎',
                1500,
                'Search for Vegetables 🥕🥦',
                1500,
                'Search for Biscuits 🍪',
                1500,
                'Search for Cold Drinks 🥤',
                1500,
                'Search for Chips 🍟',
                1500,
                'Search for Ice Cream 🍨',
                1500,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-gray-600 text-sm lg:text-base font-medium flex-1 truncate"
            />
          </div>
        ) : (
          <div className="flex-1">
            <input 
              type="text"
              placeholder="Search for Atta Daal Milk and more"
              className="w-full outline-none text-gray-700"
              defaultValue={searchText}
              onChange={handleOnChange}
            />
          </div>
        )}

        {/* Right Search Icon */}
        <button className="text-gray-500 hover:text-yellow-500 transition-colors duration-200">
          <FaSearch size={20} />
        </button>
      </div>
    </div>
  )
}

export default Search
