"use client";
import React, {useRef} from 'react';
import Container from "@/components/Layout/container/Container";
import Scrollbar from "@/components/Layout/Scrollbar/Scrollbar";
import CommentCard from "@/components/modules/CommentCard/CommentCard";
import {ChevronLeft, ChevronRight} from "lucide-react";

type ScrollbarRefType = {
    scrollPrev: () => void;
    scrollNext: () => void;
};

function CommentsList() {

    const scrollbarRef = useRef<ScrollbarRefType | null>(null);



    return (


        <Container>
            <div className="flex items-center gap-4 w-full mb-10" dir="rtl">
                <div className="flex-1 h-px bg-gray-300" />
                <h2 className="shrink-0 text-[15px] md:text-[18px] font-bold text-[#1F2937]">
                    نظرات <span className="text-[#34D399]"> دانشجویان</span>
                </h2>

                <div className="flex-1 h-px bg-gray-300" />
            </div>
            <Scrollbar ref={scrollbarRef}>
                <CommentCard/>
                <CommentCard/>
                <CommentCard/>
                <CommentCard/>
                <CommentCard/>
            </Scrollbar>
            <div className="flex items-center justify-center mt-5">
                <button
                    type="button"
                    onClick={() => scrollbarRef.current?.scrollPrev()}
                    aria-label="قبلی"
                    className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-[#1F2937] transition-colors"
                >
                    <ChevronRight size={20} />
                </button>
                <button
                    type="button"
                    onClick={() => scrollbarRef.current?.scrollNext()}
                    aria-label="بعدی"
                    className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-[#1F2937] transition-colors"
                >
                    <ChevronLeft size={20} />
                </button>
            </div>
        </Container>
    );
}

export default CommentsList;