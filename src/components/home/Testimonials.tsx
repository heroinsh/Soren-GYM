
"use client";
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Star, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Testimonial {
  name: string;
  feedback: string;
  imageSrc?: string;
  imageHint?: string;
  sport: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  { name: 'سارا ل.', feedback: '"باشگاه سورن زندگی من را تغییر داد! مربیان فوق‌العاده‌اند و جامعه بسیار حمایتگر است."', sport: 'فانکشنال فیتنس', rating: 5, imageHint: 'happy woman' },
  { name: 'جان ب.', feedback: '"به لطف برنامه‌های تمرینی اختصاصی اینجا، در بسکتبال به اوج عملکردم رسیدم."', sport: 'بسکتبال', rating: 5, imageHint: 'athlete man' },
  { name: 'امیلی ک.', feedback: '"کلاس‌های زومبا بسیار سرگرم‌کننده و یک تمرین عالی هستند. سورن را به شدت توصیه می‌کنم!"', sport: 'زومبا', rating: 5, imageSrc: 'https://placehold.co/100x100.png', imageHint: 'woman fitness' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl font-bold text-center mb-4 font-headline"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          داستان‌های موفقیت اعضای ما
        </motion.h2>
        <motion.p 
          className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12 font-persian"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          بشنوید که اعضای ما درباره تجربه‌شان در باشگاه سورن چه می‌گویند.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="h-full"
            >
              <Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 text-right">
                <CardHeader className="flex flex-row-reverse items-center space-x-4 space-x-reverse pb-4 text-right">
                   <Avatar className="h-12 w-12">
                    {testimonial.imageSrc && <AvatarImage src={testimonial.imageSrc} alt={testimonial.name} data-ai-hint={testimonial.imageHint} />}
                    <AvatarFallback>
                      {testimonial.name.split(' ').map(n => n[0]).join('') || <User />}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold font-headline text-lg">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground font-persian">{testimonial.sport}</p>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground italic font-persian">"{testimonial.feedback}"</p>
                </CardContent>
                <CardFooter className="pt-4 justify-start">
                  <div className="flex">
                    {Array(testimonial.rating).fill(0).map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                    {Array(5 - testimonial.rating).fill(0).map((_, i) => (
                       <Star key={i + testimonial.rating} className="h-5 w-5 text-yellow-400" />
                    ))}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
