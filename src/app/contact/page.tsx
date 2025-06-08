
"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { socialLinks } from '@/data/socialLinks';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import type { Metadata } from 'next'; // Not used directly for client component metadata

// For client components, metadata is typically handled via document.title or a head manager library.
// export const metadata: Metadata = {
// title: 'تماس با باشگاه سورن',
// description: 'با باشگاه ورزشی سورن تماس بگیرید. آدرس، تلفن، ایمیل و ساعات کاری ما را بیابید یا فرم تماس را برای سوالات خود پر کنید.',
// keywords: ['تماس با باشگاه سورن', 'آدرس باشگاه سورن شیراز', 'تلفن باشگاه سورن', 'ایمیل باشگاه سورن', 'باشگاه ورزشی شیراز'],
// };

export default function ContactPage() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    document.title = 'تماس با ما | باشگاه ورزشی سورن';
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name || !email || !message) {
      toast({ title: "خطا", description: "لطفاً تمامی فیلدها را پر کنید.", variant: "destructive" });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({ title: "خطا", description: "فرمت ایمیل وارد شده صحیح نیست.", variant: "destructive" });
      return;
    }
    // In a real app, you would send this data to a backend.
    console.log({ name, email, message });
    toast({ title: "پیام ارسال شد", description: "از پیام شما متشکریم. به زودی با شما تماس خواهیم گرفت." });
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="py-24 pt-32 md:pt-40 bg-background font-persian text-right">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold font-headline mb-4 text-primary">در تماس باشید</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            ما اینجا هستیم تا به هر سوالی که دارید پاسخ دهیم. با ما تماس بگیرید و ما در اسرع وقت پاسخ خواهیم داد.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="bg-card p-8 rounded-lg shadow-xl">
            <h2 className="text-3xl font-semibold font-headline mb-6">برای ما پیام ارسال کنید</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">نام کامل *</Label>
                <Input 
                  type="text" 
                  name="name" 
                  id="name" 
                  required 
                  className="mt-1 block w-full" 
                  placeholder="مثال: آریا رحیمی"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">آدرس ایمیل *</Label>
                <Input 
                  type="email" 
                  name="email" 
                  id="email" 
                  required 
                  className="mt-1 block w-full" 
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              <div>
                <Label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">پیام *</Label>
                <Textarea 
                  name="message" 
                  id="message" 
                  rows={5} 
                  required 
                  className="mt-1 block w-full" 
                  placeholder="پیام شما..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Send className="ms-2 h-4 w-4" /> ارسال پیام
                </Button>
              </div>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-card p-8 rounded-lg shadow-xl">
              <h2 className="text-3xl font-semibold font-headline mb-6">اطلاعات تماس</h2>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start">
                  <MapPin className="h-6 w-6 text-primary ms-3 mt-1 shrink-0" />
                  <span>شیراز، انتهای بلوار سفیر جنوبی، میدان مهارت، مجموعه ورزشی سورن</span>
                </li>
                <li className="flex items-start">
                  <Mail className="h-6 w-6 text-primary ms-3 mt-1 shrink-0" />
                  <a href="mailto:info@sorenathletics.com" className="hover:text-primary">info@sorenathletics.com</a>
                </li>
                <li className="flex items-start">
                  <Phone className="h-6 w-6 text-primary ms-3 mt-1 shrink-0" />
                  <div>
                    <a href="tel:07138247977" className="hover:text-primary block">۳۸۲۴۷۹۷۷-۰۷۱</a>
                    <a href="tel:07138342622" className="hover:text-primary block">۳۸۳۴۲۶۲۲-۰۷۱</a>
                  </div>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t">
                 <h3 className="text-xl font-semibold font-headline mb-3 flex items-center"><Clock className="h-5 w-5 text-primary ms-2"/> ساعات کاری</h3>
                 <p>شنبه تا چهارشنبه: ۶ صبح الی ۱۰ شب</p> 
                 <p>پنج‌شنبه و جمعه: ۸ صبح الی ۸ شب</p>
              </div>
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-xl font-semibold font-headline mb-4">ما را دنبال کنید</h3>
                <div className="flex space-x-4 space-x-reverse">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`باشگاه سورن در ${social.name}`}
                      className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
                    >
                      <social.Icon className="h-6 w-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-card p-2 rounded-lg shadow-xl aspect-[4/3] overflow-hidden">
              <Image 
                src="https://placehold.co/800x600.png" 
                alt="نقشه محل باشگاه" 
                width={800} 
                height={600}
                className="w-full h-full object-cover rounded"
                data-ai-hint="gym location map"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
