import React from 'react';

function ArticleCard() {
    return (
        <div className="bg-white rounded-xl relative my-10">
            <div className='flex flex-col gap-2 h-105'>
                {/* استفاده از product.image و product.title */}
                <img src={"/assets/47848.webp"} alt={"jornal photo"} className={"rounded-xl"}/>

                <p className='p-slideri px-3'>مکالمه آسان عربی در اربعین با هوش مصنوعی</p>
                <p className='line-clamp-2 text-gray-500 text-[16px] px-3'>
                    در آستانه مراسم بزرگ اربعین، یکی از مهم‌ترین دغدغه‌های زائران ایرانی که به زیارت کربلا می‌روند، برقراری ارتباط موثر و سریع با مردم عرب‌زبان است. زبان عربی به عنوان زبان اصلی کشورهای میزبان، از اهمیت ویژه‌ای برخوردار است. اگر شما هم قصد شرکت در این مراسم را دارید و می‌خواهید به راحتی با مردم عراق و دیگر زائران عرب‌زبان ارتباط برقرار کنید، ما یک راهکار ساده و کارآمد برای شما داریم. در این مقاله به بررسی روش استفاده از ابزار ChatGPT برای مکالمه صوتی عربی خواهیم پرداخت و در پایان، یک کلیپ آموزشی در این زمینه قرار داده‌ایم.
                </p>
                <div className={"flex flex-row justify-between mt-5 px-3"}>
                    <p>عباسعلی رضایی</p>
                    <p>1405/02/31</p>
                </div>
            </div>
            <button className={"bg-[#1D9E75] text-white w-[90%] p-3 absolute rounded-xl -bottom-5 left-4.5"}>
                مطالعه
            </button>
        </div>
    );
}

export default ArticleCard;