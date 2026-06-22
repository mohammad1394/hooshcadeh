import './globals.css'
import Footer from "@/components/Shared/footer/Footer";
import Navbar from "@/components/Shared/header/Navbar";
import {CartProvider} from "@/context/CartContext";
import {AuthProvider} from "@/context/AuthContext";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";

const vazir = localFont({
    src: [
        {
            path: "../../public/fonts/Vazirmatn-Regular.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/Vazirmatn-Bold.woff2",
            weight: "700",
            style: "normal",
        },
    ],
});

export default function RootLayout({children,}: {
    children: React.ReactNode
}) {



    return (
        <html lang="fa">
        <body className={vazir.className}>
        <AuthProvider>
            <CartProvider>
                <Toaster position="top-right" />
                <Navbar/>
                {children}
                <Footer/>
            </CartProvider>
        </AuthProvider>
        </body>
        </html>
    )
}
