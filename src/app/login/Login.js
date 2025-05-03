"use client";

import React, { useState } from "react";
import Link from "next/link";
import "@/css/SignIn.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/services/SignUpServices";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const [formData, setFormData] = useState({
        emailOrPhoneNumber: "",
        password: ""
    });

    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await loginUser(formData);
            router.replace("/admin");
        }
        catch(error){
            toast.error(error.message || "User login failed");
        }
    }

    return (
        <div className="signInBox w-[270px]">
            <form className="signInForm w-full grid items-center gap-2" onSubmit={(e) => handleSubmit(e)}>
                <div className="formItem w-full flex flex-col space-y-1.5">
                    <Label htmlFor="email-id">Email ID</Label>
                    <Input
                        className="signIn-input-element"
                        id="email-id"
                        type="text"
                        name="emailOrPhoneNumber"
                        value={formData.emailOrPhoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="formItem w-full flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        className="signIn-input-element"
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="btnDiv flex flex-col items-center space-y-1.5">
                    <Button className="submitButton w-[103px]" type="submit">
                        Sign in
                    </Button>
                    <Link className="newUserLink" href="/signup">
                        New User? Create Account
                    </Link>
                </div>
            </form>
        </div>
    );
}
