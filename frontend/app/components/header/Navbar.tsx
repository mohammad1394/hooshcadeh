"use client"
import React, { useState } from 'react';;
import Link from "next/link";
import { FaBars, FaTimes } from 'react-icons/fa';
import Image from "next/image";
import SidebarMenu from "@/app/components/header/SidebarMenu";

function Navbar({ onOpenAuthModal }: { onOpenAuthModal: () => void }) {

    const menus = [
        {

            link: "/",
            title: "خانه ",
        },
        {
            link: "/courses",
            title: "دوره ها",
        },
        {
            link: "/blogs",
            title: "وبلاگ",
        }
        ,
        {
            link: "/contactus",
            title: "ارتباط با ما",
        },
        {
            link: "/aboutus",
            title: "درباره ما",
        }
    ];
    const [menuisOpen, setMenuOpen] = useState(false);
    function toggleMenu() {
        setMenuOpen(!menuisOpen);
    }
    return (
        <header className={
            "bg-[#00669980] flex  w-[100%] md:w-[90%] h-[90px] " +
            " md:mx-auto md:mt-[20px]  md:rounded-full text-[#fff]"
        } >
            <div className={"flex justify-between w-[100%] px-[20px] md:[85%]  xl:w-[80%] mx-auto " }>
                <nav  className={"my-auto"}>
                    <button className=' lg:hidden' onClick={toggleMenu}><FaBars/></button>
                    {menus.map((menu) => (

                        <Link href={menu.link} key={menu.title}
                              className={"hidden lg:inline lg:border-b-2 border-transparent hover:border-[#000] mr-5 py-2 "}

                        >
                            <span>{menu.title}  </span>
                        </Link>

                    ))}

                    <SidebarMenu menuState = {menuisOpen} toggleMenu={toggleMenu} />

                </nav>
                <Image
                    src="/assets/Untitled-3.webp"
                    alt="Logo"
                    width={100}
                    height={80}
                    className="mx-auto h-[90%] w-auto"
                />

                <div className='hidden  lg:flex justify-between gap-[20px] '>

                    <button className='
                                 bg-[#00c896] border-white border-1 rounded-[15px]  h-[40%] lg:h-[55%] text-[10px] lg:text-[16px]
                                  my-auto py-[8px] px-[11px] align-middle flex justify-items-center
                                '>سبد خرید
                    </button>

                    <button
                        onClick={onOpenAuthModal}
                        className="bg-[#006599] border-[#006599] rounded-[15px] h-[40%] lg:h-[55%] text-[10px] lg:text-[16px] py-[10px] px-[11px] lg:py-[10px] lg:px-[35px] my-auto"
                    >
                        ورود/عضویت
                    </button>

                </div>


            </div>

        </header>

    )
}
export default Navbar;