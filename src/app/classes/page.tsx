
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
    { id: 'w-volleyball-bahramzadeh', name: 'والیبال (بانوان)', coach: 'خانم بهرام‌زاده', schedule: 'سه‌شنبه و پنج‌شنبه | ۱۷:۰۰–۱۸:۳۰', image: 'https://placehold.co/600x400.png', imageHint: 'women volleyball match', description: 'کلاس والیبال بانوان با تمرکز بر تکنیک و کار تیمی.', tags: ['والیبال', 'ورزش تیمی', 'بانوان', 'توسعه مهارت'], price: 7500000, persianName: 'والیبال', persianDescription: 'کلاس والیبال بانوان با مربیگری خانم بهرام‌زاده، با تمرکز بر تکنیک و کار تیمی.', persianSchedule: 'سه‌شنبه و پنج‌شنبه | ۱۷:۰۰–۱۸:۳۰', persianTags: ['والیبال', 'ورزش تیمی', 'بانوان', 'توسعه مهارت']},
    { id: 'w-volleyball-chamanfar', name: 'والیبال (بانوان)', coach: 'خانم چمن‌فر', schedule: 'سه‌شنبه و پنج‌شنبه | ۱۸:۳۰–۲۰:۰۰', image: 'https://placehold.co/600x400.png', imageHint: 'volleyball training session', description: 'آموزش پیشرفته والیبال برای بانوان.', tags: ['والیبال', 'ورزش تیمی', 'پیشرفته', 'بانوان'], price: 7500000, persianName: 'والیبال', persianDescription: 'آموزش پیشرفته والیبال برای بانوان تحت نظر خانم چمن‌فر.', persianSchedule: 'سه‌شنبه و پنج‌شنبه | ۱۸:۳۰–۲۰:۰۰', persianTags: ['والیبال', 'ورزش تیمی', 'پیشرفته', 'بانوان']},
    { id: 'w-basketball-alavi-aghajari', name: 'بسکتبال (بانوان - نیمه‌پیشرفته/پیشرفته)', coach: 'خانم علوی / خانم آقاجری', schedule: 'یک‌شنبه و چهارشنبه | ۱۷:۰۰–۱۸:۳۰', image: 'https://placehold.co/600x400.png', imageHint: 'women basketball game', description: 'کلاس بسکتبال نیمه‌پیشرفته و پیشرفته برای بانوان.', tags: ['بسکتبال', 'ورزش تیمی', 'نیمه‌پیشرفته', 'پیشرفته', 'بانوان'], price: 8000000, persianName: 'بسکتبال (نیمه/پیشرفته)', persianDescription: 'کلاس بسکتبال نیمه‌پیشرفته و پیشرفته برای بانوان با مربیگری خانم‌ها علوی و آقاجری.', persianSchedule: 'یک‌شنبه و چهارشنبه | ۱۷:۰۰–۱۸:30', persianTags: ['بسکتبال', 'ورزش تیمی', 'نیمه‌پیشرفته', 'پیشرفته', 'بانوان']},
    { id: 'w-gymnastics-rahman', name: 'ژیمناستیک (بانوان)', coach: 'خانم رحمان ستایش', schedule: 'روزهای زوج | ۱۷:۰۰–۱۸:۳۰', image: 'https://placehold.co/600x400.png', imageHint: 'gymnastics routine', description: 'کلاس ژیمناستیک بانوان با تمرکز بر انعطاف و قدرت.', tags: ['ژیمناستیک', 'انعطاف‌پذیری', 'قدرت', 'بانوان'], price: 8500000, persianName: 'ژیمناستیک', persianDescription: 'کلاس ژیمناستیک بانوان با تمرکز بر انعطاف و قدرت، مربی خانم رحمان ستایش.', persianSchedule: 'روزهای زوج | ۱۷:۰۰–۱۸:۳۰', persianTags: ['ژیمناستیک', 'انعطاف‌پذیری', 'قدرت', 'بانوان']},
    { id: 'w-zumba-gholami', name: 'زومبا (بانوان)', coach: 'خانم غلامی', schedule: 'روزهای زوج | ۱۸:۰۰–۱۹:۰۰', image: 'https://placehold.co/600x400.png', imageHint: 'zumba dance fitness', description: 'کلاس شاد و پرانرژی زومبا برای بانوان.', tags: ['زومبا', 'دنس', 'کاردیو', 'بانوان', 'همه سطوح'], price: 6000000, persianName: 'زومبا', persianDescription: 'کلاس شاد و پرانرژی زومبا برای بانوان با مربیگری خانم غلامی.', persianSchedule: 'روزهای زوج | ۱۸:۰۰–۱۹:۰۰', persianTags: ['زومبا', 'دنس', 'کاردیو', 'بانوان', 'همه سطوح']},
    { id: 'w-aerobics-abbasi', name: 'ایروبیک (بانوان)', coach: 'خانم عباسی', schedule: 'روزهای فرد | ۱۸:۰۰–۱۹:۰۰', image: 'https://placehold.co/600x400.png', imageHint: 'aerobics class', description: 'کلاس ایروبیک بانوان برای تناسب اندام و افزایش استقامت.', tags: ['ایروبیک', 'کاردیو', 'تناسب اندام', 'بانوان', 'همه سطوح'], price: 6000000, persianName: 'ایروبیک', persianDescription: 'کلاس ایروبیک بانوان برای تناسب اندام و افزایش استقامت با خانم عباسی.', persianSchedule: 'روزهای فرد | ۱۸:۰۰–۱۹:۰۰', persianTags: ['ایروبیک', 'کاردیو', 'تناسب اندام', 'بانوان', 'همه سطوح']},
    { id: 'w-functionalfitness-abbasi', name: 'فانکشنال فیتنس (بانوان)', coach: 'خانم عباسی', schedule: 'روزهای زوج | ۱۶:۳۰–۱۷:۳۰', image: 'https://placehold.co/600x400.png', imageHint: 'functional fitness training', description: 'تمرینات فانکشنال فیتنس برای بانوان جهت افزایش قدرت و آمادگی جسمانی.', tags: ['فانکشنال فیتنس', 'قدرتی', 'آمادگی جسمانی', 'بانوان', 'همه سطوح'], price: 7000000, persianName: 'فانکشنال فیتنس', persianDescription: 'تمرینات فانکشنال فیتنس برای بانوان جهت افزایش قدرت و آمادگی جسمانی با خانم عباسی.', persianSchedule: 'روزهای زوج | ۱۶:۳۰–۱۷:۳۰', persianTags: ['فانکشنال فیتنس', 'قدرتی', 'آمادگی جسمانی', 'بانوان', 'همه سطوح']},
    { id: 'w-fitnesspackage-mahdavi', name: 'پکیج فیتنس (بانوان)', coach: 'خانم مهدوی', schedule: 'روزهای زوج | ۱۷:۳۰–۱۸:۳۰', image: 'https://placehold.co/600x400.png', imageHint: 'fitness package workout', description: 'پکیج جامع فیتنس برای بانوان، طراحی شده برای رسیدن به اهداف تناسب اندام.', tags: ['فیتنس', 'پکیج جامع', 'تندرستی', 'بانوان', 'همه سطوح'], price: 7500000, persianName: 'پکیج فیتنس', persianDescription: 'پکیج جامع فیتنس برای بانوان، طراحی شده توسط خانم مهدوی برای رسیدن به اهداف تناسب اندام.', persianSchedule: 'روزهای زوج | ۱۷:۳۰–۱۸:۳۰', persianTags: ['فیتنس', 'پکیج جامع', 'تناسب اندام', 'بانوان', 'همه سطوح']},
    { id: 'w-trx-mohajer', name: 'تی‌آر‌ایکس (بانوان)', coach: 'خانم مهاجر', schedule: 'روزهای زوج | ۰۷:۰۰–۰۸:۰۰', image: 'https://placehold.co/600x400.png', imageHint: 'trx suspension workout', description: 'تمرینات تی‌آر‌ایکس برای بانوان، جهت تقویت کل بدن.', tags: ['تی ار ایکس', 'TRX', 'قدرتی', 'کل بدن', 'بانوان', 'همه سطوح'], price: 8000000, persianName: 'تی‌آر‌ایکس (TRX)', persianDescription: 'تمرینات تی‌آر‌ایکس برای بانوان با خانم مهاجر، جهت تقویت کل بدن.', persianSchedule: 'روزهای زوج | ۰۷:۰۰–۰۸:۰۰', persianTags: ['تی ار ایکس', 'TRX', 'قدرتی', 'کل بدن', 'بانوان', 'همه سطوح']},
    { id: 'w-bodybuilding-mohajer-khaksar', name: 'بدنسازی (بانوان)', coach: 'خانم‌ها مهاجر و خاکسار', schedule: 'هر روز | ۱۷:۰۰–۱۸:۰۰', image: 'https://placehold.co/600x400.png', imageHint: 'women bodybuilding', description: 'برنامه بدنسازی تخصصی بانوان.', tags: ['بدنسازی', 'قدرتی', 'عضله سازی', 'بانوان', 'همه سطوح'], price: 9000000, persianName: 'بدنسازی', persianDescription: 'برنامه بدنسازی تخصصی بانوان با مربیگری خانم‌ها مهاجر و خاکسار.', persianSchedule: 'هر روز | ۱۷:۰۰–۱۸:۰۰', persianTags: ['بدنسازی', 'قدرتی', 'عضله سازی', 'بانوان', 'همه سطوح']},
    { id: 'w-sauna', name: 'سونا خشک و بخار (بانوان)', coach: '—', schedule: 'شنبه، دوشنبه، پنج‌شنبه', image: 'https://placehold.co/600x400.png', imageHint: 'sauna steam room', description: 'استفاده از سونا خشک و بخار برای بانوان. رایگان برای ثبت‌نام‌کنندگان در کلاس بدنسازی.', tags: ['سونا', 'ریکاوری', 'تندرستی', 'بانوان'], accessOnly: true, price: 0, persianName: 'سونا خشک و بخار', persianDescription: ' استفاده از سونا خشک و بخار برای بانوان. رایگان برای ثبت‌نام‌کنندگان در کلاس بدنسازی.', persianSchedule: 'شنبه، دوشنبه، پنج‌شنبه', persianTags: ['سونا', 'ریکاوری', 'بانوان', 'تندرستی']},
  ],
  men: [
    { id: 'm-basketball-beginner-rahmani', name: 'بسکتبال (آقایان - مبتدی)', coach: 'آقای رحمانی', schedule: 'شنبه | ۰۹:۳۰–۱۰:۳۰', image: 'https://placehold.co/600x400.png', imageHint: 'men basketball beginner', description: 'کلاس بسکتبال مبتدی آقایان برای یادگیری اصول اولیه.', tags: ['بسکتبال', 'ورزش تیمی', 'مبتدی', 'آقایان'], price: 7500000, persianName: 'بسکتبال (مبتدی)', persianDescription: 'کلاس بسکتبال مبتدی آقایان با مربیگری آقای رحمانی، برای یادگیری اصول اولیه.', persianSchedule: 'شنبه | ۰۹:۳۰–۱۰:۳۰', persianTags: ['بسکتبال', 'ورزش تیمی', 'مبتدی', 'آقایان']},
    { id: 'm-basketball-advanced-rahmani', name: 'بسکتبال (آقایان - نیمه‌پیشرفته/پیشرفته)', coach: 'آقای رحمانی', schedule: 'دوشنبه | ۱۷:۰۰–۱۸:۳۰', image: 'https://placehold.co/600x400.png', imageHint: 'men basketball advanced', description: 'کلاس بسکتبال نیمه‌پیشرفته و پیشرفته آقایان برای ارتقا مهارت‌ها.', tags: ['بسکتبال', 'ورزش تیمی', 'نیمه‌پیشرفته', 'پیشرفته', 'آقایان'], price: 8000000, persianName: 'بسکتبال (نیمه/پیشرفته)', persianDescription: 'کلاس بسکتبال نیمه‌پیشرفته و پیشرفته آقایان برای ارتقا مهارت‌ها با آقای رحمانی.', persianSchedule: 'دوشنبه | ۱۷:۰۰–۱۸:۳۰', persianTags: ['بسکتبال', 'ورزش تیمی', 'نیمه‌پیشرفته', 'پیشرفته', 'آقایان']},
    { id: 'm-volleyball-ghodousi', name: 'والیبال (آقایان)', coach: 'آقای قدوسی', schedule: 'شنبه و دوشنبه | ۱۸:۳۰–۲۰:۰۰', image: 'https://placehold.co/600x400.png', imageHint: 'men volleyball match', description: 'کلاس والیبال آقایان، تمرکز بر تکنیک‌های پیشرفته و بازی تیمی.', tags: ['والیبال', 'ورزش تیمی', 'پیشرفته', 'آقایان'], price: 8500000, persianName: 'والیبال', persianDescription: 'کلاس والیبال آقایان با آقای قدوسی، تمرکز بر تکنیک‌های پیشرفته و بازی تیمی.', persianSchedule: 'شنبه و دوشنبه | ۱۸:۳۰–۲۰:۰۰', persianTags: ['والیبال', 'ورزش تیمی', 'پیشرفته', 'آقایان']},
    { id: 'm-kungfu-amini', name: 'کونگ‌فو (آقایان)', coach: 'آقای امینی', schedule: 'یک‌شنبه، سه‌شنبه، پنج‌شنبه | ۱۸:۳۰–۱۹:۴۵', image: 'https://placehold.co/600x400.png', imageHint: 'kung fu practice', description: 'آموزش کونگ‌فو برای آقایان، سانس اول.', tags: ['کونگ فو', 'هنرهای رزمی', 'دفاع شخصی', 'آقایان', 'همه سطوح'], price: 7500000, persianName: 'کونگ‌فو', persianDescription: 'آموزش کونگ‌فو برای آقایان با استاد امینی، سانس اول.', persianSchedule: 'یک‌شنبه، سه‌شنبه، پنج‌شنبه | ۱۸:۳۰–۱۹:۴۵', persianTags: ['کونگ فو', 'هنرهای رزمی', 'دفاع شخصی', 'آقایان', 'همه سطوح']},
    { id: 'm-gymnastics-nadimi', name: 'ژیمناستیک (آقایان)', coach: 'آقای ندیمی', schedule: 'روزهای فرد | ۱۵:۳۰–۱۶:۳۰', image: 'https://placehold.co/600x400.png', imageHint: 'men gymnastics rings', description: 'کلاس ژیمناستیک آقایان برای افزایش قدرت و انعطاف.', tags: ['ژیمناستیک', 'قدرتی', 'انعطاف', 'آقایان', 'همه سطوح'], price: 8500000, persianName: 'ژیمناستیک', persianDescription: 'کلاس ژیمناستیک آقایان با آقای ندیمی، برای افزایش قدرت و انعطاف.', persianSchedule: 'روزهای فرد | ۱۵:۳۰–۱۶:۳۰', persianTags: ['ژیمناستیک', 'قدرتی', 'انعطاف', 'آقایان', 'همه سطوح']},
    { id: 'm-karate-hosseini', name: 'کاراته (آقایان)', coach: 'آقای حسینی', schedule: 'هر دو روز (یک روز در میان) | ۱۷:۰۰–۱۸:۰۰', image: 'https://placehold.co/600x400.png', imageHint: 'karate kata', description: 'آموزش کاراته برای آقایان در تمامی سطوح.', tags: ['کاراته', 'هنرهای رزمی', 'دفاع شخصی', 'آقایان', 'همه سطوح'], price: 8000000, persianName: 'کاراته', persianDescription: 'آموزش کاراته برای آقایان در تمامی سطوح با آقای حسینی.', persianSchedule: 'هر دو روز (یک روز در میان) | ۱۷:۰۰–۱۸:۰۰', persianTags: ['کاراته', 'هنرهای رزمی', 'دفاع شخصی', 'آقایان', 'همه سطوح']},
    { id: 'm-bodybuilding-kamali', name: 'بدنسازی (آقایان)', coach: 'آقای کمالی', schedule: 'هر روز | ۱۸:۰۰–۱۹:۰۰', image: 'https://placehold.co/600x400.png', imageHint: 'men bodybuilding gym', description: 'برنامه تخصصی بدنسازی آقایان.', tags: ['بدنسازی', 'قدرتی', 'عضله سازی', 'آقایان', 'همه سطوح'], price: 10000000, persianName: 'بدنسازی', persianDescription: 'برنامه تخصصی بدنسازی آقایان با مربیگری آقای کمالی.', persianSchedule: 'هر روز | ۱۸:۰۰–۱۹:۰۰', persianTags: ['بدنسازی', 'قدرتی', 'عضله سازی', 'آقایان', 'همه سطوح']},
    { id: 'm-sauna', name: 'سونا خشک و بخار (آقایان)', coach: '—', schedule: 'شنبه، دوشنبه، پنج‌شنبه', image: 'https://placehold.co/600x400.png', imageHint: 'sauna relaxing', description: 'استفاده از سونا خشک و بخار برای آقایان. رایگان برای ثبت‌نام‌کنندگان در کلاس بدنسازی.', tags: ['سونا', 'ریکاوری', 'آقایان', 'تندرستی'], accessOnly: true, price: 0, persianName: 'سونا خشک و بخار', persianDescription: 'استفاده از سونا خشک و بخار برای آقایان. رایگان برای ثبت‌نام‌کنندگان در کلاس بدنسازی.', persianSchedule: 'شنبه، دوشنبه، پنج‌شنبه', persianTags: ['سونا', 'ریکاوری', 'آقایان', 'تندرستی']},
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
        <p className="text-sm text-foreground mb-3 font-persian text-right">{classItem.description}</p>
        <div className="flex flex-wrap gap-2 justify-start">
          {(classItem.tags).map(tag => <Badge key={tag} variant="secondary" className="font-persian">{tag}</Badge>)}
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

// این مپینگ‌ها برای سازگاری با فیلترهایی است که ممکن است به تگ‌های انگلیسی وابسته باشند.
// در حالت ایده‌آل، اگر همه داده‌ها فارسی باشند، این مپینگ‌ها ساده‌تر می‌شوند یا نیاز به آن‌ها کمتر می‌شود.
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
    const metaKeywords = document.querySelector('meta[name="keywords"]') || document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    metaKeywords.setAttribute('content', 'کلاس های ورزشی سورن, برنامه باشگاه سورن, لیست کلاس های باشگاه, ثبت نام کلاس والیبال, بسکتبال بانوان شیراز, ژیمناستیک آقایان شیراز, بدنسازی حرفه ای, کلاس های رزمی شیراز');
    if (!document.querySelector('meta[name="keywords"]')) {
        document.head.appendChild(metaKeywords);
    }
  }, []);

  const allClassItems = useMemo(() => [...classesData.women, ...classesData.men], []);

  const uniqueSports = useMemo(() => {
    const sports = new Set<string>();
    allClassItems.forEach(item => {
      if (item.accessOnly) return;
      const baseSportName = extractSportFromClassName(item.name); 
      sports.add(baseSportName); 

      item.tags.forEach(tag => { 
        if (Object.values(persianSportMapping).includes(tag) || Object.keys(persianSportMapping).find(key => persianSportMapping[key] === tag) || sports.has(tag)) {
             sports.add(tag); 
        } else if (persianSportMapping[tag]) { // Fallback if tag is English but mapped
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
      item.tags.forEach(tag => { 
        if (Object.values(persianLevelMapping).includes(tag) || Object.keys(persianLevelMapping).find(key => persianLevelMapping[key] === tag) || levels.has(tag)) {
            levels.add(tag); 
        } else if (persianLevelMapping[tag]) { // Fallback if tag is English but mapped
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
                         extractSportFromClassName(item.name) === selectedSport ||
                         item.tags.includes(selectedSport);
      const levelMatch = selectedLevel === 'همه' || item.tags.includes(selectedLevel);
      return (item.accessOnly && (sportMatch || selectedSport === 'همه')) || (sportMatch && levelMatch && !item.accessOnly) ;
    });
  }, [selectedSport, selectedLevel]);

  const filteredMenClasses = useMemo(() => {
    return classesData.men.filter(item => {
      const sportMatch = selectedSport === 'همه' ||
                         extractSportFromClassName(item.name) === selectedSport ||
                         item.tags.includes(selectedSport);
      const levelMatch = selectedLevel === 'همه' || item.tags.includes(selectedLevel);
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


    