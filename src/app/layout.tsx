import './globals.css';
import Header from '@/components/Header';

export const metadata = {
    title: 'Movies App',
    description: 'Перегляд та пошук фільмів',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="uk">
        <body>
        <Header />
        <main>{children}</main>
        </body>
        </html>
    );
}
