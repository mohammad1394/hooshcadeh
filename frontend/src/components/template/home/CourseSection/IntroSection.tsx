"use client"
import React, {useState} from "react";
import Container from "@/components/Layout/container/Container";
import {Course} from "@/services/course";
import {useRouter} from "next/navigation";
import {Search, Sparkles} from "lucide-react";

type Props = {
    courses: Course[];
}


function IntroSection({courses} : Props) {
    const [search, setSearch] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        router.push(`/courses?search=${search}`);
    };

    return (
        <div className="relative overflow-hidden bg-gradient-to-b from-orange-50 via-white to-white">
            {/* Decorative background blobs */}
            <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl" />
            <div className="pointer-events-none absolute top-32 -right-20 h-72 w-72 rounded-full bg-emerald-100/50 blur-3xl" />

            <Container className="relative flex flex-col-reverse items-center gap-10 py-16 md:flex-row md:gap-8 md:py-24">

                {/* Text & Search */}
                <div className="w-full md:w-1/2 text-center md:text-right">
                    <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1.5 text-sm font-medium text-orange-600">
                        <Sparkles className="h-4 w-4" />
                        مسیر یادگیری هوش مصنوعی
                    </span>

                    <h2 className="mt-5 text-3xl font-extrabold leading-snug text-gray-900 sm:text-4xl md:text-5xl">
                        با یادگیری{" "}
                        <span className="bg-gradient-to-l from-orange-500 to-orange-300 bg-clip-text text-transparent">
                            هوش مصنوعی
                        </span>{" "}
                        از تکنولوژی عقب نمون
                    </h2>

                    <p className="mt-4 text-base text-gray-500 sm:text-lg">
                        بهترین و به‌روزترین مرجع برای یادگیری هوش مصنوعی، با دوره‌های کاربردی و پروژه‌محور
                    </p>

                    <div className="mt-8 flex w-full max-w-xl mx-auto md:mx-0 items-center rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow focus-within:shadow-md focus-within:border-orange-300">
                        <Search className="mr-4 h-5 w-5 text-gray-400 shrink-0" />
                        <input
                            type="text"
                            placeholder="دنبال چه دوره‌ای می‌گردی؟"
                            className="flex-1 bg-transparent py-4 px-2 text-gray-700 outline-none placeholder:text-gray-400"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSearch();
                            }}
                        />
                        <button
                            onClick={handleSearch}
                            className="m-1.5 shrink-0 rounded-xl bg-orange-500 px-6 py-3 font-medium text-white transition-colors hover:bg-orange-600 active:bg-orange-700"
                        >
                            جستجو
                        </button>
                    </div>
                </div>

                {/* Image */}
                <div className="relative w-full md:w-1/2">
                    <div className="relative rounded-3xl bg-gradient-to-br from-orange-100 to-emerald-50 p-4 sm:p-6">
                        <img
                            src="/assets/banner.png"
                            className="w-full rounded-2xl object-cover"
                            alt="یادگیری هوش مصنوعی"
                        />
                    </div>
                </div>

            </Container>
        </div>
    );
}

export default IntroSection;