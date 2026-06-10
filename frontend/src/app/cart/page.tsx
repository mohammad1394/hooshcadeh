"use client";

import { useCart } from "@/context/CartContext";
import Container from "@/components/Layout/container/Container";

export default function CartPage() {
    const { cart, increase, decrease, removeFromCart, totalPrice } = useCart();

    return (
        <div className={"w-full mx-auto]"}>
            <div className="p-10 w-full">
                <h1 className="text-2xl mb-6">سبد خرید</h1>

                {cart.map(item => (
                    <div key={item.id} className="flex mx-auto flex-col md:flex-row gap-4 justify-center border p-4 mb-4">
                        <img src={item.image} className="w-20 h-20 mx-auto" />

                        <div className="flex-1">
                            <h2>{item.title}</h2>
                            <p>{item.price} تومان</p>

                            <div className="flex justify-center gap-2 mt-2">
                                <button         className="w-8 h-8 flex items-center justify-center rounded-lg
        bg-green-500 text-white hover:bg-green-600 active:scale-95 transition" onClick={() => increase(item.id)}>+</button>
                                <span>{item.quantity}</span>
                                <button  className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300
        bg-red-500 hover:bg-red-800 active:scale-95 transition" onClick={() => decrease(item.id)}>-</button>
                            </div>
                        </div>

                        <button className="ml-4 h-[60px] w-full md:w-[100px] my-auto  rounded-lg bg-red-500 text-white text-sm
        hover:bg-red-600 active:scale-95 transition" onClick={() => removeFromCart(item.id)}>
                            حذف
                        </button>
                    </div>
                ))}

                <div className="mt-6 text-lg">
                    مجموع: {totalPrice} تومان
                </div>
            </div>
        </div>
    );
}