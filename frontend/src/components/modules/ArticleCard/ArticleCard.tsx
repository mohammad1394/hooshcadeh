import React from 'react';
import {Blog} from "@/services/blog";
import Link from "next/link";

function ArticleCard({title, image, description, teacher_full_name, created_jalali, slug}: Blog) {
    return (
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden flex flex-col text-right hover:-translate-y-1 hover:shadow-md transition-all duration-200">

            <div className="relative h-[200px]">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                <span className="absolute top-2 right-2 bg-white/15 backdrop-blur-sm text-white text-[11px] px-2.5 py-1 rounded-full">
                    مقاله
                </span>
            </div>

            <div className="p-3 flex flex-col gap-2 flex-1">
                <p className="font-medium text-[14px] leading-relaxed text-gray-900 line-clamp-2">
                    {title}
                </p>
                <div
                    className="line-clamp-2 text-gray-400 text-[12px] leading-relaxed flex-1"
                    dangerouslySetInnerHTML={{ __html: description || "" }}
                />
                <div className="flex items-center justify-between pt-2.5 border-t border-gray-100">
                    <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-full bg-[#1B3A6B] text-white flex items-center justify-center text-[10px] font-medium">
                            {teacher_full_name?.charAt(0)}
                        </div>
                        <span className="text-[11px] text-gray-500">{teacher_full_name}</span>
                    </div>
                    <span className="text-[11px] text-gray-400">{created_jalali?.slice(0, 10)}</span>
                </div>
            </div>

            <div className="px-3 pb-3">
                <Link
                    href={`/articles/${slug}`}
                    className="bg-[#1D9E75] text-white text-center w-full py-2 rounded-lg block text-[12px] font-medium hover:bg-[#178a64] transition-colors"
                >
                    مطالعه مقاله
                </Link>
            </div>
        </div>
    );
}

export default ArticleCard;