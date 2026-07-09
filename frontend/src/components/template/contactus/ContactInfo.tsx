import {
    Mail,
    Phone,
    MapPin,
} from "lucide-react";

const items = [
    {
        icon: Mail,
        title: "ایمیل",
        value: "info@hooshcadeh.ir",
        desc: "پاسخگویی از طریق ایمیل",
        href: "mailto:info@hooshcadeh.ir",
    },
    {
        icon: Phone,
        title: "تلفن",
        value: "041-12345678",
        desc: "شنبه تا چهارشنبه | 9 الی 18",
        href: "tel:04112345678",
    },
    {
        icon: MapPin,
        title: "آدرس",
        value: "تهران، خیابان پیروزی",
        desc: "دفتر مرکزی",
        href: "#",
    },
];

export default function ContactInfo() {
    return (
        <section className="container mx-auto px-6 py-14">

            <div className="grid gap-8 md:grid-cols-3">

                {items.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <a
                            key={index}
                            href={item.href}
                            className="
              group
              flex
              items-center
              justify-between
              rounded-3xl
              border
              border-gray-200
              bg-white
              p-8
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-2
              hover:border-green-500
              hover:shadow-2xl
            "
                        >
                            <div className="space-y-3 text-right">

                                <h3 className="text-xl font-bold text-gray-800">
                                    {item.title}
                                </h3>

                                <p className="font-medium text-gray-700 transition-colors group-hover:text-green-600">
                                    {item.value}
                                </p>

                                <p className="text-sm text-gray-400">
                                    {item.desc}
                                </p>

                            </div>

                            <div
                                className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-green-100
                to-green-50
                transition-all
                duration-300
                group-hover:scale-110
                group-hover:rotate-6
              "
                            >
                                <Icon
                                    size={30}
                                    className="text-green-600"
                                    strokeWidth={2.2}
                                />
                            </div>
                        </a>
                    );
                })}

            </div>
        </section>
    );
}