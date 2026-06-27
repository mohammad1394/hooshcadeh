"use client";

import { toast } from "react-hot-toast";
import { createContext, useContext, useEffect, useState } from "react";
import { STORAGE_KEYS } from "@/constants/storage";

type CartItem = {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
};

type CartContextType = {
    cart: CartItem[];
    addToCart: (item: Omit<CartItem, "quantity">) => void;
    removeFromCart: (id: number) => void;
    increase: (id: number) => void;
    decrease: (id: number) => void;
    totalPrice: number;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Load cart
    useEffect(() => {
        const data = localStorage.getItem("cart");
        if (data) {
            setCart(JSON.parse(data));
        }
    }, []);

    // Save cart
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // ADD TO CART (FIXED)
    const addToCart = (item: Omit<CartItem, "quantity">) => {
        const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

        if (!token) {
            toast.error("اول وارد شو");
            return;
        }

        const exist = cart.find(p => p.id === item.id);

        if (exist) {
            toast.error("این دوره قبلا به سبد خرید اضافه شده");
            return;
        }

        setCart(prev => [
            ...prev,
            { ...item, quantity: 1 }
        ]);

        toast.success("دوره به سبد خرید اضافه شد");
    };

    // REMOVE
    const removeFromCart = (id: number) => {
        const item = cart.find(p => p.id === id);

        setCart(prev => prev.filter(p => p.id !== id));

        if (item) {
            toast.success("از سبد خرید حذف شد");
        }
    };

    // INCREASE
    const increase = (id: number) => {
        setCart(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    // DECREASE
    const decrease = (id: number) => {
        setCart(prev =>
            prev
                .map(item =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    // TOTAL PRICE
    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                increase,
                decrease,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// HOOK
export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used inside CartProvider");
    }

    return context;
};