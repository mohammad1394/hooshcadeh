import { LucideIcon } from "lucide-react";

interface Props {
    icon: LucideIcon;
    value: string;
    title: string;
}

export default function StatCard({
                                     icon: Icon,
                                     value,
                                     title,
                                 }: Props) {
    return (
        <div
            className="
      rounded-3xl
      bg-white/10
      backdrop-blur-md
      border
      border-white/20
      p-8
      text-center
      transition-all
      duration-300
      hover:scale-105
      hover:bg-white/20
    "
        >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                <Icon size={30} className="text-white" />
            </div>

            <h3 className="mt-6 text-4xl font-black text-white">
                {value}
            </h3>

            <p className="mt-3 text-white/80">
                {title}
            </p>
        </div>
    );
}