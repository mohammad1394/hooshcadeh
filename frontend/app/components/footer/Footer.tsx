import React from 'react';
import Container from "@/app/components/Container";
import image from "../../../public/assets/logo.png"
import Link from "next/link";
function Footer() {
    return (
        <div className={"bg-[#2F3542]"}>
            <div className={"w-[90%] md:w-[80%] mx-auto py-20 text-white flex flex-col gap-5"}>
                  <div className={"grid grid-cols-2 lg:grid-cols-4 w-[100%] "}>
                      <div className={"col-span-2  lg:col-span-1 flex gap-5 flex-col"}>
                          <p className={"text-lg"}>ارتباط با ما</p>
                          <ul className={"flex gap-1 flex-col"}>
                              <li >
                                  09106043816
                              </li>
                              <li>
                                  info@TechnoHoosh.com
                              </li>
                          </ul>
                      </div>
                      <div className={" flex gap-5 my-10 lg:my-0 flex-col"}>
                          <p className={"text-lg"}>
                              دسترسی سریع
                          </p>
                          <ul className={"flex gap-5 flex-col"}>
                                <Link href={"/contactus"}>
                                    <li>
                                        تماس با ما
                                    </li>
                                </Link>
                                <Link href={"/aboutus"}>
                                    <li>
                                        درباره ما
                                    </li>
                                </Link>
                              <li>
                                  سبد خرید
                              </li>
                              <li>
                                  حساب کاربری من
                              </li>
                          </ul>
                      </div>
                      <div className={" flex gap-5 my-10 lg:my-0 flex-col"}>
                          <p className={"text-lg"}>بخش های سایت </p>
                          <ul className={"flex gap-5 flex-col text-[15px]"}>
                              <li>اشتراک ویژه</li>
                              <Link href={"/blogs"}>
                                  <li>وبلاگ </li>
                              </Link>
                             <Link href={"/courses"}>
                                 <li>دوره ها</li>
                             </Link>
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
                      <Link href={"telegram"} className={"bg-[#46A1E4] col-span-6 lg:col-span-1  p-4 text-center rounded-lg"}>
                          <p>تلگرام ما</p>
                      </Link>
                      <Link href={"instagram"} className={"bg-[#DB5A53] col-span-6 lg:col-span-1  p-4 text-center rounded-lg"}>
                          <p>اینستاگرام ما </p>
                      </Link>
                  </div>
            </div>
        </div>
    );
}

export default Footer;