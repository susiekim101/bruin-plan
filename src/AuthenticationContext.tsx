import { createContext } from "react";

type AuthContextType = {
    login: () => void;
    logout: () => void;
};

const AuthenticationContext = createContext<AuthContextType>({
    login: () => {},
    logout: () => {},
});

export default AuthenticationContext;