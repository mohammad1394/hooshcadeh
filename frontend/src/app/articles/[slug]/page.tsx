import React from 'react';
import Container from "@/components/Layout/container/Container";
import {getBlogSlug} from "@/services/blog";
import Image from "next/image";
import CommentSection from "@/components/modules/CommentSection/CommentSection";
import {Blog} from "@/types/blog";
import {notFound} from "next/navigation";

interface Props {
    params: Promise<{ slug: string }>;
}

async function Page({params}: Props) {
    const {slug} = await params;
    const decodedSlug = decodeURIComponent(slug);
    let data: Blog;

    try {
        data = await getBlogSlug(decodedSlug);
    } catch (error) {
        console.error(error);
        notFound();
    }

    return (
        <div className="bg-[#f5f4f0] min-h-screen py-30">
            <Container>
                <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm max-w-3xl mx-auto">

                    {/* تصویر هدر */}
                    <div className="relative w-full p-10">
                        <Image
                            src={data.image}
                            alt={data.title}
                            className="object-cover w-full h-full"
                            width={200}
                            height={200}
                        />
                    </div>

                    <div className="px-8 py-8 rtl">

                        {/* تگ دسته‌بندی */}
                        {data.category && (
                            <span className="inline-block text-xs font-medium text-[#1B3A6B] bg-[#f0e4b8] rounded px-3 py-1 mb-3 tracking-wide">
                                {data.category}
                            </span>
                        )}

                        {/* عنوان */}
                        <h1 className="text-2xl font-bold text-[#1B3A6B] leading-relaxed mb-4">
                            {data.title}
                        </h1>

                        {/* متادیتا */}
                        <div className="flex items-center gap-5 text-sm text-gray-400 pb-5 mb-6 border-b border-gray-100">
                            <div className="flex items-center gap-2 text-gray-600 font-medium">
                                <div className="w-8 h-8 rounded-full bg-[#1B3A6B] text-white flex items-center justify-center text-xs font-semibold">
                                    {data.teacher_full_name?.charAt(0)}
                                </div>
                                {data.teacher_full_name}
                            </div>
                            <span>تاریخ نگارش: {data.created_jalali?.slice(0, 10)}</span>
                        </div>

                        {/* متن مقاله */}
                        <div
                            className="text-[15.5px] text-[#2a2a3e] leading-[2] space-y-5 prose prose-headings:text-[#1B3A6B] max-w-none"
                            dangerouslySetInnerHTML={{__html: data.description}}
                        />

                    </div>
                    <hr/>
                    <div className="px-8 pb-8 rtl">
                        <CommentSection
                            id={data.id}
                            comments={data.comments}
                            type= "blog"
                        />
                    </div>
                </article>
            </Container>
        </div>
    );
}

export default Page;
