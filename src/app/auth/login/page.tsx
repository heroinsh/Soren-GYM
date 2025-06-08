
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

export default function AuthPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    document.documentElement.lang = 'fa';
    document.documentElement.dir = 'rtl';
    document.title = "ورود / ثبت‌نام | باشگاه ورزشی سورن";
    const metaDesc = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    metaDesc.setAttribute('content', 'به حساب کاربری خود در باشگاه سورن وارد شوید یا برای دسترسی به کلاس‌ها و امکانات ثبت‌نام کنید.');
    if (!document.querySelector('meta[name="description"]')) {
        document.head.appendChild(metaDesc);
    }
    const metaKeywords = document.querySelector('meta[name="keywords"]') || document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    metaKeywords.setAttribute('content', 'ورود باشگاه سورن, ثبت نام باشگاه سورن, حساب کاربری سورن, عضویت باشگاه ورزشی');
    if (!document.querySelector('meta[name="keywords"]')) {
        document.head.appendChild(metaKeywords);
    }
  }, []);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !password) {
      toast({ title: "خطای ورود", description: "لطفاً ایمیل و رمز عبور را وارد کنید.", variant: "destructive" });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({ title: "خطای ورود", description: "فرمت ایمیل وارد شده صحیح نیست.", variant: "destructive" });
      return;
    }
    console.log('شبیه‌سازی ورود برای:', email);
    toast({ title: "ورود موفق", description: "خوش آمدید! در حال هدایت به پیشخوان..." });
    if (typeof window !== 'undefined') {
      localStorage.setItem('isLoggedIn', 'true');
    }
    router.push('/dashboard');
  };

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();
    if (!fullName || !email || !password || !confirmPassword) {
      toast({ title: "خطای ثبت‌نام", description: "لطفاً تمام فیلدها را پر کنید.", variant: "destructive" });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({ title: "خطای ثبت‌نام", description: "فرمت ایمیل وارد شده صحیح نیست.", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "خطای ثبت‌نام", description: "رمز عبور باید حداقل ۶ کاراکتر باشد.", variant: "destructive" });
      return;
    }
    if (password !== confirmPassword) {
      toast({ title: "خطای ثبت‌نام", description: "رمزهای عبور مطابقت ندارند.", variant: "destructive" });
      return;
    }
    console.log('شبیه‌سازی ثبت‌نام برای:', email);
    toast({ title: "ثبت‌نام موفق", description: "حساب کاربری شما ایجاد شد. لطفاً برای ادامه وارد شوید." });
    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };


  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background pt-24 md:pt-32 font-persian text-right" dir="rtl">
      <div className="max-w-md w-full space-y-8">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">ورود</TabsTrigger>
            <TabsTrigger value="register">ثبت‌نام</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold font-headline text-center text-primary">خوش آمدید!</CardTitle>
                <CardDescription className="text-center">
                  برای دسترسی به پیشخوان و کلاس‌های خود وارد شوید.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">ایمیل *</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      dir="ltr" 
                      autoComplete="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">رمز عبور *</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      dir="ltr"
                      autoComplete="current-password"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    ورود
                  </Button>
                  <Button variant="link" size="sm" className="text-sm text-muted-foreground" onClick={() => alert("قابلیت فراموشی رمز عبور هنوز پیاده‌سازی نشده است.")}>
                    رمز عبور خود را فراموش کرده‌اید؟
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold font-headline text-center text-primary">ایجاد حساب کاربری</CardTitle>
                <CardDescription className="text-center">
                  امروز به باشگاه سورن بپیوندید!
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-fullname">نام و نام خانوادگی *</Label>
                    <Input
                      id="register-fullname"
                      type="text"
                      placeholder="مثال: آریا رحیمی"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      autoComplete="name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">ایمیل *</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      dir="ltr"
                      autoComplete="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">رمز عبور *</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="حداقل ۶ کاراکتر"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      dir="ltr"
                      autoComplete="new-password"
                      minLength={6}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password">تکرار رمز عبور *</Label>
                    <Input
                      id="register-confirm-password"
                      type="password"
                      placeholder="تکرار رمز عبور"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      dir="ltr"
                      autoComplete="new-password"
                      minLength={6}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    ثبت‌نام
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
