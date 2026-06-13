import IntroSection from "@/components/template/home/CourseSection/IntroSection";
import LatesCourses from "@/components/template/home/CourseSection/LatesCourses";
import OfferTemplate from "@/components/template/home/OfferTemplate/OfferTemplate";
import NewsSection from "@/components/template/home/NewsSection/NewsSection";
import { getCourses } from "@/services/course";
import Link from "next/link";
import PopularCourses from "@/components/template/home/CourseSection/PopularCourses";
import LatestArticle from "@/components/template/home/LatestArticle/LatestArticle";
import CommentCard from "@/components/modules/CommentCard/CommentCard";
import CommentsList from "@/components/template/home/CommentSection/CommentsList";
import FreeCourses from "@/components/template/home/CourseSection/FreeCourses";
import ExpandableText from "@/components/template/home/ExpandableText/ExpandableText";

export default async function Home() {
    const courses = await getCourses();

    return (
        <div>
            <main>
                <IntroSection courses={courses}/>
                <LatesCourses courses={courses} />
                <PopularCourses courses={courses} />
                <LatestArticle/>
                <CommentsList/>
                <FreeCourses courses={courses}/>
                <ExpandableText/>
            </main>
        </div>
    );
}