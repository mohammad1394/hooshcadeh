function getCookie(name: string): string | null {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
}

const noAuthUrls = ['/auth/login/', '/auth/register/', '/auth/verify/', '/auth/resend/'];

export async function api<T>(url: string, options?: RequestInit): Promise<T> {
    const baseUrl = typeof window === "undefined"
        ? process.env.API_URL_INTERNAL || "http://backend:8000"
        : process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    const token = typeof window !== "undefined"
        ? localStorage.getItem("access")
        : null;

    const csrfToken = getCookie("csrftoken");
    const shouldSendToken = !noAuthUrls.some(u => url.includes(u));

    const res = await fetch(`${baseUrl}/api${url}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token && shouldSendToken && { Authorization: `Bearer ${token}` }),
            ...(csrfToken && { "X-CSRFToken": csrfToken }),
            ...options?.headers,
        },
        credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || data.detail || "Something went wrong");
    }

    return data;
}