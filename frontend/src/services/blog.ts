import {api} from "@/services/api";
import {Blog} from "@/types/blog";





export const getBlogs = () => {
    return api<Blog[]>("/blog" ,{
        method: "GET",
        });
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