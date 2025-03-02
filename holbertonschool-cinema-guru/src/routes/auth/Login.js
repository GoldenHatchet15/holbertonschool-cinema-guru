import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import "./auth.css";
import axios from "axios";

const Login = ({ username, password, setUsername, setPassword, setIsLoggedIn, setUserUsername }) => {
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/auth/login", {
                username,
                password,
            });
            if (response.data.token) {
                localStorage.setItem("accessToken", response.data.token);
                setIsLoggedIn(true);
                setUserUsername(username);
            }
        } catch (error) {
            alert("Login failed! Check your credentials.");
        }
    };

    return (
        <form onSubmit={handleLogin} className="auth-form">
            <div>
                <FontAwesomeIcon icon={faUser} />
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <FontAwesomeIcon icon={faLock} />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">
                <FontAwesomeIcon icon={faSignInAlt} /> Sign In
            </button>
        </form>
    );
};

export default Login;
