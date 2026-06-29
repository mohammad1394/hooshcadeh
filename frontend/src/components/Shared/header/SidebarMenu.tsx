import React from 'react';
import { FaTimes } from "react-icons/fa";
import Link from "next/link";

interface Props {
    menuState: boolean;
    toggleMenu: () => void;
}

function SidebarMenu({ menuState, toggleMenu }: Props) {
    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
                    menuState ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
                onClick={toggleMenu}
            />

            {/* Sidebar */}
            <div
                className={`w-1/2 sm:w-1/3 bg-gray-800 h-screen text-white fixed top-0 right-0 text-right p-5 z-50 transition-transform duration-300 ${
                    menuState ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <ul className="flex flex-col gap-5">
                    <li
                        className="cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 inline-block p-2 rounded"
                        onClick={toggleMenu}
                    >
                        <FaTimes />
                    </li>

                    <Link href="/" onClick={toggleMenu}>
                        <li className="cursor-pointer hover:bg-indigo-500 p-2 rounded transition">
                            خانه
                        </li>
                    </Link>
                    <Link href="/courses" onClick={toggleMenu}>
                        <li className="cursor-pointer hover:bg-indigo-500 p-2 rounded transition">
                            دوره ها
                        </li>
                    </Link>
                    <Link href="/articles" onClick={toggleMenu}>
                        <li className="cursor-pointer hover:bg-indigo-500 p-2 rounded transition">
                            مقالات
                        </li>
                    </Link>
                    <Link href="/aboutus" onClick={toggleMenu}>
                        <li className="cursor-pointer hover:bg-indigo-500 p-2 rounded transition">
                            درباره ما
                        </li>
                    </Link>

                    <Link href="/contactus" onClick={toggleMenu}>
                        <li className="cursor-pointer hover:bg-indigo-500 p-2 rounded transition">
                            ارتباط با ما
                        </li>
                    </Link>

                    <li className="cursor-pointer hover:bg-indigo-500 p-2 rounded transition">
                        ورود
                    </li>

                    <li className="cursor-pointer hover:bg-indigo-500 p-2 rounded transition">
                        ثبت نام
                    </li>
                </ul>
            </div>
        </>
    );
}

export default SidebarMenu;