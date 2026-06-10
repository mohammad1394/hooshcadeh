import React from "react";
import Link from "next/link";

const Home = () => {
    return (
        <div>
            <div className="w-full my-5 md:w-[80%] mx-auto ">
                <img src="/assets/banner-hom-top.png" className={'w-full mb-5'} alt="" />
                <div className={"w-[80%] mx-auto bg-[#1E88E5] md:ml-auto md:mr-0 md:w-[200px] p-3  md:py-4 md:px-10 text-white rounded-lg"}>
                <Link  href={"/courses"} className={""}>مشاهده دوره‌ها </Link>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 bg-[#00C896] w-[80%] md:w-[100%] mx-auto my-10 rounded-[30px] bg-[url('/assets/pattern-main-widget.webp')] bg-no-repeat">
                    <div className="w-[70%] bg-white mx-auto my-5 p-5 rounded-[20px] ">
                        <div className="flex flex-col justify-center align-middle text-center">
                            <img className="w-[100px] mx-auto" src="/assets/podcast-icon.webp" alt="" />
                            <span className="direction-white-box-P">آموزش های با کیفیت</span>
                        </div>
                    </div>
                    <div className="w-[70%] bg-white mx-auto my-5 p-5 rounded-[20px]">
                        <div className="flex flex-col justify-center align-middle text-center">
                            <img className={"w-[100px] mx-auto"} src="/assets/video-icon.webp" alt="" />
                            <span>مشاهده در اسپات پلیر</span>
                        </div>
                    </div>
                    <div className="w-[70%] bg-white mx-auto my-5 p-5 rounded-[20px]">
                        <div className="flex flex-col justify-center align-middle text-center">
                            <img className={"w-[100px] mx-auto"} src="/assets/graduation-study-8582920-6786176.png" alt="" />
                            <span>انواع هوش مصنوعی</span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between w-[80%] mx-auto md:w-full ">
                    <div className="">
                        <b>دوره های آموزشی</b>
                        <p>شروع یادگیری</p>
                    </div>
                    <Link href={"/courses"}  className={"border border-2 py-3 px-2 text-[12px] md:py-2 md:px-7 mr-0 text-[#1E88E5] rounded-lg md:text-[16px] hover:bg-blue-600 hover:text-white transition"}> دوره‌های بیشتر </Link>
                </div>
                <div>
                </div>
            </div>
        </div>
    );
};

export default Home;
