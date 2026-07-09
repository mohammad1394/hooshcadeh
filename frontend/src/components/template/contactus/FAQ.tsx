"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const questions = [
    {
        title: "چگونه در دوره‌ها ثبت نام کنم؟",
        body: "بعد از ساخت حساب کاربری می‌توانید در دوره مورد نظر ثبت نام کنید."
    },
    {
        title: "آیا دوره‌ها بروزرسانی می‌شوند؟",
        body: "بله، تمامی دوره‌ها دارای بروزرسانی رایگان هستند."
    },
    {
        title: "چگونه پشتیبانی دریافت کنم؟",
        body: "از طریق فرم تماس یا تلگرام می‌توانید با ما در ارتباط باشید."
    },
    {
        title: "آیا امکان بازگشت وجه وجود دارد؟",
        body: "طبق قوانین سایت امکان بازگشت وجه بررسی خواهد شد."
    },
];

export default function FAQ() {

    const [open, setOpen] = useState<number | null>(0);

    return (

        <section className="container mx-auto px-6 py-20">

            <h2 className="text-center text-3xl font-black mb-10">
                سوالات متداول
            </h2>

            <div className="space-y-4">

                {questions.map((item, index) => (

                    <div
                        key={index}
                        className="rounded-2xl border bg-white overflow-hidden"
                    >

                        <button
                            onClick={() => setOpen(open === index ? null : index)}
                            className="flex justify-between items-center w-full p-6"
                        >

                            <span>{item.title}</span>

                            <ChevronDown
                                className={`duration-300 ${
                                    open === index ? "rotate-180" : ""
                                }`}
                            />

                        </button>

                        {open === index && (

                            <div className="px-6 pb-6 text-gray-500 leading-8">
                                {item.body}
                            </div>

                        )}

                    </div>

                ))}

            </div>

        </section>
    );
}