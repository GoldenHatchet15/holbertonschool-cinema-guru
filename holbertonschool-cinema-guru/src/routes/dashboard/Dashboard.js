import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // ✅ Import React Router components
import "./dashboard.css";
import Header from "../../components/navigation/Header";
import SideBar from "../../components/navigation/SideBar";
import HomePage from "./HomePage"; // ✅ Import HomePage
import Favorites from "./Favorites"; // ✅ Import Favorites
import WatchLater from "./WatchLater"; // ✅ Import WatchLater

const Dashboard = ({ userUsername, setIsLoggedIn }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="dashboard">
      <Header userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} />
      <SideBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`dashboard-content ${isSidebarOpen ? "expanded" : "collapsed"}`}>
        <main className="main-content">
          <Routes> {/* ✅ Routes container */}
            <Route path="/home" element={<HomePage />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/watchlater" element={<WatchLater />} />
            <Route path="*" element={<Navigate to="/home" />} /> {/* ✅ Redirect unknown routes */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
