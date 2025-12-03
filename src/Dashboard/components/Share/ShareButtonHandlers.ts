import axios from "axios";
import type { RefObject } from "react";

type DialogRef = RefObject<HTMLDialogElement | null>;

export async function handleClick(confirmationRef: DialogRef) {
    try{
        const response = await axios.get(`http://localhost:3001/user/currUserId`, { withCredentials: true});
        const user_id = response.data.user_id;
        await axios.post(`http://localhost:3001/plan/shareplan/${user_id}`, { withCredentials: true});
        
        if(confirmationRef.current)
            confirmationRef.current.showModal();
    } catch {
        console.error("Failed to share user plan");
    }
}

export async function handleOpenClick(dialogRef: DialogRef) {
    if(dialogRef.current) {
        dialogRef.current.showModal();
    }
}

export async function handleCloseClick(dialogRef: DialogRef) {
    if(dialogRef.current) {
        dialogRef.current.close();
    }
}

export async function handleCloseConfirmation(confirmationRef: DialogRef) {
    if(confirmationRef.current) {
        confirmationRef.current.close();
    }
}