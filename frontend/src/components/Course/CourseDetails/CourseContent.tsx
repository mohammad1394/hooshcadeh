import React from 'react';
import {Course} from "@/types/course";
import Image from "next/image";
import {sanitizeHtml} from "@/lib/sanitize";



function CourseContent({image , title , description} : Course) {
    const sections = [
        { title: "درباره دوره", content: description, isHtml: true },
        {
            title: "سرفصل‌ها", content: [
                "هوش مصنوعی چیست؟",
                "چطور از هوش مصنوعی استفاده کنیم؟",
                "چت‌بات چیست و نحوه استفاده از آن",
                "کار حرفه‌ای با ChatGPT",
                "مهارت تولید محتوای متنی",
                "مهارت پرامپت‌نویسی حرفه‌ای",
                "تولید تصویرهای تبلیغاتی",
                "تبدیل متن به ویدئو با هوش مصنوعی",
                "ایده‌های کسب درآمد با هوش مصنوعی",
                "ساخت بوم کسب‌وکار و پیچ دک",
                "مهارت مدیریت کسب‌وکار با هوش مصنوعی",
                "طراحی لوگو حرفه‌ای",
                "آموزش حرفه‌ای اپلیکیشن‌های ادیت",
            ]
        },
        { title: "هدف دوره", content: "هدف اصلی دوره مسیر پولسازی با AI، آشنا کردن افراد با کاربردهای هوش مصنوعی در زمینه کسب درآمد و بهبود کسب‌وکارها است. این دوره به شما می‌آموزد که چگونه با استفاده از ابزارها و تکنیک‌های هوش مصنوعی، ایده‌های نوآورانه برای درآمدزایی پیدا کنید." },
        { title: "این دوره برای چه کسانی مناسب است؟", content: "دوره پولسازان برای تمامی افرادی که علاقه‌مند به افزایش درآمد و بهبود کسب‌وکار خود هستند مناسب است. تنها نیاز یک گوشی هوشمند و اتصال به اینترنت است." },
        {
            title: "مزایای دوره", content: [
                "کاملاً کاربردی و به زبان ساده",
                "مدرس با دکترای هوش مصنوعی از دانشگاه صنعتی شریف",
                "بدون هیچ پیش‌نیاز علمی",
                "پشتیبانی تحت نظارت مدرس",
                "معرفی به وزارت علوم برای دریافت مدرک",
            ]
        },
    ];
    return (
        <div className="w-full lg:w-[65%]">
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <Image
                    src={image || "/assets/1020269.jpg"}
                    alt={title}
                    className="w-full h-[300px] object-cover"
                    height={200}
                    width={200}
                />
                <div className="p-6 flex flex-col gap-8">
                    <h1 className="text-2xl font-bold text-gray-900">{title}</h1>

                    {sections.map((section) => (
                        <div key={section.title}>
                            <h2 className="text-[16px] font-semibold text-emerald-600 mb-3 flex items-center gap-2">
                                <span className="w-1 h-5 bg-emerald-500 rounded-full inline-block"></span>
                                {section.title}
                            </h2>

                            {Array.isArray(section.content) ? (
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {section.content.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-gray-500 text-[14px] leading-relaxed">
                                            <span className="text-emerald-400 mt-1 shrink-0">✓</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            ) : section.isHtml ? (
                                <div
                                    className="text-gray-500 text-[14px] leading-8"
                                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(section.content as string) }}
                                />
                            ) : (
                                <p className="text-gray-500 text-[14px] leading-8">{section.content}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CourseContent;