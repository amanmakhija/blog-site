import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const [error, setError] = useState(localStorage.getItem("errors") ? JSON.parse(localStorage.getItem("errors")) : []);
    const [user, setUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
    }, []);

    return (
        <div>
            {user && user.data.name}
        </div>
    )
}
