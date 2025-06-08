
import type { Metadata } from 'next';
import Image from 'next/image';
import { CheckCircle, Zap, Users, ShieldCheck, Trophy, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'درباره باشگاه سورن',
  description: 'با باشگاه ورزشی سورن، ماموریت ما برای پرورش قدرت، انضباط و جامعه از طریق ورزش آشنا شوید. تاریخچه، ارزش‌ها و چرایی برتری ما را کشف کنید.',
};

const whyChooseUsItems = [
  { icon: CheckCircle, title: 'مربیان مجاز', text: 'مربیان متخصص متعهد به موفقیت و ایمنی شما.' },
  { icon: Zap, title: 'تجهیزات مدرن', text: 'امکانات پیشرفته و تجهیزات با کیفیت بالا.' },
  { icon: Users, title: 'جامعه فراگیر', text: 'محیطی پذیرا برای تمام سطوح تناسب اندام.' },
  { icon: ShieldCheck, title: 'محیط امن', text: 'فضایی تمیز، امن و حمایتی برای تمرین.' },
];

const timelineEvents = [
  { year: '۱۳۹۳', title: 'تاسیس باشگاه سورن', description: 'با چشم‌انداز ایجاد یک مرکز ورزشی برتر تاسیس شد، جشن ۱۰ سال تعالی.' },
  { year: '۱۳۹۷', title: 'توسعه امکانات', description: 'اضافه شدن فضاهای تمرینی جدید و تجهیزات پیشرفته.' },
  { year: '۱۴۰۰', title: 'رشد جامعه', description: 'رسیدن به بیش از ۵۰۰ عضو فعال و راه‌اندازی برنامه‌های جدید.' },
  { year: '۱۴۰۳', title: 'جشن یک دهه', description: 'بزرگداشت ۱۰ سال تعهد به تناسب اندام، تمرینات ورزشی و تاثیرگذاری بر جامعه.' },
];

export default function AboutPage() {
  return (
    <div className="py-24 pt-32 md:pt-40 bg-background font-persian text-right">
      <section className="relative py-20 md:py-32 text-white">
        <Image
          src="https://placehold.co/1920x800.png"
          alt="فضای داخلی باشگاه با افراد در حال تمرین"
          layout="fill"
          objectFit="cover"
          className="z-0"
          data-ai-hint="gym activity"
        />
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
          <p className="text-2xl md:text-3xl text-accent font-semibold mb-3 tracking-wide flex items-center justify-center">
            <Trophy className="h-8 w-8 me-2" /> باشگاه ورزشی سورن – ۱۰ سال تعالی در تناسب اندام و تمرینات ورزشی <Trophy className="h-8 w-8 ms-2" />
          </p>
          <h1 className="text-5xl md:text-6xl font-bold font-headline mb-4">درباره باشگاه سورن</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            اشتیاق ما برای تعالی ورزشی و جامعه را کشف کنید.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold font-headline mb-6 text-primary">ماموریت و چشم‌انداز ما</h2>
              <p className="text-lg text-muted-foreground mb-4">
                در باشگاه سورن، ماموریت ما توانمندسازی افراد برای دستیابی به اوج پتانسیل جسمی و ذهنی خود از طریق تمرینات ورزشی جامع، و پرورش فرهنگ انضباط، تاب‌آوری و تندرستی مادام‌العمر است.
              </p>
              <p className="text-lg text-muted-foreground">
                چشم‌انداز ما این است که یک باشگاه ورزشی پیشرو باشیم که به دلیل تعهد به تعالی، فراگیری و توسعه همه‌جانبه اعضای خود شناخته شده و جامعه‌ای پرجنب‌وجوش و متحد با اشتیاق به ورزش و زندگی سالم ایجاد کند.
              </p>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
               <Image src="https://placehold.co/600x400.png" alt="تیم در حال مشورت" layout="fill" objectFit="cover" data-ai-hint="team sports" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold font-headline text-center mb-16 text-primary">سفر ما</h2>
          <div className="relative">
            {/* Horizontal line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-primary/30 transform -translate-y-1/2 z-0"></div>
            
            <div className="grid md:grid-cols-4 gap-x-8 gap-y-12 md:gap-y-0">
              {timelineEvents.map((event, index) => (
                <div key={event.year} className={cn(
                  "relative p-4 md:p-0", 
                  "md:flex md:flex-col md:justify-center" // Center content (dot and text block) vertically in the cell
                )}>
                  {/* Mobile Dot & Line container */}
                  <div className="md:hidden absolute top-1.5 right-1.5 h-full w-6 flex flex-col items-center">
                    <div className="w-4 h-4 bg-primary rounded-full border-2 border-card z-10 flex-shrink-0"></div>
                    {index < timelineEvents.length - 1 && (
                      <div className="w-0.5 flex-grow bg-primary/30 mt-1"></div>
                    )}
                  </div>
                  
                  {/* Content Block: Year, Title, Description */}
                  <div className={cn(
                    "mr-10 md:mr-0 md:text-center relative", 
                    index % 2 === 0 ? "md:order-1 md:mb-10" : "md:order-3 md:mt-10" // Increased margin
                  )}>
                    <h3 className="text-2xl font-bold font-headline text-accent">{event.year}</h3>
                    <h4 className="text-xl font-semibold mt-1 mb-1 text-foreground">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>

                  {/* Desktop Dot: Placed via order to be in the middle of text blocks */}
                  <div className={cn(
                    "hidden md:flex md:items-center md:justify-center w-full", 
                    "md:order-2" // Dot is always in the middle (between order-1 and order-3)
                  )}>
                    <div className="w-4 h-4 bg-primary rounded-full border-4 border-card z-10"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold font-headline text-center mb-16 text-primary">چرا سورن را انتخاب کنید؟</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUsItems.map((item) => (
              <div key={item.title} className="text-center p-6 bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <item.icon className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold font-headline mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold font-headline mb-12 text-primary">جوایز و همکاری‌ها</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {['لوگوهمکار۱', 'نشان‌جایزه۲', 'گواهی‌نامه۳', 'لوگواسپانسر۴'].map((logo, index) => (
              <div key={index} className="grayscale hover:grayscale-0 transition-all">
                <Image src={`https://placehold.co/150x80.png?text=${logo.replace(/\s/g, '+')}`} alt={logo} width={150} height={80} data-ai-hint="logo brand" />
              </div>
            ))}
          </div>
           <p className="text-muted-foreground mt-8 text-sm">باشگاه سورن مفتخر است که به دلیل تعالی خود شناخته شده و با سازمان‌های پیشرو در ورزش و تناسب اندام همکاری می‌کند.</p>
        </div>
      </section>

      <section className="py-16 md:py-24 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-headline mb-6 text-primary">به جامعه ما بپیوندید</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
                بخشی از خانواده سورن شوید و سفر خود را به سوی سلامتی و قدرت بیشتر آغاز کنید.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/classes">مشاهده و ثبت‌نام کلاس‌ها</Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
