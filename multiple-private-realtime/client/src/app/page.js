"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import  io  from 'socket.io-client'

export default function Home() {
  const [socket, setSocket]= useState(null)

  useEffect(()=> {
    const socketInstance= io("http://localhost:4000");
     setSocket(socketInstance)

     socketInstance.on("connect", ()=> {
      console.log("Connected to the server");
     });

     socketInstance.on("message", (data)=> {
      console.log(`Message recieved from server: ${data}`);
     });

     return ()=> { //Clean up the socket connection when the component unmounts. Unmounting refers to the removal of a component from the DOM. When a component unmounts, it means that React has removed the component from the DOM, usually because it's no longer needed (e.g., the user navigated away from the page).
      if(socketInstance){
         socketInstance.disconnect()
         console.log('Socket Disconnected!');
      }

     }
  })

  return (
   <div>
    fdfd
   </div>
  );
}
