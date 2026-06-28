import Container from "@/components/Layout/container/Container";
import CourseDetails from "@/components/Course/CourseDetails/CourseDetails";
import { getCourseBySlug } from "@/services/course";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params;

    let course;

    try {
        course = await getCourseBySlug(slug);
    } catch (error) {
        console.error(error);
        notFound();
    }

    if (!course) {
        notFound();
    }

    return (
        <div className="bg-[#F4F6F8]">
            <div className="bg-gray-800 text-white py-15 my-10">
                <Container>
                    <h1>{course.title}</h1>
                </Container>
            </div>

            <Container>
                <CourseDetails {...course} />
            </Container>
        </div>
    );
}