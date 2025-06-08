
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';


export const Logo = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false); // Assuming you might pass navbar's open state if needed

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    // Add other logic to detect if mobile nav is open if that affects logo color
    // e.g. by checking a class on body or a global state. For now, we'll focus on scroll.
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Determine logo color: default to primary, but white on dark hero if not scrolled and not in dashboard
  // This logic needs to be aware of whether the mobile menu is open, as that forces a background.
  // For simplicity, assuming 'isNavOpen' might be passed or derived. If mobile nav always has card background,
  // then only scroll matters for non-dark-hero pages.

  const isDarkHeroPage = pathname === '/' || pathname.startsWith('/about') || pathname.startsWith('/auth/login');
  const useWhiteLogo = !isScrolled && isDarkHeroPage && !pathname.startsWith('/dashboard');

  // If mobile nav is open (isOpen passed to Navbar), Navbar bg is 'bg-card', so logo should be primary
  // This requires 'isOpen' from Navbar. Simpler: if `isScrolled` OR `isOpen` (from hypothetical context/prop)
  // For now, this logic is embedded in Navbar.tsx for the text-primary/text-white classes.
  // Here, we just provide the base link. The color class will be applied by the parent Navbar.
  
  return (
    <Link href="/" className="text-3xl font-bold font-headline">
      سورن
    </Link>
  );
};
