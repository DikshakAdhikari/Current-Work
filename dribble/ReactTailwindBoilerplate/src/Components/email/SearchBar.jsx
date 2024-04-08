import React from 'react'

const SearchBar = () => {
  return (
    <div className="relative">
    <input
      type="text"
      placeholder="Search"
      className="pl-8 pr-4 py-2 rounded-lg border w-32 bg-gray-100 focus:outline-none "
    />
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg
        className="w-5 h-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-4.57-4.57M2 10.5C2 6.91 4.91 4 8.5 4s6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5S2 14.09 2 10.5z"
        />
      </svg>
    </div>
  </div>
  )
}

export default SearchBar