"use client";

import React, {useEffect, useState} from 'react';
import { resentCodeSignUp, signUp, verifySignUp} from "@/services/auth";
import {useRouter} from "next/navigation";
import Link from "next/link";
function SignUp(){

    const router = useRouter()

    const [step , setStep] = useState<"form" | "verify">("form");

    const [code, setCode] = useState("");

    const [form , setForm] = useState({
        phone_number: "",
        first_name: "",
        last_name: "",
    })

    const [timer , setTimer] = useState(180);

    useEffect(() => {
        if (timer === 0 ) return;

        const interval = setInterval(() => {
            setTimer((pre) => pre -1)
        } , 1000)

        return () => clearInterval(interval)
    } , [timer])

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await signUp(form);

            if (res.success) {
                setStep("verify");
            }
        } catch (err) {
            console.log(err);
            alert("خطا در ثبت نام");
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await verifySignUp({
                code: code
            });

            if (res.success) {
                localStorage.setItem("access", res.access);
                localStorage.setItem("refresh", res.refresh);
                alert("شما با موفقیت وارد شدید");
                router.push("/");
            }
        } catch (err) {
            console.log(err);
            alert("کد اشتباه است");
        }
    };

    const handleResend = async () => {
        try {
            const res = await resentCodeSignUp();
            if (res.success) {
                alert("کد مجددا ارسال شد ")
            }
        }catch (err) {
            console.log(err);
            alert(err)
        }
    }


    return (
        <div className="w-full h-[100vh] bg-gray-200 flex flex-col justify-center items-center gap-10">

            <div
                className="bg-white rounded-xl p-6 w-[90%] md:w-[50%] lg:w-[35%] xl:w-[25%] sha mx-auto flex flex-col relative"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold mb-4 text-center text-black">ساخت حساب کاربری جدید</h2>
                <p className={"text-center my-2 mb-10 text-sm"}>
                    قبلا ثبت نام کرده اید ؟
                    <Link href={"/login"} className={"text-green-500"}>وارد شوید</Link>

                </p>
                {
                    step === "form" ? (
                        <form className="space-y-3" onSubmit={handleSubmit}>
                            <input
                                name="first_name"
                                type="text"
                                placeholder="نام"
                                className="w-full border rounded px-3 py-2 text-black"
                                value = {form.first_name}
                                onChange = {handleChange}
                            />
                            <input
                                name="last_name"
                                type="text"
                                placeholder="نام خانوادگی"
                                className="w-full border rounded px-3 py-2 text-black"
                                value = {form.last_name}
                                onChange = {handleChange}
                            />
                            <input
                                name="phone_number"
                                type="text"
                                placeholder="شماره همراه"
                                className="w-full border rounded px-3 py-2 text-black"
                                value = {form.phone_number}
                                onChange = {handleChange}
                            />
                            <button className="w-full bg-blue-600 text-white py-2 rounded">
                                ثبت نام
                            </button>
                        </form>
                    ) : (
                        <form className="space-y-3" onSubmit={handleVerify}>
                            <input
                                name="code"
                                type="text"
                                placeholder="کد تایید "
                                className="w-full border rounded px-3 py-2 text-black"
                                value = {code}
                                onChange = {(e) => setCode(e.target.value)}
                            />
                            {
                                timer > 0 ? (
                                    <p className="text-center text-gray-400">
                                        ارسال مجدد تا {timer} ثانیه
                                    </p>
                                ):(
                                    <p className={"text-center my-2 mb-10 text-sm cursor-pointer"}
                                       onClick={()=>{
                                        handleResend();
                                        setTimer(180);
                                    }}
                                    >
                                        ارسال مجدد کد
                                    </p>
                                )
                            }



                            <button className="w-full bg-blue-600 text-white py-2 rounded">
                                تایید کد
                            </button>
                        </form>
                    )
                }

            </div>
        </div>
    );
}

export default SignUp;