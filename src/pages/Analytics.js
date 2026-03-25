import React, { useEffect, useState } from "react";
import API from "../api/api";
import WeeklyChart from "../components/WeeklyChart";
import "./Analytics.css";

function Analytics({ user }) {

  const [data, setData] = useState([]);

  useEffect(() => {
    if (!user || !user.id) return;

    API.get(`/tasks/weekly/${user.id}`)
      .then(res => setData(res.data));
  }, [user]);

  return (
    <div className="analytics-container">
      <div className="overlay"></div>

      <h2 className="page-title">Your Weekly Progress</h2>

      <div className="analytics-card">
        <WeeklyChart data={data} />
      </div>
    </div>
  );
}

export default Analytics;