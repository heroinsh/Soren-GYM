
"use client";
import { Clock, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface HighlightItem {
  icon: React.ElementType;
  title: string;
  details: string[];
  telLinks?: string[];
}

const highlights: HighlightItem[] = [
  {
    icon: Clock,
    title: 'ساعات کاری',
    details: ['شنبه تا چهارشنبه: ۶ صبح - ۱۰ شب', 'پنج‌شنبه و جمعه: ۸ صبح - ۸ شب'], // Adjusted for typical Persian week, verify actual hours
  },
  {
    icon: MapPin,
    title: 'موقعیت مکانی',
    details: ['شیراز، انتهای بلوار سفیر جنوبی، میدان مهارت، مجموعه ورزشی سورن'],
  },
  {
    icon: Phone,
    title: 'تماس با ما',
    details: ['۳۸۲۴۷۹۷۷-۰۷۱', '۳۸۳۴۲۶۲۲-۰۷۱', 'info@sorenathletics.com'],
    telLinks: ['tel:07138247977', 'tel:07138342622', 'mailto:info@sorenathletics.com']
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: "easeOut"
    },
  }),
};

export const InfoHighlights = () => {
  return (
    <section className="py-16 md:py-20 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              custom={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              <Card className="h-full p-6 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col items-center">
                  <item.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2 font-headline">{item.title}</h3>
                  {item.details.map((detail, i) => (
                    item.telLinks && item.telLinks[i] ? 
                    <a href={item.telLinks[i]} key={i} className="text-muted-foreground hover:text-primary font-persian">{detail}</a>
                    : <p key={i} className="text-muted-foreground font-persian">{detail}</p>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
