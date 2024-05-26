"use client";

import React, { useState } from "react";
import InputTag from "./InputTag";
import Image from "next/image";

const CardInfo = () => {
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  return (
    <div className=" bg-lime-950 h-96 flex gap-10 items-center justify-center">
      
        <div className=" flex flex-col gap-10 w-[35vw] ">
          <div className=" font-sans font-medium p-1 text-white text-5xl">
            Plan your love journey with us right by your side
          </div>
          <div className=" flex flex-col gap-3">
            <div className=" flex gap-3">
              <InputTag label={"Category"} setInput={setCategory} />
              <InputTag label={"City"} setInput={setCategory} />
            </div>
            <div className=" flex justify-end">
              <button className=" bg-white px-5 py-2 text-sm rounded-md">
                View results
              </button>
            </div>
          </div>
        </div>
        <div className=" relative top-6">
          <Image
            width={500}
            height={500}
            src={
              "https://res.cloudinary.com/liaison-inc/image/upload/f_auto/q_auto,w_1200/v1694101952/content/fash/fash-bride-and-groom-at-Indian-wedding.jpg"
            }
          />
        </div>
      
    </div>
  );
};

export default CardInfo;
