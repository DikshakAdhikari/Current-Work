import React, { useState } from "react";
import backgroundImage from "../assets/pic.png";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Service";
import Navbar from "./Navbar";
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    agreedTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: val,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });
      if (!res.ok) {
        throw new Error("Network problem!");
      }
      const data = await res.json();
      // console.log(data.userId);
      if (data) {
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("email", formData.email);
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-between h-[100%]">
      <div>
        <img
          src={backgroundImage}
          alt="Your Image"
          className="w-[100%] h-[100vh]"
        />
      </div>
      <div className="w-[100%]">
        <div className="flex justify-between">
          <div/>

          <div className="m-3 ">
            Already a member?{" "}
            <span className="text-blue-500 cursor-pointer">Sign In</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-full md:w-1/2 p-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign up to Dribble
              </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      required
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 outline-none"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      required
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 outline-none"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      required
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 outline-none"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="6+ characters"
                      autoComplete="current-password"
                      required
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 outline-none"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      id="agreedTerms"
                      name="agreedTerms"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="agreedTerms"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Creating an account means you are okay with our{" "}
                      <a href="#" className="text-indigo-600">
                        Terms of Service Privacy policy
                      </a>
                      <span className="text-black"> and our</span>{" "}
                      <span className="text-blue-500">
                        Default Notification Settings
                      </span>
                      .
                    </label>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={!formData.agreedTerms}
                      className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                        formData.agreedTerms
                          ? "bg-pink-600 hover:bg-pink-700 focus:ring-pink-500"
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                    >
                      Create Account
                    </button>
                  </div>
                  <div className="mt-2 text-xs text-gray-600 text-left">
                    This site is protected by re-CAPTCHA and the Google{" "}
                    <a href="#" className="text-indigo-600">
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-indigo-600">
                      Terms of Service apply.
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;