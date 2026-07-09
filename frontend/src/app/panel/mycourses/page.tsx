"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getProfile } from "@/services/auth";
import { getCourses } from "@/services/course";
import Image from "next/image";
import { Course } from "@/types/course";
import { Profile } from "@/types/auth";
import SidebarPanel from "@/components/modules/SidebarPanel/SidebarPanel";

function MyCoursesPage() {
    const { isLoggedIn, logout, isInitialized, accessToken } = useAuth();
    const router = useRouter();

    const [profile, setProfile] = useState<Profile | null>(null);
    const [myCourses, setMyCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isInitialized && !isLoggedIn) {
            router.push("/login");
        }
    }, [isInitialized, isLoggedIn]);

    useEffect(() => {
        if (!isInitialized || !isLoggedIn) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                if (!accessToken) {
                    throw new Error("Access token is missing");
                    router.push("/login");
                }
                const [profileData, allCourses] = await Promise.all([

                    getProfile(accessToken),
                    getCourses(),
                ]);

                setProfile(profileData);

                const purchasedIds = new Set(profileData.purchased ?? []);
                const purchasedCourses = allCourses.filter((c) => purchasedIds.has(c.id));
                setMyCourses(purchasedCourses);
            } catch (err) {
                console.error(err);
                setError("دریافت اطلاعات دوره‌ها با خطا مواجه شد.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [isInitialized, isLoggedIn]);

    if (!isInitialized) {
        return (
            <div className="min-h-screen flex justify-center items-center text-gray-400">
                در حال بارگذاری...
            </div>
        );
    }
    if (!isLoggedIn) return null;

    const displayName = profile?.full_name || profile?.phone_number || "کاربر";
    const initial = displayName.trim().charAt(0) || "ک";

    return (
        <div className="min-h-screen bg-[#F5F7FB] flex" dir="rtl">
            {/* ---------- Main content ---------- */}
            <main className="flex-1 p-6 md:p-8 max-w-5xl">

                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-xl font-bold text-gray-900">دوره‌های من</h1>
                    {!loading && (
                        <span className="text-sm text-gray-400">
                            {myCourses.length} دوره
                        </span>
                    )}
                </div>

                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 animate-pulse"
                            >
                                <div className="h-32 bg-gray-100 rounded-xl mb-3" />
                                <div className="h-4 bg-gray-100 rounded w-3/4" />
                            </div>
                        ))}
                    </div>
                )}

                {!loading && error && (
                    <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-50">
                        <p className="text-red-500 text-sm">{error}</p>
                    </div>
                )}

                {!loading && !error && myCourses.length === 0 && (
                    <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-50">
                        <p className="text-4xl mb-3">🎓</p>
                        <p className="text-gray-700 font-medium">هنوز دوره‌ای خریداری نکردی</p>
                        <p className="text-gray-400 text-sm mt-1">
                            دوره‌های موجود رو ببین و اولین قدم رو بردار
                        </p>
                        <Link
                            href="/courses"
                            className="inline-block mt-4 px-5 py-2.5 rounded-lg bg-[#1D4ED8] text-white text-sm font-medium hover:bg-[#1742b8] transition-colors"
                        >
                            مشاهده دوره‌ها
                        </Link>
                    </div>
                )}

                {!loading && !error && myCourses.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {myCourses.map((course) => (
                            <Link
                                key={course.id}
                                href={`/courses/${course.slug}`}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-50 hover:shadow-md hover:-translate-y-0.5 transition-all"
                            >
                                <div className="h-32 bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-3xl relative">
                                    {course.image ? (
                                        <Image
                                            src={course.image}
                                            alt={course.title}
                                            className="w-full h-full object-cover"
                                            width={200}
                                            height={200}
                                        />
                                    ) : (
                                        "🎓"
                                    )}
                                    <span className="absolute top-2 left-2 bg-white/90 text-[10px] font-bold px-2 py-0.5 rounded-full text-gray-700">
                                        {levelLabel(course.level)}
                                    </span>
                                </div>
                                <div className="p-4">
                                    <p className="font-bold text-gray-900 text-sm line-clamp-2">
                                        {course.title}
                                    </p>
                                    <div className="flex items-center justify-between mt-3">
                                        <span className="text-xs text-gray-400">
                                            {course.students} دانشجو
                                        </span>
                                        {course.discount > 0 ? (
                                            <span className="flex items-center gap-1.5">
                                                <span className="text-[11px] text-gray-300 line-through">
                                                    {formatPrice(Number((course.orginal_price)))}
                                                </span>
                                                <span className="text-xs font-bold text-emerald-600">
                                                    {formatPrice(Number(course.final_price))}
                                                </span>
                                            </span>
                                        ) : (
                                            <span className="text-xs font-bold text-gray-700">
                                                {formatPrice(Number(course.final_price))}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

            </main>
        </div>
    );
}

function levelLabel(level: Course["level"]) {
    switch (level) {
        case "b":
            return "مبتدی";
        case "i":
            return "متوسط";
        case "a":
            return "پیشرفته";
        default:
            return "";
    }
}

function formatPrice(value: number) {
    if (!value) return "رایگان";
    return `${value.toLocaleString("fa-IR")} تومان`;
}

export default MyCoursesPage;