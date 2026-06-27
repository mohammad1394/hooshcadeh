"use client";
import React from 'react';
import {Course} from "@/types/course";
import { Users, Clock, BookOpen, Wifi, Award, HeadphonesIcon, BarChart2, Monitor } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

function CourseSidebar({id , title, time,students,  image, orginal_price} :Course) {
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

    return (
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
                        <Image
                            src="/assets/تتتتت.jpg"
                            className="w-12 h-12 rounded-full object-cover border-2 border-emerald-100"
                            alt="مدرس"
                            height={200}
                            width={200}
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
    );
}

export default CourseSidebar;