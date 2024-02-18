"use client"
import ChatNav from '@/components/ChatNav'
import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { BASE_URL } from '../secret'

const page = () => {
  const socket= useRef()
  const [contacts, setContacts]= useState([])
  const [contactUserId, setContactUserId]= useState()
  const [text, setText]= useState('')
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
  },[]);

  useEffect(()=> {
    const {id}= JSON.parse(localStorage.getItem('token'))
    console.log('pppppppppppp', id, contactUserId);
    const fun = async()=> {
      const res= await fetch(`${BASE_URL}/chat/getChats`,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          from:id,
          to:contactUserId
        })
      });

      if(!res.ok){
        throw new Error("Network problem!");
      }
      const data= await res.json();
      console.log(data);
    }
    fun();
  },[contactUserId])

  const handleSubmit = async(e)=> {
    e.preventDefault();
    const {id}= JSON.parse(localStorage.getItem('token'))
    try{
      socket.current.emit("send-chat",{text, contactUserId});
       const res= await fetch(`${BASE_URL}/chat`, {
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          from: id,
          to: contactUserId,
          message: text
        })
       });
       
       if(!res.ok){
        throw new Error('Network problem!');
       }
       const data= await res.json();
       console.log(data);
    }catch(err){
      console.log(err);
    }
  }
  
    
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
                  <div onClick={()=> setContactUserId(val._id)} className=' cursor-pointer hover:text-yellow-500 my-3' key={val._id}> 
                      <div> {val.username} </div>
                  </div>
                ))
               }
            </div>
           }
        </div>
        <div className=' border-r-4 bg-black w-[100vw]  p-4 border-gray-300  '>
          <form onSubmit={handleSubmit} className=' flex gap-3'>
            <input onChange={(e)=> setText(e.target.value)} className=' outline-none rounded-md text-black w-[60vw] p-3' />
            <button type='submit' className=' bg-cyan-500 p-3 px-5 rounded-md'>SEND</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default page
