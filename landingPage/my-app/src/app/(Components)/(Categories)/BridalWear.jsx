"use client"
import React from 'react'
import { bridalWearData } from './Data'
import Image from 'next/image'

const BridalWear = () => {
  return (
    <div className=' grid grid-cols-4 m-3  gap-8'>
        {
            bridalWearData.map((val, index)=> (
                <div className={` ${index%2 && 'relative top-9 mb-10' } flex flex-col bg-white rounded-lg items-center gap-5 `} key={index}>
                   <div className=' font-serif font-semibold text-lg pt-4 '>{val.brand}</div>
                    <Image width={250} height={400}  src={val.imgSrc} />
                    <div className=' flex flex-col hover:bg-yellow-500 hover:text-white text-gray-800 gap-4 p-3  items-center '>
                        <div className=' text-lg font-semibold'>Lorium Ipsum</div>
                        <div className=' w-[15vw] text-center text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default BridalWear