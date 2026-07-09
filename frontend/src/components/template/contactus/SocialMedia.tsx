import Image from "next/image";
import img from "../../../../public/assets/3_telegram_icon.png"
const socials = [
    {

        title: "تلگرام",
        value: "@hooshcadeh",
        image : "/assets/3_telegram_icon.png"
    },
    {

        title: "اینستاگرام",
        value: "@hooshcadeh.academy",
        image : "/assets/4_instagram_icon.png"
    },
    {

        title: "واتساپ",
        value: "09121234567",
        image : "/assets/5_whatsapp_icon.png"
    },
    {

        title: "لینکدین",
        value: "Hooshcadeh",
        image : "/assets/6_linkedin_icon.png"
    },
];

export default function SocialMedia() {
    return (
        <section className="container mx-auto px-6 py-14">

            <h2 className="text-3xl font-bold text-center mb-10">
                راه‌های ارتباطی
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                {socials.map((item, index) => {



                    return (
                        <div
                            key={index}
                            className="bg-white rounded-3xl border p-8 text-center shadow-sm hover:shadow-xl duration-300 hover:-translate-y-2"
                        >


                            <div className="w-16 h-16 rounded-full bg-green-50 mx-auto flex items-center justify-center">
                                <Image
                                    src={item.image}
                                    width={320}
                                    height={320}
                                    alt="Telegram"
                                />
                            </div>

                            <h3 className="font-bold text-xl mt-5">
                                {item.title}
                            </h3>

                            <p className="text-gray-500 mt-2">
                                {item.value}
                            </p>

                            <button className="mt-6 border border-green-600 text-green-600 px-6 py-2 rounded-xl hover:bg-green-600 hover:text-white duration-300">
                                مشاهده
                            </button>

                        </div>
                    );
                })}
            </div>
        </section>
    );
}