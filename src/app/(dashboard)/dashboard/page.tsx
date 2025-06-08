
"use client";

import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BarChart, CalendarCheck, Clock, RefreshCcw, UserCircle, AlertTriangle } from "lucide-react";

interface UpcomingSession {
  id: number;
  name: string;
  time: string;
  coach: string;
}

interface ExpiringItem {
  id: number;
  name: string;
  expires: string;
  renewalLink: string;
}

interface OverviewData {
  upcomingSessions: UpcomingSession[];
  expiringSoon: ExpiringItem[];
  profileCompletion: number;
}

const overviewData: OverviewData = {
  upcomingSessions: [
    { id: 1, name: "والیبال", time: "فردا، ۱۷:۰۰", coach: "خانم بهرام‌زاده" },
    { id: 2, name: "بسکتبال (نیمه/پیشرفته)", time: "دوشنبه آینده، ۱۷:۰۰", coach: "آقای رحمانی" },
  ],
  expiringSoon: [
    { id: 1, name: "ژیمناستیک", expires: "تا ۳ روز دیگر", renewalLink: "/dashboard/renewals" },
  ],
  profileCompletion: 75, 
};

export default function DashboardOverviewPage() {
  useEffect(() => {
    document.title = "پیشخوان | باشگاه ورزشی سورن";
    const metaDesc = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    metaDesc.setAttribute('content', 'به پیشخوان کاربری خود در باشگاه سورن خوش آمدید. فعالیت‌ها، کلاس‌های پیش‌رو، وضعیت پروفایل و هشدارهای خود را مشاهده کنید.');
    if (!document.querySelector('meta[name="description"]')) {
        document.head.appendChild(metaDesc);
    }
    const metaKeywords = document.querySelector('meta[name="keywords"]') || document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    metaKeywords.setAttribute('content', 'پیشخوان سورن, داشبورد ورزشی, پروفایل کاربر, کلاس های من, وضعیت اشتراک');
    if (!document.querySelector('meta[name="keywords"]')) {
        document.head.appendChild(metaKeywords);
    }
  }, []);

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">به پیشخوان خود خوش آمدید</h1>
        <p className="text-lg text-muted-foreground">نگاهی سریع به فعالیت‌ها و پروفایل شما.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center font-headline text-xl text-primary">
              <UserCircle className="ms-2 h-6 w-6" />
              تکمیل پروفایل
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">پروفایل شما {overviewData.profileCompletion}% تکمیل شده است.</p>
              <BarChart className="h-5 w-5 text-accent"/>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5 mb-2">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: `${overviewData.profileCompletion}%` }}></div>
            </div>
            {overviewData.profileCompletion < 100 && (
              <Button variant="outline" size="sm" asChild className="mt-2 border-primary text-primary hover:bg-primary/10">
                <Link href="/dashboard/profile">تکمیل پروفایل</Link>
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center font-headline text-xl text-primary">
              <CalendarCheck className="ms-2 h-6 w-6" />
              جلسات پیش‌رو
            </CardTitle>
          </CardHeader>
          <CardContent>
            {overviewData.upcomingSessions.length > 0 ? (
              <ul className="space-y-2">
                {overviewData.upcomingSessions.map(session => (
                  <li key={session.id} className="text-sm">
                    <p className="font-semibold text-foreground">{session.name}</p>
                    <p className="text-muted-foreground"><Clock className="inline h-4 w-4 me-1"/>{session.time} با مربی {session.coach}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">جلسه پیش‌رویی برنامه‌ریزی نشده است.</p>
            )}
             <Button variant="default" size="sm" asChild className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/dashboard/classes">ثبت‌نام در کلاس‌ها</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center font-headline text-xl text-destructive">
              <AlertTriangle className="ms-2 h-6 w-6" />
             هشدارهای انقضا
            </CardTitle>
          </CardHeader>
          <CardContent>
            {overviewData.expiringSoon.length > 0 ? (
              <ul className="space-y-2">
                {overviewData.expiringSoon.map(item => (
                  <li key={item.id} className="text-sm">
                    <p className="font-semibold text-destructive">{item.name}</p>
                    <p className="text-muted-foreground">تاریخ انقضا: {item.expires}</p>
                    <Button variant="link" size="sm" asChild className="p-0 h-auto text-primary hover:underline">
                      <Link href={item.renewalLink}>
                        <span>تمدید کنید <RefreshCcw className="ms-1 h-3 w-3"/></span>
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">کلاسی نزدیک به تاریخ انقضا نیست.</p>
            )}
            <Button variant="outline" size="sm" asChild className="mt-4">
              <Link href="/dashboard/renewals">مشاهده همه تمدیدها</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
