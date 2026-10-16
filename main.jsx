import React, { useState, useEffect } from "react"

import { createRoot } from "react-dom/client";
import "./style.css";

const people = [
{
name: "Mina",
flag: "🇰🇷",
country: "South Korea",
lang: "한국어 · English",
learning: "French",
bio: "I love music, languages and discovering new cultures 🌸",
online: true
},
{
name: "Lina",
flag: "🇨🇳",
country: "China",
lang: "中文 · English",
learning: "French",
bio: "Let's learn languages and become friends! 🐼",
online: true
},
{
name: "Sofia",
flag: "🇪🇸",
country: "Spain",
lang: "Español · English",
learning: "Chinese",
bio: "I enjoy travelling, art and meeting new people 🎨",
online: false
},
{
name: "Aiko",
flag: "🇯🇵",
country: "Japan",
lang: "日本語 · English",
learning: "French",
bio: "Here to practice languages and share Japanese culture 🌷",
online: true
}
];

function App() {
const [tab, setTab] = useState("home");
const [vip, setVip] = useState("");
const [query, setQuery] = useState("");
const [message, setMessage] = useState("");

const [messages, setMessages] = useState(() => {
try {
const savedMessages = localStorage.getItem("univa-messages");

if (savedMessages) {  
  return JSON.parse(savedMessages);  
}

} catch (error) {
console.error("Error loading UNIVA messages:", error);
}

return [
{ text: "Hi! Welcome to UNIVA 🌍", mine: false },
{
text: "Hello! I'd love to practice languages together 😊",
mine: true
}
];
});

const nav = (x) => setTab(x);

useEffect(() => {
try {
localStorage.setItem("univa-messages", JSON.stringify(messages));
} catch (error) {
console.error("Error saving UNIVA messages:", error);
}
}, [messages]);

const title = {
home: "Welcome to UNIVA",
discover: "Discover",
messages: "Messages",
profile: "My profile",
vip: "UNIVA VIP",
settings: "Settings"
}[tab];

function sendMessage(e) {
e.preventDefault();

const text = message.trim();  

if (!text) return;  

setMessages((previousMessages) => [  
  ...previousMessages,  
  { text, mine: true }  
]);  

setMessage("");

}

return (
<div className="app">
<header>
<div className="logo">UN<span>I</span>VA</div>
<div className="top-actions">
<button onClick={() => nav("settings")}>⚙</button>
<button onClick={() => nav("vip")} className="vipbtn">VIP</button>
</div>
</header>

<main>  
    {tab === "home" && (  
      <section>  
        <div className="hero">  
          <p className="eyebrow">ONE WORLD · MANY LANGUAGES</p>  
          <h1>Meet. Learn. Connect.</h1>  
          <p>  
            Find international friends, practice languages and discover  
            new cultures in one safe place.  
          </p>  
          <button className="primary" onClick={() => nav("discover")}>  
            Discover people  
          </button>  
        </div>  

        <div className="cards">  
          <article>  
            <b>🌍 Language exchange</b>  
            <span>Practice with people around the world.</span>  
          </article>  
          <article>  
            <b>💬 Messages</b>  
            <span>Chat, translate and learn together.</span>  
          </article>  
          <article>  
            <b>🎓 UNIVA Classes</b>  
            <span>Learn with structured lessons.</span>  
          </article>  
        </div>  

        <h2>People you may like</h2>  
        <div className="people">  
          {people.slice(0, 3).map((p) => (  
            <Person  
              key={p.name}  
              p={p}  
              onClick={() => nav("messages")}  
            />  
          ))}  
        </div>  
      </section>  
    )}  

    {tab === "discover" && (  
      <section>  
        <h1>{title}</h1>  
        <input  
          className="search"  
          placeholder="Search language, country..."  
          value={query}  
          onChange={(e) => setQuery(e.target.value)}  
        />  
        <div className="people">  
          {people  
            .filter((p) =>
  (p.name + p.lang + p.country + p.learning)
    .toLowerCase()
    .includes(query.toLowerCase())
)
            .map((p) => (  
              <Person  
                key={p.name}  
                p={p}  
                onClick={() => nav("messages")}  
              />  
            ))}  
        </div>  
      </section>  
    )}  

    {tab === "messages" && (  
      <section>  
        <h1>{title}</h1>  

        <div className="chat">  
          {messages.map((m, i) => (  
            <div  
              key={i}  
              className={"bubble" + (m.mine ? " mine" : "")}  
            >  
              {m.text}  
            </div>  
          ))}  

          <form className="composer" onSubmit={sendMessage}>  
            <input  
              type="text"  
              placeholder="Write a message..."  
              value={message}  
              onChange={(e) => setMessage(e.target.value)}  
            />  
            <button type="submit" className="primary">  
              Send  
            </button>  
          </form>  
        </div>  
      </section>  
    )}  

    {tab === "profile" && (  
      <section>  
        <div className="profile">  
          <div className="avatar">M</div>  
          <h1>My UNIVA profile</h1>  
          <p>French 🇫🇷 · English 🇬🇧 · Learning Chinese 🇨🇳</p>  
          <button className="secondary">Edit profile</button>  
        </div>  
        <div className="stats">  
          <b>128<br /><small>Friends</small></b>  
          <b>12<br /><small>Languages</small></b>  
          <b>4.9★<br /><small>Trust</small></b>  
        </div>  
      </section>  
    )}  

    {tab === "vip" && (  
      <section>  
        <div className="viphero">  
          <p className="eyebrow">UNIVA VIP</p>  
          <h1>More access. More connection.</h1>  
          <p>  
            No advertising anywhere on UNIVA. VIP simply unlocks  
            extra features.  
          </p>  
        </div>  

        <div className="plans">  
          {["Explorer", "Connect", "Premium"].map((p, i) => (  
            <article className="plan" key={p}>  
              <h2>VIP {p}</h2>  
              <h3>{i === 0 ? "2 000" : i === 1 ? "5 000" : "8 000"} FCFA / mois</h3>
              <p>  
                {i === 0  
                  ? "More discovery tools"  
                  : i === 1  
                  ? "Advanced connection & messaging"  
                  : "Full VIP experience"}  
              </p>  
              <ul>  
                <li>Extra access</li>  
                <li>Enhanced profile tools</li>  
                <li>Priority features</li>  
              </ul>  
              <button  
                className="primary"  
                onClick={() => alert("Paiement bientôt disponible pour VIP " + p)}
              >  
                {vip === p ? "Selected ✓" : "Choose " + p}  
              </button>  
            </article>  
          ))}  
        </div>  
      </section>  
    )}  

    {tab === "settings" && (  
      <section>  
        <h1>{title}</h1>  
        <div className="settings">  
          {[  
            "Account",  
            "Privacy & safety",  
            "Notifications",  
            "Language",  
            "Help & support"  
          ].map((x) => (  
            <button key={x}>  
              {x}<span>›</span>  
            </button>  
          ))}  
        </div>  
        <p className="noads">✓ UNIVA has no advertising.</p>  
      </section>  
    )}  
  </main>  

  <nav>  
    {[  
      ["home", "⌂", "Home"],  
      ["discover", "🌍", "Discover"],  
      ["messages", "💬", "Messages"],  
      ["profile", "◎", "Profile"]  
    ].map(([k, i, l]) => (  
      <button  
        key={k}  
        className={tab === k ? "active" : ""}  
        onClick={() => nav(k)}  
      >  
        <b>{i}</b>  
        <span>{l}</span>  
      </button>  
    ))}  
  </nav>  
</div>

);
}

function Person({ p, onClick }) {
return (
<button className="person" onClick={onClick}>
<div className="avatar small">{p.name[0]}</div>

<div className="person-info">  
    <b>{p.flag} {p.name}</b>  
    <span>📍 {p.country}</span>  
    <span>🗣️ {p.lang}</span>  
    <span>📚 Learning: {p.learning}</span>  
    <span className="person-bio">{p.bio}</span>  
  </div>  

  <i className={p.online ? "online" : ""}>  
    {p.online ? "Online" : "Offline"}  
  </i>  
</button>

);
}

createRoot(document.getElementById("root")).render(<App />);
