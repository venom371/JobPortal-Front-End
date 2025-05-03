import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export async function doPostRequest(url, payload) {
    let res = await fetch(url, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json" // Crucial change here
        },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        return res;
    } else {
        const error = await res.json();
        console.error("Error:", error.message);
        throw new Error(error.message);
    }
}
