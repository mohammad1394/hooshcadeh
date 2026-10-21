"use client";

import { useState, useRef, useEffect } from "react";
import { Camera } from "lucide-react";
import { editProfile } from "@/services/editprofile";
import { storage } from "@/lib/storage";
import { getProfile } from "@/services/auth";
import { Profile } from "@/types/auth";
import { toast } from "react-hot-toast";

function EditProfileForm() {
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState<Profile | null>(null);

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const accessToken = storage.getAccessToken();
                if (!accessToken) return;

                const data = await getProfile(accessToken);

                setProfile(data);

                setForm({
                    first_name: data.first_name || "",
                    last_name: data.last_name || "",
                    phone_number: data.phone_number || "",
                });
            } catch (error) {
                console.error(error);
            }
        };

        fetchProfile();
    }, []);

    const handleAvatarClick = () => fileInputRef.current?.click();

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setAvatarPreview(URL.createObjectURL(file));
        setAvatarFile(file);
    };

    const changeHandler = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!profile?.id) return;

        setLoading(true);
        try {
            const payload = new FormData();
            payload.append("first_name", form.first_name);
            payload.append("last_name", form.last_name);
            payload.append("phone_number", form.phone_number);
            if (avatarFile) {
                payload.append("avatar", avatarFile);
            }

            await editProfile(String(profile.id), payload);
            toast.success("اطلاعات با موفقیت به‌روزرسانی شد");
        } catch (err) {
            console.error(err);
            toast.error("به‌روزرسانی اطلاعات با خطا مواجه شد");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden" dir="rtl">
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
                        {profile?.avatar ? (
                            <img src={profile?.avatar} alt="آواتار" className="w-full h-full object-cover" />
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

            <form onSubmit={handleSubmit} className="pt-14 px-6 pb-6 md:px-8 md:pb-8">
                <p className="text-center text-sm text-gray-600 mb-6">دانشجو</p>

                <div className="flex flex-col gap-5">
                    <input
                        name="first_name"
                        value={form.first_name}
                        onChange={changeHandler}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/30 focus:border-[#1D4ED8] transition-colors"
                    />
                    <input
                        name="last_name"
                        value={form.last_name}
                        onChange={changeHandler}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/30 focus:border-[#1D4ED8] transition-colors"
                    />
                    <input
                        name="phone_number"
                        value={form.phone_number}
                        onChange={changeHandler}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/30 focus:border-[#1D4ED8] transition-colors"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading || !profile}
                    className="w-full mt-8 bg-gradient-to-l from-[#1E3A6E] to-[#1D4ED8] hover:from-[#1a3260] hover:to-[#1742b8] text-white font-bold text-sm py-3.5 rounded-xl shadow-sm shadow-blue-900/10 transition-all disabled:opacity-60"
                >
                    {loading ? "در حال ثبت..." : "ثبت تغییرات"}
                </button>
            </form>
        </div>
    );
}

export default EditProfileForm;