"use client"
import React, { useState } from 'react'
import { bridalWearData, categoryOptions } from './Data'
import ShowCategoryInfo from './ShowCategoryInfo'


const Categories = () => {
  const [titleIndex, setTitleIndex]= useState(2)
  return (
    <div className=' flex flex-col gap-4 items-center mt-14 mb-5'>
        <div className=' text-4xl text-gray-900 font-semibold'>Wedding Categories</div>
        <div className=' flex text-center text-gray-700 w-1/3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
        
        <div className=' flex gap-5 m-4'>
          {
            categoryOptions.map((val, index)=> (
              <div onClick={()=> setTitleIndex(index) } key={index} className={` ${titleIndex === index && ' font-bold text-black'} text-lg cursor-pointer text-gray-700`} >
                  {val}
              </div>
            ))
          }
        </div>
        <div>
          <ShowCategoryInfo titleIndex={titleIndex} />
        </div>
     
    </div>
  )
}

 
  
export default Categories   