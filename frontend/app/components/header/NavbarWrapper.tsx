"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import LogIn from "@/app/components/login/LogIn";


export default function NavbarWrapper() {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    return (
        <>
            <Navbar onOpenAuthModal={() => setIsAuthModalOpen(true)} />
            <LogIn
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
            />
        </>
    );
}
