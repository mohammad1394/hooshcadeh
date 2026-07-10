import { Rocket, Eye, Target } from "lucide-react";

const items = [
    {
        icon: Rocket,
        title: "ماموریت ما",
        description:
            "ایجاد بستری برای آموزش مهارت‌های کاربردی و ورود سریع‌تر دانشجویان به بازار کار.",
        color: "coral",
    },
    {
        icon: Target,
        title: "ارزش‌های ما",
        description:
            "کیفیت آموزش، پشتیبانی واقعی، یادگیری پروژه‌محور و رشد مستمر دانشجویان.",
        color: "teal",
    },
    {
        icon: Eye,
        title: "چشم‌انداز",
        description:
            "تبدیل شدن به یکی از معتبرترین پلتفرم‌های آموزش آنلاین حوزه فناوری در ایران.",
        color: "purple",
    },
] as const;

const colorMap = {
    coral: {
        iconBg: "bg-orange-50",
        icon: "text-orange-500",
        accent: "bg-orange-500",
        ring: "group-hover:ring-orange-100",
    },
    teal: {
        iconBg: "bg-teal-50",
        icon: "text-teal-600",
        accent: "bg-teal-500",
        ring: "group-hover:ring-teal-100",
    },
    purple: {
        iconBg: "bg-violet-50",
        icon: "text-violet-600",
        accent: "bg-violet-500",
        ring: "group-hover:ring-violet-100",
    },
};

export default function MissionVision() {
    return (
        <section className="container mx-auto px-6 py-24" dir="rtl">
            <div className="text-center mb-16">
                <span className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 text-sm font-medium px-5 py-2 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    چرا هوشکده؟
                </span>

                <h2 className="text-3xl sm:text-4xl font-black mt-6 text-gray-900">
                    ماموریت و چشم‌انداز
                </h2>

                <p className="text-gray-500 mt-4 max-w-xl mx-auto leading-8">
                    آنچه هوشکده را از یک دوره آموزشی معمولی متمایز می‌کند.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {items.map((item, index) => {
                    const Icon = item.icon;
                    const c = colorMap[item.color];

                    return (
                        <div
                            key={index}
                            className={`
                                group
                                relative
                                flex flex-col
                                rounded-[28px]
                                bg-white
                                border border-gray-100
                                p-9
                                ring-1 ring-transparent
                                ${c.ring}
                                shadow-[0_2px_20px_rgba(0,0,0,0.04)]
                                hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]
                                hover:-translate-y-1.5
                                transition-all duration-300
                            `}
                        >
                            <span
                                className={`absolute top-0 right-9 h-1 w-10 rounded-full ${c.accent}`}
                            />

                            <div
                                className={`w-14 h-14 rounded-2xl ${c.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}
                            >
                                <Icon className={c.icon} size={26} strokeWidth={2} />
                            </div>

                            <h3 className="font-bold text-xl mt-7 text-gray-900">
                                {item.title}
                            </h3>

                            <p className="text-gray-500 leading-8 mt-3 text-[15px]">
                                {item.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}