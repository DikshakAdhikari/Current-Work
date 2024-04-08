import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup';
import Home from './Components/Home';
import Content from './Components/Content';
import Email from './Components/email/Email';

const App = () => {
  return (
    <div >
      <Router>
        <Routes>     
          <Route path="/" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/content" element={<Content/>} />
          <Route path="/mail" element={<Email/>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
