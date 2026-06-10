"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

 function PanelPage() {
    const { isLoggedIn, user, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/login");
        }
    }, [isLoggedIn]);

    if (!isLoggedIn) return null;

    return (
        <div className="min-h-screen bg-gray-100 flex">

            <aside className="w-[250px] bg-white shadow-md p-5 hidden md:flex flex-col gap-5">
                <h2 className="text-lg font-bold text-blue-600">
                    پنل کاربری
                </h2>

                <button
                    onClick={() => router.push("/panel")}
                    className="text-right hover:text-blue-500"
                >
                    داشبورد
                </button>

                <button
                    onClick={() => router.push("/panel/courses")}
                    className="text-right hover:text-blue-500"
                >
                    دوره‌های من
                </button>

                <button
                    onClick={() => router.push("/panel/orders")}
                    className="text-right hover:text-blue-500"
                >
                    سفارش‌ها
                </button>

                <button
                    onClick={logout}
                    className="text-right text-red-500 hover:text-red-600 mt-auto"
                >
                    خروج
                </button>
            </aside>

            <main className="flex-1 p-5">

                <div className="bg-white rounded-xl p-5 shadow">
                    <h1 className="text-xl font-bold mb-4">
                        خوش اومدی 👋
                    </h1>

                    <p className="text-gray-600">
                        شماره شما:
                    </p>

                    <p className="text-blue-600 text-lg mt-2">
                        {user?.first_name || user?.phone || "کاربر"}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">

                    <div className="bg-white p-5 rounded-xl shadow">
                        <p className="text-gray-500">دوره‌ها</p>
                        <p className="text-2xl font-bold mt-2">0</p>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow">
                        <p className="text-gray-500">سفارش‌ها</p>
                        <p className="text-2xl font-bold mt-2">0</p>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow">
                        <p className="text-gray-500">سبد خرید</p>
                        <p className="text-2xl font-bold mt-2">0</p>
                    </div>

                </div>

            </main>
        </div>
    );
}

export default PanelPage;