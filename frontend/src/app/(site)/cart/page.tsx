"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
    const { cart,  removeFromCart, totalPrice } = useCart();

    return (
        <div className="w-full max-w-3xl mx-auto px-4 pt-10 pb-50 ">
            <h1 className="text-2xl font-semibold mb-6">سبد خرید</h1>

            <div className="flex flex-col gap-4">
                {cart.map(item => (

                     <div
                         key={item.id}
                         className="flex flex-col sm:flex-row items-center gap-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm"
                     >
                         <Link
                             href={`/courses/${item.slug}`}
                             className="flex flex-1 items-center gap-4 "
                         >
                             <Image
                                 src={item.image}
                                 alt={item.title}
                                 className="w-20 h-20 object-cover rounded-xl"
                                 width={200}
                                 height={200}
                             />

                             <div className="text-center sm:text-right">
                                 <h2 className="font-medium text-gray-800 hover:text-blue-500">{item.title}</h2>
                                 <p className="text-sm text-gray-500 mt-1">{item.price} تومان</p>
                             </div>
                         </Link>

                         <button
                             className="w-full sm:w-auto h-9 px-4 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 active:scale-95 transition"
                             onClick={() => removeFromCart(item.id)}
                         >
                             حذف
                         </button>
                     </div>

                ))}
            </div>

            <div className="mt-6 flex items-center justify-between bg-gray-100 rounded-xl px-5 py-4">
                <span className="text-gray-500 text-sm">مجموع</span>
                <span className="text-xl font-semibold">{totalPrice} تومان</span>
            </div>
        </div>
    );
}