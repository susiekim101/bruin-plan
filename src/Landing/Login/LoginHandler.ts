import type { NavigateFunction } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import type { FormRef, DialogRef, tryLogInSignUpProps, HandleInputChangeProps, HandleSubmitProps } from "../landingTypes";

export function useValidateForm(formRef: FormRef, setIsFormValid: (prev: boolean) => void) {
    useEffect(() => {
            const formEl = formRef.current;
            if(!formEl) return;
    
            const validatorInputs = Array.from(
                formEl.querySelectorAll('input.validator, select.validator')
            );
    
            const validate = () => {
                const allValid = validatorInputs.every(input => 
                    (input instanceof HTMLInputElement || input instanceof HTMLSelectElement) && input.checkValidity());
                setIsFormValid(allValid);
            }
    
            validatorInputs.forEach(input => {
                input.addEventListener('input', validate);
                input.addEventListener('change', validate);
                input.addEventListener('blur', validate);
            });
    
            validate();
    
            return () => {
                validatorInputs.forEach(input => {
                    input.removeEventListener('input', validate);
                    input.removeEventListener('change', validate);
                    input.removeEventListener('blur', validate);
                });
            };
        }, []);
}
export function handleOpenDialog(navigate: NavigateFunction, dialogRef: DialogRef) {
    if(localStorage.getItem('loggedIn') == 'true') {
        navigate('/dashboard');
        return;
    }
    if(dialogRef.current) {
        dialogRef.current.showModal();
    }
}

export function handleCloseDialog(dialogRef: DialogRef) {
    if(dialogRef.current) {
        dialogRef.current.close();
    }
}

async function tryLogInSignUp({navigate, login, setError, url, userData}: tryLogInSignUpProps) {
    try {
        await axios.post(url, userData, { withCredentials: true });
        navigate('/dashboard');
        login();
        return;
    } catch (err) {
        if (axios.isAxiosError(err) && err.response && err.response.data === 'Existing email') {
            setError("Account already exists");
        } else {
            setError("User does not exist or incorrect credentials.");
        }
        console.error(`Failed to sign up/log in:`, err);
    }
}

export function handleInputChange({ e, setUserData }: HandleInputChangeProps) {
    const { name, value } = e.target;
    setUserData((prevData) => ({
        ...prevData,
        [name]: value
    }));
};

export async function handleSubmit({ e, setError, isFormValid, signup, navigate, login, userData}: HandleSubmitProps): Promise<void> {
    e.preventDefault();
    setError(null);

    if(!isFormValid) {
        console.log("Form is invalid");
        return;
    }
    const url: string = signup ? `http://localhost:3001/user/signup` : 'http://localhost:3001/user/login';

    tryLogInSignUp({ navigate, login, setError, url, userData});
}