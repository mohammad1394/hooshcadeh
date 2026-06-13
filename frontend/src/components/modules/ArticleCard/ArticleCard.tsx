import React from 'react';

function ArticleCard() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col text-right my-10">


            <div className="relative">
                <img
                    src="/assets/47848.webp"
                    alt="journal photo"
                    className="w-full h-[180px] object-cover rounded-xl"
                />
                <span className="absolute top-2.5 right-2.5 bg-white/20 backdrop-blur-sm text-white text-[11px] font-medium px-3 py-1 rounded-full">
                    مقاله
                </span>
            </div>


            <div className="p-4 flex flex-col gap-2.5 flex-1">
                <p className="font-semibold text-[15px] leading-relaxed text-gray-900">
                    مکالمه آسان عربی در اربعین با هوش مصنوعی
                </p>
                <p className="line-clamp-3 text-gray-400 text-[13px] leading-relaxed">
                    در آستانه مراسم بزرگ اربعین، یکی از مهم‌ترین دغدغه‌های زائران ایرانی که به زیارت کربلا
                    می‌روند، برقراری ارتباط موثر و سریع با مردم عرب‌زبان است...
                </p>


                <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                    <div className="flex items-center gap-2">
                        <span className="text-[12px] text-gray-500">عباسعلی رضایی</span>
                    </div>
                    <span className="text-[12px] text-gray-400">۱۴۰۵/۰۲/۳۱</span>
                </div>
            </div>


            <div className="px-4 pb-4 flex justify-center">
                <button className={"bg-[#1D9E75] text-white w-[250px] p-3 absolute rounded-xl"}>
                    مطالعه
                </button>
            </div>
        </div>
    );
}

export default ArticleCard;


