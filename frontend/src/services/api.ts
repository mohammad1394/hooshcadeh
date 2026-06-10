export async function api<T>(url: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`http://localhost:8000/api${url}`, {
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