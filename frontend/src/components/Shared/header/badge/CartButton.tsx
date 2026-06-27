"use client";

import Link from "next/link";
import { ShoppingBasket } from "lucide-react";

interface CartButtonProps {
    count: number;
}

function CartButton({ count }: CartButtonProps) {
    return (
        <Link href="/cart">
            <button
                className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                aria-label={`سبد خرید - ${count} آیتم`}
            >
                {count > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-orange-400 text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center border-2 border-[#0C447C]">
                        {count}
                    </span>
                )}
                <ShoppingBasket size={18} className="text-white" />
            </button>
        </Link>
    );
}

export default CartButton;