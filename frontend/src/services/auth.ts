import { api } from "./api";
import { getUserIdFromToken } from "@/lib/jwt";
import { STORAGE_KEYS } from "@/constants/storage";
import type {
    AuthResponse,
    LoginData,
    MessageResponse,
    User,
    SignUpData,
    VerifyCodeData, Teacher,
} from "@/types/auth";

export const signUp = (data: SignUpData): Promise<MessageResponse> =>
    api<MessageResponse>("/auth/sign-up/", {
        method: "POST",
        body: JSON.stringify(data),
    });

export const verifySignUp = (data: VerifyCodeData): Promise<AuthResponse> =>
    api<AuthResponse>("/auth/sign-up/verify-code/", {
        method: "POST",
        body: JSON.stringify(data),
    });

export const login = (data: LoginData): Promise<MessageResponse> =>
    api<MessageResponse>("/auth/login/", {
        method: "POST",
        body: JSON.stringify(data),
    });

export const verifyLogin = (data: VerifyCodeData): Promise<AuthResponse> =>
    api<AuthResponse>("/auth/login/verify-code/", {
        method: "POST",
        body: JSON.stringify(data),
    });

export const resendVerifyCode = (): Promise<MessageResponse> =>
    api<MessageResponse>("/auth/resent/verify-code/", {
        method: "POST",
    });

export const getProfile = (accessToken?: string): Promise<User> => {
    const token = accessToken ?? (
        typeof window !== "undefined"
            ? localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
            : null
    );
    const userId = getUserIdFromToken(token);

    if (!token || !userId)
        return Promise.reject(new Error("توکن معتبر یافت نشد"));

    return api<User>(`/auth/profile/${userId}/`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const getTeacherInfo = (id: number) => {
    return api<Teacher>(`/auth/teacher/${id}/`, {
        method: "GET",
    });
};
