import React from "react";
import { Clock5, GraduationCap, Users } from "lucide-react";
import { Course } from "@/types/course";
import Image from "next/image";
import { sanitizeHtml } from "@/lib/sanitize";

function CourseTemplate({
                            title,
                            time,
                            description,
                            image,
                            orginal_price,
                            students,
                            teacher,
                            level,
                            discount,
                        }: Course) {
    const rawPrice = Number(orginal_price?.toString().replace(/,/g, ""));
    const discountedPrice = Math.round(rawPrice * (1 - discount / 100));
    const hasDiscount = discount > 0;

    return (
        <div className="text-right bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col mb-5">

            {/* Thumbnail */}
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
                {hasDiscount && (
                    <span className="absolute top-2.5 left-2.5 bg-red-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
            %{discount.toLocaleString("fa-IR")}
          </span>
                )}
            </div>

            {/* Body */}
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

                <div className="flex items-center gap-5 pt-1 text-gray-500 text-[12px]">
                    <div className="flex items-center gap-1.5">
                        <GraduationCap size={16} className="text-emerald-600" />
                        <span>{teacher}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock5 size={16} className="text-emerald-600" />
                        <span>{time}</span>
                    </div>
                </div>

                {/* Footer: CTA + Price */}
                <div className="flex items-center justify-between pt-3 mt-auto border-t border-gray-100">
                    <button className="bg-emerald-600 hover:bg-orange-500 text-white px-4 py-2 text-[12px] rounded-lg font-medium transition-colors duration-200">
                        مشاهده دوره
                    </button>

                    {/* Price block */}
                    <div className="flex flex-col items-end gap-0.5">
                        {hasDiscount && (
                            <span className="text-gray-400 text-[11px] line-through">
                {rawPrice.toLocaleString("fa-IR")} تومان
              </span>
                        )}
                        <span className="text-emerald-600 font-semibold text-[13px]">
              {discountedPrice.toLocaleString("fa-IR")} تومان
            </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseTemplate;