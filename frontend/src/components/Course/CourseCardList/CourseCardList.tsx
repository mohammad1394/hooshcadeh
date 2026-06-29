import React from 'react';
import { GraduationCap, Clock5, Users } from "lucide-react";
import Image from "next/image";
import { sanitizeHtml } from "@/lib/sanitize";
import { Course } from "@/types/course";

function CourseCardList({
                            title,
                            image,
                            orginal_price,
                            students,
                            description,
                            teacher_full_name,
                            time,
                            discount,
                        }: Course) {
    const rawPrice = Number(orginal_price?.toString().replace(/,/g, ""));
    const discountedPrice = rawPrice * (1 - discount / 100);
    const hasDiscount = discount > 0;

    return (
        <div className="group bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-right">
            {/* Thumbnail */}
            <div className="relative w-full h-52 overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {hasDiscount && (
                    <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {discount}% تخفیف
          </span>
                )}
            </div>

            {/* Body */}
            <div className="p-4 flex flex-col gap-3">
                {/* Title */}
                <h3 className="font-bold text-gray-800 text-base leading-6 line-clamp-2">
                    {title}
                </h3>

                {/* Description */}
                <div
                    className="text-gray-500 text-sm leading-6 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(description) }}
                />

                {/* Meta: teacher + duration */}
                <div className="flex flex-row gap-4 text-gray-500 text-sm pt-1">
                    <div className="flex items-center gap-1">
                        <GraduationCap size={16} className="text-[#1E88E5]" />
                        <span>{teacher_full_name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock5 size={16} className="text-[#1E88E5]" />
                        <span>{time}</span>
                    </div>
                </div>

                {/* Divider */}
                <hr className="border-gray-100" />

                {/* Footer: price + students */}
                <div className="flex flex-row-reverse items-center justify-between">
                    {/* Price */}
                    <div className="flex flex-col items-end gap-0.5">
                        {hasDiscount && (
                            <span className="text-gray-400 text-xs line-through">
                {rawPrice.toLocaleString("fa-IR")} تومان
              </span>
                        )}
                        <span className="text-[#00c896] font-bold text-sm">
              {discountedPrice.toLocaleString("fa-IR")} تومان
            </span>
                    </div>

                    {/* Students */}
                    <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                        <Users size={16} className="text-[#1E88E5]" />
                        <span>{Number(students).toLocaleString("fa-IR")}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseCardList;