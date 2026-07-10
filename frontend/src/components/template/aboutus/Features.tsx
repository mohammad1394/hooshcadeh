import FeatureCard from "./FeatureCard";
import { features } from "../../../data/featuresData";

export default function Features() {
    return (
        <section className="container mx-auto px-6 py-14">

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                {features.map((item) => (

                    <FeatureCard
                        key={item.id}
                        title={item.title}
                        description={item.description}
                        icon={item.icon}
                        color={item.color}
                    />

                ))}

            </div>

        </section>
    );
}