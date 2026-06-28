import React from 'react';
import { Course } from "@/types/course";
import Image from "next/image";
import { sanitizeHtml } from "@/lib/sanitize";

function CourseContent({ image, title, description, course_target, benefits_of_the_course, suitableـfor }: Course) {
    const sections = [
        { title: "درباره دوره", content: description, isHtml: true },
        { title: "هدف دوره", content: course_target, isHtml: true },
        { title: "این دوره برای چه کسانی مناسب است؟", content: suitableـfor, isHtml: true },
        { title: "مزایای دوره", content: benefits_of_the_course, isHtml: true },
    ];

    return (
        <div className="w-full lg:w-[65%]">
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <Image
                    src={image || "/assets/1020269.jpg"}
                    alt={title}
                    className="w-full h-[300px] object-cover"
                    height={300}
                    width={800}
                />
                <div className="p-6 flex flex-col gap-8">
                    <h1 className="text-2xl font-bold text-gray-900">{title}</h1>

                    {sections.map((section) => (
                        section.content ? (
                            <div key={section.title}>
                                <h2 className="text-[16px] font-semibold text-emerald-600 mb-3 flex items-center gap-2">
                                    <span className="w-1 h-5 bg-emerald-500 rounded-full inline-block"></span>
                                    {section.title}
                                </h2>
                                <div
                                    className="text-gray-500 text-[14px] leading-8"
                                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(section.content as string) }}
                                />
                            </div>
                        ) : null
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CourseContent;