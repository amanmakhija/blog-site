import React, { useEffect, useState } from "react";
import "./nav.css";
import { useNavigate } from "react-router-dom";

export default function Nav() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);
    });

    const handleLogOut = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate('/');
    }

    return (
        <div className="header">
            <h1 onClick={() => navigate('/')}>Blog</h1>
            {user ? (
                <div style={{ display: 'flex' }}>
                    <p onClick={() => navigate('/blog/create')}>Post Blog</p>
                    <p onClick={() => navigate('/me')}>Profile</p>
                    <p onClick={() => handleLogOut()}>LogOut</p>
                </div>
            ) : (
                <p onClick={() => navigate('/auth')}>SignUp/LogIn</p>
            )}
        </div>
    );
};