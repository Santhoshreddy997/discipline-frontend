import React, { useState } from "react";
import API from "../api/api";

function Register({ setUser }) {

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

<div style={{textAlign:"center"}}>

<h2>Register</h2>

<input
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<br/><br/>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<br/><br/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<hr/>

<h3>Your Daily Tasks</h3>

<input
placeholder="Task Name"
value={taskName}
onChange={(e)=>setTaskName(e.target.value)}
/>

<button onClick={addTask}>
Add
</button>

<div>

{tasks.map((t,index)=>(
<div key={index}>{t}</div>
))}

</div>

<br/>

<button onClick={registerUser}>
Register
</button>

</div>

);

}

export default Register;