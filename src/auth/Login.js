import React, { useState } from "react";
import API from "../api/api";
import "./Auth.css";

function Login({ setUser, onToggle }) {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const loginUser = () => {

    API.post("/auth/login",{
      email,
      password
    })
    .then(res => {

     localStorage.setItem("user", JSON.stringify(res.data));
setUser(res.data); 

    })
    .catch(err => {

      alert("Invalid Credentials");

    });

  };

  return (

    <div className="auth-page">
      <div className="auth-container">

        <h2 className="auth-title">Login</h2>

        <input
          className="auth-field"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          className="auth-field"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button className="auth-button" onClick={loginUser}>
          Login
        </button>

        <button className="auth-toggle" onClick={onToggle}>
          Create New Account
        </button>

      </div>
    </div>

  );

}

export default Login;