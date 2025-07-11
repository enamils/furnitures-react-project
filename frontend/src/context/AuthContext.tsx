import React, { createContext } from 'react';
import { useAuth } from '../hooks/useAuth';
import type {AuthContextType} from "../types/authType.ts";

export const AuthContext = createContext<AuthContextType>({
    token: null,
    userId: null,
    isLoggedIn: false,
    login: () => {},
    logout: () => {}
});

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const auth = useAuth();

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
};