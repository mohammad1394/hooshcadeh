import "./globals.css";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { ErrorBoundary } from "@/components/Shared/errorboundary/ErrorBoundary";

export const metadata = {
    title: "هوشکده",
    description: "پلتفرم آموزش هوش مصنوعی",
};

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fa">
        <body className={vazir.className}>
        <AuthProvider>
            <CartProvider>
                <Toaster position="top-right" />
                <ErrorBoundary>{children}</ErrorBoundary>
            </CartProvider>
        </AuthProvider>
        </body>
        </html>
    );
}