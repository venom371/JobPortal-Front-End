"use client";

import React, { useState } from "react";
import "../CSS/SignUp.css";
import Link from 'next/link';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function SignUpComponent({ formData, setFormData, handleNextClick }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const updateGender = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            ["gender"]: e,
        }));
    };

    const handleSubmit = (e) => {
        console.log(formData);
        handleNextClick();
        e.preventDefault();
    };

    return (
        <Card className="w-[90%] md:w-[450px]">
            <CardHeader>
                <CardTitle>Step 1:</CardTitle>
                <CardDescription>Please provide your basic details.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="signUp-first-name">First Name</Label>
                            <Input id="signUp-first-name" placeholder="Your first Name"
                                className="signUp-input-element"
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="signUp-last-name">Last Name</Label>
                            <Input id="signUp-last-name" placeholder="Your last Name"
                                className="signUp-input-element"
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <RadioGroup className="flex" defaultValue="male" onValueChange={updateGender}>
                            <div className="flex items-center space-x-2">
                                <Label htmlFor="option-male">Male</Label>
                                <RadioGroupItem value="male" id="option-male"/>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Label htmlFor="option-female">Female</Label>
                                <RadioGroupItem value="female" id="option-female"/>
                            </div>
                        </RadioGroup>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="signUp-email-id">Email id</Label>
                            <Input id="signUp-email-id" placeholder="Your email id"
                                className="signUp-input-element"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="signUp-phoneNumber">Phone Number</Label>
                            <Input id="signUp-phoneNumber" placeholder="Enter your phone no"
                                className="signUp-input-element"
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="signUp-password">Password</Label>
                            <Input id="signUp-password" placeholder="Enter your password"
                                className="signUp-input-element"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" asChild>
                        <Link href="/">Cancel</Link>
                    </Button>
                    <Button type="submit">Next</Button>
                </CardFooter>
            </form>
        </Card>
    );
}
