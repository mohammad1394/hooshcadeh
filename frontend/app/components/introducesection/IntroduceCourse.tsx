"use client";

import React from "react";
import Container from "@/app/components/Container";
import productData from "../../data/db.json";
import CourseTempalete from "@/app/components/tempalete/CourseTempalete";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Course {
    id: number;
    title: string;
    description: string;
    image: string;
    price: string;
    scode: number;
}

const courses: Course[] = productData.courses;

function IntroduceCourse() {
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
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <Container>

                <Slider {...settings}>
                    {courses.map((course) => (
                        <div key={course.id} className="px-2">
                            <CourseTempalete {...course} />
                        </div>
                    ))}
                </Slider>
        </Container>
    );
}

export default IntroduceCourse;
