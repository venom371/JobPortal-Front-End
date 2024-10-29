'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import '../CSS/SignIn.css';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
        <div className='signInBox w-[270px]'>
            <form className='signInForm w-full grid items-center gap-2' onSubmit={handleSubmit}>
                <div className='formItem w-full flex flex-col space-y-1.5'>
                    <Label htmlFor="email-id">Email ID</Label>
                    <Input className="signIn-input-element"
                        id="email-id"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='formItem w-full flex flex-col space-y-1.5'>
                    <Label htmlFor="password">Password</Label>
                    <Input className="signIn-input-element"
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='btnDiv flex flex-col items-center space-y-1.5'>
                    <Button className='submitButton w-[103px]' type="submit">Sign in</Button>
                    <Link className='newUserLink' href="/SignUp">New User? Create Account</Link>
                </div>
            </form>
        </div>
    );
}