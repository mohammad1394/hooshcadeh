import React from "react";
import Link from "next/link";
import Container from "@/components/Layout/container/Container";

const Home = () => {
    return (
        <div>
            <Container className={"my-10"}>
                <img src="/assets/banner.png" className={'w-full mb-5'} alt="" />
            </Container>
        </div>
    );
};

export default Home;
