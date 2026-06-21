"use client";

import { createContext, useContext, useEffect, useState } from "react";

type User = {
    id: number;
    phone: string;
    first_name?: string;
}

interface AuthContextType {
    isLoggedIn: boolean;
    user: User | null;
    isInitialized: boolean;
    login: (data: { access: string; refresh: string; user: User }) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("access");
        const userData = localStorage.getItem("user");

        if (token && userData) {
            setIsLoggedIn(true);
            setUser(JSON.parse(userData));
        }
        setIsInitialized(true);
    }, []);

    const login = ({ access, refresh, user }: {
        access: string;
        refresh: string;
        user: User;
    }) => {
        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);
        localStorage.setItem("user", JSON.stringify(user));

        setUser(user);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout , isInitialized }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
};