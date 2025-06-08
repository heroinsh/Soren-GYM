
"use client";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const HeroSection = () => {
  return (
    <div className="relative h-screen min-h-[600px] flex items-center justify-center text-center text-white overflow-hidden pt-20">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="ورزشکاران در حال حرکت"
        layout="fill"
        objectFit="cover"
        quality={90}
        priority
        className="z-0"
        data-ai-hint="athletes action"
      />
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      <motion.div 
        className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold font-headline mb-6 leading-tight">
          سورن: <span className="text-accent">قدرت.</span> انضباط. جامعه.
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl font-persian max-w-3xl mx-auto mb-10 text-gray-200">
          مسیر تناسب اندام خود را با مربیگری در سطح جهانی، امکانات پیشرفته و جامعه‌ای حمایتگر و متعهد به تعالی ورزشی، ارتقا دهید.
        </p>
        <div className="space-x-4 space-x-reverse">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg">
            <Link href="/auth/login">ثبت‌نام / ورود</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10 px-8 py-3 text-lg">
            <Link href="/classes">مشاهده کلاس‌ها</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
