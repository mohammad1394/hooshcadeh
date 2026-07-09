import {api, isDynamicServerUsageError} from "@/services/api";
import {Blog} from "@/types/blog";





export const getBlogs = async () => {
    try {
        return await api<Blog[]>("/blog" ,{
            method: "GET",
        });
    } catch (error) {
        if (isDynamicServerUsageError(error)) {
            throw error;
        }
        console.error("Failed to load blogs", error);
        return [];
    }
}
export const getBlogSlug = (slug : string) => {
        return api<Blog>(`/blog/${slug}/`, {
            method: "GET",
        })
}
export const createBlogComment = (body: string, Id: number) => {
    return api('/blog/comment/create/', {
        method: 'POST',
        body: JSON.stringify({
            body,
            blog: Id,
            status: 'p',
            parent: null,
        }),
    })
}
