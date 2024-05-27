import Image from "next/image";
import React from "react";
import WeddingCard from "./WeddingCard";

const WeddingVendors = () => {
  return (
    <div className=" flex mt-10">
    <div className=" h-[70vh] w-[50vw] flex flex-col bg-orange-100">
      <div className=" flex flex-col  h-screen justify-center gap-4 ml-40 w-64">
          <div className=" text-4xl gap-3 font-bold ">Top Wedding Vendor Categories</div>
          <div className=" flex flex-col gap-3">
              <div className=" text-2xl my-3 text-gray-800 font-medium">Mehendi</div>
              <div className=" text-sm text-gray-400">
                In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a docuent of a typeface without.
              </div>   
          </div>
          <div className=" text-sm mt-3 font-medium">Discover More {"->"}</div>
      </div>
      <div className=" flex justify-end p-4 items-end">
        <button className="mt-2 bg-white border-2 border-gray-400 text-sm text-black py-1 px-3 rounded">
          View More {"->"}
        </button>
      </div>
    </div>
    <div className=" relative right-56 top-16">
    <WeddingCard />
    </div>
    </div>
  );
};

export default WeddingVendors;
