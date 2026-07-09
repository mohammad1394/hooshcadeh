import Image from "next/image";
import Link from "next/link";
import image from "../../../../public/assets/1_laptop_phone_scene.png"
export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 via-white to-white">
            <div className="container mx-auto px-6 py-20">

                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Text */}
                    <div className="order-2 lg:order-1 text-center lg:text-right">

            <span className="inline-block rounded-full bg-orange-100 text-orange-500 px-4 py-2 text-sm mb-5">
              ارتباط با تیم هوشکده
            </span>

                        <h1 className="text-5xl font-black leading-[70px] text-slate-800">
                            ارتباط <span className="text-orange-500">با ما</span>
                        </h1>

                        <p className="text-gray-500 leading-9 mt-8">
                            هر سوال، پیشنهاد یا انتقادی دارید،
                            تیم هوشکده همیشه پاسخگوی شماست.
                        </p>

                        <Link
                            href="#contact-form"
                            className="inline-flex mt-10 items-center justify-center rounded-xl bg-orange-500 hover:bg-orange-600 duration-300 px-8 py-4 text-white font-bold"
                        >
                            ارسال پیام
                        </Link>

                    </div>

                    {/* Image */}
                    <div className="order-1 lg:order-2 flex justify-center">

                        <Image
                            src="/assets/1_laptop_phone_scene.png"
                            width={550}
                            height={400}
                            alt="contact"
                            className="w-full max-w-xl"
                        />

                    </div>

                </div>

            </div>
        </section>
    );
}