"use client";

import {LayoutDashboard, ShoppingBasket, LogOut} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface UserMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

function UserMenu({ isOpen, onClose }: UserMenuProps) {
    const router = useRouter();
    const { user, logout } = useAuth();

    if (!isOpen) return null;

    const handleNavigate = (path: string) => {
        router.push(path);
        onClose();
    };

    const handleLogout = () => {
        logout();
        router.push("/");
        onClose();
    };

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-[calc(100%+8px)] left-0 bg-white shadow-xl rounded-xl w-48 text-gray-700 z-50 overflow-hidden border border-gray-100"
        >
            <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-[12px] text-gray-400">خوش آمدید</p>
                <p className="text-[13px] font-medium text-gray-800 truncate">
                    {user?.first_name  || "کاربر"}

                </p>
            </div>

            <button
                onClick={() => handleNavigate("/panel")}
                className="flex w-full items-center gap-3 text-right px-4 py-2.5 text-[13px] hover:bg-gray-50 transition-colors"
            >
                <LayoutDashboard size={18} className="text-gray-400" />
                پنل کاربری
            </button>

            <button
                onClick={() => handleNavigate("/cart")}
                className="flex w-full items-center gap-3 text-right px-4 py-2.5 text-[13px] hover:bg-gray-50 transition-colors"
            >
                <ShoppingBasket size={16} className="text-gray-400" />
                سبد خرید
            </button>

            <div className="border-t border-gray-100">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 text-right px-4 py-2.5 text-[13px] text-red-500 hover:bg-red-50 transition-colors"
                >
                    <LogOut size={18} />
                    خروج از حساب
                </button>
            </div>
        </div>
    );
}

export default UserMenu;