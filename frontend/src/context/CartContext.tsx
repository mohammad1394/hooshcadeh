"use client";

import { createContext, useContext, useEffect, useState } from "react";

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


    useEffect(() => {
        const data = localStorage.getItem("cart");
        if(data) {
            setCart(JSON.parse(data));
        }
    }, []);


    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);


    const addToCart = (item: Omit<CartItem, "quantity">) => {
        const token = localStorage.getItem("access");

        if (!token) {
            alert("اول وارد شو");
            return;
        }

        setCart(prev => {
            const exist = prev.find(p => p.id === item.id);

            if (exist) {
                return prev.map(p =>
                    p.id === item.id
                        ? { ...p, quantity: p.quantity + 1 }
                        : p
                );
            }

            return [...prev, { ...item, quantity: 1 }];
        });
    };


    const removeFromCart = (id: number) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };


    const increase = (id: number) => {
        setCart(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };


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

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, increase, decrease, totalPrice }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used inside provider");
    return context;
};