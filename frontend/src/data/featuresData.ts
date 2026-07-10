import {
    GraduationCap,
    Target,
    Users,
    BadgeCheck,
} from "lucide-react";

export const features = [
    {
        id: 1,
        title: "آموزش کاربردی",
        description:
            "محتواهای عملی و پروژه‌محور با مثال‌های واقعی.",
        icon: GraduationCap,
        color: "bg-green-100 text-green-600",
    },
    {
        id: 2,
        title: "مسیر یادگیری",
        description:
            "آموزش‌های گام‌به‌گام برای ورود به بازار کار.",
        icon: Target,
        color: "bg-orange-100 text-orange-500",
    },
    {
        id: 3,
        title: "جامعه فعال",
        description:
            "پشتیبانی و تعامل با مدرس و سایر دانشجویان.",
        icon: Users,
        color: "bg-sky-100 text-sky-500",
    },
    {
        id: 4,
        title: "کیفیت تضمینی",
        description:
            "تمامی دوره‌ها توسط مدرسین متخصص تهیه شده‌اند.",
        icon: BadgeCheck,
        color: "bg-purple-100 text-purple-500",
    },
];