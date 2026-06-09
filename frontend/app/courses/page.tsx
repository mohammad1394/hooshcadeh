import React from 'react';
import ProductTemplate from "@/app/components/template/ProductTemplate";
import Container from "@/app/components/Container";
import Link from "next/link";
import { getCourses, getMediaUrl } from "@/app/lib/api";
import type { Course } from "@/app/lib/api";
import productData from "@/app/data/db.json";

/**
 * Local fallback data type for when backend is unavailable.
 * Matches the structure of data/db.json.
 */
interface LocalProduct {
    id: number;
    title: string;
    description: string;
    image: string;
    price: string;
    scode: number;
    teacher: string;
    hours: string;
}

/**
 * Courses listing page.
 * Tries to fetch from backend API first, falls back to local JSON data.
 */
async function Page() {
    let courses: Course[] = [];
    let useLocalFallback = false;

    try {
        courses = await getCourses();
    } catch {
        // Backend unavailable — fall back to local data
        useLocalFallback = true;
    }

    // If backend returned data, render from API
    if (!useLocalFallback && courses.length > 0) {
        return (
            <div className={"my-20"}>
                <Container>
                    <h3 className={"text-2xl my-20"}>دوره ها</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {courses.map((course) => (
                            <Link key={course.id} href={`/courses/${course.slug}`}>
                                <ProductTemplate
                                    id={course.id}
                                    title={course.title}
                                    description={course.description}
                                    image={getMediaUrl(course.image)}
                                    price={course.final_formatted_price + ' تومان'}
                                    scode={course.id}
                                    teacher={course.teacher?.full_name || 'نامشخص'}
                                    hours={course.formatted_time}
                                />
                            </Link>
                        ))}
                    </div>
                </Container>
            </div>
        );
    }

    // Fallback: render from local JSON
    const products: LocalProduct[] = productData.courses;
    return (
        <div className={"my-20"}>
            <Container>
                <h3 className={"text-2xl my-20"}>دوره ها</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {products.map((product) => (
                        <Link key={product.id} href={`/courses/${product.id}`}>
                            <ProductTemplate
                                id={product.id}
                                title={product.title}
                                description={product.description}
                                image={product.image}
                                price={product.price}
                                scode={product.scode}
                                teacher={product.teacher}
                                hours={product.hours}
                            />
                        </Link>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Page;