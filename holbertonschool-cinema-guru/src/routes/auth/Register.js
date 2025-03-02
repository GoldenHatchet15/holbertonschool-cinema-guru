import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import "./auth.css";
import axios from "axios";

const Register = ({ username, password, setUsername, setPassword }) => {
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/api/auth/register", {
                username,
                password,
            });
            alert("Account created! Please log in.");
        } catch (error) {
            alert("Registration failed! Try again.");
        }
    };

    return (
        <form onSubmit={handleRegister} className="auth-form">
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
                <FontAwesomeIcon icon={faUserPlus} /> Sign Up
            </button>
        </form>
    );
};

export default Register;
