"use client";

import dynamic from 'next/dynamic';
import React, { useState, useCallback, useEffect, Suspense } from "react";

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
        dob: null
    });
    const [socialMediaLinks, setSocialMediaLinks] = useState(['']);
    const [aboutUser, setAboutUser] = useState('');
    const [images, setImages] = useState([]);

    const handleNextClick = useCallback(() => {
        setSignUpStep(prevStep => prevStep + 1);
    }, []);
    
    const handlePrevClick = useCallback(() => {
        setSignUpStep(prevStep => prevStep - 1);
    }, []);
    

    const createNewUser = () => {
        
    }

    const formProps = {
        formData,
        setFormData,
        handleNextClick
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

    const signUpSteps = [<SignUpComponent {...formProps} />, <AddImages {...addImageProps} />, <UserDescption {...userDescriptionProps} />];

    return (
        <div className='home'>
            {signUpSteps[signUpStep - 1]}
        </div>
    )
}