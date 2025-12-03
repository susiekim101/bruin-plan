import type { NavigateFunction } from "react-router-dom";
import type { RefObject } from "react";

type DialogRef = RefObject<HTMLDialogElement | null>;

export function handleOpenClick(navigate: NavigateFunction, dialogRef: DialogRef) {
    if(localStorage.getItem('loggedIn') == 'true') {
        navigate('/dashboard');
        return;
    }
    if(dialogRef.current) {
        dialogRef.current.showModal();
    }
}

export function handleCloseClick(dialogRef: DialogRef) {
    if(dialogRef.current) {
        dialogRef.current.close();
    }
}