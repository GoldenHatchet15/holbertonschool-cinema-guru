import React, { useState } from "react";
import axios from "axios"; // Import Axios
import "./auth.css";
import Login from "./Login";
import Register from "./Register";

const Authentication = ({ setIsLoggedIn, setUserUsername }) => {
    const [_switch, setSwitch] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Handle form submission for login or register
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form behavior
    
        const endpoint = _switch ? "/api/auth/login" : "/api/auth/register"; // API route
        const userData = { username, password }; // Request body
    
        try {
            console.log("🔄 Sending request to:", endpoint, userData);
    
            const response = await axios.post(`http://localhost:8000${endpoint}`, userData);
            const { accessToken } = response.data;
    
            if (!accessToken) {
                console.error("❌ No token received!");
                alert("Authentication failed! No token provided.");
                return;
            }
    
            console.log("✅ Token received:", accessToken);
    
            // Store token in localStorage
            localStorage.setItem("accessToken", accessToken);
    
            // Update global state
            setUserUsername(username);
            setIsLoggedIn(true);
            console.log("🎉 Login successful! Redirecting to Dashboard...");
        } catch (error) {
            console.error("❌ Authentication failed!", error);
            alert("Login failed! Check your credentials.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-header">
                <button 
                    className={_switch ? "active" : ""} 
                    onClick={() => setSwitch(true)}
                >
                    Sign In
                </button>
                <button 
                    className={!_switch ? "active" : ""} 
                    onClick={() => setSwitch(false)}
                >
                    Sign Up
                </button>
            </div>

            {/* Form for login/register */}
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2 className="auth-title">{_switch ? "Sign in with your account" : "Create a new account"}</h2>

                {_switch ? (
                    <Login 
                        username={username} 
                        password={password} 
                        setUsername={setUsername} 
                        setPassword={setPassword} 
                    />
                ) : (
                    <Register 
                        username={username} 
                        password={password} 
                        setUsername={setUsername} 
                        setPassword={setPassword} 
                    />
                )}

                {/* Submit Button */}
                <button type="submit">{_switch ? "Sign In" : "Sign Up"}</button>
            </form>
        </div>
    );
};

export default Authentication;
