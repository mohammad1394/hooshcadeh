import {api, isDynamicServerUsageError} from "./api";
import {Course} from "@/types/course";





export const  getCourses = async () => {
    try {
        return await api<Course[]>("/course/", {
            method: "GET",
        });
    } catch (error) {
        if (isDynamicServerUsageError(error)) {
            throw error;
        }
        console.error("Failed to load courses", error);
        return [];
    }
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
