import { AuthProvider } from '@/context/AuthContext';
import './globals.css';

export const metadata = {
  title: "Dr. Priya Sharma | Expert Dental Care",
  description: "Noida's top-rated dental clinic for a perfect smile.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}