import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Award, 
  ChevronRight,
  Menu,
  X,
  Languages,
  Moon,
  Sun,
  Download,
  Briefcase,
  User,
  Layers,
  CheckCircle2,
  Send,
  MessageCircle,
  Facebook
} from 'lucide-react';
import { cn } from './lib/utils';

type Language = 'en' | 'ar';
type Theme = 'light' | 'dark';

interface Project {
  id: number;
  title: { en: string; ar: string };
  category: { en: string; ar: string };
  image: string;
  description: { en: string; ar: string };
}

interface Skill {
  name: string;
  level: number;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: { en: "Study Area - Internet Packages", ar: "ستادي أريا - باقات الإنترنت" },
    category: { en: "Social Media Design", ar: "تصميم سوشيال ميديا" },
    image: "https://picsum.photos/seed/studyarea/800/800",
    description: { 
      en: "A vibrant social media post for 'Study Area' featuring hourly internet rates (10, 20, 30 EGP) with a modern yellow and blue aesthetic.",
      ar: "بوست سوشيال ميديا حيوي لـ 'ستادي أريا' يعرض أسعار باقات الإنترنت (10، 20، 30 جنيه) بتصميم عصري يجمع بين الأصفر والأزرق."
    }
  },
  {
    id: 2,
    title: { en: "Social Media Growth Packages", ar: "عروض زيادة متابعين السوشيال ميديا" },
    category: { en: "Social Media Design", ar: "تصميم سوشيال ميديا" },
    image: "https://picsum.photos/seed/socialoffers/800/800",
    description: { 
      en: "A professional gold-themed promotional post for social media services, showcasing 'Start', 'Rise', and 'Influence' packages.",
      ar: "بوست ترويجي احترافي بطابع ذهبي لخدمات السوشيال ميديا، يعرض باقات 'البداية'، 'الصعود'، و'النفوذ'."
    }
  },
  {
    id: 3,
    title: { en: "Everest Store - Robux Offers", ar: "متجر إيفرست - عروض روبوكس" },
    category: { en: "Social Media Design", ar: "تصميم سوشيال ميديا" },
    image: "https://picsum.photos/seed/everestrobux/800/800",
    description: { 
      en: "A gaming-inspired dark theme design for Everest Store, featuring Robux currency offers starting from 50 EGP.",
      ar: "تصميم بطابع ألعاب غامق لمتجر إيفرست، يعرض عروض عملة الروبوكس بأسعار تبدأ من 50 جنيه."
    }
  },
  {
    id: 4,
    title: { en: "Visual Identity & Ads", ar: "الهوية البصرية والإعلانات" },
    category: { en: "Creative Direction", ar: "إخراج إبداعي" },
    image: "https://picsum.photos/seed/creativead/800/800",
    description: { 
      en: "Strategic advertising content designed to maximize brand visibility and user engagement across digital platforms.",
      ar: "محتوى إعلاني استراتيجي مصمم لزيادة ظهور العلامة التجارية وتفاعل المستخدمين عبر المنصات الرقمية."
    }
  }
];

const SKILLS: Skill[] = [
  { name: "Social Media Design", level: 98 },
  { name: "Adobe Photoshop", level: 95 },
  { name: "Adobe Illustrator", level: 90 },
  { name: "Visual Hierarchy", level: 92 },
  { name: "Creative Direction", level: 85 },
];

const CERTIFICATES = [
  { en: "Adobe Certified Professional", ar: "محترف معتمد من أدوبي", year: "2023" },
  { en: "Advanced Graphic Design Masterclass", ar: "ماستر كلاس التصميم الجرافيكي المتقدم", year: "2022" },
  { en: "UI/UX Specialization - Google", ar: "تخصص واجهات المستخدم - جوجل", year: "2021" },
];

const ACHIEVEMENTS = [
  { en: "8+ Years of Professional Experience", ar: "أكثر من 8 سنوات من الخبرة المهنية" },
  { en: "Led 50+ Branding Projects", ar: "قيادة أكثر من 50 مشروع هوية بصرية" },
  { en: "Supervised Creative Teams at Everest", ar: "الإشراف على الفرق الإبداعية في إيفرست" },
  { en: "Award for Creative Excellence 2022", ar: "جائزة التميز الإبداعي لعام 2022" },
];

const CONTENT = {
  en: {
    nav: { home: "Home", about: "About", portfolio: "Portfolio", skills: "Skills", contact: "Contact" },
    hero: {
      greeting: "Hello, I am",
      name: "Abdalla Emad",
      nickname: "BAmwr",
      title: "Senior Social Media Designer",
      bio: "A creative expert specializing in high-impact social media designs. I transform marketing goals into eye-catching visual content that drives engagement and brand growth.",
      downloadCV: "Download CV"
    },
    about: {
      title: "About Me",
      bio: "I am a Senior Social Media Designer with a deep focus on creating viral and engaging visual content. My expertise lies in crafting posts that stand out in the digital noise. I have led creative directions for:",
      entities: ["Everest Company", "Everest Store", "Everest Media", "Study Area"],
      role: "In these roles, I have mastered the art of social media aesthetics, ensuring every post aligns perfectly with the brand's voice while maximizing audience interaction."
    },
    portfolio: { title: "My Portfolio", subtitle: "A showcase of my creative journey" },
    certificates: { title: "Certificates" },
    achievements: { title: "Achievements" },
    skills: { title: "Professional Skills" },
    contact: {
      title: "Get In Touch",
      subtitle: "Let's discuss your next project",
      form: { name: "Name", email: "Email", subject: "Subject", message: "Message", send: "Send Message" }
    },
    footer: "All rights reserved."
  },
  ar: {
    nav: { home: "الرئيسية", about: "عني", portfolio: "أعمالي", skills: "المهارات", contact: "تواصل" },
    hero: {
      greeting: "مرحباً، أنا",
      name: "عبدالله عماد",
      nickname: "BAmwr",
      title: "مصمم سوشيال ميديا أول",
      bio: "خبير إبداعي متخصص في تصاميم السوشيال ميديا عالية التأثير. أحول الأهداف التسويقية إلى محتوى بصري جذاب يعزز التفاعل ونمو العلامة التجارية.",
      downloadCV: "تحميل السيرة الذاتية"
    },
    about: {
      title: "عن حياتي المهنية",
      bio: "أنا مصمم سوشيال ميديا أول أركز بشكل عميق على إنشاء محتوى بصري جذاب وتفاعلي. تكمن خبرتي في صياغة منشورات تبرز وسط الضجيج الرقمي. قمت بقيادة التوجهات الإبداعية لـ:",
      entities: ["شركة إيفرست", "متجر إيفرست", "إيفرست ميديا", "ستادي أريا"],
      role: "في هذه الأدوار، أتقنت فن جماليات وسائل التواصل الاجتماعي، مما يضمن توافق كل منشور تماماً مع صوت العلامة التجارية مع زيادة تفاعل الجمهور."
    },
    portfolio: { title: "أعمالي", subtitle: "عرض لرحلتي الإبداعية" },
    certificates: { title: "الشهادات" },
    achievements: { title: "الإنجازات" },
    skills: { title: "المهارات المهنية" },
    contact: {
      title: "تواصل معي",
      subtitle: "دعنا نناقش مشروعك القادم",
      form: { name: "الاسم", email: "البريد الإلكتروني", subject: "الموضوع", message: "الرسالة", send: "إرسال الرسالة" }
    },
    footer: "جميع الحقوق محفوظة."
  }
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const t = CONTENT[lang];

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [theme, lang]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const toggleLang = () => setLang(prev => prev === 'en' ? 'ar' : 'en');

  return (
    <div className="min-h-screen transition-colors duration-300">
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-custom">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
            <span className="text-primary">BAmwr</span>
            <span className="hidden sm:inline opacity-50">|</span>
            <span className="hidden sm:inline text-sm font-medium opacity-70">{t.hero.name}</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {Object.entries(t.nav).map(([key, value]) => (
              <a key={key} href={`#${key}`} className="text-sm font-medium hover:text-primary transition-colors">
                {value}
              </a>
            ))}
            <div className="flex items-center gap-4 border-l border-custom pl-8 rtl:border-l-0 rtl:border-r rtl:pr-8">
              <button onClick={toggleLang} className="p-2 hover:bg-primary/10 rounded-full transition-colors">
                <Languages size={20} />
              </button>
              <button onClick={toggleTheme} className="p-2 hover:bg-primary/10 rounded-full transition-colors">
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </div>
          </div>

          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-b border-custom overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col gap-6">
                {Object.entries(t.nav).map(([key, value]) => (
                  <a key={key} href={`#${key}`} onClick={() => setIsMenuOpen(false)} className="text-lg font-bold">
                    {value}
                  </a>
                ))}
                <div className="flex gap-4 pt-4 border-t border-custom">
                  <button onClick={toggleLang} className="flex-1 py-3 glass rounded-xl flex items-center justify-center gap-2">
                    <Languages size={18} /> {lang === 'en' ? 'العربية' : 'English'}
                  </button>
                  <button onClick={toggleTheme} className="flex-1 py-3 glass rounded-xl flex items-center justify-center gap-2">
                    {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />} {theme === 'light' ? 'Dark' : 'Light'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <section id="home" className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: lang === 'en' ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-mono font-bold tracking-widest uppercase mb-4 block">
              {t.hero.greeting}
            </span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-4 leading-none">
              {t.hero.name}
            </h1>
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">{t.hero.nickname}</span>
              <span className="text-xl font-medium opacity-60">{t.hero.title}</span>
            </div>
            <p className="text-xl opacity-70 mb-10 max-w-lg leading-relaxed">
              {t.hero.bio}
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-primary/20">
                <Download size={20} /> {t.hero.downloadCV}
              </button>
              <a href="#contact" className="glass px-8 py-4 rounded-2xl font-bold hover:bg-primary/5 transition-all">
                {lang === 'en' ? 'Contact Me' : 'تواصل معي'}
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden glass p-4">
              <img 
                src="https://picsum.photos/seed/abdalla-emad/1000/1000" 
                alt="Abdalla Emad" 
                className="w-full h-full object-cover rounded-[2.5rem] grayscale hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 glass p-8 rounded-3xl shadow-2xl hidden sm:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Award size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold opacity-50 uppercase tracking-tighter">Experience</p>
                  <p className="text-2xl font-bold">8+ Years</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="py-32 bg-primary/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 flex items-center gap-4">
                <User className="text-primary" size={40} />
                {t.about.title}
              </h2>
              <p className="text-xl opacity-70 mb-8 leading-relaxed">
                {t.about.bio}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {t.about.entities.map((entity, i) => (
                  <div key={i} className="flex items-center gap-3 glass p-4 rounded-2xl">
                    <CheckCircle2 className="text-primary" size={20} />
                    <span className="font-bold">{entity}</span>
                  </div>
                ))}
              </div>
              <p className="text-lg opacity-60 italic border-l-4 border-primary pl-6 rtl:border-l-0 rtl:border-r-4 rtl:pr-6">
                {t.about.role}
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="glass p-8 rounded-[2.5rem] text-center">
                  <h3 className="text-4xl font-bold text-primary mb-2">50+</h3>
                  <p className="text-sm opacity-50 uppercase font-bold">Projects</p>
                </div>
                <div className="glass p-8 rounded-[2.5rem] text-center bg-primary text-white">
                  <h3 className="text-4xl font-bold mb-2">100%</h3>
                  <p className="text-sm opacity-80 uppercase font-bold">Satisfaction</p>
                </div>
              </div>
              <div className="pt-12 space-y-6">
                <div className="glass p-8 rounded-[2.5rem] text-center">
                  <h3 className="text-4xl font-bold text-primary mb-2">8+</h3>
                  <p className="text-sm opacity-50 uppercase font-bold">Years</p>
                </div>
                <div className="glass p-8 rounded-[2.5rem] text-center">
                  <h3 className="text-4xl font-bold text-primary mb-2">24/7</h3>
                  <p className="text-sm opacity-50 uppercase font-bold">Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.portfolio.title}</h2>
            <p className="text-xl opacity-50">{t.portfolio.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {PROJECTS.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedProject(project)}
                className="group relative aspect-[16/10] overflow-hidden rounded-[3rem] glass cursor-pointer"
              >
                <img 
                  src={project.image} 
                  alt={project.title[lang]} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-12 flex flex-col justify-end">
                  <span className="text-primary text-sm font-bold uppercase tracking-widest mb-2">
                    {project.category[lang]}
                  </span>
                  <h3 className="text-3xl font-bold text-white mb-4">{project.title[lang]}</h3>
                  <div className="flex items-center gap-2 text-white/60 text-sm font-medium">
                    {lang === 'en' ? 'Click to see details' : 'اضغط لمشاهدة التفاصيل'}
                    <ChevronRight size={16} className={lang === 'ar' ? 'rotate-180' : ''} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass max-w-3xl w-full rounded-[3rem] overflow-hidden relative"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-10 p-2 glass rounded-full hover:bg-primary/10 transition-colors"
              >
                <X size={24} />
              </button>
              <img src={selectedProject.image} alt="" className="w-full aspect-video object-cover" />
              <div className="p-12">
                <span className="text-primary text-sm font-bold uppercase tracking-widest mb-2 block">
                  {selectedProject.category[lang]}
                </span>
                <h3 className="text-4xl font-bold mb-6">{selectedProject.title[lang]}</h3>
                <p className="text-xl opacity-70 leading-relaxed">
                  {selectedProject.description[lang]}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="skills" className="py-32 bg-primary/5">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24">
          <div>
            <h2 className="text-4xl font-bold mb-12 flex items-center gap-4">
              <Layers className="text-primary" size={40} />
              {t.skills.title}
            </h2>
            <div className="space-y-8">
              {SKILLS.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-3">
                    <span className="font-bold">{skill.name}</span>
                    <span className="font-mono text-primary">{skill.level}%</span>
                  </div>
                  <div className="h-3 glass rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <h2 className="text-4xl font-bold mb-8">{t.achievements.title}</h2>
              <div className="space-y-4">
                {ACHIEVEMENTS.map((ach, i) => (
                  <div key={i} className="glass p-6 rounded-2xl flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <CheckCircle2 size={20} />
                    </div>
                    <span className="font-medium">{ach[lang]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold mb-8">{t.certificates.title}</h2>
              <div className="grid gap-4">
                {CERTIFICATES.map((cert, i) => (
                  <div key={i} className="glass p-6 rounded-2xl flex justify-between items-center group hover:border-primary transition-colors">
                    <div>
                      <h4 className="font-bold mb-1">{cert[lang]}</h4>
                      <p className="text-sm opacity-50">{cert.year}</p>
                    </div>
                    <Award className="text-primary opacity-20 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24">
            <div>
              <h2 className="text-5xl font-bold mb-8">{t.contact.title}</h2>
              <p className="text-2xl opacity-50 mb-16 leading-relaxed">{t.contact.subtitle}</p>
              
              <div className="space-y-8">
                <a href="mailto:bamwrv2@gmail.com" className="flex items-center gap-6 text-2xl font-medium hover:text-primary transition-colors group">
                  <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                    <Mail size={28} />
                  </div>
                  bamwrv2@gmail.com
                </a>
                <a href="https://wa.me/201022449197" target="_blank" rel="noreferrer" className="flex items-center gap-6 text-2xl font-medium hover:text-primary transition-colors group">
                  <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                    <MessageCircle size={28} />
                  </div>
                  01022449197
                </a>
                <div className="flex gap-6 pt-8">
                  <a href="https://www.facebook.com/1bamwr" target="_blank" rel="noreferrer" className="w-16 h-16 rounded-2xl glass flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:-translate-y-2">
                    <Facebook size={28} />
                  </a>
                  <a href="#" className="w-16 h-16 rounded-2xl glass flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:-translate-y-2">
                    <Instagram size={28} />
                  </a>
                  <a href="#" className="w-16 h-16 rounded-2xl glass flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:-translate-y-2">
                    <Twitter size={28} />
                  </a>
                </div>
              </div>
            </div>

            <form className="space-y-8 glass p-12 rounded-[3.5rem]">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-40 ml-2">{t.contact.form.name}</label>
                  <input type="text" className="w-full bg-white/5 border border-custom rounded-2xl px-6 py-4 focus:border-primary outline-none transition-colors" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-40 ml-2">{t.contact.form.email}</label>
                  <input type="email" className="w-full bg-white/5 border border-custom rounded-2xl px-6 py-4 focus:border-primary outline-none transition-colors" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest opacity-40 ml-2">{t.contact.form.subject}</label>
                <input type="text" className="w-full bg-white/5 border border-custom rounded-2xl px-6 py-4 focus:border-primary outline-none transition-colors" />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest opacity-40 ml-2">{t.contact.form.message}</label>
                <textarea rows={5} className="w-full bg-white/5 border border-custom rounded-2xl px-6 py-4 focus:border-primary outline-none transition-colors resize-none"></textarea>
              </div>
              <button className="w-full bg-primary text-white py-5 rounded-2xl font-bold hover:shadow-2xl hover:shadow-primary/30 transition-all text-lg uppercase tracking-widest flex items-center justify-center gap-3">
                <Send size={20} /> {t.contact.form.send}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center border-t border-custom glass">
        <p className="opacity-40 text-sm">
          © {new Date().getFullYear()} {t.hero.name}. {t.footer}
        </p>
      </footer>

      <motion.a
        href="https://wa.me/201022449197"
        target="_blank"
        rel="noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 hover:shadow-green-500/60 transition-shadow"
      >
        <MessageCircle size={32} fill="currentColor" />
      </motion.a>
    </div>
  );
}
