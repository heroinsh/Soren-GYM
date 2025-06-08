import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedSports } from '@/components/home/FeaturedSports';
import { InfoHighlights } from '@/components/home/InfoHighlights';
import { CoachHighlights } from '@/components/home/CoachHighlights';
import { Testimonials } from '@/components/home/Testimonials';
import { CallToActionStrip } from '@/components/home/CallToActionStrip';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Soren Athletics - Strength. Discipline. Community.',
  description: 'Welcome to Soren Athletics. Discover top-tier sports training, modern facilities, and a vibrant community. Join us to achieve your athletic goals.',
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
