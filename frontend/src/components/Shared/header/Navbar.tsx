import Link from "next/link";
import NavbarActions from "./NavbarActions";

function Navbar() {

    const menus = [
        { link: "/", title: "خانه" },
        { link: "/courses", title: "دوره ها" },
        { link: "/articles", title: "وبلاگ" },
        { link: "/contactus", title: "ارتباط با ما" },
        { link: "/aboutus", title: "درباره ما" }
    ];

    return (
        <header className="bg-[#0C447C] flex shadow w-full flex justify-between items-center  lg:h-[16vh]">
            <div className="flex flex-col lg:flex-row justify-between w-full px-5 xl:w-[80%] mx-auto">

                <div className="flex justify-between w-full h-full justify-center items-center">
                    <nav className="my-auto flex items-center gap-5 text-white">
                        {menus.map((menu) => (
                            <Link
                                href={menu.link}
                                key={menu.title}
                                className="hidden lg:inline border-b-2 py-2 border-transparent hover:border-white"
                            >
                                {menu.title}
                            </Link>
                        ))}
                    </nav>

                    <div className={"flex items-center justify-center self-cente mx-auto"}>
                        <img
                            src="/assets/hoshkadehlogo.png"
                            alt="Logo"
                            className="h-[70px] w-[70px] lg:h-[150px] lg:w-[200px] object-contain"
                        />
                    </div>
                </div>

                <NavbarActions />

            </div>
        </header>
    );
}

export default Navbar;