"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import SidebarMenu from "@/components/Shared/header/SidebarMenu";

import UserMenu from "@/components/Shared/header/dropdown/UserMenu";
import CartButton from "@/components/Shared/header/badge/CartButton";

export default function NavbarActions() {
    const { isLoggedIn, user, isInitialized } = useAuth();
    const { cart } = useCart();
    const [menuIsOpen, setMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handler = () => setIsOpen(false);
        window.addEventListener("click", handler);
        return () => window.removeEventListener("click", handler);
    }, []);

    if (!isInitialized) return null;

    return (
        <>
            <button
                className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setMenuOpen(!menuIsOpen)}
                aria-label="باز کردن منو"
            >
                <Menu size={18} />
            </button>

            <SidebarMenu
                menuState={menuIsOpen}
                toggleMenu={() => setMenuOpen(!menuIsOpen)}
            />

            <div className="hidden lg:flex items-center gap-3 text-white">
                <CartButton count={cart.length} />

                <div className="relative">
                    {!isLoggedIn ? (
                        <button
                            onClick={() => router.push("/signup")}
                            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white text-[13px] font-medium px-4 py-3 rounded-xl transition-colors w-[150px]"
                        >
                            <User size={18} />
                            <span>ورود / عضویت</span>
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
                                className="flex items-center gap-2 cursor-pointer bg-white/10 hover:bg-white/20 text-[13px] font-medium px-4 py-2 rounded-xl transition-colors border border-white/20"
                            >
                                <span>{user?.first_name  || "کاربر"}</span>
                            </button>
                            <UserMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
                        </>
                    )}
                </div>
            </div>
        </>
    );
}