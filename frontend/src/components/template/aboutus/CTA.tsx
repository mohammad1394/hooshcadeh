import { ArrowLeft, GraduationCap } from "lucide-react";
import Image from "next/image";

export default function CtaBanner() {
    return (
        <section className="container mx-auto px-6 py-12 mb-25" dir="rtl">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-orange-50 via-orange-50/60 to-white border border-orange-100 px-8 py-10 sm:px-12">
                <div className="flex flex-col-reverse lg:flex-row-reverse items-center justify-between gap-8">
                    <div className="flex flex-col items-start gap-5 text-right">
                        <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-relaxed">
                            همین حالا یادگیری را شروع کنید
                        </h2>

                        <p className="text-gray-500 text-sm sm:text-base leading-8">
                            به جمع هزاران دانشجوی هوشکده بپیوندید و آینده‌ی خود را بسازید.
                        </p>

                        <button
                            className="
                                inline-flex items-center gap-2
                                bg-orange-500 hover:bg-orange-600
                                text-white font-medium
                                px-7 py-3.5
                                rounded-full
                                transition-colors duration-300
                                shadow-[0_8px_20px_rgba(249,115,22,0.25)]
                            "
                        >
                            <ArrowLeft size={18} />
                            مشاهده دوره‌ها
                        </button>
                    </div>

                    <div className="shrink-0">
                        <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-white/70 flex items-center justify-center">
                          <Image
                              src="/assets/graduation-illustration.png"
                              alt="فارغ‌التحصیلی"
                              width={200}
                              height={200}
                              className="object-contain"
                          />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}