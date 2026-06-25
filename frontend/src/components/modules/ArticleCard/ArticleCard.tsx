import React from 'react';
import {Blog} from "@/services/blog";
import Link from "next/link";
import Image from "next/image";

function ArticleCard({title, image, description, teacher_full_name, created_jalali, slug}: Blog) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col text-right">

            <div className="relative w-full h-[180px]">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover rounded-t-2xl"
                />
                <span className="absolute top-2.5 right-2.5 bg-white/20 backdrop-blur-sm text-white text-[11px] font-medium px-3 py-1 rounded-full">
                    مقاله
                </span>
            </div>

            <div className="p-4 flex flex-col gap-2.5 flex-1">
                <p className="font-semibold text-[15px] leading-relaxed text-gray-900">
                    {title}
                </p>
                <div
                    className="line-clamp-3 text-gray-400 text-[13px] leading-relaxed"
                    dangerouslySetInnerHTML={{__html: description}}
                />

                <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#1B3A6B] text-white flex items-center justify-center text-xs font-semibold">
                            {teacher_full_name?.charAt(0)}
                        </div>
                        <span className="text-[12px] text-gray-500">{teacher_full_name}</span>
                    </div>
                    <span className="text-[12px] text-gray-400">{created_jalali}</span>
                </div>
            </div>

            <div className="px-4 pb-4">
                <Link
                    href={`/articles/${slug}`}
                    className="bg-[#1D9E75] text-white text-center w-full p-3 rounded-xl block text-sm font-medium hover:bg-[#178a64] transition-colors"
                >
                    مطالعه مقاله
                </Link>
            </div>

        </div>
    );
}

export default ArticleCard;