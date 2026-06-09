import './globals.css'
import Footer from "@/app/components/footer/Footer";
import NavbarWrapper from "@/app/components/header/NavbarWrapper";

export const metadata = {
    title: 'تکنوهوش - آکادمی هوش مصنوعی',
    description: 'آکادمی تکنوهوش - دوره‌های آموزشی هوش مصنوعی با تدریس دکتر حسن‌زاده',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="fa" dir="rtl">
        <body className="bg-white text-black">
        <NavbarWrapper/>
        {children}
        <Footer/>
        </body>
        </html>
    )
}
