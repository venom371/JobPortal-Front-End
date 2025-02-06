"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CirclePlus, MinusCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function SignUpDescription({
    socialMediaLinks,
    setSocialMediaLinks,
    aboutUser,
    setAboutUser,
    handlePrevClick,
    createNewUser
}) {
    const handleAddInput = () => {
        // Check if the last input is non-empty before adding a new one
        if (socialMediaLinks[socialMediaLinks.length - 1] !== "") {
            setSocialMediaLinks([...socialMediaLinks, ""]); // Add a new empty input
        }
    };

    let maxWords = 50;

    const [totalWords, setTotalWords] = useState(0);

    const handleChange = (e) => {
        const { value } = e.target;
        const words = value.trim().split(" ");
        if (words.length <= maxWords) {
            setAboutUser(value);
            if (words.length == 1 && words[0] == "") {
                setTotalWords(0);
            } else {
                setTotalWords(words.length);
            }
        } else {
            toast.error(`words count exceed ${maxWords}`);
        }
    };

    const handleRemoveOrClearInput = (index) => {
        if (socialMediaLinks.length === 1) {
            // Clear the last input instead of removing it
            handleInputChange(index, "");
        } else {
            // Remove input at the specified index
            setSocialMediaLinks(socialMediaLinks.filter((_, i) => i !== index));
        }
    };

    const handleInputChange = (index, value) => {
        const updatedSocialMediaLinks = [...socialMediaLinks];
        updatedSocialMediaLinks[index] = value;
        setSocialMediaLinks(updatedSocialMediaLinks);
    };

    return (
        <Card className="w-[90%] md:w-[450px]">
            <CardHeader>
                <CardTitle>Step 3:</CardTitle>
                <CardDescription>Tell us about yourself.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    <div>
                        <Label htmlFor="latest-link">Social Media</Label>
                        <div>
                            {socialMediaLinks.map((value, index) => (
                                <div key={index} className="flex items-center space-x-2 pt-2 relative group">
                                    <Input
                                        value={value}
                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                        placeholder={`Link ${index + 1}`}
                                        className="w-full truncate"
                                        id={index === socialMediaLinks.length - 1 ? "latest-link" : undefined}
                                    />
                                    {index === socialMediaLinks.length - 1 && (
                                        <Button
                                            className="[&_svg]:size-7 w-11"
                                            onClick={handleAddInput}
                                            variant="outline"
                                        >
                                            <CirclePlus />
                                        </Button>
                                    )}
                                    {value && (
                                        <Button
                                            onClick={() => handleRemoveOrClearInput(index)}
                                            variant="outline"
                                            className={`absolute h-[35px] w-11 ${
                                                index === socialMediaLinks.length - 1 ? "right-14" : "right-1"
                                            } opacity-0 group-hover:opacity-100 transition-opacity duration-200 [&_svg]:size-7 hover:text-red-500 text-red-500 hover:bg-background border-none`}
                                        >
                                            <MinusCircle />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <Textarea
                        placeholder={`Describe yourself in ${maxWords} words.`}
                        className="mt-3 h-[175px]"
                        value={aboutUser}
                        onChange={handleChange}
                    />
                </div>
                <p className="text-xs text-muted-foreground pl-[5px] pt-[8px]">{`${totalWords}/${maxWords} words`}</p>
                <div className="flex justify-between pt-6">
                    <Button variant="outline" onClick={() => handlePrevClick()}>
                        Prev
                    </Button>
                    <Button onClick={createNewUser}>Finish</Button>
                </div>
            </CardContent>
        </Card>
    );
}
