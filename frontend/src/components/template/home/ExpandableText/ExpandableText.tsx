"use client";
import { useState } from "react";
import Container from "@/components/Layout/container/Container";

export default function ExpandableText() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Container>
            <div className="relative text-right bg-white my-30 p-10 rounded-lg">

                <div
                    className={`relative text-gray-700 leading-8 transition-all duration-500 overflow-hidden ${
                        isOpen ? "max-h-[3000px]" : "max-h-[220px]"
                    }`}
                >
                    <p className="mb-4">
                        با دوره‌های سبزلرن برنامه‌نویس حرفه‌ای شوید! اگر در ابتدای مسیر یادگیری
                        برنامه‌نویسی قرار دارید یا بعد از چند سال فعالیت حرفه‌ای به‌عنوان
                        برنامه‌نویس به‌دنبال فتح قله‌های جدید در این حوزه هستید، دوره‌های سبزلرن
                        شما را به هدفتان می‌رسانند.
                    </p>

                    <p className="mb-4">
                        آموزش برنامه نویسی به سبکی منحصربه فرد. شمایی که وارد این صفحه شدید،
                        احتمالا قبلا با چند مرکز آموزش دوره برنامه نویسی آشنا شده و احتمالا بعد
                        از این هم به تحقیقتون ادامه میدید.
                    </p>

                    <p className="mb-2 font-semibold">۱. آموزش برنامه نویسی رایگان</p>
                    <p className="mb-4">
                        سبزلرن اعتقاد داره ورود هر علاقه مندی به دنیای آموزش کدنویسی باید بدون
                        ریسک باشه و هیچ دغدغه ای جز تمرکز روی یادگیری در ذهن اون فرد نباشه.
                    </p>

                    <p className="mb-2 font-semibold">۲. آموزش کدنویسی بدون ریسک</p>
                    <p className="mb-4">
                        با توجه به مورد قبلی، کاملا واضحه که نگرش سبزلرن، دریافت هزینه آموزش
                        برنامه نویسی از کسانی هست که مسیر قطعی خودشون رو پیدا کردن.
                    </p>

                    <p className="mb-2 font-semibold">۳. آموزش صفر تا صد برنامه نویسی واقعی!</p>
                    <p className="mb-4">
                        سرفصل های هر تخصص برنامه نویسی به صورت بین المللی تدوین شده اما گاهی
                        برای ایرانی ها به دلیل محدودیت ها و مسائل تکنیکی کدنویسی، این سرفصل ها
                        باید بومی سازی شده و با مثال ها و پروژه های ایرانی تدریس بشن.
                    </p>

                    <p className="mb-2 font-semibold">۴. دوره برنامه نویسی با تضمین نقد</p>
                    <p className="mb-4">
                        سبزلرن به عنوان ضمانت پیش‌دستانه، ۲۰ الی ۴۰ درصد همه دوره های پولی رو هم
                        به رایگان در اختیار علاقه‌مندان گذاشته.
                    </p>

                    <p className="mb-2 font-semibold">۵. آموزش برنامه نویسی از صفر با همراهی پشتیبان مسلط</p>
                    <p className="mb-4">
                        سبزلرن اعتقاد داره ارائه آموزش برنامه نویسی به تنهایی، لزوما به معنی
                        تربیت یک برنامه نویس حرفه ای نیست.
                    </p>

                    <p className="mb-2 font-semibold">۶. یادگیری برنامه نویسی با چشم باز</p>
                    <p>
                        آخرین نکته هم توصیه ما به مطالعه کامنت دانشجوهای قبلی سبزلرن هست که در
                        صفحه هر دوره آموزش برنامه نویسی میتونید مطالعه کنید.
                    </p>
                </div>

                {/* افکت fade پایین (فقط وقتی بسته‌ست) */}
                {!isOpen && (
                    <div className="pointer-events-none absolute bottom-12 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
                )}

                {/* دکمه */}
                <div className="mt-4 flex justify-center">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="relative z-10 text-green-500 font-semibold bg-white px-4 py-2 rounded-full shadow hover:text-green-600 transition"
                    >
                        {isOpen ? "نمایش کمتر −" : "نمایش بیشتر +"}
                    </button>
                </div>
            </div>
        </Container>
    );
}