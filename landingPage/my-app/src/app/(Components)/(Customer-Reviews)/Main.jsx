"use client"
import React, { useState } from 'react'
import { customerData } from './Data'
import Pagination from './Pagination'

const MainComponent = () => {
   const [currentPage, setCurrentPage]=useState(1)
   const limit=2
  return (
    <div className=' flex flex-col my-16 items-center  '>
        <div className=' flex w-[70vw] mb-8 justify-between m-3'>
            <div className='text-5xl w-[45%] flex gap-2 font-semibold '>
                <div className=' '>""</div> 
                <div className=''> What Our Customer are Saying</div>
            </div>
            <div className=' flex gap-3 text-4xl font-semibold items-center'>
                <div onClick={()=> setCurrentPage((prev)=> prev-1)} className=' cursor-pointer'>{"<-"}</div>
                <div onClick={()=> setCurrentPage((prev)=> prev+1)} className=' cursor-pointer'>{"->"}</div>
            </div>

        </div>
    
        <div className=' flex w-[70%] ml-16 justify-between gap-14'>
                {
                    customerData.slice(((currentPage-1)*limit) , (limit*currentPage)).map((val, index)=> (
                        <div key={index}>
                            <Pagination value={val} limit={limit} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                        </div>
                    ))
                }
        </div>
       

    </div>
  )
}

export default MainComponent