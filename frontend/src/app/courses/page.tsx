"use client";

import React, {useEffect, useMemo, useState} from "react";
import CourseCardList from "@/components/Course/CourseCardList/CourseCardList";
import Container from "@/components/Layout/container/Container";
import Link from "next/link";
import { getCourses, Course } from "@/services/course";
import {useParams, useSearchParams} from "next/navigation";

function Page() {
    const [courses, setCourses] = useState<Course[]>([]);

    const searchParams = useSearchParams();
    const search = searchParams.get("search")  || "";


    const filteredCourses = courses.filter((course: Course) => {
       return course.title.includes(search);
    })


    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getCourses();
                setCourses(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCourses();
    }, []);

    return (

            search.trim() ? (
                <div className="my-20">
                    <Container>
                        <h2 className="text-xl mb-6">
                            نتایج جستجو برای: {search}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {filteredCourses.length > 0 ? (
                                filteredCourses.map((course) => (
                                    <Link key={course.id} href={`/courses/${course.slug}`}>
                                        <CourseCardList {...course} />
                                    </Link>
                                ))
                            ) : (
                                <p>دوره‌ای پیدا نشد ❌</p>
                            )}
                        </div>
                    </Container>
                </div>
            ) : (
                <div className="my-20">
                    <Container>
                        <h3 className="text-2xl my-20">دوره ها</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {courses.map((course) => (
                                <Link key={course.id} href={`/courses/${course.slug}`}>
                                    <CourseCardList {...course} />
                                </Link>
                            ))}
                        </div>
                    </Container>
                </div>
            )


    );
}
export default Page;