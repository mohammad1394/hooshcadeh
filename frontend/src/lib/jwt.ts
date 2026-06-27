import { jwtDecode } from "jwt-decode";
import { STORAGE_KEYS } from "@/constants/storage";

type DecodedToken = {
    user_id: number;
    exp: number;
    iat: number;
    token_type: string;
};

export const getUserIdFromToken = (token?: string | null): number | null => {
    const accessToken = token || localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (!accessToken) return null;

    try {
        const decoded = jwtDecode<DecodedToken>(accessToken);
        return decoded.user_id;
    } catch {
        return null;
    }
};