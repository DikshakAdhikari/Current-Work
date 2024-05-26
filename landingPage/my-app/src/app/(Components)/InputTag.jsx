import React from 'react'

const InputTag = ({label, setInput}) => {
  return (
    <div className="relative w-full max-w-xs">
    <input
      type="text"
      placeholder=" "
      className="block w-full rounded-lg px-3 py-2 bg-transparent border-2 border-white text-white focus:outline-none focus:ring-0"
    />
    <label className="absolute top-0 left-3 px-2 text-white  bg-lime-950 -translate-y-1/2 transform pointer-events-none">
      {label}
    </label>
  </div>
  )
}

export default InputTag