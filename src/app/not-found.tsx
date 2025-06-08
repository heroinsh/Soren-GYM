
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Home } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'صفحه پیدا نشد (404) | باشگاه ورزشی سورن',
  description: 'متاسفانه صفحه‌ای که به دنبال آن بودید در باشگاه ورزشی سورن یافت نشد. لطفاً آدرس را بررسی کنید یا به صفحه اصلی بازگردید.',
  keywords: ['خطای 404', 'صفحه پیدا نشد', 'باشگاه سورن', 'صفحه ناموجود'],
};

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-24 pt-32 md:pt-40 bg-background text-foreground font-persian text-center" dir="rtl">
      <div className="max-w-md p-8">
        <Image 
            src="https://placehold.co/300x300/FFCC00/000000.png?text=\\%3C404%3E&font=montserrat" 
            alt="خطای 404" 
            width={200} 
            height={200} 
            className="mx-auto mb-8 rounded-full shadow-lg"
            data-ai-hint="error warning"
        />
        <h1 className="text-6xl font-bold font-headline text-primary mb-4">
          خطای ۴۰۴
        </h1>
        <h2 className="text-2xl font-semibold mb-6">صفحه پیدا نشد!</h2>
        <p className="text-muted-foreground mb-8 text-lg">
          متاسفانه صفحه‌ای که به دنبال آن بودید یافت نشد. ممکن است آدرس را اشتباه وارد کرده باشید یا صفحه مورد نظر حذف یا منتقل شده باشد.
        </p>
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/">
            <Home className="ms-2 h-5 w-5" /> بازگشت به صفحه اصلی
          </Link>
        </Button>
      </div>
    </div>
  );
}
