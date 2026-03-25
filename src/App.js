import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./pages/Home";
import Habits from "./pages/Habits";
import Analytics from "./pages/Analytics";


// 🔥 ROUTE WRAPPER (handles arrows)
function AppContent({ user }) {

  const navigate = useNavigate();
  const location = useLocation();

  const pages = ["/", "/habits", "/analytics"];
  const currentIndex = pages.indexOf(location.pathname);

  return (
    <div style={{ textAlign: "center" }}>

      <h1>Discipline Tracker</h1>

      {/* 🔥 ARROW NAVIGATION */}
      <div style={{ display: "flex", justifyContent: "space-between", margin: "20px" }}>

        <button
          style={{ fontSize: "20px", padding: "10px" }}
          disabled={currentIndex === 0}
          onClick={() => navigate(pages[currentIndex - 1])}
        >
          ⬅
        </button>

        <button
          style={{ fontSize: "20px", padding: "10px" }}
          disabled={currentIndex === pages.length - 1}
          onClick={() => navigate(pages[currentIndex + 1])}
        >
          ➡
        </button>

      </div>

      {/* 🔥 ROUTES */}
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/habits" element={<Habits user={user} />} />
        <Route path="/analytics" element={<Analytics user={user} />} />
      </Routes>

    </div>
  );
}


function App() {

  // 🔥 FIX: proper state (YOU WERE MISSING THIS)
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [showRegister, setShowRegister] = useState(false);


  // 🔥 LOGIN / REGISTER SCREEN
  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>

        {showRegister ? (
          <Register setUser={(userData) => {
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
          }} />
        ) : (
          <Login setUser={(userData) => {
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
          }} />
        )}

        <br /><br />

        <button onClick={() => setShowRegister(!showRegister)}>
          {showRegister ? "Go to Login" : "Create New Account"}
        </button>

      </div>
    );
  }


  // 🔥 MAIN APP
  return (
    <Router>
      <AppContent user={user} />
    </Router>
  );
}
export default App;