
"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Trash2, ShoppingCart, CreditCard } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { useToast } from "@/hooks/use-toast";

interface ClassItem {
  id: string;
  name: string;
  coach: string;
  schedule: string;
  image: string;
  imageHint: string;
  price?: number;
}

interface ShoppingCartSheetProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  cartItems: ClassItem[];
  setCartItems: React.Dispatch<React.SetStateAction<ClassItem[]>>;
}

export function ShoppingCartSheet({ isOpen, setIsOpen, cartItems, setCartItems }: ShoppingCartSheetProps) {
  const { toast } = useToast();

  const handleRemoveItem = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    toast({ title: "آیتم حذف شد", description: "کلاس از سبد خرید شما حذف شد." });
  };

  const handleEmptyCart = () => {
    setCartItems([]);
    toast({ title: "سبد خرید خالی شد", description: "تمام کلاس‌ها از سبد خرید شما حذف شدند." });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price || 0), 0);
  };

  const totalAmount = calculateTotal();
  const formattedTotalAmount = new Intl.NumberFormat('fa-IR').format(totalAmount) + ' تومان';


  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg"> {/* Default side is right, which becomes left in RTL */}
        <SheetHeader className="px-4 pt-4 sm:px-6 sm:pt-6">
          <SheetTitle className="flex items-center text-2xl font-headline">
            <ShoppingCart className="me-2 h-6 w-6" /> سبد خرید شما {/* mr-2 to me-2 */}
          </SheetTitle>
          <SheetDescription>
            کلاس‌های انتخابی خود را قبل از رفتن به صفحه پرداخت بررسی کنید.
          </SheetDescription>
        </SheetHeader>
        <Separator className="my-4" />
        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold">سبد خرید شما خالی است</p>
            <p className="text-muted-foreground">برای شروع، چند کلاس اضافه کنید!</p>
            <SheetClose asChild>
                <Button variant="link" className="mt-4 text-primary">ادامه خرید</Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-4 sm:px-6">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg"> {/* space-x-4 implies LTR, space-s-4 for RTL in Tailwind v4 */}
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={60}
                      className="rounded-md object-cover aspect-[4/3]"
                      data-ai-hint={item.imageHint}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-md">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">مربی: {item.coach}</p>
                      <p className="text-sm text-muted-foreground">قیمت: {item.price ? new Intl.NumberFormat('fa-IR').format(item.price) + ' تومان' : 'نامشخص'}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => handleRemoveItem(item.id)}
                      aria-label="حذف آیتم"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <Separator className="my-4" />
            <SheetFooter className="px-4 pb-4 sm:px-6 sm:pb-6 space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>مجموع:</span>
                <span>{formattedTotalAmount}</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <SheetClose asChild>
                    <Button variant="outline" className="w-full">ادامه خرید</Button>
                </SheetClose>
                <Button
                  onClick={handleEmptyCart}
                  variant="destructive"
                  className="w-full"
                  disabled={cartItems.length === 0}
                >
                  <Trash2 className="me-2 h-4 w-4" /> خالی کردن سبد {/* mr-2 to me-2 */}
                </Button>
              </div>
              <SheetClose asChild>
                <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3">
                    <Link href="/checkout">
                        <CreditCard className="me-2 h-5 w-5"/> رفتن به صفحه پرداخت {/* mr-2 to me-2 */}
                    </Link>
                </Button>
              </SheetClose>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
