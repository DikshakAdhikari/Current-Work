"use client"
import React from 'react'
import { bridalWearData } from './Data'
import Image from 'next/image'

const BridalWear = () => {
  return (
    <div className=' grid grid-cols-4 m-3 gap-5'>
        {
            bridalWearData.map((val, index)=> (
                <div className=' flex flex-col bg-white rounded-lg items-center gap-5 p-3' key={index}>
                   <div>{val.brand}</div>
                    <Image width={250} height={400}  src={val.imgSrc} />
                    <div className=' flex flex-col gap-4  items-center m-3'>
                        <div className=' text-lg font-semibold'>Lorium Ipsum</div>
                        <div className=' w-[15vw] text-center text-sm text-gray-700'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default BridalWear