import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import './Auth.css';

export default function Auth() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState();
    const [error, setError] = useState(localStorage.getItem("errors") ? JSON.parse(localStorage.getItem("errors")) : []);
    const [containerClasses, setContainerClasses] = useState("container");

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
    }, []);

    const signUpListener = (e) => {
        e.preventDefault();
        setContainerClasses("container right-panel-active");
    }

    const signInListener = (e) => {
        e.preventDefault();
        setContainerClasses("container");
    }

    const url = 'http://localhost:8000/api/v1/';

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}auth/register`, {
                username, email, password
            });
            if (res.status === 201) {
                setError((prev) => [...prev, { message: "User already exists" }]);
                localStorage.setItem("errors", JSON.stringify(error));
                signInListener(e);
                return;
            }
            // set the state of the user
            setUser(res.data);
            // store the user in localStorage
            localStorage.setItem("user", JSON.stringify(res.data));
            navigate('/verify');
        } catch (err) {
            setError((prevError) => [...prevError, err]);
            localStorage.setItem("errors", JSON.stringify(error));
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}auth/login`, {
                email, password
            });
            // set the state of the user
            setUser(res.data);
            // store the user in localStorage
            localStorage.setItem("user", JSON.stringify(res.data));
            if (res.status === 200) {
                navigate('/');
            } else {
                navigate('/verify');
            }
        } catch (err) {
            setError((prevError) => [...prevError, err]);
            localStorage.setItem("errors", JSON.stringify(error));
        }
    };

    return (
        <div className={containerClasses} id="container">
            <div className="form-container sign-up-container">
                <form onSubmit={handleSignUp}>
                    <h1>Create Account</h1>
                    <div className="social-container">
                        <a href="#" className="social1"><i className="fab fa-google-plus-g"></i></a>
                    </div>
                    <span>or use your email for registration</span>
                    <input id="username" type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
                    <input id="email" type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
                    <input id="password" type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                    <button onClick={(e) => handleSignUp(e)} type="submit">Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form onSubmit={handleSignIn}>
                    <h1>Sign in</h1>
                    <div className="social-container">
                        <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                    </div>
                    <span>or use your account</span>
                    <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
                    <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                    <a href="#">Forgot your password?</a>
                    <button onClick={(e) => handleSignIn(e)} type="submit" className="pink">Sign In</button>
                </form>
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button onClick={(e) => signInListener(e)} className="ghost" id="signIn">Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button onClick={(e) => signUpListener(e)} className="ghost" id="signUp">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
