import {api} from "./api";
import {Course} from "@/types/course";





export const  getCourses = () => {
    return api<Course[]>("/course/", {
        method: "GET",
    });
}

export const getCourseSlug = (slug : string)=> {
    return api<Course>(`/course/${slug}/` ,{
        method: "GET",
        })
}