"use client";

import React, { useRef, useState } from "react";
import Image from "./Image";
import "./AddImages.css";

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



        // if (newImages.length < 3) {
        //     alert("please select atleast 3 photos");
        //     return;
        // }

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

        //setImages((prevImages) => [...prevImages, ...newImages]);
    };

    handleImageClick = () => {
        imageInput.current.click();
    };

    return (
        <div>
            <div className="addImagesContainer">
                {
                    images.length > 0 ? (
                        <ImageStack />
                    ) : (<InputFromImage />)
                }
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
                multiple
                onChange={handleChange}
                accept="image/*"
                style={{ display: "none" }}
            />
            <div style={{ fontSize: "0.7rem" }}>Please Upload Atleast 3 Pictures</div>
        </div>
    )
}

function ImageStack() {
    const lastThreeImages = images.slice(-3);
    return (
        <div className="image-stack">
            {lastThreeImages.map((image, index) => (
                <img
                    key={index}
                    src={image.dataURL} // Replace 'url' with the actual property name where the image URL is stored
                    alt={`Image ${index + 1}`}
                    className={`image-${index + 1} image`}
                />
            ))}
        </div>
    );
}
