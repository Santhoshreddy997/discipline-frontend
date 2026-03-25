import React, { useState } from "react";
import API from "../api/api";

function Login({setUser}) {

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

    <div style={{textAlign:"center",marginTop:"40px"}}>

      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <br/><br/>

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <br/><br/>

      <button onClick={loginUser}>
        Login
      </button>

    </div>

  );

}

export default Login;