import React from 'react';
import Container from "@/components/Layout/container/Container";
import Link from "next/link";
import CourseCard from "@/components/Course/CourseCard/CourseCard";
import {Course} from "@/types/course";

type Props = {
    courses: Course[];
};
function FreeCourses({ courses }: Props) {

    const freeCourses = courses.filter(course => course.final_price === "0");
    console.log(freeCourses);

    return (
        <Container>
            <div className="flex items-center gap-4 w-full mb-10" dir="rtl">
                <h2 className="shrink-0 text-[15px] md:text-[18px] font-bold text-[#1F2937]">
                    دوره‌های <span className="text-[#34D399]">رایگان</span>
                </h2>

                <div className="flex-1 h-px bg-gray-300" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {freeCourses.map((course) => (
                    <Link key={course.id} href={`/courses/${course.slug}`}>
                        <div className="px-2">
                            <CourseCard {...course} />
                        </div>
                    </Link>
                ))}
            </div>
        </Container>
    );
}
export default FreeCourses;