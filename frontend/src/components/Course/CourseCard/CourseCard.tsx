"use client";
import React from 'react';
import {Course} from "@/services/course";

function CourseTempalete({ title , description , image , orginal_price , students} : Course) {
    return (
        <div className={"text-right"}>
            <div className="bg-white p-3">
                <div className='flex flex-col gap-4'>
                    <img src={image || "/assets/1020269.jpg"} alt={title} className={"rounded-xl"}/>

                    <p className='p-slideri'>{title}</p>
                    <p className='line-clamp-2 text-gray-500 text-[16px]'>{description}</p>

                </div>
                <div className={"flex flex-row-reverse justify-between mt-8 mb-4"}>
                    <p className={"text-[#00c896] text-[12px] md:text-[16px]"}>{orginal_price}</p>
                    <button className={"bg-[#1E88E5] text-white p-1 md:p-2 text-[12px] md:text-[16px] rounded-[10px]"}>مشاهده دوره</button>
                </div>

            </div>
        </div>
    );
}

export default CourseTempalete;