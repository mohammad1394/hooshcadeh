"use client";
import React, { forwardRef, useImperativeHandle, useRef } from "react";

export type ScrollbarRef = {
    scrollPrev: () => void;
    scrollNext: () => void;
};

type ScrollbarProps = {
    children: React.ReactNode;
    itemClassName?: string;
};

const Scrollbar = forwardRef<ScrollbarRef, ScrollbarProps>(
    ({ children, itemClassName = "w-[78%] sm:w-[45%] lg:w-[23%]" }, ref) => {
        const scrollRef = useRef<HTMLDivElement>(null);

        const goNext = () => {
            scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
        };
        const goBack = () => {
            scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
        };

        useImperativeHandle(ref, () => ({
            scrollNext: goNext,
            scrollPrev: goBack,
        }));

        return (
            <div
                ref={scrollRef}
                dir="rtl"
                className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
                {React.Children.map(children, (child) => (
                    <div className={`shrink-0 snap-start ${itemClassName}`}>
                        {child}
                    </div>
                ))}
            </div>
        );
    }
);

Scrollbar.displayName = "Scrollbar";

export default Scrollbar;