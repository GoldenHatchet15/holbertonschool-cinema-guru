import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Authentication from "./routes/auth/Authentication";
import Dashboard from "./routes/dashboard/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userUsername, setUserUsername] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem("accessToken");
      console.log("🔎 Checking auth, token:", accessToken);

      if (accessToken) {
        try {
          const response = await axios.post(
            "http://localhost:8000/api/auth/",
            {},
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );

          setIsLoggedIn(true);
          setUserUsername(response.data.username);
          console.log("✅ User authenticated:", response.data.username);
        } catch (error) {
          console.error("❌ Auth failed:", error);
          setIsLoggedIn(false);
          setUserUsername("");
          localStorage.removeItem("accessToken");
        }
      }
    };
    checkAuth();
  }, []);

  return (
    <div className="App">
      {isLoggedIn ? (
        <Dashboard userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Authentication setIsLoggedIn={setIsLoggedIn} setUserUsername={setUserUsername} />
      )}
    </div>
  );
}

export default App;
