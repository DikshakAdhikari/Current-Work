"use client"
import React, { useState } from "react";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { GiCharacter } from "react-icons/gi";
import { FaCamera } from "react-icons/fa6";
import { FaUserPen } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
const Navbar = () => {
  const [selectedLink, setSelectedLink] = useState<number | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleClick = (index:number) => {
    setSelectedLink(index);
  };
  return (
    <nav className="bg-gray-600 p-3">
      <div className="  flex justify-between items-center">
        <div>
          <div>
            <a href="#" className="text-white text-l font-bold">
              <span>secret </span>
              <span className="bg-pink-500 rounded-lg px-3 py-1">desires</span>
            </a>
          </div>
          <div className="text-xs text-white">Open Beta</div>
        </div>

        <div className="flex space-x-9 justify-center">
          <a
            href="#"
            className={`text-white hover:text-gray-300 inline-block relative ${
              selectedLink === 0 ? "text-pink-500" : ""
            }`}
            onClick={() => handleClick(0)}
          >
            <IoChatboxEllipsesOutline
              className={`inline-block mr-1 ${
                selectedLink === 0 ? "text-pink-500" : ""
              }`}
            />
            <span className={selectedLink === 0 ? "text-pink-500" : ""}>
              Chat
            </span>
            {selectedLink === 0 && (
              <div className="absolute bottom-0 left-0 top-10 w-full h-1 bg-pink-500"></div>
            )}
          </a>

          <a
            href="#"
            className={`text-white hover:text-gray-300 inline-block relative ${
              selectedLink === 1 ? "text-pink-500" : ""
            }`}
            onClick={() => handleClick(1)}
          >
            <GiCharacter
              className={`inline-block mr-1 ${
                selectedLink === 1 ? "text-pink-500" : ""
              }`}
            />
            <span className={selectedLink === 1 ? "text-pink-500" : ""}>
              My Characters
            </span>
            {selectedLink === 1 && (
              <div className="absolute bottom-0 left-0 top-10 w-full h-1 bg-pink-500"></div>
            )}
          </a>

          <a
            href="#"
            className={`text-white hover:text-gray-300 inline-block relative ${
              selectedLink === 2 ? "text-pink-500" : ""
            }`}
            onClick={() => handleClick(2)}
          >
            <FaCamera
              className={`inline-block mr-1 ${
                selectedLink === 2 ? "text-pink-500" : ""
              }`}
            />
            <span className={selectedLink === 2 ? "text-pink-500" : ""}>
              Generate Images
            </span>
            {selectedLink === 2 && (
              <div className="absolute bottom-0 left-0 top-10 w-full h-1 bg-pink-500"></div>
            )}
          </a>

          <a
            href="#"
            className={`text-white hover:text-gray-300 inline-block relative ${
              selectedLink === 3 ? "text-pink-500" : ""
            }`}
            onClick={() => handleClick(3)}
          >
            <span
              className={`inline-block ${
                selectedLink === 3 ? "text-pink-500" : ""
              }`}
            >
              <FaUserPen
                className={`inline-block mr-1 ${
                  selectedLink === 3 ? "text-pink-500" : ""
                }`}
              />
              <span className={selectedLink === 3 ? "text-pink-500" : ""}>
                Create Character
              </span>
            </span>
            {selectedLink === 3 && (
              <div className="absolute bottom-0 left-0 top-10 w-full h-1 bg-pink-500"></div>
            )}
          </a>
        </div>
        <div>
          <a href="#" className="text-white hover:text-gray-300" onClick={toggleDropdown}>
            <GiCharacter
              style={{ display: "inline-block", marginRight: "5px" }}
            />
            My Profile
            <FaCaretDown
              style={{ display: "inline-block", marginLeft: "5px" }}
            />
          </a>
          {dropdownOpen && (
        <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a href="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              Signup
            </a>
            <a href="/signin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              Signin
            </a>
          </div>
        </div>
      )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
