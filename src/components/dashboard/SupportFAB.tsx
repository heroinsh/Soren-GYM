
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Phone as PhoneIcon, MessageSquareText, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link'; // Import Link

const SUPPORT_PHONE_NUMBER = "021-12345678"; // شماره تلفن پشتیبانی نمونه
const FAQ_PAGE_URL = "/dashboard/faq"; // URL صفحه سوالات متداول

export function SupportFAB() {
  const [showMessage, setShowMessage] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    const initialDelayTimer = setTimeout(() => {
      setShowMessage(true);
    }, 700);

    const hideMessageTimer = setTimeout(() => {
      setShowMessage(false);
    }, 3700);

    return () => {
      clearTimeout(initialDelayTimer);
      clearTimeout(hideMessageTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3" dir="rtl">
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20, transition: { duration: 0.3 } }}
            transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.1 }}
            className="bg-card/75 backdrop-blur-md text-card-foreground p-3 rounded-lg shadow-xl flex items-center"
          >
            <MessageSquareText className="ms-2 h-5 w-5 text-primary" />
            <span>کمک نیاز دارید؟</span>
          </motion.div>
        )}
      </AnimatePresence>

      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="default"
            size="icon"
            className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl"
            aria-label="پشتیبانی"
            onClick={() => setIsPopoverOpen(true)}
          >
            <PhoneIcon className="h-6 w-6" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto bg-popover text-popover-foreground shadow-xl" side="top" align="center">
          <div className="p-2 text-center space-y-2">
            <div>
              <p className="font-semibold text-lg">پشتیبانی سورن</p>
              <a href={`tel:${SUPPORT_PHONE_NUMBER.replace(/-/g, '')}`} className="block text-xl text-primary hover:underline my-1 font-medium">
                {SUPPORT_PHONE_NUMBER}
              </a>
              <p className="text-xs text-muted-foreground mt-1">شنبه تا پنج‌شنبه ۹ صبح الی ۵ عصر</p>
            </div>
            <div className="border-t border-border pt-2">
              <Link href={FAQ_PAGE_URL} passHref>
                <Button variant="link" className="text-sm text-primary hover:underline p-0 h-auto flex items-center justify-center w-full">
                  <HelpCircle className="me-2 h-4 w-4" /> {/* me-2 for RTL */}
                  مشاهده سوالات متداول
                </Button>
              </Link>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
