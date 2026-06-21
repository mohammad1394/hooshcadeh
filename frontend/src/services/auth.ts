import { api } from "./api";
import { getUserIdFromToken } from "@/lib/jwt";

export type SignUpData = {
    phone_number: string;
    first_name: string;
    last_name: string;
};

export type SignUpResponse = {
    success: boolean;
    message: string;
};


export type LoginData = {
    phone_number: string;
};

type VerifyCodeData = {
    code: string;
};

type ResendCodeResponse = {
    success: boolean;
    message: string;
}

interface VerifyResponse {
    success: boolean;
    access: string;
    refresh: string;
}

export type AuthResponse = {
    success: boolean;
    message: string;
    access: string;
    refresh: string;
};
export type Profile = {
    id: number;
    phone_number: string;
    first_name: string;
    last_name: string;
    avatar: string;
    full_name: string;
    purchased: number[];
};
// export interface Root {
//     user: User
//     description: string
//     expertise: string
//     resume: string
//     website: string
//     github: string
//     instagram: string
//     linkedin: string
// }
//
// export interface User {
//     id: number
//     phone_number: string
//     first_name: string
//     last_name: string
//     avatar: string
//     full_name: string
//     purchased: number[]
// }


export const signUp = (data: SignUpData): Promise<SignUpResponse> => {
    return api<SignUpResponse>("/auth/sign-up/", {
        method: "POST",
        body: JSON.stringify(data),
    });
};

export const verifySignUp = (data: VerifyCodeData): Promise<AuthResponse> => {
    return api<AuthResponse>("/auth/sign-up/verify-code/", {
        method: "POST",
        body: JSON.stringify(data),
    });
};

export const resentCodeSignUp = () : Promise<ResendCodeResponse> => {
    return api<ResendCodeResponse>("/auth/resent/verify-code/", {
        method: "POST",
    })
}

export const loginApi = (data: LoginData): Promise<SignUpResponse> => {
    return api<SignUpResponse>("/auth/login/", {
        method: "POST",
        body: JSON.stringify(data),
    });
};

export const verifyLogin = (data: VerifyCodeData): Promise<AuthResponse> => {
    return api<AuthResponse>("/auth/login/verify-code/", {
        method: "POST",
        body: JSON.stringify(data),
    });
};

export const resentCodeLogin = (): Promise<ResendCodeResponse> => {
    return api<ResendCodeResponse>("/auth/resent/verify-code/", {
        method: "POST",
    });
};


export const getProfile = (): Promise<Profile> => {
    const userId = getUserIdFromToken();
    if (!userId) {
        return Promise.reject(new Error("توکن معتبر یافت نشد"));
    }

    return api<Profile>(`/auth/profile/${userId}/`, {
        method: "GET",
    });
};

// export const getTeacherInfo = (id :number): Promise<Root> => {
//     return api<Root>(`/auth/teacher/${id}` , {
//         method: "GET",
//     })
// }
