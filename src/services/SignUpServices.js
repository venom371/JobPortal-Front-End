import Constants from "@/constants/GlobalConstants";
import { doPostRequest } from "../lib/utils";
import { toast } from "sonner";

export async function getImageFiles(blobFilesArray) {
    let imageFiles = [];
    let i = 1;
    for (const blobUrl of blobFilesArray) {
        let response = await fetch(blobUrl);
        let blobFile = await response.blob();
        const file = new File([blobFile], `image${i++}.${blobFile.type.split("/")[1]}`, { type: blobFile.type });
        imageFiles.push(file);
    }
    return imageFiles;
}

export async function createNewUser(formData, images) {
    let url = Constants.contextUrl + "/users/createUser";
    try{
        let res = await doPostRequest(url, formData);
        let userId = await res.text();
        
        let imageArray = await getImageFiles(images);

        const formDataForImages = new FormData();
        imageArray.forEach(image => {
            formDataForImages.append('files', image)
        });
        formDataForImages.append("userId", userId);

        const uploadUrl = Constants.contextUrl + "/users/uploadImages";
        let result = await fetch(uploadUrl, {
            method: "POST",
            body: formDataForImages
        });
    
        if (result.ok) {
            toast.success("User created successfully");
        }
    }
    catch(error){
        console.error("Creation failed:", error);
        toast.error(error.message || "User creation failed");
        throw error; // Re-throw for further handling
    }
}
