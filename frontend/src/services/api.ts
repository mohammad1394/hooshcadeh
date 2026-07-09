// src/services/api.ts
import { storage } from "@/lib/storage";

const noAuthUrls = [
    '/auth/login/',
    '/auth/register/',
    '/auth/sign-up/',
    '/auth/resent/',
];

const getBaseUrl = () =>
    typeof window === "undefined"
        ? process.env.API_URL_INTERNAL || "http://backend:8000"
        : process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const buildHeaders = (url: string, options?: RequestInit): HeadersInit => {
    const isServer = typeof window === "undefined";
    const token = isServer ? null : storage.getAccessToken();
    const shouldSendToken = !noAuthUrls.some(u => url.includes(u));

    return {
        "Content-Type": "application/json",
        ...(token && shouldSendToken && { Authorization: `Bearer ${token}` }),
        ...options?.headers,
    };
};

const refreshAccessToken = async (): Promise<string | null> => {
    if (typeof window === "undefined") return null;

    const refresh = storage.getRefreshToken();
    if (!refresh) return null;

    try {
        const res = await fetch(`${getBaseUrl()}/api/auth/token/refresh/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh }),
        });

        if (!res.ok) {
            storage.clear();
            return null;
        }

        const data = await res.json();
        storage.setTokens({ access: data.access, refresh: data.refresh ?? refresh });
        return data.access;
    } catch {
        storage.clear();
        return null;
    }
};

export async function api<T>(url: string, options?: RequestInit): Promise<T> {
    const baseUrl = getBaseUrl();
    const fullUrl = `${baseUrl}/api${url}`;

    console.log(`[api] ${options?.method || "GET"} ${fullUrl}`);

    let res: Response;
    try {
        res = await fetch(fullUrl, {
            cache: "no-store",
            ...options,
            headers: buildHeaders(url, options),
            credentials: "include",
        });
    } catch (err) {
        if (err instanceof Error && err.message.includes("Dynamic server usage")) {
            throw err;
        }
        throw new Error(`خطا در اتصال به سرور: ${fullUrl} - ${err}`);
    }

    const contentType = res.headers.get("content-type");
    const isJson = contentType?.includes("application/json");

    if (res.status === 401) {
        const newToken = await refreshAccessToken();

        if (!newToken) {
            throw new Error("نشست شما منقضی شده. لطفاً دوباره وارد شوید.");
        }

        let retryRes: Response;
        try {
            retryRes = await fetch(fullUrl, {
                cache: "no-store",
                ...options,
                headers: {
                    ...buildHeaders(url, options),
                    Authorization: `Bearer ${newToken}`,
                },
                credentials: "include",
            });
        } catch (err) {
            if (err instanceof Error && err.message.includes("Dynamic server usage")) {
                throw err;
            }
            throw new Error(`خطا در اتصال به سرور هنگام تلاش مجدد: ${err}`);
        }

        const retryContentType = retryRes.headers.get("content-type");
        if (!retryContentType?.includes("application/json")) {
            throw new Error(`پاسخ نامعتبر از سرور: ${retryRes.status}`);
        }

        const retryData = await retryRes.json();
        if (!retryRes.ok) {
            throw new Error(retryData.message || retryData.detail || "خطایی رخ داد");
        }
        return retryData;
    }

    if (!isJson) {
        throw new Error(`پاسخ نامعتبر از سرور [${res.status}]: ${fullUrl}`);
    }

    const data = await res.json();
    if (!res.ok) {
        console.log("API Error response:", data); // add this
        throw new Error(data.message || data.detail || JSON.stringify(data) || "خطایی رخ داد");
    }

    return data;
}
