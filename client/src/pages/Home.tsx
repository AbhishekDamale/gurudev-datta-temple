import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  Copy,
  ExternalLink,
  Heart,
  Languages,
  LocateFixed,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Quote,
  ScrollText,
  Share2,
  Sparkles,
  Utensils,
  Users,
  WalletCards,
  X,
} from "lucide-react";

type Lang = "mr" | "en";

type BiProps = {
  mr: string;
  en: string;
  lang: Lang;
};

function Bi({ mr, en, lang }: BiProps) {
  return <>{lang === "mr" ? mr : en}</>;
}

const images = {
  portrait: "/manus-storage/image-1_c0f5ed25.jpg",
  construction: "/manus-storage/image-2_5757c890.jpg",
  shrine: "/manus-storage/image-3_c905e5e5.jpg",
  shrineClose: "/manus-storage/image-4_e0a20f09.jpg",
  sanctum: "/manus-storage/image-5_d1cc2395.jpg",
  prasad: "/manus-storage/image-6_8548dec4.jpg",
  qr: "/manus-storage/image-7_5f57937e.jpg",
};

const navItems = [
  { id: "story", mr: "इतिहास", en: "Story" },
  { id: "darshan", mr: "दर्शन व पूजा", en: "Darshan" },
  { id: "utsav", mr: "उत्सव", en: "Festivals" },
  { id: "committee", mr: "कमिटी", en: "Committee" },
  { id: "fair", mr: "यात्रा / जत्रा", en: "Fair" },
  { id: "gallery", mr: "छायाचित्र", en: "Gallery" },
  { id: "donation", mr: "देणगी", en: "Donate" },
  { id: "reach", mr: "कसे पोहोचाल", en: "Reach us" },
];

const galleryItems = [
  { src: images.shrine, mr: "औदुंबर वृक्षाखालील स्वयंभू दत्तमूर्ती", en: "The self-manifested Datta murti beneath the Audumbar tree" },
  { src: images.shrineClose, mr: "फुलांनी सजलेले स्वयंभू दर्शन", en: "A flower-adorned darshan of the shrine" },
  { src: images.sanctum, mr: "गाभाऱ्यातील मंगल दृश्य", en: "A sacred view inside the sanctum" },
  { src: images.prasad, mr: "भाविकांसाठी महाप्रसाद", en: "Mahaprasad served to devotees" },
];

const upcomingEvents = [
  { date: "2026-09-10", type: "thursday" },
  { date: "2026-09-17", type: "thursday" },
  { date: "2026-09-24", type: "thursday" },
  { date: "2026-10-01", type: "thursday" },
  { date: "2026-10-08", type: "thursday" },
  { date: "2026-10-15", type: "thursday" },
  { date: "2026-10-22", type: "thursday" },
  { date: "2026-10-29", type: "thursday" },
  { date: "2026-11-05", type: "thursday" },
  { date: "2026-11-12", type: "thursday" },
  { date: "2026-11-19", type: "thursday" },
  { date: "2026-11-26", type: "thursday" },
  { date: "2026-12-03", type: "thursday" },
  { date: "2026-12-10", type: "thursday" },
  { date: "2026-12-17", type: "thursday" },
  { date: "2026-12-23", type: "fair" },
];

const formatEventDate = (date: string, lang: Lang) => {
  const value = new Date(`${date}T12:00:00`);
  return new Intl.DateTimeFormat(lang === "mr" ? "mr-IN" : "en-IN", { day: "numeric", month: "short", year: "numeric" }).format(value);
};

function SectionHeading({ eyebrow, title, copy, lang }: { eyebrow: string; title: string; copy?: string; lang: Lang }) {
  return (
    <div className="mb-10 max-w-2xl">
      <div className="mb-3 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-[#aa7724]">
        <span className="h-px w-8 bg-[#c89a4a]" />
        {eyebrow}
      </div>
      <h2 className="font-display text-4xl leading-tight text-[#4d1814] md:text-5xl">{title}</h2>
      {copy ? <p className="mt-4 text-[15px] leading-8 text-[#6f5444]">{copy}</p> : null}
    </div>
  );
}

function Pill({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "dark" }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-wide ${tone === "dark" ? "bg-white/10 text-[#f7e6bc]" : "bg-[#f5ead2] text-[#7a4d1c]"}`}>
      {children}
    </span>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("mr");
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuRendered, setMenuRendered] = useState(false);
  const [lightbox, setLightbox] = useState<(typeof galleryItems)[number] | null>(null);
  const [copied, setCopied] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("gurudev-lang");
    if (saved === "mr" || saved === "en") setLang(saved);

    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem("gurudev-lang", lang);
  }, [lang]);

  useEffect(() => {
    if (menuOpen) {
      setMenuRendered(true);
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
    document.body.style.overflow = "";
    const timer = window.setTimeout(() => setMenuRendered(false), 380);
    return () => window.clearTimeout(timer);
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const shareText = useMemo(
    () =>
      lang === "mr"
        ? "स्वयंभू श्री गुरुदेव दत्त देवस्थान, शिंगवे केशव — दर्शन, इतिहास व माहितीसाठी भेट द्या."
        : "Swayambhu Shri Gurudev Datta Devasthan, Shingave Keshav — history, darshan and visitor information.",
    [lang],
  );

  const toggleLang = () => setLang((value) => (value === "mr" ? "en" : "mr"));

  const shareWebsite = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: "स्वयंभू श्री गुरुदेव दत्त देवस्थान", text: shareText, url }).catch(() => undefined);
      return;
    }
    await navigator.clipboard?.writeText(`${shareText} ${url}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fffaf1] text-[#3e251b]">
      <a href="#main-content" className="skip-link">
        <Bi lang={lang} mr="मुख्य मजकुराकडे जा" en="Skip to content" />
      </a>

      <header className="relative isolate overflow-hidden bg-[#4d1814] text-[#fff8e9]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_12%,rgba(215,168,76,.25),transparent_28%),linear-gradient(115deg,#4d1814_0%,#6d2119_48%,#35100f_100%)]" />
        <div className="absolute -right-24 top-14 -z-10 h-80 w-80 rounded-full border border-[#d3a556]/20 bg-[#d3a556]/5 blur-2xl" />
        <div className="absolute bottom-0 left-0 -z-10 h-52 w-full opacity-25 [background-image:linear-gradient(135deg,transparent_48%,#e2b967_49%,#e2b967_51%,transparent_52%)] [background-size:28px_28px]" />

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-10">
          <a href="#top" className="group flex items-center gap-3" aria-label="Home">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#dbad57]/50 bg-[#d7a84c]/10 font-display text-xl text-[#e7c47f] shadow-[0_0_30px_rgba(215,168,76,.15)]">ॐ</span>
            <span className="leading-tight">
              <span className="block font-display text-lg text-[#f9e2ab]">श्री गुरुदेव दत्त</span>
              <span className="block text-[10px] uppercase tracking-[0.24em] text-[#d5b978]">Shingave Keshav</span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="text-[13px] text-[#f4dfb2]/80 transition hover:text-white">
                <Bi lang={lang} mr={item.mr} en={item.en} />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={toggleLang} className="hidden items-center gap-2 rounded-full border border-[#d9b775]/40 px-3 py-2 text-xs text-[#f6e2b0] transition hover:bg-white/10 sm:flex" aria-label="Change language">
              <Languages size={15} />
              <Bi lang={lang} mr="English" en="मराठी" />
            </button>
            <a href="#donation" className="hidden rounded-full bg-[#d7a84c] px-4 py-2.5 text-xs font-bold text-[#4d1814] shadow-lg shadow-[#2b0b0a]/20 transition hover:-translate-y-0.5 hover:bg-[#e7c47f] sm:inline-flex">
              <Bi lang={lang} mr="देणगी द्या" en="Donate" />
            </a>
            <button onClick={() => setMenuOpen((open) => !open)} className="mobile-menu-toggle rounded-full border border-[#d9b775]/40 p-2.5 text-[#f6e2b0] lg:hidden" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation-drawer">
              <span className={`mobile-menu-icon ${menuOpen ? "is-open" : ""}`}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</span>
            </button>
          </div>
        </div>

        {menuRendered ? (
          <div className={`mobile-menu-layer ${menuOpen ? "is-open" : "is-closing"}`} onClick={() => setMenuOpen(false)}>
            <div id="mobile-navigation-drawer" className="mobile-menu-drawer" onClick={(event) => event.stopPropagation()}>
              <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                <div><p className="font-display text-xl text-[#ffe3a3]"><Bi lang={lang} mr="मंदिर मेनू" en="Temple menu" /></p><p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#d7b979]">Shingave Keshav</p></div>
                <button onClick={() => setMenuOpen(false)} className="rounded-full border border-white/15 p-2 text-[#f6e2b0]" aria-label="Close navigation"><X size={19} /></button>
              </div>
              <nav aria-label="Mobile navigation">
                <div className="grid gap-1">
              {navItems.map((item) => (
                <a key={item.id} href={`#${item.id}`} onClick={() => setMenuOpen(false)} className="mobile-menu-item rounded-xl px-3 py-3 text-base font-semibold text-[#f6e2b0] hover:bg-white/10">
                  <Bi lang={lang} mr={item.mr} en={item.en} />
                </a>
              ))}
                  <button onClick={toggleLang} className="mobile-menu-item mt-3 flex items-center gap-2 rounded-xl border border-white/15 px-3 py-3 text-left text-base font-semibold text-[#f6e2b0]"><Languages size={17} /><Bi lang={lang} mr="English मध्ये पहा" en="मराठीत पहा" /></button>
                </div>
              </nav>
            </div>
          </div>
        ) : null}

        <div id="top" className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-16 lg:grid-cols-[1.05fr_.95fr] lg:px-10 lg:pb-28 lg:pt-20">
          <div className="max-w-2xl">
            <div className="mb-5 flex flex-wrap gap-2">
              <Pill tone="dark"><Sparkles size={13} /><Bi lang={lang} mr="स्वयंभू स्थान" en="Self-manifested shrine" /></Pill>
              <Pill tone="dark"><CalendarDays size={13} /><Bi lang={lang} mr="दर गुरुवारी दर्शन" en="Thursday darshan" /></Pill>
            </div>
            <p className="mb-4 font-display text-xl text-[#d7aa55]">•|| श्री गुरुदेव दत्त ||•</p>
            <h1 className="max-w-3xl font-display text-5xl leading-[1.08] tracking-[-0.03em] text-[#fff6df] sm:text-6xl lg:text-8xl">
              <Bi lang={lang} mr="स्वयंभू श्री गुरुदेव दत्त देवस्थान" en="Swayambhu Shri Gurudev Datta Devasthan" />
            </h1>
            <div className="mt-6 flex items-center gap-3 text-sm font-semibold text-[#e5c889]">
              <MapPin size={17} />
              <span><Bi lang={lang} mr="शिंगवे केशव (दत्ताचे) · ता. पाथर्डी · जि. अहिल्यानगर — ४१४५०१" en="Shingave Keshav (Dattache) · Pathardi · Ahilyanagar — 414501" /></span>
            </div>
            <p className="mt-7 max-w-xl text-[16px] leading-8 text-[#f7e6c0]/75">
              <Bi lang={lang} mr="उंबराच्या सावलीत दत्तगुरूंनी प्रकाशरूपाने दर्शन दिलेले हे श्रद्धास्थान — दर गुरुवारी असंख्य भाविकांच्या भक्तीने उजळते." en="A sacred place where Dattaguru is believed to have appeared as light beneath the Audumbar tree — illuminated by the devotion of countless visitors every Thursday." />
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#darshan" className="group inline-flex items-center gap-3 rounded-full bg-[#d8a94d] px-5 py-3.5 text-sm font-bold text-[#4d1814] transition hover:-translate-y-1 hover:bg-[#ebc979]">
                <Bi lang={lang} mr="दर्शन व आरतीची वेळ" en="Darshan & aarti timings" /><ArrowRight size={17} className="transition group-hover:translate-x-1" />
              </a>
              <a href="https://maps.app.goo.gl/tmXTAoqHV6kP91RW9?g_st=aw" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#edcf91]/35 px-5 py-3.5 text-sm font-semibold text-[#f7e6c0] transition hover:bg-white/10">
                <LocateFixed size={17} /><Bi lang={lang} mr="नकाशावर मार्ग" en="Open in Maps" /><ArrowUpRight size={15} />
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[520px] lg:justify-self-end">
            <div className="absolute -inset-5 rounded-[2rem] border border-[#dbad57]/20 bg-[#d7a84c]/10 blur-sm" />
            <div className="relative overflow-hidden rounded-[1.8rem] border border-[#e4c47e]/35 bg-[#260c0b] p-2 shadow-2xl shadow-[#260c0b]/40">
              <img src={images.sanctum} alt="स्वयंभू श्री गुरुदेव दत्त मूर्ती" className="aspect-[4/5] w-full rounded-[1.35rem] object-cover object-center" />
              <div className="absolute inset-x-8 bottom-8 rounded-2xl border border-white/20 bg-[#3e1712]/70 p-4 backdrop-blur-md">
                <p className="font-display text-xl text-[#ffe6a9]"><Bi lang={lang} mr="दर्शनाने मनःशांती" en="A moment of inner peace" /></p>
                <p className="mt-1 text-xs text-[#f9e7bd]/70"><Bi lang={lang} mr="श्रद्धा · सेवा · समाधान" en="Faith · service · serenity" /></p>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-[#d7a84c]/30 bg-[#fff6df] px-5 py-4 text-[#4d1814] shadow-xl sm:block">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#aa7724]"><Bi lang={lang} mr="भाविकांचे श्रद्धास्थान" en="A place of faith" /></p>
              <p className="mt-1 font-display text-xl"><Bi lang={lang} mr="राम कृष्ण हरी" en="Ram Krishna Hari" /></p>
            </div>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className="relative z-10 mx-auto -mt-8 max-w-7xl px-5 lg:px-10">
          <div className="grid gap-3 rounded-3xl border border-[#ead9b8] bg-[#fffdf8] p-3 shadow-[0_20px_70px_rgba(77,24,20,.12)] md:grid-cols-3">
            {[
              { icon: <Clock3 size={20} />, title: { mr: "आरती वेळ", en: "Aarti timings" }, value: { mr: "सकाळी ६:०० · सायंकाळी ७:००", en: "6:00 AM · 7:00 PM" } },
              { icon: <Users size={20} />, title: { mr: "भक्तांसाठी सोय", en: "Devotee facilities" }, value: { mr: "निवास व भोजन उपलब्ध", en: "Stay & food available" } },
              { icon: <Phone size={20} />, title: { mr: "आधी संपर्क करा", en: "Contact in advance" }, value: { mr: "९७७५७५७३७५", en: "9775757375" } },
            ].map((item) => (
              <div key={item.title.en} className="flex items-center gap-4 rounded-2xl px-4 py-4 md:px-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f6ecd8] text-[#a56e1f]">{item.icon}</span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#a56e1f]"><Bi lang={lang} mr={item.title.mr} en={item.title.en} /></p>
                  <p className="mt-1 text-sm font-semibold text-[#4d1814]"><Bi lang={lang} mr={item.value.mr} en={item.value.en} /></p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="story" className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
          <div className="grid items-start gap-14 lg:grid-cols-[.8fr_1.2fr]">
            <div className="relative lg:sticky lg:top-24">
              <SectionHeading lang={lang} eyebrow={lang === "mr" ? "कथा आणि परंपरा" : "Story & tradition"} title={lang === "mr" ? "स्वयंभू दर्शनाची कथा" : "The story of the divine appearance"} copy={lang === "mr" ? "उंबराच्या सावलीतून दत्तगुरूंचे दर्शन झाल्याची ही पवित्र परंपरा भक्तांच्या श्रद्धेतून पिढ्यान्‌पिढ्या जपली जाते." : "The sacred tradition of Dattaguru appearing beneath the Audumbar tree has been carried through generations by the faith of devotees."} />
              <div className="flex items-center gap-4 rounded-2xl border border-[#ead9b8] bg-[#fffdf8] p-4 shadow-sm">
                <img src={images.portrait} alt="ब्रह्मकुमारी वच्छला आक्का" className="h-16 w-16 rounded-2xl object-cover object-top" />
                <div>
                  <p className="font-display text-lg text-[#4d1814]"><Bi lang={lang} mr="ब्रह्मकुमारी वच्छला आक्का" en="Brahmakumari Vachhala Akka" /></p>
                  <p className="mt-1 text-xs text-[#8b6b55]"><Bi lang={lang} mr="स्थानाची सेवाभावी परंपरा" en="A devoted voice of the shrine's tradition" /></p>
                </div>
              </div>
            </div>
            <div className="space-y-5">
              <article className="rounded-3xl border border-[#ead9b8] bg-[#fffdf8] p-7 shadow-[0_14px_50px_rgba(77,24,20,.06)] md:p-10">
                <div className="mb-5 flex items-center justify-between"><span className="rounded-full bg-[#f5ead2] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#a56e1f]">01 · <Bi lang={lang} mr="विश्वास" en="Faith" /></span><ScrollText size={21} className="text-[#c89a4a]" /></div>
                <h3 className="font-display text-2xl text-[#4d1814]"><Bi lang={lang} mr="प्रकाशरूपाने झालेले दर्शन" en="A vision in the form of light" /></h3>
                <p className="mt-4 text-[15px] leading-8 text-[#6f5444]"><Bi lang={lang} mr="शिंगवे केशव येथील या पवित्र भूमीत औदुंबर वृक्षाच्या सान्निध्यात स्वयंभू श्री गुरुदेव दत्तांचे प्रकाशरूप दर्शन झाल्याची श्रद्धा आहे. या अनुभूतीने हे स्थान भक्तांसाठी शांतता, सेवा आणि समाधानाचे केंद्र बनले." en="At this sacred place in Shingave Keshav, devotees believe that Swayambhu Shri Gurudev Datta revealed himself as light in the presence of the Audumbar tree. That experience has made the shrine a place of peace, service and spiritual solace." /></p>
              </article>
              <blockquote className="rounded-3xl bg-[#f3e4c5] p-7 text-[#6d351d] md:p-9">
                <Quote size={28} className="mb-4 text-[#b27a25]" />
                <p className="font-display text-2xl leading-relaxed"><Bi lang={lang} mr="जिथे श्रद्धा असते, तिथे दत्तगुरूंची कृपा असते." en="Where there is faith, there is the grace of Dattaguru." /></p>
                <footer className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#9b6b32]">Shri Gurudev Datta · <Bi lang={lang} mr="राम कृष्ण हरी" en="Ram Krishna Hari" /></footer>
              </blockquote>
            </div>
          </div>
        </section>

        <section id="darshan" className="border-y border-[#ead9b8] bg-[#f8efdf] px-5 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionHeading lang={lang} eyebrow={lang === "mr" ? "भक्तांसाठी माहिती" : "For visitors"} title={lang === "mr" ? "दर्शन, पूजा आणि आरती" : "Darshan, puja & aarti"} copy={lang === "mr" ? "भक्तांनी दर्शनासाठी येण्यापूर्वी वेळा व उपलब्ध सेवांबाबत मंदिराशी संपर्क साधावा." : "Visitors are encouraged to contact the temple in advance about timings and available services."} />
            <div className="grid gap-5 lg:grid-cols-3">
              <div className="rounded-3xl bg-[#4d1814] p-7 text-[#fff3d5] shadow-xl shadow-[#4d1814]/15 lg:col-span-1">
                <div className="flex items-center justify-between"><span className="rounded-full bg-[#d7a84c]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#ebc979]">Thursday</span><Sparkles size={21} className="text-[#d7a84c]" /></div>
                <h3 className="mt-8 font-display text-3xl"><Bi lang={lang} mr="गुरुवार विशेष" en="Thursday special" /></h3>
                <p className="mt-3 text-sm leading-7 text-[#f8e7be]/70"><Bi lang={lang} mr="दर गुरुवारी असंख्य भाविक भक्तिभावाने दर्शनासाठी येतात. शांतता, सेवा आणि श्रद्धेचा हा विशेष दिवस." en="Every Thursday, devotees gather for a special day of darshan, prayer and service." /></p>
                <a href="tel:9775757375" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#ebc979] hover:text-white"><Phone size={16} /> 9775757375 <ArrowUpRight size={15} /></a>
              </div>
              <div className="rounded-3xl border border-[#ead9b8] bg-[#fffdf8] p-7 lg:col-span-2 md:p-9">
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#a56e1f]"><Clock3 size={16} /> <Bi lang={lang} mr="दैनंदिन आरती" en="Daily aarti" /></p>
                    <div className="space-y-4">
                      {[{ mr: "काकड आरती", en: "Morning aarti", time: "सकाळी ६:०० · 6:00 AM" }, { mr: "दुपारची सेवा", en: "Midday seva", time: "दुपारी १२:०० · 12:00 PM" }, { mr: "सायंकाळची आरती", en: "Evening aarti", time: "सायंकाळी ७:०० · 7:00 PM" }].map((row) => <div key={row.en} className="flex items-center justify-between gap-3 border-b border-dashed border-[#ead9b8] pb-3 text-sm"><span className="font-semibold text-[#5d3727]"><Bi lang={lang} mr={row.mr} en={row.en} /></span><span className="whitespace-nowrap text-xs font-bold text-[#a56e1f]">{row.time}</span></div>)}
                    </div>
                  </div>
                  <div>
                    <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#a56e1f]"><Check size={16} /> <Bi lang={lang} mr="भक्तांसाठी सुविधा" en="Devotee facilities" /></p>
                    <ul className="space-y-4 text-sm text-[#6f5444]">
                      {[{ mr: "निवासाची सोय उपलब्ध", en: "Accommodation available" }, { mr: "भोजन / महाप्रसादाची सोय", en: "Meals / mahaprasad available" }, { mr: "आधी संपर्क केल्यास अधिक सोयीचे", en: "Advance contact recommended" }].map((item) => <li key={item.en} className="flex gap-3"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f4e5c6] text-[#a56e1f]"><Check size={12} /></span><Bi lang={lang} mr={item.mr} en={item.en} /></li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="utsav" className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
            <div className="order-2 lg:order-1">
              <SectionHeading lang={lang} eyebrow={lang === "mr" ? "सेवा आणि निर्मिती" : "Service & creation"} title={lang === "mr" ? "नवीन मंदिर — भक्तीला नवे घर" : "A new temple for a living tradition"} copy={lang === "mr" ? "देवस्थानच्या नवीन बांधकामाचा हा संकल्प भाविकांच्या सहकार्याने आकार घेत आहे. सेवा, साधना आणि समुदायासाठी अधिक सुंदर जागा उभी करण्याचे हे स्वप्न आहे." : "The new temple construction is taking shape with the support of devotees — a vision for a more beautiful space for service, prayer and community."} />
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-[#f7ecd8] p-5"><WalletCards size={20} className="text-[#a56e1f]" /><p className="mt-4 font-display text-xl text-[#4d1814]"><Bi lang={lang} mr="सहभाग" en="Participation" /></p><p className="mt-1 text-xs leading-6 text-[#795d4a]"><Bi lang={lang} mr="भक्तांच्या सहकार्याने" en="With devotees' support" /></p></div>
                <div className="rounded-2xl bg-[#f7ecd8] p-5"><Heart size={20} className="text-[#a56e1f]" /><p className="mt-4 font-display text-xl text-[#4d1814]"><Bi lang={lang} mr="सेवा" en="Seva" /></p><p className="mt-1 text-xs leading-6 text-[#795d4a]"><Bi lang={lang} mr="श्रद्धा आणि समर्पण" en="Faith and dedication" /></p></div>
              </div>
              <a href="#donation" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#8e511c] hover:text-[#4d1814]"><Bi lang={lang} mr="बांधकामासाठी योगदान द्या" en="Support the construction" /><ChevronRight size={17} /></a>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative overflow-hidden rounded-[2rem] border-8 border-[#f2e5ca] bg-[#4d1814] shadow-[0_20px_70px_rgba(77,24,20,.18)]">
                <img src={images.construction} alt="नवीन बांधकामाचे 3D रेखाचित्र" className="aspect-[16/10] w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2d0c0b] to-transparent px-6 pb-6 pt-20 text-white"><p className="font-display text-2xl"><Bi lang={lang} mr="नवीन बांधकामाचे संकल्पचित्र" en="Vision for the new temple" /></p><p className="mt-1 text-xs text-white/65"><Bi lang={lang} mr="वास्तुविशारद अरविंद वैद्य आणि सहकारी" en="Architect Arvind Vaidya and associates" /></p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="committee" className="border-y border-[#ead9b8] bg-[#fffdf8] px-5 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              lang={lang}
              eyebrow={lang === "mr" ? "देवस्थान व्यवस्थापन" : "Temple administration"}
              title={lang === "mr" ? "देवस्थान कमिटी" : "Temple committee"}
              copy={lang === "mr" ? "देवस्थानची सेवा, व्यवस्था, स्वच्छता, उत्सव आणि भाविकांच्या सुविधा यासाठी कमिटी कार्यरत आहे." : "The temple committee helps coordinate seva, facilities, cleanliness, festivals and the experience of devotees."}
            />
            <div className="grid gap-5 md:grid-cols-3">
              {[
                { icon: <Users size={21} />, mr: "व्यवस्थापन व सेवा", en: "Management & seva", copyMr: "दैनंदिन पूजा, आरती आणि देवस्थानची व्यवस्था पाहणे.", copyEn: "Coordinating daily puja, aarti and temple operations." },
                { icon: <Heart size={21} />, mr: "भाविक सुविधा", en: "Devotee facilities", copyMr: "निवास, भोजन, स्वच्छता आणि भाविकांच्या सोयींची काळजी.", copyEn: "Caring for accommodation, meals, cleanliness and visitor facilities." },
                { icon: <WalletCards size={21} />, mr: "देणगी व बांधकाम", en: "Donations & construction", copyMr: "देणगीचा उपयोग सेवा आणि नवीन मंदिर बांधकामासाठी करणे.", copyEn: "Directing contributions toward seva and the new temple construction." },
              ].map((item) => (
                <article key={item.en} className="rounded-3xl border border-[#ead9b8] bg-[#f8efdf] p-7 transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(77,24,20,.08)]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4d1814] text-[#e7c47f]">{item.icon}</span>
                  <h3 className="mt-6 font-display text-2xl text-[#4d1814]"><Bi lang={lang} mr={item.mr} en={item.en} /></h3>
                  <p className="mt-3 text-sm leading-7 text-[#6f5444]"><Bi lang={lang} mr={item.copyMr} en={item.copyEn} /></p>
                </article>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-dashed border-[#d6b36e] bg-[#fdf5e7] p-5 text-sm text-[#76563f] sm:flex-row sm:items-center sm:justify-between">
              <span><Bi lang={lang} mr="कमिटीशी संपर्क किंवा सेवा सहभागासाठी मंदिराशी आधी संपर्क साधावा." en="Please contact the temple in advance for committee enquiries or seva participation." /></span>
              <a href="tel:9775757375" className="inline-flex shrink-0 items-center gap-2 font-bold text-[#8e511c]"><Phone size={16} /> 9775757375</a>
            </div>
          </div>
        </section>

        <section id="fair" className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <SectionHeading
                lang={lang}
                eyebrow={lang === "mr" ? "उत्सव आणि परंपरा" : "Festivals & tradition"}
                title={lang === "mr" ? "देवस्थानची यात्रा / जत्रा" : "Temple fair & annual utsav"}
                copy={lang === "mr" ? "जत्रा, विशेष पूजा आणि उत्सव हे देवस्थानच्या सामुदायिक भक्तीचे महत्त्वाचे क्षण आहेत. निश्चित तारखा दरवर्षी कमिटीमार्फत जाहीर केल्या जातील." : "The fair, special puja and annual utsav are important moments of collective devotion. Confirmed dates will be announced by the committee each year."}
              />
              <div className="rounded-3xl bg-[#4d1814] p-7 text-[#fff3d5] shadow-xl shadow-[#4d1814]/15">
                <CalendarDays size={24} className="text-[#e2b967]" />
                <h3 className="mt-6 font-display text-2xl"><Bi lang={lang} mr="तारीख व वेळ लवकरच" en="Dates & timings coming soon" /></h3>
                <p className="mt-3 text-sm leading-7 text-[#f8e7be]/70"><Bi lang={lang} mr="यात्रेपूर्वी दर्शन, वाहतूक, महाप्रसाद आणि निवास व्यवस्थेबाबत अधिकृत संपर्कावरून माहिती घ्यावी." en="Before travelling, please confirm darshan, transport, mahaprasad and accommodation arrangements through the official contact." /></p>
                <a href="tel:9775757375" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#d7a84c] px-4 py-2.5 text-sm font-bold text-[#4d1814]"><Phone size={15} /> <Bi lang={lang} mr="अधिक माहिती" en="Get details" /></a>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { number: "01", titleMr: "गुरुवार विशेष दर्शन", titleEn: "Thursday special darshan", bodyMr: "दर गुरुवारी भक्तिभावाने विशेष दर्शन व सेवा.", bodyEn: "Special darshan and seva every Thursday.", icon: <Sparkles size={19} /> },
                { number: "02", titleMr: "वार्षिक यात्रा / जत्रा", titleEn: "Annual fair", bodyMr: "भक्तांचा सहभाग, पूजा, प्रसाद आणि सामुदायिक सेवा.", bodyEn: "Devotion, puja, prasad and community service.", icon: <Users size={19} /> },
                { number: "03", titleMr: "विशेष पूजा व अभिषेक", titleEn: "Special puja & abhishek", bodyMr: "उत्सवाच्या काळात नियोजित विशेष धार्मिक कार्यक्रम.", bodyEn: "Special religious programmes during the festival period.", icon: <Heart size={19} /> },
                { number: "04", titleMr: "महाप्रसाद सेवा", titleEn: "Mahaprasad seva", bodyMr: "भाविकांसाठी प्रसाद व भोजन व्यवस्थेची सेवा.", bodyEn: "Prasad and meal service for devotees.", icon: <Utensils size={19} /> },
              ].map((item) => (
                <article key={item.number} className="rounded-3xl border border-[#ead9b8] bg-[#f8efdf] p-6 transition hover:-translate-y-1 hover:bg-[#f3e4c5]">
                  <div className="flex items-center justify-between text-[#a56e1f]"><span className="text-xs font-bold tracking-[0.18em]">{item.number}</span>{item.icon}</div>
                  <h3 className="mt-8 font-display text-xl leading-snug text-[#4d1814]"><Bi lang={lang} mr={item.titleMr} en={item.titleEn} /></h3>
                  <p className="mt-3 text-sm leading-7 text-[#6f5444]"><Bi lang={lang} mr={item.bodyMr} en={item.bodyEn} /></p>
                </article>
              ))}
            </div>
          </div>
          <div className="mx-auto mt-10 max-w-7xl rounded-[2rem] border border-[#ead9b8] bg-[#fffdf8] p-6 shadow-[0_14px_50px_rgba(77,24,20,.06)] md:p-8">
            <div className="flex flex-col justify-between gap-3 border-b border-[#ead9b8] pb-5 sm:flex-row sm:items-center">
              <div>
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#a56e1f]"><CalendarDays size={16} /> <Bi lang={lang} mr="आगामी कार्यक्रम कॅलेंडर" en="Upcoming events calendar" /></p>
                <h3 className="mt-2 font-display text-2xl text-[#4d1814]"><Bi lang={lang} mr="गुरुवार दर्शन आणि वार्षिक यात्रा" en="Thursday darshan & annual yatra" /></h3>
              </div>
              <Pill><CalendarDays size={13} /> 2026</Pill>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {upcomingEvents.map((event) => {
                const fair = event.type === "fair";
                return <div key={event.date} className={`rounded-2xl border p-4 ${fair ? "border-[#c8943e] bg-[#4d1814] text-[#fff0c8] shadow-lg shadow-[#4d1814]/10 sm:col-span-2 lg:col-span-2" : "border-[#ead9b8] bg-[#f8efdf] text-[#4d1814]"}`}>
                  <div className="flex items-center justify-between gap-3"><span className={`text-[11px] font-bold uppercase tracking-[0.16em] ${fair ? "text-[#e6bf6d]" : "text-[#a56e1f]"}`}><Bi lang={lang} mr={fair ? "विशेष यात्रा" : "गुरुवार"} en={fair ? "Annual yatra" : "Thursday"} /></span>{fair ? <Sparkles size={16} className="text-[#e6bf6d]" /> : <Clock3 size={15} className="text-[#a56e1f]" />}</div>
                  <p className={`mt-3 font-display text-xl ${fair ? "text-[#fff0c8]" : "text-[#4d1814]"}`}>{formatEventDate(event.date, lang)}</p>
                  <p className={`mt-1 text-xs leading-5 ${fair ? "text-[#f7e6c0]/75" : "text-[#76563f]"}`}><Bi lang={lang} mr={fair ? "वार्षिक यात्रा / जत्रा · बुधवार" : "विशेष दर्शन व सेवा"} en={fair ? "Annual fair · Wednesday" : "Special darshan & seva"} /></p>
                </div>;
              })}
            </div>
            <p className="mt-5 text-xs leading-6 text-[#8b6b55]"><Bi lang={lang} mr="यात्रेची वेळ, मिरवणूक, महाप्रसाद आणि निवास व्यवस्थेबाबत अंतिम माहिती कमिटीमार्फत जाहीर केली जाईल." en="Final timings, procession, mahaprasad and accommodation details for the yatra will be announced by the committee." /></p>
          </div>
        </section>

        <section id="gallery" className="border-y border-[#ead9b8] bg-[#4d1814] px-5 py-24 text-[#fff4d9] lg:px-10 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <SectionHeading lang={lang} eyebrow={lang === "mr" ? "देवस्थानाचे क्षण" : "Moments from the shrine"} title={lang === "mr" ? "छायाचित्रातून अनुभव" : "See the sacred moments"} copy={lang === "mr" ? "दर्शन, सेवा आणि भक्तीचे काही निवडक क्षण." : "A few selected moments of darshan, seva and devotion."} />
              <Pill tone="dark"><Sparkles size={13} /><Bi lang={lang} mr="फोटोवर क्लिक करून मोठे पहा" en="Click a photo to enlarge" /></Pill>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {galleryItems.map((item, index) => (
                <button key={item.src} onClick={() => setLightbox(item)} className={`group relative overflow-hidden rounded-3xl border border-[#d8aa57]/25 bg-[#2d0c0b] text-left ${index === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`} aria-label={item.en}>
                  <img src={item.src} alt={item.mr} className={`w-full object-cover transition duration-500 group-hover:scale-105 ${index === 0 ? "aspect-square sm:h-full" : "aspect-[4/3]"}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2d0c0b]/90 via-transparent to-transparent opacity-80" />
                  <div className="absolute inset-x-0 bottom-0 p-5"><p className="font-display text-lg text-[#fff1c9]"><Bi lang={lang} mr={item.mr} en={item.en} /></p><span className="mt-2 inline-flex items-center gap-1 text-xs text-[#e5c889]">View <ArrowUpRight size={13} /></span></div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="donation" className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
          <div className="grid items-center gap-10 lg:grid-cols-[.75fr_1.25fr]">
            <div className="mx-auto w-full max-w-[270px] rounded-[2rem] border-8 border-[#f2e5ca] bg-white p-3 shadow-[0_18px_60px_rgba(77,24,20,.13)]"><img src={images.qr} alt="देणगीसाठी QR कोड" className="w-full rounded-2xl" /><p className="px-2 pb-2 pt-3 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#9c6a29]"><Bi lang={lang} mr="देणगी QR" en="Donation QR" /></p></div>
            <div>
              <SectionHeading lang={lang} eyebrow={lang === "mr" ? "सेवेत सहभागी व्हा" : "Join the seva"} title={lang === "mr" ? "आपली देणगी, देवस्थानची सेवा" : "Your donation supports the shrine"} copy={lang === "mr" ? "देवस्थानच्या दैनंदिन सेवा, महाप्रसाद आणि नवीन बांधकामासाठी आपले योगदान श्रद्धेने स्वीकारले जाते." : "Your contribution is gratefully received for daily temple services, mahaprasad and the new construction."} />
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#ead9b8] bg-[#fffdf8] p-5"><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#a56e1f]">UPI ID</p><p className="mt-2 break-all font-display text-lg text-[#4d1814]">gurudevdattadevasthan@upi</p></div>
                <div className="rounded-2xl border border-[#ead9b8] bg-[#fffdf8] p-5"><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#a56e1f]"><Bi lang={lang} mr="संपर्क" en="Contact" /></p><a href="tel:9775757375" className="mt-2 inline-flex items-center gap-2 font-display text-lg text-[#4d1814]">9775757375 <ArrowUpRight size={15} /></a></div>
              </div>
              <p className="mt-5 flex gap-2 text-xs leading-6 text-[#8b6b55]"><WalletCards size={16} className="mt-1 shrink-0 text-[#a56e1f]" /><Bi lang={lang} mr="देणगी करण्यापूर्वी अधिकृत संपर्कावरून तपशील पडताळून पाहावा." en="Please verify the details through the official contact before making a donation." /></p>
            </div>
          </div>
        </section>

        <section id="reach" className="border-t border-[#ead9b8] bg-[#f8efdf] px-5 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_.8fr]">
            <div>
              <SectionHeading lang={lang} eyebrow={lang === "mr" ? "भेटीचे नियोजन" : "Plan your visit"} title={lang === "mr" ? "कसे पोहोचाल" : "How to reach us"} copy={lang === "mr" ? "शिंगवे केशव, ता. पाथर्डी, जि. अहिल्यानगर येथे आपले स्वागत आहे." : "We welcome you at Shingave Keshav, Pathardi, Ahilyanagar."} />
              <div className="space-y-3">
                <div className="flex gap-4 rounded-2xl border border-[#ead9b8] bg-[#fffdf8] p-5"><MapPin className="mt-1 shrink-0 text-[#a56e1f]" size={21} /><div><p className="font-bold text-[#4d1814]"><Bi lang={lang} mr="पत्ता" en="Address" /></p><p className="mt-1 text-sm leading-7 text-[#6f5444]"><Bi lang={lang} mr="शिंगवे केशव (दत्ताचे), ता. पाथर्डी, जि. अहिल्यानगर — ४१४५०१, महाराष्ट्र, भारत" en="Shingave Keshav (Dattache), Tal. Pathardi, Dist. Ahilyanagar — 414501, Maharashtra, India" /></p></div></div>
                <div className="flex gap-4 rounded-2xl border border-[#ead9b8] bg-[#fffdf8] p-5"><Phone className="mt-1 shrink-0 text-[#a56e1f]" size={21} /><div><p className="font-bold text-[#4d1814]"><Bi lang={lang} mr="फोन" en="Phone" /></p><a href="tel:9775757375" className="mt-1 inline-block text-sm font-semibold text-[#8e511c]">9775757375</a></div></div>
              </div>
              <a href="https://maps.app.goo.gl/tmXTAoqHV6kP91RW9?g_st=aw" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#4d1814] px-5 py-3.5 text-sm font-bold text-[#f9e5b4] transition hover:-translate-y-0.5 hover:bg-[#6e2219]"><LocateFixed size={17} /><Bi lang={lang} mr="Google Maps वर उघडा" en="Open Google Maps" /><ExternalLink size={14} /></a>
            </div>
            <div className="rounded-[2rem] bg-[#4d1814] p-7 text-[#fff2d0] shadow-xl shadow-[#4d1814]/10 md:p-9">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d7a84c]/15 text-[#e2b967]"><Utensils size={23} /></div>
              <h3 className="mt-7 font-display text-3xl"><Bi lang={lang} mr="निवास व भोजन" en="Stay & food" /></h3>
              <p className="mt-3 text-sm leading-7 text-[#f8e7be]/70"><Bi lang={lang} mr="मंदिर परिसरात भाविकांसाठी मुक्काम व भोजनाची सोय उपलब्ध आहे. कृपया आधी संपर्क करावा." en="Accommodation and food are available for devotees within the temple premises. Please contact us in advance." /></p>
              <div className="mt-7 space-y-3 border-t border-white/10 pt-6 text-sm"><div className="flex items-center justify-between"><span className="text-[#f8e7be]/55"><Bi lang={lang} mr="निवास सोय" en="Accommodation" /></span><span className="font-semibold text-[#e2b967]"><Bi lang={lang} mr="उपलब्ध" en="Available" /></span></div><div className="flex items-center justify-between"><span className="text-[#f8e7be]/55"><Bi lang={lang} mr="जेवणाची सोय" en="Meals" /></span><span className="font-semibold text-[#e2b967]"><Bi lang={lang} mr="उपलब्ध" en="Available" /></span></div><div className="flex items-center justify-between"><span className="text-[#f8e7be]/55"><Bi lang={lang} mr="आधी संपर्क" en="Advance contact" /></span><a href="tel:9775757375" className="font-semibold text-[#e2b967]">9775757375</a></div></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#2d0c0b] px-5 py-14 text-[#f8e7be] lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_.8fr_.8fr]">
          <div><div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d7a84c]/40 font-display text-xl text-[#e2b967]">ॐ</span><span className="font-display text-2xl text-[#ffe4a7]"><Bi lang={lang} mr="श्री गुरुदेव दत्त" en="Shri Gurudev Datta" /></span></div><p className="mt-5 max-w-sm text-sm leading-7 text-[#f8e7be]/60"><Bi lang={lang} mr="स्वयंभू श्री गुरुदेव दत्त देवस्थान, शिंगवे केशव — श्रद्धा, सेवा आणि समाधानाचे स्थान." en="Swayambhu Shri Gurudev Datta Devasthan, Shingave Keshav — a place of faith, service and serenity." /></p></div>
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d7a84c]"><Bi lang={lang} mr="जलद दुवे" en="Quick links" /></p><div className="mt-4 grid gap-2 text-sm text-[#f8e7be]/65">{navItems.slice(0, 4).map((item) => <a key={item.id} href={`#${item.id}`} className="transition hover:text-white"><Bi lang={lang} mr={item.mr} en={item.en} /></a>)}</div></div>
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d7a84c]"><Bi lang={lang} mr="संपर्क" en="Contact" /></p><div className="mt-4 space-y-3 text-sm text-[#f8e7be]/65"><a href="tel:9775757375" className="flex items-center gap-2 hover:text-white"><Phone size={15} /> 9775757375</a><a href="https://wa.me/919775757375" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white"><MessageCircle size={15} /> WhatsApp</a><button onClick={shareWebsite} className="flex items-center gap-2 hover:text-white"><Share2 size={15} /> {copied ? <Bi lang={lang} mr="लिंक कॉपी झाली" en="Link copied" /> : <Bi lang={lang} mr="वेबसाईट शेअर करा" en="Share website" />}</button></div></div>
        </div>
        <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-xs text-[#f8e7be]/40 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} <Bi lang={lang} mr="श्री गुरुदेव दत्त देवस्थान" en="Shri Gurudev Datta Devasthan" /></span><span className="font-display text-base text-[#d7a84c]">ॐ · <Bi lang={lang} mr="राम कृष्ण हरी" en="Ram Krishna Hari" /></span></div>
      </footer>

      <nav className="mobile-bottom-nav" aria-label="Mobile quick navigation">
        <a href="#top"><Sparkles size={18} /><span><Bi lang={lang} mr="मुख्य" en="Home" /></span></a>
        <a href="#darshan"><Clock3 size={18} /><span><Bi lang={lang} mr="दर्शन" en="Darshan" /></span></a>
        <a href="#fair"><CalendarDays size={18} /><span><Bi lang={lang} mr="यात्रा" en="Fair" /></span></a>
        <a href="#donation"><WalletCards size={18} /><span><Bi lang={lang} mr="देणगी" en="Donate" /></span></a>
        <a href="#reach"><MapPin size={18} /><span><Bi lang={lang} mr="मार्ग" en="Reach" /></span></a>
      </nav>

      <a href="https://wa.me/919775757375" target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-xl shadow-[#0c3e1f]/20 transition hover:-translate-y-1 hover:bg-[#1fbc5a]" aria-label="WhatsApp">
        <MessageCircle size={26} />
      </a>
      {showTop ? <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-24 right-5 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-[#ead9b8] bg-[#fffdf8] text-[#7d271c] shadow-lg" aria-label="Back to top"><ArrowUp size={18} /></button> : null}

      {lightbox ? <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#160706]/90 p-5 backdrop-blur-md" role="dialog" aria-modal="true" aria-label="Image preview" onClick={() => setLightbox(null)}><button onClick={() => setLightbox(null)} className="absolute right-5 top-5 rounded-full border border-white/20 p-2 text-white" aria-label="Close image"><X size={22} /></button><div onClick={(event) => event.stopPropagation()} className="max-h-[90vh] max-w-5xl"><img src={lightbox.src} alt={lightbox.mr} className="max-h-[80vh] w-auto rounded-2xl object-contain shadow-2xl" /><p className="mt-4 text-center font-display text-xl text-[#ffe4a7]"><Bi lang={lang} mr={lightbox.mr} en={lightbox.en} /></p></div></div> : null}
    </div>
  );
}
