
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MembershipRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    document.title = "انتقال به کلاس‌ها | باشگاه ورزشی سورن";
    const metaDesc = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    metaDesc.setAttribute('content', 'صفحه عضویت در حال حاضر به بخش کلاس‌ها منتقل شده است. لطفاً برای مشاهده و ثبت‌نام در کلاس‌ها به آن بخش مراجعه کنید.');
    if (!document.querySelector('meta[name="description"]')) {
        document.head.appendChild(metaDesc);
    }
    const metaKeywords = document.querySelector('meta[name="keywords"]') || document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    metaKeywords.setAttribute('content', 'عضویت باشگاه سورن, ثبت نام کلاس ورزشی, انتقال صفحه');
    if (!document.querySelector('meta[name="keywords"]')) {
        document.head.appendChild(metaKeywords);
    }
    router.replace('/classes');
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-24 pt-32 md:pt-40 bg-background font-persian text-right" dir="rtl">
      <h1 className="text-2xl font-semibold text-primary mb-4">در حال انتقال شما...</h1>
      <p className="text-muted-foreground">صفحه عضویت دیگر در دسترس نیست.</p>
      <p className="text-muted-foreground">شما به صفحه کلاس‌ها هدایت می‌شوید.</p>
      <div className="mt-6 animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}
