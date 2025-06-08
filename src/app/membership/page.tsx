
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MembershipRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/classes');
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-24 pt-32 md:pt-40 bg-background font-persian text-right" dir="rtl">
      <h1 className="text-2xl font-semibold text-primary mb-4">در حال انتقال شما...</h1>
      <p className="text-muted-foreground">صفحه عضویت دیگر در دسترس نیست.</p>
      <p className="text-muted-foreground">شما به صفحه کلاس‌ها هدایت می‌شوید.</p>
      {/* You can add a spinner SVG here if you like */}
    </div>
  );
}
