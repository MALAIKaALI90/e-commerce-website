

import mongoose from "mongoose";
import { Order } from "../model/order.model.js";
import { Card } from "../model/card.model.js";
import { User } from "../model/user.model.js";
import stripe from "../config/Stripe.js";

 export async function cashOnDelivary(request,response){
    try {
        const userId = request.user // auth middleware 
        const { list_items, totalAmt, addressId,subTotalAmt } = request.body 
        
        const payload = list_items.map(el => {
            return({
                userId : userId,
                orderId : `ORD-${new mongoose.Types.ObjectId()}`,
                productId : el.productId._id, 
                product_details : {
                    name : el.productId.name,
                    image : el.productId.image
                } ,
                paymentId : "",
                payment_status : "CASH ON DELIVERY",
                delivery_address : addressId ,
                subTotalAmt  : subTotalAmt,
                totalAmt  :  totalAmt,
            })
        })

        const generatedOrder = await Order.insertMany(payload)

        ///remove from the cart
        const removeCartItems = await Card.deleteMany({ userId : userId })
        const updateInUser = await User.updateOne({ _id : userId }, { shopping_cart : []})

        return response.json({
            message : "Order successfully",
            error : false,
            success : true,
            data : generatedOrder
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error ,
            error : true,
            success : false
        })
    }
}


export async function paymentIntigration(request,response){
    try {
        const userId = request.user // auth middleware 
        const { list_items, totalAmt, addressId,subTotalAmt } = request.body 
// console.log("product",list_items[0].productId);

        const user = await User.findById(userId)

        const line_items  = list_items.map(item =>{
            console.log("price",user._id);
            
            return{
               price_data : {
                    currency : 'pkr',
                    product_data : {
                        name : item.productId[0].name,
                         images: item.productId[0].image,
                        metadata : {
                            productId : item.productId[0]._id
                        }
                    },
                   unit_amount: Math.round(item.productId[0].price * 100),
               },
               adjustable_quantity : {
                    enabled : true,
                    minimum : 1
               },
               quantity : item.quantity 
            }
        })

        const params = {
            submit_type : 'pay',
            mode : 'payment',
            payment_method_types : ['card'],
            customer_email : user.email,
            metadata : {
           userId: String(user._id),
        addressId: String(addressId), 
      },
            line_items : line_items,
            success_url : `${process.env.FRONTEND_URI}/success`,
            cancel_url : `${process.env.FRONTEND_URI}/cancel`
        }

        const session = await stripe.checkout.sessions.create(params)

        return response.status(200).json(session)

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        }) 
    }
}


const getOrderProductItems = async({
    lineItems,
    userId,
    addressId,
    paymentId,
    payment_status,
 })=>{
    const productList = []

    if(lineItems?.data?.length){
        for(const item of lineItems.data){
            const product = await stripe.products.retrieve(item.price.product)

            const paylod = {
                userId : userId,
                orderId : `ORD-${new mongoose.Types.ObjectId()}`,
                productId : product.metadata.productId, 
                product_details : {
                    name : product.name,
                    image : product.images
                } ,
                paymentId : paymentId,
                payment_status : payment_status,
                delivery_address : addressId,
                subTotalAmt  : Number(item.amount_total / 100),
                totalAmt  :  Number(item.amount_total / 100),
            }

            productList.push(paylod)
        }
    }

    return productList
}

//http://localhost:8080/api/order/webhook
export async function webhooksStripe(request, response) {
  const sig = request.headers['stripe-signature'];
  const endPointSecret = process.env.ENDPOINT_WEBHOOK_SECRET;
  let event;

  try {
    
    event = stripe.webhooks.constructEvent(request.body, sig, endPointSecret);
  } catch (err) {
    console.error('⚠️  Webhook signature verification failed:', err.message);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;

      //  Get the purchased line items
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

      const userId = session.metadata.userId;

      // ✅ Build order payload using helper function
      const orderProduct = await getOrderProductItems({
        lineItems: lineItems,
        userId: userId,
        addressId: session.metadata.addressId,
        paymentId: session.payment_intent,
        payment_status: session.payment_status,
      });

      const order = await Order.insertMany(orderProduct);

      //  Clear cart after successful order
      if (order[0]) {
        await User.findByIdAndUpdate(userId, { shopping_cart: [] });
        await Card.deleteMany({ userId });
      }

      console.log('✅ Order created successfully:', order);
      break;
    }

    default:
      console.log(`⚠️ Unhandled event type: ${event.type}`);
  }

  response.json({ received: true });
}



export async function getOrderDetails(request,response){
    try {
        const userId = request.user 

        const orderlist = await Order.find({ userId : userId }).sort({ createdAt : -1 })

        return response.json({
            message : "order list",
            data : orderlist,
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
//stripe listen --forward-to localhost:8080/api/order/webhook