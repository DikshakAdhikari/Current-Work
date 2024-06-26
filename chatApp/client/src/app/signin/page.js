"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { BASE_URL } from '../secret'

const page = () => {
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const router= useRouter();
    const handleSubmit= async(e)=> {
        e.preventDefault();
        try{
            const res= await fetch(`${BASE_URL}/user/signin`, {
                method:"POST",
                headers:{
                  'Content-Type':"application/json",
                },
                body:JSON.stringify({
                  email,password
                })
              })
              if(!res.ok){
                throw new Error("Network problem")
              }
              const data= await res.json();
              //console.log(data);
              localStorage.setItem('token', data.token)
              localStorage.setItem('userId', data.userId)
              localStorage.setItem('username', data.username)
              router.push('/chat')
              
        }catch(err){
          console.log(err);
        }
    }

  return (
    <div className=''>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-4 items-center justify-center h-[80vh] ">
        <input required onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="Email" className=" p-3 border-[1px] border-gray-300 " />
        <input required onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Password" className=" p-3 border-[1px] border-gray-300 " />
        <button type="submit" className=" px-5 p-3 bg-cyan-500 text-white rounded-lg">Submit</button>
      </form>
    </div>
  )
}

export default page
