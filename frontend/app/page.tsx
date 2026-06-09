import IntroduceSection from "@/app/components/introducesection/IntroduceSection";
import IntroduceCourse from "@/app/components/introducesection/IntroduceCourse";
import React from "react";
import OfferTemplate from "@/app/components/template/OfferTemplate";
import CommentSection from "@/app/components/commentsection/CommentSection";
import NewsSection from "@/app/components/newssection/NewsSection";

export default function Home() {
    return (
        <div>
            <main>
                <IntroduceSection/>
                <IntroduceCourse/>
                <OfferTemplate/>
                <CommentSection/>
                <NewsSection/>
            </main>
        </div>
    );
}
