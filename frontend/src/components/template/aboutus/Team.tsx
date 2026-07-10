import TeamCard from "./TeamCard";
import { members } from "../../../data/teamData";

export default function Team() {
    return (
        <section className="container mx-auto px-6 py-24" dir="rtl">
            <div className="text-center mb-16">
                <span className="inline-flex items-center gap-2 bg-teal-50 text-teal-600 text-sm font-medium px-5 py-2 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                    تیم ما
                </span>

                <h2 className="text-3xl sm:text-4xl font-black mt-6 text-gray-900">
                    اعضای هوشکده
                </h2>

                <p className="text-gray-500 mt-4 max-w-xl mx-auto leading-8">
                    تیمی متخصص و علاقه‌مند به آموزش، در کنار شما تا رسیدن به هدف.
                </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {members.map((member) => (
                    <TeamCard
                        key={member.id}
                        image={member.image}
                        name={member.name}
                        role={member.role}
                    />
                ))}
            </div>
        </section>
    );
}