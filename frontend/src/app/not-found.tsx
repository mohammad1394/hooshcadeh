import Link from "next/link";

export default function NotFound() {
    return (
        <div
            dir="rtl"
            className="min-h-screen bg-[#F5F7FB] flex items-center justify-center px-6"
        >
            <div className="relative w-full max-w-md text-center">

                {/* دایره‌های دکوراتیو پس‌زمینه */}
                <div className="absolute -top-16 -right-10 w-40 h-40 rounded-full bg-[#1D4ED8]/5 blur-2xl" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-[#7C3AED]/5 blur-2xl" />

                {/* ربات گم‌شده */}
                <div className="relative mx-auto mb-6 w-28 h-28 rounded-3xl bg-gradient-to-br from-[#1E3A6E] to-[#1D4ED8] flex items-center justify-center shadow-lg">
                    <svg
                        width="56"
                        height="56"
                        viewBox="0 0 56 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* آنتن */}
                        <line x1="28" y1="4" x2="28" y2="10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="28" cy="3" r="2.5" fill="white" />

                        {/* سر ربات */}
                        <rect x="12" y="10" width="32" height="26" rx="9" fill="white" />

                        {/* چشم‌ها - یکی گیج، یکی عادی */}
                        <circle cx="21" cy="23" r="3.5" fill="#1D4ED8" />
                        <circle cx="35" cy="23" r="3.5" fill="#1D4ED8">
                            <animate
                                attributeName="cy"
                                values="23;20;23"
                                dur="2.2s"
                                repeatCount="indefinite"
                            />
                        </circle>

                        {/* دهان گیج (موج‌دار) */}
                        <path
                            d="M20 30 Q24 33 28 30 T36 30"
                            stroke="#1D4ED8"
                            strokeWidth="2"
                            strokeLinecap="round"
                            fill="none"
                        />

                        {/* بدنه */}
                        <rect x="18" y="38" width="20" height="12" rx="4" fill="white" fillOpacity="0.85" />
                    </svg>
                </div>

                <p className="text-7xl font-extrabold text-[#1D4ED8] tracking-tight leading-none">
                    404
                </p>

                <h1 className="text-xl font-bold text-gray-900 mt-4">
                    ربات هوشکده این صفحه رو پیدا نکرد!
                </h1>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                    صفحه‌ای که دنبالشی یا جابه‌جا شده، یا اصلاً وجود نداشته.
                    <br />
                    بریم یه مسیر درست رو با هم پیدا کنیم.
                </p>

                <div className="flex items-center justify-center gap-3 mt-7">
                    <Link
                        href="/"
                        className="px-6 py-2.5 rounded-xl bg-[#1D4ED8] text-white text-sm font-medium hover:bg-[#1742b8] transition-colors shadow-sm"
                    >
                        بازگشت به خانه
                    </Link>
                    <Link
                        href="/panel"
                        className="px-6 py-2.5 rounded-xl bg-white text-gray-700 text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                        پنل کاربری
                    </Link>
                </div>
            </div>
        </div>
    );
}