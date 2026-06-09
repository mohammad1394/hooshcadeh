import React from 'react';
import Container from "@/app/components/Container";
import { getCourseBySlug, getMediaUrl } from "@/app/lib/api";
import type { Course } from "@/app/lib/api";
import productData from "@/app/data/db.json";

interface PageProps {
    params: Promise<{ id: string }>;
}

/**
 * Course detail page.
 * Tries to fetch from backend API using the slug/id,
 * falls back to local JSON data if backend is unavailable.
 */
async function Page({ params }: PageProps) {
    const { id } = await params;
    let course: Course | null = null;

    try {
        course = await getCourseBySlug(id);
    } catch {
        // Backend unavailable — try local fallback
    }

    // If API returned data, render dynamic content
    if (course) {
        return (
            <div className={"bg-[#F4F6F8]"}>
                <div className={"bg-gray-800 text-white py-15 my-10"}>
                    <Container>
                        <h2 className="text-2xl">{course.title}</h2>
                    </Container>
                </div>
                <Container>
                    <div className={"my-20 flex gap-10"}>
                        {/* Main Content */}
                        <div className={"w-[100%] lg:w-[65%] bg-white"}>
                            <img
                                src={getMediaUrl(course.image)}
                                alt={course.title}
                                className={"w-full p-1"}
                            />
                            <div className={"p-5"}>
                                <h3 className={"my-5 text-blue-600 text-xl"}>
                                    {course.title}
                                </h3>
                                <p className={"text-gray-500 leading-9"}>
                                    {course.description}
                                </p>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className={"w-[0%] lg:w-[30%] bg-white p-5 hidden lg:flex flex-col gap-15 h-fit"}>
                            <div>
                                <p className={"text-[#00c896] text-lg my-5"}>
                                    {course.final_formatted_price} تومان
                                </p>
                                <button className={"bg-[#1E88E5] w-full p-3 text-white rounded-xl"}>
                                    ثبت نام دوره
                                </button>
                                <div className={"mt-10 flex justify-between"}>
                                    <div>
                                        <p>{course.students}</p>
                                        <p>تعداد خرید دوره</p>
                                    </div>
                                    <div>محصول جدید</div>
                                </div>
                                <div className={"mt-8 text-sm border-b p-[10px] border-gray-300 flex justify-between"}>
                                    <p>نوع دوره:</p>
                                    <p>آفلاین</p>
                                </div>
                                <div className={"text-sm border-b p-[10px] border-gray-300 flex justify-between"}>
                                    <p>زمان دوره</p>
                                    <p>{course.formatted_time}</p>
                                </div>
                                <div className={"text-sm border-b p-[12px] border-gray-300 flex justify-between"}>
                                    <p>پیش نیاز:</p>
                                    <p>{course.prerequisite}</p>
                                </div>
                                <div className={"text-sm border-b p-[12px] border-gray-300 flex justify-between"}>
                                    <p>سطح برگزاری دوره</p>
                                    <p>{course.level_persian}</p>
                                </div>
                                <div className={"text-sm border-b p-[12px] border-gray-300 flex justify-between"}>
                                    <p>بستر برگزاری دوره</p>
                                    <p>اسپات پلیر</p>
                                </div>
                                {course.teacher && (
                                    <div className={"flex justify-between mt-10"}>
                                        <div className={"flex flex-row"}>
                                            {course.teacher.avatar && (
                                                <img
                                                    src={getMediaUrl(course.teacher.avatar)}
                                                    className={"w-[60px] rounded-full"}
                                                    alt={course.teacher.full_name}
                                                />
                                            )}
                                            <p className={"content-center"}>مدرس</p>
                                        </div>
                                        <p className={"h-[40px] mt-2 p-1 rounded-sm border content-center"}>
                                            {course.teacher.full_name}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    // Fallback: try to find in local data
    const localCourse = productData.courses.find(
        (c) => String(c.id) === id
    );

    return (
        <div className={"bg-[#F4F6F8]"}>
            <div className={"bg-gray-800 text-white py-15 my-10"}>
                <Container>
                    <h2 className="text-2xl">
                        {localCourse ? localCourse.title : 'دوره یافت نشد'}
                    </h2>
                </Container>
            </div>
            <Container>
                {localCourse ? (
                    <div className={"my-20 flex gap-10"}>
                        <div className={"w-[100%] lg:w-[65%] bg-white"}>
                            <img
                                src={localCourse.image}
                                alt={localCourse.title}
                                className={"w-full p-1"}
                            />
                            <div className={"p-5"}>
                                <h3 className={"my-5 text-blue-600 text-xl"}>
                                    {localCourse.title}
                                </h3>
                                <p className={"text-gray-500 leading-9"}>
                                    {localCourse.description}
                                </p>
                            </div>
                        </div>
                        <div className={"w-[0%] lg:w-[30%] bg-white p-5 hidden lg:flex flex-col gap-15 h-fit"}>
                            <div>
                                <p className={"text-[#00c896] text-lg my-5"}>
                                    {localCourse.price}
                                </p>
                                <button className={"bg-[#1E88E5] w-full p-3 text-white rounded-xl"}>
                                    ثبت نام دوره
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="my-20 text-center">
                        <p className="text-xl text-gray-500">دوره مورد نظر یافت نشد</p>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default Page;