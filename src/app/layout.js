import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./header/header";
import WhatsappFloating from "./whatsappPopup/whatsappPopup";
import Footer from "./footer/footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dr. Priya Sharma | Expert Dental Care",
  description: "Noida's top-rated dental clinic for a perfect smile.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header /> {/* Header yahan add karne se ye saare pages par dikhega */}
        {children}
        <WhatsappFloating /> {/* WhatsApp Floating Button */}
        <Footer/>
      </body>
    </html>
  );
}