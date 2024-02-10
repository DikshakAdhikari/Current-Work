"use client"
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { io } from 'socket.io-client'

export default function Home() {
  // const [socket, setSocket]= useState(null)
  const [text,setText]= useState('')
  const [room, setRoom]= useState('')
  const [message, setMessage]= useState([])
  const [socket , setSocket]= useState(null)
  useEffect(() => {
    const soc=  io("http://localhost:5000", {
        withCredentials: true,
      });
      setSocket(soc)
    },
    []
  );
 
 useEffect(()=> {
  if(!socket) {return}
  socket.on("connect", ()=> {
    console.log('connected');
  })
  
  socket.on("message", (id)=> {
    console.log(id);
  })
  socket.on("user:chat", ({text,room})=> {
    console.log(text,room);
    setMessage((message)=> [...message , text ])
  })

   return (()=> {
    socket.disconnect()
    console.log('socket disconnected');
   })

 },[socket])
  

  const handleSubmit = async(e)=> {
       e.preventDefault()
       socket.emit("chat", {text, room})
  }

  const handleJoin= async(e)=> {
    e.preventDefault()
    socket.emit("join", room)
  }

  console.log(message);
  return (
    <div className=" flex flex-col gap-5 m-8">
       <form onSubmit= {handleJoin} className=" flex   items-center justify-center  w-[100vw] flex-col gap-6" >
      <input className=" border-2 border-solid p-2 border-gray-500" placeholder="Room" onChange={(e)=> setRoom(e.target.value)} />
      <button className=" px-5 py-3 bg-cyan-500 text-white" type="submit">Join</button>
    </form>

    <form onSubmit= {handleSubmit} className=" flex   items-center justify-center w-[100vw] flex-col gap-6" >
      <input className=" border-2 border-solid border-gray-500 p-2" placeholder="Text" onChange={(e)=> setText(e.target.value)} />
      {/* <input className=" border-2 border-solid p-2 border-gray-500" placeholder="Room" onChange={(e)=> setRoom(e.target.value)} /> */}
      <button className=" px-5 py-3 bg-cyan-500 text-white" type="submit">Submit</button>
    </form>
    {
      message.map((val, index)=> (
        <div key={index}>
          <div> {val} </div>
        </div>
      ))
    }
    </div>
  );
}
