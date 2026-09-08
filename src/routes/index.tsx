import { createFileRoute } from "@tanstack/react-router";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useRef, type MouseEvent } from "react";
import { competitions } from "../data/competitions";
import { workshops } from "../data/workshops";
import { history } from "../data/site";
import { Cta, Frame, SiteShell } from "../components/SiteShell";
import hero from "../assets/citadel-hero.jpg";
import arena from "../assets/arena-world.jpg";
import lab from "../assets/laboratory-world.jpg";
import powai from "../assets/powai-world.jpg";

export const Route=createFileRoute("/")({head:()=>({meta:[{title:"Techfest 2026 IIT Bombay — The Next Frontier"},{name:"description",content:"Enter Techfest IIT Bombay's cinematic technology universe, 16–18 December 2026."},{property:"og:title",content:"Techfest 2026 IIT Bombay — The Next Frontier"},{property:"og:description",content:"Enter Techfest IIT Bombay's cinematic technology universe, 16–18 December 2026."},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary_large_image"}]}),component:Home});

function Home(){
  const stage=useRef<HTMLElement>(null); const reduce=useReducedMotion();
  const mx=useSpring(useMotionValue(0),{stiffness:45,damping:18}); const my=useSpring(useMotionValue(0),{stiffness:45,damping:18});
  const bgX=useTransform(mx,[-1,1],[-10,10]); const bgY=useTransform(my,[-1,1],[-6,6]);
  const midX=useTransform(mx,[-1,1],[-22,22]); const midY=useTransform(my,[-1,1],[-12,12]);
  const foreX=useTransform(mx,[-1,1],[-35,35]); const foreY=useTransform(my,[-1,1],[-18,18]);
  const move=(e:MouseEvent<HTMLElement>)=>{if(reduce)return;const r=stage.current?.getBoundingClientRect();if(!r)return;mx.set((e.clientX-r.left)/r.width*2-1);my.set((e.clientY-r.top)/r.height*2-1)};
  return <SiteShell>
    <section ref={stage} onMouseMove={move} className="home-hero">
      <motion.img className="hero-layer hero-background" style={{x:bgX,y:bgY}} initial={reduce?false:{opacity:0,scale:1.12}} animate={{opacity:1,scale:1.06}} transition={{duration:1.8}} src={hero} alt="Futuristic IIT Bombay technology citadel at night" width="1920" height="1080"/>
      <motion.div className="hero-layer hero-atmosphere" style={{x:midX,y:midY}}/>
      <motion.div className="hero-layer hero-architecture" style={{x:midX,y:midY}}/>
      <motion.div className="hero-layer hero-foreground" style={{x:foreX,y:foreY}}/>
      <div className="particle-field">{Array.from({length:18},(_,i)=><i key={i}/>)}</div>
      <motion.div className="home-hud" initial={reduce?false:{clipPath:"inset(0 50% 100% 50%)"}} animate={{clipPath:"inset(0 0 0 0)"}} transition={{delay:.35,duration:1.2}}/>
      <motion.div className="home-copy" initial={reduce?false:{opacity:0,y:45}} animate={{opacity:1,y:0}} transition={{delay:.7,duration:.9}}>
        <p className="eyebrow">IIT BOMBAY'S</p>
        <div className="hero-sigil"><small>AN AETHERIAL RENAISSANCE</small><h1>TECHFEST</h1><b>2026</b></div>
        <div className="hero-rule"><i/><span>◇</span><i/></div>
        <p className="hero-date">16 — 18 DECEMBER <span>IIT BOMBAY</span></p>
        <p className="hero-claim">Asia’s Largest Science &amp; Technology Festival</p>
        <h2>THE NEXT FRONTIER</h2>
        <div className="hero-actions"><Cta to="/events">Enter the festival</Cta><Cta to="/competitions">Compete beyond limits</Cta></div>
      </motion.div>
      <div className="hero-coords left">SYSTEM 01<br/>MUMBAI / INDIA<br/><b>ONLINE</b></div><div className="hero-coords right">19.1334° N<br/>72.9133° E<br/>TF / 2026</div>
      <a className="world-descent" href="#festival-world"><span>DESCEND</span><i/></a>
    </section>
    <section id="festival-world" className="home-scale world-band"><div className="world-image"><img src={arena} alt="Cyber arena" loading="lazy" width="1920" height="1080"/></div><div className="world-veil"/><div className="section-copy"><p className="eyebrow">WORLD 02 // ACTIVE TRANSMISSION</p><h2>BUILD.<br/><span>LEARN.</span><br/>COMPETE.</h2></div><div className="scale-readouts"><Frame><b>{String(competitions.length).padStart(2,"0")}</b><span>Live competitions</span></Frame><Frame><b>{String(workshops.length).padStart(2,"0")}</b><span>Live workshops</span></Frame><Frame><b>1998</b><span>Origin year</span></Frame><Frame><b>03</b><span>Festival days</span></Frame></div></section>
    <section className="home-portals world-band"><div className="section-copy"><p className="eyebrow">CHOOSE A FRONTIER</p><h2>ENTER THE<br/><span>FESTIVAL WORLDS.</span></h2></div><div className="visual-portals"><Frame><img src={arena} alt="Competition cyber arena" loading="lazy" width="1920" height="1080"/><div><small>01 // CYBER ARENA</small><h3>Competitions</h3><p>National challenges in drones, robotics, quantitative science and innovation.</p><Cta to="/competitions">Enter 15 challenges</Cta></div></Frame><Frame><img src={lab} alt="Future laboratory" loading="lazy" width="1920" height="1080"/><div><small>02 // THE LABORATORY</small><h3>Workshops</h3><p>Hands-on training across AI, engineering, design and technology.</p><Cta to="/workshops">Explore 25 workshops</Cta></div></Frame></div></section>
    <section className="domain-ribbon"><p>AI</p><i>◇</i><p>ROBOTICS</p><i>◇</i><p>DRONES</p><i>◇</i><p>SPACE</p><i>◇</i><p>CYBER</p></section>
    <section className="home-legacy world-band"><div className="world-image"><img src={powai} alt="Futuristic IIT Bombay and Powai" loading="lazy" width="1920" height="1080"/></div><div className="world-veil"/><div><p className="eyebrow">ARCHIVE SIGNAL // IIT BOMBAY</p><h2>WHERE<br/><span>INNOVATION</span><br/>BEGINS.</h2><p>{history.at(-1)?.[1]}</p><Cta to="/history">Open the archive</Cta></div><Frame><b>1998</b><span>—</span><b>2026</b><small>STUDENT-BUILT AT IIT BOMBAY</small></Frame></section>
    <section className="final-cta"><div className="final-orbit"/><p className="eyebrow">MUMBAI NODE // READY</p><h2>THE FRONTIER<br/><span>IS OPEN.</span></h2><p>16 — 18 DECEMBER 2026 · IIT BOMBAY</p><div><Cta to="/events">Explore Techfest</Cta><Cta to="/contact">Open a channel</Cta></div></section>
  </SiteShell>
}