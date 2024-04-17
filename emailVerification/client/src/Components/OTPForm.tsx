import React, { useState, ChangeEvent, FormEvent } from 'react';

const OTPForm: React.FC = () => {
  const [otp, setOTP] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length <= 4 && /^\d*$/.test(value)) { // Ensure only digits and max length of 4
      setOTP(value);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otp.length === 4) {
      // You can implement your logic here to verify the OTP
      console.log('Submitting OTP:', otp);
    } else {
      console.log('Please enter a 4-digit OTP');
    }
  };
  console.log(otp);
  

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
