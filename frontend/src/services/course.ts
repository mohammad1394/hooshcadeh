import {api} from "./api";

export type Course = {
    id: number;
    title: string;
    slug: string;
    image: string | null;
    description: string;
    prerequisite: string;
    teacher: number;
    category: number;
    discount: number;
    students: number;
    orginal_price: string;
    final_price: string;
    comments: any[];
    time: number;
    level: "b" | "i" | "a";
    created_jalali: string;
    updated_jalali: string;
};



export const  getCourses = () => {
    return api<Course[]>("/course/", {
        method: "GET",
    });
}




export const getCourseSlug = (slug : string)=> {
    return api<Course>(`/course/${slug}/` ,{
        method: "GET",
        }
        )
}