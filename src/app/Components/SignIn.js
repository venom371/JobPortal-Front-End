'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import './SignIn.css';

export default function SignUp() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    return (
        <div className='signInBox'>
            <form className='signInForm' onSubmit={handleSubmit}>
                <div className='formItem textInput'>
                    <label>Email ID:</label>
                    <input className='formValue'
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='formItem textInput'>
                    <label>Password:</label>
                    <input className='formValue'
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='btnDiv'>
                    <button className='submitButton' type="submit">Sign in</button>
                </div>
                <div className='formItem'>
                    <Link className='newUserLink' href="/SignUp">New User? Create Account</Link>
                </div>
            </form>
        </div>
    );
}