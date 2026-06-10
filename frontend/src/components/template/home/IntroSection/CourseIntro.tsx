"use client";

import Container from "@/components/Layout/container/Container";
import CourseTempalete from "@/components/Course/CourseCard/CourseCard";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Course } from "@/services/course";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CourseCard from "@/components/Course/CourseCard/CourseCard";
const Slider = dynamic(() => import("react-slick"), { ssr: false });

type Props = {
    courses: Course[];
};

function CourseIntro({ courses }: Props) {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2, slidesToScroll: 2 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 2, slidesToScroll: 2 },
            },
            {
                breakpoint: 425,
                settings: { slidesToShow: 1, slidesToScroll: 1 },
            },
        ],
    };

    if (!courses?.length) return null;

    return (
        <Container>
            <Slider {...settings}>
                {courses.map((course) => (
                    <Link key={course.id} href={`/courses/${course.slug}`}>
                        <div className="px-2">
                            <CourseCard {...course} />
                        </div>
                    </Link>
                ))}
            </Slider>
        </Container>
    );
}

export default CourseIntro;