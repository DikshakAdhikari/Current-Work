
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from './Components/SignupForm';
import Home from './Components/Home';
import Signin from './Components/Signin';
import OTPForm from './Components/OTPForm';


const App = () => {
  return (
    <div >
      <Router>
        
        <Routes>
          <Route path="/" element={<SignupForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/otp" element={<OTPForm />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
