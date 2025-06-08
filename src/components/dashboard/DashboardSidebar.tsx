
"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, User, CalendarDays, RefreshCw, LogOut, Settings, ShoppingCart, ListChecks } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/common/Logo';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

interface DashboardSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const navItems = [
  { href: '/dashboard', label: 'پیشخوان', icon: Home },
  { href: '/dashboard/profile', label: 'پروفایل من', icon: User },
  { href: '/dashboard/classes', label: 'ثبت‌نام کلاس‌ها', icon: CalendarDays },
  { href: '/dashboard/my-schedule', label: 'برنامه من', icon: ListChecks },
  { href: '/dashboard/renewals', label: 'تمدیدها', icon: RefreshCw },
  { href: '/checkout', label: 'سبد خرید', icon: ShoppingCart},
  // { href: '/dashboard/settings', label: 'تنظیمات', icon: Settings },
];

export function DashboardSidebar({ isOpen, setIsOpen }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('shoppingCartSoren');
      // Optionally remove theme to revert to system preference or default on next login
      // localStorage.removeItem('theme'); 
    }
    toast({ title: "خروج موفق", description: "شما با موفقیت از حساب خود خارج شدید." });
    router.push('/auth/login');
  };

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-40 flex h-full w-64 flex-col border-s bg-card transition-transform duration-300 ease-in-out font-persian",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        dir="rtl"
      >
        <div className="flex h-16 md:h-20 items-center justify-center px-6 border-b"> {/* Centered Logo */}
          <Logo />
        </div>
        <nav className="flex-1 space-y-2 p-4 overflow-y-auto">
          {navItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant={pathname === item.href ? 'default' : 'ghost'}
              className={cn(
                "w-full justify-start text-base", 
                pathname === item.href ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'hover:bg-muted'
              )}
              onClick={closeSidebar} 
            >
              <Link href={item.href}>
                <item.icon className="ms-3 h-5 w-5" /> 
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
        <div className="mt-auto p-4 border-t">
          {/* Theme toggle button removed from here, now in Navbar */}
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:bg-red-500/10 hover:text-red-600 text-base"
            onClick={handleLogout}
          >
            <LogOut className="ms-3 h-5 w-5" />
            خروج از حساب
          </Button>
        </div>
      </aside>
    </>
  );
}
