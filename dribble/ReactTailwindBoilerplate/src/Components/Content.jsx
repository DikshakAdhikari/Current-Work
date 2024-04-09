import React, { useState, useEffect } from 'react';
import backgroundImage from "../assets/images.jpeg";
import Image from "../assets/hire.jpeg";
import Design from "../assets/design.jpg";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../Service';

const Content = () => {
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const navigate=useNavigate();
  
  useEffect(() => {
    setIsButtonEnabled(isChecked1 || isChecked2 || isChecked3);
  }, [isChecked1, isChecked2, isChecked3]);

  const handleCheckboxChange1 = () => {
    setIsChecked1(!isChecked1);
  };

  const handleCheckboxChange2 = () => {
    setIsChecked2(!isChecked2);
  };

  const handleCheckboxChange3 = () => {
    setIsChecked3(!isChecked3);
  };

  const handleClick= async()=> {
    try{
      const res= await fetch(`${BASE_URL}/${localStorage.getItem("email")}`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      });

      const data= await res.json()
      if(data){
        navigate('/mail')
      }
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="max-w-screen-md mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4">What brings you to Dribble?</h1>
      <p className="text-xs text-gray-700 text-center">Select the option that best describes you. Don't worry, you can explore other options later.</p>

      <div className="flex justify-between mt-8 space-x-4">
        <div className={`w-96 h-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${isChecked1 ? 'border-pink-500' : ''}`}>
          <a href="#">
            <img className="rounded-t-lg w-full h-72 object-contain" src={backgroundImage} alt="" />
          </a>
          <div className="p-5 flex flex-col items-center">
            <a href="#">
              <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white text-center">I'm a designer looking to share my work</h5>
            </a>
            <label className="cursor-pointer">
              <input type="checkbox" className="hidden" checked={isChecked1} onChange={handleCheckboxChange1} />
              <span className={`rounded-full border border-gray-400 w-6 h-6 flex items-center justify-center ${isChecked1 ? 'bg-pink-500 border-pink-500' : 'bg-transparent'}`}>
                {isChecked1 && <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 20 20">
                  <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                </svg>}
              </span>
            </label>
          </div>
        </div>

        <div className={`w-96 h-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${isChecked2 ? 'border-pink-500' : ''}`}>
          <a href="#">
            <img className="rounded-t-lg w-full h-72 object-cover" src={Image} alt="" />
          </a>
          <div className="p-5 flex flex-col items-center">
            <a href="#">
              <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white text-center">I'm looking to hire a designer</h5>
            </a>
            <label className="cursor-pointer">
              <input type="checkbox" className="hidden" checked={isChecked2} onChange={handleCheckboxChange2} />
              <span className={`rounded-full border border-gray-400 w-6 h-6 flex items-center justify-center ${isChecked2 ? 'bg-pink-500 border-pink-500' : 'bg-transparent'}`}>
                {isChecked2 && <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 20 20">
                  <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                </svg>}
              </span>
            </label>
          </div>
        </div>

        <div className={`w-96 h-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${isChecked3 ? 'border-pink-500' : ''}`}>
          <a href="#">
            <img className="rounded-t-lg w-full h-72 object-cover" src={Design} alt="" />
          </a>
          <div className="p-5 flex flex-col items-center">
            <a href="#">
              <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white text-center">I'm looking for design inspiration</h5>
            </a>
            <label className="cursor-pointer">
              <input type="checkbox" className="hidden" checked={isChecked3} onChange={handleCheckboxChange3} />
              <span className={`rounded-full border border-gray-400 w-6 h-6 flex items-center justify-center ${isChecked3 ? 'bg-pink-500 border-pink-500' : 'bg-transparent'}`}>
                {isChecked3 && <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 20 20">
                  <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                </svg>}
              </span>
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-10">
        {isButtonEnabled && <p className="text-sm text-gray-700 mb-2">Anything else? You can select multiple</p>}
        <button onClick={()=> handleClick()} disabled={!isButtonEnabled} className={`w-32 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isButtonEnabled ? 'bg-pink-500' : 'bg-gray-300 cursor-not-allowed'}`}>Finish</button>
        {isButtonEnabled && <p className="text-xs text-gray-700 mt-1">or Press RETURN</p>}
      </div>
    </div>
  );
};

export default Content;