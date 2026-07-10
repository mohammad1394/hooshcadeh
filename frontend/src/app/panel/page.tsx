"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getProfile } from "@/services/auth";
import { toast } from "react-hot-toast";
import { storage } from "@/lib/storage";
import SidebarPanel from "@/components/modules/SidebarPanel/SidebarPanel";

type Profile = {
    id: number;
    phone_number: string;
    first_name: string;
    last_name: string;
    avatar: string;
    full_name: string;
    purchased: number[];
};

type CartItem = {
    id: number | string;
    name?: string;
    price?: number;
    qty?: number;
};

function PanelPage() {
    const { isLoggedIn, isInitialized, logout } = useAuth();
    const router = useRouter();

    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [cartCount, setCartCount] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const readCart = useCallback(() => {
        try {
            const raw = localStorage.getItem("cart");
            const items: CartItem[] = raw ? JSON.parse(raw) : [];
            setCartCount(items.length);
        } catch {
            setCartCount(0);
        }
    }, []);

    useEffect(() => {
        if (isInitialized && !isLoggedIn) {
            toast.error("لطفا اول وارد شوید");
            router.push("/login");
        }
    }, [isInitialized, isLoggedIn, router]);

    useEffect(() => {
        if (!isInitialized || !isLoggedIn) return;

        const fetchProfile = async () => {
            try {
                const accessToken = storage.getAccessToken();
                if (!accessToken) return;

                const data = await getProfile(accessToken);
                setProfile(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
        queueMicrotask(readCart);

        window.addEventListener("storage", readCart);
        return () => window.removeEventListener("storage", readCart);
    }, [isInitialized, isLoggedIn, readCart]);

    if (!isInitialized) {
        return (
            <div className="min-h-screen py-25 flex flex-col gap-3 justify-center items-center text-gray-400">
                <div className="w-8 h-8 border-2 border-gray-200 border-t-[#1D4ED8] rounded-full animate-spin" />
                در حال بارگذاری...
            </div>
        );
    }
    if (!isLoggedIn) return null;

    const displayName = profile?.full_name || profile?.phone_number || "کاربر";
    const initial = displayName.trim().charAt(0) || "ک";

    return (
        <div className="min-h-screen bg-[#F5F7FB] flex" dir="rtl">
            <SidebarPanel
                displayName={displayName}
                initial={initial}
                logout={logout}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <main className="flex-1 p-6 md:p-8 max-w-5xl">
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="md:hidden mb-4 text-gray-600 text-sm font-medium"
                >
                    ☰ منو
                </button>

                {/* Welcome card */}
                <div className="relative overflow-hidden rounded-2xl p-6 md:p-7 bg-gradient-to-l from-[#1E3A6E] to-[#1D4ED8] text-white shadow-sm">
                    <div className="absolute -left-8 -top-10 w-40 h-40 rounded-full bg-white/10" />
                    <div className="absolute left-16 -bottom-12 w-28 h-28 rounded-full bg-white/5" />

                    <div className="relative flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur flex items-center justify-center text-2xl font-bold shrink-0">
                            {initial}
                        </div>
                        <div>
                            <p className="text-sm text-white/70">خوش اومدی 👋</p>
                            {loading ? (
                                <div className="h-6 w-40 bg-white/20 rounded mt-2 animate-pulse" />
                            ) : (
                                <h1 className="text-xl font-bold mt-1">{displayName}</h1>
                            )}
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                    <StatCard
                        href="/panel/mycourses"
                        label="دوره‌های من"
                        value={profile?.purchased?.length ?? 0}
                        accent="from-emerald-400 to-emerald-600"
                        icon="🎓"
                    />
                    <StatCard
                        href="/cart"
                        label="سبد خرید"
                        value={cartCount}
                        accent="from-orange-400 to-orange-500"
                        icon="🛒"
                    />
                </div>
            </main>
        </div>
    );
}

function StatCard({
                      href,
                      label,
                      value,
                      accent,
                      icon,
                  }: {
    href: string;
    label: string;
    value: number;
    accent: string;
    icon: string;
}) {
    return (
        <Link
            href={href}
            className="block bg-white rounded-2xl p-5 shadow-sm border border-gray-50 hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
            <div className="flex items-center justify-between">
                <span
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${accent} flex items-center justify-center text-base`}
                >
                    {icon}
                </span>
                <p className="text-3xl font-extrabold text-gray-900 tabular-nums">{value}</p>
            </div>
            <p className="text-gray-500 text-sm mt-3">{label}</p>
        </Link>
    );
}

export default PanelPage;