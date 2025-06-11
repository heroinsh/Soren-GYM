
import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTopButton } from '@/components/layout/ScrollToTopButton';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    default: 'باشگاه ورزشی سورن - قدرت، انضباط، جامعه',
    template: '%s | باشگاه ورزشی سورن',
  },
  description: 'به باشگاه ورزشی سورن خوش آمدید. از تمرینات ورزشی سطح بالا، امکانات مدرن و یک جامعه پویا بهره‌مند شوید. برای رسیدن به اهداف ورزشی خود به ما بپیوندید.',
  keywords: ['باشگاه ورزشی', 'تناسب اندام', 'بدنسازی', 'والیبال', 'بسکتبال', 'ژیمناستیک', 'هنرهای رزمی', 'سورن', 'ورزش', 'شیراز', 'باشگاه شیراز', 'کلاس ورزشی'],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" suppressHydrationWarning dir="rtl" className="dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8EFF54" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" as="style" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
        <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" /></noscript>

        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" as="style" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" />
        <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" /></noscript>

        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap" as="style" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap" />
        <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap" /></noscript>

        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700&display=swap" as="style" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700&display=swap" />
        <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700&display=swap" /></noscript>
      </head>
      <body className="font-persian antialiased flex flex-col min-h-screen bg-background">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <ScrollToTopButton />
        <Toaster />
      </body>
    </html>
  );
}
