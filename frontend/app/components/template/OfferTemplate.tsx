import React from 'react';
import Container from "@/app/components/Container";


function OfferTemplate() {
    return (
        <div className="bg-[#4A5565] w-[100%] py-15 mt-30 ">
           <div className={"w-[95%] md:w-[80%] mx-auto"}>


                <p className={"text-white text-[20px] font-bold mb-10"}>پیشنهاد ویژه برای شروع حرفه ای</p>
                <div className="flex gap-10 flex-col md:flex-row bg-[#373D49] p-7 rounded-2xl border border-white ">
                    <img src="/assets/0251848748.webp" alt="" className={"w-[100%] md:w-[40%] rounded-2xl"} />
                    <div className={"flex flex-col gap-5 mt-2"}>
                        <h2 className={"text-white text-2xl"}>هوش مصنوعی جامع 6</h2>
                        <bdi className={"text-[#00c896] text-xl"}>۲۰,۹۱۵,۰۰۰ تومان</bdi>
                        <p className={"mt-4 text-gray-400"}>
                            ترکیب 6 دوره کاربردی هوش مصنوعی دوره جامع6 با هدف ارائه یک تجربه
                            آموزشی جامع و همه‌جانبه در زمینه‌های مختلف کاربردهای هوش مصنوعی
                            […]
                        </p>
                        <a href="" className={"bg-[#1E88E5] text-center  w-[100%] md:w-[60%] lg:w-[25%] px-3 py-3 rounded-2xl text-white"}>افزودن به سبد خرید</a>
                    </div>
                </div>
               </div>
            </div>
    );
}

export default OfferTemplate;