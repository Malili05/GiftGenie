import React from 'react';
import '../App.css'; 
import './loginbutton.css'

const LoginButton = ({ onLogin }) => {
    return (
        <button className="loginButton" onClick={onLogin}>Login</button>
    );
};

export default LoginButton;
