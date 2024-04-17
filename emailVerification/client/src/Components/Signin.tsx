import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/pic.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Signin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      
    
      try {
        const response = await fetch("http://localhost:5001/signin", {
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
  
        console.log("Signin successful:", data);
        navigate("/home");
      } catch (error) {
        console.error("Error signing up:", error);
      }
    };
  
    const handleChange = (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    };
  
    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };
  
    const handleSignupClick = () => {
      navigate("/");
    };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <img
          src={backgroundImage}
          alt="nice"
          style={{ width: "100%", height: "100vh",marginLeft:'80px' }}
        />
      </div>
      <div style={{ width: "100%",display:'flex',justifyContent:'center',alignItems:'center', }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ width: "100%", maxWidth: "50%", padding: "2rem" }}>
            <div
              style={{
                marginTop: "10rem",
                margin: "auto",
                width: "100%",
                maxWidth: "90%",
              }}
            >
              <form
                onSubmit={handleSubmit}
                style={{
                  width: "400px",

                  padding: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  backgroundColor: "white",
                }}
              >
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <h2
                    style={{
                      marginTop: "1.5rem",
                      fontSize: "1.875rem",
                      fontWeight: "bold",
                      color: "#3a2a4a",
                    }}
                  >
                    Fill what we know
                    <span style={{ color: "red" }}>!</span>
                    </h2>
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "15px",
                    border: "none",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                  }}
                />
                <br />
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "15px",
                      border: "none",
                      borderRadius: "4px",
                      boxSizing: "border-box",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>

                {error && (
                  <div style={{ color: "red", marginTop: "5px" }}>{error}</div>
                )}
                <div style={{ display: "flex", justifyContent: "center",marginTop:'1rem' }}>
                  <button
                 
                    type="submit"
                    style={{
                      width: "80%",
                      padding: "10px",
                      backgroundColor: "#3a2a4a",
                      color: "white",
                      border: "none",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Sign In
                  </button>
                </div>
                <div style={{ display: "flex", justifyContent: "center",marginTop:'1rem' }}>
                  <button
                  onClick={()=>{handleSignupClick()}}
                    type="submit"
                    style={{
                      width: "80%",
                      padding: "10px",
                      backgroundColor: "#3a2a4a",
                      color: "white",
                      border: "none",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
