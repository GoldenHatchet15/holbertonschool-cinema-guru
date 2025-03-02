import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Authentication from "./routes/auth/Authentication";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  // ✅ State for authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUsername, setUserUsername] = useState("");

  // ✅ Effect: Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          const response = await axios.post(
            "http://localhost:8000/api/auth/",
            {},
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          setIsLoggedIn(true);
          setUserUsername(response.data.username);
        } catch (error) {
          console.error("Authentication failed:", error);
          setIsLoggedIn(false);
          setUserUsername("");
        }
      }
    };
    checkAuth();
  }, []);

  // ✅ Render Dashboard if logged in, else Authentication
  return (
    <div className="App">
      {isLoggedIn ? <Dashboard username={userUsername} /> : <Authentication />}
    </div>
  );
}

export default App;
