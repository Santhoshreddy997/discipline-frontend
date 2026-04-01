import React, { useState } from "react";
import API from "../api/api";
import "./Auth.css";

function Register({ setUser, onToggle }) {

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const [taskName,setTaskName] = useState("");
const [tasks,setTasks] = useState([]);

const addTask = () => {

if(taskName.trim() === "") return;

setTasks([...tasks,taskName]);
setTaskName("");

};

const registerUser = async () => {

try{

const res = await API.post("/auth/register",{
name,
email,
password
});

const user = res.data;

// create tasks first
for(const task of tasks){

await API.post("/tasks",{
taskName:task,
completed:false,
date:new Date().toISOString().split("T")[0],
userId:user.id
});

}

// login user after tasks are created
localStorage.setItem("user",JSON.stringify(user));
setUser(user);

}catch(err){
alert("Registration failed");
}

};

return(

<div className="auth-page">
  <div className="auth-container">

    <h2 className="auth-title">Register</h2>

    <input
      className="auth-field"
      placeholder="Name"
      value={name}
      onChange={(e)=>setName(e.target.value)}
    />

    <br/><br/>

    <input
      className="auth-field"
      placeholder="Email"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
    />

    <br/><br/>

    <input
      className="auth-field"
       type="password"
       placeholder="Password"
       value={password}
       onChange={(e)=>setPassword(e.target.value)}
    />

    <hr/>

    <h3 className="auth-subtitle">Your Daily Tasks</h3>

    <input
      className="auth-field"
      placeholder="Task Name"
      value={taskName}
      onChange={(e)=>setTaskName(e.target.value)}
    />

    <button className="auth-button" onClick={addTask}>
      Add
    </button>

    <div className="auth-task-list">
      {tasks.map((t,index)=>(
        <div className="auth-task-item" key={index}>{t}</div>
      ))}
    </div>

    <br/>

    <button className="auth-button" onClick={registerUser}>
      Register
    </button>

    <button className="auth-toggle" onClick={onToggle}>
      Go to Login
    </button>

  </div>
</div>

);

}

export default Register;