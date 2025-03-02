import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons"; // ✅ Correct import
import "./auth.css";

const Login = ({ username, password, setUsername, setPassword }) => {
    return (
        <div className="login-form">
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
        </div>
    );
};

export default Login;
