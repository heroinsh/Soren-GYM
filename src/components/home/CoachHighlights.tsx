
"use client";
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CoachHighlight {
  name: string;
  specialty: string;
  imageSrc: string;
  imageHint: string;
}

const featuredCoaches: CoachHighlight[] = [
  { name: 'مربی بهرام‌زاده', specialty: 'والیبال بانوان', imageSrc: 'https://placehold.co/400x400.png', imageHint: 'female coach volleyball' },
  { name: 'مربی رحمانی', specialty: 'بسکتبال آقایان و جوانان', imageSrc: 'https://placehold.co/400x400.png', imageHint: 'male coach basketball' },
  { name: 'استاد امینی', specialty: 'کونگ‌فو', imageSrc: 'https://placehold.co/400x400.png', imageHint: 'martial arts master' },
  { name: 'مربی عباسی', specialty: 'ایروبیک و فانکشنال فیتنس', imageSrc: 'https://placehold.co/400x400.png', imageHint: 'female fitness instructor' },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

export const CoachHighlights = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl font-bold text-center mb-4 font-headline text-primary"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          با مربیان متخصص ما آشنا شوید
        </motion.h2>
        <motion.p 
          className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12 font-persian"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          مربیان مجرب و گواهی‌دار ما مشتاق کمک به شما برای رسیدن به اهداف تناسب اندامتان هستند.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredCoaches.map((coach, index) => (
            <motion.div
              key={coach.name}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="h-full"
            >
              <Card className="h-full overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col bg-card">
                <CardHeader className="p-0">
                  <div className="aspect-square relative w-full">
                    <Image
                      src={coach.imageSrc}
                      alt={coach.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                      data-ai-hint={coach.imageHint}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6 text-center flex-grow">
                  <CardTitle className="text-xl font-semibold mb-1 font-headline text-foreground">{coach.name}</CardTitle>
                  <p className="text-sm text-primary font-persian">{coach.specialty}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
            <Link href="/coaches">مشاهده همه مربیان</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
