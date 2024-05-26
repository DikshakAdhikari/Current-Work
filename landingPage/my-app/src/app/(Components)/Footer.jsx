import React from "react";
import {
  AiOutlineTwitter,
  AiFillYoutube,
  AiFillLinkedin,
  AiFillInstagram,
  AiFillHeart,
} from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { BsTelegram } from "react-icons/bs";

// import  images  from  '../../src/assets/logo-min.png'

const Footer = () => {
  return (
    <section className=" bg-green-950 mt-4 flex flex-col">
     <div className=" flex pb-5 pt-12">
        <div className=" w-[30%]">
            <div className=" flex flex-col items-center gap-4">
                <div className=" text-3xl text-white mx-12">LOGO</div>
                <div className=" text-white w-72 text-center text-sm">Lorium ipsum suom duno timst gitim. Livo dimneuiom austimetium.</div>
                <div className=" flex gap-3 text-gray-300 h-auto items-center">
                    <AiOutlineTwitter className=" w-6 h-auto" />
                    <AiFillInstagram className=" w-6 h-auto" />
                    <AiFillYoutube className=" w-6 h-auto" />
                    <AiFillLinkedin className=" w-6 h-auto" />
                </div>
            </div>
        </div>
        <div className=" flex gap-44 justify-center  w-[100%]">
            <div className=" flex flex-col gap-2"> 
              <div className=" text-white font-bold ">Lorem ipsum</div>
              <div className=" text-white text-sm ">Lorem ipsum</div>
              <div className=" text-white text-sm ">Lorem ipsum</div>
              <div className=" text-white text-sm ">Lorem ipsum</div>
              <div className=" text-white text-sm ">Lorem ipsum</div>
              <div className=" text-white text-sm ">Lorem ipsum</div>
            </div>
            <div className=" flex flex-col gap-2"> 
              <div className=" text-white font-bold ">Lorem ipsum</div>
              <div className=" text-white text-sm ">Lorem ipsum</div>
              <div className=" text-white text-sm ">Lorem ipsum</div>
              <div className=" text-white text-sm ">Lorem ipsum</div>
              <div className=" text-white text-sm ">Lorem ipsum</div>
              <div className=" text-white text-sm ">Lorem ipsum</div>
            </div>
            <div className=" flex flex-col gap-2"> 
              <div className=" text-white font-bold ">Lorem ipsum</div>
              <div className=" text-white text-sm ">Lorem ipsum</div>
              <div className=" text-white text-sm ">Lorem ipsum</div>
              <div className=" text-white text-sm ">Lorem ipsum</div>
              <div className=" text-white text-sm ">Lorem ipsum</div>
              <div className=" text-white text-sm ">Lorem ipsum</div>
            </div>
            <div className=" flex flex-col gap-2"> 
              <div className=" text-white font-bold ">Lorem ipsum</div>
              <div className=" text-white text-sm ">Lorem ipsum</div>
              <div className=" text-white text-sm ">Lorem ipsum</div>
              <div className=" text-white text-sm ">Lorem ipsum</div>
              <div className=" text-white text-sm ">Lorem ipsum</div>
              <div className=" text-white text-sm ">Lorem ipsum</div>
            </div>
        </div>
     </div>
     <div className=" py-4 mt-8 px-28  bg-green-900 flex items-center justify-between">
        <div className=" text-gray-200">Terms and conditions</div>
        <div className=" text-gray-200">©-Mangal Bazar | All right reserved </div>
     </div>
    </section>
  );
};

export default Footer;