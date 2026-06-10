import IntroSection from "@/components/template/home/IntroSection/IntroSection";
import CourseIntro from "@/components/template/home/IntroSection/CourseIntro";
import OfferTemplate from "@/components/template/home/OfferTemplate/OfferTemplate";
import NewsSection from "@/components/template/home/NewsSection/NewsSection";
import { getCourses } from "@/services/course";
import Link from "next/link";

export default async function Home() {
    const courses = await getCourses();

    return (
        <div>
            <main>
                <IntroSection />
                <CourseIntro courses={courses} />
                <OfferTemplate />
                <NewsSection />
            </main>
        </div>
    );
}