import React from 'react';
import Link from "next/link";
import { link } from 'fs';

const QuickAccess = [
      {
        titile :  "تماس با ما" ,
        link : "/contactus"
      },
            {
        titile : "درباه ما" ,
        link : "/aboutus"
      },
      {
        titile : "سبد خرید" ,
        link : "/"
      },
            {
        titile : "حساب کاربری من",
        link : "/"
      },
]
const links = [
          {
        titile :  " اشتراک ویژه" ,
        link : "/"
      },
       {
        titile :  " دوره ها" ,
        link : "/courses"
      },
             {
        titile : "وبلاگ" ,
        link : "/blog"
      },
]

function Footer() {
    return (
        <div className={"bg-[#2F3542]"}>
            <div className={"w-[90%] md:w-[80%] mx-auto py-20 text-white flex flex-col gap-5"}>
                  <div className={"grid grid-cols-2 lg:grid-cols-4 w-[100%] "}>
                      <div className={"col-span-2  lg:col-span-1 flex gap-5 flex-col"}>
                          <p className={"text-lg"}>ارتباط با ما</p>
                          <ul className={"flex gap-1 flex-col"}>
                              <li className='hover:text-green-500 hover:-translate-x-2 transition-all duration-300'>
                                  09106043816
                              </li>
                              <li className='hover:text-green-500 hover:-translate-x-2 transition-all duration-300'>
                                  info@TechnoHoosh.com
                              </li>
                          </ul>
                      </div>
                      <div className={" flex gap-5 my-10 lg:my-0 flex-col"}>
                          <p className={"text-lg"}>
                              دسترسی سریع
                          </p>
                          <ul className={"flex gap-5 flex-col"}>
                            {
                                QuickAccess.map((item  => (
                                <Link href={item.titile} key={item.titile} className='hover:text-green-500 hover:-translate-x-2 transition-all duration-300'>
                                    <li>
                                        {item.titile}
                                    </li>
                                </Link>
                                )))
                            }
                          </ul>
                      </div>
                      <div className={" flex gap-5 my-10 lg:my-0 flex-col"}>
                          <p className={"text-lg"}>بخش های سایت </p>
                          <ul className={"flex gap-5 flex-col text-[15px]"}>
                                {
                                    links.map((link) => (
                                     <Link href={link.link} key={link.titile} className='hover:text-green-500 hover:-translate-x-2 transition-all duration-300'>
                                         <li>
                                          {link.titile}
                                         </li>
                                      </Link>
                                    ))
                                }
                          </ul>
                      </div>
                      <div className={"col-span-2 lg:col-span-1 text-center lg:text-left flex gap-5 flex-col"}>
                          <p>
                              مجوز ها
                          </p>
                          <img src={"/assets/logo.png"} alt="namad etemad" className={"w-[100px] mx-auto lg:mx-0 lg:mr-auto "}/>
                      </div>
                  </div>
                  <div className={"grid grid-cols-6 gap-5 mt-5"}>
                      <p className={"bg-[#475A6E] col-span-6 lg:col-span-3  text-[11px] lg:text-[15px] p-4 rounded-lg"}>© تمامی حقوق برای مجموعه «تکنو هوش» محفوظ میباشد | طراح سایت </p>
                      <Link href={"https://web.eitaa.com/#@Draarezaie"} className={"bg-[#C38E0A] col-span-6 lg:col-span-1 p-4 text-center rounded-lg"}>
                          <p>ایتا</p>
                      </Link>
                      <Link href={"telegram"} className={"bg-gradient-to-tr from-[#0088cc] to-[#00aaff] col-span-6 lg:col-span-1  p-4 text-center rounded-lg"}>
                          <p>تلگرام ما</p>
                      </Link>
                      <Link href={"instagram"} className={"bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] col-span-6 lg:col-span-1  p-4 text-center rounded-lg"}>
                          <p>اینستاگرام ما </p>
                      </Link>
                  </div>
            </div>
        </div>
    );
}

export default Footer;