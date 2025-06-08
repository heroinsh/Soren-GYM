
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Phone as PhoneIcon, MessageSquareText, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link'; 

const SUPPORT_PHONE_NUMBER = "071-38247977"; 
const FAQ_PAGE_URL = "/dashboard/faq"; 

export function SupportFAB() {
  const [showMessage, setShowMessage] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    const initialDelayTimer = setTimeout(() => {
      if (!isPopoverOpen) { // Only show if popover isn't already open
         setShowMessage(true);
      }
    }, 700);

    const hideMessageTimer = setTimeout(() => {
      setShowMessage(false);
    }, 3700); // Show for 3 seconds after initial delay

    return () => {
      clearTimeout(initialDelayTimer);
      clearTimeout(hideMessageTimer);
    };
  }, [isPopoverOpen]); // Re-evaluate if popover state changes

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3" dir="rtl">
      <AnimatePresence>
        {showMessage && !isPopoverOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20, transition: { duration: 0.3 } }}
            transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.1 }}
            className="bg-card/85 backdrop-blur-md text-card-foreground p-3 rounded-lg shadow-xl flex items-center"
          >
            <MessageSquareText className="ms-2 h-5 w-5 text-primary" />
            <span>کمک لازم دارید؟</span>
          </motion.div>
        )}
      </AnimatePresence>

      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="default"
            size="icon"
            className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl"
            aria-label="دکمه پشتیبانی و راهنما"
            onClick={() => {
              setIsPopoverOpen(!isPopoverOpen);
              setShowMessage(false); // Hide message when FAB is clicked
            }}
          >
            <PhoneIcon className="h-6 w-6" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto bg-popover text-popover-foreground shadow-xl p-0" side="top" align="center">
          <div className="p-3 text-center space-y-2">
            <div>
              <p className="font-semibold text-lg">پشتیبانی باشگاه سورن</p>
              <a href={`tel:${SUPPORT_PHONE_NUMBER.replace(/-/g, '')}`} className="block text-xl text-primary hover:underline my-1 font-medium" dir="ltr">
                {SUPPORT_PHONE_NUMBER}
              </a>
              <p className="text-xs text-muted-foreground mt-1">شنبه تا پنج‌شنبه ۹ صبح الی ۵ عصر</p>
            </div>
            <div className="border-t border-border pt-2">
              <Link href={FAQ_PAGE_URL} passHref>
                <Button variant="link" className="text-sm text-primary hover:underline p-0 h-auto flex items-center justify-center w-full" onClick={() => setIsPopoverOpen(false)}>
                  <HelpCircle className="me-2 h-4 w-4" /> 
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
