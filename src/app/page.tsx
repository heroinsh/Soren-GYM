
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedSports } from '@/components/home/FeaturedSports';
import { InfoHighlights } from '@/components/home/InfoHighlights';
import { CoachHighlights } from '@/components/home/CoachHighlights';
import { Testimonials } from '@/components/home/Testimonials';
import { CallToActionStrip } from '@/components/home/CallToActionStrip';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'باشگاه ورزشی سورن - قدرت، انضباط، جامعه',
  description: 'به باشگاه ورزشی سورن خوش آمدید. تمرینات ورزشی سطح بالا، امکانات مدرن و جامعه‌ای پویا را کشف کنید. برای رسیدن به اهداف ورزشی خود به ما بپیوندید.',
  keywords: ['باشگاه ورزشی سورن', 'ورزش در شیراز', 'تناسب اندام', 'بدنسازی', 'کلاس های ورزشی', 'مربی ورزشی شیراز', 'باشگاه سورن'],
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturedSports />
      <InfoHighlights />
      <CoachHighlights />
      <Testimonials />
      <CallToActionStrip />
    </div>
  );
}
