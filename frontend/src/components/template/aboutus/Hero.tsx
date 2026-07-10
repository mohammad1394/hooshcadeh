import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 via-white to-white">

            <div className="container mx-auto px-6 py-20">

                <div className="grid lg:grid-cols-2 gap-14 items-center">

                    {/* Right */}

                    <div className="text-center lg:text-right">

            <span className="inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-sm text-orange-600 mb-6">
              درباره هوشکده
            </span>

                        <h1 className="text-5xl lg:text-6xl font-black leading-[80px] text-slate-800">

                            درباره

                            <span className="block text-orange-500">
                هوشکده
              </span>

                        </h1>

                        <p className="mt-8 text-gray-500 leading-9">

                            ما باور داریم آموزش باکیفیت،
                            مسیر آینده‌ی حرفه‌ای هر فرد را
                            تغییر می‌دهد.

                            هوشکده با هدف آموزش کاربردی
                            و پروژه‌محور ایجاد شده است.

                        </p>

                        <Link
                            href="/courses"
                            className="inline-flex items-center gap-2 mt-10 bg-orange-500 hover:bg-orange-600 duration-300 rounded-xl px-8 py-4 text-white font-bold"
                        >

                            همین حالا شروع کنید

                            <ArrowLeft size={18} />

                        </Link>

                    </div>

                    {/* Left */}

                    <div className="flex justify-center">

                        <Image
                            src="/assets/1_laptop_phone_scene.png"
                            alt="about"
                            width={650}
                            height={500}
                            priority
                            className="w-full max-w-xl"
                        />

                    </div>

                </div>

            </div>

            <div className="absolute -top-32 left-0 w-72 h-72 bg-orange-200 rounded-full blur-[120px] opacity-40" />

            <div className="absolute bottom-0 right-0 w-72 h-72 bg-green-100 rounded-full blur-[120px] opacity-40" />

        </section>
    );
}