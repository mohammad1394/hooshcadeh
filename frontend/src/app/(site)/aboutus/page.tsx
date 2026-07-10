import Hero from "@/components/template/aboutus/Hero";
import AboutSection from "@/components/template/aboutus/AboutSection";
import Features from "@/components/template/aboutus/Features";
import MissionVision from "@/components/template/aboutus/MissionVision";
import Team from "@/components/template/aboutus/Team";
import CTA from "@/components/template/aboutus/CTA";
import StatsBanner from "@/components/template/aboutus/Statistics";

export default function AboutPage() {
    return (
        <main className={"w-[80%] mx-auto"}>

            <Hero />

            <AboutSection />

            <Features />

            <StatsBanner />

            <MissionVision />

            <Team />

            <CTA />

        </main>
    );
}