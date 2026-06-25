import React from 'react';
import Container from "@/components/Layout/container/Container";
import ArticleCard from "@/components/modules/ArticleCard/ArticleCard";
import {Blog, getBlogs} from "@/services/blog";
import Link from "next/link";
async function Page() {

    const data = await getBlogs()


    console.log(data)
    return (
        <div>

            <div className={"w-full py-15 my-10 bg-[#0CAC67] bg-[url('/assets/pattern-main-widget.webp')] bg-no-repeat"}>
                <Container>
                <h2 className={"text-3xl "}>وبلاگ</h2>
                <h5 className={"text-xl"}>جدیدترین مقالات آموزشی در تکنو هوش</h5>
                </Container>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <Container>
                {data.map((item: Blog) => (
                        <ArticleCard {...item}  key={item.id} />

                ))}
            </Container>
            </div>
        </div>
    );
}

export default Page;