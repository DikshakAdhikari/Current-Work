"use client"
import ChatNav from '@/components/ChatNav'
import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { BASE_URL } from '../secret'

const page = () => {
  const socket= useRef()

  useEffect(()=> {
     socket.current = io(`${BASE_URL}`,{
      withCredentials:true
    });
   
    socket.current.on("message", (id)=> {
      // console.log(id);
    }) 
    const {id}= JSON.parse(localStorage.getItem('token'))
    console.log(id);
    socket.current.emit("add-user", id )
  },[])
  
    
  return (
    <div className=' w-[100vw]'>
      <ChatNav />
      <div className=' h-[93vh] w-[100vw] flex'>
        <div className=' border-r-4 border-gray-300 w-[20vw] '>
        </div>
        <div className=' border-r-4 bg-black w-[100vw] border-gray-300  '>
            fd
        </div>
      </div>
    </div>
  )
}

export default page
