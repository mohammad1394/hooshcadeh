"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaBars } from "react-icons/fa";
import { SlBasket } from "react-icons/sl";
import { CiUser, CiLogout } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import { AiOutlineDashboard } from "react-icons/ai";
import SidebarMenu from "@/components/Shared/header/SidebarMenu";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function NavbarActions() {
    const { isLoggedIn, user, logout } = useAuth();
    const { cart } = useCart();
    const [menuIsOpen, setMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handler = () => setIsOpen(false);
        window.addEventListener("click", handler);
        return () => window.removeEventListener("click", handler);
    }, []);

    return (
        <>
            {/* دکمه منوی موبایل */}
            <button
                className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setMenuOpen(!menuIsOpen)}
                aria-label="باز کردن منو"
            >
                <FaBars size={18} />
            </button>

            <SidebarMenu
                menuState={menuIsOpen}
                toggleMenu={() => setMenuOpen(!menuIsOpen)}
            />

            {/* اکشن‌های دسکتاپ */}
            <div className="hidden lg:flex items-center gap-3 text-white">

                {/* سبد خرید */}
                <Link href="/cart">
                    <button className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
                        {cart.length > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-orange-400 text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center border-2 border-[#0C447C]">
                                {cart.length}
                            </span>
                        )}
                        <SlBasket size={18} />
                    </button>
                </Link>

                {/* ورود / پروفایل */}
                <div className="relative">
                    {!isLoggedIn ? (
                        <button
                            onClick={() => router.push("/signup")}
                            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white text-[13px] font-medium px-4 py-2 rounded-xl transition-colors"
                        >
                            <CiUser size={18} />
                            <span>ورود / عضویت</span>
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-[13px] font-medium px-4 py-2 rounded-xl transition-colors border border-white/20"
                            >
                                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-[11px] font-bold shrink-0">
                                    {(user?.first_name?.[0] || user?.phone?.[0] || "ک")}
                                </div>
                                <span>{user?.first_name || user?.phone || "کاربر"}</span>
                                <IoMdArrowDropdown
                                    size={16}
                                    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                                />
                            </button>

                            {isOpen && (
                                <div
                                    onClick={(e) => e.stopPropagation()}
                                    className="absolute top-[calc(100%+8px)] left-0 bg-white shadow-xl rounded-xl w-48 text-gray-700 z-50 overflow-hidden border border-gray-100"
                                >
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <p className="text-[12px] text-gray-400">خوش آمدید</p>
                                        <p className="text-[13px] font-medium text-gray-800 truncate">
                                            {user?.first_name || user?.phone || "کاربر"}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => router.push("/panel")}
                                        className="flex w-full items-center gap-3 text-right px-4 py-2.5 text-[13px] hover:bg-gray-50 transition-colors"
                                    >
                                        <AiOutlineDashboard size={18} className="text-gray-400" />
                                        پنل کاربری
                                    </button>
                                    <button
                                        onClick={() => router.push("/cart")}
                                        className="flex w-full items-center gap-3 text-right px-4 py-2.5 text-[13px] hover:bg-gray-50 transition-colors"
                                    >
                                        <SlBasket size={16} className="text-gray-400" />
                                        سبد خرید
                                    </button>

                                    <div className="border-t border-gray-100">
                                        <button
                                            onClick={() => { logout(); router.push("/"); }}
                                            className="flex w-full items-center gap-3 text-right px-4 py-2.5 text-[13px] text-red-500 hover:bg-red-50 transition-colors"
                                        >
                                            <CiLogout size={18} />
                                            خروج از حساب
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}