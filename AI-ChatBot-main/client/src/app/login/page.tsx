"use client"
import React,  { useState, ChangeEvent, FormEvent, useEffect }  from 'react'
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
    const [toggle, setToggle]= useState(false)
    const [showOtp, setShowOtp]= useState("")
    
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
          
          
          if(data.data.user.enabled2fa){
            setToggle(true);
            localStorage.setItem("userId", data.data.user.id);
            localStorage.setItem("enable2fa","true")
          }else{
            localStorage.setItem("userId", data.data.user.id);
            localStorage.setItem("enable2fa","false")
            alert("Logged in successfully!")
            router.push('/')
          }
          
        }
      } catch (error) {
        alert("Email already exists. Login to continue!");
        // router.push("/login");
      }
    };

    const handleOtpSubmit= async()=> {
      console.log(showOtp);
      
      const res= await fetch(`${BASE_URL}/api/auth/verify2fa`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({token:showOtp , userId:localStorage.getItem("userId")})
      });

      const data= await res.json()
      console.log(data.status);
      if(data.status === "success"){
      alert("Login Successfuly!")
      router.push('/')
      }else{
        alert("Invalid user")
        router.push('/register')
      }
    }
  
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
                {!toggle ?
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
                  <div className="flex flex-col items-center">
                    <button
                      type="submit"
                      className="w-4/5 p-2 bg-purple-900 text-white border-none rounded-lg cursor-pointer"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
                : 
                <div>
                {
                  
                  toggle && <div  className="w-[500px] p-5 border border-gray-300 rounded-lg bg-white">
                    <h2 className="m-6 text-3xl font-bold text-purple-900">
                      Enter Code from 
                      <span className="text-red-500"> Authenticator App</span>
                    </h2>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    required
                    value={showOtp}
                    onChange={(e)=> setShowOtp(e.target.value)}
                    className="w-full p-2 mb-4 outline-none border-solid border-2 border-b-gray-400 rounded-md box-border"
                  />
                  <span
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={toggleShowPassword}
                  >
                    {showOtp ? <FaEye /> : <FaEyeSlash />}
                  </span> 

                      <button
                      onClick={handleOtpSubmit}
                      className="w-4/5 p-2 bg-purple-900 text-white border-none rounded-lg cursor-pointer"
                    >
                      Verify
                    </button>
                   
                  </div>
                    }
                   </div>

              }

                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    );
}

export default page
