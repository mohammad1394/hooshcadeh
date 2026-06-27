import { api } from "./api";
import { getUserIdFromToken } from "@/lib/jwt";
import type {
    AuthResponse,
    LoginData,
    MessageResponse,
    User,
    SignUpData,
    VerifyCodeData,
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

export const getProfile = (): Promise<User> => {
    const userId = getUserIdFromToken();
    if (!userId) return Promise.reject(new Error("توکن معتبر یافت نشد"));
    return api<User>(`/auth/profile/${userId}/`, { method: "GET" });
};