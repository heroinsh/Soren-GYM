
"use client";
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Instagram, Linkedin, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState, useMemo, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Coach {
  id: string;
  name: string; // This is already Persian from user data
  disciplines: string[]; // English in data, will be translated for display
  experience: string; // English in data, will be translated
  bio: string; // English in data, will be translated
  image: string;
  imageHint: string;
  gender: 'Male' | 'Female' | 'N/A'; // Will map to Persian
  persianDisciplines?: string[];
  persianExperience?: string;
  persianBio?: string;
  persianGender?: 'آقا' | 'خانم' | 'نامشخص';
  social?: {
    instagram?: string;
    linkedin?: string;
    email?: string;
  };
}

// Data remains mostly English for IDs and underlying structure, translations are added for display
const coachesData: Coach[] = [
  { id: 'c_bahramzadeh', name: 'بهرام‌زاده', disciplines: ['Volleyball (Ladies)'], experience: '10+ Years', bio: 'Passionate about empowering female athletes in volleyball, focusing on skill, teamwork, and competitive strategy.', image: 'https://placehold.co/400x400.png', imageHint: 'female coach volleyball', gender: 'Female', social: { instagram: '#', linkedin: '#' }, persianDisciplines: ['والیبال (بانوان)'], persianExperience: '+۱۰ سال', persianBio: 'مشتاق توانمندسازی ورزشکاران زن در والیبال، با تمرکز بر مهارت، کار تیمی و استراتژی رقابتی.' , persianGender: 'خانم'},
  { id: 'c_chamanfar', name: 'چمن‌فر', disciplines: ['Volleyball (Ladies)'], experience: '8+ Years', bio: 'Specializes in advanced volleyball techniques and competitive strategy for women. Dedicated to player development.', image: 'https://placehold.co/400x400.png', imageHint: 'woman coach sport', gender: 'Female', social: { instagram: '#'}, persianDisciplines: ['والیبال (بانوان)'], persianExperience: '+۸ سال', persianBio: 'متخصص در تکنیک‌های پیشرفته والیبال و استراتژی رقابتی برای بانوان. متعهد به توسعه بازیکنان.', persianGender: 'خانم' },
  { id: 'c_alavi', name: 'علوی', disciplines: ['Basketball (Ladies)'], experience: '7+ Years', bio: 'Co-leading the ladies\' basketball program, Coach Alavi focuses on developing young talent and fostering a love for the game.', image: 'https://placehold.co/400x400.png', imageHint: 'basketball female coach', gender: 'Female', social: {}, persianDisciplines: ['بسکتبال (بانوان)'], persianExperience: '+۷ سال', persianBio: 'همراه با مربی آقاجری، برنامه بسکتبال بانوان را هدایت می‌کند و بر توسعه استعدادهای جوان و پرورش عشق به بازی تمرکز دارد.', persianGender: 'خانم' },
  { id: 'c_aghajeri', name: 'آقاجری', disciplines: ['Basketball (Ladies)'], experience: '9+ Years', bio: 'With Coach Alavi, Aghajeri leads ladies\' basketball, emphasizing fundamental skills and game intelligence.', image: 'https://placehold.co/400x400.png', imageHint: 'coach profile woman', gender: 'Female', social: { linkedin: '#'}, persianDisciplines: ['بسکتبال (بانوان)'], persianExperience: '+۹ سال', persianBio: 'به همراه مربی علوی، بسکتبال بانوان را هدایت می‌کند، با تاکید بر مهارت‌های پایه‌ای و هوش بازی.', persianGender: 'خانم' },
  { id: 'c_setayeshrahman', name: 'رحمان ستایش', disciplines: ['Gymnastics (Ladies)'], experience: '12+ Years', bio: 'Former national gymnast, now inspiring the next generation of female gymnasts with her expertise and passion.', image: 'https://placehold.co/400x400.png', imageHint: 'gymnastics female trainer', gender: 'Female', social: { instagram: '#', email: 'setayesh.r@sorenathletics.com'}, persianDisciplines: ['ژیمناستیک (بانوان)'], persianExperience: '+۱۲ سال', persianBio: 'ژیمناست سابق تیم ملی، اکنون با تخصص و اشتیاق خود الهام‌بخش نسل بعدی ژیمناست‌های زن است.', persianGender: 'خانم' },
  { id: 'c_gholami', name: 'غلامی', disciplines: ['Zumba (Ladies)'], experience: '6+ Years', bio: 'An energetic and certified Zumba instructor, Coach Gholami makes fitness fun and accessible for all ladies.', image: 'https://placehold.co/400x400.png', imageHint: 'female zumba instructor', gender: 'Female', social: { instagram: '#' }, persianDisciplines: ['زومبا (بانوان)'], persianExperience: '+۶ سال', persianBio: 'مربی زومبای پرانرژی و دارای گواهینامه، تناسب اندام را برای همه بانوان سرگرم‌کننده و در دسترس می‌کند.', persianGender: 'خانم' },
  { id: 'c_abbasi', name: 'عباسی', disciplines: ['Aerobics', 'Functional Fitness (Ladies)'], experience: '7+ Years', bio: 'Coach Abbasi is a versatile fitness expert, leading engaging Aerobics and effective Functional Fitness sessions for ladies.', image: 'https://placehold.co/400x400.png', imageHint: 'female fitness coach', gender: 'Female', social: { email: 'abbasi.f@sorenathletics.com'}, persianDisciplines: ['ایروبیک', 'فانکشنال فیتنس (بانوان)'], persianExperience: '+۷ سال', persianBio: 'کارشناس تناسب اندام چندمنظوره، جلسات جذاب ایروبیک و فانکشنال فیتنس موثر برای بانوان را هدایت می‌کند.', persianGender: 'خانم' },
  { id: 'c_mahdavi', name: 'مهدوی', disciplines: ['Fitness Package (Ladies)'], experience: '5+ Years', bio: 'Dedicated to helping ladies achieve their fitness goals through personalized and comprehensive fitness packages.', image: 'https://placehold.co/400x400.png', imageHint: 'female personal trainer', gender: 'Female', social: {}, persianDisciplines: ['پکیج فیتنس (بانوان)'], persianExperience: '+۵ سال', persianBio: 'متعهد به کمک به بانوان برای دستیابی به اهداف تناسب اندامشان از طریق پکیج‌های فیتنس شخصی‌سازی شده و جامع.', persianGender: 'خانم' },
  { id: 'c_mohajer', name: 'مهاجر', disciplines: ['TRX (Ladies)', 'Bodybuilding (Ladies)'], experience: '8+ Years', bio: 'Expert in TRX and ladies\' bodybuilding, Coach Mohajer helps clients build strength, stability, and sculpt their ideal physique.', image: 'https://placehold.co/400x400.png', imageHint: 'female strength coach', gender: 'Female', social: { linkedin: '#' }, persianDisciplines: ['تی‌آر‌ایکس (بانوان)', 'بدنسازی (بانوان)'], persianExperience: '+۸ سال', persianBio: 'متخصص در TRX و بدنسازی بانوان، به مراجعین کمک می‌کند تا قدرت، پایداری و فرم بدنی ایده‌آل خود را بسازند.', persianGender: 'خانم' },
  { id: 'c_khaksar', name: 'خاکسار', disciplines: ['Bodybuilding (Ladies)'], experience: '6+ Years', bio: 'Co-leading the ladies\' bodybuilding program, Coach Khaksar is passionate about physique development and strength training.', image: 'https://placehold.co/400x400.png', imageHint: 'female bodybuilding coach', gender: 'Female', social: {}, persianDisciplines: ['بدنسازی (بانوان)'], persianExperience: '+۶ سال', persianBio: 'همراه با مربی مهاجر، برنامه بدنسازی بانوان را هدایت می‌کند و به توسعه فیزیک بدنی و تمرینات قدرتی علاقه‌مند است.', persianGender: 'خانم' },
  { id: 'c_rahmani', name: 'رحمانی', disciplines: ['Basketball (Men & Youth)'], experience: '15+ Years', bio: 'Ex-professional player with a passion for coaching men\'s and youth basketball, from beginners to advanced levels.', image: 'https://placehold.co/400x400.png', imageHint: 'male basketball coach', gender: 'Male', social: { linkedin: '#', email: 'rahmani.b@sorenathletics.com'}, persianDisciplines: ['بسکتبال (آقایان و جوانان)'], persianExperience: '+۱۵ سال', persianBio: 'بازیکن سابق حرفه‌ای با اشتیاق به مربیگری بسکتبال آقایان و جوانان، از مبتدی تا سطوح پیشرفته.', persianGender: 'آقا' },
  { id: 'c_ghodousi', name: 'قدوسی', disciplines: ['Volleyball (Men)'], experience: '9+ Years', bio: 'Dedicated to men\'s volleyball, Coach Ghodousi focuses on skill mastery, team strategy, and competitive excellence.', image: 'https://placehold.co/400x400.png', imageHint: 'male volleyball coach', gender: 'Male', social: {}, persianDisciplines: ['والیبال (آقایان)'], persianExperience: '+۹ سال', persianBio: 'متعهد به والیبال آقایان، بر تسلط بر مهارت، استراتژی تیمی و تعالی رقابتی تمرکز دارد.', persianGender: 'آقا' },
  { id: 'c_amini', name: 'امینی', disciplines: ['Kung Fu'], experience: '20+ Years', bio: 'Grandmaster in Kung Fu, teaching traditional techniques, philosophy, and self-discipline to students of all ages.', image: 'https://placehold.co/400x400.png', imageHint: 'martial arts grandmaster', gender: 'Male', social: {}, persianDisciplines: ['کونگ‌فو'], persianExperience: '+۲۰ سال', persianBio: 'استاد بزرگ کونگ‌فو، آموزش تکنیک‌های سنتی، فلسفه و انضباط شخصی به شاگردان در تمام سنین.', persianGender: 'آقا' },
  { id: 'c_nadimi', name: 'ندیمی', disciplines: ['Gymnastics (Men)'], experience: '10+ Years', bio: 'Experienced in men\'s artistic gymnastics, Coach Nadimi helps athletes build exceptional strength, agility, and control.', image: 'https://placehold.co/400x400.png', imageHint: 'male gymnastics coach', gender: 'Male', social: { instagram: '#' }, persianDisciplines: ['ژیمناستیک (آقایان)'], persianExperience: '+۱۰ سال', persianBio: 'با تجربه در ژیمناستیک هنری مردان، به ورزشکاران کمک می‌کند تا قدرت، چابکی و کنترل استثنایی کسب کنند.', persianGender: 'آقا' },
  { id: 'c_hosseini', name: 'حسینی', disciplines: ['Karate'], experience: '12+ Years', bio: 'A seasoned Karate instructor, Coach Hosseini imparts traditional techniques, discipline, and self-defense skills.', image: 'https://placehold.co/400x400.png', imageHint: 'karate sensei', gender: 'Male', social: { email: 'hosseini.k@sorenathletics.com' }, persianDisciplines: ['کاراته'], persianExperience: '+۱۲ سال', persianBio: 'مربی باتجربه کاراته، تکنیک‌های سنتی، انضباط و مهارت‌های دفاع شخصی را آموزش می‌دهد.', persianGender: 'آقا' },
  { id: 'c_kamali', name: 'کمالی', disciplines: ['Bodybuilding (Men)'], experience: '10+ Years', bio: 'Expert in men\'s bodybuilding, Coach Kamali designs intensive programs for muscle growth, definition, and peak physical condition.', image: 'https://placehold.co/400x400.png', imageHint: 'male bodybuilding trainer', gender: 'Male', social: { linkedin: '#' }, persianDisciplines: ['بدنسازی (آقایان)'], persianExperience: '+۱۰ سال', persianBio: 'متخصص در بدنسازی آقایان، برنامه‌های فشرده‌ای برای رشد عضلانی، تفکیک و آمادگی جسمانی بهینه طراحی می‌کند.', persianGender: 'آقا' },
];


const genderMap: Record<Coach['gender'], Coach['persianGender']> = {
    'Male': 'آقا',
    'Female': 'خانم',
    'N/A': 'نامشخص'
};
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
      <CardDescription className="text-muted-foreground font-persian">{coach.persianExperience || coach.experience} سابقه</CardDescription>
    </CardHeader>
    <CardContent className="flex-grow text-center">
      <div className="mb-2">
        {(coach.persianDisciplines || coach.disciplines.map(d => disciplinePersianMapping[d] || d)).map(disc => <Badge key={disc} className="ms-1 mb-1 bg-primary/10 text-primary hover:bg-primary/20 font-persian">{disc}</Badge>)}
      </div>
      <p className="text-sm text-foreground mb-3 font-persian">{coach.persianBio || coach.bio}</p>
    </CardContent>
    <CardFooter className="justify-center space-x-3 space-x-reverse p-4 border-t"> {/* space-x-reverse for RTL */}
      {coach.social?.instagram && <a href={coach.social.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${coach.name} در اینستاگرام`} className="text-muted-foreground hover:text-primary"><Instagram /></a>}
      {coach.social?.linkedin && <a href={coach.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${coach.name} در لینکدین`} className="text-muted-foreground hover:text-primary"><Linkedin /></a>}
      {coach.social?.email && <a href={`mailto:${coach.social.email}`} aria-label={`ایمیل ${coach.name}`} className="text-muted-foreground hover:text-primary"><Mail /></a>}
      {!coach.social?.instagram && !coach.social?.linkedin && !coach.social?.email && <p className="text-xs text-muted-foreground font-persian">اطلاعات تماس در پذیرش موجود است.</p>}
    </CardFooter>
  </Card>
);

export default function CoachesPage() {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('All');
  const [selectedGender, setSelectedGender] = useState<string>('All');

  useEffect(() => {
    document.title = "مربیان باشگاه | باشگاه ورزشی سورن";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "با تیم مربیان حرفه‌ای و مجرب باشگاه ورزشی سورن آشنا شوید. تخصص‌ها، سوابق و اطلاعات تماس مربیان والیبال، بسکتبال، بدنسازی و سایر رشته‌ها.");
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = "description";
      newMeta.content = "با تیم مربیان حرفه‌ای و مجرب باشگاه ورزشی سورن آشنا شوید. تخصص‌ها، سوابق و اطلاعات تماس مربیان والیبال، بسکتبال، بدنسازی و سایر رشته‌ها.";
      document.head.appendChild(newMeta);
    }
  }, []);

  const uniqueDisciplines = useMemo(() => {
    const disciplines = new Set<string>();
    coachesData.forEach(coach => (coach.persianDisciplines || coach.disciplines.map(d => disciplinePersianMapping[d] || d)).forEach(disc => disciplines.add(disc)));
    return ['همه', ...Array.from(disciplines).sort((a, b) => a.localeCompare(b, 'fa'))];
  }, []);

  const uniqueGenders = useMemo(() => {
    const genders = new Set<Coach['persianGender']>();
    coachesData.forEach(coach => genders.add(coach.persianGender || genderMap[coach.gender]));
    const sortedGenders = Array.from(genders).filter(g => g !== 'نامشخص').sort((a,b) => (a === 'خانم' ? -1 : 1)); // خانم اول، بعد آقا
    if (genders.has('نامشخص')) sortedGenders.push('نامشخص');
    return ['همه', ...sortedGenders];
  }, []);

  const filteredCoaches = useMemo(() => {
    return coachesData.filter(coach => {
      const disciplineMatch = selectedDiscipline === 'همه' || (coach.persianDisciplines || coach.disciplines.map(d => disciplinePersianMapping[d] || d)).includes(selectedDiscipline);
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
        <h3 className="text-2xl font-semibold mb-4 font-headline text-primary">فیلتر مربیان</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex-grow md:flex-grow-0">
            <label htmlFor="discipline-filter" className="block text-sm font-medium text-foreground mb-1">رشته</label>
            <Select value={selectedDiscipline} onValueChange={setSelectedDiscipline} dir="rtl">
              <SelectTrigger id="discipline-filter" className="w-full md:w-[200px]">
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
              <SelectTrigger id="gender-filter" className="w-full md:w-[200px]">
                <SelectValue placeholder="انتخاب جنسیت" />
              </SelectTrigger>
              <SelectContent>
                {uniqueGenders.map(gender => (
                  <SelectItem key={gender} value={gender}>{gender}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button variant="outline">مرتب‌سازی: ویژه</Button>
          </div>
        </div>
      </div>
      
      {filteredCoaches.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCoaches.map(coach => <CoachCard key={coach.id} coach={coach} />)}
        </div>
      ) : (
        <p className="text-muted-foreground text-center">مربی با فیلترهای فعلی مطابقت ندارد.</p>
      )}
    </div>
  );
}
