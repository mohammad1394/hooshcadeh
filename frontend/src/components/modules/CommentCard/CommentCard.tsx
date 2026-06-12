import React from "react";
import { Star, User } from "lucide-react";

type TestimonialCardProps = {
    text: string;
    name: string;
    /** امتیاز از ۱ تا ۵ */
    rating?: number;
    courseCount?: number;
    avatar?: string;
};

function TestimonialCard({
                             text,
                             name,
                             rating = 5,
                             courseCount = 1,
                             avatar,
                         }: TestimonialCardProps) {
    return (
        <div
            className="bg-white rounded-2xl p-4 md:p-5 flex flex-col gap-4 border border-gray-100 shadow-sm h-full"
            dir="rtl"
        >
            <p className="text-gray-700 text-[13px] md:text-[15px] leading-7 md:leading-8 text-right line-clamp-4">
                مطالب دوره خیلی مفید بود . تدریس مدرس هم عالی بود و خیلی روان صحبت میکردن ،
                سپاس از تیم سبزلرن که دوره های عالی با تخفیفات خوب در اختیار کاربران قرار میدن
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                <div className="flex items-center gap-2">
                    {avatar ? (
                        <img
                            src={avatar}
                            alt={name}
                            className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                            <User size={20} />
                        </div>
                    )}

                    <div className="flex flex-col items-start gap-1">
            <span className="font-semibold text-gray-800 text-[14px] md:text-[15px]">
              amir
            </span>

                    <div className="flex gap-0.5 text-amber-400">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    size={14}
                                    fill={i < rating ? "currentColor" : "none"}
                                    className={i < rating ? "" : "text-gray-300"}
                                />
                            ))}
                        </div>
                    </div>


                </div>

                <span className="bg-gray-100 text-gray-500 text-[12px] px-3 py-1.5 rounded-lg whitespace-nowrap">
          دانشجوی {courseCount.toLocaleString("fa-IR")} دوره
        </span>
            </div>
        </div>
    );
}

export default TestimonialCard;