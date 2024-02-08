import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import Login from './components/Login';
import Search from './components/Search/Search';
import Signup from './components/SignUp';
import Results from './components/Results/Results';
import Profile from './components/Profile/Profile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Login" element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Results' element={<Results />} />
        <Route path='/Profile' element={<Profile />} />
        {/* Define other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
