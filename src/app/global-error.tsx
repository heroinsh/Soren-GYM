
"use client"; 

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ServerCrash, RotateCcw, Home } from 'lucide-react';
import Image from 'next/image';

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("خطای سراسری برنامه:", error);
    document.title = 'خطای سرور (۵۰۰) | باشگاه ورزشی سورن';
  }, [error]);

  return (
    <html lang="fa" dir="rtl" className="dark">
      <body className="font-persian bg-background text-foreground">
        <div className="flex flex-col items-center justify-center min-h-screen py-24 pt-32 md:pt-40 text-center">
          <div className="max-w-lg p-8">
            <Image 
                src="https://placehold.co/300x300/FF6347/FFFFFF.png?text=۵۰۰&font=vazirmatn" 
                alt="خطای ۵۰۰ - خطای سرور" 
                width={200} 
                height={200} 
                className="mx-auto mb-8 rounded-full shadow-lg border-4 border-destructive"
                data-ai-hint="server error 500"
            />
            <h1 className="text-6xl font-bold font-headline text-destructive mb-4">
              خطای ۵۰۰
            </h1>
            <h2 className="text-2xl font-semibold mb-6">مشکلی پیش آمده!</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              متاسفانه مشکلی در سمت سرور رخ داده است یا خطای غیرمنتظره‌ای اتفاق افتاده. تیم فنی ما از این موضوع مطلع شده است. لطفاً کمی صبر کنید و دوباره تلاش کنید.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
              <Button
                onClick={() => reset()}
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                <RotateCcw className="ms-2 h-5 w-5" /> تلاش مجدد
              </Button>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/">
                  <Home className="ms-2 h-5 w-5" /> بازگشت به صفحه اصلی
                </Link>
              </Button>
            </div>
            {error?.digest && (
              <p className="mt-6 text-xs text-muted-foreground">
                کد خطا (Digest): {error.digest}
              </p>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
