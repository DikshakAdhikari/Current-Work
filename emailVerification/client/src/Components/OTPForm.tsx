import React, { useState } from 'react';

const OTPForm = () => {
  const [otp, setOTP] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setOTP(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can implement your logic here to verify the OTP
    console.log('Submitting OTP:', otp);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    marginLeft:'600px'
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}
          >
            <input
              type="text"
              maxLength="1"
              style={{
                width: '50px',
                height: '50px',
                textAlign: 'center',
                fontSize: '1.2em',
              }}
              value={otp[0]}
              onChange={handleChange}
            />
            <input
              type="text"
              maxLength="1"
              style={{
                width: '50px',
                height: '50px',
                textAlign: 'center',
                fontSize: '1.2em',
              }}
              value={otp[1]}
              onChange={handleChange}
            />
            <input
              type="text"
              maxLength="1"
              style={{
                width: '50px',
                height: '50px',
                textAlign: 'center',
                fontSize: '1.2em',
              }}
              value={otp[2]}
              onChange={handleChange}
            />
            <input
              type="text"
              maxLength="1"
              style={{
                width: '50px',
                height: '50px',
                textAlign: 'center',
                fontSize: '1.2em',
              }}
              value={otp[3]}
              onChange={handleChange}
            />
          </div>
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
