import React, { useContext, useState } from "react";
import { AuthContextType } from "../types/AuthContext";
import { User } from "../types/User";
import { storage } from "../utils/utils";

const AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User>(null!);
    const logout = () => {
        setUser(null!);
        storage.clearToken();
    };
    const value = { user, setUser, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuthContext() {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuthContext };