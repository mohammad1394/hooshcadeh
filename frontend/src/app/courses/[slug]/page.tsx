"use client"
import React, {useEffect, useState} from 'react';
import Container from "@/components/Layout/container/Container";
import CourseDetails from "@/components/Course/CourseDetails/CourseDetails";
import {useParams} from "next/navigation";
import {Course, getCourseSlug} from "@/services/course";


function Page() {
    const {slug} = useParams();

    const [course , setCourse] = useState<Course | null>(null);

    useEffect(() => {
        if (!slug) return;

        const courseSlug = Array.isArray(slug) ? slug[0] : slug;

        const fetchCourse = async () => {
            try {
                const res = await getCourseSlug(courseSlug);
                setCourse(res);
            } catch (err) {
                console.log(err);
            }
        };

        fetchCourse();
    }, [slug]);

    if (!course) {
        return <p className="text-center mt-20">در حال بارگذاری...</p>;
    }

    return (
        <div className={"bg-[#F4F6F8]"}>
        <div className={"bg-gray-800 text-white py-15 my-10"}>
            <Container>
                <h1>{course?.title}</h1>
            </Container>
        </div>
            <Container>
                <div className={""}>
                <CourseDetails {...course} />
                </div>
            </Container>
        </div>

    );
}

export default Page;