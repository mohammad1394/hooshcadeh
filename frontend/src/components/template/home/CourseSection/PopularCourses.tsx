"use client";
import React, { useRef } from "react";
import { Course } from "@/services/course";
import CourseCard from "@/components/Course/CourseCard/CourseCard";
import Container from "@/components/Layout/container/Container";
import Scrollbar, { ScrollbarRef } from "@/components/Layout/Scrollbar/Scrollbar";
import { ChevronRight, ChevronLeft } from "lucide-react";

type Props = {
    courses: Course[];
};

function PopularCourses({ courses }: Props) {
    const scrollbarRef = useRef<ScrollbarRef>(null);

    const popularCourses: Course[] = [...courses]
        .sort((a, b) => b.students - a.students)
        .slice(0, 8);

    return (
        <Container>
            <div className="flex items-center gap-4 w-full mb-10" dir="rtl">
                <h2 className="shrink-0 text-[15px] md:text-[18px] font-bold text-[#1F2937]">
                    محبوب ترین <span className="text-[#34D399]">دوره ها</span>
                </h2>

                <div className="flex-1 h-px bg-gray-300" />

                <div className="flex items-center gap-2 shrink-0">
                    <button
                        type="button"
                        onClick={() => scrollbarRef.current?.scrollPrev()}
                        aria-label="قبلی"
                        className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-[#1F2937] transition-colors"
                    >
                        <ChevronRight size={20} />
                    </button>
                    <button
                        type="button"
                        onClick={() => scrollbarRef.current?.scrollNext()}
                        aria-label="بعدی"
                        className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-[#1F2937] transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>
                </div>
            </div>

            <Scrollbar ref={scrollbarRef}>
                {popularCourses.map((course: Course) => (
                    <CourseCard {...course} key={course.id} />
                ))}
            </Scrollbar>

            <div className={"flex flex-col md:flex-row gap-5 my-40"}>
                <img src={"/assets/instagram-banner.png"} alt="" className={"w-full md:w-[50%] rounded-xl"}/>
                <img src={"/assets/telegram-banner.png"} alt="" className={"w-full md:w-[50%]"} />
            </div>



        </Container>
    );
}

export default PopularCourses;