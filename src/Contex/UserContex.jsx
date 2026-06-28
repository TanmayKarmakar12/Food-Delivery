import React, { createContext, useState } from 'react'
import { food_items } from '../food'
export const dataContex = createContext()


function UserContex({children}) {

    let [input, setInput] = useState("")
    let [cate, setCate] = useState(food_items)
    let [showCart, setShowCart] = useState(false)
    

    let data = {
        input,
        setInput,
        cate,
        setCate,
        showCart,
        setShowCart

    }
  return (
    <div>
        <dataContex.Provider value={data}>
      {children}
      </dataContex.Provider>
    </div>
  )
}

export default UserContex
