import {api} from "./api";
import {Course} from "@/types/course";





export const  getCourses = () => {
    return api<Course[]>("/course/", {
        method: "GET",
    });
}

export const getCourseBySlug = (slug : string)=> {
    return api<Course>(`/course/${slug}/` ,{
        method: "GET",
        })
}
export const createCourseComment = (body: string, id: number) => {
    return api("/course/comment/", {
        method: "POST",
        body: JSON.stringify({
            body,
            course: id,
            status: "p",
            parent: null,
        }),
    });
};