"use client";

import React, { useState } from 'react';
import { login, loginVerify } from "@/app/lib/api";

interface LogInProps {
    isOpen: boolean;
    onClose: () => void;
}

type Step = 'phone' | 'otp';

/**
 * Login/Signup modal component.
 * Step 1: Enter phone number → sends OTP via backend
 * Step 2: Enter OTP code → verifies and receives JWT tokens
 */
function LogIn({ isOpen, onClose }: LogInProps) {
    const [step, setStep] = useState<Step>('phone');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otpCode, setOtpCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    /** Handle phone number submission — requests OTP from backend */
    async function handlePhoneSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(phoneNumber);
            setStep('otp');
        } catch {
            setError('خطا در ارسال کد تایید. لطفاً دوباره تلاش کنید.');
        } finally {
            setLoading(false);
        }
    }

    /** Handle OTP verification — sends code to backend for JWT tokens */
    async function handleOtpSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const tokens = await loginVerify(phoneNumber, otpCode);
            // Store tokens in localStorage
            localStorage.setItem('access_token', tokens.access);
            localStorage.setItem('refresh_token', tokens.refresh);
            // Reset form and close modal
            handleClose();
        } catch {
            setError('کد تایید نادرست است. لطفاً دوباره تلاش کنید.');
        } finally {
            setLoading(false);
        }
    }

    /** Reset state and close modal */
    function handleClose() {
        setStep('phone');
        setPhoneNumber('');
        setOtpCode('');
        setError('');
        onClose();
    }

    return (
        <div
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
            onClick={handleClose}
        >
            <div
                className="bg-white rounded-xl p-6 w-full max-w-md relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>

                <h2 className="text-xl font-bold mb-4 text-black">ورود / عضویت</h2>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                {step === 'phone' ? (
                    <form onSubmit={handlePhoneSubmit} className="space-y-3">
                        <label className="block text-sm text-gray-600 mb-1">
                            شماره موبایل
                        </label>
                        <input
                            type="tel"
                            placeholder="09xxxxxxxxx"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            pattern="^09[0-9]{9}$"
                            required
                            className="w-full border rounded px-3 py-2 text-black"
                            dir="ltr"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
                        >
                            {loading ? 'در حال ارسال...' : 'دریافت کد تایید'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleOtpSubmit} className="space-y-3">
                        <p className="text-sm text-gray-500 mb-2">
                            کد تایید به شماره {phoneNumber} ارسال شد.
                        </p>
                        <input
                            type="text"
                            placeholder="کد تایید"
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value)}
                            maxLength={6}
                            required
                            className="w-full border rounded px-3 py-2 text-black text-center tracking-widest"
                            dir="ltr"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
                        >
                            {loading ? 'در حال بررسی...' : 'تایید و ورود'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setStep('phone')}
                            className="w-full text-blue-600 text-sm py-1"
                        >
                            تغییر شماره موبایل
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default LogIn;