
"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const CallToActionStrip = () => {
  return (
    <section className="py-12 md:py-20 bg-primary text-primary-foreground">
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">
          آماده برداشتن قدم بعدی هستید؟
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto font-persian">
          برنامه‌های کلاسی ما را بررسی کنید، با مربیان پرشور ما آشنا شوید، یا همین امروز در کلاس‌های متنوع ما ثبت‌نام کنید. سفر تناسب اندام شما از اینجا شروع می‌شود!
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg">
            <Link href="/classes">مشاهده برنامه کلاس‌ها</Link>
          </Button>
          <Button 
            asChild 
            size="lg" 
            // variant="outline" // Remove variant to apply custom glassmorphism
            className={cn(
              "px-8 py-3 text-lg", // Standard padding and text size
              "border border-primary-foreground", // Keep border
              "text-primary-foreground", // Keep text color
              "bg-primary-foreground/10 hover:bg-primary-foreground/20", // Glassmorphism background
              "transition-colors duration-150 rounded-md" // Ensure rounded corners and transition
            )}
          >
            <Link href="/coaches">آشنایی با مربیان</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
};
