"use client";

import dynamic from 'next/dynamic';
import loadable from '@loadable/component';
import React, { useState, useEffect, Suspense } from "react";

const SignUpComponent = dynamic(() => import('../../Components/SignUp'), { ssr: false });
const AddImages = loadable(() => import('../../Components/AddImages'));

export default function SignUp() {
    const [signUpStep, setSignUpStep] = useState(1);
    
    useEffect(() => {
        AddImages.preload();
    }, []);
    
    const handleNextClick = () => {
        setSignUpStep(signUpStep + 1);
    };
    
    const handlePrevClick = () => {
        setSignUpStep(signUpStep - 1);
    };

    return (
        <div className='home'>
            {signUpStep == 1 && <SignUpComponent handleNextClick={handleNextClick} />}
            {signUpStep == 2 && <AddImages handlePrevClick = {handlePrevClick} />}
        </div>
    )
}