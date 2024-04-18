import React, { useState, ChangeEvent, FormEvent } from "react"; 
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/pic.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BASE_URL } from "../Services";


interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  retypePassword: string;
  contactMode: string;
}

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({ 
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    retypePassword: "",
    contactMode: "",
  });
  const [error, setError] = useState<string>(""); 
  const [showPassword, setShowPassword] = useState<boolean>(false); 
  const [showRetypePassword, setShowRetypePassword] = useState<boolean>(false); 

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => { 
    event.preventDefault();
    
    if (formData.password !== formData.retypePassword) {
      setError("Passwords don't match");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/signup`, {
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

      if (data) {
        localStorage.setItem("userId", data.data.userId);
        navigate('/otp');
      }
    } catch (error) {
      alert("Email already exists. Login to continue!");
      navigate("/login");
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
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <img
          src={backgroundImage}
          alt="nice"
          style={{ width: "100%", height: "100vh", marginLeft: '80px' }}
        />
      </div>
      <div style={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ width: "100vh", maxWidth: "50%", padding: "2rem", }}>
            <div
              style={{
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
                    Let us Know
                    <span style={{ color: "red" }}>!</span>
                  </h2>

                  <h2
                    style={{
                      marginLeft: "6rem",
                      marginTop: "1.5rem",
                      fontSize: "1.875rem",
                      fontWeight: "bold",
                      color: "#3a2a4a",
                      cursor: 'pointer'
                    }}
                    onClick={() => navigate('/login')}
                  >
                    Sign
                    <span style={{ color: "red" }}> In</span>
                  </h2>
                </div>
                <input
                  type="text"
                  name="firstName"
                  required
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "15px",
                    border: "none",
                    boxSizing: "border-box",
                  }}
                />
                <br />
                <input
                  type="text"
                  name="lastName"
                  required
                  placeholder="Last Name"
                  value={formData.lastName}
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

                <div style={{ position: "relative" }}>
                  <input
                    type={showRetypePassword ? "text" : "password"}
                    name="retypePassword"
                    required
                    value={formData.retypePassword}
                    onChange={handleChange}
                    placeholder="Retype Password"
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
                    onClick={toggleShowRetypePassword}
                  >
                    {showRetypePassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>

                <select
                  name="contactMode"
                  value={formData.contactMode}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "15px",
                    border: "none",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                    height: "40px",
                  }}
                >
                  <option value="">Select</option>
                  {formData.contactMode === "" && (
                    <option value="">Email</option>
                  )}
                  {formData.contactMode !== "" && (
                    <option value="Email">Email</option>
                  )}
                </select>
                <br />
                {error && (
                  <div style={{ color: "red", marginTop: "5px" }}>{error}</div>
                )}
                <div style={{ display: "flex", justifyContent: "center" }}>
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

export default SignupForm;
