"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { storage } from "@/lib/storage";
import type { User, AuthTokens } from "@/types/auth";

interface AuthContextType {
    isLoggedIn: boolean;
    user: User | null;
    isInitialized: boolean;
    accessToken: string | null;
    login: (tokens: AuthTokens, user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        const userData = storage.getUser();
        const token = storage.getAccessToken();

        if (token && userData) {
            setAccessToken(token);
            setIsLoggedIn(true);
            setUser(userData);
        }
        setIsInitialized(true);
    }, []);

    const login = (tokens: AuthTokens, user: User) => {
        storage.setTokens(tokens);
        storage.setUser(user);
        setAccessToken(tokens.access);
        setUser(user);
        setIsLoggedIn(true);
    };

    const logout = () => {
        storage.clear();
        setIsLoggedIn(false);
        setUser(null);
        setAccessToken(null);
    };

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, user, accessToken, login, logout, isInitialized }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
};