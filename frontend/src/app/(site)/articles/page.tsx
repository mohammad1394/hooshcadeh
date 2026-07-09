import React from 'react';
import Container from "@/components/Layout/container/Container";
import ArticleCard from "@/components/modules/ArticleCard/ArticleCard";
import { getBlogs} from "@/services/blog";
import {Blog} from "@/types/blog";
async function Page() {

    const data:Blog[] = await getBlogs()


    console.log(data)
    return (
        <div className={"my-35"}>

            <div className={"w-full py-15 my-10 bg-[#0CAC67] bg-[url('/assets/pattern-main-widget.webp')] bg-no-repeat"}>
                <Container>
                <h2 className={"text-3xl "}>مقالات</h2>
                <h5 className={"text-xl"}>جدیدترین مقالات آموزشی در تکنو هوش</h5>
                </Container>
            </div>
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 my-10">
                {data.map((item: Blog) => (
                    <ArticleCard {...item} key={item.id} />

                ))}
            </div>
            </Container>
        </div>
    );
}

export default Page;