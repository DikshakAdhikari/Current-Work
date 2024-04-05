"use client"
import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { BASE_URL } from '../secret'
import ChatNav from '../../components/ChatNav'

const page = () => {
  const socket= useRef()
  const [contacts, setContacts]= useState([])
  const [contactUserId, setContactUserId]= useState(undefined)
  const [text, setText]= useState('');
  const [messages, setMessages]= useState([])
  const [toggle, setToggle]= useState(false)
  const [recievedMessage, setRecievedMessage]= useState({})
  const [activeUsers, setActiveUsers]= useState([])
  const [contactClick, setContactClick]= useState([])
  const [notifications, setNotifications]= useState([])
  

  

  
  useEffect(()=> {
     socket.current = io(`${BASE_URL}`,{
      auth:{token: localStorage.getItem('token')}
    });
  
   socket.current.on("recieve-chat", text => {
      setRecievedMessage({userSend:false , chat:text.text})
    });

    const id = localStorage.getItem('userId')
    socket.current.on('connected',(socketId)=> {
      socket.current.emit("add-user", {id , socketId} )  
    });

    socket.current.on('disconnect', ()=> {
      console.log('Socket connection closed');
    });
    return ()=> {
      socket.current.close()
    }
  },[]);
  useEffect(()=> {
    setMessages( [...messages, recievedMessage] )
  },[recievedMessage])


  useEffect(()=> {
    socket.current.on("notification", item => {
      setNotifications([...notifications, {item}])
    })
  })

  // console.log("notiiii", notifications);


  useEffect(()=> {
    socket.current.on("get-status", users => {
      setActiveUsers(users)
    } )
  },[socket]);

  useEffect(()=> {
    const fun = async ()=> {
      try{
        const token= localStorage.getItem('token');
        const id= localStorage.getItem('userId');
        const res= await fetch(`${BASE_URL}/user/all/${id}`,{
          method:"GET",
          headers:{
            'Content-Type': "application/json",
            'authorization': token
          }
        });
        if(!res.ok){
          throw new Error("Network Error!");
        }
        const data= await res.json();
        localStorage.setItem('data', JSON.stringify(data))
        setContacts(data)
        const array= Array(data.length).fill(false);
        setContactClick(array)
        
      }catch(err){
        console.log(err);
      }
    }
    fun()
   
  },[socket]);

  useEffect(()=> {
    const id= localStorage.getItem('userId')
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

      setMessages(data)
      setToggle(false)
    }
    fun();
  },[ toggle || contactUserId])


  const handleSubmit = async(e)=> {
    e.preventDefault();
    const id= localStorage.getItem('userId')
  
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
       setToggle(true)
     
    }catch(err){
      console.log(err);
    }
  }

    const checkOnlineUser = (id, index)=> { 
      const res= activeUsers.some((val)=> val.userId === id.val._id);
      return res
    }
    
    function fun(senderId){
      const filterCount = notifications.filter((val)=> (val.item.senderId === senderId && (val.item.read === false)))
     // console.log(filterCount);
      return filterCount.length
    }
    console.log(notifications);

    function markRead(senderId){
      setNotifications(prev => {
        return prev.map((val)=> {
          if(val.item.senderId ===  senderId){
            return {...val, read:true}
          }
          return val
        })
      })
    }

    
  
  return (
    <div className=' w-[100vw]'>
      <ChatNav />
      <div className=' h-[93vh] w-[100vw] flex'>
        <div className=' border-r-4 border-gray-300 p-3 w-[20vw] '>
          {
            contacts?.senders?.length === 0 ?
            <div>No contacts available</div> :
            <div>
              {
                contacts?.map((val,index)=> (
                  
                  <div  className=' cursor-pointer  flex gap-3 hover:text-yellow-500 my-3' key={index}> 
                      <div onClick={()=> {
                        setContactUserId(val.val._id)
                        setContactClick((prev)=> {
                          prev[index]=true
                          return prev
                        })
                        }}> {val.val.username} </div>
                      {/* <div>   { !contactClick[index] && val.senderToUserChatsCount} </div> */}
                      <div onClick={()=> markRead(val.val._id)}> {fun(val.val._id)=== 0 ? "" : fun(val.val._id)} </div>
                      <div>

                      {checkOnlineUser(val , index) ? "Online" : "Offline"}
                      </div>       
                  </div>
                ))
               }
            </div>
           }
        </div>
        
        <div className=' border-r-4 bg-black w-[100vw]  p-4 border-gray-300  '>
           {messages?.map((val,index)=> (
            <div key={index}>
              {/* {
                !val.userSend && submitUnseen(val)
              } */}
              {
                val.userSend ?
                <div className= " bg-blue-600 text-white">
                  {
                    val.chat
                  }
                </div> :
                <div className=" bg-green-500 text-white">
                  {
                    val.chat
                  }
                </div>
              }
            </div>
           ))}
          <form onSubmit={handleSubmit} className=' flex gap-3'>
            <input required onChange={(e)=> setText(e.target.value)} className=' outline-none rounded-md text-black w-[60vw] p-3' />
            <button type='submit' className=' bg-cyan-500 p-3 px-5 rounded-md'>SEND</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default page