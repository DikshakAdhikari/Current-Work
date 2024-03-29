"use client"
import ChatNav from '@/components/ChatNav'
import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { BASE_URL } from '../secret'

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
  const [online, setOnline] = useState([])
  useEffect(()=> {
     socket.current = io(`${BASE_URL}`,{
      auth:{token: localStorage.getItem('token')}
    });
 
    socket.current.on("recieve-chat", text => {
      setRecievedMessage({userSend:false , chat:text})
    });
    const id = localStorage.getItem('userId')
    //console.log(id);
    socket.current.on('connected',(socketId)=> {
      console.log('current socketId', socketId);
      console.log(id);
      socket.current.emit("add-user", {id , socketId} )
   
      
    })

    socket.current.on('disconnect', ()=> {
      console.log('Socket connection closed');
    })
   
   

    return ()=> {
      socket.current.close()
    }
  },[]);

  useEffect(()=> {
    setMessages( [...messages, recievedMessage] )
  },[recievedMessage])


  useEffect(()=> {
    socket.current.on("get-status", users => {
      console.log('usersss', users);
      setActiveUsers(users)
    } )
  },[socket]);

  useEffect(()=> {
    const fun = async ()=> {
      try{
        const token= localStorage.getItem('token');
        const id= localStorage.getItem('userId');
        //console.log('iddddd', id);
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
        const array= Array(data.length).fill(false)
        setContactClick(array)
        setOnline(array)
        setContacts(data)
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

  const fun = ()=> {
    console.log(activeUsers);
  }
  const handleSubmit = async(e)=> {
    e.preventDefault();
    const id= localStorage.getItem('userId')
    console.log(id, contactUserId, text);
    fun()
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
      console.log(res);
      // setOnline((prev)=> {
      //   prev[index]= res;
      //   return prev
      // })
      return res
    } 

    // const submitUnseen = async(senderChat)=> {
    //   console.log("sender chat",senderChat);
    //   try{
    //     const res= await fetch(`${BASE_URL}/chat/${senderChat._id}`,{
    //       headers:{
    //         'Content-Type':'application/json',
    //       }
    //     });
    //     if(!res.ok){
    //       throw new Error("Network problem")
    //     }
    //     const data= await res.json()
    //   }catch(err){
    //     console.log(err);
    //   }
    // }

      
    useEffect(()=>{
      const fun = async ()=> {
        const res= await fetch(`${BASE_URL}/chat/updateSeen`,{
          method:"POST",
          headers:{
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            senderId:contactUserId,
            userId:localStorage.getItem('userId')
          })
        });

        if(!res.ok){
          throw new Error('Network error');
        }
        const data= await res.json()
      }
      if(contactUserId != undefined){
        fun();
      }
    },[contactUserId]);
    

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
                        console.log(val);
                        setContactUserId(val.val._id)
                        setContactClick((prev)=> {
                          prev[index]=true
                          return prev
                        })
                        }}> {val.val.username} </div>
                      <div>   { !contactClick[index] && val.senderToUserChatsCount} </div>
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
