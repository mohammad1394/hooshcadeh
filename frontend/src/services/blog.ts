import {api} from "@/services/api";

export interface Blog {
    id: number
    title: string
    slug: string
    image: string
    teacher_full_name: string
    description: string
    category: number
    created: string
    updated: string
    comments: []
    created_jalali: string
    updated_jalali: string
}




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
export const createBlogComment = (body: string, blogId: number) => {
    return api('/blog/comment/create/', {
        method: 'POST',
        body: JSON.stringify({
            body,
            blog: blogId,
            status: 'p',
            parent: null,
        }),

    }).catch((err) => {
        console.log(err)
    })
}