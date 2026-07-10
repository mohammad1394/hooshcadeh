"use client";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

type SidebarPanelProps = {
    displayName: string;
    initial: string;
    logout: () => void;
    isOpen: boolean;
    onClose: () => void;
};

const navItems = [
    { label: "داشبورد", path: "/panel" },
    { label: "دوره‌های من", path: "/panel/mycourses" },
    { label: "سفارش های من", path: "/panel/payment" },
    { label: "ویرایش اطلاعات", path: "/panel/editprofile" },

];

function SidebarPanel({ displayName, initial, logout, isOpen, onClose }: SidebarPanelProps) {
    const pathname = usePathname();
    const router = useRouter();

    const handleNavigate = (path: string) => {
        router.push(path);
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`
                    fixed md:static top-0 right-0 h-full md:h-170 w-[260px]
                    bg-white border-l border-gray-100 p-6 flex flex-col gap-1
                    z-50 md:z-auto
                    transition-transform duration-300
                    ${isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
                `}
            >
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#1D4ED8] to-[#7C3AED] flex items-center justify-center text-white font-bold text-lg shrink-0">
                        {initial}
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">{displayName}</p>
                        <p className="text-xs text-gray-400">پنل کاربری</p>
                    </div>
                </div>

                <nav className="flex flex-col gap-1">
                    {navItems.map((item) => {
                        const active = pathname === item.path;
                        return (
                            <button
                                key={item.path}
                                onClick={() => handleNavigate(item.path)}
                                className={`text-right px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                    active
                                        ? "bg-[#EFF4FF] text-[#1D4ED8]"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                            >
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                <button
                    onClick={logout}
                    className="text-right px-4 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 mt-auto"
                >
                    خروج از حساب
                </button>
            </aside>
        </>
    );
}

export default SidebarPanel;