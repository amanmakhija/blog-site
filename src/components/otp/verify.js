import React, { useEffect, useState } from 'react';
import './verify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Verify() {
    const [error, setError] = useState([]);
    const [otp, setOtp] = useState("");
    const [btnName, setBtnName] = useState("Send");
    const [user, setUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        } else {
            navigate('/auth');
        }
    }, [navigate]);

    const sendOTP = async (e) => {
        try {
            e.preventDefault();
            setBtnName("Resend");
            const email = user.data.email;
            const res = await axios.post('http://localhost:8000/api/v1/auth/send-otp', { email });
            console.log(res);
        } catch (err) {
            setError((prevError) => [...prevError, err]);
            localStorage.setItem("errors", JSON.stringify(error));
        }
    };

    const handleProceed = async (e) => {
        try {
            e.preventDefault();
            const email = user.data.email;
            const res = await axios.post('http://localhost:8000/api/v1/auth/verify-otp', { email, otp });
            console.log(res);
            navigate('/');
        } catch (err) {
            setError((prevError) => [...prevError, err]);
            localStorage.setItem("errors", JSON.stringify(error));
        }
    };

    return (
        <div>
            <input type='number' value={otp} onChange={(e) => setOtp(e.target.value)} />
            <button onClick={(e) => sendOTP(e)}>{btnName}</button>
            <button onClick={(e) => handleProceed(e)}>Proceed</button>
        </div>
    );
}
