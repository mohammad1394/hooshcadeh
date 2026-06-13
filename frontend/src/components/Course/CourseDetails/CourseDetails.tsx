"use client"
import React from 'react';
import { useCart } from "@/context/CartContext";
import { Course } from "@/services/course";
import { Users, Clock, BookOpen, Wifi, Award, HeadphonesIcon, BarChart2, Monitor } from "lucide-react";

function CourseDetails({ title, image, teacher, description, id, orginal_price, students, time }: Course) {
    const { addToCart } = useCart();

    const specs = [
        { label: "نوع دوره", value: "آفلاین", icon: <Wifi size={14} /> },
        { label: "زمان دوره", value: `${time} ساعت`, icon: <Clock size={14} /> },
        { label: "پیش‌نیاز", value: "بدون پیش‌نیاز", icon: <BookOpen size={14} /> },
        { label: "تعداد جلسات", value: "۱۹ جلسه", icon: <BookOpen size={14} /> },
        { label: "روش پشتیبانی", value: "پیام‌رسان و تیکت", icon: <HeadphonesIcon size={14} /> },
        { label: "سطح دوره", value: "مقدماتی", icon: <BarChart2 size={14} /> },
        { label: "بستر برگزاری", value: "اسپات پلیر", icon: <Monitor size={14} /> },
    ];

    const sections = [
        { title: "درباره دوره", content: description },
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
        <div className="my-16 flex gap-8 text-right" dir="rtl">

            {/* محتوای اصلی */}
            <div className="w-full lg:w-[65%]">
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                    <img
                        src={image || "/assets/1020269.jpg"}
                        alt={title}
                        className="w-full h-[300px] object-cover"
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
                                ) : (
                                    <p className="text-gray-500 text-[14px] leading-8">{section.content}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* سایدبار */}
            <div className="hidden lg:flex w-[35%] flex-col gap-4">

                {/* کارت قیمت */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-24">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-emerald-600">
                            {Number(orginal_price?.toString().replace(/,/g, "")).toLocaleString("fa-IR")} تومان
                        </span>
                        <span className="bg-orange-50 text-orange-500 text-[11px] font-medium px-3 py-1 rounded-full">
                            محصول جدید
                        </span>
                    </div>

                    <button
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-medium text-[14px] transition-colors mb-4"
                        onClick={() => addToCart({
                            id,
                            title,
                            price: Number(orginal_price?.toString().replace(/,/g, "")),
                            image: image || "/assets/1020269.jpg",
                        })}
                    >
                        ثبت‌نام در دوره
                    </button>

                    <div className="flex items-center gap-2 text-gray-400 text-[13px] justify-center">
                        <Users size={14} />
                        <span>{students?.toLocaleString("fa-IR")} نفر در این دوره ثبت‌نام کرده‌اند</span>
                    </div>

                    {/* مشخصات دوره */}
                    <div className="mt-5 flex flex-col divide-y divide-gray-100">
                        {specs.map((spec) => (
                            <div key={spec.label} className="flex justify-between items-center py-2.5 text-[13px]">
                                <span className="text-gray-400 flex items-center gap-1.5">
                                    {spec.icon}
                                    {spec.label}
                                </span>
                                <span className="text-gray-700 font-medium">{spec.value}</span>
                            </div>
                        ))}
                    </div>

                    {/* مدرس */}
                    <div className="mt-5 pt-4 border-t border-gray-100">
                        <p className="text-[12px] text-gray-400 mb-3">مدرس دوره</p>
                        <div className="flex items-center gap-3">
                            <img
                                src="/assets/تتتتت.jpg"
                                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-100"
                                alt="مدرس"
                            />
                            <div>
                                <p className="font-medium text-[14px] text-gray-800">مریم حسن‌زاده</p>
                                <p className="text-[12px] text-gray-400">دکترای هوش مصنوعی — دانشگاه صنعتی شریف</p>
                            </div>
                        </div>
                        <p className="text-[13px] text-gray-500 leading-7 mt-3">
                            ۱۰ سال سابقه کار در حوزه هوش مصنوعی و تدریس در دانشگاه‌های معتبر کشور
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseDetails;