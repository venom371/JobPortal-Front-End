"use client";

import dynamic from "next/dynamic";
import React, { useState, useCallback, useEffect, Suspense } from "react";

import SignUpComponent from "../../Components/SignUp";
import WaitingSkeleton from "../../Components/WaitingSkeleton";
import { createNewUser } from "@/services/SignUpServices";

const AddImages = dynamic(() => import("@/Components/SignUpAddImages"), {
    loading: () => <WaitingSkeleton />
});

const UserDescption = dynamic(() => import("@/Components/SignUpDescription"), {
    loading: () => <WaitingSkeleton />
});

import { getImageFiles } from "../../lib/utils";



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

    const createUser = () => createNewUser(formData, images);

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

    const signUpSteps = [<SignUpComponent {...formProps} />, <AddImages {...addImageProps} />, <UserDescption {...userDescriptionProps} />];

    return <div className="home">{signUpSteps[signUpStep - 1]}</div>;
}
