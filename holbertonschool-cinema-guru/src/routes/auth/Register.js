import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons"; 
import "./auth.css";

const Register = ({ username, password, setUsername, setPassword }) => {
    return (
        <div className="register-form">
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

export default Register;
