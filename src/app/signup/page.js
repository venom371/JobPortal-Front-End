"use client";

import dynamic from "next/dynamic";
import React, { useState, useCallback, useEffect, Suspense } from "react";

import SignUpComponent from "./SignUp";
import WaitingSkeleton from "../../components/WaitingSkeleton";
import { createNewUser } from "@/services/SignUpServices";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';

const AddImages = dynamic(() => import("@/app/temp/SignUpAddImages"), {
    loading: () => <WaitingSkeleton />
});

const UserDescption = dynamic(() => import("@/app/temp/SignUpDescription"), {
    loading: () => <WaitingSkeleton />
});

export default function SignUp() {
    const [signUpStep, setSignUpStep] = useState(1);
    const [formData, setFormData] = useState({
        dob: 993061800000,
        email: "mnagalkar371@gmail.com",
        firstName: "Mihir",
        gender: "male",
        lastName: "Nagalkar",
        password: "eQ@12345",
        phoneNumber: "9307722090"
    });
    const [socialMediaLinks, setSocialMediaLinks] = useState([""]);
    const [aboutUser, setAboutUser] = useState("");
    const [images, setImages] = useState([]);
    const router = useRouter();

    const createUser = async () => {
        try{
            await createNewUser(formData, images);
            router.replace("/");
        }
        catch(error){
            toast.error(error.message || "User creation failed");
        }
    }

    const handleNextClick = useCallback(() => {
        setSignUpStep((prevStep) => prevStep + 1);
    }, []);

    const handlePrevClick = useCallback(() => {
        setSignUpStep((prevStep) => prevStep - 1);
    }, []);

    const formProps = {
        formData,
        setFormData,
        handleNextClick
    };

    const addImageProps = {
        images,
        setImages,
        handlePrevClick,
        handleNextClick
    };

    const userDescriptionProps = {
        socialMediaLinks,
        setSocialMediaLinks,
        aboutUser,
        setAboutUser,
        handlePrevClick,
        createUser
    };

    const signUpSteps = [
        <SignUpComponent key="sign-up-step" {...formProps} />, 
        <AddImages key="add-images-step" {...addImageProps} />, 
        <UserDescption key="user-desc-step" {...userDescriptionProps} />
    ];

    return <div className="home">{signUpSteps[signUpStep - 1]}</div>;
}
