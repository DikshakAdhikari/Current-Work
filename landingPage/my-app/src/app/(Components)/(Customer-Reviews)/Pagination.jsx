import React, { useEffect } from "react";

const Pagination = ({ value, index, limit, currentPage, setCurrentPage }) => {
  
 
  return (
    <div className=" flex flex-col  gap-10 ">
      <div className=" font-serif text-4xl">{value.title}</div>
      <div className="  text-gray-700">{value.content}</div>
      <div className=" flex gap-5">
        <img alt={value.id} src={value.image} className=" rounded-full w-16 h-16" />
        <div className=" flex justify-center flex-col gap-1">
          <div className=" font-semibold text-lg">{value.name}</div>
          <div className=" text-gray-700">{value.designation}</div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
