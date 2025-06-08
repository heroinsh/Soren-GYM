
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider'; 

// Mock data - in a real app, this would be fetched and saved
const initialProfileData = {
  fullName: "آریا رحیمی",
  email: "aria.rahimi@example.com", 
  phone: "09123456789",
  dateOfBirth: "1370/05/15", // Example Shamsi DOB "YYYY/MM/DD"
  gender: "مرد",
  nationalId: "0012345678", 
  address: "خیابان ورزش، کوچه تندرستی، پلاک ۱۲۳",
  emergencyContactName: "زهرا احمدی",
  emergencyContactPhone: "09876543210",
};

const initialPhysicalData = {
  weightKg: 75, 
  heightCm: 180, 
  fitnessLevel: "متوسط", // مبتدی، متوسط، پیشرفته
  healthConditions: "ندارد", 
};


export default function ProfilePage() {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState(initialProfileData);
  const [physicalData, setPhysicalData] = useState(initialPhysicalData);

  useEffect(() => {
    document.title = "پروفایل من | باشگاه ورزشی سورن";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "اطلاعات شخصی، تماس و فیزیکی خود را در باشگاه سورن مشاهده و ویرایش کنید. پروفایل خود را برای تجربه بهتر به‌روز نگه دارید.");
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = "description";
      newMeta.content = "اطلاعات شخصی، تماس و فیزیکی خود را در باشگاه سورن مشاهده و ویرایش کنید. پروفایل خود را برای تجربه بهتر به‌روز نگه دارید.";
      document.head.appendChild(newMeta);
    }
  }, []);


  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleHealthConditionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPhysicalData(prev => ({ ...prev, [name]: value }));
  };

  const handleWeightChange = (value: number[]) => {
    setPhysicalData(prev => ({ ...prev, weightKg: value[0] }));
  };

  const handleHeightChange = (value: number[]) => {
    setPhysicalData(prev => ({ ...prev, heightCm: value[0] }));
  };

  const handleFitnessLevelChange = (value: string) => {
    setPhysicalData(prev => ({ ...prev, fitnessLevel: value }));
  };
  
  const handleGenderChange = (value: string) => {
    setProfileData(prev => ({...prev, gender: value}));
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!profileData.fullName || !profileData.phone || !profileData.dateOfBirth || !profileData.gender || !profileData.nationalId || !profileData.address || !profileData.emergencyContactName || !profileData.emergencyContactPhone || physicalData.weightKg <=0 || physicalData.heightCm <=0 || !physicalData.fitnessLevel) {
        toast({ title: "خطا", description: "لطفاً تمام فیلدهای الزامی ستاره‌دار (*) را پر کنید و مقادیر معتبر برای قد و وزن وارد نمایید.", variant: "destructive" });
        return;
    }
    if (!/^\d{10}$/.test(profileData.nationalId)) {
        toast({ title: "خطا", description: "کد ملی باید ۱۰ رقم باشد.", variant: "destructive" });
        return;
    }
    if (!/^(09)\d{9}$/.test(profileData.phone) || !/^(09)\d{9}$/.test(profileData.emergencyContactPhone)) {
        toast({ title: "خطا", description: "فرمت شماره تلفن صحیح نیست (مثال: 09123456789).", variant: "destructive" });
        return;
    }
    // Basic validation for Shamsi date format YYYY/MM/DD
    if (!/^\d{4}\/\d{2}\/\d{2}$/.test(profileData.dateOfBirth)) {
        toast({ title: "خطا", description: "فرمت تاریخ تولد شمسی صحیح نیست (مثال: ۱۳۷۰/۰۵/۱۵).", variant: "destructive" });
        return;
    }

    console.log("Saving profile data:", profileData);
    console.log("Saving physical data:", physicalData);
    toast({ title: "پروفایل به‌روزرسانی شد", description: "اطلاعات شما با موفقیت ذخیره شد." });
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold font-headline text-primary">پروفایل من</h1>
        <p className="text-muted-foreground">اطلاعات شخصی و فیزیکی خود را مدیریت کنید.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl">اطلاعات شخصی</CardTitle>
            <CardDescription>اطلاعات شخصی خود را به‌روز نگه دارید. فیلدهای ستاره‌دار (*) الزامی هستند.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">نام و نام خانوادگی *</Label>
              <Input id="fullName" name="fullName" value={profileData.fullName} onChange={handleProfileChange} required autoComplete="name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">ایمیل</Label>
              <Input id="email" name="email" type="email" value={profileData.email} readOnly disabled className="bg-muted/50 cursor-not-allowed" autoComplete="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">شماره تلفن *</Label>
              <Input id="phone" name="phone" type="tel" value={profileData.phone} onChange={handleProfileChange} placeholder="مثال: 09123456789" required autoComplete="tel" pattern="^(09)\d{9}$" title="شماره تلفن باید با 09 شروع شود و ۱۱ رقم باشد."/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">تاریخ تولد (شمسی) *</Label>
              <Input 
                id="dateOfBirth" 
                name="dateOfBirth" 
                value={profileData.dateOfBirth} 
                onChange={handleProfileChange} 
                placeholder="مثال: ۱۳۷۰/۰۵/۱۵" 
                required 
                pattern="\d{4}/\d{2}/\d{2}" 
                title="تاریخ را به فرمت شمسی YYYY/MM/DD وارد کنید."
                maxLength={10}
                className="text-right" 
                dir="ltr" 
              />
              <p className="text-xs text-muted-foreground">لطفاً تاریخ تولد خود را به فرمت شمسی (مثال: ۱۳۷۰/۰۵/۱۵) وارد کنید.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">جنسیت *</Label>
              <Select name="gender" value={profileData.gender} onValueChange={handleGenderChange} required>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="انتخاب جنسیت" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="مرد">مرد</SelectItem>
                  <SelectItem value="زن">زن</SelectItem>
                  <SelectItem value="دیگر">دیگر</SelectItem>
                  <SelectItem value="ترجیح می‌دهم نگویم">ترجیح می‌دهم نگویم</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nationalId">کد ملی *</Label>
              <Input id="nationalId" name="nationalId" type="text" value={profileData.nationalId} onChange={handleProfileChange} placeholder="مثال: 0012345678" required pattern="\d{10}" title="کد ملی باید ۱۰ رقم باشد." maxLength={10} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">آدرس *</Label>
              <Input id="address" name="address" value={profileData.address} onChange={handleProfileChange} required autoComplete="street-address"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyContactName">نام مخاطب اضطراری *</Label>
              <Input id="emergencyContactName" name="emergencyContactName" value={profileData.emergencyContactName} onChange={handleProfileChange} required autoComplete="off" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyContactPhone">تلفن مخاطب اضطراری *</Label>
              <Input id="emergencyContactPhone" name="emergencyContactPhone" type="tel" value={profileData.emergencyContactPhone} onChange={handleProfileChange} required pattern="^(09)\d{9}$" title="شماره تلفن باید با 09 شروع شود و ۱۱ رقم باشد." autoComplete="off" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl">پروفایل فیزیکی</CardTitle>
            <CardDescription>به ما کمک کنید تجربه تناسب اندام شما را بهتر کنیم. فیلدهای ستاره‌دار (*) الزامی هستند.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="weightKg">وزن (کیلوگرم) *</Label>
                <span className="text-sm font-medium text-primary">{physicalData.weightKg} کیلوگرم</span>
              </div>
              <Slider
                id="weightKg"
                name="weightKg"
                defaultValue={[physicalData.weightKg]}
                min={20}
                max={200}
                step={1}
                onValueChange={handleWeightChange}
                className="my-2"
                aria-label="انتخاب وزن"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="heightCm">قد (سانتی‌متر) *</Label>
                <span className="text-sm font-medium text-primary">{physicalData.heightCm} سانتی‌متر</span>
              </div>
              <Slider
                id="heightCm"
                name="heightCm"
                defaultValue={[physicalData.heightCm]}
                min={100}
                max={250}
                step={1}
                onValueChange={handleHeightChange}
                className="my-2"
                aria-label="انتخاب قد"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fitnessLevel">سطح آمادگی جسمانی *</Label>
              <Select name="fitnessLevel" value={physicalData.fitnessLevel} onValueChange={handleFitnessLevelChange} required>
                <SelectTrigger id="fitnessLevel">
                  <SelectValue placeholder="انتخاب سطح آمادگی" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="مبتدی">مبتدی</SelectItem>
                  <SelectItem value="متوسط">متوسط</SelectItem>
                  <SelectItem value="پیشرفته">پیشرفته</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="healthConditions">شرایط سلامتی/یادداشت‌ها (اختیاری)</Label>
              <Textarea id="healthConditions" name="healthConditions" value={physicalData.healthConditions} onChange={handleHealthConditionsChange} placeholder="هرگونه آلرژی، آسیب‌دیدگی قبلی، داروهای مصرفی و غیره." rows={3}/>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">ذخیره تغییرات</Button>
        </div>
      </form>
    </div>
  );
}
