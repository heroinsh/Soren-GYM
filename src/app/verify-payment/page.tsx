
"use client";

import { useEffect, useState, Suspense } from 'react'; // Added Suspense
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { CheckCircle, XCircle, AlertTriangle, Home, CalendarCheck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic'; // Ensure dynamic rendering

function VerifyPaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [verificationStatus, setVerificationStatus] = useState<string | null>(null);
  const [trackingCode, setTrackingCode] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  useEffect(() => {
    const status = searchParams.get('status');
    const code = searchParams.get('trackingCode');
    const error = searchParams.get('error');

    setVerificationStatus(status);

    let pageTitle = "تأیید پرداخت | باشگاه ورزشی سورن";
    let metaDescriptionContent = "وضعیت پرداخت شما در باشگاه سورن در حال بررسی است.";

    if (status === 'success' && code) {
      setTrackingCode(code);
      pageTitle = `پرداخت موفق (${code}) | باشگاه ورزشی سورن`;
      metaDescriptionContent = `پرداخت شما با کد رهگیری ${code} با موفقیت انجام شد. جزئیات ثبت‌نام به پروفایل شما اضافه شد.`;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('shoppingCartSoren');
      }
    } else if (status === 'failed') {
      const defaultError = 'تراکنش با مشکل مواجه شد. لطفاً دوباره تلاش کنید یا با پشتیبانی تماس بگیرید.';
      setErrorDetails(error || defaultError);
      pageTitle = "پرداخت ناموفق | باشگاه ورزشی سورن";
      metaDescriptionContent = `متاسفانه پرداخت شما ناموفق بود. ${error || defaultError}`;
    } else if (!status && router.isReady) { // Check router.isReady before assuming invalid
      setErrorDetails('دسترسی نامعتبر به صفحه تایید پرداخت.');
      setVerificationStatus('invalid');
      pageTitle = "خطا در تأیید پرداخت | باشگاه ورزشی سورن";
      metaDescriptionContent = "خطایی در نمایش وضعیت پرداخت رخ داده است. دسترسی به این صفحه نامعتبر است.";
    }
    
    document.title = pageTitle;
    const metaDesc = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    metaDesc.setAttribute('content', metaDescriptionContent);
    if (!document.querySelector('meta[name="description"]')) {
        document.head.appendChild(metaDesc);
    }

  }, [searchParams, router.isReady]); // Added router.isReady dependency

  if (!router.isReady || verificationStatus === null) { // Also wait for router to be ready
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32 md:pt-40 flex flex-col items-center justify-center text-center min-h-[calc(100vh-10rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="mt-4 text-lg text-muted-foreground">در حال بررسی وضعیت پرداخت...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32 md:pt-40 flex flex-col items-center justify-center text-center min-h-[calc(100vh-10rem)]">
      {verificationStatus === 'success' && trackingCode && (
        <Card className="w-full max-w-md shadow-xl bg-card">
          <CardHeader className="items-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <CardTitle className="text-3xl font-headline text-primary">پرداخت موفق</CardTitle>
            <CardDescription className="text-lg">
              ثبت‌نام یا تمدید کلاس شما با موفقیت انجام شد.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground">از خرید شما سپاسگزاریم!</p>
            <div className="bg-muted/50 p-3 rounded-md">
              <p className="text-sm text-muted-foreground">کد رهگیری شما:</p>
              <p className="text-xl font-mono font-semibold text-accent">{trackingCode}</p>
            </div>
            <p className="text-xs text-muted-foreground">
              جزئیات ثبت‌نام به پروفایل شما در بخش "برنامه من" اضافه شده است.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/dashboard/my-schedule">
                <CalendarCheck className="me-2 h-4 w-4" /> مشاهده برنامه من
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/dashboard">
                <Home className="me-2 h-4 w-4" /> بازگشت به پیشخوان
              </Link>
            </Button>
          </CardFooter>
        </Card>
      )}

      {(verificationStatus === 'failed' || verificationStatus === 'invalid') && (
        <Card className="w-full max-w-md shadow-xl bg-card border-destructive">
          <CardHeader className="items-center">
            {verificationStatus === 'failed' ? 
              <XCircle className="h-16 w-16 text-destructive mb-4" /> :
              <AlertTriangle className="h-16 w-16 text-yellow-500 mb-4" />
            }
            <CardTitle className="text-3xl font-headline text-destructive">
              {verificationStatus === 'failed' ? 'پرداخت ناموفق' : 'خطا'}
            </CardTitle>
            <CardDescription className="text-lg">
              {errorDetails || 'مشکلی در پردازش درخواست شما رخ داده است.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {verificationStatus === 'failed' && (
              <p className="text-muted-foreground">
                در صورت کسر وجه از حساب شما، مبلغ طی ۷۲ ساعت آینده به حساب شما بازگردانده خواهد شد.
              </p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center">
            {verificationStatus === 'failed' && (
               <Button asChild className="w-full sm:w-auto" variant="outline">
                <Link href="/checkout">
                   تلاش مجدد برای پرداخت
                </Link>
              </Button>
            )}
            <Button asChild className="w-full sm:w-auto">
              <Link href="/dashboard">
                 بازگشت به پیشخوان
              </Link>
            </Button>
             <Button asChild variant="link" className="w-full sm:w-auto text-primary">
              <Link href="/contact">
                تماس با پشتیبانی
              </Link>
            </Button>
          </CardFooter>
        </Card>
      )}
       <Image 
          src="https://placehold.co/300x100.png?text=ZarinPal+Gateway" 
          alt="ZarinPal Logo" 
          width={200} 
          height={67} 
          className="mt-8 opacity-70"
          data-ai-hint="payment gateway logo"
        />
    </div>
  );
}


// Wrap the component that uses useSearchParams with Suspense
export default function VerifyPaymentPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div><p className="ms-3">بارگذاری...</p></div>}>
      <VerifyPaymentContent />
    </Suspense>
  );
}
