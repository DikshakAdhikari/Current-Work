"use client"
import React, { useEffect, useState } from 'react'

const ChatNav = () => {
    const [getUsername, setUsername]= useState('')
    useEffect(()=> {
        const user= JSON.parse(localStorage.getItem('token'))
        setUsername(user.username)
    },[])
  return (
    <div className=' bg-red-900 h-[7vh] flex items-center'>
        <div className=' text-white text-[1.3rem] pl-5 font-medium'>{getUsername}</div>
    </div>
  )
}

export default ChatNav
