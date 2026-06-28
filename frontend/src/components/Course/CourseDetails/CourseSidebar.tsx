"use client";
import React, {useEffect, useState} from 'react';
import {Course} from "@/types/course";
import {BarChart2, BookOpen, Clock, HeadphonesIcon, Monitor, Users, Wifi} from "lucide-react";
import {useCart} from "@/context/CartContext";
import Image from "next/image";
import {getTeacherInfo} from "@/services/auth";
import {Teacher} from "@/types/auth";

function CourseSidebar({
                           id,
                           title,
                           time,
                           students,
                           teacher,
                           image,
                           orginal_price,
                           level,
                           prerequisite,
                           number_of_sessions,
                           discount
                       }: Course) {
    const {addToCart} = useCart();
    const [teacherInfo, setTeacherInfo] = useState<Teacher | null>(null);

    useEffect(() => {
        if (!teacher) return;
        const fetchTeacherData = async () => {
            try {
                const res = await getTeacherInfo(Number(teacher));
                setTeacherInfo(res);
                console.log(res);
            } catch (err) {
                console.log(err);
            }
        };
        fetchTeacherData();
    }, [teacher]);

    const specs = [
        {label: "نوع دوره", value: "آفلاین", icon: <Wifi size={14}/>},
        {label: "زمان دوره", value: `${time} ساعت`, icon: <Clock size={14}/>},
        {label: "پیش‌نیاز", value: `${prerequisite}`, icon: <BookOpen size={14}/>},
        {label: "تعداد جلسات", value: `${number_of_sessions}`, icon: <BookOpen size={14}/>},
        {label: "روش پشتیبانی", value: "پیام‌رسان و تیکت", icon: <HeadphonesIcon size={14}/>},
        {label: "سطح دوره", value: `${level}`, icon: <BarChart2 size={14}/>},
        {label: "بستر برگزاری", value: "اسپات پلیر", icon: <Monitor size={14}/>},
    ];

    return (
        <div className="hidden lg:flex w-[35%] flex-col gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-24"><div className="flex flex-col gap-3 mb-4 p-4 bg-gray-50 rounded-xl">


                <div className="flex items-center justify-between">
                    <span className="text-[13px] text-gray-400">قیمت اصلی</span>
                    <span className="text-[14px] text-gray-400 line-through">
            {Number(orginal_price?.toString().replace(/,/g, "")).toLocaleString("fa-IR")} تومان
        </span>
                </div>


                <div className="flex items-center justify-between">
                    <span className="text-[13px] text-gray-400">تخفیف</span>
                    <span className="bg-red-50 text-red-500 text-[12px] font-bold px-3 py-1 rounded-full">
            {discount}% 🎉
        </span>
                </div>


                <div className="h-px bg-gray-200" />


                <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-gray-700">قیمت نهایی</span>
                    <span className="text-xl font-bold text-emerald-600">
            {(Number(orginal_price?.toString().replace(/,/g, "")) * (1 - discount / 100)).toLocaleString("fa-IR")} تومان
        </span>
                </div>
            </div>

                <button
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-medium text-[14px] transition-colors mb-4"
                    onClick={() => addToCart({
                        id,
                        title,
                        price: Number(orginal_price?.toString().replace(/,/g, "")),
                        image: image,
                    })}
                >
                    ثبت‌نام در دوره
                </button>

                <div className="flex items-center gap-2 text-gray-400 text-[13px] justify-center">
                    <Users size={14}/>
                    <span>{students?.toLocaleString("fa-IR")} نفر در این دوره ثبت‌نام کرده‌اند</span>
                </div>

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

                <div className="mt-5 pt-4 border-t border-gray-100">
                    <p className="text-[12px] text-gray-400 mb-3">مدرس دوره</p>
                    <div className="flex items-center gap-3">
                        {teacherInfo?.user.avatar ? (
                            <Image
                                src={teacherInfo.user.avatar}
                                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-100"
                                alt="مدرس"
                                height={48}
                                width={48}
                            />
                        ) : (
                            <div
                                className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-lg">
                                {teacherInfo?.user.full_name?.[0] || "م"}
                            </div>
                        )}
                        <div>
                            <p className="font-medium text-[14px] text-gray-800">{teacherInfo?.user.full_name}</p>
                            <p className="text-[12px] text-gray-400">{teacherInfo?.description}</p>
                        </div>
                    </div>
                    <p className="text-[13px] text-gray-500 leading-7 mt-3">
                        {teacherInfo?.expertise}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CourseSidebar;