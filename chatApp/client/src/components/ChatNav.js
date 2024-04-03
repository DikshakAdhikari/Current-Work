"use client"
import React, { useEffect, useState } from 'react'

const ChatNav = () => {
    
  return (
    <div className=' bg-red-900 h-[7vh] flex items-center'>
        <div className=' text-white text-[1.3rem] pl-5 font-medium'>{localStorage.getItem('username')}</div>
    </div>
  )
}

export default ChatNav
