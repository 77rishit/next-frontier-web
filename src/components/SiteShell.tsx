import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { socials } from "../data/site";
const nav = [["/","Home"],["/events","Events"],["/competitions","Competitions"],["/workshops","Workshops"],["/initiatives","Initiatives"],["/about","About"]] as const;
export function SiteShell({children}:{children:ReactNode}){
 const [open,setOpen]=useState(false); const path=useRouterState({select:s=>s.location.pathname}); const reduce=useReducedMotion();
 useEffect(()=>{setOpen(false); window.scrollTo({top:0})},[path]);
 return <div className="site-shell">
  <a className="skip-link" href="#main">Skip to content</a>
  <header className="site-nav"><Link to="/" className="site-brand"><span>TF</span><b>TECHFEST<small>IIT BOMBAY · 2026</small></b></Link>
   <nav aria-label="Primary" className={open?"open":""}>{nav.map(([to,label])=><Link key={to} to={to} activeOptions={{exact:to==="/"}}>{label}</Link>)}<Link to="/contact">Contact</Link></nav>
   <button className="nav-toggle" onClick={()=>setOpen(!open)} aria-label="Toggle navigation">{open?<X/>:<Menu/>}</button>
  </header>
  <AnimatePresence mode="wait"><motion.main id="main" key={path} initial={reduce?false:{opacity:0,y:14}} animate={{opacity:1,y:0}} {...(!reduce?{exit:{opacity:0,y:-10}}:{})} transition={{duration:.35}}>{children}</motion.main></AnimatePresence>
  <footer className="site-footer"><div><Link to="/" className="footer-mark">TECHFEST</Link><p>Asia’s Largest Science & Technology Festival<br/>IIT Bombay · 16–18 December 2026</p></div><div className="footer-links"><Link to="/history">History</Link><Link to="/team">Team</Link><Link to="/sponsors">Sponsors</Link><Link to="/contact">Contact</Link></div><div className="social-links">{socials.map(([n,u])=><a key={n} href={u} target="_blank" rel="noreferrer">{n}<ExternalLink/></a>)}</div></footer>
 </div>
}
export function Frame({children,className=""}:{children:ReactNode,className?:string}){return <div className={`tech-frame ${className}`}><i/><i/><i/><i/>{children}</div>}
export function PageHero({code,title,accent,copy,image}:{code:string,title:string,accent:string,copy:string,image:string}){return <section className="page-hero"><img className="page-hero-image" src={image} alt=""/><div className="page-hero-shade"/><div className="page-hero-grid"/><div className="page-hero-copy"><p className="eyebrow">{code} // TECHFEST 2026</p><h1>{title}<span>{accent}</span></h1><p>{copy}</p></div><div className="hero-data">19.1334° N<br/>72.9133° E<br/><b>LINK ACTIVE</b></div></section>}
export function SourceLink({href}:{href:string}){return <a className="source-link" href={href} target="_blank" rel="noreferrer">Official source <ExternalLink/></a>}
export function Cta({to,children}:{to:string,children:ReactNode}){return <Link className="angle-cta" to={to}><span>{children}</span><b>↗</b></Link>}
