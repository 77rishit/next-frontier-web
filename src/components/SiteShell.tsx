import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Atom, BookOpen, ExternalLink, FlaskConical, Home, Instagram, Linkedin, Mail, Menu, Swords, Users, X, Youtube } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { socials } from "../data/site";

const topNav = [["/events","Events","Festival"],["/workshops","Workshops","Laboratory"],["/competitions","Competitions","Arena"],["/initiatives","Initiatives","Network"]] as const;
const railNav = [["/","Home",Home],["/events","Events",Atom],["/workshops","Workshops",FlaskConical],["/competitions","Competitions",Swords],["/about","About",BookOpen]] as const;
const socialIcons = { Instagram, X, LinkedIn: Linkedin, YouTube: Youtube, WhatsApp: Mail, Facebook: Users } as const;

export function SiteShell({children}:{children:ReactNode}){
  const [open,setOpen]=useState(false);
  const path=useRouterState({select:s=>s.location.pathname});
  const reduce=useReducedMotion();
  useEffect(()=>{setOpen(false);window.scrollTo({top:0})},[path]);
  return <div className="site-shell">
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="festival-nav">
      <Link to="/" className="festival-brand" aria-label="Techfest home"><span>TF</span><b>TECHFEST<small>IIT BOMBAY · 2026</small></b></Link>
      <button className="mobile-trigger" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label="Open festival navigation"><Menu/></button>
      <nav className={open?"open":""} aria-label="Primary navigation">
        {topNav.map(([to,label,tag])=><Link key={to} to={to}><small>{tag}</small><span>{label}</span></Link>)}
        <div className="nav-diamond"/>
      </nav>
      <Link className="nav-contact" to="/contact"><span>Open channel</span></Link>
    </header>
    <aside className="left-rail" aria-label="Festival sections"><span className="rail-cap">TF</span>{railNav.map(([to,label,Icon])=><Link key={to} to={to} activeOptions={{exact:to==="/"}} activeProps={{className:"active"}}><Icon/><span>{label}</span></Link>)}</aside>
    <aside className="right-rail" aria-label="Official social links">{socials.filter(([name])=>name!=="Facebook").map(([name,url])=>{const Icon=socialIcons[name];return <a key={name} href={url} target="_blank" rel="noreferrer" aria-label={`Techfest on ${name}`}><Icon/></a>})}<span>OFFICIAL SIGNALS</span></aside>
    <AnimatePresence mode="wait"><motion.main id="main" key={path} initial={reduce?false:{opacity:0,clipPath:"inset(0 0 100% 0)"}} animate={{opacity:1,clipPath:"inset(0 0 0% 0)"}} {...(!reduce?{exit:{opacity:0,filter:"brightness(.25)"}}:{})} transition={{duration:.65,ease:[.22,1,.36,1]}}>{children}</motion.main></AnimatePresence>
    <footer className="site-footer"><div className="footer-sigil"><span>TF</span><div><Link to="/">TECHFEST 2026</Link><p>16–18 December · IIT Bombay</p></div></div><div className="footer-links"><Link to="/history">Archive</Link><Link to="/team">Command</Link><Link to="/sponsors">Network</Link><Link to="/contact">Communications</Link></div><p className="footer-status"><i/> MUMBAI NODE ONLINE<br/>19.1334° N / 72.9133° E</p></footer>
  </div>
}

export function Frame({children,className=""}:{children:ReactNode,className?:string}){return <div className={`tech-frame ${className}`}><i className="frame-corner a"/><i className="frame-corner b"/><i className="frame-corner c"/><i className="frame-corner d"/><span className="frame-diamond">◇</span>{children}</div>}
export function PageHero({code,title,accent,copy,image}:{code:string,title:string,accent:string,copy:string,image:string}){return <section className="page-hero"><img className="page-hero-image" src={image} alt="" width="1920" height="1080"/><div className="page-hero-shade"/><div className="page-hero-grid"/><div className="page-orbit"/><motion.div className="page-hero-copy" initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{delay:.25,duration:.8}}><p className="eyebrow">{code} // TECHFEST 2026</p><h1>{title}<span>{accent}</span></h1><p>{copy}</p></motion.div><div className="hero-data"><i/>SYSTEM 01<br/>19.1334° N / 72.9133° E<br/><b>LINK ACTIVE</b></div><div className="hero-index">THE NEXT FRONTIER <span>◇</span></div></section>}
export function SourceLink({href}:{href:string}){return <a className="source-link" href={href} target="_blank" rel="noreferrer">Official source <ExternalLink/></a>}
export function Cta({to,children}:{to:string,children:ReactNode}){return <Link className="angle-cta" to={to}><span>{children}</span><b>↗</b></Link>}