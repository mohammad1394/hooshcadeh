import React from 'react';
import {GraduationCap,  Clock5 , User } from "lucide-react";
import Image from "next/image";
import {sanitizeHtml} from "@/lib/sanitize";
import {Course} from "@/types/course";


function CourseCardList({title , image , orginal_price , students , description  , teacher_full_name  , time} : Course) {
    return (
                <div  className="text-right  shadow transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div className="bg-white p-3">
                        <div className='flex flex-col gap-4'>
                            <Image
                                src={image || "/assets/1020269.jpg"}
                                alt={title}
                                className={"rounded-xl w-full"}
                                height={0}
                                width={0}
                            />

                            <p className='p-slideri'>{title}</p>
                            <div
                                className='line-clamp-2 text-gray-500 text-[16px]'
                                dangerouslySetInnerHTML={{ __html: sanitizeHtml(description) }}
                            />


                        </div>
                        <div className={"flex flex-row gap-4 mt-5 items-center"}>
                            <div className={"flex flex-row gap-1"}>
                                <GraduationCap size={24} />
                                <p>{teacher_full_name}</p>
                            </div>
                            <div className={"flex flex-row gap-1"}>
                                <Clock5 size={24} />
                                <p>{time}</p>
                            </div>
                        </div>
                        <div className={"flex flex-row-reverse justify-between mt-8 mb-4"}>
                            <p className={"text-[#00c896] text-[12px] md:text-[16px]"}>
                                {Number(orginal_price?.toString().replace(/,/g, "")).toLocaleString("fa-IR")} تومان
                            </p>
                            <div className={"flex flex-row gap-1 items-center"}>
                                <p className={"bg-[#1E88E5] text-white p-1 md:p-2 text-[12px] md:text-[16px] rounded-[10px]"}>
                                    <User/>
                                </p>
                                <p>
                                    {students}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

    );
}


export default CourseCardList;