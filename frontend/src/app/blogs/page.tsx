import React from 'react';
import Container from "@/components/Layout/container/Container";
function Page() {
    return (
        <div>

            <div className={"w-full py-15 my-10 bg-[#0CAC67] bg-[url('/assets/pattern-main-widget.webp')] bg-no-repeat"}>
                <Container>
                <h2 className={"text-3xl "}>وبلاگ</h2>
                <h5 className={"text-xl"}>جدیدترین مقالات آموزشی در تکنو هوش</h5>
                </Container>
            </div>
            <Container>


                <div  className="text-right grid grid-cols-1 md:grid-cols-3 mt-20 mb-30 gap-6">
                    <div className="bg-white p-3">
                        <div className='flex flex-col gap-4'>
                            {/* استفاده از product.image و product.title */}
                            <img src={"/assets/47848.webp"} alt={"jornal photo"} className={"rounded-xl"}/>

                            <p className='p-slideri'>مکالمه آسان عربی در اربعین با هوش مصنوعی</p>
                            <p className='line-clamp-2 text-gray-500 text-[16px]'>
                                در آستانه مراسم بزرگ اربعین، یکی از مهم‌ترین دغدغه‌های زائران ایرانی که به زیارت کربلا می‌روند، برقراری ارتباط موثر و سریع با مردم عرب‌زبان است. زبان عربی به عنوان زبان اصلی کشورهای میزبان، از اهمیت ویژه‌ای برخوردار است. اگر شما هم قصد شرکت در این مراسم را دارید و می‌خواهید به راحتی با مردم عراق و دیگر زائران عرب‌زبان ارتباط برقرار کنید، ما یک راهکار ساده و کارآمد برای شما داریم. در این مقاله به بررسی روش استفاده از ابزار ChatGPT برای مکالمه صوتی عربی خواهیم پرداخت و در پایان، یک کلیپ آموزشی در این زمینه قرار داده‌ایم.
                            </p>

                        </div>
                        <div className={"flex flex-row gap-5 mt-5"}>
                            <p>عباسعلی رضایی</p>
                            <p>1405/02/31</p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Page;