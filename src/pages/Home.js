import React, { useEffect, useState } from "react";
import "./Home.css";
import disciplineImg from "../assets/discipline.png";
import API from "../api/api"; // 🔥 IMPORTANT

function Home({ user, setUser }) {

  const [localUser, setLocalUser] = useState(user);
  const today = new Date().toLocaleDateString();

  // 🔥 FETCH LATEST USER DATA (THIS FIXES YOUR ISSUE)
  useEffect(() => {

    if (user) {
      API.get(`/users/${user.id}`)
        .then(res => {
          setLocalUser(res.data);

          // update global + local storage
          localStorage.setItem("user", JSON.stringify(res.data));

          if (setUser) {
            setUser(res.data);
          }
        })
        .catch(err => {
          console.error("User refresh error:", err);
        });
    }

  }, [user]);



  // 🔥 LOGOUT
  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };



  return (
    <div className="home-container">

      <div className="card">

        <h1 className="title">Discipline Tracker</h1>

        <img src={disciplineImg} alt="discipline" className="hero-img" />

        <h2>Welcome {localUser?.name}</h2>

        <p><b>Date:</b> {today}</p>

        <p className="score">
          Score Today: {localUser?.disciplineScore || 0}%
        </p>

        <div className="streak-box">
          <p>🔥 Streak: {localUser?.streak || 0} days</p>
          <p>🏆 Longest: {localUser?.longestStreak || 0} days</p>
        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>

      </div>

    </div>
  );
}

export default Home;