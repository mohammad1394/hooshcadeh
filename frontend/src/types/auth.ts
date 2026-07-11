// src/types/auth.ts

export type User = {
    id: number;
    phone_number: string;
    transaction: transaction[]
    first_name: string;
    last_name: string;
    full_name: string;
    avatar: string;
    purchased: number[];
};
export type transaction = {
    id: number
    concept: string
    amount: number
    text: string
    created_at: string
    user: number
}
export type AuthTokens = {
    access: string;
    refresh: string;
};

export type AuthResponse = AuthTokens & {
    success: boolean;
    message?: string;
};

export type MessageResponse = {
    success: boolean;
    message: string;
};

export type SignUpData = {
    phone_number: string;
    first_name: string;
    last_name: string;
};

export type LoginData = {
    phone_number: string;
};

export type VerifyCodeData = {
    code: string;
};

export type Profile = User;

export type Teacher =  {
    user: User;
    description: string;
    expertise: string;
    resume: string;
    website: string;
    github: string;
    instagram: string;
    linkedin: string;
}