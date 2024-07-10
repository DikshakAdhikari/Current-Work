"use client"
import React from "react";
import Profile from "./Profile";
import Chat from "./Chat";


const HomePage = () => {
  return (
    <div>
      <div className="flex justify-between h-[100%]">
        <Profile />
        <div className="w-[100%]">
          <div className="flex justify-between">
            <Chat />
            <div />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
