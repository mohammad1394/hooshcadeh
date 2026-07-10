import { LucideIcon } from "lucide-react";

interface Props {
    title: string;
    description: string;
    icon: LucideIcon;
    color: string;
}

export default function FeatureCard({
                                        title,
                                        description,
                                        icon: Icon,
                                        color,
                                    }: Props) {
    return (
        <div
            className="
            flex flex-col justify-center
            items-center
      rounded-3xl
      border
      border-gray-100
      bg-white
      p-8
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-2
      hover:shadow-xl
    "
        >
            <div
                className={`w-16 h-16 rounded-full flex items-center justify-center ${color}`}
            >
                <Icon size={30} />
            </div>

            <h3 className="mt-6 text-xl font-bold">
                {title}
            </h3>

            <p className="mt-4 text-center text-gray-500 leading-8">
                {description}
            </p>
        </div>
    );
}