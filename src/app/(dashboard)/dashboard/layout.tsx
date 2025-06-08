
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
      setIsSidebarOpen(true);
    }
  }, [isMobile]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-background font-persian" dir="rtl">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <div className="font-persian text-lg text-muted-foreground" dir="rtl">در حال بارگذاری پیشخوان...</div>
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
        (isSidebarOpen && !isMobile) ? "md:mr-64" : "md:mr-0" 
      )}>
        <header className="p-2 md:p-4 sticky top-0 bg-background/80 backdrop-blur-sm z-10 border-b md:border-b-0 flex justify-start items-center h-16 md:h-auto">
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
          Developed by <a href="https://github.com/shayansha" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Shayan</a>
        </footer>
      </div>
      <SupportFAB />
      <Toaster />
    </div>
  );
}
