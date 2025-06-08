
import type { LucideIcon } from 'lucide-react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export interface SocialLink {
  name: string;
  href: string;
  Icon: LucideIcon;
}

export const socialLinks: SocialLink[] = [
  { name: 'Facebook', href: 'https://facebook.com/sorenathletics', Icon: Facebook }, // Assuming Facebook is still relevant
  { name: 'Twitter', href: 'https://twitter.com/sorenathletics', Icon: Twitter },   // Assuming Twitter is still relevant
  { name: 'Instagram', href: 'https://instagram.com/SORENGYM', Icon: Instagram },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/sorenathletics', Icon: Linkedin }, // Assuming LinkedIn is still relevant
  { name: 'YouTube', href: 'https://youtube.com/sorenathletics', Icon: Youtube },     // Assuming YouTube is still relevant
];
