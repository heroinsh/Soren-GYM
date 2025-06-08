
"use client";

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Users, Filter, ShoppingCart as ShoppingCartIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCartSheet } from '@/components/dashboard/ShoppingCartSheet';

interface ClassItem {
  id: string;
  name: string;
  coach: string;
  schedule: string;
  image: string;
  imageHint: string;
  description:string;
  tags: string[];
  accessOnly?: boolean;
  genderTarget?: 'Women' | 'Men' | 'All';
  ageGroup?: 'Teens' | 'Kids' | 'Adults' | 'All';
  price?: number;
}

const classesData: { women: ClassItem[], men: ClassItem[] } = {
  women: [
    { id: 'w-volleyball-bahramzadeh', name: 'والیبال', coach: 'خانم بهرام‌زاده', schedule: 'سه‌شنبه و پنج‌شنبه | ۱۷:۰۰–۱۸:۳۰', image: 'https://placehold.co/600x400.png', imageHint: 'women volleyball match', description: 'کلاس والیبال بانوان با مربیگری خانم بهرام‌زاده، با تمرکز بر تکنیک و کار تیمی.', tags: ['والیبال', 'ورزش تیمی', 'بانوان', 'توسعه مهارت'], genderTarget: 'Women', ageGroup: 'Adults', price: 7500000 },
    { id: 'w-volleyball-chamanfar', name: 'والیبال', coach: 'خانم چمن‌فر', schedule: 'سه‌شنبه و پنج‌شنبه | ۱۸:۳۰–۲۰:۰۰', image: 'https://placehold.co/600x400.png', imageHint: 'volleyball training session', description: 'آموزش پیشرفته والیبال برای بانوان تحت نظر خانم چمن‌فر.', tags: ['والیبال', 'ورزش تیمی', 'پیشرفته', 'بانوان'], genderTarget: 'Women', ageGroup: 'Adults', price: 7500000 },
    { id: 'w-basketball-alavi-aghajari', name: 'بسکتبال (نیمه/پیشرفته)', coach: 'خانم علوی / خانم آقاجری', schedule: 'یک‌شنبه و چهارشنبه | ۱۷:۰۰–۱۸:۳۰', image: 'https://placehold.co/600x400.png', imageHint: 'women basketball game', description: 'کلاس بسکتبال نیمه‌پیشرفته و پیشرفته برای بانوان با مربیگری خانم‌ها علوی و آقاجری.', tags: ['بسکتبال', 'ورزش تیمی', 'نیمه‌پیشرفته', 'پیشرفته', 'بانوان'], genderTarget: 'Women', ageGroup: 'Adults', price: 8000000 },
    { id: 'w-gymnastics-rahman', name: 'ژیمناستیک', coach: 'خانم رحمان ستایش', schedule: 'روزهای زوج | ۱۷:۰۰–۱۸:۳۰', image: 'https://placehold.co/600x400.png', imageHint: 'gymnastics routine', description: 'کلاس ژیمناستیک بانوان با تمرکز بر انعطاف و قدرت، مربی خانم رحمان ستایش.', tags: ['ژیمناستیک', 'انعطاف‌پذیری', 'قدرت', 'بانوان'], genderTarget: 'Women', ageGroup: 'Adults', price: 8500000 },
    { id: 'w-zumba-gholami', name: 'زومبا', coach: 'خانم غلامی', schedule: 'روزهای زوج | ۱۸:۰۰–۱۹:۰۰', image: 'https://placehold.co/600x400.png', imageHint: 'zumba dance fitness', description: 'کلاس شاد و پرانرژی زومبا برای بانوان با مربیگری خانم غلامی.', tags: ['زومبا', 'دنس', 'کاردیو', 'بانوان', 'همه سطوح'], genderTarget: 'Women', ageGroup: 'Adults', price: 6000000 },
    { id: 'w-aerobics-abbasi', name: 'ایروبیک', coach: 'خانم عباسی', schedule: 'روزهای فرد | ۱۸:۰۰–۱۹:۰۰', image: 'https://placehold.co/600x400.png', imageHint: 'aerobics class', description: 'کلاس ایروبیک بانوان برای تناسب اندام و افزایش استقامت با خانم عباسی.', tags: ['ایروبیک', 'کاردیو', 'تناسب اندام', 'بانوان', 'همه سطوح'], genderTarget: 'Women', ageGroup: 'Adults', price: 6000000 },
    { id: 'w-functionalfitness-abbasi', name: 'فانکشنال فیتنس', coach: 'خانم عباسی', schedule: 'روزهای زوج | ۱۶:۳۰–۱۷:۳۰', image: 'https://placehold.co/600x400.png', imageHint: 'functional fitness training', description: 'تمرینات فانکشنال فیتنس برای بانوان جهت افزایش قدرت و آمادگی جسمانی با خانم عباسی.', tags: ['فانکشنال فیتنس', 'قدرتی', 'آمادگی جسمانی', 'بانوان', 'همه سطوح'], genderTarget: 'Women', ageGroup: 'Adults', price: 7000000 },
    { id: 'w-fitnesspackage-mahdavi', name: 'پکیج فیتنس', coach: 'خانم مهدوی', schedule: 'روزهای زوج | ۱۷:۳0–۱۸:۳۰', image: 'https://placehold.co/600x400.png', imageHint: 'fitness package workout', description: 'پکیج جامع فیتنس برای بانوان، طراحی شده توسط خانم مهدوی برای رسیدن به اهداف تناسب اندام.', tags: ['فیتنس', 'پکیج جامع', 'تناسب اندام', 'بانوان', 'همه سطوح'], genderTarget: 'Women', ageGroup: 'Adults', price: 7500000 },
    { id: 'w-trx-mohajer', name: 'تی‌آر‌ایکس (TRX)', coach: 'خانم مهاجر', schedule: 'روزهای زوج | ۰۷:۰۰–۰۸:۰۰', image: 'https://placehold.co/600x400.png', imageHint: 'trx suspension workout', description: 'تمرینات تی‌آر‌ایکس برای بانوان با خانم مهاجر، جهت تقویت کل بدن.', tags: ['تی ار ایکس', 'TRX', 'قدرتی', 'کل بدن', 'بانوان', 'همه سطوح'], genderTarget: 'Women', ageGroup: 'Adults', price: 8000000 },
    { id: 'w-bodybuilding-mohajer-khaksar', name: 'بدنسازی', coach: 'خانم‌ها مهاجر و خاکسار', schedule: 'هر روز | ۱۷:۰۰–۱۸:۰۰', image: 'https://placehold.co/600x400.png', imageHint: 'women bodybuilding', description: 'برنامه بدنسازی تخصصی بانوان با مربیگری خانم‌ها مهاجر و خاکسار.', tags: ['بدنسازی', 'قدرتی', 'عضله سازی', 'بانوان', 'همه سطوح'], genderTarget: 'Women', ageGroup: 'Adults', price: 9000000 },
    { id: 'w-sauna', name: 'سونا خشک و بخار', coach: '—', schedule: 'شنبه، دوشنبه، پنج‌شنبه', image: 'https://placehold.co/600x400.png', imageHint: 'sauna steam room', description: ' استفاده از سونا خشک و بخار برای بانوان. رایگان برای ثبت‌نام‌کنندگان در کلاس بدنسازی.', tags: ['سونا', 'ریکاوری', 'بانوان', 'تندرستی'], accessOnly: true, genderTarget: 'Women', ageGroup: 'Adults', price: 0 },
  ],
  men: [
    { id: 'm-basketball-beginner-rahmani', name: 'بسکتبال (مبتدی)', coach: 'آقای رحمانی', schedule: 'شنبه | ۰۹:۳۰–۱۰:۳۰', image: 'https://placehold.co/600x400.png', imageHint: 'men basketball beginner', description: 'کلاس بسکتبال مبتدی آقایان با مربیگری آقای رحمانی، برای یادگیری اصول اولیه.', tags: ['بسکتبال', 'ورزش تیمی', 'مبتدی', 'آقایان'], genderTarget: 'Men', ageGroup: 'Adults', price: 7500000 },
    { id: 'm-basketball-advanced-rahmani', name: 'بسکتبال (نیمه/پیشرفته)', coach: 'آقای رحمانی', schedule: 'دوشنبه | ۱۷:۰۰–۱۸:۳۰', image: 'https://placehold.co/600x400.png', imageHint: 'men basketball advanced', description: 'کلاس بسکتبال نیمه‌پیشرفته و پیشرفته آقایان برای ارتقا مهارت‌ها با آقای رحمانی.', tags: ['بسکتبال', 'ورزش تیمی', 'نیمه‌پیشرفته', 'پیشرفته', 'آقایان'], genderTarget: 'Men', ageGroup: 'Adults', price: 8000000 },
    { id: 'm-volleyball-ghodousi', name: 'والیبال', coach: 'آقای قدوسی', schedule: 'شنبه و دوشنبه | ۱۸:۳۰–۲۰:۰۰', image: 'https://placehold.co/600x400.png', imageHint: 'men volleyball match', description: 'کلاس والیبال آقایان با آقای قدوسی، تمرکز بر تکنیک‌های پیشرفته و بازی تیمی.', tags: ['والیبال', 'ورزش تیمی', 'پیشرفته', 'آقایان'], genderTarget: 'Men', ageGroup: 'Adults', price: 8500000 },
    { id: 'm-kungfu-amini', name: 'کونگ‌فو', coach: 'آقای امینی', schedule: 'یک‌شنبه، سه‌شنبه، پنج‌شنبه | ۱۸:۳۰–۱۹:۴۵', image: 'https://placehold.co/600x400.png', imageHint: 'kung fu practice', description: 'آموزش کونگ‌فو برای آقایان با استاد امینی، سانس اول.', tags: ['کونگ فو', 'هنرهای رزمی', 'دفاع شخصی', 'آقایان', 'همه سطوح'], genderTarget: 'Men', ageGroup: 'All', price: 7500000 },
    { id: 'm-gymnastics-nadimi', name: 'ژیمناستیک', coach: 'آقای ندیمی', schedule: 'روزهای فرد | ۱۵:۳۰–۱۶:۳0', image: 'https://placehold.co/600x400.png', imageHint: 'men gymnastics rings', description: 'کلاس ژیمناستیک آقایان با آقای ندیمی، برای افزایش قدرت و انعطاف.', tags: ['ژیمناستیک', 'قدرتی', 'انعطاف', 'آقایان', 'همه سطوح'], genderTarget: 'Men', ageGroup: 'Adults', price: 8500000 },
    { id: 'm-karate-hosseini', name: 'کاراته', coach: 'آقای حسینی', schedule: 'هر دو روز (یک روز در میان)', image: 'https://placehold.co/600x400.png', imageHint: 'karate kata', description: 'آموزش کاراته برای آقایان در تمامی سطوح با آقای حسینی.', tags: ['کاراته', 'هنرهای رزمی', 'دفاع شخصی', 'آقایان', 'همه سطوح'], genderTarget: 'Men', ageGroup: 'All', price: 8000000 },
    { id: 'm-bodybuilding-kamali', name: 'بدنسازی', coach: 'آقای کمالی', schedule: 'هر روز | ۱۸:۰۰–۱۹:۰۰', image: 'https://placehold.co/600x400.png', imageHint: 'men bodybuilding gym', description: 'برنامه تخصصی بدنسازی آقایان با مربیگری آقای کمالی.', tags: ['بدنسازی', 'قدرتی', 'عضله سازی', 'آقایان', 'همه سطوح'], genderTarget: 'Men', ageGroup: 'Adults', price: 10000000 },
    { id: 'm-sauna', name: 'سونا خشک و بخار', coach: '—', schedule: 'شنبه، دوشنبه، پنج‌شنبه', image: 'https://placehold.co/600x400.png', imageHint: 'sauna relaxing', description: 'استفاده از سونا خشک و بخار برای آقایان. رایگان برای ثبت‌نام‌کنندگان در کلاس بدنسازی.', tags: ['سونا', 'ریکاوری', 'آقایان', 'تندرستی'], accessOnly: true, genderTarget: 'Men', ageGroup: 'Adults', price: 0 },
  ],
};

const allAvailableClasses = [...classesData.women, ...classesData.men];

export default function DashboardClassesPage() {
  const { toast } = useToast();
  const [selectedSport, setSelectedSport] = useState<string>('همه');
  const [selectedLevel, setSelectedLevel] = useState<string>('همه');

  const [filterGender, setFilterGender] = useState<string>('All');
  const [filterAgeGroup, setFilterAgeGroup] = useState<string>('All');

  const [shoppingCart, setShoppingCart] = useState<ClassItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem('shoppingCartSoren');
    if (storedCart) {
      setShoppingCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('shoppingCartSoren', JSON.stringify(shoppingCart));
  }, [shoppingCart]);

  const uniqueSports = useMemo(() => {
    const sports = new Set<string>();
    allAvailableClasses.forEach(item => {
      if (item.accessOnly) return;
      const baseSportName = item.name.split('(')[0].trim();
      sports.add(baseSportName);
      item.tags.forEach(tag => {
        if (['والیبال', 'بسکتبال', 'ژیمناستیک', 'زومبا', 'ایروبیک', 'فانکشنال فیتنس', 'تی ار ایکس', 'بدنسازی', 'کونگ فو', 'کاراته'].includes(tag)) {
          sports.add(tag);
        }
      });
    });
    return ['همه', ...Array.from(sports).sort()];
  }, []);

  const uniqueLevels = useMemo(() => {
    const levels = new Set<string>();
    allAvailableClasses.forEach(item => {
      if (item.accessOnly) return;
      item.tags.forEach(tag => {
        if (['مبتدی', 'نیمه‌پیشرفته', 'پیشرفته', 'همه سطوح'].includes(tag)) {
          levels.add(tag);
        }
      });
    });
    const order = ['همه سطوح', 'مبتدی', 'نیمه‌پیشرفته', 'پیشرفته'];
    return ['همه', ...Array.from(levels).sort((a,b) => order.indexOf(a) - order.indexOf(b))];
  }, []);

  const filteredClasses = useMemo(() => {
    return allAvailableClasses.filter(item => {
      if (item.accessOnly) return false;
      const sportMatch = selectedSport === 'همه' || item.name.split('(')[0].trim() === selectedSport || item.tags.includes(selectedSport);
      const levelMatch = selectedLevel === 'همه' || item.tags.includes(selectedLevel);
      const genderMatch = filterGender === 'All' || item.genderTarget === 'All' || item.genderTarget === filterGender;
      const ageGroupMatch = filterAgeGroup === 'All' || item.ageGroup === 'All' || item.ageGroup === filterAgeGroup;
      return sportMatch && levelMatch && genderMatch && ageGroupMatch;
    });
  }, [selectedSport, selectedLevel, filterGender, filterAgeGroup]);

  const handleRegisterClass = (classItem: ClassItem) => {
    if (shoppingCart.find(item => item.id === classItem.id)) {
      toast({ title: "قبلاً اضافه شده", description: `${classItem.name} از قبل در سبد خرید شما موجود است.`, variant: "default" });
      return;
    }
    setShoppingCart(prev => [...prev, classItem]);
    toast({ title: "کلاس اضافه شد", description: `${classItem.name} به سبد خرید اضافه شد.`});
    setIsCartOpen(true);
  };

  const ClassRegCard = ({ classItem }: { classItem: ClassItem }) => (
    <Card className="overflow-hidden flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card text-right">
      <div className="relative w-full aspect-video">
        <Image src={classItem.image} alt={classItem.name} layout="fill" objectFit="cover" data-ai-hint={classItem.imageHint} />
      </div>
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary text-right">{classItem.name}</CardTitle>
        <CardDescription className="text-muted-foreground text-right">
          مربی: {classItem.coach} <br />
          <span className="text-sm text-accent font-medium">{classItem.schedule}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-foreground mb-3 text-right">{classItem.description}</p>
        <div className="flex flex-wrap gap-2 justify-start"> {/* Changed justify-end to justify-start */}
          {classItem.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
        </div>
        {classItem.price !== undefined && classItem.price > 0 && (
            <p className="text-lg font-semibold text-primary mt-3 text-right">
                {new Intl.NumberFormat('fa-IR').format(classItem.price)} ریال/ماه
            </p>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          onClick={() => handleRegisterClass(classItem)}
          disabled={!!shoppingCart.find(item => item.id === classItem.id)}
        >
          {shoppingCart.find(item => item.id === classItem.id) ? "به سبد اضافه شد" : "ثبت‌نام این کلاس"}
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold font-headline text-primary">ثبت‌نام در کلاس‌ها</h1>
            <p className="text-muted-foreground">کلاس‌های موجود متناسب با شما را مرور و ثبت‌نام کنید.</p>
        </div>
        <Button onClick={() => setIsCartOpen(true)} variant="outline" className="mt-4 md:mt-0">
            <ShoppingCartIcon className="ms-2 h-5 w-5" />
            مشاهده سبد خرید ({shoppingCart.length})
        </Button>
      </header>

      <Card className="p-6 bg-card shadow-lg">
        <h3 className="text-xl font-semibold mb-4 font-headline text-primary flex items-center"><Filter className="ms-2 h-5 w-5"/> فیلترها</h3>
        <p className="text-sm text-muted-foreground mb-4">
            فیلترها به‌طور پیش‌فرض روی "همه" تنظیم شده‌اند. برای نمایش کلاس‌های خاص، آن‌ها را تنظیم کنید.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="gender-filter" className="block text-sm font-medium text-foreground mb-1">جنسیت</Label>
            <Select value={filterGender} onValueChange={setFilterGender}>
              <SelectTrigger id="gender-filter"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="All">همه جنسیت‌ها</SelectItem>
                <SelectItem value="Women">بانوان</SelectItem>
                <SelectItem value="Men">آقایان</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="age-group-filter" className="block text-sm font-medium text-foreground mb-1">گروه سنی</Label>
            <Select value={filterAgeGroup} onValueChange={setFilterAgeGroup}>
              <SelectTrigger id="age-group-filter"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="All">همه سنین</SelectItem>
                <SelectItem value="Kids">کودکان (زیر ۱۳ سال)</SelectItem>
                <SelectItem value="Teens">نوجوانان (۱۳-۱۷ سال)</SelectItem>
                <SelectItem value="Adults">بزرگسالان (۱۸+ سال)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="sport-filter" className="block text-sm font-medium text-foreground mb-1">ورزش</Label>
            <Select value={selectedSport} onValueChange={setSelectedSport}>
              <SelectTrigger id="sport-filter"><SelectValue placeholder="انتخاب ورزش" /></SelectTrigger>
              <SelectContent>
                {uniqueSports.map(sport => <SelectItem key={sport} value={sport}>{sport}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="level-filter" className="block text-sm font-medium text-foreground mb-1">سطح</Label>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger id="level-filter"><SelectValue placeholder="انتخاب سطح" /></SelectTrigger>
              <SelectContent>
                {uniqueLevels.map(level => <SelectItem key={level} value={level}>{level}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <section>
        {filteredClasses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredClasses.map(classItem => <ClassRegCard key={classItem.id} classItem={classItem} />)}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-10">کلاسی با فیلترهای فعلی مطابقت ندارد. سعی کنید معیارهای فیلتر خود را تغییر دهید.</p>
        )}
      </section>

      <ShoppingCartSheet
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
        cartItems={shoppingCart}
        setCartItems={setShoppingCart}
      />
    </div>
  );
}
