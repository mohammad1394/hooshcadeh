import IntroSection from "@/components/template/home/CourseSection/IntroSection";
import LatesCourses from "@/components/template/home/CourseSection/LatesCourses";

import PopularCourses from "@/components/template/home/CourseSection/PopularCourses";
import LatestArticle from "@/components/template/home/LatestArticle/LatestArticle";
import CommentsList from "@/components/template/home/CommentSection/CommentsList";
import FreeCourses from "@/components/template/home/CourseSection/FreeCourses";
import ExpandableText from "@/components/template/home/ExpandableText/ExpandableText";
import {Course} from "@/types/course";
import {getCourses} from "@/services/course";

export default async function Home() {
    const courses:Course[] = await getCourses();

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