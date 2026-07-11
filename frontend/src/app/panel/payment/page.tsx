"use client";

import { useEffect, useState } from "react";
import { storage } from "@/lib/storage";
import { getProfile } from "@/services/auth";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/types/auth";
import { toast } from "react-hot-toast";

type Order = {
    id: string;
    title: string;
    detail: string;
    date: string;
    amount: number;
    detailsHref?: string;
};

function toJalaliDate(isoDate: string): string {
    const date = new Date(isoDate);

    if (isNaN(date.getTime())) {
        return isoDate;
    }

    return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(date);
}

function toJalaliDateTime(isoDate: string): string {
    const date = new Date(isoDate);

    if (isNaN(date.getTime())) {
        return isoDate;
    }

    return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
}

function OrdersPage() {
    const { isLoggedIn, isInitialized } = useAuth();
    const [profile, setProfile] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isInitialized) return;

        if (!isLoggedIn) {
            setLoading(false);
            return;
        }

        let isMounted = true;

        const fetchProfile = async () => {
            try {
                const accessToken = storage.getAccessToken();
                if (!accessToken) {
                    setLoading(false);
                    return;
                }

                const data = await getProfile(accessToken);
                if (isMounted) {
                    setProfile(data);
                }
            } catch (err) {
                console.error(err);
                toast.error("دریافت اطلاعات کاربری با خطا مواجه شد");
                if (isMounted) {
                    setError("دریافت سفارش‌ها با خطا مواجه شد");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchProfile();

        return () => {
            isMounted = false;
        };
    }, [isInitialized, isLoggedIn]);

    const orders: Order[] = (profile?.transaction ?? []).map((t) => ({
        id: String(t.id),
        title: t.concept,
        detail: t.text,
        date: toJalaliDate(t.created_at),
        amount: t.amount,
    }));

    return (
        <div className="max-w-5xl" dir="rtl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-lg font-bold text-gray-900">سفارش‌های من</h1>
            </div>

            {/* Not logged in */}
            {isInitialized && !isLoggedIn && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
                    <p className="text-gray-700 font-medium">
                        برای مشاهده سفارش‌ها ابتدا وارد حساب کاربری خود شوید
                    </p>
                </div>
            )}

            {/* Loading */}
            {loading && (
                <div className="flex flex-col gap-3">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="h-16 bg-white rounded-2xl border border-gray-100 animate-pulse"
                        />
                    ))}
                </div>
            )}

            {/* Error */}
            {!loading && error && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
                    <p className="text-red-500 font-medium">{error}</p>
                </div>
            )}

            {/* Empty */}
            {!loading && !error && isLoggedIn && orders.length === 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
                    <p className="text-4xl mb-3">🧾</p>
                    <p className="text-gray-700 font-medium">هنوز سفارشی ثبت نکردی</p>
                    <p className="text-sm text-gray-400 mt-2">
                        سفارش‌هایی که ثبت کنی اینجا نمایش داده می‌شوند.
                    </p>
                </div>
            )}

            {/* Desktop Table */}
            {!loading && !error && orders.length > 0 && (
                <div className="hidden md:block overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm">
                    <table className="w-full text-sm">
                        <thead>
                        <tr className="border-b border-gray-100 text-gray-400 text-xs">
                            <th className="text-right py-4 px-6 font-medium">شناسه</th>
                            <th className="text-right py-4 px-6 font-medium">شرح تراکنش</th>
                            <th className="text-right py-4 px-6 font-medium">توضیحات</th>
                            <th className="text-right py-4 px-6 font-medium">تاریخ</th>
                            <th className="text-right py-4 px-6 font-medium">مبلغ</th>
                        </tr>
                        </thead>

                        <tbody>
                        {orders.map((order) => (
                            <tr
                                key={order.id}
                                className="border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors"
                            >
                                <td className="py-4 px-6 text-gray-500 tabular-nums">{order.id}</td>
                                <td className="py-4 px-6 text-gray-500">{order.title}</td>
                                <td className="py-4 px-6 text-gray-500">{order.detail}</td>
                                <td className="py-4 px-6">{order.date}</td>
                                <td className="py-4 px-6 text-gray-500">{formatPrice(order.amount)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Mobile Cards */}
            {!loading && !error && orders.length > 0 && (
                <div className="md:hidden flex flex-col gap-4">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4"
                        >
                            <div className="flex justify-between items-start mb-3 gap-3">
                                <div>
                                    <p className="font-medium text-gray-800">{order.title}</p>

                                    {order.detail && (
                                        <p className="text-xs text-gray-400 mt-1">{order.detail}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-between text-xs text-gray-400">
                                <span>شناسه: {order.id}</span>
                                <span>{order.date}</span>
                            </div>

                            <div className="mt-3 font-bold text-gray-900">
                                {formatPrice(order.amount)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function formatPrice(value: number) {
    if (value === 0) return "رایگان";
    return `${value.toLocaleString("fa-IR")} تومان`;
}

export default OrdersPage;