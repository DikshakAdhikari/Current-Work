"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [username, setUsername]= useState('')
  const [email, setEmail]= useState('')
  const [password, setPassword]= useState('')
  const router= useRouter();

  const handleSubmit= async(e)=> {
    e.preventDefault();
    try{
      const res= await fetch('http://localhost:3000/user/', {
        method:"POST",
        headers:{
          'Content-Type':"application/json",
        },
        body:JSON.stringify({
          username,email,password
        })
      })
      if(!res.ok){
        throw new Error("Network problem")
      }
      const data= await res.json();
      console.log(data);
      router.push('/signin')

    }catch(err){
      console.log(err);
    }
  }

  
  return (
    <div>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-4 items-center justify-center h-[80vh]">
        <input required onChange={(e)=> setUsername(e.target.value)} placeholder="Username" className=" p-3 border-[1px] border-gray-300 " />
        <input required onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="Email" className=" p-3 border-[1px] border-gray-300 " />
        <input required onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Password" className=" p-3 border-[1px] border-gray-300 " />
        <button type="submit" className=" px-5 p-3 bg-cyan-500 text-white rounded-lg">Submit</button>
      </form>
    </div>
  );
}
