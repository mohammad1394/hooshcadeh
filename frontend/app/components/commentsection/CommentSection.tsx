"use client";

import React from 'react';
import data from "../../data/commentdb.json";
import CommentTemplate from "@/app/components/template/CommentTemplate";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Container from "@/app/components/Container";

interface Comment {
    id:number;
    name: string;
    comment: string;
}
const commentsM : Comment[] = data.comments

function CommentSection() {
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
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 425,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (

        <div className={"w-[100%] md:w-[80%] mx-auto"}>
            <Slider {...settings}>
            {
               commentsM.map((comment, index) => (
                    <CommentTemplate {...comment} key={comment.id}/>
               ))
            }
            </Slider>
        </div>


    );
}

export default CommentSection;