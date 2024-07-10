"use client"
import React from "react";
import backgroundImage from "../../assets/picc.jpg";
import { CiLock, CiShare2 } from "react-icons/ci";
import { FaCamera } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { FaEdit } from "react-icons/fa";
import { FaWrench } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Image from "next/image";
const Profile = () => {
  return (
    <div className="relative bg-rose-900">
      <div className="relative">
        <Image src={backgroundImage} alt="nice" className="h-80 object-cover" />
        <div className="absolute bottom-0 left-2 right-15  text-white text-center py-2 ">
          Jessica Anderson
          <div className="text-xs">@jessica-anderson-2</div>
        </div>
      </div>

      <div className="absolute top-0 left-0 p-4 text-white text-xs bottom-4 mt-[-1rem]  w-full">
        <div className="flex items-center ">
          <IoIosArrowBack /> Chats img: <span className="mr-8">3</span> msg:
        </div>
        <div className="flex  justify-end mt-[-0.5rem] gap-2">
          <HiOutlineDotsVertical />
          <FaWrench />
          <FaEdit />
          <RxCross2 />
        </div>
      </div>

      <div className="mt-5 mx-5">
        <button className="bg-black text-white font-bold py-0 px-20 rounded-md flex justify-between items-center w-full ">
          <div className="flex items-center">
            <FaCamera className="" /> 0
            <FaRegComment className="" /> 0{" "}
          </div>
          <div className="flex items-center text-xs ml-10">
            <CiLock className="text-lg" />
            <span className="text-xs">Make Character Public</span>
            <CiShare2 className="ml-1 text-lg" />
          </div>
        </button>
      </div>

      <div className="bg-black text-white rounded-md p-4 shadow-md max-w-md mt-4 mx-5">
        <div className="flex">
          <div className="w-1/2 pr-4">
            <h2 className="text-sm font-bold mb-2">Who am I</h2>
            <div>
              <p>Personality</p>
              <p className="text-xs">Caregiver</p>
            </div>
            <div className="mt-1">
              <p>Work</p>
              <p className="text-xs">Yoga Instructor</p>
            </div>
            <div className="mt-1">
              <p>Hobby</p>
              <p className="text-xs">Anime Lover</p>
            </div>
            <div className="mt-1">
              <p>Relationship</p>
              <p className="text-xs">Friend</p>
            </div>
          </div>
          <div className="w-1/2 pl-4">
            <h2 className="text-sm font-bold mb-2">
              About Me <FaEdit className="inline-block ml-16" />
            </h2>

            <p className="text-sm">
              21-year-old anime fanatic and yoga instructor.I binge-watch anime!
              Looking for someone to join me in downward dog and anime
              marathons.Fun fact:I can recite the entire script of my favorite
              anime movie from memory.Lets chat! .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
