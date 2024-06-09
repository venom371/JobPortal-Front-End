"use client";

import React, { useRef, useState } from "react";
import Image from "../Images/ImageInput";
import "../CSS/AddImages.css";

var handleChange;
var handleImageClick;
var imageInput;
var images, setImages;

export default function ImageStacker() {
    [images, setImages] = useState([]);

    imageInput = useRef(null);
    handleChange = (e) => {
        const target = e.target;

        const newImages = Array.from(target.files);

        if (!newImages.length) {
            alert("please upload your profile pic");
            return;
        }

        Promise.all(
            newImages.map((image) => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        resolve({ file: image, dataURL: e.target.result });
                    };
                    reader.readAsDataURL(image);
                });
            })
        ).then((imageArray) => {
            setImages((prevImages) => [...prevImages, ...imageArray]);
        });
    };

    handleImageClick = () => {
        imageInput.current.click();
    };

    return (
        <div>
            <div className="addImagesContainer">
                {images.length > 0 ? <ImageStack /> : <InputFromImage />}
            </div>
        </div>
    );
}

function InputFromImage() {
    return (
        <div className="uploadImages" onClick={handleImageClick}>
            <Image />
            <input
                type="file"
                ref={imageInput}
                onChange={handleChange}
                accept="image/*"
                style={{ display: "none" }}
            />
            <div style={{ fontSize: "0.7rem" }}>Please Upload your Profile Pic</div>
        </div>
    );
}

function ImageStack() {
    const profilePic = images[0];
    return (
        <div className="image-stack">
            <img
                src={profilePic.dataURL} 
                alt={"profile pic"}
                className={"profile-pic image"}
            />
        </div>
    );
}
