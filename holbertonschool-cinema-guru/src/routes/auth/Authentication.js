import React, { useState } from "react";
import "./auth.css";
import Login from "./Login";
import Register from "./Register";

const Authentication = ({ setIsLoggedIn, setUserUsername }) => {
    const [_switch, setSwitch] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
            <div className="auth-form">
                {/* Add dynamic title */}
                <h2 className="auth-title">{_switch ? "Sign in with your account" : "Create a new account"}</h2>

                {_switch ? (
                    <Login 
                        username={username} 
                        password={password} 
                        setUsername={setUsername} 
                        setPassword={setPassword} 
                        setIsLoggedIn={setIsLoggedIn} 
                        setUserUsername={setUserUsername} 
                    />
                ) : (
                    <Register 
                        username={username} 
                        password={password} 
                        setUsername={setUsername} 
                        setPassword={setPassword} 
                    />
                )}
            </div>
        </div>
    );
};

export default Authentication;
