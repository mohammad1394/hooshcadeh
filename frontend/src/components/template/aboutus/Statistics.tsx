import { GraduationCap, Code2, Users, Layers } from "lucide-react";

interface StatItem {
    value: string;
    label: string;
    icon: React.ReactNode;
    iconBg: string;
}

const stats: StatItem[] = [
    {
        value: "+50",
        label: "مدرس متخصص",
        icon: <GraduationCap className="w-6 h-6 text-white" />,
        iconBg: "bg-purple-500",
    },
    {
        value: "+300",
        label: "پروژه عملی",
        icon: <Code2 className="w-6 h-6 text-white" />,
        iconBg: "bg-sky-500",
    },
    {
        value: "+45K",
        label: "دانشجوی فعال",
        icon: <Users className="w-6 h-6 text-white" />,
        iconBg: "bg-orange-500",
    },
    {
        value: "+120",
        label: "دوره آموزشی",
        icon: <Layers className="w-6 h-6 text-white" />,
        iconBg: "bg-emerald-500",
    },
];

export default function StatsBanner() {
    return (
        <div
            dir="rtl"
            className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b1b3a] via-[#0e2a52] to-[#0b1b3a] px-6 py-10 sm:px-10"
        >
            {/* Decorative wave layers */}
            <svg
                className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
                viewBox="0 0 1000 300"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <path
                    d="M0,180 C150,240 300,120 500,160 C700,200 850,100 1000,150 L1000,300 L0,300 Z"
                    fill="#12336b"
                />
                <path
                    d="M0,220 C200,260 350,160 550,200 C750,240 900,160 1000,200 L1000,300 L0,300 Z"
                    fill="#173f80"
                    opacity="0.6"
                />
            </svg>

            <div className="relative grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-y-0">
                {stats.map((item) => (
                    <div
                        key={item.label}
                        className="flex flex-col items-center gap-3 text-center"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-white sm:text-3xl">
                                {item.value}
                            </span>
                            <span
                                className={`flex h-10 w-10 items-center justify-center rounded-full ${item.iconBg}`}
                            >
                                {item.icon}
                            </span>
                        </div>
                        <span className="text-sm text-slate-300 sm:text-base">
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}