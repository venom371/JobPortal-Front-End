"use client";

import dynamic from 'next/dynamic';
import React, { useState, useEffect, Suspense } from "react";

import SignUpComponent from "../../Components/SignUp";
import WaitingSkeleton from "../../Components/WaitingSkeleton";
const AddImages = dynamic(() => import("@/Components/SignUpAddImages"), {
    loading: () => <WaitingSkeleton />
});

const UserDescption = dynamic(() => import("@/Components/SignUpDescription"), {
    loading: () => <WaitingSkeleton />
});

export default function SignUp() {
    const [signUpStep, setSignUpStep] = useState(1);

    const [formData, setFormData] = useState({
        firstName: "wef",
        lastName: "wefewf",
        gender: "male",
        email: "wf@k.com",
        phoneNumber: "wevwev",
        password: "wev",
    });

    const [socialMediaLinks, setSocialMediaLinks] = useState(['']);

    const [aboutUser, setAboutUser] = useState('');

    const [images, setImages] = useState([]);

    const handleNextClick = () => {
        setSignUpStep(signUpStep + 1);
    };

    const handlePrevClick = () => {
        setSignUpStep(signUpStep - 1);
    };

    const createNewUser = () => {
        console.log("formData: " + formData);
        console.log(formData);
        console.log(images);
        console.log("user social media links: " + socialMediaLinks);
        console.log("about user: " + aboutUser);
    }

    const addImageProps = {
        images,
        setImages,
        handlePrevClick,
        handleNextClick,
    };

    const userDescriptionProps = {
        socialMediaLinks,
        setSocialMediaLinks,
        aboutUser,
        setAboutUser,
        handlePrevClick,
        createNewUser
    };

    return (
        <div className='home'>
            {signUpStep == 1 && <SignUpComponent formData={formData} setFormData={setFormData} handleNextClick={handleNextClick} />}
            {signUpStep == 2 && <AddImages {...addImageProps}/>}
            {signUpStep == 3 && <UserDescption {...userDescriptionProps}/>}
        </div>
    )
}