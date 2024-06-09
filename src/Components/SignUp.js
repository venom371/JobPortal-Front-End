"use client";

import React, { useState } from "react";
import RightArrow from "./RightArrow";
import "../CSS/SignUp.css"

export default function SignUp({handleNextClick}) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        phoneNumber: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        handleNextClick();
        e.preventDefault();
    };

    return (
        <div className="signUpBox">
            <form className="signUpForm" onSubmit={handleSubmit}>
                <div className="formItem textInput">
                    <label>First Name:</label>
                    <input
                        className="formValue"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="formItem textInput">
                    <label>Last Name:</label>
                    <input
                        className="formValue"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="formItem radioInput">
                    <div className="maleRadioBtn">
                        <label>Male </label>
                        <input
                            type="radio"
                            name="gender"
                            value={"Male"}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="femaleRadioBtn">
                        <label>Female </label>
                        <input
                            type="radio"
                            name="gender"
                            value={"Female"}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="formItem textInput">
                    <label>Email ID:</label>
                    <input
                        className="formValue"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="formItem textInput">
                    <label>Phone Number:</label>
                    <input
                        className="formValue"
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="formItem textInput">
                    <label>Password:</label>
                    <input
                        className="formValue"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="btnDiv">
                    <button className="flow-buttons step-one right-arrow" type="submit">
                        <RightArrow />
                    </button>
                </div>
            </form>
        </div>
    );
}
