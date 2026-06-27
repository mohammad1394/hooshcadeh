import { STORAGE_KEYS } from "@/constants/storage";
import type { User, AuthTokens } from "@/types/auth";

export const storage = {


    getAccessToken: () => localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
    getRefreshToken: () => localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN),
    setTokens: (tokens: AuthTokens) => {
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.access);
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refresh);
    },


    getUser: (): User | null => {
        const data = localStorage.getItem(STORAGE_KEYS.USER);
        return data ? JSON.parse(data) : null;
    },
    setUser: (user: User) => {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    },


    clear: () => localStorage.clear(),
};