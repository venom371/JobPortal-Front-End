'use client'

import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { X, CircleX } from "lucide-react";
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogHeader } from "@/components/ui/dialog";

export default function ImageGrid({ images, setImages, handlePrevClick, handleNextClick }) {
    const imageInput = useRef(null);

    const handleButtonClick = () => {
        imageInput.current.click();
    };

    const handleImageUpload = (event) => {
        const uploadedImages = Array.from(event.target.files).map((file) => URL.createObjectURL(file));
        setImages((prev) => [...prev, ...uploadedImages]);
    };

    const removeImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const proceedToNextStep = () => {
        if (images.length < 3) {
            toast.error('Please add atleast 3 photos.');
        }
        else if (images.length > 9) {
            toast.error('Maximum 9 photos can be added.');
        }
        else {
            handleNextClick();
        }
    }

    return (
        <Card className="w-[90%]">
            <CardHeader>
                <CardTitle>Step 2:</CardTitle>
                <CardDescription>Please add atleast 3 photos.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className='mb-4'>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        ref={imageInput}
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                        id="image-input"
                    />

                    <Button onClick={handleButtonClick} variant="outline">Add Images</Button>

                    <span className="ml-2">{images.length} photo{images.length !== 1 ? 's' : ''} selected</span>
                </div>
                <Carousel className="w-full" opts={{ align: "start" }} >
                    <CarouselContent>
                        {images.map((image, index) => (
                            <Dialog key={index}>
                                <DialogTrigger asChild>
                                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                        <div className="w-full h-[450px] relative overflow-hidden border p-1 rounded-lg">
                                            <img src={image} alt={`Uploaded ${index}`} className="w-full h-full rounded object-cover" />
                                            <Button
                                                variant="icon"
                                                className="absolute top-1 right-1"
                                                onClick={() => removeImage(index)}
                                            >
                                                <CircleX className="h-5 w-5 text-white" />
                                            </Button>
                                        </div>
                                    </CarouselItem>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]" suppressHydrationWarning>
                                    <DialogHeader>
                                        <DialogTitle>Photo {index+1}</DialogTitle>
                                    </DialogHeader>
                                    <div>
                                        <img src={image} alt={`Uploaded ${index}`} className='rounded' />
                                    </div>
                                </DialogContent>
                            </Dialog>
                        ))}
                    </CarouselContent>
                    {images.length > 1 && <CarouselPrevious />}
                    {images.length > 1 && <CarouselNext />}
                </Carousel>
                <div className="flex justify-between pt-6">
                    <Button variant="outline" onClick={() => handlePrevClick()}>Prev</Button>
                    <Button onClick={proceedToNextStep}>Next</Button>
                </div>
            </CardContent>
        </Card>
    );
};
