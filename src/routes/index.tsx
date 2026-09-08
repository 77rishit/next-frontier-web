import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, Atom, Bot, BrainCircuit, ChevronRight, CircleUserRound, Code2, Cpu, Database, Drone, FlaskConical, Gauge, Home, Instagram, Linkedin, Menu, MessageCircle, Microscope, Orbit, Radio, Satellite, ShieldCheck, Sparkles, Trophy, Users, X, Youtube, Zap } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type ComponentType, type ReactNode } from "react";

import arenaImage from "../assets/arena-world.jpg";
import competitionsImage from "../assets/festival-competitions.jpg";
import exhibitionsImage from "../assets/festival-exhibitions.jpg";
import lecturesImage from "../assets/festival-lectures.jpg";
import workshopsImage from "../assets/festival-workshops.jpg";
import heroImage from "../assets/citadel-hero.jpg";
import labImage from "../assets/laboratory-world.jpg";
import powaiImage from "../assets/powai-world.jpg";
import teamImage from "../assets/team-command.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TECHFEST 2026 — The Next Frontier" },
      { name: "description", content: "Enter TECHFEST 2026 at IIT Bombay: a cinematic world of competitions, workshops, exhibitions and frontier technology." },
      { property: "og:title", content: "TECHFEST 2026 — The Next Frontier" },
      { property: "og:description", content: "Enter the world of TECHFEST IIT Bombay, 16–18 December 2026." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TechfestPage,
});

type EventCategory = "Competitions" | "Workshops" | "Exhibitions" | "Lectures";
const navItems = [
  { label: "Home", href: "#home", icon: Home }, { label: "Events", href: "#events", icon: Zap },
  { label: "Workshops", href: "#workshops", icon: FlaskConical }, { label: "Competitions", href: "#competitions", icon: Trophy },
  { label: "Team", href: "#team", icon: Users }, { label: "About", href: "#legacy", icon: Orbit },
];
const socialItems: Array<{ icon: ComponentType; label: string; href: string }> = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/techfest_iitbombay" },
  { icon: X, label: "X", href: "https://x.com/Techfest_IITB" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/techfest" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com/@techfestiitbombay" },
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/" },
];
const pillars = [
  { number: "01", title: "Competitions", copy: "Build under pressure. Challenge the field. Earn your place in the arena.", image: competitionsImage, alt: "Engineering students assembling a competition robot" },
  { number: "02", title: "Workshops", copy: "Enter live laboratories guided by researchers and frontier builders.", image: labImage, alt: "Engineers working with a humanoid robot in a futuristic laboratory" },
  { number: "03", title: "Exhibitions", copy: "Encounter machines, missions and prototypes that turn research into reality.", image: exhibitionsImage, alt: "Robotics and aerospace technology exhibition" },
  { number: "04", title: "Lectures", copy: "Listen to the minds translating impossible questions into new futures.", image: lecturesImage, alt: "A cinematic science keynote in a dark auditorium" },
];
const domains = [
  { title: "Artificial Intelligence", code: "AI.01", icon: BrainCircuit, image: lecturesImage },
  { title: "Robotics", code: "RB.02", icon: Bot, image: labImage },
  { title: "Space", code: "SP.03", icon: Satellite, image: heroImage },
  { title: "Drones", code: "DR.04", icon: Drone, image: arenaImage },
  { title: "Cybersecurity", code: "CY.05", icon: ShieldCheck, image: workshopsImage },
  { title: "Quantum", code: "QT.06", icon: Atom, image: lecturesImage },
  { title: "Biotech", code: "BT.07", icon: Microscope, image: labImage },
  { title: "Sustainability", code: "SU.08", icon: Sparkles, image: powaiImage },
];
const events: Array<{ id: string; category: EventCategory; name: string; description: string; date: string; location: string; image: string; featured?: boolean }> = [
  { id: "01", category: "Competitions", name: "International Robowars", description: "Heavyweight machines collide in a high-voltage engineering spectacle.", date: "16 DEC", location: "ARENA 01", image: arenaImage, featured: true },
  { id: "02", category: "Workshops", name: "Autonomous Systems Lab", description: "Build machines that perceive, decide and move through the physical world.", date: "17 DEC", location: "LAB 04", image: labImage },
  { id: "03", category: "Exhibitions", name: "Tomorrow, Exhibited", description: "A living gallery of robotics, space systems and Indian innovation.", date: "ALL DAYS", location: "EXPO HALL", image: exhibitionsImage },
  { id: "04", category: "Lectures", name: "Frontier Dialogues", description: "Researchers and builders decode the next technological decade.", date: "18 DEC", location: "CONVOCATION HALL", image: lecturesImage, featured: true },
];
const workshops = [
  { code: "AI", title: "Applied Intelligence", duration: "6 HOURS", level: "INTERMEDIATE", icon: BrainCircuit },
  { code: "DS", title: "Data Systems", duration: "4 HOURS", level: "FOUNDATION", icon: Database },
  { code: "RB", title: "Robotic Perception", duration: "8 HOURS", level: "ADVANCED", icon: Bot },
  { code: "CY", title: "Cyber Defence", duration: "5 HOURS", level: "INTERMEDIATE", icon: ShieldCheck },
  { code: "BX", title: "Venture Systems", duration: "3 HOURS", level: "FOUNDATION", icon: Gauge },
  { code: "EN", title: "Future Engineering", duration: "7 HOURS", level: "ADVANCED", icon: Cpu },
];
const competitions = [
  { id: "01", title: "Robowars", prize: "₹1.5M POOL", team: "2–6", deadline: "30 NOV" },
  { id: "02", title: "Drone Challenge", prize: "₹600K POOL", team: "2–4", deadline: "28 NOV" },
  { id: "03", title: "Code The Future", prize: "₹400K POOL", team: "1–4", deadline: "02 DEC" },
];
const timeline = [
  { year: "1998", title: "The beginning", copy: "Techfest begins at IIT Bombay as a student-led science and technology festival." },
  { year: "2002", title: "A wider horizon", copy: "Its platform grows across competitions, exhibitions, lectures and hands-on learning." },
  { year: "2015", title: "Expansion", copy: "A larger international community gathers around ambitious technology and public science." },
  { year: "2020", title: "Technology at scale", copy: "Digital programming keeps the community connected beyond the physical campus." },
  { year: "2023", title: "A new era", copy: "The live festival returns to IIT Bombay with a renewed generation of builders." },
  { year: "2025", title: "The future arrives", copy: "The next chapter forms at the meeting point of science, culture and collective ambition." },
];
const team = [
  { id: "TF-C01", name: "Aarav Mehta", role: "Overall Coordinator", group: "Core Team", position: "12% 44%" },
  { id: "TF-T04", name: "Mira Nair", role: "Technical Lead", group: "Technical Team", position: "39% 44%" },
  { id: "TF-R07", name: "Rohan Iyer", role: "Creative Lead", group: "Creative Team", position: "66% 44%" },
  { id: "TF-O11", name: "Anika Rao", role: "Operations Lead", group: "Operations", position: "91% 44%" },
];
const cities = [
  { name: "Delhi", x: 43, y: 25 }, { name: "Mumbai", x: 29, y: 57 }, { name: "Pune", x: 32, y: 61 },
  { name: "Hyderabad", x: 47, y: 63 }, { name: "Bengaluru", x: 44, y: 76 }, { name: "Chennai", x: 54, y: 77 }, { name: "Kolkata", x: 69, y: 48 },
];

function TechfestPage() {
  const [loading, setLoading] = useState(true); const [menuOpen, setMenuOpen] = useState(false); const [activeSection, setActiveSection] = useState("home"); const [filter, setFilter] = useState<"All" | EventCategory>("All"); const [teamFilter, setTeamFilter] = useState("Core Team");
  const reduce = useReducedMotion(); const { scrollYProgress } = useScroll(); const smooth = useSpring(scrollYProgress, { stiffness: 85, damping: 24 });
  const heroBackY = useTransform(smooth, [0, .12], [0, reduce ? 0 : 110]); const heroMidY = useTransform(smooth, [0, .12], [0, reduce ? 0 : 190]);
  const timelineRef = useRef<HTMLElement>(null); const { scrollYProgress: timelineProgress } = useScroll({ target: timelineRef, offset: ["start 70%", "end 35%"] });
  const pointerX = useMotionValue(0); const pointerY = useMotionValue(0); const lightX = useSpring(pointerX, { stiffness: 75, damping: 22 }); const lightY = useSpring(pointerY, { stiffness: 75, damping: 22 });
  useEffect(() => { const timer = window.setTimeout(() => setLoading(false), reduce ? 100 : 2100); return () => clearTimeout(timer); }, [reduce]);
  useEffect(() => { const nodes = document.querySelectorAll<HTMLElement>("main section[id]"); const observer = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id)), { rootMargin: "-38% 0px -52%" }); nodes.forEach((n) => observer.observe(n)); return () => observer.disconnect(); }, []);
  return <div className="tf-world" onPointerMove={(e) => { if (window.innerWidth < 900) return; pointerX.set((e.clientX / window.innerWidth - .5) * 18); pointerY.set((e.clientY / window.innerHeight - .5) * 18); }}>
    <AnimatePresence>{loading && <Loader />}</AnimatePresence>
    <TopNav menuOpen={menuOpen} onMenu={() => setMenuOpen(!menuOpen)} />
    <SideRails activeSection={activeSection} />
    <AnimatePresence>{menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}</AnimatePresence>
    <main>
      <section id="home" className="hero chapter">
        <motion.div className="environment-image hero-environment" style={{ y: heroBackY }}><img src={heroImage} alt="A futuristic technology civilization surrounding Powai Lake and Mumbai" width={1920} height={1088} fetchPriority="high" /></motion.div>
        <motion.div className="hero-middle" style={{ x: lightX, y: heroMidY }}><span className="hero-arc a"/><span className="hero-arc b"/><span className="signal-tower"/></motion.div>
        <div className="atmosphere"/><ParticleField count={26}/><div className="hero-hud" aria-hidden="true"/>
        <div className="hero-content">
          <motion.p className="overline" initial={{ opacity: 0 }} animate={{ opacity: loading ? 0 : 1 }} transition={{ delay: .25 }}>IIT Bombay presents</motion.p>
          <div className="hero-lockup">
            <motion.span className="edition" initial={{ opacity: 0, x: -18 }} animate={{ opacity: loading ? 0 : 1, x: 0 }} transition={{ delay: .5 }}>2026</motion.span>
            <h1 aria-label="Techfest"><motion.span initial={{ y: "110%" }} animate={{ y: loading ? "110%" : 0 }} transition={{ duration: .95, delay: .35 }}>TECHFEST</motion.span></h1>
            <motion.p className="hero-theme" initial={{ opacity: 0, y: 14 }} animate={{ opacity: loading ? 0 : 1, y: 0 }} transition={{ delay: 1 }}>The Next Frontier</motion.p>
          </div>
          <motion.div className="hero-transmission" initial={{ opacity: 0, y: 20 }} animate={{ opacity: loading ? 0 : 1, y: 0 }} transition={{ delay: 1.18 }}>
            <div><small>Transmission date</small><strong>16 — 18 December</strong></div><i/><div><small>Origin node</small><strong>IIT Bombay · Mumbai</strong></div>
          </motion.div>
          <motion.p className="hero-tagline" initial={{ opacity: 0 }} animate={{ opacity: loading ? 0 : 1 }} transition={{ delay: 1.3 }}>Asia&apos;s largest science &amp; technology festival</motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 22 }} animate={{ opacity: loading ? 0 : 1, y: 0 }} transition={{ delay: 1.45 }}><MagneticLink href="#explore" primary>Explore Techfest <ArrowRight/></MagneticLink><MagneticLink href="#future">Register now</MagneticLink></motion.div>
        </div>
        <div className="hero-telemetry left">NODE // 19.1334° N<br/>SIGNAL // ACTIVE</div><div className="hero-telemetry right">CIVILIZATION // 26<br/>UPLINK // 72.9133° E</div>
        <a className="scroll-cue" href="#scale"><span>Scroll to explore</span><i/><ArrowDown/></a>
      </section>

      <section id="scale" className="chapter scale-world"><ChapterBackdrop variant="control"/><div className="chapter-inner"><SectionLabel index="01" text="Civilization telemetry"/><Reveal><h2 className="display-title">Built at <span>scale.</span></h2></Reveal><div className="stats-grid"><Stat value={175} suffix="K+" label="Participants"/><Stat value={500} suffix="+" label="Colleges"/><Stat value={200} suffix="+" label="Events"/><Stat value={25} suffix="+" label="Years"/></div><div className="terminal-strip"><span>GRID / ONLINE</span><span>MUMBAI NODE / STABLE</span><span>CAPACITY / EXPANDING</span></div></div></section>

      <section id="explore" className="chapter explore-world"><div className="environment-image"><img src={exhibitionsImage} alt="Futuristic technology observatory and exhibition environment" loading="lazy" width={1536} height={1024}/></div><div className="atmosphere"/><div className="chapter-inner"><SectionLabel index="02" text="Four portals"/><div className="heading-grid"><Reveal><h2 className="display-title">Enter the<br/><span>experience.</span></h2></Reveal><p>Four engineered gateways lead deeper into the world of TECHFEST.</p></div><div className="pillar-grid">{pillars.map((p)=><PillarCard key={p.number} {...p}/>)}</div></div></section>

      <section id="domains" className="chapter frontier-world"><ChapterBackdrop variant="frontier"/><div className="chapter-inner heading-only"><SectionLabel index="03" text="Technology constellations"/><div className="heading-grid"><Reveal><h2 className="display-title">The <span>frontier.</span></h2></Reveal><p>Traverse eight fields changing how humanity thinks, moves and builds.</p></div></div><div className="domain-track">{domains.map((d,i)=><DomainCard key={d.code} {...d} index={i}/>)}</div></section>

      <section id="events" className="chapter arena-world"><div className="environment-image"><img src={arenaImage} alt="Futuristic technology competition arena in Mumbai" loading="lazy" width={1536} height={1024}/></div><div className="atmosphere"/><div className="chapter-inner"><SectionLabel index="04" text="Live arena"/><div className="heading-grid"><Reveal><h2 className="display-title">Enter the <span>arena.</span></h2></Reveal><div className="filter-tabs" role="tablist" aria-label="Filter featured events">{(["All","Competitions","Workshops","Exhibitions","Lectures"] as const).map(x=><button key={x} className={filter===x?"active":""} onClick={()=>setFilter(x)} role="tab" aria-selected={filter===x}>{x}</button>)}</div></div><motion.div layout className="events-grid"><AnimatePresence mode="popLayout">{events.filter(e=>filter==="All"||e.category===filter).map(e=><EventCard key={e.id} event={e}/>)}</AnimatePresence></motion.div></div></section>

      <section id="workshops" className="chapter lab-world"><div className="environment-image"><img src={labImage} alt="Futuristic robotics and engineering laboratory" loading="lazy" width={1536} height={1024}/></div><div className="atmosphere lab-shade"/><div className="chapter-inner"><SectionLabel index="05" text="Laboratory wing"/><div className="heading-grid"><Reveal><h2 className="display-title">Learn from<br/><span>the future.</span></h2></Reveal><p>Hands-on intensives designed around real tools, real systems and ambitious questions.</p></div><div className="workshop-grid">{workshops.map((w,i)=><WorkshopCard key={w.code} {...w} index={i}/>)}</div></div></section>

      <section id="competitions" className="chapter competition-world"><ChapterBackdrop variant="arena"/><div className="chapter-inner"><SectionLabel index="06" text="Challenge protocol"/><div className="heading-grid"><Reveal><h2 className="display-title">Challenge<br/><span>the limits.</span></h2></Reveal><p>Select a field. Assemble your team. Enter the pressure chamber.</p></div><div className="competition-stack">{competitions.map((c,i)=><CompetitionCard key={c.id} {...c} index={i}/>)}</div></div></section>

      <section id="legacy" ref={timelineRef} className="chapter legacy-world"><div className="chapter-inner"><SectionLabel index="07" text="Archive / 1998—2025"/><div className="heading-grid"><Reveal><h2 className="display-title">A legacy of<br/><span>innovation.</span></h2></Reveal><p>Built by students, expanded by every generation that refused to accept the edge as a limit.</p></div><div className="timeline"><motion.div className="timeline-energy" style={{ scaleY: timelineProgress }}/>{timeline.map((t,i)=><TimelineItem key={t.year} item={t} index={i}/>)}</div></div></section>

      <section id="team" className="chapter team-world"><div className="environment-image"><img src={teamImage} alt="Representative portrait of the TECHFEST 2026 organizing team" loading="lazy" width={1536} height={1024}/></div><div className="atmosphere team-shade"/><div className="chapter-inner"><SectionLabel index="08" text="Command personnel"/><div className="heading-grid"><Reveal><h2 className="display-title">The people<br/><span>behind the future.</span></h2></Reveal><div className="team-tabs">{["Core Team","Technical Team","Creative Team","Operations"].map(g=><button key={g} className={teamFilter===g?"active":""} onClick={()=>setTeamFilter(g)}>{g}</button>)}</div></div><div className="team-grid">{team.map((m,i)=><TeamCard key={m.id} member={m} index={i} active={m.group===teamFilter}/>)}</div></div></section>

      <section id="india" className="chapter india-world"><ChapterBackdrop variant="network"/><div className="chapter-inner india-layout"><div><SectionLabel index="09" text="National network"/><Reveal><h2 className="display-title">From India<br/><span>to the world.</span></h2></Reveal><p className="lead">Seven active city nodes. One shared technology network. Infinite directions forward.</p><div className="network-status"><Radio/><span>India&apos;s technology network</span><strong>Online</strong></div></div><IndiaNetwork/></div></section>

      <section id="location" className="chapter powai-world"><div className="environment-image"><img src={powaiImage} alt="Atmospheric future view of IIT Bombay and Powai Lake" loading="lazy" width={1536} height={1024}/></div><div className="atmosphere powai-shade"/><div className="chapter-inner powai-copy"><SectionLabel index="10" text="Origin coordinates"/><Reveal><h2 className="display-title">Where<br/><span>innovation</span><br/>begins.</h2></Reveal><div className="location-frame"><strong>IIT Bombay</strong><span>Powai, Mumbai</span><i/><small>19.1334° N</small><small>72.9133° E</small></div></div></section>

      <section id="future" className="chapter final-world"><ChapterBackdrop variant="final"/><ParticleField count={20}/><div className="chapter-inner final-copy"><SectionLabel index="11" text="Final transmission"/><Reveal><h2>The future<br/><span>doesn&apos;t wait.</span><strong>Build it.</strong></h2></Reveal><p>TECHFEST · IIT BOMBAY · 2026</p><MagneticLink href="#home" primary>Enter Techfest <ArrowRight/></MagneticLink></div></section>
    </main><Footer/>
  </div>;
}

function Loader(){return <motion.div className="loader" exit={{opacity:0,scale:1.02}} transition={{duration:.7}}><div className="loader-reticle"><span>TF</span><i/><i/></div><div className="loader-mark"><strong>TECHFEST</strong><small>IIT Bombay // 2026</small></div><div className="loader-lines"><motion.i initial={{scaleX:0}} animate={{scaleX:1}} transition={{duration:1.4,ease:"easeInOut"}}/><motion.i initial={{scaleX:0}} animate={{scaleX:1}} transition={{duration:1.4,delay:.25,ease:"easeInOut"}}/></div><p>Awakening the frontier</p></motion.div>}
function TopNav({menuOpen,onMenu}:{menuOpen:boolean;onMenu:()=>void}){return <header className="top-nav"><a href="#home" className="brand"><span>TF</span><div><strong>TECHFEST</strong><small>IIT BOMBAY // 2026</small></div></a><nav aria-label="Main navigation">{[["Events","#events"],["Workshops","#workshops"],["Competitions","#competitions"],["Initiatives","#domains"],["About","#legacy"]].map(([n,h])=><a href={h} key={n}>{n}</a>)}</nav><a className="sign-in" href="#future"><CircleUserRound/>Sign in</a><button className="menu-trigger" onClick={onMenu} aria-label={menuOpen?"Close navigation":"Open navigation"}>{menuOpen?<X/>:<Menu/>}</button></header>}
function SideRails({activeSection}:{activeSection:string}){return <><aside className="left-rail" aria-label="Section navigation"><div className="rail-brand">TF</div>{navItems.map(({label,href,icon:Icon})=><a key={label} href={href} className={activeSection===href.slice(1)?"active":""} aria-label={label}><Icon/><span>{label}</span></a>)}</aside><aside className="right-rail" aria-label="Social links">{socialItems.map(({icon:Icon,label,href})=><a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}><Icon/></a>)}<span>Signal / 05</span></aside></>}
function MobileMenu({onClose}:{onClose:()=>void}){return <motion.div className="mobile-menu" initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} transition={{type:"spring",damping:28}}><p>Navigate // TF.26</p>{navItems.map((n,i)=><a key={n.label} href={n.href} onClick={onClose}><span>0{i+1}</span>{n.label}<ArrowRight/></a>)}</motion.div>}
function MagneticLink({href,primary,children}:{href:string;primary?:boolean;children:ReactNode}){const ref=useRef<HTMLAnchorElement>(null);const x=useMotionValue(0),y=useMotionValue(0);return <motion.a ref={ref} href={href} className={`tf-button ${primary?"primary":""}`} style={{x,y}} onPointerMove={e=>{const r=ref.current?.getBoundingClientRect();if(!r)return;x.set((e.clientX-r.left-r.width/2)*.1);y.set((e.clientY-r.top-r.height/2)*.1)}} onPointerLeave={()=>{x.set(0);y.set(0)}}><span>{children}</span><i/></motion.a>}
function SectionLabel({index,text}:{index:string;text:string}){return <div className="section-label"><b>{index}</b><i/>{text}<span>◈</span></div>}
function Reveal({children}:{children:ReactNode}){return <motion.div initial={{opacity:0,y:50,clipPath:"inset(0 0 100% 0)"}} whileInView={{opacity:1,y:0,clipPath:"inset(0 0 0% 0)"}} viewport={{once:true,margin:"-10%"}} transition={{duration:.85,ease:[.22,1,.36,1]}}>{children}</motion.div>}
function Stat({value,suffix,label}:{value:number;suffix:string;label:string}){const ref=useRef<HTMLDivElement>(null);const visible=useInView(ref,{once:true});const [count,setCount]=useState(0);useEffect(()=>{if(!visible)return;let id=0;const start=performance.now();const run=(now:number)=>{const p=Math.min((now-start)/1400,1);setCount(Math.floor(value*(1-Math.pow(1-p,3))));if(p<1)id=requestAnimationFrame(run)};id=requestAnimationFrame(run);return()=>cancelAnimationFrame(id)},[visible,value]);return <div ref={ref} className="stat device-frame"><span className="stat-code">SYS.{String(value).padStart(3,"0")}</span><p>{count}<b>{suffix}</b></p><div className="stat-bars"><i/><i/><i/><i/></div><small>{label}</small></div>}
function PillarCard({number,title,copy,image,alt}:(typeof pillars)[number]){return <motion.article className="pillar-card device-frame" whileHover={{y:-10}}><img src={image} alt={alt} loading="lazy" width={1024} height={768}/><div className="card-shade"/><span className="card-number">{number}</span><div className="pillar-copy"><small>Experience portal</small><h3>{title}</h3><p>{copy}</p><a href={title==="Workshops"?"#workshops":title==="Competitions"?"#competitions":"#events"}>Explore <ArrowRight/></a></div><FrameCorners/></motion.article>}
function DomainCard({title,code,icon:Icon,image,index}:(typeof domains)[number]&{index:number}){return <motion.article className="domain-card device-frame" initial={{opacity:0,x:60}} whileInView={{opacity:1,x:0}} viewport={{once:true,margin:"-8%"}} transition={{delay:index*.04}}><img src={image} alt={`${title} technology environment`} loading="lazy" width={1024} height={768}/><div className="card-shade"/><span className="domain-code">{code}</span><Icon className="domain-icon"/><div className="domain-copy"><small>Frontier / 0{index+1}</small><h3>{title}</h3><a href="#events">Open field <ArrowRight/></a></div><FrameCorners/></motion.article>}
function EventCard({event}:{event:(typeof events)[number]}){return <motion.article layout initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.96}} className={`event-card device-frame ${event.featured?"featured":""}`}><img src={event.image} alt={`${event.name} event environment`} loading="lazy" width={1024} height={768}/><div className="card-shade"/><div className="event-top"><span>Event {event.id}</span><span>{event.category}</span></div><div className="event-copy"><h3>{event.name}</h3><p>{event.description}</p><div className="meta"><span>{event.date}</span><i/><span>{event.location}</span></div><div className="card-actions"><a href="#future">Explore <ArrowRight/></a><a href="#future">Register <ChevronRight/></a></div></div><FrameCorners/></motion.article>}
function WorkshopCard({code,title,duration,level,icon:Icon,index}:(typeof workshops)[number]&{index:number}){return <motion.article className="workshop-card device-frame" initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:index*.06}}><span>{code}.{String(index+1).padStart(2,"0")}</span><Icon/><h3>{title}</h3><p>Build practical systems inside a guided frontier lab.</p><div><small>{duration}</small><small>{level}</small></div><a href="#future">Explore <ArrowRight/></a><FrameCorners/></motion.article>}
function CompetitionCard({id,title,prize,team,deadline,index}:(typeof competitions)[number]&{index:number}){return <motion.article className="competition-card" initial={{opacity:0,x:index%2?-40:40}} whileInView={{opacity:1,x:0}} viewport={{once:true}}><span className="competition-id">Competition {id}</span><h3>{title}</h3><div><span>Prize<strong>{prize}</strong></span><span>Team size<strong>{team}</strong></span><span>Deadline<strong>{deadline}</strong></span></div><a href="#future">View challenge <ArrowRight/></a></motion.article>}
function TimelineItem({item,index}:{item:(typeof timeline)[number];index:number}){const ref=useRef<HTMLElement>(null);const active=useInView(ref,{margin:"-35% 0px -35%"});return <motion.article ref={ref} className={`timeline-item ${active?"active":""}`} initial={{opacity:.28,scale:.96}} whileInView={{opacity:1,scale:1}} viewport={{once:false,margin:"-32%"}}><span className="timeline-node">0{index+1}</span><p className="timeline-year">{item.year}</p><div><h3>{item.title}</h3><p>{item.copy}</p></div></motion.article>}
function TeamCard({member,index,active}:{member:(typeof team)[number];index:number;active:boolean}){return <motion.article className={`team-card device-frame ${active?"active":""}`} animate={{opacity:active?1:.52,y:active?-8:0}}><div className="portrait" style={{backgroundImage:`url(${teamImage})`,backgroundPosition:member.position}}/><div className="team-scan"/><span>{member.id}</span><h3>{member.name}</h3><p>{member.role}</p><small>{member.group}</small><FrameCorners/></motion.article>}
function IndiaNetwork(){return <div className="india-map" aria-label="Technology network connecting seven Indian cities"><img src="/india-map.png" alt="Accurate map of India" loading="lazy"/>
<svg viewBox="0 0 100 100" aria-hidden="true">{cities.slice(1).map((c,i)=><motion.line key={c.name} x1="29" y1="57" x2={c.x} y2={c.y} initial={{pathLength:0,opacity:0}} whileInView={{pathLength:1,opacity:.7}} viewport={{once:true}} transition={{duration:1.2,delay:i*.12}}/>)}</svg>{cities.map((c,i)=><div className={`city-node ${c.name==="Mumbai"?"origin":""}`} style={{left:`${c.x}%`,top:`${c.y}%`}} key={c.name}><i/><span>{c.name}</span><small>0{i+1}</small></div>)}<div className="map-ring r1"/><div className="map-ring r2"/></div>}
function ChapterBackdrop({variant}:{variant:string}){return <div className={`chapter-backdrop ${variant}`} aria-hidden="true"><div className="grid-plane"/><div className="circuit c1"/><div className="circuit c2"/><div className="light-beam"/></div>}
function ParticleField({count}:{count:number}){return <div className="particles" aria-hidden="true">{Array.from({length:count}).map((_,i)=><i key={i} style={{"--i":i} as CSSProperties}/>)}</div>}
function FrameCorners(){return <><i className="corner tl"/><i className="corner tr"/><i className="corner bl"/><i className="corner br"/></>}
function Footer(){return <footer className="footer"><div className="footer-mark"><strong>TECHFEST</strong><span>IIT BOMBAY // THE NEXT FRONTIER</span></div><nav aria-label="Footer navigation"><a href="#events">Events</a><a href="#workshops">Workshops</a><a href="#competitions">Competitions</a><a href="#team">Team</a><a href="#legacy">About</a></nav><div className="footer-base"><span>© TECHFEST, IIT BOMBAY</span><span>16—18 DECEMBER 2026</span><span>MUMBAI // INDIA</span></div></footer>}
