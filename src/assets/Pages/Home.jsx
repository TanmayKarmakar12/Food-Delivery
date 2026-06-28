import React, { useContext, useState } from 'react'
import Nav from '../../Components/Nav'
import Categories from '../../Category'
import Card from "../../Components/Card"
import Card2 from "../../Components/Card2"
import Footer from '../../Components/Footer'
import { food_items } from '../../food'
import { dataContex } from '../../Contex/UserContex'
import { ImCross } from "react-icons/im";
import { useSelector } from 'react-redux'
import {toast} from 'react-toastify';

function Home() {

  let {cate, setCate, input, showCart, setShowCart} = useContext(dataContex)
  
  function filter(category){
    if(category==="All"){
      setCate(food_items)
    }else{
      let newList = food_items.filter((item)=>(item.food_category===category))
      setCate(newList)
    }
  }

  let items=useSelector(state=>state.cart)

  let subtotal = items.reduce((total, item)=>total+item.qty*item.price,0)
  let deliveryFee = 20;
  let taxes = subtotal*0.5/100;
  let total = Math.floor(subtotal+deliveryFee+taxes);

  
  return (
    <div className='bg-slate-200 w-full min-h-screen'>
      <Nav/>

      {!input?<div className='flex flex-wrap justify-center items-center gap-6 w-[100%]'>
        {Categories.map((item)=>{
          return  <div className='w-[140px] h-[150px] bg-white flex flex-col items-start gap-5 p-5 justify-start text-[20px] font-semibold text-gray-600 rounded-lg shadow-xl hover:bg-green-200 cursor-pointer transition-all'
            onClick={()=> filter(item.name)}>
                
                {item.icon}
                {item.name}
                
            
            </div>
            
})}
      </div>: null}
      
     <div className='w-full flex flex-wrap gap-5 px-5 justify-center items-center pt-8 pb-8'>
      {cate.length>1?cate.map((item)=>(
            <Card name={item.food_name} image={item.food_image} price={item.price} id={item.id} type={item.food_type} icons={item.symbol}/>
        )):<div className='text-center text-2xl text-green-500 font-semibold pt-5'>No Dish Found</div>}
       
     </div>

     <div className={`w-[100%] md:w-[40vw] h-[100%] fixed top-0 right-0 bg-white shadow-xl p-5 transition-all flex flex-col items-center overflow-auto duration-500 ${showCart?"translate-x-0":"translate-x-full"}` }>
      <header className='w-[100%] flex justify-between items-center'>
        <span className='text-green-600 text-[18px] font-semibold'>Order items</span>
        <ImCross className='w-[20px] h-[20px] text-green-600 text-[18px] font-semibold cursor-pointer hover:text-gray-600' onClick={()=>setShowCart(false)}/>
      </header>

      {items.length>0?<div>

      
      <div className='w-full mt-9 flex flex-col gap-6'>
       {items.map((item)=>(
        <Card2 name={item.name} price={item.price} image={item.image} id={item.id} qty={item.qty}/>
       ))}
      </div>

      <div className='w-full border-t-2 border-b-2 border-gray-400 mt-7 flex flex-col gap-2 p-8'>
        <div className='w-full flex justify-between items-center'>
          <span className='text-lg text-gray-600 font-semibold'>Subtotal</span>
          <span className='text-green-400 font-semibold text-lg'>Rs. {subtotal}/-</span>
        </div>
        <div className='w-full flex justify-between items-center'>
          <span className='text-lg text-gray-600 font-semibold'>Delivery Charges</span>
          <span className='text-green-400 font-semibold text-lg'>Rs. {deliveryFee}/-</span>
        </div>
        <div className='w-full flex justify-between items-center'>
          <span className='text-lg text-gray-600 font-semibold'>Taxes</span>
          <span className='text-green-400 font-semibold text-lg'>Rs. {taxes}/-</span>
        </div>

      </div>
      <div className='w-full flex justify-between items-center p-9'>
          <span className='text-2xl text-gray-600 font-semibold'>Total</span>
          <span className='text-green-400 font-semibold text-2xl'>Rs. {total}/-</span>
        </div>
        <button className='w-[100%] p-3 bg-green-300 rounded-lg text-black hover:bg-green-400 transition-all' onClick={()=>{toast.success("Order Placed...")}}>Place Order</button>

     </div>:<div className='text-center text-2xl text-green-500 font-semibold pt-5'>Empty Cart</div>}
      

     </div>

     <Footer/>

    </div>
    
  )
}

export default Home
