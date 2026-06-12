"use client";

import Container from "@/components/Layout/container/Container";
import Link from "next/link";
import { Course } from "@/services/course";
import CourseCard from "@/components/Course/CourseCard/CourseCard";
import React from "react";

type Props = {
    courses: Course[];
};

function LatesCourses({ courses }: Props) {


    if (!courses?.length) return null;

    const sortByLatest = (courses: Course[]) => {
        return [...courses].sort(
            (a, b) =>
                new Date(b.created_jalali).getTime() -
                new Date(a.created_jalali).getTime()
        );
    };

    const latestCourses = sortByLatest(courses).slice(0, 8);

    return (
        <Container>
            <div className="flex items-center gap-4 w-full mb-10">
                <h2 className="shrink-0 text-[15px] md:text-[18px] font-bold text-[#1F2937]">
                    محبوب ترین <span className="text-[#34D399]">دوره ها</span>
                </h2>

                <div className="flex-1 h-px bg-gray-300" />

                <Link href={"/courses"} className={"hover:text-blue-950"}>دورهای بیشتر</Link>
            </div>
            <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}>
                {latestCourses.map((course) => (
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

export default LatesCourses;