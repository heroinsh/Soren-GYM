
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CalendarDays, Info, Users, Clock } from 'lucide-react';

interface UserEnrolledClass {
  id: string;
  name: string;
  coach: string;
  schedule: string;
  nextPaymentDate: string; 
  status: 'Active' | 'Expiring Soon' | 'Expired';
  monthlyFee: number; 
}

const getPersianStatus = (status: UserEnrolledClass['status']) => {
  switch (status) {
    case 'Active': return 'فعال';
    case 'Expiring Soon': return 'به زودی منقضی می‌شود';
    case 'Expired': return 'منقضی شده';
    default: return status;
  }
};

export default function MySchedulePage() {
  const [enrolledClasses, setEnrolledClasses] = useState<UserEnrolledClass[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "برنامه کلاسی من | باشگاه ورزشی سورن";
    const metaDesc = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    metaDesc.setAttribute('content', 'برنامه کلاس‌های ثبت‌نام شده خود در باشگاه سورن را مشاهده کنید. شامل زمان‌بندی، مربیان و وضعیت اشتراک.');
    if (!document.querySelector('meta[name="description"]')) {
        document.head.appendChild(metaDesc);
    }
    const metaKeywords = document.querySelector('meta[name="keywords"]') || document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    metaKeywords.setAttribute('content', 'برنامه کلاسی سورن, کلاس های من, زمانبندی ورزش, اشتراک فعال');
    if (!document.querySelector('meta[name="keywords"]')) {
        document.head.appendChild(metaKeywords);
    }

    const storedUserEnrolledClasses = localStorage.getItem('sorenUserEnrolledClasses');
    if (storedUserEnrolledClasses) {
      const parsedClasses = JSON.parse(storedUserEnrolledClasses) as UserEnrolledClass[];
      setEnrolledClasses(parsedClasses.filter(cls => cls.status === 'Active' || cls.status === 'Expiring Soon'));
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="flex flex-col justify-center items-center min-h-[calc(100vh-10rem)]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-3"></div>
        <p className="text-muted-foreground">در حال بارگذاری برنامه شما...</p>
    </div>;
  }

  const activeClasses = enrolledClasses.filter(cls => cls.status === 'Active' || cls.status === 'Expiring Soon');

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary flex items-center">
          <CalendarDays className="me-3 h-8 w-8" /> برنامه کلاسی من
        </h1>
        <p className="text-lg text-muted-foreground">
          کلاس‌های فعلی ثبت‌نام شده شما و برنامه‌های منظم آن‌ها در اینجا آمده است.
        </p>
      </header>

      {activeClasses.length === 0 ? (
        <Card className="shadow-lg">
          <CardContent className="pt-6 text-center">
            <Info className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-foreground">هیچ کلاس فعالی ندارید</p>
            <p className="text-muted-foreground">شما در حال حاضر در هیچ کلاس فعالی ثبت‌نام نکرده‌اید.</p>
            <Button asChild className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/dashboard/classes">ثبت‌نام در کلاس</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeClasses.map((classItem) => (
            <Card key={classItem.id} className="shadow-lg hover:shadow-xl transition-shadow bg-card flex flex-col">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary">{classItem.name}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  <div className="flex items-center"><Users className="me-2 h-4 w-4 text-accent" /> مربی: {classItem.coach}</div> 
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-start text-foreground">
                  <Clock className="me-2 mt-1 h-5 w-5 text-accent shrink-0" /> 
                  <p><span className="font-medium">برنامه:</span> {classItem.schedule}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  وضعیت: <span className={classItem.status === 'Expiring Soon' ? 'text-destructive font-semibold' : 'text-green-600 font-semibold'}>{getPersianStatus(classItem.status)}</span>
                  {classItem.status === 'Expiring Soon' && ` (پرداخت بعدی: ${new Date(classItem.nextPaymentDate).toLocaleDateString('fa-IR')})`}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <div className="mt-8 p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground">
        <Info className="inline h-5 w-5 me-2 text-primary" /> 
        این صفحه برنامه کلاس‌های منظم شما را نشان می‌دهد. برای هرگونه تغییر موقت یا لغو کلاس، لطفاً اطلاعیه‌های باشگاه را بررسی کنید یا با پذیرش تماس بگیرید.
      </div>
    </div>
  );
}
