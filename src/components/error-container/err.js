import React, { useEffect, useState } from 'react'
import './err.css'

export default function Err() {
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        setErrors(JSON.parse(localStorage.getItem("errors")) ? JSON.parse(localStorage.getItem("errors")) : []);
    });

    const closeError = (key) => {
        const updatedErrors = errors.splice(key, 1);
        setErrors(updatedErrors);
        localStorage.setItem("errors", JSON.stringify(errors));
    }

    return (
        <div>
            {errors.length !== 0 && (
                <div className='errors-container'>
                    {errors.map((err, index) => (
                        <div className='error'>
                            <span onClick={(index) => closeError(index)} className='errorClose'>X</span>
                            <p className='errorMessage'>{err.message ? err.message : "An unexpected error occured"}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
