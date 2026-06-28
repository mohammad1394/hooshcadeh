
    import React from "react";
    import { Users } from "lucide-react";
    import {Course} from "@/types/course";
    import Image from "next/image";
    import {sanitizeHtml} from "@/lib/sanitize";

   function CourseTemplate({
                                title,
                                time,
                                description,
                                image,
                                orginal_price,
                                students,
                                teacher,
                                level
                            }: Course) {

        return (
            <div className="text-right bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col mb-5">

                <div className="relative">
                    <Image
                        src={image || "/assets/1020269.jpg"}
                        alt={title}
                        className="w-full h-[150px] object-cover"
                        width={500}
                        height={150}
                    />
                    {level && (
                        <span className="absolute top-2.5 right-2.5 bg-emerald-50 text-emerald-700 text-[11px] font-medium px-3 py-1 rounded-full">
                            {level}
                        </span>
                    )}
                </div>


                <div className="p-4 flex flex-col gap-2.5 flex-1">
                    <p className="font-semibold text-[15px] leading-relaxed line-clamp-1 text-gray-900">
                        {title}
                    </p>
                    <div
                        className="line-clamp-2 text-gray-400 text-[13px] leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(description) }}
                    />

                    {students ? (
                        <div className="flex items-center gap-1.5 text-gray-400 text-[12px]">
                            <Users size={13} />
                            <span>{students.toLocaleString("fa-IR")} دانش‌آموز</span>
                        </div>
                    ) : null}


                    <div className="flex items-center gap-2 pt-1">
                        <span className="text-[12px] text-gray-500">
                                {teacher}
                        </span>
                        <span className="text-[12px] text-gray-500">
                                {time}
                        </span>
                    </div>


                    <div className="flex items-center justify-between pt-3 mt-auto border-t border-gray-100">
                        <button className="bg-emerald-600 hover:bg-orange-500 text-white px-4 py-2 text-[12px] rounded-lg font-medium transition-colors duration-200">
                            مشاهده دوره
                        </button>
                        <p className="text-emerald-600 font-semibold text-[13px]">
                            {orginal_price?.toLocaleString("fa-IR")} تومان
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    export default CourseTemplate;