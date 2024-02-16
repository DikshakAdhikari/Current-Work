"use client"
import ChatNav from '@/components/ChatNav'
import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { BASE_URL } from '../secret'

const page = () => {
  const socket= useRef()
  const [contacts, setContacts]= useState([])
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
  },[]);

  useEffect(()=> {
    const fun = async ()=> {
      try{
        const {id}= JSON.parse(localStorage.getItem('token'))
        const res= await fetch(`${BASE_URL}/user/all/${id}`,{
          method:"GET",
          headers:{
            'Content-Type': "application/json"
          }
        });
        if(!res.ok){
          throw new Error("Network Error!");
        }
        const data= await res.json();
        setContacts(data)
      }catch(err){
        console.log(err);
      }
    }
    fun()
  })
  
    
  return (
    <div className=' w-[100vw]'>
      <ChatNav />
      <div className=' h-[93vh] w-[100vw] flex'>
        <div className=' border-r-4 border-gray-300 p-3 w-[20vw] '>
          {
            contacts.length === 0 ?
            <div>No contacts available</div> :
            <div>
              {
                contacts.map((val,index)=> (
                  <div key={val._id}> 
                      <div> {val.username} </div>
                  </div>
                ))
              }
            </div>
           }
        </div>
        <div className=' border-r-4 bg-black w-[100vw] text-white p-4 border-gray-300  '>
          fdf
        </div>
      </div>
    </div>
  )
}

export default page
