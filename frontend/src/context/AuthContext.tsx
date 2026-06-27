"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { storage } from "@/lib/storage";
import type { User, AuthTokens } from "@/types/auth";

interface AuthContextType {
    isLoggedIn: boolean;
    user: User | null;
    isInitialized: boolean;
    login: (tokens: AuthTokens, user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const token = storage.getAccessToken();
        const userData = storage.getUser();

        if (token && userData) {
            setIsLoggedIn(true);
            setUser(userData);
        }
        setIsInitialized(true);
    }, []);

    const login = (tokens: AuthTokens, user: User) => {
        storage.setTokens(tokens);
        storage.setUser(user);
        setUser(user);
        setIsLoggedIn(true);
    };

    const logout = () => {
        storage.clear();
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout, isInitialized }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
};