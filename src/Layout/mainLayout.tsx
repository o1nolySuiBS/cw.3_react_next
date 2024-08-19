import './globals.css'; // Глобальні стилі
import Header from '@/components/Header';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
        <body>
        <Header />
        <main>
            {children}
        </main>
        </body>
        </html>
    );
}