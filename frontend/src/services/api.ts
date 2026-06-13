export async function api<T>(url: string, options?: RequestInit): Promise<T> {


    // const baseUrl = typeof window === "undefined"
    //     ? process.env.API_URL_INTERNAL || "http://backend:8000"
    //     : process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

      const baseUrl = "http://localhost:8000"

    const res = await fetch(`${baseUrl}/api${url}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
}