import React, { useEffect, useState } from 'react'
import { MdShoppingBag } from "react-icons/md";
import SearchBar from './SearchBar';
import { BASE_URL } from '../../Service';
const Nav = () => {
    const [profilePicture, setProfilePicture]= useState(null)
    useEffect(()=> {
        async function fun(){
            try{
                const res= await fetch(`${BASE_URL}/profile/${localStorage.getItem("userId")}`,{
                    method:"GET",
                 headers:{
                    "Content-Type":"application/json"
                 }
                });
                if(!res.ok){
                    throw new Error("Network Problem!")
                }
                const data= await res.json();
                localStorage.setItem("email", data.userId.email)
                setProfilePicture(data.image)
            }catch(err){
                console.log(err);
            }
        }
       fun()
    },[])
  return (
    <div className=' flex justify-between p-3'>
        <div className=' flex gap-4'>
            <div>dribble</div>
            <div className=' text-gray-600 cursor-pointer'>Inspiration</div>
            <div className=' text-gray-600 cursor-pointer'>Find Work</div>
            <div className=' text-gray-600 cursor-pointer'>Learn Design</div>
            <div className=' text-gray-600 cursor-pointer'>Go Pro</div>
            <div className=' text-gray-600 cursor-pointer'>Here Designers</div>
        </div>
        <div className=' flex items-center gap-3'>
           <SearchBar />
           <MdShoppingBag className=' cursor-pointer w-6 h-6' />
           <img className=' w-10 h-10 rounded-full' src={profilePicture} alt="null" />
           <button className=' p-3 font-semibold text-white text-xs bg-pink-700 rounded-md'>Upload</button>
        </div>
    </div>
  )
}

export default Nav