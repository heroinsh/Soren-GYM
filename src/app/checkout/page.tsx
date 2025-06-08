
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { Trash2, ArrowRight, CreditCard, Ticket } from 'lucide-react'; 
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

interface CartClassItem {
  id: string; 
  originalClassId?: string; 
  name: string;
  coach: string;
  schedule: string;
  image: string;
  imageHint: string;
  price?: number;
  description?:string;
  tags?: string[];
}

interface UserEnrolledClass {
  id: string; 
  name: string;
  coach: string;
  schedule: string;
  nextPaymentDate: string;
  status: 'Active' | 'Expiring Soon' | 'Expired';
  monthlyFee: number;
}


export default function CheckoutPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartClassItem[]>([]);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "پرداخت | باشگاه ورزشی سورن";
    const metaDesc = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    metaDesc.setAttribute('content', 'خلاصه سفارش خود را بررسی کرده و پرداخت کلاس‌های انتخابی در باشگاه سورن را نهایی کنید.');
    if (!document.querySelector('meta[name="description"]')) {
        document.head.appendChild(metaDesc);
    }
    const metaKeywords = document.querySelector('meta[name="keywords"]') || document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    metaKeywords.setAttribute('content', 'پرداخت آنلاین باشگاه سورن, سبد خرید سورن, نهایی کردن ثبت نام کلاس, شهریه کلاس ورزشی');
    if (!document.querySelector('meta[name="keywords"]')) {
        document.head.appendChild(metaKeywords);
    }

    const storedCart = localStorage.getItem('shoppingCartSoren');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCartItems(parsedCart);
      if (parsedCart.length === 0 && typeof window !== 'undefined') {
        toast({ title: "سبد خرید خالی است", description: "سبد خرید شما خالی است. به صفحه کلاس‌ها هدایت می‌شوید.", variant: "default" });
        router.push('/dashboard/classes');
      }
    } else if (typeof window !== 'undefined') {
        toast({ title: "سبد خرید خالی است", description: "سبد خرید شما خالی است. به صفحه کلاس‌ها هدایت می‌شوید.", variant: "default" });
        router.push('/dashboard/classes');
    }
    setIsLoading(false);
  }, [router, toast]); 

  const handleRemoveItem = (itemId: string) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('shoppingCartSoren', JSON.stringify(updatedCart));
    toast({ title: "آیتم حذف شد", description: "کلاس از سبد خرید شما حذف شد." });
    if (updatedCart.length === 0) {
        router.push('/dashboard/classes');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);
  const discountAmount = subtotal * (appliedDiscount / 100);
  const total = subtotal - discountAmount;

  const handleApplyDiscount = () => {
    if (discountCode.toUpperCase() === 'SOREN10') { 
      setAppliedDiscount(10);
      toast({ title: "تخفیف اعمال شد", description: "تخفیف ۱۰٪ با موفقیت اعمال شد." });
    } else if (discountCode) {
      toast({ title: "کد نامعتبر", description: "کد تخفیف وارد شده معتبر نیست.", variant: "destructive" });
      setAppliedDiscount(0);
    } else {
        toast({ title: "کد وارد نشده", description: "لطفاً یک کد تخفیف وارد کنید.", variant: "destructive" });
    }
  };

  const handleProceedToPayment = () => {
    toast({ 
      title: "در حال انتقال به درگاه پرداخت...", 
      description: "لطفاً منتظر بمانید. این یک فرآیند شبیه‌سازی شده است.",
      duration: 3000 
    });

    setTimeout(() => {
      const existingEnrolledClasses: UserEnrolledClass[] = JSON.parse(localStorage.getItem('sorenUserEnrolledClasses') || '[]');
      const updatedEnrolledClasses = [...existingEnrolledClasses];

      cartItems.forEach(cartItem => {
        const isRenewal = cartItem.id.includes('-renewal-');
        const originalClassId = isRenewal ? (cartItem.originalClassId || cartItem.id.split('-renewal-')[0]) : cartItem.id;
        
        const nextPaymentDate = new Date();
        nextPaymentDate.setDate(nextPaymentDate.getDate() + 30); 

        const existingClassIndex = updatedEnrolledClasses.findIndex(cls => cls.id === originalClassId);

        if (existingClassIndex > -1) { 
          updatedEnrolledClasses[existingClassIndex].nextPaymentDate = nextPaymentDate.toISOString().split('T')[0];
          updatedEnrolledClasses[existingClassIndex].status = 'Active';
        } else { 
          updatedEnrolledClasses.push({
            id: originalClassId,
            name: cartItem.name.replace(' (تمدید)', '').replace(' (Renewal)', ''),
            coach: cartItem.coach,
            schedule: cartItem.schedule,
            nextPaymentDate: nextPaymentDate.toISOString().split('T')[0],
            status: 'Active',
            monthlyFee: cartItem.price || 0,
          });
        }
      });

      localStorage.setItem('sorenUserEnrolledClasses', JSON.stringify(updatedEnrolledClasses));
      
      const mockTrackingCode = `SRN-${Date.now().toString().slice(-6)}`;
      router.push(`/verify-payment?status=success&trackingCode=${mockTrackingCode}`);
    }, 3000);
  };
  
  if (isLoading) {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32 md:pt-40 flex flex-col items-center justify-center text-center min-h-[calc(100vh-10rem)]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-lg text-muted-foreground">در حال بارگذاری سبد خرید شما...</p>
        </div>
    );
  }

  if (cartItems.length === 0 && !isLoading) {
      return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32 md:pt-40 flex flex-col items-center justify-center text-center min-h-[calc(100vh-10rem)]">
            <h1 className="text-4xl font-bold font-headline mb-4 text-primary">پرداخت</h1>
            <p className="text-xl text-muted-foreground mb-8">سبد خرید شما در حال حاضر خالی است.</p>
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/dashboard/classes">مرور کلاس‌ها</Link>
            </Button>
        </div>
      )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32 md:pt-40">
      <header className="mb-10 text-center relative">
        <Button variant="outline" onClick={() => router.back()} className="absolute right-0 top-0 md:right-8 md:top-0"> 
            <ArrowRight className="me-2 h-4 w-4"/> بازگشت
        </Button>
        <h1 className="text-4xl font-bold font-headline text-primary">پرداخت</h1>
        <p className="text-lg text-muted-foreground">ثبت‌نام کلاس‌های خود را نهایی کنید.</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-semibold font-headline">خلاصه سفارش</h2>
            {cartItems.map(item => (
            <Card key={item.id} className="flex items-center p-4 space-s-4 shadow">
                <div className="relative w-24 h-[75px] sm:w-[100px] sm:h-[75px] shrink-0">
                    <Image
                        src={item.image}
                        alt={item.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                        data-ai-hint={item.imageHint}
                    />
                </div>
                <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-muted-foreground">مربی: {item.coach}</p>
                <p className="text-sm text-muted-foreground">برنامه: {item.schedule}</p>
                </div>
                <div className="text-start"> 
                <p className="font-semibold text-lg">{item.price ? new Intl.NumberFormat('fa-IR').format(item.price) : 'رایگان'} ریال</p>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive/80 mt-1 px-1"
                    onClick={() => handleRemoveItem(item.id)}
                    aria-label={`حذف ${item.name} از سبد خرید`}
                >
                    <Trash2 className="me-1 h-4 w-4" /> حذف
                </Button>
                </div>
            </Card>
            ))}
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl">جزئیات پرداخت</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-end space-s-2"> 
                <div className="flex-grow space-y-1">
                  <Label htmlFor="discountCode">کد تخفیف</Label>
                  <Input 
                    id="discountCode" 
                    placeholder="کد را وارد کنید (مثال: SOREN10)" 
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    aria-label="کد تخفیف"
                  />
                </div>
                <Button onClick={handleApplyDiscount} variant="outline" className="h-10 border-primary text-primary hover:bg-primary/10">
                  <Ticket className="me-2 h-4 w-4" /> اعمال
                </Button>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>جمع فرعی:</span>
                  <span>{new Intl.NumberFormat('fa-IR').format(subtotal)} ریال</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>تخفیف ({appliedDiscount}٪):</span>
                    <span>-{new Intl.NumberFormat('fa-IR').format(discountAmount)} ریال</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold text-xl">
                  <span>مجموع:</span>
                  <span>{new Intl.NumberFormat('fa-IR').format(total)} ریال</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3"
                onClick={handleProceedToPayment}
                disabled={cartItems.length === 0}
                >
                <CreditCard className="me-2 h-5 w-5" /> پرداخت (شبیه‌سازی شده)
              </Button>
            </CardFooter>
          </Card>
          <p className="text-xs text-muted-foreground text-center">
            شما برای تکمیل خرید به درگاه پرداخت هدایت خواهید شد. این یک فرآیند شبیه‌سازی شده است.
          </p>
        </div>
      </div>
    </div>
  );
}
