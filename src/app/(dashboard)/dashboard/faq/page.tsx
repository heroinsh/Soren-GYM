
"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, BookOpen, CreditCard, UserPlus, Tv } from 'lucide-react';

const faqSections = [
  {
    title: 'ثبت‌نام و عضویت',
    icon: UserPlus,
    keywords: ['ثبت نام باشگاه سورن', 'عضویت باشگاه ورزشی', 'نحوه ثبت نام در باشگاه', 'مدارک لازم برای ثبت نام باشگاه'],
    questions: [
      {
        q: 'چگونه می‌توانم در باشگاه سورن ثبت‌نام کنم؟',
        a: 'شما می‌توانید به صورت حضوری به پذیرش باشگاه مراجعه کنید یا از طریق همین وب‌سایت در بخش "ثبت‌نام کلاس‌ها" اقدام به انتخاب و پرداخت شهریه کلاس مورد نظر خود نمایید. برای ثبت‌نام حضوری، به همراه داشتن کارت ملی و یک قطعه عکس پرسنلی الزامی است.',
      },
      {
        q: 'آیا برای عضویت محدودیت سنی وجود دارد؟',
        a: 'خیر، باشگاه سورن برای تمامی رده‌های سنی از کودکان تا بزرگسالان کلاس‌های متنوعی ارائه می‌دهد. برخی کلاس‌ها ممکن است محدودیت سنی خاص خود را داشته باشند که در توضیحات کلاس ذکر شده است.',
      },
      {
        q: 'آیا امکان استفاده آزمایشی از کلاس‌ها قبل از ثبت‌نام وجود دارد؟',
        a: 'در حال حاضر امکان استفاده آزمایشی رایگان از کلاس‌ها وجود ندارد. اما می‌توانید با هماهنگی قبلی از امکانات باشگاه بازدید نمایید.',
      },
    ],
  },
  {
    title: 'کلاس‌ها و برنامه‌ها',
    icon: BookOpen,
    keywords: ['کلاس های ورزشی سورن', 'برنامه کلاسی باشگاه', 'انواع ورزش در باشگاه', 'کلاس بدنسازی', 'کلاس والیبال شیراز'],
    questions: [
      {
        q: 'چه نوع کلاس‌هایی در باشگاه سورن ارائه می‌شود؟',
        a: 'ما طیف وسیعی از کلاس‌ها شامل والیبال، بسکتبال، ژیمناستیک، کونگ‌فو، کاراته، بدنسازی، ایروبیک، زومبا، فانکشنال فیتنس و TRX را برای آقایان و بانوان در سطوح مختلف ارائه می‌دهیم.',
      },
      {
        q: 'برنامه زمانی کلاس‌ها چگونه است؟',
        a: 'برنامه زمانی دقیق هر کلاس در صفحه "کلاس‌ها" و همچنین در صفحه "ثبت‌نام کلاس‌ها" در پیشخوان کاربری شما قابل مشاهده است.',
      },
      {
        q: 'آیا برای شرکت در کلاس‌ها نیاز به سطح آمادگی خاصی است؟',
        a: 'بسیاری از کلاس‌های ما برای سطوح مختلف از مبتدی تا پیشرفته طراحی شده‌اند. در توضیحات هر کلاس سطح مورد نیاز ذکر شده است. مربیان ما نیز آماده راهنمایی شما برای انتخاب کلاس مناسب هستند.',
      },
    ],
  },
  {
    title: 'امکانات باشگاه',
    icon: Tv,
    keywords: ['امکانات باشگاه سورن', 'تجهیزات ورزشی باشگاه', 'سونا باشگاه شیراز', 'سالن بدنسازی مجهز'],
    questions: [
      {
        q: 'باشگاه سورن چه امکاناتی دارد؟',
        a: 'باشگاه سورن مجهز به سالن‌های تخصصی برای رشته‌های مختلف، تجهیزات بدنسازی مدرن، سیستم تهویه مطبوع، رختکن‌های مجهز به دوش و کمد اختصاصی، و همچنین سونا خشک و بخار (در سانس‌های مشخص) می‌باشد.',
      },
      {
        q: 'آیا پارکینگ برای اعضا موجود است؟',
        a: 'بله، فضای کافی برای پارک خودرو در اطراف مجموعه ورزشی سورن وجود دارد.',
      },
    ],
  },
  {
    title: 'پرداخت و شهریه',
    icon: CreditCard,
    keywords: ['شهریه باشگاه سورن', 'نحوه پرداخت شهریه کلاس', 'تخفیف شهریه باشگاه', 'تمدید عضویت باشگاه'],
    questions: [
      {
        q: 'شهریه کلاس‌ها چقدر است و چگونه محاسبه می‌شود؟',
        a: 'شهریه هر کلاس بسته به نوع، مدت زمان و مربی آن متفاوت است. مبلغ دقیق شهریه برای هر کلاس در صفحه "ثبت‌نام کلاس‌ها" قابل مشاهده است. شهریه‌ها معمولاً به صورت ماهانه دریافت می‌شوند.',
      },
      {
        q: 'روش‌های پرداخت شهریه چگونه است؟',
        a: 'شما می‌توانید شهریه خود را به صورت آنلاین از طریق درگاه پرداخت وب‌سایت (پس از انتخاب کلاس در پیشخوان) یا به صورت حضوری در محل باشگاه پرداخت نمایید.',
      },
      {
        q: 'آیا امکان لغو ثبت‌نام و استرداد وجه وجود دارد؟',
        a: 'پس از ثبت‌نام قطعی و پرداخت شهریه، امکان استرداد وجه وجود ندارد. لطفاً قبل از ثبت‌نام از انتخاب خود اطمینان حاصل کنید.',
      },
    ],
  },
];

export default function FAQPage() {
  useEffect(() => {
    document.title = 'سوالات متداول | باشگاه ورزشی سورن';
    const metaDesc = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    metaDesc.setAttribute('content', 'پاسخ به سوالات رایج درباره ثبت‌نام، کلاس‌ها، امکانات و شهریه‌های باشگاه ورزشی سورن. اگر سوال شما اینجا نیست، با ما تماس بگیرید.');
    if (!document.querySelector('meta[name="description"]')) {
        document.head.appendChild(metaDesc);
    }
  }, []);

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary flex items-center">
          <HelpCircle className="me-3 h-8 w-8" /> سوالات متداول
        </h1>
        <p className="text-lg text-muted-foreground">
          پاسخ به سوالات رایج شما در مورد باشگاه ورزشی سورن.
        </p>
      </header>

      {faqSections.map((section) => (
        <Card key={section.title} className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-headline text-primary">
              <section.icon className="me-2 h-6 w-6" /> {section.title}
            </CardTitle>
            <CardDescription>
              کلمات کلیدی: {section.keywords.join(', ')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {section.questions.map((faq, index) => (
                <AccordionItem value={`item-${section.title}-${index}`} key={index}>
                  <AccordionTrigger className="text-right hover:no-underline font-semibold">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-right">
                    <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      ))}
      
      <Card className="mt-8 bg-muted/30">
        <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
                سوال دیگری دارید؟ با ما <Link href="/contact" className="text-primary hover:underline font-semibold">تماس بگیرید</Link>.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
