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
  const [profileName, setProfileName] = useState(() => {
  try {
    const saved = JSON.parse(localStorage.getItem("univa-profile") || "{}");
    return saved.profileName || "UNIVA member";
  } catch {
    return "UNIVA member";
  }
});
  



const [spokenLanguages, setSpokenLanguages] = useState(() => {
  try {
    const saved = JSON.parse(localStorage.getItem("univa-profile") || "{}");
    return saved.spokenLanguages || "French 🇫🇷 · English 🇬🇧";
  } catch {
    return "French 🇫🇷 · English 🇬🇧";
  }
});
const [learningLanguages, setLearningLanguages] = useState(() => {
  try {
    const saved = JSON.parse(localStorage.getItem("univa-profile") || "{}");
    return saved.learningLanguages || "Chinese 🇨🇳";
  } catch {
    return "Chinese 🇨🇳";
  }
});

const [profilePhoto, setProfilePhoto] = useState(() => {
  try {
    const saved = JSON.parse(localStorage.getItem("univa-profile") || "{}");
    return saved.profilePhoto || "";
  } catch {
    return "";
  }
});
const [showEditProfile, setShowEditProfile] = useState(false);
const [vip, setVip] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Wave");
  const [showPayment, setShowPayment] = useState(false);
const [query, setQuery] = useState("");
  const [languageFilter, setLanguageFilter] = useState("all");
const [message, setMessage] = useState("");
  
const [favorites, setFavorites] = useState(() => {
  try {
    return JSON.parse(
      localStorage.getItem("univa-favorites") || "[]"
    );
  } catch {
    return [];
  }
});

useEffect(() => {
  try {
    localStorage.setItem(
      "univa-favorites",
      JSON.stringify(favorites)
    );
  } catch (error) {
    console.error("Error saving UNIVA favorites:", error);
  }
}, [favorites]);

const toggleFavorite = (name) => {
  setFavorites((previous) =>
    previous.includes(name)
      ? previous.filter((item) => item !== name)
      : [...previous, name]
  );
};


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
  useEffect(() => {
  try {
    localStorage.setItem(
      "univa-profile",
      JSON.stringify({
        profileName,
        spokenLanguages,
        learningLanguages,
        profilePhoto
      })
    );
  } catch (error) {
    console.error("Error saving UNIVA profile:", error);
  }
}, [profileName, spokenLanguages, learningLanguages, profilePhoto]);

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
             isFavorite={favorites.includes(p.name)}
onToggleFavorite={toggleFavorite} 
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
      placeholder="Search name, country or language..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />

    <label>Filter by language</label>
    <select
      value={languageFilter}
      onChange={(e) => setLanguageFilter(e.target.value)}
    >
      <option value="all">All languages</option>
      <option value="English">English</option>
      <option value="French">French</option>
      <option value="Chinese">Chinese</option>
      <option value="Korean">Korean</option>
      <option value="Japanese">Japanese</option>
      <option value="Spanish">Spanish</option>
    </select>

    <button
      className="secondary"
      onClick={() => {
        setQuery("");
        setLanguageFilter("all");
      }}
    >
      Clear filters
    </button>

    <div className="people">
      {people
        .filter((p) => {
          const searchText = (
            p.name + " " +
            p.country + " " +
            p.lang + " " +
            p.learning + " " +
            p.bio
          ).toLowerCase();

          const matchesSearch = searchText.includes(
            query.trim().toLowerCase()
          );

          const matchesLanguage =
            languageFilter === "all" ||
            (
              p.lang + " " + p.learning
            ).toLowerCase().includes(
              languageFilter.toLowerCase()
            );

          return matchesSearch && matchesLanguage;
        })
        
.map((p) => (
  <Person
    key={p.name}
    p={p}
    onClick={() => nav("messages")}
    isFavorite={favorites.includes(p.name)}
    onToggleFavorite={toggleFavorite}
  />
))
}
    </div>

    {people.filter((p) => {
      const searchText = (
        p.name + " " + p.country + " " +
        p.lang + " " + p.learning + " " + p.bio
      ).toLowerCase();

      const matchesSearch = searchText.includes(
        query.trim().toLowerCase()
      );

      const matchesLanguage =
        languageFilter === "all" ||
        (p.lang + " " + p.learning).toLowerCase()
          .includes(languageFilter.toLowerCase());

      return matchesSearch && matchesLanguage;
    }).length === 0 && (
      <p>No people found. Try another search.</p>
    )}
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
      <div className="avatar">
        {profilePhoto ? (
          <img
            src={profilePhoto}
            alt="Profile"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%"
            }}
          />
        ) : (
          profileName.charAt(0).toUpperCase()
        )}
      </div>

      <h1>{profileName}</h1>
      
<p>🗣️ Languages I speak: {spokenLanguages}</p>
<p>📚 Languages I want to learn: {learningLanguages}</p>


      <button
        className="secondary"
        onClick={() => setShowEditProfile(!showEditProfile)}
      >
        {showEditProfile ? "Cancel" : "Edit profile"}
      </button>
    </div>

    {showEditProfile && (
      <div className="plan">
        <h2>Edit my profile</h2>

        <label>My name</label>
        <input
          value={profileName}
          onChange={(e) => setProfileName(e.target.value)}
          placeholder="Enter your name"
        />

        
<label>Languages I speak</label>
<input
  value={spokenLanguages}
  onChange={(e) => setSpokenLanguages(e.target.value)}
  placeholder="French, English, Chinese..."
/>

<label>Languages I want to learn</label>
<input
  value={learningLanguages}
  onChange={(e) => setLearningLanguages(e.target.value)}
  placeholder="Chinese, Korean, Japanese..."
/>


        <label>Profile photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;

            if (file.size > 2 * 1024 * 1024) {
              alert("Please choose a photo smaller than 2 MB.");
              e.target.value = "";
              return;
            }

            const reader = new FileReader();
            reader.onload = () => setProfilePhoto(reader.result);
            reader.readAsDataURL(file);
          }}
        />

        <button
          className="primary"
          onClick={() => setShowEditProfile(false)}
        >
          Save profile
        </button>
      </div>
    )}

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
    ? "Discover languages and cultures more easily."
    : i === 1
    ? "Build your international network."
    : "Enjoy the complete UNIVA VIP experience."}
</p>

<ul>
  {(i === 0
    ? [
        "Exclusive VIP badge",
        "Advanced language and country discovery",
        "Enhanced translation access",
        "Ad-free experience"
      ]
    : i === 1
    ? [
        "All Explorer benefits",
        "Advanced search filters",
        "More saved favorite profiles",
        "Extra profile customization"
      ]
    : [
        "All Connect benefits",
        "Priority access to language rooms",
        "Advanced profile statistics",
        "Exclusive profile customization"
      ]
  ).map((feature) => (
    <li key={feature}>{feature}</li>
  ))}
</ul>
  
              <button  
                className="primary"  
                onClick={() => {
  setVip(p);
  setShowPayment(true);
}}
              >  
                {vip === p ? "Selected ✓" : "Choose " + p}  
              </button>  
            </article>  
          ))}  
        </div> 
        {showPayment && (
  <div className="plan">
    <h2>UNIVA VIP Payment</h2>

    <p>
      Selected plan: VIP {vip}
    </p>

    <h3>
      {vip === "Explorer"
        ? "2 000"
        : vip === "Connect"
        ? "5 000"
        : "8 000"} FCFA / month
    </h3>

    <label>Choose your payment method</label>

    <select
      value={paymentMethod}
      onChange={(e) => setPaymentMethod(e.target.value)}
    >
      <option value="Wave">Wave</option>
      <option value="Orange Money">Orange Money</option>
    </select>

    <p>
      Payments are not available yet.
      This is a preview only.
    </p>

    <button
      className="secondary"
      onClick={() => setShowPayment(false)}
    >
      Back
    </button>
  </div>
)}
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

function Person({ p, onClick, isFavorite, onToggleFavorite }) {
return (
<div className="person">
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

<button
  type="button"
  className="secondary"
  onClick={(e) => {
    e.stopPropagation();
    onToggleFavorite(p.name);
  }}
>
  {isFavorite ? "❤️ Favori" : "♡ Ajouter aux favoris"}
</button>
  
<button
  type="button"
  className="secondary"
  onClick={onClick}
>
  💬 Message
</button>

 
</div>

);
}

createRoot(document.getElementById("root")).render(<App />);
