import React, { useState, useEffect } from "react";
import API from "../api/api";
import "./Habits.css";
import banner from "../assets/habits-banner.png";

function Habits({ user }) {

  const [habits, setHabits] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [habitName, setHabitName] = useState("");

  useEffect(() => {
    if (!user || !user.id) return; // ✅ fix
    loadData();
  }, [user?.id]); // ✅ safer dependency

  const loadData = () => {

    if (!user || !user.id) return; // ✅ safety

    API.get(`/habits/user/${user.id}`)
      .then(res => setHabits(res.data));

    API.get(`/tasks/user/${user.id}`)
      .then(res => setTasks(res.data));
  };

  const addHabit = () => {

    if (!user || !user.id) return; // ✅ safety
    if (habitName.trim() === "") return;

    API.post("/habits", {
      name: habitName,
      userId: user.id
    })
      .then(() => {
        setHabitName("");
        loadData();
      });
  };

  const deleteHabit = (id) => {
    API.delete(`/habits/${id}`).then(loadData);
  };

  const completeTask = (id) => {
    API.put(`/tasks/${id}/complete`).then(loadData);
  };

  return (

    <div className="habits-container">

      <div className="main-card">

        {/* 🔥 BANNER */}
        <div className="banner">
          <img src={banner} alt="habits banner" />
        </div>

        {/* ADD HABIT */}
        <div className="section">

          <h3>Add Habit</h3>

          <div className="input-box">
            <input
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              placeholder="Enter habit"
            />
            <button className="btn" onClick={addHabit}>
              Add
            </button>
          </div>

        </div>

        {/* HABITS */}
        <div className="section">

          <h3>Your Habits</h3>

          {habits.length === 0 && <p>No habits yet</p>}

          {habits.map(h => (
            <div className="habit-item" key={h.id}>
              <span>{h.name}</span>

              <button
                className="btn delete"
                onClick={() => deleteHabit(h.id)}
              >
                Delete
              </button>
            </div>
          ))}

        </div>

        {/* TASKS */}
        <div className="section">

          <h3>Today's Tasks</h3>

          {tasks.length === 0 && <p>No tasks yet</p>}

          {tasks.map(t => (
            <div className="task-item" key={t.id}>

              <span className={t.completed ? "done" : "not-done"}>
                {t.completed ? "✔" : "❌"} {t.taskName}
              </span>

              {!t.completed && (
                <button
                  className="btn"
                  onClick={() => completeTask(t.id)}
                >
                  Complete
                </button>
              )}

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Habits;