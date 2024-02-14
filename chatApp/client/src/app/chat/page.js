"use client"
import ChatNav from '@/components/ChatNav'
import React, { useEffect, useRef } from 'react'
import io from 'socket.io-client'

const page = () => {

  const socket= useRef()

  useEffect(()=> {
    socket.current= io('http://localhost:3000');
    socket.current.on('connection', ()=> {
      console.log('socket connected');
    })
  },[socket])
    
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
