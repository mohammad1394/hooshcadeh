import { jwtDecode } from "jwt-decode";

type DecodedToken = {
    user_id: number;
    exp: number;
    iat: number;
    token_type: string;
};

export const getUserIdFromToken = (token?: string | null): number | null => {
    const accessToken = token || localStorage.getItem("access");
    if (!accessToken) return null;

    try {
        const decoded = jwtDecode<DecodedToken>(accessToken);
        return decoded.user_id;
    } catch {
        return null;
    }
};