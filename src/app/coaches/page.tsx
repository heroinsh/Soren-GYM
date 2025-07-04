
"use client";
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Instagram, Linkedin, Mail, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState, useMemo, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Coach {
  id: string;
  name: string; 
  disciplines: string[]; 
  experience: string; 
  bio: string; 
  image: string;
  imageHint: string;
  gender: 'Male' | 'Female' | 'N/A'; // برای منطق داخلی می‌تواند انگلیسی بماند اگر لازم باشد
  persianDisciplines?: string[]; // این‌ها باید استفاده شوند
  persianExperience?: string;  // این‌ها باید استفاده شوند
  persianBio?: string;         // این‌ها باید استفاده شوند
  persianGender?: 'آقا' | 'خانم' | 'نامشخص';
  social?: {
    instagram?: string;
    linkedin?: string;
    email?: string;
  };
}

const coachesData: Coach[] = [
  { id: 'c_bahramzadeh', name: 'بهرام‌زاده', disciplines: ['والیبال (بانوان)'], experience: '+۱۰ سال', bio: 'مشتاق توانمندسازی ورزشکاران زن در والیبال، با تمرکز بر مهارت، کار تیمی و استراتژی رقابتی.', image: 'https://placehold.co/400x400.png', imageHint: 'female coach volleyball', gender: 'Female', social: { instagram: '#', linkedin: '#' }, persianDisciplines: ['والیبال (بانوان)'], persianExperience: '+۱۰ سال', persianBio: 'مشتاق توانمندسازی ورزشکاران زن در والیبال، با تمرکز بر مهارت، کار تیمی و استراتژی رقابتی.' , persianGender: 'خانم'},
  { id: 'c_chamanfar', name: 'چمن‌فر', disciplines: ['والیبال (بانوان)'], experience: '+۸ سال', bio: 'متخصص در تکنیک‌های پیشرفته والیبال و استراتژی رقابتی برای بانوان. متعهد به توسعه بازیکنان.', image: 'https://placehold.co/400x400.png', imageHint: 'woman coach sport', gender: 'Female', social: { instagram: '#'}, persianDisciplines: ['والیبال (بانوان)'], persianExperience: '+۸ سال', persianBio: 'متخصص در تکنیک‌های پیشرفته والیبال و استراتژی رقابتی برای بانوان. متعهد به توسعه بازیکنان.', persianGender: 'خانم' },
  { id: 'c_alavi', name: 'علوی', disciplines: ['بسکتبال (بانوان)'], experience: '+۷ سال', bio: 'همراه با مربی آقاجری، برنامه بسکتبال بانوان را هدایت می‌کند و بر توسعه استعدادهای جوان و پرورش عشق به بازی تمرکز دارد.', image: 'https://placehold.co/400x400.png', imageHint: 'basketball female coach', gender: 'Female', social: {}, persianDisciplines: ['بسکتبال (بانوان)'], persianExperience: '+۷ سال', persianBio: 'همراه با مربی آقاجری، برنامه بسکتبال بانوان را هدایت می‌کند و بر توسعه استعدادهای جوان و پرورش عشق به بازی تمرکز دارد.', persianGender: 'خانم' },
  { id: 'c_aghajeri', name: 'آقاجری', disciplines: ['بسکتبال (بانوان)'], experience: '+۹ سال', bio: 'به همراه مربی علوی، بسکتبال بانوان را هدایت می‌کند، با تاکید بر مهارت‌های پایه‌ای و هوش بازی.', image: 'https://placehold.co/400x400.png', imageHint: 'coach profile woman', gender: 'Female', social: { linkedin: '#'}, persianDisciplines: ['بسکتبال (بانوان)'], persianExperience: '+۹ سال', persianBio: 'به همراه مربی علوی، بسکتبال بانوان را هدایت می‌کند، با تاکید بر مهارت‌های پایه‌ای و هوش بازی.', persianGender: 'خانم' },
  { id: 'c_setayeshrahman', name: 'رحمان ستایش', disciplines: ['ژیمناستیک (بانوان)'], experience: '+۱۲ سال', bio: 'ژیمناست سابق تیم ملی، اکنون با تخصص و اشتیاق خود الهام‌بخش نسل بعدی ژیمناست‌های زن است.', image: 'https://placehold.co/400x400.png', imageHint: 'gymnastics female trainer', gender: 'Female', social: { instagram: '#', email: 'setayesh.r@sorenathletics.com'}, persianDisciplines: ['ژیمناستیک (بانوان)'], persianExperience: '+۱۲ سال', persianBio: 'ژیمناست سابق تیم ملی، اکنون با تخصص و اشتیاق خود الهام‌بخش نسل بعدی ژیمناست‌های زن است.', persianGender: 'خانم' },
  { id: 'c_gholami', name: 'غلامی', disciplines: ['زومبا (بانوان)'], experience: '+۶ سال', bio: 'مربی زومبای پرانرژی و دارای گواهینامه، تناسب اندام را برای همه بانوان سرگرم‌کننده و در دسترس می‌کند.', image: 'https://placehold.co/400x400.png', imageHint: 'female zumba instructor', gender: 'Female', social: { instagram: '#' }, persianDisciplines: ['زومبا (بانوان)'], persianExperience: '+۶ سال', persianBio: 'مربی زومبای پرانرژی و دارای گواهینامه، تناسب اندام را برای همه بانوان سرگرم‌کننده و در دسترس می‌کند.', persianGender: 'خانم' },
  { id: 'c_abbasi', name: 'عباسی', disciplines: ['ایروبیک', 'فانکشنال فیتنس (بانوان)'], experience: '+۷ سال', bio: 'کارشناس تناسب اندام چندمنظوره، جلسات جذاب ایروبیک و فانکشنال فیتنس موثر برای بانوان را هدایت می‌کند.', image: 'https://placehold.co/400x400.png', imageHint: 'female fitness coach', gender: 'Female', social: { email: 'abbasi.f@sorenathletics.com'}, persianDisciplines: ['ایروبیک', 'فانکشنال فیتنس (بانوان)'], persianExperience: '+۷ سال', persianBio: 'کارشناس تناسب اندام چندمنظوره، جلسات جذاب ایروبیک و فانکشنال فیتنس موثر برای بانوان را هدایت می‌کند.', persianGender: 'خانم' },
  { id: 'c_mahdavi', name: 'مهدوی', disciplines: ['پکیج فیتنس (بانوان)'], experience: '+۵ سال', bio: 'متعهد به کمک به بانوان برای دستیابی به اهداف تناسب اندامشان از طریق پکیج‌های فیتنس شخصی‌سازی شده و جامع.', image: 'https://placehold.co/400x400.png', imageHint: 'female personal trainer', gender: 'Female', social: {}, persianDisciplines: ['پکیج فیتنس (بانوان)'], persianExperience: '+۵ سال', persianBio: 'متعهد به کمک به بانوان برای دستیابی به اهداف تناسب اندامشان از طریق پکیج‌های فیتنس شخصی‌سازی شده و جامع.', persianGender: 'خانم' },
  { id: 'c_mohajer', name: 'مهاجر', disciplines: ['تی‌آر‌ایکس (بانوان)', 'بدنسازی (بانوان)'], experience: '+۸ سال', bio: 'متخصص در TRX و بدنسازی بانوان، به مراجعین کمک می‌کند تا قدرت، پایداری و فرم بدنی ایده‌آل خود را بسازند.', image: 'https://placehold.co/400x400.png', imageHint: 'female strength coach', gender: 'Female', social: { linkedin: '#' }, persianDisciplines: ['تی‌آر‌ایکس (بانوان)', 'بدنسازی (بانوان)'], persianExperience: '+۸ سال', persianBio: 'متخصص در TRX و بدنسازی بانوان، به مراجعین کمک می‌کند تا قدرت، پایداری و فرم بدنی ایده‌آل خود را بسازند.', persianGender: 'خانم' },
  { id: 'c_khaksar', name: 'خاکسار', disciplines: ['بدنسازی (بانوان)'], experience: '+۶ سال', bio: 'همراه با مربی مهاجر، برنامه بدنسازی بانوان را هدایت می‌کند و به توسعه فیزیک بدنی و تمرینات قدرتی علاقه‌مند است.', image: 'https://placehold.co/400x400.png', imageHint: 'female bodybuilding coach', gender: 'Female', social: {}, persianDisciplines: ['بدنسازی (بانوان)'], persianExperience: '+۶ سال', persianBio: 'همراه با مربی مهاجر، برنامه بدنسازی بانوان را هدایت می‌کند و به توسعه فیزیک بدنی و تمرینات قدرتی علاقه‌مند است.', persianGender: 'خانم' },
  { id: 'c_rahmani', name: 'رحمانی', disciplines: ['بسکتبال (آقایان و جوانان)'], experience: '+۱۵ سال', bio: 'بازیکن سابق حرفه‌ای با اشتیاق به مربیگری بسکتبال آقایان و جوانان، از مبتدی تا سطوح پیشرفته.', image: 'https://placehold.co/400x400.png', imageHint: 'male basketball coach', gender: 'Male', social: { linkedin: '#', email: 'rahmani.b@sorenathletics.com'}, persianDisciplines: ['بسکتبال (آقایان و جوانان)'], persianExperience: '+۱۵ سال', persianBio: 'بازیکن سابق حرفه‌ای با اشتیاق به مربیگری بسکتبال آقایان و جوانان، از مبتدی تا سطوح پیشرفته.', persianGender: 'آقا' },
  { id: 'c_ghodousi', name: 'قدوسی', disciplines: ['والیبال (آقایان)'], experience: '+۹ سال', bio: 'متعهد به والیبال آقایان، بر تسلط بر مهارت، استراتژی تیمی و تعالی رقابتی تمرکز دارد.', image: 'https://placehold.co/400x400.png', imageHint: 'male volleyball coach', gender: 'Male', social: {}, persianDisciplines: ['والیبال (آقایان)'], persianExperience: '+۹ سال', persianBio: 'متعهد به والیبال آقایان، بر تسلط بر مهارت، استراتژی تیمی و تعالی رقابتی تمرکز دارد.', persianGender: 'آقا' },
  { id: 'c_amini', name: 'امینی', disciplines: ['کونگ‌فو'], experience: '+۲۰ سال', bio: 'استاد بزرگ کونگ‌فو، آموزش تکنیک‌های سنتی، فلسفه و انضباط شخصی به شاگردان در تمام سنین.', image: 'https://placehold.co/400x400.png', imageHint: 'martial arts grandmaster', gender: 'Male', social: {}, persianDisciplines: ['کونگ‌فو'], persianExperience: '+۲۰ سال', persianBio: 'استاد بزرگ کونگ‌فو، آموزش تکنیک‌های سنتی، فلسفه و انضباط شخصی به شاگردان در تمام سنین.', persianGender: 'آقا' },
  { id: 'c_nadimi', name: 'ندیمی', disciplines: ['ژیمناستیک (آقایان)'], experience: '+۱۰ سال', bio: 'با تجربه در ژیمناستیک هنری مردان، به ورزشکاران کمک می‌کند تا قدرت، چابکی و کنترل استثنایی کسب کنند.', image: 'https://placehold.co/400x400.png', imageHint: 'male gymnastics coach', gender: 'Male', social: { instagram: '#' }, persianDisciplines: ['ژیمناستیک (آقایان)'], persianExperience: '+۱۰ سال', persianBio: 'با تجربه در ژیمناستیک هنری مردان، به ورزشکاران کمک می‌کند تا قدرت، چابکی و کنترل استثنایی کسب کنند.', persianGender: 'آقا' },
  { id: 'c_hosseini', name: 'حسینی', disciplines: ['کاراته'], experience: '+۱۲ سال', bio: 'مربی باتجربه کاراته، تکنیک‌های سنتی، انضباط و مهارت‌های دفاع شخصی را آموزش می‌دهد.', image: 'https://placehold.co/400x400.png', imageHint: 'karate sensei', gender: 'Male', social: { email: 'hosseini.k@sorenathletics.com' }, persianDisciplines: ['کاراته'], persianExperience: '+۱۲ سال', persianBio: 'مربی باتجربه کاراته، تکنیک‌های سنتی، انضباط و مهارت‌های دفاع شخصی را آموزش می‌دهد.', persianGender: 'آقا' },
  { id: 'c_kamali', name: 'کمالی', disciplines: ['بدنسازی (آقایان)'], experience: '+۱۰ سال', bio: 'متخصص در بدنسازی آقایان، برنامه‌های فشرده‌ای برای رشد عضلانی، تفکیک و آمادگی جسمانی بهینه طراحی می‌کند.', image: 'https://placehold.co/400x400.png', imageHint: 'male bodybuilding trainer', gender: 'Male', social: { linkedin: '#' }, persianDisciplines: ['بدنسازی (آقایان)'], persianExperience: '+۱۰ سال', persianBio: 'متخصص در بدنسازی آقایان، برنامه‌های فشرده‌ای برای رشد عضلانی، تفکیک و آمادگی جسمانی بهینه طراحی می‌کند.', persianGender: 'آقا' },
];

const genderMap: Record<Coach['gender'], Coach['persianGender']> = {
    'Male': 'آقا',
    'Female': 'خانم',
    'N/A': 'نامشخص'
};
// اگر لازم است که فیلترها بر اساس نام‌های انگلیسی رشته‌ها کار کنند، این مپینگ می‌تواند مفید باشد.
// اما با توجه به اینکه داده‌های اصلی فارسی می‌شوند، شاید مستقیم از نام‌های فارسی استفاده شود.
const disciplinePersianMapping: Record<string, string> = {
    'Volleyball (Ladies)': 'والیبال (بانوان)',
    'Basketball (Ladies)': 'بسکتبال (بانوان)',
    'Gymnastics (Ladies)': 'ژیمناستیک (بانوان)',
    'Zumba (Ladies)': 'زومبا (بانوان)',
    'Aerobics': 'ایروبیک',
    'Functional Fitness (Ladies)': 'فانکشنال فیتنس (بانوان)',
    'Fitness Package (Ladies)': 'پکیج فیتنس (بانوان)',
    'TRX (Ladies)': 'تی‌آر‌ایکس (بانوان)',
    'Bodybuilding (Ladies)': 'بدنسازی (بانوان)',
    'Basketball (Men & Youth)': 'بسکتبال (آقایان و جوانان)',
    'Volleyball (Men)': 'والیبال (آقایان)',
    'Kung Fu': 'کونگ‌فو',
    'Gymnastics (Men)': 'ژیمناستیک (آقایان)',
    'Karate': 'کاراته',
    'Bodybuilding (Men)': 'بدنسازی (آقایان)',
};

const CoachCard = ({ coach }: { coach: Coach }) => (
  <Card className="overflow-hidden flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card text-right">
    <div className="relative w-full aspect-square">
      <Image src={coach.image} alt={coach.name} layout="fill" objectFit="cover" data-ai-hint={coach.imageHint} />
    </div>
    <CardHeader className="text-center">
      <CardTitle className="font-headline text-2xl text-primary">{coach.name}</CardTitle>
      <CardDescription className="text-muted-foreground font-persian">{coach.experience} سابقه</CardDescription>
    </CardHeader>
    <CardContent className="flex-grow text-center">
      <div className="mb-2">
        {(coach.disciplines).map(disc => <Badge key={disc} className="ms-1 mb-1 bg-primary/10 text-primary hover:bg-primary/20 font-persian">{disc}</Badge>)}
      </div>
      <p className="text-sm text-foreground mb-3 font-persian">{coach.bio}</p>
    </CardContent>
    <CardFooter className="justify-center space-x-3 space-x-reverse p-4 border-t">
      {coach.social?.instagram && <a href={coach.social.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${coach.name} در اینستاگرام`} className="text-muted-foreground hover:text-primary"><Instagram /></a>}
      {coach.social?.linkedin && <a href={coach.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${coach.name} در لینکدین`} className="text-muted-foreground hover:text-primary"><Linkedin /></a>}
      {coach.social?.email && <a href={`mailto:${coach.social.email}`} aria-label={`ایمیل به ${coach.name}`} className="text-muted-foreground hover:text-primary"><Mail /></a>}
      {!coach.social?.instagram && !coach.social?.linkedin && !coach.social?.email && <p className="text-xs text-muted-foreground font-persian">اطلاعات تماس در پذیرش موجود است.</p>}
    </CardFooter>
  </Card>
);

export default function CoachesPage() {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('همه');
  const [selectedGender, setSelectedGender] = useState<string>('همه');

  useEffect(() => {
    document.title = "مربیان باشگاه | باشگاه ورزشی سورن";
    const metaDesc = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    metaDesc.setAttribute('content', 'با تیم مربیان حرفه‌ای و مجرب باشگاه ورزشی سورن آشنا شوید. تخصص‌ها، سوابق و اطلاعات تماس مربیان والیبال، بسکتبال، بدنسازی و سایر رشته‌ها.');
    if (!document.querySelector('meta[name="description"]')) {
        document.head.appendChild(metaDesc);
    }
    const metaKeywords = document.querySelector('meta[name="keywords"]') || document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    metaKeywords.setAttribute('content', 'مربیان باشگاه سورن, لیست مربیان ورزشی شیراز, مربی والیبال, مربی بسکتبال, مربی بدنسازی, مربی ژیمناستیک, مربی کاراته, مربی کونگ فو');
    if (!document.querySelector('meta[name="keywords"]')) {
        document.head.appendChild(metaKeywords);
    }
  }, []);

  const uniqueDisciplines = useMemo(() => {
    const disciplines = new Set<string>();
    coachesData.forEach(coach => (coach.disciplines).forEach(disc => disciplines.add(disc)));
    return ['همه', ...Array.from(disciplines).sort((a, b) => a.localeCompare(b, 'fa'))];
  }, []);

  const uniqueGenders = useMemo(() => {
    const genders = new Set<Coach['persianGender']>();
    coachesData.forEach(coach => genders.add(coach.persianGender || genderMap[coach.gender]));
    const sortedGenders = Array.from(genders).filter(g => g && g !== 'نامشخص').sort((a,b) => (a === 'خانم' ? -1 : (b === 'خانم' ? 1 : 0))); // خانم اول، بعد آقا
    if (genders.has('نامشخص')) sortedGenders.push('نامشخص');
    return ['همه', ...sortedGenders.filter(Boolean) as string[]];
  }, []);

  const filteredCoaches = useMemo(() => {
    return coachesData.filter(coach => {
      const disciplineMatch = selectedDiscipline === 'همه' || (coach.disciplines).includes(selectedDiscipline);
      const genderMatch = selectedGender === 'همه' || (coach.persianGender || genderMap[coach.gender]) === selectedGender;
      return disciplineMatch && genderMatch;
    });
  }, [selectedDiscipline, selectedGender]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32 md:pt-40 bg-background font-persian">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold font-headline mb-4 text-primary">با مربیان ما آشنا شوید</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          تیم مربیان حرفه‌ای ما متعهد به کمک به شما برای دستیابی به پتانسیل ورزشی‌تان هستند.
        </p>
      </header>

      <div className="mb-12 p-6 bg-card rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-4 font-headline text-primary flex items-center"><Filter className="ms-2 h-5 w-5"/>فیلتر مربیان</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex-grow md:flex-grow-0">
            <label htmlFor="discipline-filter" className="block text-sm font-medium text-foreground mb-1">رشته</label>
            <Select value={selectedDiscipline} onValueChange={setSelectedDiscipline} dir="rtl">
              <SelectTrigger id="discipline-filter" className="w-full md:w-[200px]" aria-label="فیلتر بر اساس رشته">
                <SelectValue placeholder="انتخاب رشته" />
              </SelectTrigger>
              <SelectContent>
                {uniqueDisciplines.map(discipline => (
                  <SelectItem key={discipline} value={discipline}>{discipline}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-grow md:flex-grow-0">
            <label htmlFor="gender-filter" className="block text-sm font-medium text-foreground mb-1">جنسیت</label>
            <Select value={selectedGender} onValueChange={setSelectedGender} dir="rtl">
              <SelectTrigger id="gender-filter" className="w-full md:w-[200px]" aria-label="فیلتر بر اساس جنسیت">
                <SelectValue placeholder="انتخاب جنسیت" />
              </SelectTrigger>
              <SelectContent>
                {uniqueGenders.map(gender => (
                  <SelectItem key={gender} value={gender}>{gender}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {filteredCoaches.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCoaches.map(coach => <CoachCard key={coach.id} coach={coach} />)}
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-8">مربی با فیلترهای فعلی مطابقت ندارد. لطفا فیلترها را تغییر دهید.</p>
      )}
    </div>
  );
}


    