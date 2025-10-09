import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Axios from "../utils/axios"
import summaryApi from "../common/summaryApi"
import Loading from "../common/loading"
import { useSelector } from "react-redux"
import AddtoCardBtn from "../components/addtoCardBtn"

const ProductList = () => {
  const params = useParams()

  // Extract params safely
  const catagoryId = params.catagory?.split("-").slice(-1)[0] || ""
  const subCategoryId = params.subCatagory?.split("-").slice(-1)[0] || ""
  const subCatagoryName =
    params.subCatagory?.split("-").slice(0, -1).join(" ") || ""

  // Redux state
  const allsubCatagory = useSelector(
    (state) => state.product.setAllSubCatagory
  )

  const [displaysubcat, setDisplaysubcat] = useState([])
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  // Fetch products API
  const fetchProductData = async () => {
    try {
      setLoading(true)
      const res = await Axios({
        ...summaryApi.getProductByCatgaoryAndSubCatagory,
        data: { catagoryId, subCategoryId },
      })

      const cleanedData = res.data?.data?.flat?.() || []
      setData(cleanedData)
    } catch (error) {
      console.log("Fetch error:", error.message)
    } finally {
      setLoading(false)
    }
  }

  // Fetch products when params change
  useEffect(() => {
    if (catagoryId && subCategoryId) {
      fetchProductData()
    }
  }, [catagoryId, subCategoryId])

  // Filter subcategories for display
  useEffect(() => {
    if (allsubCatagory?.length) {
      const flatSubcats = allsubCatagory.flat()
      const subCat = flatSubcats.filter((sub) =>
        sub.catagory?.some((el) => el._id === catagoryId)
      )
      setDisplaysubcat(subCat)
    }
  }, [allsubCatagory, catagoryId])

  return (
    <div className="my-10 relative">
      {/* Header */}
      <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
        Buy a {subCatagoryName}
      </h2>

      {loading && <Loading />}

      <div className="grid grid-cols-12 gap-6">
        {/* Left Sidebar - Subcategories */}
        <div className="col-span-2 bg-gray-50 p-3 rounded-lg shadow h-[80vh] sticky top-20 overflow-y-auto">
          <div className="flex flex-col gap-3">
            {displaysubcat.length > 0 ? (
              displaysubcat.map((s, index) => {
                // ✅ Build link here
                const link = `/${s.catagory[0]?.name
                  ?.replaceAll(" ", "-")
                  .replaceAll(",", "-")
                  .replaceAll("&", "-")}-${s.catagory[0]?._id}/${s.name}-${s._id}`

                return (
                  <Link
                    to={link}
                    key={s._id || index}
                    className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-green-100 cursor-pointer"
                  >
                    <img
                      src={s.image}
                      alt={s.name || "subcategory"}
                      className="w-14 h-14 object-cover rounded-lg"
                    />
                    <span className="text-xs text-gray-700 text-center">
                      {s.name}
                    </span>
                  </Link>
                )
              })
            ) : (
              <p className="text-gray-400 text-sm">No subcategories</p>
            )}
          </div>
        </div>

        {/* Right Side - Products */}
        <div className="col-span-9">
          {data.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data.map((p) => (
                <div
                
                  key={p._id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col items-center"
                >
                  <Link to={`/product/${p.name}-${p._id}`}>
                  
                  {/* Product Image */}
                  <img
                    src={p.image?.[0]}
                    alt={p.name}
                    className="w-28 h-28 object-cover rounded-lg mb-3"
                  />
                </Link>

                  {/* Product Info */}
                  <h3 className="text-sm font-semibold text-gray-800 truncate w-full text-center">
                    {p.name}
                  </h3>
                  <p className="text-xs text-gray-500">{p.unit}</p>
                  <p className="text-gray-700 font-medium mt-1">
                    {p.price ? `Rs. ${p.price}` : "Price N/A"}
                  </p>

                  {/* Add Button */}
                  <AddtoCardBtn p={p}/>
                </div>
              ))}
            </div>
          ) : (
            !loading && (
              <p className="text-gray-500 text-sm text-center mt-6">
                No products found
              </p>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductList
