import './globals.css'
import Footer from "@/components/Shared/footer/Footer";
import Navbar from "@/components/Shared/header/Navbar";
import {CartProvider} from "@/context/CartContext";
import {AuthProvider} from "@/context/AuthContext";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="fa">
        <body className="bg-white text-black">
        <AuthProvider>
            <CartProvider>
                <Navbar/>
                {children}
                <Footer/>
            </CartProvider>
        </AuthProvider>
        </body>
        </html>
    )
}
