'use client';
import { usePathname } from 'next/navigation';
import Header from "./header/header";
import WhatsappFloating from "./whatsappPopup/whatsappPopup";
import Footer from "./footer/footer";

export default function AppContent({ children }) {
    const pathname = usePathname();
    const isAdminPage = pathname.startsWith('/admin');

    return (
        <>
            {!isAdminPage && <Header />}
            {children}
            {!isAdminPage && <WhatsappFloating />}
            {!isAdminPage && <Footer />}
        </>
    );
}
