"use client";

import Link from "next/link";
import Image from "next/image";
import PanelNavbarActions from "@/components/modules/PanelHeader/PanelNavbarActions";

type PanelHeaderProps = {
    onMenuClick: () => void;
    title?: string;
};

function PanelHeader({ onMenuClick, title }: PanelHeaderProps) {
    return (
        <header className="sticky top-0 z-30 bg-[#0C447C] border-b border-gray-100 h-20 px-4 md:px-8 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">

                <button
                    onClick={onMenuClick}
                    className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-white hover:bg-white/10"
                    aria-label="باز کردن منو"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>

                <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
                    <Image
                        src="/assets/hoshkadehlogo.png"
                        alt="هوشکده"
                        className="h-8 md:h-20 w-auto object-contain"
                        width={120}
                        height={40}
                    />
                </Link>

                {title && (
                    <h1 className="hidden md:block text-base font-bold text-white">{title}</h1>
                )}
            </div>

            <div className="flex items-center gap-2">
                <PanelNavbarActions />
            </div>
        </header>
    );
}

export default PanelHeader;