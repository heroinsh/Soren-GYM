
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { AlertTriangle, CalendarClock, RefreshCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';

interface EnrolledClass {
  id: string;
  name: string;
  coach: string;
  schedule: string;
  nextPaymentDate: string;
  status: 'Active' | 'Expiring Soon' | 'Expired';
  monthlyFee: number;
}

const getPersianStatus = (status: EnrolledClass['status']) => {
  switch (status) {
    case 'Active': return 'فعال';
    case 'Expiring Soon': return 'به زودی منقضی می‌شود';
    case 'Expired': return 'منقضی شده';
    default: return status;
  }
};

const defaultEnrolledClasses: EnrolledClass[] = [
  { id: 'w-volleyball-bahramzadeh', name: 'والیبال', coach: 'خانم بهرام‌زاده', schedule: 'سه‌شنبه و پنج‌شنبه | ۱۷:۰۰–۱۸:۳۰', nextPaymentDate: '2024-08-10', status: 'Expiring Soon', monthlyFee: 7500000 },
  { id: 'm-basketball-advanced-rahmani', name: 'بسکتبال (نیمه/پیشرفته)', coach: 'آقای رحمانی', schedule: 'دوشنبه | ۱۷:۰۰–۱۸:۳۰', nextPaymentDate: '2024-09-01', status: 'Active', monthlyFee: 8000000 },
  { id: 'm-kungfu-amini', name: 'کونگ‌فو', coach: 'آقای امینی', schedule: 'یک‌شنبه، سه‌شنبه، پنج‌شنبه | ۱۸:۳۰–۱۹:۴۵', nextPaymentDate: '2024-07-25', status: 'Expired', monthlyFee: 7500000 },
  { id: 'w-zumba-gholami', name: 'زومبا', coach: 'خانم غلامی', schedule: 'روزهای زوج | ۱۸:۰۰–۱۹:۰۰', nextPaymentDate: '2024-08-20', status: 'Active', monthlyFee: 6000000 },
];

export default function RenewalsPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [enrolledClasses, setEnrolledClasses] = useState<EnrolledClass[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const storedUserEnrolledClasses = localStorage.getItem('sorenUserEnrolledClasses');
    if (storedUserEnrolledClasses) {
      setEnrolledClasses(JSON.parse(storedUserEnrolledClasses));
    } else {
      // Set default if nothing is in local storage, then save it
      setEnrolledClasses(defaultEnrolledClasses);
      localStorage.setItem('sorenUserEnrolledClasses', JSON.stringify(defaultEnrolledClasses));
    }
    const timer = setInterval(() => setCurrentDate(new Date()), 60000); // Update current date every minute
    return () => clearInterval(timer);
  }, []);


  const handleRenewClass = (classItem: EnrolledClass) => {
    const renewalCartItem = {
        id: `${classItem.id}-renewal-${Date.now()}`, // Ensure unique ID for cart
        originalClassId: classItem.id, // Keep track of the original class being renewed
        name: `${classItem.name} (تمدید)`,
        coach: classItem.coach,
        schedule: classItem.schedule, // Include schedule
        image: 'https://placehold.co/600x400.png', // Generic image for renewal
        imageHint: 'تمدید کلاس',
        description: `تمدید برای ${classItem.name}`,
        tags: ['تمدید'],
        price: classItem.monthlyFee, // Renewal price is the monthly fee
        genderTarget: 'All', // Not strictly necessary for renewal item but good for consistency
        ageGroup: 'All', // Same as above
    };

    const currentCart = JSON.parse(localStorage.getItem('shoppingCartSoren') || '[]');
    // Check if this specific class renewal is already in cart to avoid duplicates
    if (currentCart.find((item: { originalClassId?: string; }) => item.originalClassId === renewalCartItem.originalClassId)) {
        toast({ title: "قبلاً در سبد خرید است", description: `${classItem.name} برای تمدید از قبل در سبد خرید شما موجود است.`});
    } else {
        localStorage.setItem('shoppingCartSoren', JSON.stringify([...currentCart, renewalCartItem]));
        toast({ title: "تمدید آغاز شد", description: `برای تمدید ${classItem.name} به صفحه پرداخت بروید.` });
    }
    router.push('/checkout'); // Navigate to checkout page
  };

  const getStatusColor = (status: EnrolledClass['status']) => {
    if (status === 'Expiring Soon' || status === 'Expired') return 'text-destructive border-destructive';
    return 'text-green-600 border-green-600';
  };

  const getStatusBgColor = (status: EnrolledClass['status']) => {
    if (status === 'Expiring Soon' || status === 'Expired') return 'bg-destructive/10';
    return 'bg-green-600/10';
  };

  const calculateSubscriptionProgress = (nextPaymentDateStr: string) => {
    const periodEndDate = new Date(nextPaymentDateStr);
    // Assume a 30-day period for simplicity leading up to the next payment date
    const periodStartDate = new Date(periodEndDate.getTime() - 30 * 24 * 60 * 60 * 1000);

    if (currentDate > periodEndDate) return 100; // Subscription period has ended or is overdue
    if (currentDate < periodStartDate) return 0; // Subscription period hasn't started (or very early)

    const totalDuration = periodEndDate.getTime() - periodStartDate.getTime();
    const elapsedDuration = currentDate.getTime() - periodStartDate.getTime();

    if (totalDuration <= 0) return 0; // Avoid division by zero or negative duration

    const progress = Math.max(0, Math.min(100, (elapsedDuration / totalDuration) * 100));
    return progress;
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold font-headline text-primary">تمدید کلاس‌ها</h1>
        <p className="text-muted-foreground">اشتراک کلاس‌های فعال خود را مدیریت و به راحتی تمدید کنید.</p>
      </header>

      {enrolledClasses.length === 0 ? (
        <Card className="shadow-lg">
          <CardContent className="pt-6 text-center">
            <CalendarClock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold">کلاسی ثبت‌نام نشده است</p>
            <p className="text-muted-foreground">شما در حال حاضر در هیچ کلاسی ثبت‌نام نکرده‌اید.</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/classes">ثبت‌نام در کلاس</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledClasses.map((classItem) => {
            const progressValue = classItem.status === 'Expired' ? 100 : calculateSubscriptionProgress(classItem.nextPaymentDate);
            const daysRemaining = classItem.status !== 'Expired' ? Math.max(0, Math.floor((new Date(classItem.nextPaymentDate).getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))) : 0;

            return (
            <Card key={classItem.id} className={`shadow-lg hover:shadow-xl transition-shadow flex flex-col ${getStatusBgColor(classItem.status)}`}>
              <CardHeader>
                <CardTitle className="font-headline text-xl">{classItem.name}</CardTitle>
                <CardDescription>مربی: {classItem.coach} <br/> برنامه: {classItem.schedule}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-3">
                <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{progressValue.toFixed(0)}٪ تکمیل شده</span>
                        <span>{daysRemaining} روز باقیمانده</span>
                    </div>
                    <Progress value={progressValue} aria-label={`${progressValue.toFixed(0)}٪ از دوره اشتراک گذشته است`} className="h-2 [&>div]:bg-primary" />
                </div>
                <p className={`text-sm font-semibold px-2 py-1 rounded-full inline-block border ${getStatusColor(classItem.status)}`}>
                  وضعیت: {getPersianStatus(classItem.status)}
                </p>
                <p className="text-sm text-muted-foreground">پرداخت بعدی: {new Date(classItem.nextPaymentDate).toLocaleDateString('fa-IR')}</p>
                <p className="text-lg font-bold text-primary">{new Intl.NumberFormat('fa-IR').format(classItem.monthlyFee)} <span className="text-sm font-normal text-muted-foreground">ریال/ماه</span></p>
              </CardContent>
              <CardFooter className="flex flex-col items-stretch">
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => handleRenewClass(classItem)}
                  disabled={classItem.status === 'Active' && daysRemaining > 7} // Disable if active and more than 7 days remaining
                >
                  <RefreshCcw className="me-2 h-4 w-4" /> تمدید اشتراک
                </Button>
               {(classItem.status === 'Expiring Soon' || classItem.status === 'Expired') && (
                <div className={`p-3 mt-2 text-xs rounded-b-lg flex items-center border-t ${
                    classItem.status === 'Expiring Soon' ? 'text-destructive bg-destructive/5 border-destructive/20' : 'text-destructive bg-destructive/5 border-destructive/20'
                }`}>
                    <AlertTriangle className="h-4 w-4 me-2 shrink-0"/>
                    {classItem.status === 'Expiring Soon' ? 'اشتراک شما برای این کلاس به زودی منقضی می‌شود. برای حفظ دسترسی تمدید کنید.' : 'اشتراک شما برای این کلاس منقضی شده است. برای بازیابی دسترسی تمدید کنید.'}
                </div>
                )}
              </CardFooter>
            </Card>
          );
        })}
        </div>
      )}
    </div>
  );
}
