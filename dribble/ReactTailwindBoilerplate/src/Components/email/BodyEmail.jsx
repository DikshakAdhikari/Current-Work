import React from 'react'
import { MdMarkEmailRead } from "react-icons/md";

const BodyEmail = () => {
  return (
    <div className=' flex flex-col  gap-3 justify-center items-center m-4'>
      <div className=' text-base font-medium text-gray-700  '>Please verify your email...</div>
      <MdMarkEmailRead className=' h-40 w-40' />
      <div className=' text-base font-medium text-gray-700'>Please verify your email address. We've sent a confirmation email to</div>
      <div className=' text-base  font-bold'>{localStorage.getItem("email")}</div>
      <div className=' text-base font-medium text-gray-700'>Click the confirmation link in that email to begin using Dribble.</div>
      <div className='text-base font-medium text-gray-700 w-[45%] text-center'>Didn't receive the email? Click your spam folder, it may have been caught by a filter. If you still don't see it, you can <span className=' cursor-pointer text-pink-600 font-semibold'>resend the confirmation email</span>.</div>

      <div  className=' text-base font-medium text-gray-700'>Wrong email address? <span className=' cursor-pointer text-pink-600 font-semibold'>Change it.</span></div>
    </div>
  )
}

export default BodyEmail