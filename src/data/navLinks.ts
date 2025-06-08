
export interface NavLink {
  href: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: '/', label: 'صفحه اصلی' },
  { href: '/classes', label: 'کلاس‌ها' },
  { href: '/about', label: 'درباره ما' },
  { href: '/coaches', label: 'مربیان' },
  { href: '/contact', label: 'تماس با ما' },
];
