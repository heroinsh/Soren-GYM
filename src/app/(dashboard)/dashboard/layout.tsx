
"use client";

import type React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';
import { Menu as MenuIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { SupportFAB } from '@/components/dashboard/SupportFAB';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.replace('/auth/login');
    } else {
      setIsLoading(false);
    }
    document.documentElement.lang = 'fa';
    document.documentElement.dir = 'rtl';
  }, [router]);

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    } else {
      // For desktop, you might want it to be open by default.
      // If you want it to remember the last state, you'd need localStorage persistence here.
      // For now, let's make it open by default on desktop.
      setIsSidebarOpen(true);
    }
  }, [isMobile]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-background font-persian" dir="rtl">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="flex space-x-2 space-x-reverse animate-pulse">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <div className="w-3 h-3 bg-primary rounded-full animation-delay-200"></div>
            <div className="w-3 h-3 bg-primary rounded-full animation-delay-400"></div>
          </div>
          <div className="font-persian text-lg text-muted-foreground mt-4" dir="rtl">در حال بارگذاری پیشخوان...</div>
        </div>
        <Toaster />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background font-persian" dir="rtl">
      <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300 ease-in-out",
        // When sidebar is open AND not mobile, add margin. Otherwise, no margin (or specific mobile margin if needed).
        (isSidebarOpen && !isMobile) ? "md:mr-64" : "md:mr-0"
      )}>
        <header className="p-2 md:p-4 sticky top-0 bg-background/80 backdrop-blur-sm z-10 border-b flex justify-start items-center h-16">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label={isSidebarOpen ? "بستن سایدبار" : "باز کردن سایدبار"}
            className="text-foreground hover:bg-muted"
          >
            <MenuIcon className="h-6 w-6" />
          </Button>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
        <footer className="p-4 text-center text-xs text-muted-foreground border-t border-border">
          طراحی و توسعه توسط <a href="https://github.com/heroinsh" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">H0lwin</a>
        </footer>
      </div>
      <SupportFAB />
      <Toaster />
    </div>
  );
}
