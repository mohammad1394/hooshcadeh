"use client";

import { useState } from "react";
import Image from "next/image";
import {contactUs} from "@/services/contact-us";
import {toast} from "react-hot-toast";

export default function ContactForm() {
    const [form, setForm] = useState({

        name_and_family: "",

        phone_number: "",

        concept: "",

        text: "",

    });
    const [isLoading, setIsLoading] = useState(false);
    const changeHandler = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (form.name_and_family === "" ) {
            toast.error("لطفا نام و نام خانوادگی خود را وارد کنید")
            return;
        }
        if (form.concept === ""){
            toast.error("لطفا موضوع مورد نظرتان را وارد کنید")
            return;
        }
        if (form.phone_number.length !== 11){
            toast.error("شماره تلفن درست نمیباشد")
            return
        }
        if (form.text === ""){
            toast.error("متن پیام را وارد کنید")
            return;
        }
        setIsLoading(true);
        try {
            const res = await contactUs({...form , is_read : true})
            toast.success("پیام شما با موفقیت ارسال شد ")
            setForm({name_and_family:  "" , concept:  "" , phone_number: "" , text: "" , });
        }
        catch (err) {
            console.log(err)
            toast.error("ارسال پیام با خطا مواجه شد ")
        }finally {
            setIsLoading(false);
        }



    }


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

                        <form onSubmit={handleSubmit}>
                            <div className="grid md:grid-cols-2 gap-6">

                                <input
                                    name="name_and_family"
                                    value={form.name_and_family}
                                    onChange={changeHandler}
                                    placeholder="نام و نام خانوادگی"
                                    className="border rounded-lg px-4 py-2.5"
                                    required
                                />


                                <input
                                    name="phone_number"
                                    placeholder="شماره تماس"
                                    value={form.phone_number}
                                    onChange={changeHandler}
                                    className="rounded-xl border p-4 outline-none focus:border-orange-500"
                                    required
                                />
                                <input
                                    name="concept"
                                    placeholder="موضوع"
                                    value={form.concept}
                                    onChange={changeHandler}
                                    className="rounded-xl border p-4 outline-none focus:border-orange-500"
                                />

                            </div>

                            <textarea
                                rows={6}
                                name="text"
                                placeholder="پیام خود را بنویسید..."
                                value={form.text}
                                onChange={changeHandler}
                                className="mt-6 w-full rounded-xl border p-4 outline-none focus:border-orange-500"
                            />

                            <button className="mt-6 rounded-xl bg-green-600 px-8 py-4 font-bold text-white transition hover:bg-green-700">
                                ارسال پیام
                            </button>
                        </form>

                    </div>

                </div>

            </div>
        </section>
    );
}