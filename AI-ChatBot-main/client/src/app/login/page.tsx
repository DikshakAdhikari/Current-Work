"use client"
import React,  { useState, ChangeEvent, FormEvent }  from 'react'
import Navbar from '../(Components)/Navbar'
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BASE_URL } from '@/services';


interface FormData {
    email: string;
    password: string;
  }

const page = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({ 
      email: "",
      password: "",
    });
    const [error, setError] = useState<string>(""); 
    const [showPassword, setShowPassword] = useState<boolean>(false); 
    const [showRetypePassword, setShowRetypePassword] = useState<boolean>(false); 
    console.log(formData);
    
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => { 
      event.preventDefault();
      
      try {
        const response = await fetch(`${BASE_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (!response.ok) {
          throw new Error("Failed to sign up");
        }
  
        const data = await response.json();
        //console.log(data);
        
        if (!response.ok) {
          if (
            response.status === 400 &&
            data.message === "Email already exists"
          ) {
            setError(data.message); 
          } else {
            throw new Error(data.message); 
          }
        }
  
        if (data) {
          localStorage.setItem("userId", data.data.user.id);
          router.push('/');
        }
      } catch (error) {
        alert("Email already exists. Login to continue!");
        // router.push("/login");
      }
    };
  
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { 
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    };
  
    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };
  
    const toggleShowRetypePassword = () => {
      setShowRetypePassword(!showRetypePassword);
    };
  
    return (
      <div>
      <Navbar />
      <div className="flex justify-between">
        <div>
          <img
            src="pic.jpg"
            alt="nice"
            className="w-full h-screen ml-20"
          />
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="flex flex-col items-center">
            <div className="w-full max-w-2xl p-8">
              <div className="w-full max-w-11/12">
                <form
                  onSubmit={handleSubmit}
                  className="w-[500px] p-5 border border-gray-300 rounded-lg bg-white"
                >
                  <div className="flex flex-row">
                    <h2 className="m-6 text-3xl font-bold text-purple-900">
                      Welcome
                      <span className="text-red-500">!</span>
                    </h2>
    
                    <h2
                      className="ml-24 mt-6 text-3xl font-bold text-purple-900 cursor-pointer"
                      onClick={() => router.push('/login')}
                    >
                      Sign
                      <span className="text-red-500"> In</span>
                    </h2>
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border-none outline-none rounded-md box-border"
                  />
                  <br />
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full p-2 mb-4 outline-none border-none rounded-md box-border"
                    />
                    <span
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
    
                 
    
                  <br />
                  {error && (
                    <div className="text-red-500 mt-1.5">{error}</div>
                  )}
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="w-4/5 p-2 bg-purple-900 text-white border-none rounded-lg cursor-pointer"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    );
}

export default page
