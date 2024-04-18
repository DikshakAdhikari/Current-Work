import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../Services';

const OTPForm: React.FC = () => {
  const [otp, setOTP] = useState<string>('');
  const navigate= useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length <= 4 && /^\d*$/.test(value)) { // Ensure only digits and max length of 4
      setOTP(value);
    }
  };

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId= localStorage.getItem("userId");

    if (otp.length === 4) {
      const res= await fetch(`${BASE_URL}/verifyOtp`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          userId, otp
        })
      });
      if(!res.ok){
        throw new Error("Network problem!");
      }
      const data= await res.json();
      if(data.status === "VERIFIED"){
        console.log(data);
        navigate('/home')
      }else{
        alert("Wrong/empty password, Signup again!")
        navigate("/")
      }
      
    } else {
      console.log('Please enter a 4-digit OTP');
    }
  };
  

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width:"100vw"
      }}
    >
      <div
        style={{
          width: '300px',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          textAlign: 'center',
        }}
      >
        <h2>Enter OTP</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            maxLength={4}
            style={{
              width: '200px',
              height: '50px',
              textAlign: 'center',
              fontSize: '1.2em',
            }}
            value={otp}
            onChange={handleChange}
          />
          <button
            type="submit"
            style={{
              backgroundColor: '#3a2a4a',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              padding: '10px 20px',
              fontSize: '1em',
              cursor: 'pointer',
              marginTop: '20px',
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPForm;
