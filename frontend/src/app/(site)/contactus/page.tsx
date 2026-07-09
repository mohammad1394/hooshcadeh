import Hero from "@/components/template/contactus/Hero";
import ContactInfo from "@/components/template/contactus/ContactInfo";
import ContactForm from "@/components/template/contactus/ContactForm";
import SocialMedia from "@/components/template/contactus/SocialMedia";
import WorkingHours from "@/components/template/contactus/WorkingHours";
import FAQ from "@/components/template/contactus/FAQ";
import CTA from "@/components/template/contactus/CTA";


export default function ContactPage() {
    return (
        <div className={"w-[80%] mx-auto mb-10"}>
            <Hero />
            <ContactInfo />
            <ContactForm/>
            <SocialMedia />
            <WorkingHours />
            <FAQ />
            <CTA />
        </div>
    );
}