"use client";

import { useState } from "react";
import Image from "next/image";

export default function ContactForm() {
    const [form, setForm] = useState({
        fullname: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const changeHandler = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <section
            id="contact-form"
            className="container mx-auto px-6 py-16"
        >
            <div className="overflow-hidden rounded-3xl border bg-white shadow">

                <div className="grid lg:grid-cols-2">

                    {/* Left */}

                    <div className="hidden lg:flex flex-col items-center justify-center bg-slate-50 p-10">

                        <Image
                            src="/assets/2_character_headset_scene.png"
                            width={320}
                            height={320}
                            alt="support"
                        />

                        <h2 className="mt-8 text-3xl font-bold">
                            ما اینجا هستیم تا کمک کنیم
                        </h2>

                        <p className="mt-4 text-center leading-8 text-gray-500">
                            پیام خود را ارسال کنید تا در سریع‌ترین زمان ممکن با شما
                            تماس بگیریم.
                        </p>

                    </div>

                    {/* Right */}

                    <div className="p-10">

                        <h3 className="mb-8 text-3xl font-bold">
                            فرم تماس
                        </h3>

                        <div className="grid md:grid-cols-2 gap-6">

                            <input
                                name="fullname"
                                placeholder="نام و نام خانوادگی"
                                value={form.fullname}
                                onChange={changeHandler}
                                className="rounded-xl border p-4 outline-none focus:border-orange-500"
                            />

                            <input
                                name="email"
                                placeholder="ایمیل"
                                value={form.email}
                                onChange={changeHandler}
                                className="rounded-xl border p-4 outline-none focus:border-orange-500"
                            />

                            <input
                                name="phone"
                                placeholder="شماره تماس"
                                value={form.phone}
                                onChange={changeHandler}
                                className="rounded-xl border p-4 outline-none focus:border-orange-500"
                            />

                            <input
                                name="subject"
                                placeholder="موضوع"
                                value={form.subject}
                                onChange={changeHandler}
                                className="rounded-xl border p-4 outline-none focus:border-orange-500"
                            />

                        </div>

                        <textarea
                            rows={6}
                            name="message"
                            placeholder="پیام خود را بنویسید..."
                            value={form.message}
                            onChange={changeHandler}
                            className="mt-6 w-full rounded-xl border p-4 outline-none focus:border-orange-500"
                        />

                        <button className="mt-6 rounded-xl bg-green-600 px-8 py-4 font-bold text-white transition hover:bg-green-700">
                            ارسال پیام
                        </button>

                    </div>

                </div>

            </div>
        </section>
    );
}