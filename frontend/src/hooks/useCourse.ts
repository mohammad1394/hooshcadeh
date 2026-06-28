import { useQuery } from "@tanstack/react-query";
import {getCourseBySlug, getCourses} from "@/services/course";

export const useCourses = () => {
    return useQuery({
        queryKey: ["courses"],
        queryFn: getCourses,
    });
};

export const useCourse = (slug: string) => {
    return useQuery({
        queryKey: ["course", slug],
        queryFn: () => getCourseBySlug(slug),
    });
};