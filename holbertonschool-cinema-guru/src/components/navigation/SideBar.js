import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./navigation.css";
import Activity from "../Activity"; // Import Activity component

const SideBar = ({ isSidebarOpen, toggleSidebar }) => {
  const [selected, setSelected] = useState("home");
  const [activities, setActivities] = useState([]);
  const [showActivities, setShowActivities] = useState(false);
  const navigate = useNavigate();

  // ✅ Function to set page and navigate
  const setPage = (pageName) => {
    setSelected(pageName);
    navigate(`/${pageName}`);
  };

  // ✅ Fetch recent activities from API
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/activity");
        setActivities(response.data);
      } catch (error) {
        console.error("Failed to fetch activities:", error);
      }
    };
    fetchActivities();
  }, []);

  return (
    <nav className={`sidebar ${isSidebarOpen ? "expanded" : "collapsed"}`}>
      {/* Sidebar Toggle Button */}
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isSidebarOpen ? "➖" : "➕"}
      </button>

      {/* Navigation Links */}
      <ul className="nav-links">
        <li className={selected === "home" ? "active" : ""} onClick={() => setPage("home")}>
          🏠 Home
        </li>
        <li className={selected === "favorites" ? "active" : ""} onClick={() => setPage("favorites")}>
          ⭐ Favorites
        </li>
        <li className={selected === "watchlater" ? "active" : ""} onClick={() => setPage("watchlater")}>
          ⏳ Watch Later
        </li>
      </ul>

      {/* Activity Section */}
      <button className="activity-toggle" onClick={() => setShowActivities(!showActivities)}>
        {showActivities ? "🔽 Hide Activities" : "🔼 Show Activities"}
      </button>
      
      {showActivities && (
        <ul className="activity-list">
          {activities.slice(0, 10).map((activity, index) => (
            <Activity key={index} activity={activity} />
          ))}
        </ul>
      )}
    </nav>
  );
};

export default SideBar;
