import { createContext } from "react";

type AuthContextType = {
    loggedIn: boolean;
    login: () => void;
    logout: () => void;
};

const AuthenticationContext = createContext<AuthContextType>({
    loggedIn: false,
    login: () => {},
    logout: () => {},
});

export default AuthenticationContext;