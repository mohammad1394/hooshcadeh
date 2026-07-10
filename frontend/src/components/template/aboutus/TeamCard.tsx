import Image from "next/image";

interface TeamCardProps {
    image: string;
    name: string;
    role: string;
}

export default function TeamCard({ image, name, role }: TeamCardProps) {
    return (
        <div
            className="
                group
                relative
                flex flex-col items-center
                text-center
                rounded-[28px]
                bg-white
                border border-gray-100
                p-8
                shadow-[0_2px_20px_rgba(0,0,0,0.04)]
                hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]
                hover:-translate-y-1.5
                transition-all duration-300
            "
        >
            <div className="relative w-28 h-28 rounded-full overflow-hidden ring-4 ring-teal-50 group-hover:ring-teal-100 transition-all duration-300">
                <Image
                    src={image}
                    alt={name}
                    fill
                    sizes="112px"
                    className="object-cover"
                />
            </div>

            <h3 className="font-bold text-lg mt-6 text-gray-900">{name}</h3>

            <p className="text-teal-600 text-sm font-medium mt-2 bg-teal-50 px-4 py-1 rounded-full">
                {role}
            </p>
        </div>
    );
}