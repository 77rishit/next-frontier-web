import { Link } from "@tanstack/react-router";
import { Frame } from "./SiteShell";
export function ProgramCard({item,type,index}:{item:any,type:"competition"|"workshop",index:number}){
 const id=item.compi_id||item.workshop_id; const image=item.compiImg||item.workshopImg;
 return <Frame className={`program-card card-${index%5}`}><Link to={type==="competition"?"/competitions/$competitionId":"/workshops/$workshopId"} params={type==="competition"?{competitionId:id}:{workshopId:id}} className="card-link" aria-label={`View ${item.name}`}/>
 <div className="program-image"><img src={image} alt="" loading="lazy"/><span>{String(index+1).padStart(2,"0")}</span></div><div className="program-copy"><small>{item.genre_display}</small><h2>{item.name}</h2><p>{item.desc}</p><div className="program-meta"><b>{type==="competition"?item.prize:`₹${item.prize}`}</b><span>{type==="competition"?(item.max_team_size?`Up to ${item.max_team_size} members`:"Individual"):(item.date||item.duration)}</span></div><strong>ACCESS FILE →</strong></div></Frame>
}
