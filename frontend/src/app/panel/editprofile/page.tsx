"use client";

import { useState, useRef } from "react";
import { Camera } from "lucide-react";

function EditProfileForm() {
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [expertise, setExpertise] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleAvatarClick = () => fileInputRef.current?.click();

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setAvatarPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {

        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden" dir="rtl">

            {/* Cover + Avatar */}
            <div className="relative h-28 bg-gradient-to-l from-[#1E3A6E] to-[#1D4ED8]">
                <span className="absolute top-4 right-4 bg-white/95 text-[#1D4ED8] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    از یادگیری لذت ببر! ✨
                </span>

                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                    <button
                        type="button"
                        onClick={handleAvatarClick}
                        className="relative w-20 h-20 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border-4 border-white shadow-md flex items-center justify-center overflow-hidden group"
                        aria-label="تغییر عکس پروفایل"
                    >
                        {avatarPreview ? (
                            <img src={avatarPreview} alt="آواتار" className="w-full h-full object-cover" />
                        ) : (
                            <Camera size={22} className="text-white/90" />
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                    />
                </div>
            </div>

            {/* Body */}
            <form onSubmit={handleSubmit} className="pt-14 px-6 pb-6 md:px-8 md:pb-8">
                <p className="text-center text-sm text-gray-600 mb-6">دانشجو</p>

                <div className="flex flex-col gap-5">
                    <Field
                        label="نام و نام خانوادگی"
                        value={fullName}
                        onChange={setFullName}
                        placeholder="مثلاً سید محمد رضویان‌پور"
                    />
                    <Field
                        label="ایمیل"
                        type="email"
                        value={email}
                        onChange={setEmail}
                        placeholder="example@email.com"
                    />
                    <Field
                        label="حوزه تخصصی"
                        value={expertise}
                        onChange={setExpertise}
                        placeholder="مثلاً هوش مصنوعی"
                    />
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full mt-8 bg-gradient-to-l from-[#1E3A6E] to-[#1D4ED8] hover:from-[#1a3260] hover:to-[#1742b8] text-white font-bold text-sm py-3.5 rounded-xl shadow-sm shadow-blue-900/10 transition-all disabled:opacity-60"
                >
                    {submitting ? "در حال ثبت..." : "ثبت تغییرات"}
                </button>
            </form>
        </div>
    );
}

function Field({
                   label,
                   value,
                   onChange,
                   placeholder,
                   type = "text",
               }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    type?: string;
}) {
    return (
        <div>
            <label className="block text-sm text-gray-800 mb-2">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/30 focus:border-[#1D4ED8] transition-colors"
            />
        </div>
    );
}

export default EditProfileForm;