
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, LogIn, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/common/Logo';
import { Button } from '@/components/ui/button';
import { navLinks, type NavLink } from '@/data/navLinks';
import { cn } from '@/lib/utils';
// import { useToast } from '@/hooks/use-toast'; // Removed as theme toast is no longer needed

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [isReadyToAnimate, setIsReadyToAnimate] = useState(false);
  const pathname = usePathname();
  // const { toast } = useToast(); // Removed

  useEffect(() => {
    setHasMounted(true);
    setIsReadyToAnimate(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Check on mount
      
      setIsLoggedIn(!!localStorage.getItem('isLoggedIn'));
      // Theme logic removed
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [pathname]); // Pathname dependency for re-checking login status on nav

  useEffect(() => {
    if (hasMounted) {
      setIsOpen(false);
    }
  }, [pathname, hasMounted]);


  if (pathname.startsWith('/dashboard')) {
    return null;
  }
  
  const useHeroSpecificStyles = hasMounted && !isScrolled && !isOpen;

  const NavItem: React.FC<{ link: NavLink; onClick?: () => void }> = ({ link, onClick }) => {
    const isActive = pathname === link.href;
    let itemClasses = "";
    let hoverClasses = "";
    let activeFontWeight = "";

    if (hasMounted) {
      if (useHeroSpecificStyles) {
        itemClasses = "text-header-hero-text-green";
        hoverClasses = "hover:text-header-hero-text-green-hover";
        if (isActive) activeFontWeight = "font-semibold";
      } else {
        if (isActive) {
          itemClasses = "text-primary"; // primary is lime green in dark theme
          activeFontWeight = "font-semibold";
        } else {
          itemClasses = "text-foreground/80"; // foreground is light gray in dark theme
          hoverClasses = "hover:text-primary";
        }
      }
    } else {
      // SSR or initial client render before hasMounted
      // Default to non-hero styles to match server
      if (isActive) {
        itemClasses = "text-primary";
        activeFontWeight = "font-semibold";
      } else {
        itemClasses = "text-foreground/80";
        hoverClasses = "hover:text-primary";
      }
    }
  
    return (
      <Link
        href={link.href}
        onClick={onClick}
        className={cn(
          "px-3 py-2 rounded-md text-sm font-medium transition-colors",
          itemClasses,
          hoverClasses,
          activeFontWeight
        )}
        aria-current={isActive ? "page" : undefined}
      >
        {link.label}
      </Link>
    );
  };
  
  let logoColorClass = "";
  let iconButtonClass = "";
  let dashboardButtonClasses = "";

  if (hasMounted) {
    if (useHeroSpecificStyles) {
      logoColorClass = "text-header-hero-text-green hover:text-header-hero-text-green-hover";
      iconButtonClass = "text-header-hero-text-green hover:text-header-hero-text-green-hover hover:bg-transparent focus:bg-transparent active:bg-transparent";
      dashboardButtonClasses = "border-header-hero-text-green text-header-hero-text-green hover:bg-header-hero-text-green/10 hover:text-header-hero-text-green-hover";
    } else {
      logoColorClass = "text-primary hover:text-primary/90"; // primary is lime green in dark
      iconButtonClass = "text-foreground hover:text-primary hover:bg-transparent focus:bg-transparent active:bg-transparent"; // foreground is light gray in dark
      dashboardButtonClasses = "border-primary text-primary hover:bg-primary/10 hover:text-primary";
    }
  } else {
    // SSR / initial client render defaults (non-hero styles)
    logoColorClass = "text-primary hover:text-primary/90";
    iconButtonClass = "text-foreground hover:text-primary hover:bg-transparent focus:bg-transparent active:bg-transparent";
    dashboardButtonClasses = "border-primary text-primary hover:bg-primary/10 hover:text-primary";
  }
  
  const navClasses = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-persian",
    (hasMounted && (isScrolled || isOpen)) ? "bg-card shadow-lg" : "bg-transparent"
  );

  return (
    <motion.nav
      suppressHydrationWarning={true}
      className={navClasses}
      initial={{ y: -100 }}
      animate={isReadyToAnimate ? { y: 0 } : { y: -100 }}
      transition={isReadyToAnimate ? { type: 'spring', stiffness: 50, damping: 15 } : { duration: 0 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className={cn("flex items-center", logoColorClass)}>
             <Logo />
          </div>
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavItem key={link.href} link={link} />
            ))}
            {/* Theme toggle button removed */}
            {hasMounted ? (
              isLoggedIn ? (
                <Button 
                  asChild 
                  variant="outline" 
                  className={cn("ms-2", dashboardButtonClasses)}
                >
                  <Link href="/dashboard"><LayoutDashboard className="me-2 h-4 w-4"/>پیشخوان</Link>
                </Button>
              ) : (
                <Button asChild variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground ms-2">
                  <Link href="/auth/login"><LogIn className="me-2 h-4 w-4"/>عضویت / ورود</Link>
                </Button>
              )
            ) : (
              // Placeholder for SSR to maintain structure, actual button renders after mount
              <Button asChild variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground ms-2 invisible">
                 <Link href="/auth/login"><LogIn className="me-2 h-4 w-4"/>عضویت / ورود</Link>
              </Button>
            )}
          </div>
          <div className="md:hidden flex items-center">
             {/* Theme toggle button removed */}
            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant="ghost"
              size="icon"
              aria-label="باز/بسته کردن منو"
              aria-expanded={isOpen}
              className={iconButtonClass}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-card shadow-lg border-t border-border"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
              {navLinks.map((link) => (
                <NavItem key={link.href} link={link} onClick={() => setIsOpen(false)} />
              ))}
              {hasMounted ? (
                isLoggedIn ? (
                  <Button asChild variant="outline" className={cn("w-full mt-2", dashboardButtonClasses)}>
                    <Link href="/dashboard" onClick={() => setIsOpen(false)}><LayoutDashboard className="me-2 h-4 w-4"/>پیشخوان</Link>
                  </Button>
                ) : (
                  <Button asChild variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground w-full mt-2">
                      <Link href="/auth/login" onClick={() => setIsOpen(false)}><LogIn className="me-2 h-4 w-4"/>عضویت / ورود</Link>
                  </Button>
                )
              ) : (
                <Button asChild variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground w-full mt-2 invisible">
                  <Link href="/auth/login" onClick={() => setIsOpen(false)}><LogIn className="me-2 h-4 w-4"/>عضویت / ورود</Link>
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
