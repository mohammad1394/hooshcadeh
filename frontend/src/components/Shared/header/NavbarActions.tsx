"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaBars } from "react-icons/fa";
import { SlBasket } from "react-icons/sl";
import { CiUser } from "react-icons/ci";
import SidebarMenu from "@/components/Shared/header/SidebarMenu";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { IoMdArrowDropdown } from "react-icons/io";
import { AiOutlineDashboard } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";

export default function NavbarActions() {
    const { isLoggedIn, user, logout } = useAuth();
    const { cart } = useCart();

    const [menuisOpen, setMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const handler = () => setIsOpen(false);
        window.addEventListener("click", handler);
        return () => window.removeEventListener("click", handler);
    }, []);

    return (
        <>
            <button
                className="lg:hidden text-black"
                onClick={() => setMenuOpen(!menuisOpen)}
            >
                <FaBars />
            </button>

            <SidebarMenu
                menuState={menuisOpen}
                toggleMenu={() => setMenuOpen(!menuisOpen)}
            />

            <div className="flex items-center justify-end gap-5 pb-5 text-white">
                <Link href="/cart">
                    <button className="bg-[#00c896] relative rounded-[15px] my-auto w-12 h-12 flex items-center justify-center">
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full w-5 h-5 border border-[#00c896]">
                                {cart.length}
                            </span>
                        )}
                        <SlBasket className="text-[22px]" />
                    </button>
                </Link>

                <div className="relative">
                    {!isLoggedIn ? (
                        <button
                            onClick={() => router.push("/signup")}
                            className="bg-[#3393E7] flex flex-row-reverse gap-1 items-center rounded-[15px] w-[120px] lg:w-[180px] justify-center text-[12px] lg:text-[16px] py-[10px] px-[11px]"
                        >
                            <CiUser className="text-[22px]" />
                            <span className="hidden md:block">ورود/عضویت</span>
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsOpen(!isOpen);
                                }}
                                className="bg-[#3393E7] flex flex-row-reverse gap-1 items-center rounded-[15px] w-[120px] lg:w-[180px] justify-center text-[12px] lg:text-[16px] py-[10px] px-[11px]"
                            >
                                <IoMdArrowDropdown />
                                <span className="hidden md:block">
                                     {user?.first_name || user?.phone || "کاربر"}
                                </span>
                                <CiUser className="text-[22px]" />

                            </button>

                            {isOpen && (
                                <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg w-44 text-black z-50 overflow-hidden">
                                    <button
                                        onClick={() => router.push("/panel")}
                                        className="flex w-full text-right px-4 py-2 gap-2 hover:bg-gray-100"
                                    >
                                        <AiOutlineDashboard className={"text-[23px]"}/>
                                        <p>پنل کاربری</p>
                                    </button>
                                    <button
                                        onClick={() => router.push("/cart")}
                                        className="flex w-full gap-2 text-right px-4 py-2 hover:bg-gray-100"
                                    >
                                        <SlBasket className="text-[20px]" />
                                        <p>سبد خرید</p>
                                    </button>

                                    <button
                                        onClick={() => {
                                            logout();
                                            router.push("/");
                                        }}
                                        className="flex gap-2 w-full text-right px-4 py-2 hover:bg-red-100 text-red-500"
                                    >
                                        <CiLogout  className={"text-[20px]"}/>
                                        <p>خروج</p>
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}