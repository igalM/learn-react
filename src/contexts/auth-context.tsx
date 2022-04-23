import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { AuthContextType } from "../types/AuthContext";
import { LoginUser } from "../types/LoginUser";
import { User, UserResponse } from "../types/User";

type LocationState = {
    from: {
        pathname: string;
    };
}

const AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User>(null!);
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as LocationState;
    const { login } = useAuth();

    const from = state?.from?.pathname || "/";

    const signin = (user: LoginUser) => {
        login.mutate(user,
            {
                onSuccess: (userRes: UserResponse) => {
                    setUser(userRes.user);
                    navigate(from, { replace: true });
                }
            });
    };
    const signup = () => { };
    const logout = () => { };

    const value = { user, signin, signup, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuthContext() {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuthContext };