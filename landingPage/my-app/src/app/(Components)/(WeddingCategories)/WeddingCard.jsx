import React from 'react'

const WeddingCard = () => {
  return (
    <div>
                <div className=' grid grid-cols-8 h-[45vh] gap-5 w-[40vw]'>
            <div className=' col-span-5 '>
            <img
           
            className=' h-[45vh] rounded-lg object-cover'
            src={
              "https://res.cloudinary.com/liaison-inc/image/upload/f_auto/q_auto,w_1200/v1694101952/content/fash/fash-bride-and-groom-at-Indian-wedding.jpg"
            }
          />
            </div>
            <div className=' col-span-3 '>
                <div className=' flex flex-col h-[100%] justify-between gap-3'>
                    <div className=' '>
                    <img
           
           className=' h-[14vh] rounded-lg object-cover'
           src={
             "https://res.cloudinary.com/liaison-inc/image/upload/f_auto/q_auto,w_1200/v1694101952/content/fash/fash-bride-and-groom-at-Indian-wedding.jpg"
           }
         />
                    </div>
                    <div className=' '> <img
           
           className=' h-[14vh] rounded-lg object-cover'
           src={
             "https://res.cloudinary.com/liaison-inc/image/upload/f_auto/q_auto,w_1200/v1694101952/content/fash/fash-bride-and-groom-at-Indian-wedding.jpg"
           }
         /></div>
                    <div className=' '> <img
           
           className=' h-[14vh] rounded-lg object-cover'
           src={
             "https://res.cloudinary.com/liaison-inc/image/upload/f_auto/q_auto,w_1200/v1694101952/content/fash/fash-bride-and-groom-at-Indian-wedding.jpg"
           }
         /></div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default WeddingCard