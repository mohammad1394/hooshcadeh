import React from 'react';
import { FaTimes} from "react-icons/fa";
import Link from "next/link";

interface Props {
    menuState : boolean;
    toggleMenu : () => void;
}
function SidebarMenu({menuState , toggleMenu }: Props) {
    return (
        <>

            {
                menuState &&  <div className={"w-1/2 bg-gray-800 h-[130vh] text-white fixed  top-0 right-0 text-right p-5 transition-all transition-discrete "}>
                    <ul className={"flex flex-col gap-5"}>
                        <li className=" transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 "  onClick={toggleMenu}>
                            <FaTimes  />
                        </li>
                      <Link href={"/public"}>
                        <li >
                            خانه
                        </li>
                      </Link>
                        <Link href={"/aboutus"}>
                        <li >
                            درباره ما
                        </li>
                        </Link>
                        <Link href={"/contactus"}>
                        <li >
                            ارتباط با ما
                        </li>
                        </Link>
                        <li >
                            ورود
                        </li>
                        <li >
                            ثبت نام
                        </li>

                    </ul>
                </div>
            }
        </>
    );
}

export default SidebarMenu;