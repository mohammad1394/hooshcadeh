"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";

type OrderStatus = "paid" | "canceled" | "pending";

type Order = {
    id: string;
    description: string;
    date: string;
    amount: number;
    status: OrderStatus;
    detailsHref?: string;
};

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
    paid: {
        label: "پرداخت شده",
        className: "bg-emerald-50 text-emerald-600",
    },
    canceled: {
        label: "لغو شده",
        className: "bg-red-50 text-red-500",
    },
    pending: {
        label: "در انتظار پرداخت",
        className: "bg-amber-50 text-amber-600",
    },
};

function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([
        {
            id: "10235",
            description: "خرید دوره جامع React",
            date: "۱۴۰۵/۰۴/۱۰",
            amount: 2500000,
            status: "paid",
            detailsHref: "/profile/orders/10235",
        },
        {
            id: "10236",
            description: "خرید دوره Next.js",
            date: "۱۴۰۵/۰۴/۰۸",
            amount: 1800000,
            status: "pending",
            detailsHref: "/profile/orders/10236",
        },
        {
            id: "10237",
            description: "خرید دوره TypeScript",
            date: "۱۴۰۵/۰۴/۰۵",
            amount: 1200000,
            status: "canceled",
            detailsHref: "/profile/orders/10237",
        },
    ]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);

                // TODO:
                // این قسمت را بعداً با API واقعی جایگزین کن.
                // const data = await getOrders(accessToken);
                // setOrders(data);

                await new Promise((resolve) => setTimeout(resolve, 800));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="max-w-5xl" dir="rtl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-lg font-bold text-gray-900">
                    سفارش‌های من
                </h1>

                <button
                    className="w-9 h-9 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors"
                    aria-label="فیلتر"
                >
                    <SlidersHorizontal size={16} />
                </button>
            </div>

            {/* Loading */}
            {loading && (
                <div className="flex flex-col gap-3">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="h-16 bg-white rounded-2xl border border-gray-100 animate-pulse"
                        />
                    ))}
                </div>
            )}

            {/* Empty */}
            {!loading && orders.length === 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
                    <p className="text-4xl mb-3">🧾</p>

                    <p className="text-gray-700 font-medium">
                        هنوز سفارشی ثبت نکردی
                    </p>

                    <p className="text-sm text-gray-400 mt-2">
                        سفارش‌هایی که ثبت کنی اینجا نمایش داده می‌شوند.
                    </p>
                </div>
            )}

            {/* Desktop Table */}
            {!loading && orders.length > 0 && (
                <div className="hidden md:block overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm">
                    <table className="w-full text-sm">
                        <thead>
                        <tr className="border-b border-gray-100 text-gray-400 text-xs">
                            <th className="text-right py-4 px-6 font-medium">
                                شناسه
                            </th>

                            <th className="text-right py-4 px-6 font-medium">
                                شرح تراکنش
                            </th>

                            <th className="text-right py-4 px-6 font-medium">
                                تاریخ
                            </th>

                            <th className="text-right py-4 px-6 font-medium">
                                مبلغ
                            </th>

                            <th className="text-right py-4 px-6 font-medium">
                                وضعیت
                            </th>
                        </tr>
                        </thead>

                        <tbody>
                        {orders.map((order) => (
                            <tr
                                key={order.id}
                                className="border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors"
                            >
                                <td className="py-4 px-6 text-gray-500 tabular-nums">
                                    {order.id}
                                </td>

                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-2">
                                            <span className="font-medium text-gray-800">
                                                {order.description}
                                            </span>

                                        {order.detailsHref && (
                                            <Link
                                                href={order.detailsHref}
                                                className="text-xs text-blue-600 hover:underline"
                                            >
                                                (جزئیات)
                                            </Link>
                                        )}
                                    </div>
                                </td>

                                <td className="py-4 px-6 text-gray-500">
                                    {order.date}
                                </td>

                                <td className="py-4 px-6 font-bold text-gray-900 tabular-nums">
                                    {formatPrice(order.amount)}
                                </td>

                                <td className="py-4 px-6">
                                    <StatusBadge status={order.status} />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Mobile Cards */}
            {!loading && orders.length > 0 && (
                <div className="md:hidden flex flex-col gap-4">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4"
                        >
                            <div className="flex justify-between items-start mb-3 gap-3">
                                <div>
                                    <p className="font-medium text-gray-800">
                                        {order.description}
                                    </p>

                                    {order.detailsHref && (
                                        <Link
                                            href={order.detailsHref}
                                            className="text-xs text-blue-600 hover:underline mt-1 inline-block"
                                        >
                                            مشاهده جزئیات
                                        </Link>
                                    )}
                                </div>

                                <StatusBadge status={order.status} />
                            </div>

                            <div className="flex justify-between text-xs text-gray-400">
                                <span>شناسه: {order.id}</span>
                                <span>{order.date}</span>
                            </div>

                            <div className="mt-3 font-bold text-gray-900">
                                {formatPrice(order.amount)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function StatusBadge({ status }: { status: OrderStatus }) {
    const config = statusConfig[status];

    return (
        <span
            className={`inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-medium ${config.className}`}
        >
            {config.label}
        </span>
    );
}

function formatPrice(value: number) {
    if (value === 0) return "رایگان";

    return `${value.toLocaleString("fa-IR")} تومان`;
}

export default OrdersPage;