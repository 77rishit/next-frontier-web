import { createFileRoute } from "@tanstack/react-router";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Atom,
  Bot,
  BrainCircuit,
  ChevronRight,
  CircleUserRound,
  Drone,
  FlaskConical,
  Home,
  Instagram,
  Linkedin,
  Menu,
  Orbit,
  ShieldCheck,
  Sparkles,
  Trophy,
  X,
  Youtube,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import competitionsImage from "../assets/festival-competitions.jpg";
import exhibitionsImage from "../assets/festival-exhibitions.jpg";
import lecturesImage from "../assets/festival-lectures.jpg";
import workshopsImage from "../assets/festival-workshops.jpg";
import heroImage from "../assets/techfest-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TECHFEST IIT Bombay — The Next Frontier" },
      {
        name: "description",
        content:
          "Enter TECHFEST IIT Bombay: three days of competitions, workshops, exhibitions and ideas shaping the next frontier.",
      },
      { property: "og:title", content: "TECHFEST IIT Bombay — The Next Frontier" },
      {
        property: "og:description",
        content: "Asia's largest science and technology festival returns to IIT Bombay, Mumbai.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TechfestPage,
});

const navItems = [
  { label: "Home", href: "#home", icon: Home },
  { label: "Events", href: "#events", icon: Zap },
  { label: "Workshops", href: "#explore", icon: FlaskConical },
  { label: "Competitions", href: "#events", icon: Trophy },
  { label: "About", href: "#legacy", icon: Orbit },
];

const pillars = [
  {
    number: "01",
    title: "Competitions",
    copy: "Challenge yourself against the brightest minds.",
    image: competitionsImage,
    alt: "Engineering students building a competition robot",
  },
  {
    number: "02",
    title: "Workshops",
    copy: "Learn directly from experts and innovators.",
    image: workshopsImage,
    alt: "Students learning electronics in an advanced workshop",
  },
  {
    number: "03",
    title: "Exhibitions",
    copy: "Step inside the technologies shaping tomorrow.",
    image: exhibitionsImage,
    alt: "Humanoid robotics and aerospace exhibition",
  },
  {
    number: "04",
    title: "Lectures",
    copy: "Ideas that redefine what's possible.",
    image: lecturesImage,
    alt: "Technology keynote in a dark auditorium",
  },
];

const domains = [
  { title: "Artificial Intelligence", code: "AI.01", icon: BrainCircuit, image: lecturesImage },
  { title: "Robotics", code: "RB.02", icon: Bot, image: competitionsImage },
  { title: "Space & Aerospace", code: "SP.03", icon: Orbit, image: exhibitionsImage },
  { title: "Drones", code: "DR.04", icon: Drone, image: heroImage },
  { title: "Cybersecurity", code: "CY.05", icon: ShieldCheck, image: workshopsImage },
  { title: "Quantum", code: "QT.06", icon: Atom, image: lecturesImage },
  { title: "Biotech", code: "BT.07", icon: FlaskConical, image: workshopsImage },
  { title: "Sustainability", code: "SU.08", icon: Sparkles, image: heroImage },
];

type EventCategory = "Competitions" | "Workshops" | "Exhibitions" | "Lectures";
const events: Array<{
  id: string;
  category: EventCategory;
  name: string;
  description: string;
  date: string;
  location: string;
  image: string;
  featured?: boolean;
}> = [
  {
    id: "01",
    category: "Competitions",
    name: "International Robowars",
    description: "Heavyweight machines collide in a high-stakes engineering spectacle.",
    date: "16 DEC",
    location: "ARENA 01",
    image: competitionsImage,
    featured: true,
  },
  {
    id: "02",
    category: "Workshops",
    name: "Autonomous Systems Lab",
    description: "Build intelligent machines that sense, decide and move.",
    date: "17 DEC",
    location: "LAB 04",
    image: workshopsImage,
  },
  {
    id: "03",
    category: "Exhibitions",
    name: "Tomorrow, Exhibited",
    description: "A living gallery of robotics, space systems and Indian innovation.",
    date: "ALL DAYS",
    location: "EXPO HALL",
    image: exhibitionsImage,
  },
  {
    id: "04",
    category: "Lectures",
    name: "Frontier Dialogues",
    description: "Researchers and builders decode the next technological decade.",
    date: "18 DEC",
    location: "CONVOCATION HALL",
    image: lecturesImage,
    featured: true,
  },
];

const timeline = [
  { year: "1998", title: "The beginning", copy: "Techfest begins at IIT Bombay as a student-led science and technology festival." },
  { year: "2005", title: "A wider platform", copy: "The festival grows into a meeting ground for competitions, exhibitions and ideas." },
  { year: "2015", title: "Technology in public", copy: "Large-scale showcases bring frontier research closer to a new generation." },
  { year: "2020", title: "A digital pivot", copy: "The community stays connected as programming moves beyond the physical campus." },
  { year: "2023", title: "Back on campus", copy: "The live festival returns with renewed energy across IIT Bombay." },
  { year: "2025", title: "The next chapter", copy: "A new generation of builders prepares to move the frontier forward." },
];

function TechfestPage() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [filter, setFilter] = useState<"All" | EventCategory>("All");
  const [scrolled, setScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.18], [0, prefersReducedMotion ? 0 : 130]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1.04, prefersReducedMotion ? 1.04 : 1.13]);
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), prefersReducedMotion ? 150 : 1500);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("main section[id]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)),
      { rootMargin: "-35% 0px -55%", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="tf-page"
      onPointerMove={(event) => {
        pointerX.set((event.clientX / window.innerWidth) * 100);
        pointerY.set((event.clientY / window.innerHeight) * 100);
      }}
    >
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>
      <motion.div
        aria-hidden="true"
        className="pointer-glow"
        style={{ left: useTransform(pointerX, (v) => `${v}%`), top: useTransform(pointerY, (v) => `${v}%`) }}
      />
      <TopNav scrolled={scrolled} menuOpen={menuOpen} onMenu={() => setMenuOpen((value) => !value)} />
      <SideRails activeSection={activeSection} />
      <AnimatePresence>{menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}</AnimatePresence>

      <main>
        <section id="home" className="hero-section">
          <motion.div className="hero-image-wrap" style={{ y: heroY, scale: heroScale }}>
            <img src={heroImage} alt="A near-future Mumbai illuminated by technology" width={1920} height={1080} fetchPriority="high" />
          </motion.div>
          <div className="hero-shade" />
          <div className="hero-grid" />
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />
          <div className="hero-content">
            <motion.p className="eyebrow" initial={{ opacity: 0, y: 18 }} animate={{ opacity: loading ? 0 : 1, y: loading ? 18 : 0 }} transition={{ delay: 0.15 }}>
              <span /> IIT Bombay presents <span />
            </motion.p>
            <h1 className="hero-title" aria-label="Techfest">
              <motion.span initial={{ y: 120, opacity: 0 }} animate={{ y: loading ? 120 : 0, opacity: loading ? 0 : 1 }} transition={{ duration: 0.9, delay: 0.12 }}>TECH</motion.span>
              <motion.span className="hero-title-outline" initial={{ y: 120, opacity: 0 }} animate={{ y: loading ? 120 : 0, opacity: loading ? 0 : 1 }} transition={{ duration: 0.9, delay: 0.22 }}>FEST</motion.span>
            </h1>
            <motion.div className="hero-manifest" initial={{ opacity: 0 }} animate={{ opacity: loading ? 0 : 1 }} transition={{ delay: 0.7 }}>
              <div>
                <p className="micro-label">Festival signal</p>
                <p className="hero-subtitle">The Next Frontier</p>
                <p className="hero-description">Asia&apos;s Largest Science &amp; Technology Festival</p>
              </div>
              <div className="hero-meta">
                <div><span>16 — 18</span><small>December</small></div>
                <div><span>IIT Bombay</span><small>Mumbai · India</small></div>
              </div>
            </motion.div>
            <motion.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: loading ? 0 : 1, y: loading ? 20 : 0 }} transition={{ delay: 0.85 }}>
              <MagneticLink href="#explore" primary>Explore Techfest</MagneticLink>
              <MagneticLink href="#events">Enter the future <ArrowRight size={15} /></MagneticLink>
            </motion.div>
          </div>
          <div className="hero-index"><span>TF / 26</span><span>19.1334° N</span><span>72.9133° E</span></div>
          <a className="scroll-cue" href="#scale"><span>Scroll to discover</span><i /></a>
        </section>

        <section id="scale" className="section-shell scale-section">
          <SectionLabel index="01" text="Magnitude" />
          <Reveal><h2 className="section-title">Built at <span>scale.</span></h2></Reveal>
          <div className="stats-grid">
            <Stat value={175} suffix="K+" label="Participants" />
            <Stat value={500} suffix="+" label="Colleges" />
            <Stat value={200} suffix="+" label="Events" />
            <Stat value={25} suffix="+" label="Years" />
          </div>
        </section>

        <section id="explore" className="section-shell explore-section">
          <SectionLabel index="02" text="Festival architecture" />
          <div className="title-row">
            <Reveal><h2 className="section-title">More than<br /><span>a festival.</span></h2></Reveal>
            <p className="section-intro">Four worlds. One campus. A collision of competition, craft, discovery and ideas.</p>
          </div>
          <div className="pillar-grid">
            {pillars.map((pillar) => <PillarCard key={pillar.number} {...pillar} />)}
          </div>
        </section>

        <section id="domains" className="domains-section">
          <div className="section-shell domain-heading">
            <SectionLabel index="03" text="Domain index" />
            <div className="title-row">
              <Reveal><h2 className="section-title">The frontier<br /><span>of technology.</span></h2></Reveal>
              <div className="drag-cue"><ArrowRight size={16} /><span>Scroll to traverse</span></div>
            </div>
          </div>
          <div className="domain-track">
            {domains.map((domain, index) => <DomainCard key={domain.code} {...domain} index={index} />)}
          </div>
        </section>

        <section id="events" className="section-shell event-section">
          <SectionLabel index="04" text="Event transmission" />
          <div className="title-row event-title-row">
            <Reveal><h2 className="section-title">Enter the <span>arena.</span></h2></Reveal>
            <div className="filter-tabs" role="tablist" aria-label="Filter events">
              {(["All", "Competitions", "Workshops", "Exhibitions", "Lectures"] as const).map((item) => (
                <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)} role="tab" aria-selected={filter === item}>{item}</button>
              ))}
            </div>
          </div>
          <motion.div layout className="events-grid">
            <AnimatePresence mode="popLayout">
              {events.filter((event) => filter === "All" || event.category === filter).map((event) => <EventCard key={event.id} event={event} />)}
            </AnimatePresence>
          </motion.div>
        </section>

        <section id="legacy" className="legacy-section">
          <div className="section-shell">
            <SectionLabel index="05" text="Archive / 1998—2025" />
            <div className="title-row">
              <Reveal><h2 className="section-title">A legacy of<br /><span>innovation.</span></h2></Reveal>
              <p className="section-intro">A student-built festival that kept expanding the boundaries of what a campus could create.</p>
            </div>
          </div>
          <div className="timeline-track">
            {timeline.map((item, index) => (
              <motion.article className="timeline-item" key={item.year} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-15%" }} transition={{ delay: index * 0.07 }}>
                <span className="timeline-node" />
                <p className="timeline-year">{item.year}</p>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="location" className="section-shell location-section">
          <div className="location-copy">
            <SectionLabel index="06" text="Coordinates / Powai" />
            <Reveal><h2 className="location-title">IIT Bombay<span>Mumbai, India</span></h2></Reveal>
            <p>At the edge of Powai Lake, inside one of India&apos;s most inventive campuses.</p>
            <div className="coordinate-row"><span>19.1334° N</span><span>72.9133° E</span><span>GMT +5:30</span></div>
          </div>
          <CampusMap />
        </section>

        <section id="future" className="final-section">
          <div className="final-grid" />
          <div className="particles" aria-hidden="true">{Array.from({ length: 18 }).map((_, index) => <i key={index} style={{ "--i": index } as React.CSSProperties} />)}</div>
          <SectionLabel index="07" text="Final transmission" />
          <Reveal>
            <h2>The future<br /><span>doesn&apos;t wait.</span><strong>Build it.</strong></h2>
          </Reveal>
          <MagneticLink href="#home" primary>Enter Techfest <ArrowRight size={18} /></MagneticLink>
          <p className="final-coordinates">TF.2026 // POWAI // MUMBAI // INDIA</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Loader() {
  return (
    <motion.div className="loader" exit={{ opacity: 0 }} transition={{ duration: 0.55 }}>
      <div className="loader-mark"><span>TECHFEST</span><small>IIT BOMBAY</small></div>
      <div className="loader-progress"><motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.15, ease: "easeInOut" }} /></div>
      <p>Initializing the future...</p>
    </motion.div>
  );
}

function TopNav({ scrolled, menuOpen, onMenu }: { scrolled: boolean; menuOpen: boolean; onMenu: () => void }) {
  return (
    <header className={`top-nav ${scrolled ? "scrolled" : ""}`}>
      <a href="#home" className="brand"><span>TF</span><i /><div><strong>TECHFEST</strong><small>IIT BOMBAY</small></div></a>
      <nav aria-label="Main navigation">{["Events", "Competitions", "Workshops", "Initiatives", "About"].map((item) => <a key={item} href={item === "About" ? "#legacy" : item === "Initiatives" ? "#domains" : item === "Events" ? "#events" : "#explore"}>{item}</a>)}</nav>
      <a className="sign-in" href="#future"><CircleUserRound size={15} /> Sign in</a>
      <button className="menu-trigger" onClick={onMenu} aria-label={menuOpen ? "Close navigation" : "Open navigation"}>{menuOpen ? <X /> : <Menu />}</button>
    </header>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return <motion.div className="mobile-menu" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28 }}>
    <p>Navigate / TF.26</p>
    {navItems.map((item, index) => <a href={item.href} key={item.label} onClick={onClose}><span>0{index + 1}</span>{item.label}<ArrowRight /></a>)}
  </motion.div>;
}

function SideRails({ activeSection }: { activeSection: string }) {
  return <>
    <aside className="left-rail" aria-label="Section navigation">
      {navItems.map(({ label, href, icon: Icon }) => {
        const target = href.slice(1);
        return <a key={label} href={href} className={activeSection === target ? "active" : ""} aria-label={label}><Icon size={15} /><span>{label}</span></a>;
      })}
    </aside>
    <aside className="right-rail" aria-label="Social links">
      <a href="https://instagram.com/techfest_iitbombay" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram /></a>
      <a href="https://x.com/Techfest_IITB" target="_blank" rel="noreferrer" aria-label="X"><X /></a>
      <a href="https://linkedin.com/company/techfest" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
      <a href="https://youtube.com/@techfestiitbombay" target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube /></a>
      <span>Connect / 05</span>
    </aside>
  </>;
}

function MagneticLink({ href, primary, children }: { href: string; primary?: boolean; children: ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  return <motion.a ref={ref} href={href} className={`tf-button ${primary ? "primary" : ""}`} style={{ x, y }} onPointerMove={(event) => {
    const rect = ref.current?.getBoundingClientRect(); if (!rect) return;
    x.set((event.clientX - rect.left - rect.width / 2) * 0.12); y.set((event.clientY - rect.top - rect.height / 2) * 0.12);
  }} onPointerLeave={() => { x.set(0); y.set(0); }}>{children}<i /></motion.a>;
}

function SectionLabel({ index, text }: { index: string; text: string }) {
  return <div className="section-label"><span>{index}</span><i />{text}</div>;
}

function Reveal({ children }: { children: ReactNode }) {
  return <motion.div initial={{ opacity: 0, y: 38 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-12%" }} transition={{ duration: 0.7 }}>{children}</motion.div>;
}

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null); const inView = useInView(ref, { once: true }); const [count, setCount] = useState(0);
  useEffect(() => { if (!inView) return; let frame = 0; const start = performance.now(); const run = (now: number) => { const p = Math.min((now - start) / 1300, 1); setCount(Math.floor(value * (1 - Math.pow(1 - p, 3)))); if (p < 1) frame = requestAnimationFrame(run); }; frame = requestAnimationFrame(run); return () => cancelAnimationFrame(frame); }, [inView, value]);
  return <div ref={ref} className="stat"><p>{count}<span>{suffix}</span></p><i /><small>{label}</small></div>;
}

function PillarCard({ number, title, copy, image, alt }: (typeof pillars)[number]) {
  return <motion.article className="pillar-card" whileHover={{ y: -8 }} transition={{ duration: 0.25 }}>
    <img src={image} alt={alt} loading="lazy" width={1024} height={768} />
    <div className="pillar-shade" /><span className="pillar-number">{number}</span>
    <div className="pillar-copy"><p>Festival vector</p><h3>{title}</h3><span>{copy}</span></div>
    <button aria-label={`Explore ${title}`}><ArrowRight /></button><i className="corner tl" /><i className="corner br" />
  </motion.article>;
}

function DomainCard({ title, code, icon: Icon, image, index }: (typeof domains)[number] & { index: number }) {
  return <article className="domain-card">
    <img src={image} alt="" loading="lazy" width={1024} height={768} />
    <div className="domain-overlay" /><span className="domain-code">{code}</span><Icon className="domain-icon" />
    <div><small>Frontier / 0{index + 1}</small><h3>{title}</h3><a href="#events">Explore domain <ArrowRight /></a></div>
  </article>;
}

function EventCard({ event }: { event: (typeof events)[number] }) {
  return <motion.article layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className={`event-card ${event.featured ? "featured" : ""}`}>
    <img src={event.image} alt="" loading="lazy" width={1024} height={768} /><div className="event-shade" />
    <div className="event-top"><span>Event {event.id}</span><span>{event.category}</span></div>
    <div className="event-copy"><h3>{event.name}</h3><p>{event.description}</p><div><span>{event.date}</span><i /><span>{event.location}</span></div><a href="#future">Explore <ArrowRight /></a></div>
  </motion.article>;
}

function CampusMap() {
  return <div className="campus-map" aria-label="Stylized map of IIT Bombay in Powai, Mumbai">
    <svg viewBox="0 0 700 540" role="img" aria-label="Technical coordinate map centered on IIT Bombay">
      <defs><pattern id="map-grid" width="34" height="34" patternUnits="userSpaceOnUse"><path d="M34 0H0V34" fill="none" className="map-grid-line" /></pattern><filter id="map-glow"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
      <rect width="700" height="540" fill="url(#map-grid)" />
      <path className="lake-line" d="M-20 132C90 89 165 149 239 107S399 65 482 111s151 14 243-45" />
      <path className="road-line" d="M58 497L171 352l81-38 90-117 111-40 93-95" />
      <path className="road-line secondary" d="M95 72l139 111 117 34 167 169 134 53" />
      <circle className="target-ring" cx="352" cy="255" r="68" /><circle className="target-ring delay" cx="352" cy="255" r="38" />
      <g filter="url(#map-glow)"><rect className="map-marker" x="344" y="247" width="16" height="16" transform="rotate(45 352 255)" /></g>
      <text x="374" y="244" className="map-label">IIT BOMBAY</text><text x="374" y="263" className="map-sub">POWAI CAMPUS / NODE 01</text>
      <text x="74" y="112" className="map-sub">POWAI LAKE</text><text x="518" y="422" className="map-sub">MUMBAI</text>
    </svg>
    <div className="map-hud"><span>Satellite grid</span><strong>Online</strong></div>
  </div>;
}

function Footer() {
  return <footer className="footer">
    <div className="footer-brand"><strong>TECHFEST</strong><span>IIT BOMBAY</span></div>
    <nav aria-label="Footer navigation"><a href="#events">Events</a><a href="#explore">Competitions</a><a href="#explore">Workshops</a><a href="#legacy">About</a><a href="mailto:info@techfest.org">Contact</a></nav>
    <div className="footer-base"><span>© TECHFEST, IIT BOMBAY</span><span>THE NEXT FRONTIER</span><span>MUMBAI / INDIA</span></div>
  </footer>;
}