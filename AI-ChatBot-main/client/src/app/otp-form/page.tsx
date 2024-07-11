"use client"
import { BASE_URL } from '@/services';
import { useRouter } from 'next/navigation';
import React, { useState, ChangeEvent, FormEvent } from 'react';

const Page: React.FC = () => {
  const [otp, setOTP] = useState<string>('');
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length <= 4 && /^\d*$/.test(value)) { // Ensure only digits and max length of 4
      setOTP(value);
    }
  };

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    if (otp.length === 4) {
      const res = await fetch(`${BASE_URL}/otp/verifyOtp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId, otp
        })
      });
      if (!res.ok) {
        throw new Error("Network problem!");
      }
      const data = await res.json();
      console.log(data);

      if (data.status === "VERIFIED") {
        router.push('/home');
      } else {
        alert("Wrong/empty password, Signup again!");
        router.push("/");
      }

    } else {
      console.log('Please enter a 4-digit OTP');
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="w-72 p-5 border border-gray-300 rounded text-center">
        <h2 className="text-2xl mb-4">Enter OTP</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            maxLength={4}
            className="w-48 h-12 text-center text-xl border border-gray-300 rounded mb-4"
            value={otp}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-purple-800 text-white border-none rounded py-2 px-4 text-lg cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
