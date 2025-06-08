
import type { LucideIcon } from 'lucide-react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export interface SocialLink {
  name: string; // English name for internal reference or keys
  persianName: string; // Persian name for aria-labels or display
  href: string;
  Icon: LucideIcon;
}

export const socialLinks: SocialLink[] = [
  { name: 'Facebook', persianName: 'فیسبوک', href: 'https://facebook.com/sorenathletics', Icon: Facebook },
  { name: 'Twitter', persianName: 'توییتر', href: 'https://twitter.com/sorenathletics', Icon: Twitter },
  { name: 'Instagram', persianName: 'اینستاگرام', href: 'https://instagram.com/SORENGYM', Icon: Instagram },
  { name: 'LinkedIn', persianName: 'لینکدین', href: 'https://linkedin.com/company/sorenathletics', Icon: Linkedin },
  { name: 'YouTube', persianName: 'یوتیوب', href: 'https://youtube.com/sorenathletics', Icon: Youtube },
];
