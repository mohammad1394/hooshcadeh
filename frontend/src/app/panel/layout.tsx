"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import PanelHeader from "@/components/modules/PanelHeader/PanelHeader";
import SidebarPanel from "@/components/modules/SidebarPanel/SidebarPanel";

export default function PanelLayout({ children }: { children: React.ReactNode }) {
    const { user, logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const displayName = user?.full_name || user?.phone_number || "کاربر";
    const initial = displayName.trim().charAt(0) || "ک";

    return (
        <div className="min-h-screen bg-[#F5F7FB] flex" dir="rtl">
            <SidebarPanel
                displayName={displayName}
                initial={initial}
                logout={logout}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col min-w-0">
                <PanelHeader onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="flex-1 p-6 md:p-8">{children}</main>
            </div>
        </div>
    );
}