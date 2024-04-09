import React, { useEffect, useRef, useState } from 'react';
import { CameraLogo } from '../Logo';
import { BASE_URL } from '../Service';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
const WelcomePage = () => {
  const [file, setFile] = useState(null);
  const inputRef= useRef(null)
  const navigate= useNavigate()
  const [disabled, setDisabled]= useState(false)
  const [location, setLocation]= useState("")
  const handleFileChange = (e) => {
    if (e.target.files !== null && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const allowedExtensions = ["png", "jpeg", "jpg", "svg","webp"];
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
  
      
      if (fileExtension && allowedExtensions.includes(fileExtension)) {
        setFile(selectedFile);
       
      } else {      
        console.error("Invalid file type. Please select a .png, .jpg, or .svg file.");
        // setError("Invalid file type. Please select a .png, .jpg, .svg or webp file.")
      
        e.target.value = '';
      }
    }
  };

  const handleImageClick = ()=> {
    inputRef.current.click()
  }

  const handleSubmit = async(e)=> {
    e.preventDefault()
    try{
      const res= await fetch(`${BASE_URL}/profile/picture`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body: JSON.stringify({
          filename: file?.name,
          contentType:file?.type
        })
      });
      if(!res.ok){
        throw new Error('Network problem!')
      }
      const data= await res.json()
      
      
      if(data){
        const s3PutUrl= data;
        const res2= await fetch(s3PutUrl, {
          method:"PUT",
          headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Content-Type": file?.type
          },
          body:file
        });
        
        if(!res2.ok){
          throw new Error("Network Problem!");
        }
        const res3= await fetch(`${BASE_URL}/profile/`, {
          method:"POST",
          headers:{
            "Content-Type": "application/json",
            'authorization': localStorage.getItem('token')
          },
          body:JSON.stringify({
             filename: file?.name, location, userId:localStorage.getItem("userId")
          })
        })
  
        if(!res3.ok){
          throw new Error('Network problem while creating blog!');
        }
        const data3= await res3.json()
        if(data3){
          navigate('/content')
        }
      }
    }catch(err){
      console.log(err);
    }

  }

  function handleInputChange(e){
    setLocation(e.target.value)
  }

 
  return (
    <div>
    <div className='sticky'>
<Navbar />
</div>
    <div className="min-h-screen bg-gray-100 flex flex-col justify-start items-center">
      <form onSubmit={handleSubmit}>
      <h1 className="text-3xl font-bold text-center mt-8 mb-4">Welcome! Let's create your profile</h1>
      <p className="text-xs text-gray-600 mb-2">Let others get to know you better! You can do these later</p>
      <div className="max-w-screen-xl mx-auto flex flex-col ">
        <p className="text-xs text-gray-600 mt-7 ml-0 mb-2">Add an Avatar</p>
        <div className="flex items-center">
          <div className="rounded-full bg-gray-300 h-40 w-40 flex items-center justify-center mr-11 mt-11">
          <div  className=' flex flex-col gap-5 items-center'>
          {file ? 
         
          <img src={URL.createObjectURL(file)} class="signupImg" className='  h-40 w-40 flex items-center justify-center rounded-full'  alt="gf" /> 
  
          :
        <div className=' bg-white h-40 w-40 flex items-center justify-center border-dotted border-gray-400 border-4 rounded-full'> <CameraLogo/></div>
         }
      
        
        <input
         required
        ref={inputRef}
          type="file"
          id="file"
          accept=".png, .jpg, .jpeg, .svg"
          onChange={handleFileChange}
          className="mt-1 p-3 hidden bg-white border w-full rounded-md "
        />
        
        </div>
          </div>
          <div className=' flex flex-col gap-3'>
          <button onClick={handleImageClick} className=" bg-white border-2 border-gray-200 text-gray-700 font-semibold  px-4 py-2 rounded focus:outline-none mb-2">
            Choose Image
          </button>
          <div className="flex justify-end w-full">
          <p className="text-xs flex gap-3 text-gray-600">  {">"} Or choose one of our defaults</p>
        </div>
          </div>
        </div>
        
      </div>
      <div className=' flex flex-col gap-4 mt-16'>
      <div className=' text-10 font-semibold mt-16 '>
        Add your location
      </div>
      <input onChange={handleInputChange} required className=' p-3 rounded-md shadow-lg outline-none w-30 ' placeholder='Enter a location' />

      <button disabled={disabled} className={` ${ disabled ? 'bg-pink-400' : 'bg-pink-600' } text-xs mt-12  text-white py-[8px] rounded-md w-[8vw] `}>Next</button>
      </div>
      </form>
    </div>
    </div>
  );
};

export default WelcomePage;