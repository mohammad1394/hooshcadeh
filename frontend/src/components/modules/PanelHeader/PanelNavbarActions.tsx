"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import UserMenu from "@/components/Shared/header/dropdown/UserMenu";
import CartButton from "@/components/Shared/header/badge/CartButton";

export default function PanelNavbarActions() {
    const { user, isInitialized } = useAuth();
    const { cart } = useCart();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handler = () => setIsOpen(false);
        window.addEventListener("click", handler);
        return () => window.removeEventListener("click", handler);
    }, []);

    if (!isInitialized) return null;

    return (
        <div className="flex items-center gap-3">
            <CartButton count={cart.length} />

            <div className="relative">
                <button
                    onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
                    className="flex items-center gap-2 cursor-pointer text-white bg-white/10 hover:bg-white/20 text-[13px] font-medium px-3 py-2 sm:px-4 sm:w-45 rounded-xl transition-colors border border-white/20"
                >
                    <User size={16} className="sm:hidden" />
                    <span className="hidden sm:inline">{user?.full_name || "کاربر"}</span>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                <UserMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
            </div>
        </div>
    );
}