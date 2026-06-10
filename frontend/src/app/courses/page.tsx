"use client";

import React, { useEffect, useState } from "react";
import CourseCardList from "@/components/Course/CourseCardList/CourseCardList";
import Container from "@/components/Layout/container/Container";
import Link from "next/link";
import { getCourses, Course } from "@/services/course";

function Page() {
    const [courses, setCourses] = useState<Course[]>([]);

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
        <div className={"my-20"}>
            <Container>
                <h3 className={"text-2xl my-20"}>دوره ها</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {courses.map((course) => (
                        <Link key={course.id} href={`courses/${course.slug}` }>
                            <CourseCardList {...course} />
                        </Link>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Page;