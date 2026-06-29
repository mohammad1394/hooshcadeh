import React from "react";
import { Course } from "@/types/course";
import Image from "next/image";
import { sanitizeHtml } from "@/lib/sanitize";

function CourseContent({
                           image,
                           title,
                           description,
                           course_target,
                           benefits_of_the_course,
                           suitableـfor,
                           headline,
                       }: Course) {

    const sections = [
        {
            title: "درباره دوره",
            content: description,
            isList: false,
        },
        {
            title: "سر فصل ها",
            content: headline,
            isList: true,
        },
        {
            title: "هدف دوره",
            content: course_target,
            isList: false,
        },
        {
            title: "این دوره برای چه کسانی مناسب است؟",
            content: suitableـfor,
            isList: false,
        },
        {
            title: "مزایای دوره",
            content: benefits_of_the_course,
            isList: true,
        },
    ];

    return (
        <div className="w-full lg:w-[65%]">
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">

                <Image
                    src={image || "/assets/1020269.jpg"}
                    alt={title}
                    width={800}
                    height={300}
                    className="w-full h-[300px] object-cover"
                />

                <div className="p-6 flex flex-col gap-8">

                    <h1 className="text-2xl font-bold text-gray-900">
                        {title}
                    </h1>

                    {sections.map((section) => {

                        if (!section.content) return null;

                        return (
                            <div key={section.title}>

                                <h2 className="text-[16px] font-semibold text-emerald-600 mb-4 flex items-center gap-2">
                                    <span className="w-1 h-5 bg-emerald-500 rounded-full"></span>
                                    {section.title}
                                </h2>

                                {section.isList ? (

                                    <ul className="text-gray-600 text-[15px] leading-8">

                                        {(section.content as string)
                                            .split(/\r?\n/)
                                            .map(item => item.trim())
                                            .filter(Boolean)
                                            .map((item, index) => (
                                                <li key={index}>
                                                    {item}
                                                </li>
                                            ))}

                                    </ul>

                                ) : (

                                    <div
                                        className="text-gray-500 text-[14px] leading-8"
                                        dangerouslySetInnerHTML={{
                                            __html: sanitizeHtml(section.content as string),
                                        }}
                                    />

                                )}

                            </div>
                        );
                    })}

                </div>
            </div>
        </div>
    );
}

export default CourseContent;