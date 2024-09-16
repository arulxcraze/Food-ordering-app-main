import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Contexts/StoreContext'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
  const {getTotalAmount,token,url,food_list,cartItems} = useContext(StoreContext)
  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })
  // useEffect(()=>{
  //   console.log(data);
    
  // },[data])
  const placeOrder = async(event)=>{
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
    {console.log(orderItems);
    }
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalAmount()+2
    }

    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    console.log(response);
    
    if(response.data.success==true){
      const {session_url}=response.data;
      window.location.replace(session_url)
    }else{
      alert("Error")
    }
  }
  const onChangeHandler = (event)=>{
    const value = event.target.value;
    const name = event.target.name;
    setData(data=>({...data,[name]:value}))
  }

  const navigate = useNavigate()

  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }else if(getTotalAmount()===0){
      navigate('/cart')
    }
  },[token])
  return (
    <form action="" onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First name' />
          <input required type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name' />
        </div>
        <input required type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' />
        <input required type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' />
        <div className="multi-fields">
          <input required type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='City' />
          <input required type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required type="text" name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' />
          <input required type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' />
        </div>
        <input required type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${getTotalAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalAmount()===0?0:getTotalAmount() + 2}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder