"use client";

import React, { useEffect, useState } from "react";
import { getProfile, login as loginApi, verifyLogin, resendVerifyCode } from "@/services/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";

function formatTimer(secs: number) {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
}

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();

    const [step, setStep] = useState<"form" | "verify">("form");
    const [code, setCode] = useState("");
    const [number, setNumber] = useState("");
    const [timer, setTimer] = useState(180);
    const [loadingForm, setLoadingForm] = useState(false);
    const [loadingVerify, setLoadingVerify] = useState(false);
    const [formError, setFormError] = useState("");
    const [verifyError, setVerifyError] = useState("");

    useEffect(() => {
        if (timer === 0 || step !== "verify") return;
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer, step]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError("");
        setLoadingForm(true);
        try {
            const res = await loginApi({ phone_number: number });
            if (res.success) {
                setTimer(180);
                setStep("verify");
            }
        } catch {
            setFormError("شما به تازگی کد ورود دریافت کرده‌اید. چند دقیقه دیگر دوباره تلاش کنید.");
        } finally {
            setLoadingForm(false);
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoadingVerify(true);
        setVerifyError("");
        try {
            const res = await verifyLogin({ code });
            const profile = await getProfile(res.access);
            login({ access: res.access, refresh: res.refresh }, profile);
            toast.success("شما با موفقیت وارد شدید");
            router.push("/");

        } catch (error) {
            console.error(error);
        }
        finally {
            setLoadingVerify(false);
        }
    };

    const handleResend = async () => {
        try {
            const res = await resendVerifyCode();
            if (res.success) setTimer(180);
        } catch {
            setVerifyError("خطا در ارسال مجدد کد.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                    {step === "form" ? (
                        <>
                            <div className="text-center mb-6">
                                <h1 className="text-lg font-medium text-gray-900 mb-1">
                                    ورود به حساب کاربری
                                </h1>
                                <p className="text-sm text-gray-500">
                                    شماره همراه خود را وارد کنید
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="phone" className="block text-xs text-gray-500 mb-1.5 text-right">
                                        شماره همراه
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone_number"
                                        type="tel"
                                        placeholder="09xxxxxxxxx"
                                        dir="ltr"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-right placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition"
                                        value={number}
                                        onChange={(e) => setNumber(e.target.value)}
                                        required
                                    />
                                    {formError && (
                                        <p className="text-xs text-red-500 mt-1.5 text-right">{formError}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loadingForm}
                                    className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 text-white text-sm font-medium py-2.5 rounded-xl transition"
                                >
                                    {loadingForm ? "در حال ارسال..." : "دریافت کد تایید"}
                                </button>
                            </form>

                            <p className="text-center text-xs text-gray-400 mt-5">
                                هنوز ثبت‌نام نکرده‌اید؟{" "}
                                <Link href="/signup" className="text-blue-500 hover:underline">
                                    ثبت‌نام
                                </Link>
                            </p>
                        </>
                    ) : (
                        <>
                            <div className="text-center mb-6">
                                <h1 className="text-lg font-medium text-gray-900 mb-1">
                                    تایید شماره همراه
                                </h1>
                                <p className="text-sm text-gray-500">
                                    کد ارسال‌شده به{" "}
                                    <span className="font-medium text-gray-700 inline-block" dir="ltr">
                                        {number}
                                    </span>{" "}
                                    را وارد کنید
                                </p>
                            </div>

                            <form onSubmit={handleVerify} className="space-y-4">
                                <div>
                                    <label htmlFor="code" className="block text-xs text-gray-500 mb-1.5 text-right">
                                        کد تایید
                                    </label>
                                    <input
                                        id="code"
                                        name="code"
                                        type="text"
                                        placeholder="------"
                                        dir="ltr"
                                        maxLength={6}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-center tracking-[0.35em] placeholder:tracking-widest placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        required
                                    />
                                    {verifyError && (
                                        <p className="text-xs text-red-500 mt-1.5 text-right">{verifyError}</p>
                                    )}
                                </div>

                                <div className="text-center">
                                    {timer > 0 ? (
                                        <p className="text-xs text-gray-400">
                                            ارسال مجدد تا{" "}
                                            <span className="font-medium text-gray-600">
                                                {formatTimer(timer)}
                                            </span>
                                        </p>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={handleResend}
                                            className="text-xs text-blue-500 hover:underline"
                                        >
                                            ارسال مجدد کد
                                        </button>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loadingVerify}
                                    className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 text-white text-sm font-medium py-2.5 rounded-xl transition"
                                >
                                    {loadingVerify ? "در حال بررسی..." : "تایید و ورود"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => { setStep("form"); setCode(""); setVerifyError(""); }}
                                    className="w-full border border-gray-200 text-gray-500 text-xs py-2 rounded-xl hover:bg-gray-50 transition"
                                >
                                    تغییر شماره همراه
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
