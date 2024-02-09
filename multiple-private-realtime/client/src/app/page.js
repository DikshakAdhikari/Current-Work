"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { io } from 'socket.io-client'

export default function Home() {
  const [text, setText] = useState('');
  const [room, setRoom] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5000", {
      withCredentials: true,
    });
    console.log(newSocket);
    setSocket(newSocket);
    console.log(socket);
    console.log('ttttttttttttt');

   
  }, []);

  useEffect(() => {
    console.log('fdfdfdf',socket);
    if (!socket) return;
    socket.on("connect", () => {
      console.log('Connected to server');
    });

    socket.on("message", (id) => {
      console.log(id);
    });

    socket.on("user:chat", ({ text, room }) => {
      console.log(text, room);
    });

    return () => {

      socket.off("user:chat");
    };
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || !room) {
      console.log("Text and room are required");
      return;
    }
    socket.emit("chat", { text, room });
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex items-center justify-center h-[100vh] w-[100vw] flex-col gap-6">
        <input className="border-2 border-solid border-gray-500 p-2" placeholder="Text" value={text} onChange={(e) => setText(e.target.value)} />
        <input className="border-2 border-solid p-2 border-gray-500" placeholder="Room" value={room} onChange={(e) => setRoom(e.target.value)} />
        <button className="px-5 py-3 bg-cyan-500 text-white" type="submit">Submit</button>
      </form>
    </>
  );
}
