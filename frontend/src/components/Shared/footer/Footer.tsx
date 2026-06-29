import React from "react";
import Link from "next/link";
import { Phone, Mail, Send, MessageCircle } from "lucide-react";
import Image from "next/image";
import {getSiteSettings} from "@/services/site-settings";

const quickAccess = [
    { title: "تماس با ما", link: "/contactus" },
    { title: "درباره ما", link: "/aboutus" },
    { title: "سبد خرید", link: "/cart" },
    { title: "حساب کاربری من", link: "/panel" },
];

const siteSections = [
    { title: "اشتراک ویژه", link: "/" },
    { title: "دوره‌ ها", link: "/courses" },
    { title: "مقالات ", link: "/blog" },
];

async function Footer() {

    const siteSettings = await getSiteSettings();


    return (
        <footer className="relative  text-white" dir="rtl">

            <div className="absolute top-0 right-0 left-0 -translate-y-[calc(100%-1px)] overflow-hidden leading-[0] pointer-events-none">
                <svg
                    className="relative block w-full h-[90px] sm:h-[100px] lg:h-[150px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 150"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="footerWaveBack" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#134e4a" />
                            <stop offset="100%" stopColor="#0f172a" />
                        </linearGradient>
                        <linearGradient id="footerWaveMid" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#0f3b3a" />
                            <stop offset="100%" stopColor="#13203a" />
                        </linearGradient>
                    </defs>

                    <path
                        d="M0,40 C200,110 400,0 600,50 C800,100 1000,10 1200,60 L1200,150 L0,150 Z"
                        fill="url(#footerWaveBack)"
                        opacity="0.35"
                    />

                    <path
                        d="M0,80 C220,30 430,130 650,80 C850,40 1050,120 1200,90 L1200,150 L0,150 Z"
                        fill="url(#footerWaveMid)"
                        opacity="0.6"
                    />

                    <path
                        d="M0,110 C250,150 450,70 700,110 C900,140 1050,90 1200,110 L1200,150 L0,150 Z"
                        fill="#0f172a"
                    />
                </svg>
            </div>


            <div className="relative bg-gradient-to-b from-[#0f172a] via-[#101b33] to-[#0a1120]  sm:pt-24 pb-10 overflow-hidden">
                {/* ambient glows */}
                <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-teal-500/10 blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 right-0 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl translate-x-1/3 translate-y-1/3" />

                <div className="relative w-[90%] md:w-[80%] h-full mx-auto py-10 flex flex-col gap-5">
                    <div className="grid grid-cols-2 lg:grid-cols-4 w-full gap-y-10 gap-x-5">

                        <div className="col-span-2 lg:col-span-1 flex gap-5 flex-col">
                            <p className="text-lg font-semibold">ارتباط با ما</p>
                            <ul className="flex gap-3 flex-col">
                                <li className="flex items-center gap-2 hover:text-emerald-400 hover:-translate-x-2 transition-all duration-300">
                                    <Phone size={16} className="shrink-0" />
                                    <span dir="ltr">{siteSettings.phone_number_site}</span>
                                </li>
                                <li className="flex items-center gap-2 hover:text-emerald-400 hover:-translate-x-2 transition-all duration-300">
                                    <Mail size={16} className="shrink-0" />
                                    <span dir="ltr">{siteSettings.email_site}</span>
                                </li>
                            </ul>
                        </div>


                        <div className="flex gap-5 flex-col">
                            <p className="text-lg font-semibold">دسترسی سریع</p>
                            <ul className="flex gap-3 flex-col">
                                {quickAccess.map((item) => (
                                    <li key={item.title}>
                                        <Link
                                            href={item.link}
                                            className="hover:text-emerald-400 hover:-translate-x-2 transition-all duration-300 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-sm"
                                        >
                                            {item.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>


                        <div className="flex gap-5 flex-col">
                            <p className="text-lg font-semibold">بخش های سایت</p>
                            <ul className="flex gap-3 flex-col text-[15px]">
                                {siteSections.map((item) => (
                                    <li key={item.title}>
                                        <Link
                                            href={item.link}
                                            className="hover:text-emerald-400 hover:-translate-x-2 transition-all duration-300 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-sm"
                                        >
                                            {item.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="col-span-2 lg:col-span-1 flex flex-col gap-5 items-center lg:items-end text-center lg:text-right">
                            <p className="text-lg font-semibold">مجوز ها</p>
                            <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                                <Image
                                    src="/assets/namad.png"
                                    alt="نماد اعتماد"
                                    className="w-[100px]"
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <div className={"flex flex-row gap-5"}>
                                <Link
                                    href={siteSettings.eitaa}
                                    className="bg-[#C38E0A] flex items-center justify-center gap-2 col-span-1 lg:col-span-1 p-4 text-center rounded-lg transition-transform duration-300 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                                >
                                    <MessageCircle size={18} />

                                </Link>

                                <Link
                                    href={siteSettings.telegram}
                                    className="bg-gradient-to-tr from-[#0088cc] to-[#00aaff] flex items-center justify-center gap-2 col-span-1 lg:col-span-1 p-4 text-center rounded-lg transition-transform duration-300 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                                >
                                    <Send size={18} />

                                </Link>
                            </div>
                        </div>
                    </div>
                        <hr className={"text-white"}/>
                    <div className="flex flex-row justify-between">
                        <p className="">
                            © تمامی حقوق برای مجموعه  {siteSettings.site_name}محفوظ می‌باشد

                        </p>
                        <p>
                            Designed & Developed by <span className="text-white font-medium">Mohammad Razaviyan</span>
                        </p>

                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;