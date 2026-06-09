/**
 * API Client for communicating with the Django backend.
 * 
 * All API calls go through this module to ensure consistency
 * in base URL handling, error management, and auth headers.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Generic fetch wrapper with error handling and JSON parsing.
 */
async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    });

    if (!response.ok) {
        const errorBody = await response.text().catch(() => 'Unknown error');
        throw new Error(
            `API Error ${response.status}: ${response.statusText} - ${errorBody}`
        );
    }

    // Handle 204 No Content
    if (response.status === 204) {
        return {} as T;
    }

    return response.json();
}

// ==================== Types ====================

export interface Course {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string;
    price: number;
    discount: number;
    formatted_price: string;
    final_price: number;
    final_formatted_price: string;
    formatted_time: string;
    level_persian: string;
    students: number;
    time: number;
    prerequisite: string;
    teacher: {
        id: number;
        first_name: string;
        last_name: string;
        full_name: string;
        avatar: string | null;
        bio: string;
    } | null;
    category: {
        id: number;
        title: string;
        slug: string;
    } | null;
    is_published: boolean;
    created_jalali: string;
    updated_jalali: string;
}

export interface Category {
    id: number;
    title: string;
    slug: string;
    courses: Course[];
}

export interface SiteSettings {
    site_name: string;
    about_site: string;
    email_site: string;
    phone_number_site: string;
    instagram: string | null;
    telegram: string | null;
    whatsapp: string | null;
    rubika: string | null;
    bale: string | null;
    eitaa: string | null;
}

export interface AuthTokens {
    access: string;
    refresh: string;
}

export interface OtpResponse {
    message: string;
}

// ==================== Course API ====================

/** Fetch all published courses */
export async function getCourses(): Promise<Course[]> {
    return apiFetch<Course[]>('/api/course/');
}

/** Fetch a single course by slug */
export async function getCourseBySlug(slug: string): Promise<Course> {
    return apiFetch<Course>(`/api/course/${slug}/`);
}

/** Fetch all categories */
export async function getCategories(): Promise<Category[]> {
    return apiFetch<Category[]>('/api/course/category/');
}

// ==================== Auth API ====================

/** Request OTP for sign-up */
export async function signUp(phoneNumber: string): Promise<OtpResponse> {
    return apiFetch<OtpResponse>('/api/auth/sign-up/', {
        method: 'POST',
        body: JSON.stringify({ phone_number: phoneNumber }),
    });
}

/** Verify sign-up OTP */
export async function signUpVerify(
    phoneNumber: string,
    code: string
): Promise<AuthTokens> {
    return apiFetch<AuthTokens>('/api/auth/sign-up/verify-code/', {
        method: 'POST',
        body: JSON.stringify({ phone_number: phoneNumber, code }),
    });
}

/** Request OTP for login */
export async function login(phoneNumber: string): Promise<OtpResponse> {
    return apiFetch<OtpResponse>('/api/auth/login/', {
        method: 'POST',
        body: JSON.stringify({ phone_number: phoneNumber }),
    });
}

/** Verify login OTP */
export async function loginVerify(
    phoneNumber: string,
    code: string
): Promise<AuthTokens> {
    return apiFetch<AuthTokens>('/api/auth/login/verify-code/', {
        method: 'POST',
        body: JSON.stringify({ phone_number: phoneNumber, code }),
    });
}

/** Resend OTP code */
export async function resendOtp(phoneNumber: string): Promise<OtpResponse> {
    return apiFetch<OtpResponse>('/api/auth/resent/verify-code/', {
        method: 'POST',
        body: JSON.stringify({ phone_number: phoneNumber }),
    });
}

// ==================== Site Settings API ====================

/** Fetch site settings */
export async function getSiteSettings(): Promise<SiteSettings> {
    return apiFetch<SiteSettings>('/api/site-settings/');
}

// ==================== Helpers ====================

/**
 * Build full URL for media files served by the backend.
 * Handles cases where the image path is already absolute or relative.
 */
export function getMediaUrl(path: string | null): string {
    if (!path) return '/assets/placeholder.jpg';
    if (path.startsWith('http')) return path;
    return `${API_BASE_URL}${path}`;
}
