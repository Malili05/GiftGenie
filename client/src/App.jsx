import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import Login from './components/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        {/* <Route path="/Queries" element={<Queries />} /> */}
        <Route path="/Login" element={<Login />} />
        {/* Define other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
