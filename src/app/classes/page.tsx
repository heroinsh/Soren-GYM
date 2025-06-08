
"use client";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Users, Filter } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
  price?: number;
  persianName?: string; 
  persianDescription?: string; 
  persianSchedule?: string; 
  persianTags?: string[]; 
}

interface ClassesData {
  women: ClassItem[];
  men: ClassItem[];
}

const classesData: ClassesData = {
  women: [
    { id: 'w-volleyball-bahramzadeh', name: 'Volleyball (Ladies)', coach: 'خانم بهرام‌زاده', schedule: 'Tuesdays & Thursdays | 17:00–18:30', image: 'https://placehold.co/600x400.png', imageHint: 'women volleyball match', description: 'Ladies volleyball class focusing on technique and teamwork.', tags: ['Volleyball', 'Team Sport', 'Ladies', 'Skill Development'], price: 7500000, persianName: 'والیبال', persianDescription: 'کلاس والیبال بانوان با مربیگری خانم بهرام‌زاده، با تمرکز بر تکنیک و کار تیمی.', persianSchedule: 'سه‌شنبه و پنج‌شنبه | ۱۷:۰۰–۱۸:۳۰', persianTags: ['والیبال', 'ورزش تیمی', 'بانوان', 'توسعه مهارت']},
    { id: 'w-volleyball-chamanfar', name: 'Volleyball (Ladies)', coach: 'خانم چمن‌فر', schedule: 'Tuesdays & Thursdays | 18:30–20:00', image: 'https://placehold.co/600x400.png', imageHint: 'volleyball training session', description: 'Advanced volleyball training for ladies.', tags: ['Volleyball', 'Team Sport', 'Advanced', 'Ladies'], price: 7500000, persianName: 'والیبال', persianDescription: 'آموزش پیشرفته والیبال برای بانوان تحت نظر خانم چمن‌فر.', persianSchedule: 'سه‌شنبه و پنج‌شنبه | ۱۸:۳۰–۲۰:۰۰', persianTags: ['والیبال', 'ورزش تیمی', 'پیشرفته', 'بانوان']},
    { id: 'w-basketball-alavi-aghajari', name: 'Basketball (Ladies - Int/Adv)', coach: 'خانم علوی / خانم آقاجری', schedule: 'Sundays & Wednesdays | 17:00–18:30', image: 'https://placehold.co/600x400.png', imageHint: 'women basketball game', description: 'Intermediate and advanced basketball class for ladies.', tags: ['Basketball', 'Team Sport', 'Intermediate', 'Advanced', 'Ladies'], price: 8000000, persianName: 'بسکتبال (نیمه/پیشرفته)', persianDescription: 'کلاس بسکتبال نیمه‌پیشرفته و پیشرفته برای بانوان با مربیگری خانم‌ها علوی و آقاجری.', persianSchedule: 'یک‌شنبه و چهارشنبه | ۱۷:۰۰–۱۸:30', persianTags: ['بسکتبال', 'ورزش تیمی', 'نیمه‌پیشرفته', 'پیشرفته', 'بانوان']},
    { id: 'w-gymnastics-rahman', name: 'Gymnastics (Ladies)', coach: 'خانم رحمان ستایش', schedule: 'Even Days | 17:00–18:30', image: 'https://placehold.co/600x400.png', imageHint: 'gymnastics routine', description: 'Ladies gymnastics class focusing on flexibility and strength.', tags: ['Gymnastics', 'Flexibility', 'Strength', 'Ladies'], price: 8500000, persianName: 'ژیمناستیک', persianDescription: 'کلاس ژیمناستیک بانوان با تمرکز بر انعطاف و قدرت، مربی خانم رحمان ستایش.', persianSchedule: 'روزهای زوج | ۱۷:۰۰–۱۸:۳۰', persianTags: ['ژیمناستیک', 'انعطاف‌پذیری', 'قدرت', 'بانوان']},
    { id: 'w-zumba-gholami', name: 'Zumba (Ladies)', coach: 'خانم غلامی', schedule: 'Even Days | 18:00–19:00', image: 'https://placehold.co/600x400.png', imageHint: 'zumba dance fitness', description: 'Fun and energetic Zumba class for ladies.', tags: ['Zumba', 'Dance', 'Cardio', 'Ladies', 'All Levels'], price: 6000000, persianName: 'زومبا', persianDescription: 'کلاس شاد و پرانرژی زومبا برای بانوان با مربیگری خانم غلامی.', persianSchedule: 'روزهای زوج | ۱۸:۰۰–۱۹:۰۰', persianTags: ['زومبا', 'دنس', 'کاردیو', 'بانوان', 'همه سطوح']},
    { id: 'w-aerobics-abbasi', name: 'Aerobics (Ladies)', coach: 'خانم عباسی', schedule: 'Odd Days | 18:00–19:00', image: 'https://placehold.co/600x400.png', imageHint: 'aerobics class', description: 'Ladies aerobics class for fitness and endurance.', tags: ['Aerobics', 'Cardio', 'Fitness', 'Ladies', 'All Levels'], price: 6000000, persianName: 'ایروبیک', persianDescription: 'کلاس ایروبیک بانوان برای تناسب اندام و افزایش استقامت با خانم عباسی.', persianSchedule: 'روزهای فرد | ۱۸:۰۰–۱۹:۰۰', persianTags: ['ایروبیک', 'کاردیو', 'تناسب اندام', 'بانوان', 'همه سطوح']},
    { id: 'w-functionalfitness-abbasi', name: 'Functional Fitness (Ladies)', coach: 'خانم عباسی', schedule: 'Even Days | 16:30–17:30', image: 'https://placehold.co/600x400.png', imageHint: 'functional fitness training', description: 'Functional fitness training for ladies to increase strength and physical fitness.', tags: ['Functional Fitness', 'Strength', 'Conditioning', 'Ladies', 'All Levels'], price: 7000000, persianName: 'فانکشنال فیتنس', persianDescription: 'تمرینات فانکشنال فیتنس برای بانوان جهت افزایش قدرت و آمادگی جسمانی با خانم عباسی.', persianSchedule: 'روزهای زوج | ۱۶:۳۰–۱۷:۳۰', persianTags: ['فانکشنال فیتنس', 'قدرتی', 'آمادگی جسمانی', 'بانوان', 'همه سطوح']},
    { id: 'w-fitnesspackage-mahdavi', name: 'Fitness Package (Ladies)', coach: 'خانم مهدوی', schedule: 'Even Days | 17:30–18:30', image: 'https://placehold.co/600x400.png', imageHint: 'fitness package workout', description: 'Comprehensive fitness package for ladies, designed to achieve fitness goals.', tags: ['Fitness', 'Comprehensive Package', 'Wellness', 'Ladies', 'All Levels'], price: 7500000, persianName: 'پکیج فیتنس', persianDescription: 'پکیج جامع فیتنس برای بانوان، طراحی شده توسط خانم مهدوی برای رسیدن به اهداف تناسب اندام.', persianSchedule: 'روزهای زوج | ۱۷:۳۰–۱۸:۳۰', persianTags: ['فیتنس', 'پکیج جامع', 'تناسب اندام', 'بانوان', 'همه سطوح']},
    { id: 'w-trx-mohajer', name: 'TRX (Ladies)', coach: 'خانم مهاجر', schedule: 'Even Days | 07:00–08:00', image: 'https://placehold.co/600x400.png', imageHint: 'trx suspension workout', description: 'TRX training for ladies, for full-body strengthening.', tags: ['TRX', 'Strength', 'Full Body', 'Ladies', 'All Levels'], price: 8000000, persianName: 'تی‌آر‌ایکس (TRX)', persianDescription: 'تمرینات تی‌آر‌ایکس برای بانوان با خانم مهاجر، جهت تقویت کل بدن.', persianSchedule: 'روزهای زوج | ۰۷:۰۰–۰۸:۰۰', persianTags: ['تی ار ایکس', 'TRX', 'قدرتی', 'کل بدن', 'بانوان', 'همه سطوح']},
    { id: 'w-bodybuilding-mohajer-khaksar', name: 'Bodybuilding (Ladies)', coach: 'خانم‌ها مهاجر و خاکسار', schedule: 'Every Day | 17:00–18:00', image: 'https://placehold.co/600x400.png', imageHint: 'women bodybuilding', description: 'Specialized ladies bodybuilding program.', tags: ['Bodybuilding', 'Strength', 'Muscle Sculpting', 'Ladies', 'All Levels'], price: 9000000, persianName: 'بدنسازی', persianDescription: 'برنامه بدنسازی تخصصی بانوان با مربیگری خانم‌ها مهاجر و خاکسار.', persianSchedule: 'هر روز | ۱۷:۰۰–۱۸:۰۰', persianTags: ['بدنسازی', 'قدرتی', 'عضله سازی', 'بانوان', 'همه سطوح']},
    { id: 'w-sauna', name: 'Dry & Steam Sauna (Ladies)', coach: '—', schedule: 'Saturdays, Mondays, Thursdays', image: 'https://placehold.co/600x400.png', imageHint: 'sauna steam room', description: 'Access to dry and steam sauna for ladies. Free for bodybuilding registrants.', tags: ['Sauna', 'Recovery', 'Wellness', 'Ladies'], accessOnly: true, price: 0, persianName: 'سونا خشک و بخار', persianDescription: ' استفاده از سونا خشک و بخار برای بانوان. رایگان برای ثبت‌نام‌کنندگان در کلاس بدنسازی.', persianSchedule: 'شنبه، دوشنبه، پنج‌شنبه', persianTags: ['سونا', 'ریکاوری', 'بانوان', 'تندرستی']},
  ],
  men: [
    { id: 'm-basketball-beginner-rahmani', name: 'Basketball (Men - Beginner)', coach: 'آقای رحمانی', schedule: 'Saturdays | 09:30–10:30', image: 'https://placehold.co/600x400.png', imageHint: 'men basketball beginner', description: 'Men\'s beginner basketball class for learning the fundamentals.', tags: ['Basketball', 'Team Sport', 'Beginner', 'Men'], price: 7500000, persianName: 'بسکتبال (مبتدی)', persianDescription: 'کلاس بسکتبال مبتدی آقایان با مربیگری آقای رحمانی، برای یادگیری اصول اولیه.', persianSchedule: 'شنبه | ۰۹:۳۰–۱۰:۳۰', persianTags: ['بسکتبال', 'ورزش تیمی', 'مبتدی', 'آقایان']},
    { id: 'm-basketball-advanced-rahmani', name: 'Basketball (Men - Int/Adv)', coach: 'آقای رحمانی', schedule: 'Mondays | 17:00–18:30', image: 'https://placehold.co/600x400.png', imageHint: 'men basketball advanced', description: 'Men\'s intermediate and advanced basketball class to enhance skills.', tags: ['Basketball', 'Team Sport', 'Intermediate', 'Advanced', 'Men'], price: 8000000, persianName: 'بسکتبال (نیمه/پیشرفته)', persianDescription: 'کلاس بسکتبال نیمه‌پیشرفته و پیشرفته آقایان برای ارتقا مهارت‌ها با آقای رحمانی.', persianSchedule: 'دوشنبه | ۱۷:۰۰–۱۸:۳۰', persianTags: ['بسکتبال', 'ورزش تیمی', 'نیمه‌پیشرفته', 'پیشرفته', 'آقایان']},
    { id: 'm-volleyball-ghodousi', name: 'Volleyball (Men)', coach: 'آقای قدوسی', schedule: 'Saturdays & Mondays | 18:30–20:00', image: 'https://placehold.co/600x400.png', imageHint: 'men volleyball match', description: 'Men\'s volleyball class, focusing on advanced techniques and team play.', tags: ['Volleyball', 'Team Sport', 'Advanced', 'Men'], price: 8500000, persianName: 'والیبال', persianDescription: 'کلاس والیبال آقایان با آقای قدوسی، تمرکز بر تکنیک‌های پیشرفته و بازی تیمی.', persianSchedule: 'شنبه و دوشنبه | ۱۸:۳۰–۲۰:۰۰', persianTags: ['والیبال', 'ورزش تیمی', 'پیشرفته', 'آقایان']},
    { id: 'm-kungfu-amini', name: 'Kung Fu (Men)', coach: 'آقای امینی', schedule: 'Sundays, Tuesdays, Thursdays | 18:30–19:45', image: 'https://placehold.co/600x400.png', imageHint: 'kung fu practice', description: 'Kung Fu training for men, first session.', tags: ['Kung Fu', 'Martial Arts', 'Self-defense', 'Men', 'All Levels'], price: 7500000, persianName: 'کونگ‌فو', persianDescription: 'آموزش کونگ‌فو برای آقایان با استاد امینی، سانس اول.', persianSchedule: 'یک‌شنبه، سه‌شنبه، پنج‌شنبه | ۱۸:۳۰–۱۹:۴۵', persianTags: ['کونگ فو', 'هنرهای رزمی', 'دفاع شخصی', 'آقایان', 'همه سطوح']},
    { id: 'm-gymnastics-nadimi', name: 'Gymnastics (Men)', coach: 'آقای ندیمی', schedule: 'Odd Days | 15:30–16:30', image: 'https://placehold.co/600x400.png', imageHint: 'men gymnastics rings', description: 'Men\'s gymnastics class for increasing strength and flexibility.', tags: ['Gymnastics', 'Strength', 'Flexibility', 'Men', 'All Levels'], price: 8500000, persianName: 'ژیمناستیک', persianDescription: 'کلاس ژیمناستیک آقایان با آقای ندیمی، برای افزایش قدرت و انعطاف.', persianSchedule: 'روزهای فرد | ۱۵:۳۰–۱۶:۳۰', persianTags: ['ژیمناستیک', 'قدرتی', 'انعطاف', 'آقایان', 'همه سطوح']},
    { id: 'm-karate-hosseini', name: 'Karate (Men)', coach: 'آقای حسینی', schedule: 'Every other day | 17:00–18:00', image: 'https://placehold.co/600x400.png', imageHint: 'karate kata', description: 'Karate training for men of all levels.', tags: ['Karate', 'Martial Arts', 'Self-defense', 'Men', 'All Levels'], price: 8000000, persianName: 'کاراته', persianDescription: 'آموزش کاراته برای آقایان در تمامی سطوح با آقای حسینی.', persianSchedule: 'هر دو روز (یک روز در میان) | ۱۷:۰۰–۱۸:۰۰', persianTags: ['کاراته', 'هنرهای رزمی', 'دفاع شخصی', 'آقایان', 'همه سطوح']},
    { id: 'm-bodybuilding-kamali', name: 'Bodybuilding (Men)', coach: 'آقای کمالی', schedule: 'Every Day | 18:00–19:00', image: 'https://placehold.co/600x400.png', imageHint: 'men bodybuilding gym', description: 'Specialized men\'s bodybuilding program.', tags: ['Bodybuilding', 'Strength', 'Muscle Building', 'Men', 'All Levels'], price: 10000000, persianName: 'بدنسازی', persianDescription: 'برنامه تخصصی بدنسازی آقایان با مربیگری آقای کمالی.', persianSchedule: 'هر روز | ۱۸:۰۰–۱۹:۰۰', persianTags: ['بدنسازی', 'قدرتی', 'عضله سازی', 'آقایان', 'همه سطوح']},
    { id: 'm-sauna', name: 'Dry & Steam Sauna (Men)', coach: '—', schedule: 'Saturdays, Mondays, Thursdays', image: 'https://placehold.co/600x400.png', imageHint: 'sauna relaxing', description: 'Access to dry and steam sauna for men. Free for bodybuilding registrants.', tags: ['Sauna', 'Recovery', 'Wellness', 'Men'], accessOnly: true, price: 0, persianName: 'سونا خشک و بخار', persianDescription: 'استفاده از سونا خشک و بخار برای آقایان. رایگان برای ثبت‌نام‌کنندگان در کلاس بدنسازی.', persianSchedule: 'شنبه، دوشنبه، پنج‌شنبه', persianTags: ['سونا', 'ریکاوری', 'آقایان', 'تندرستی']},
  ],
};

const ClassCard = ({ classItem }: { classItem: ClassItem }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoggedIn(!!localStorage.getItem('isLoggedIn'));
    }
  }, []);

  const handleJoinClick = () => {
    if (isLoggedIn) {
      router.push('/dashboard/classes');
    } else {
      router.push('/auth/login');
    }
  };

  return (
    <Card className="overflow-hidden flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card text-right">
      <div className="relative w-full aspect-video">
        <Image src={classItem.image} alt={classItem.persianName || classItem.name} layout="fill" objectFit="cover" data-ai-hint={classItem.imageHint} />
      </div>
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary text-right">{classItem.persianName || classItem.name}</CardTitle>
        <CardDescription className="text-muted-foreground text-right">
          مربی: {classItem.coach} <br />
          <span className="text-sm text-accent font-medium">{classItem.persianSchedule || classItem.schedule}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-foreground mb-3 font-persian text-right">{classItem.persianDescription || classItem.description}</p>
        <div className="flex flex-wrap gap-2 justify-start">
          {(classItem.persianTags || classItem.tags).map(tag => <Badge key={tag} variant="secondary" className="font-persian">{tag}</Badge>)}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          onClick={handleJoinClick}
        >
          {classItem.accessOnly ? 'مشاهده اطلاعات دسترسی' : 'ثبت‌نام در این کلاس'}
        </Button>
      </CardFooter>
    </Card>
  );
};

const extractSportFromClassName = (name: string) => (name || '').split('(')[0].trim();
const persianSportMapping: Record<string, string> = {
    'Volleyball': 'والیبال',
    'Basketball': 'بسکتبال',
    'Gymnastics': 'ژیمناستیک',
    'Zumba': 'زومبا',
    'Aerobics': 'ایروبیک',
    'Functional Fitness': 'فانکشنال فیتنس',
    'TRX': 'تی ار ایکس',
    'Bodybuilding': 'بدنسازی',
    'Kung Fu': 'کونگ فو',
    'Karate': 'کاراته',
};
const persianLevelMapping: Record<string, string> = {
    'Beginner': 'مبتدی',
    'Intermediate': 'نیمه‌پیشرفته',
    'Advanced': 'پیشرفته',
    'All Levels': 'همه سطوح',
};


export default function ClassesPage() {
  const [selectedSport, setSelectedSport] = useState<string>('همه');
  const [selectedLevel, setSelectedLevel] = useState<string>('همه');

  useEffect(() => {
    document.title = "کلاس‌ها و ورزش‌ها | باشگاه ورزشی سورن";
    const metaDesc = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    metaDesc.setAttribute('content', 'لیست کامل کلاس‌های ورزشی باشگاه سورن شامل والیبال، بسکتبال، ژیمناستیک، بدنسازی و هنرهای رزمی برای بانوان و آقایان در تمام سطوح. برنامه و اطلاعات ثبت‌نام را مشاهده کنید.');
    if (!document.querySelector('meta[name="description"]')) {
        document.head.appendChild(metaDesc);
    }
  }, []);

  const allClassItems = useMemo(() => [...classesData.women, ...classesData.men], []);

  const uniqueSports = useMemo(() => {
    const sports = new Set<string>();
    allClassItems.forEach(item => {
      if (item.accessOnly) return;
      const baseSportName = extractSportFromClassName(item.persianName || item.name); 
      sports.add(baseSportName); 

      (item.persianTags || item.tags).forEach(tag => { 
        if (Object.values(persianSportMapping).includes(tag) || Object.keys(persianSportMapping).find(key => persianSportMapping[key] === tag)) {
             sports.add(tag); 
        } else if (persianSportMapping[tag]) {
            sports.add(persianSportMapping[tag]); 
        }
      });
    });
    return ['همه', ...Array.from(sports).filter(Boolean).sort((a, b) => a.localeCompare(b, 'fa'))];
  }, [allClassItems]);

  const uniqueLevels = useMemo(() => {
    const levels = new Set<string>();
    allClassItems.forEach(item => {
      if (item.accessOnly) return;
      (item.persianTags || item.tags).forEach(tag => { 
        if (Object.values(persianLevelMapping).includes(tag) || Object.keys(persianLevelMapping).find(key => persianLevelMapping[key] === tag)) {
            levels.add(tag); 
        } else if (persianLevelMapping[tag]) {
            levels.add(persianLevelMapping[tag]); 
        }
      });
    });
    const order = ['همه سطوح', 'مبتدی', 'نیمه‌پیشرفته', 'پیشرفته'];
    return ['همه', ...Array.from(levels).filter(Boolean).sort((a,b) => order.indexOf(a) - order.indexOf(b))];
  }, [allClassItems]);

  const filteredWomenClasses = useMemo(() => {
    return classesData.women.filter(item => {
      const sportMatch = selectedSport === 'همه' || 
                         (item.persianName && extractSportFromClassName(item.persianName) === selectedSport) ||
                         (item.persianTags && item.persianTags.includes(selectedSport));
      const levelMatch = selectedLevel === 'همه' || (item.persianTags && item.persianTags.includes(selectedLevel));
      return (item.accessOnly && (sportMatch || selectedSport === 'همه')) || (sportMatch && levelMatch && !item.accessOnly) ;
    });
  }, [selectedSport, selectedLevel]);

  const filteredMenClasses = useMemo(() => {
    return classesData.men.filter(item => {
      const sportMatch = selectedSport === 'همه' ||
                         (item.persianName && extractSportFromClassName(item.persianName) === selectedSport) ||
                         (item.persianTags && item.persianTags.includes(selectedSport));
      const levelMatch = selectedLevel === 'همه' || (item.persianTags && item.persianTags.includes(selectedLevel));
      return (item.accessOnly && (sportMatch || selectedSport === 'همه')) || (sportMatch && levelMatch && !item.accessOnly) ;
    });
  }, [selectedSport, selectedLevel]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32 md:pt-40 bg-background font-persian">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold font-headline mb-4 text-primary">کلاس‌ها و ورزش‌های ما</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          کلاس مناسب برای اهداف و علایق تناسب اندام خود را بیابید. ما طیف متنوعی از رشته‌ها را برای تمام سطوح ارائه می‌دهیم.
        </p>
      </header>

      <div className="mb-12 p-6 bg-card rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-4 font-headline text-primary flex items-center"><Filter className="ms-2 h-5 w-5"/>فیلترها</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex-grow md:flex-grow-0">
            <label htmlFor="sport-filter" className="block text-sm font-medium text-foreground mb-1">رشته ورزشی</label>
            <Select value={selectedSport} onValueChange={setSelectedSport} dir="rtl">
              <SelectTrigger id="sport-filter" className="w-full md:w-[200px]" aria-label="فیلتر بر اساس رشته ورزشی">
                <SelectValue placeholder="انتخاب رشته" />
              </SelectTrigger>
              <SelectContent>
                {uniqueSports.map(sport => (
                  <SelectItem key={sport} value={sport}>{sport}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-grow md:flex-grow-0">
            <label htmlFor="level-filter" className="block text-sm font-medium text-foreground mb-1">سطح</label>
            <Select value={selectedLevel} onValueChange={setSelectedLevel} dir="rtl">
              <SelectTrigger id="level-filter" className="w-full md:w-[200px]" aria-label="فیلتر بر اساس سطح">
                <SelectValue placeholder="انتخاب سطح" />
              </SelectTrigger>
              <SelectContent>
                {uniqueLevels.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <section>
        <h2 className="text-3xl font-semibold font-headline mb-8 flex items-center text-primary">
          <Users className="me-3 h-8 w-8" /> کلاس‌های بانوان
        </h2>
        {filteredWomenClasses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredWomenClasses.map(classItem => <ClassCard key={classItem.id} classItem={classItem} />)}
          </div>
        ) : (
          <p className="text-muted-foreground mb-12 text-center py-8">هیچ کلاس بانوانی با فیلترهای فعلی مطابقت ندارد. لطفا فیلترها را تغییر دهید.</p>
        )}
      </section>

      <Separator className="my-16" />

      <section>
        <h2 className="text-3xl font-semibold font-headline mb-8 flex items-center text-primary">
          <Users className="me-3 h-8 w-8" /> کلاس‌های آقایان و جوانان
        </h2>
        {filteredMenClasses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMenClasses.map(classItem => <ClassCard key={classItem.id} classItem={classItem} />)}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">هیچ کلاس آقایان یا جوانانی با فیلترهای فعلی مطابقت ندارد. لطفا فیلترها را تغییر دهید.</p>
        )}
      </section>
    </div>
  );
}
