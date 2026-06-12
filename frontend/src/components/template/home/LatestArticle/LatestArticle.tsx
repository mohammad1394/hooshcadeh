import React from 'react';
import Container from "@/components/Layout/container/Container";
import ArticleCard from "@/components/modules/ArticleCard/ArticleCard";

function LatestArticle() {
    return (
        <Container>
            <div className="flex items-center gap-4 w-full " dir="rtl">
                <h2 className="shrink-0 text-[15px] md:text-[18px] font-bold text-[#1F2937]">
                    آخرین مقالات
                </h2>

                <div className="flex-1 h-px bg-gray-300" />
            </div>
            <div  className="text-right grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 my-20 gap-5 ">
                <ArticleCard/>
                <ArticleCard/>
                <ArticleCard/>
                <ArticleCard/>

            </div>
        </Container>
    );
}

export default LatestArticle;