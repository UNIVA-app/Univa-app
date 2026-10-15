import React,{useState} from "react";
import {createRoot} from "react-dom/client";
import "./style.css";

const people=[
 {name:"Mina",flag:"🇰🇷",lang:"한국어 · English",online:true},
 {name:"Lina",flag:"🇨🇳",lang:"中文 · English",online:true},
 {name:"Sofia",flag:"🇪🇸",lang:"Español · English",online:false},
 {name:"Aiko",flag:"🇯🇵",lang:"日本語 · English",online:true}
];

function App(){
 const [tab,setTab]=useState("home"),[vip,setVip]=useState(false),[query,setQuery]=useState("");
 const nav=(x)=>setTab(x);
 const title={home:"Welcome to UNIVA",discover:"Discover",messages:"Messages",profile:"My profile",vip:"UNIVA VIP",settings:"Settings"}[tab];
 return <div className="app">
  <header><div className="logo">UN<span>I</span>VA</div><div className="top-actions"><button onClick={()=>nav("settings")}>⚙</button><button onClick={()=>nav("vip")} className="vipbtn">VIP</button></div></header>
  <main>
   {tab==="home"&&<section>
    <div className="hero"><p className="eyebrow">ONE WORLD · MANY LANGUAGES</p><h1>Meet. Learn. Connect.</h1><p>Find international friends, practice languages and discover new cultures in one safe place.</p><button className="primary" onClick={()=>nav("discover")}>Discover people</button></div>
    <div className="cards"><article><b>🌍 Language exchange</b><span>Practice with people around the world.</span></article><article><b>💬 Messages</b><span>Chat, translate and learn together.</span></article><article><b>🎓 UNIVA Classes</b><span>Learn with structured lessons.</span></article></div>
    <h2>People you may like</h2><div className="people">{people.slice(0,3).map(p=><Person key={p.name} p={p} onClick={()=>nav("messages")}/>)}</div>
   </section>}
   {tab==="discover"&&<section><h1>{title}</h1><input className="search" placeholder="Search language, country..." value={query} onChange={e=>setQuery(e.target.value)}/><div className="people">{people.filter(p=>(p.name+p.lang).toLowerCase().includes(query.toLowerCase())).map(p=><Person key={p.name} p={p} onClick={()=>nav("messages")}/>)}</div></section>}
   {tab==="messages"&&<section><h1>{title}</h1><div className="chat"><div className="bubble">Hi! Welcome to UNIVA 🌍</div><div className="bubble mine">Hello! I'd love to practice languages together 😊</div><div className="composer"><input placeholder="Write a message..."/><button className="primary">Send</button></div></div></section>}
   {tab==="profile"&&<section><div className="profile"><div className="avatar">M</div><h1>My UNIVA profile</h1><p>French 🇫🇷 · English 🇬🇧 · Learning Chinese 🇨🇳</p><button className="secondary">Edit profile</button></div><div className="stats"><b>128<br/><small>Friends</small></b><b>12<br/><small>Languages</small></b><b>4.9★<br/><small>Trust</small></b></div></section>}
   {tab==="vip"&&<section><div className="viphero"><p className="eyebrow">UNIVA VIP</p><h1>More access. More connection.</h1><p>No advertising anywhere on UNIVA. VIP simply unlocks extra features.</p></div><div className="plans">{["Explorer","Connect","Premium"].map((p,i)=><article className="plan" key={p}><h2>{p}</h2><p>{i===0?"More discovery tools":i===1?"Advanced connection & messaging":"Full VIP experience"}</p><ul><li>Extra access</li><li>Enhanced profile tools</li><li>Priority features</li></ul><button className="primary" onClick={()=>setVip(true)}>{vip?"Activated":"Choose "+p}</button></article>)}</div></section>}
   {tab==="settings"&&<section><h1>{title}</h1><div className="settings">{["Account","Privacy & safety","Notifications","Language","Help & support"].map(x=><button key={x}>{x}<span>›</span></button>)}</div><p className="noads">✓ UNIVA has no advertising.</p></section>}
  </main>
  <nav>{[["home","⌂","Home"],["discover","🌍","Discover"],["messages","💬","Messages"],["profile","◎","Profile"]].map(([k,i,l])=><button key={k} className={tab===k?"active":""} onClick={()=>nav(k)}><b>{i}</b><span>{l}</span></button>)}</nav>
 </div>
}
function Person({p,onClick}){return <button className="person" onClick={onClick}><div className="avatar small">{p.name[0]}</div><div><b>{p.flag} {p.name}</b><span>{p.lang}</span></div><i className={p.online?"online":""}>●</i></button>}
createRoot(document.getElementById("root")).render(<App/>);
