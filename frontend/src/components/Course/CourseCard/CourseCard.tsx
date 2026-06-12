"use client";
import React from "react";
import { Course } from "@/services/course";
import { Users } from "lucide-react";

function CourseTemplate({
                            title,
                            description,
                            image,
                            orginal_price,
                            students,
                            teacher,
                            level
                        }: Course) {
    return (
        <div className="text-right">
            <div className="bg-white rounded-2xl  mb-5 h-[400px] border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden  flex flex-col">
                <img
                    src={image || "/assets/1020269.jpg"}
                    alt={title}
                    className="w-full h-[45%] rounded-2xl object-cover"
                />

                <div className="p-3 flex flex-col gap-3 ">
                    <p className="font-semibold text-[15px] md:text-[17px] line-clamp-1 text-[#1F2937]">
                        {title}
                    </p>
                    <p className="line-clamp-2 text-gray-500 text-[13px] md:text-[15px]">
                        {description}
                    </p>

                    {students ? (
                        <div className="flex items-center gap-1 text-gray-400 text-[12px]">
                            <Users size={14} />
                            <span>{students} دانش‌آموز</span>
                        </div>
                    ) : null}

                    <div className="flex flex-row items-center justify-between mt-6 pt-3">
                        <p className=" text-[12px] md:text-[15px] rounded-[10px] font-medium hover:text-[#38BDF8] transition-colors">
                            {teacher}
                        </p>
                        <p className="text-black text-[13px] md:text-[16px]">
                            {level}
                        </p>
                    </div>
                    <div className="flex flex-row-reverse items-center justify-between pt-3 border-t border-gray-100">
                        <button className="bg-[#1D9E75] text-white px-3 py-1.5 md:px-4 md:py-2 text-[12px] md:text-[15px] rounded-[10px] font-medium hover:bg-[#f97316] transition-colors">
                            مشاهده دوره
                        </button>
                        <p className="text-[#34D399] font-semibold text-[13px] md:text-[16px]">
                            {orginal_price?.toLocaleString("fa-IR")} تومان
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseTemplate;