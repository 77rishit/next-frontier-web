import { useMemo,useState } from "react";
import { ProgramCard } from "./ProgramCard";
import { PageHero,SiteShell,SourceLink } from "./SiteShell";
export function ListingPage({type,items}:{type:"competition"|"workshop",items:readonly any[]}){
 const [filter,setFilter]=useState("All"); const genres=["All",...Array.from(new Set(items.map(x=>x.genre_display)))]; const shown=useMemo(()=>filter==="All"?items:items.filter(x=>x.genre_display===filter),[filter,items]); const comp=type==="competition";
 return <SiteShell><PageHero code={comp?"02 / CYBER ARENA":"03 / THE LABORATORY"} title={comp?"COMPETE BEYOND":"LEARN. BUILD."} accent={comp?"LIMITS.":"CREATE."} copy={comp?`${items.length} live challenges drawn directly from Techfest’s current official roster.`:`${items.length} current on-campus workshops with verified dates, fees and registration links.`} image={comp?"/worlds/arena.jpg":"/worlds/laboratory.jpg"}/>
 <section className="listing-section"><div className="listing-head"><div><p className="eyebrow">LIVE OFFICIAL DATA</p><h2>{comp?"Select your arena":"Select your discipline"}</h2></div><SourceLink href={`https://techfest.org/${comp?"competitions":"workshops"}`}/></div>
 <div className="filter-row" role="group" aria-label="Filter by category">{genres.map(g=><button className={filter===g?"active":""} onClick={()=>setFilter(g)} key={g}>{g}</button>)}</div>
 <div className="program-grid">{shown.map((x,i)=><ProgramCard key={x.compi_id||x.workshop_id} item={x} type={type} index={i}/>)}</div></section></SiteShell>
}
