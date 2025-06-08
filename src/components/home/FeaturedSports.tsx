
"use client";
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react'; // Changed to ArrowLeft for RTL "Learn More"

interface Sport {
  name: string;
  imageSrc: string;
  imageHint: string;
  link: string;
  description: string;
}

const sports: Sport[] = [
  { name: 'والیبال', imageSrc: 'https://placehold.co/600x400.png', imageHint: 'volleyball game', link: '/classes#volleyball', description: 'بازی تیمی پویا و مهارت محور.' },
  { name: 'بسکتبال', imageSrc: 'https://placehold.co/600x400.png', imageHint: 'basketball action', link: '/classes#basketball', description: 'هیجان و سرعت در زمین مسابقه.' },
  { name: 'ژیمناستیک', imageSrc: 'https://placehold.co/600x400.png', imageHint: 'gymnast performing', link: '/classes#gymnastics', description: 'ظرافت، قدرت و انعطاف‌پذیری.' },
  { name: 'هنرهای رزمی', imageSrc: 'https://placehold.co/600x400.png', imageHint: 'karate kick', link: '/classes#martial-arts', description: 'انضباط، تمرکز و دفاع شخصی.' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeInOut",
    },
  }),
};

export const FeaturedSports = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl font-bold text-center mb-4 font-headline"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          اشتیاق خود را کشف کنید
        </motion.h2>
        <motion.p 
          className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12 font-persian"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          طیف وسیعی از رشته‌های ورزشی و تناسب اندام را که هر یک توسط مربیان متخصص هدایت می‌شوند، کاوش کنید.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {sports.map((sport, index) => (
            <motion.div
              key={sport.name}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
              className="h-full"
            >
              <Link href={sport.link} className="block h-full">
                <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col">
                  <CardHeader className="p-0">
                    <div className="aspect-video relative w-full">
                      <Image
                        src={sport.imageSrc}
                        alt={sport.name}
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint={sport.imageHint}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 flex-grow flex flex-col text-right">
                    <CardTitle className="text-2xl font-semibold mb-2 font-headline">{sport.name}</CardTitle>
                    <p className="text-muted-foreground text-sm mb-4 flex-grow font-persian">{sport.description}</p>
                    <div className="flex items-center text-accent font-medium">
                      بیشتر بدانید <ArrowLeft className="ms-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
