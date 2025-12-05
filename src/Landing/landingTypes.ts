import type { RefObject } from "react";
import type { NavigateFunction } from "react-router-dom";

export type FormRef = RefObject<HTMLFormElement | null>;
export type DialogRef = RefObject<HTMLDialogElement | null>;

export interface UserData {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    major: string
};

export interface tryLogInSignUpProps {
    navigate: NavigateFunction,
    login: () => void,
    setError: (prev: string) => void,
    url: string,
    userData: UserData
};

export interface HandleInputChangeProps {
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    setUserData: React.Dispatch<React.SetStateAction<UserData>>,
}

export interface HandleSubmitProps {
    e: React.FormEvent<HTMLFormElement>
    setError: (prev: string | null) => void,
    isFormValid: boolean,
    isSignedUp: boolean,
    navigate: NavigateFunction,
    login: () => void,
    userData: UserData,
}

export interface LogInProps {
    textStyle: string,
    px: number,
    py: number
}