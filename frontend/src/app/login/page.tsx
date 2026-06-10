"use client";

import React, { useEffect, useState } from "react";
import { loginApi, resentCodeLogin, verifyLogin } from "@/services/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

function SignUp() {
    const { login } = useAuth();
    const router = useRouter();

    const [step, setStep] = useState<"form" | "verify">("form");
    const [code, setCode] = useState("");
    const [number, setNumber] = useState("");
    const [timer, setTimer] = useState(180);

    useEffect(() => {
        if (step !== "verify") return;

        setTimer(180);
    }, [step]);

    useEffect(() => {
        if (timer === 0 || step !== "verify") return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer, step]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await loginApi({
                phone_number: number,
            });

            if (res.success) {
                setStep("verify");
            }
        } catch (err) {
            console.log(err);
            alert("خطا در ارسال کد");
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await verifyLogin({
                code: code,
            });

            if (res.success) {
                login({
                    access: res.access,
                    refresh: res.refresh,
                    user: {
                        phone: number
                    }
                });

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
            const res = await resentCodeLogin();

            if (res.success) {
                alert("کد تایید مجدد ارسال شد");
                setTimer(180);
            }
        } catch (err) {
            console.log(err);
            alert("خطا در ارسال مجدد");
        }
    };

    return (
        <div className="w-full h-[100vh] bg-gray-200 flex flex-col justify-center items-center gap-10">
            <div className="bg-white rounded-xl p-6 w-[90%] md:w-[50%] lg:w-[35%] xl:w-[25%]  mx-auto flex flex-col relative">
                <h2 className="text-xl font-bold mb-4 text-center text-black">
                    ساخت حساب کاربری جدید
                </h2>

                <p className="text-center my-2 mb-10 text-sm">
                    هنوز ثبت نام نکرده اید ؟
                    <Link href={"/login"} className="text-green-500">
                        ثبت نام
                    </Link>
                </p>

                {step === "form" ? (
                    <form className="space-y-3" onSubmit={handleSubmit}>
                        <input
                            name="phone_number"
                            type="text"
                            placeholder="شماره همراه"
                            className="w-full border rounded px-3 py-2 text-black"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                        <button className="w-full bg-blue-600 text-white py-2 rounded">
                            ورود
                        </button>
                    </form>
                ) : (
                    <form className="space-y-3" onSubmit={handleVerify}>
                        <input
                            name="code"
                            type="text"
                            placeholder="کد تایید"
                            className="w-full border rounded px-3 py-2 text-black"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />

                        {timer > 0 ? (
                            <p className="text-center text-gray-400">
                                ارسال مجدد تا {timer} ثانیه
                            </p>
                        ) : (
                            <p
                                className="text-center text-sm cursor-pointer text-blue-500"
                                onClick={handleResend}
                            >
                                ارسال مجدد کد
                            </p>
                        )}

                        <button className="w-full bg-blue-600 text-white py-2 rounded">
                            تایید کد
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default SignUp;