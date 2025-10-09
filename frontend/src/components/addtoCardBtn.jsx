import React, { useEffect, useState } from 'react'
import summaryApi from '../common/summaryApi'
import Axios from '../utils/axios'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { useGlobalContext } from "../provider/GloberProvider"
const AddtoCardBtn = ({ p }) => {
  const [loading, setLoading] = useState(false)
  const [quantity, setQuantity] = useState(0)
  const [alreadyInCard, setAlreadyInCard] = useState(false)
  const cardItem = useSelector(state => state.cardItem.card)
const { fetchCartItem } = useGlobalContext()
  const dispatch = useDispatch()


  const addItemInCard = async (productId) => {
    try {
      setLoading(true)
      const res = await Axios({
        ...summaryApi.addtocard,
        data: { productId }
      })
      
         await fetchCartItem()
      
      toast.success(res.data?.message)
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add item")
    } finally {
      setLoading(false)
    }
  }


  const increaseQty = async (cartItemId, currentQty) => {
    try {
      setLoading(true)
      const res = await Axios({
        ...summaryApi.updateCardQuantity,
        data: { _id: cartItemId, quantity: currentQty + 1 }
      })
        await fetchCartItem()
      toast.success('Quantity increased')
      setQuantity(prev => prev + 1)
    } catch (error) {
      toast.error('Failed to update quantity')
    } finally {
      setLoading(false)
    }
  }


  const decreaseQty = async (cartItemId, currentQty) => {
    if (currentQty === 1) {
  
      try {
        setLoading(true)
        const res = await Axios({
          ...summaryApi.deleteItemfromCart,
          data: { _id: cartItemId }
        })
        toast.success('Item removed from cart')
        setAlreadyInCard(false)
        setQuantity(0)
          await fetchCartItem()
      } catch (error) {
        toast.error('Failed to remove item')
      } finally {
        setLoading(false)
      }
      return
    }

    // 🔻 Just decrease quantity if > 1
    try {
      setLoading(true)
      const res = await Axios({
        ...summaryApi.updateCardQuantity,
        data: { _id: cartItemId, quantity: currentQty - 1 }
      })
      setQuantity(prev => prev - 1)
      toast.success('Quantity decreased')
    } catch (error) {
      toast.error('Failed to update quantity')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const item = cardItem.find(item => item?.productId?.[0]?._id === p?._id)
    setAlreadyInCard(!!item)
    setQuantity(item?.quantity || 0)
  }, [p, cardItem])

  const cartItemId = cardItem.find(i => i?.productId?.[0]?._id === p?._id)?._id

  return (
    <div>
      {alreadyInCard ? (
        <div className="flex items-center gap-3">
          <button
            className="px-3 py-1 bg-green-600 rounded-full text-white"
            onClick={() => decreaseQty(cartItemId, quantity)}
            disabled={loading}
          >
            <FaMinus />
          </button>
          <p className="font-medium">{quantity}</p>
          <button
            className="px-3 py-1 bg-green-600 rounded-full text-white"
            onClick={() => increaseQty(cartItemId, quantity)}
            disabled={loading}
          >
            <FaPlus />
          </button>
        </div>
      ) : (
        <button
          disabled={loading}
          onClick={() => addItemInCard(p._id)}
          className={`mt-3 px-4 py-2 ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          } text-white text-sm font-semibold rounded-full shadow-md transition transform hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-2 w-full`}
        >
          {loading ? "Adding..." : "🛒 Add to Cart"}
        </button>
      )}
    </div>
  )
}

export default AddtoCardBtn
