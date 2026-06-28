import React from "react";
import CourseCardList from "@/components/Course/CourseCardList/CourseCardList";
import Container from "@/components/Layout/container/Container";
import Link from "next/link";
import { getCourses } from "@/services/course";
import {Course} from "@/types/course";

type Props = {
    searchParams: Promise<{ search?: string }>;
};

export default async function Page({ searchParams }: Props) {
    const { search = "" } = await searchParams;
    const courses:Course[] = await getCourses();

    const filteredCourses = search.trim()
        ? courses.filter((course: Course) =>
            course.title.toLowerCase().includes(search.toLowerCase())
        )
        : courses;

    return (
        <div className="my-20">
            <Container>
                <h2 className="text-2xl my-6">
                    {search.trim() ? `نتایج جستجو برای: ${search}` : "دوره ها"}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center justify-center">
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map((course) => (
                            <Link key={course.id} href={`/courses/${course.slug}`}>
                                <CourseCardList {...course} />
                            </Link>
                        ))
                    ) : (
                        <p className={""}>نتیجه ایی یافت نشد</p>
                    )}
                </div>
            </Container>
        </div>
    );
}