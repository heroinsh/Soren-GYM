
"use client";
import Link from 'next/link';
import { Logo } from '@/components/common/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { socialLinks } from '@/data/socialLinks';
import { navLinks } from '@/data/navLinks';
import { usePathname } from 'next/navigation';

export const Footer = () => {
  const pathname = usePathname();

  if (pathname.startsWith('/dashboard')) {
    return null;
  }

  return (
    <footer className="bg-card border-t border-border text-card-foreground pt-16 pb-8 font-persian">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-primary"><Logo /></div>
            <p className="mt-4 text-sm text-muted-foreground">
              قدرت. انضباط. جامعه. <br />
              باشگاه ورزشی سورن به ارائه تمرینات و امکانات سطح بالا متعهد است.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold font-headline mb-4">دسترسی سریع</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold font-headline mb-4">تماس با ما</h3>
            <address className="not-italic text-sm text-muted-foreground space-y-2">
              <p>شیراز، انتهای بلوار سفیر جنوبی، میدان مهارت، مجموعه ورزشی سورن</p>
              <p>ایمیل: <a href="mailto:info@sorenathletics.com" className="hover:text-primary hover:underline">info@sorenathletics.com</a></p>
              <p>تلفن: <a href="tel:07138247977" className="hover:text-primary hover:underline">۳۸۲۴۷۹۷۷-۰۷۱</a> / <a href="tel:07138342622" className="hover:text-primary hover:underline">۳۸۳۴۲۶۲۲-۰۷۱</a></p>
            </address>
          </div>

          <div>
            <h3 className="text-lg font-semibold font-headline mb-4">خبرنامه</h3>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <Input type="email" placeholder="آدرس ایمیل شما" className="flex-grow" aria-label="ورودی ایمیل برای خبرنامه"/>
              <Button type="submit" variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground">عضویت</Button>
            </form>
            <div className="mt-6">
              <h3 className="text-lg font-semibold font-headline mb-3">ما را دنبال کنید</h3>
              <div className="flex space-x-4 space-x-reverse">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`باشگاه سورن در ${social.persianName}`}
                    className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
                  >
                    <social.Icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 mt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().toLocaleDateString('fa-IR', { year: 'numeric' })} باشگاه ورزشی سورن. تمامی حقوق محفوظ است.</p>
          <p className="mt-1">
            Developed by <a href="https://github.com/shayansha" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Shayan</a>
          </p>
        </div>
      </div>
    </footer>
  );
};
