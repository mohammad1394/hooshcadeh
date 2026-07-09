import React from 'react';
import Navbar from "@/components/Shared/header/Navbar";
import Footer from "@/components/Shared/footer/Footer";

export default function Layout({children,}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <Navbar/>
            {children}
            <Footer/>
        </div>
    );
}
