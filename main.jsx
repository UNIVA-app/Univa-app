

import React, { useState, useEffect } from "react"

import { createRoot } from "react-dom/client";
import "./style.css";

const people = [
  { name: "Mina", flag: "🇰🇷", lang: "한국어 · English", online: true },
  { name: "Lina", flag: "🇨🇳", lang: "中文 · English", online: true },
  { name: "Sofia", flag: "🇪🇸", lang: "Español · English", online: false },
  { name: "Aiko", flag: "🇯🇵", lang: "日本語 · English", online: true }
];

function App() {
  const [tab, setTab] = useState("home");
  const [vip, setVip] = useState(false);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hi! Welcome to UNIVA 🌍", mine: false },
    {
      text: "Hello! I'd love to practice languages together 😊",
      mine: true
    }
  ]);

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
                  (p.name + p.lang)
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
                  <h2>{p}</h2>
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
                    onClick={() => setVip(true)}
                  >
                    {vip ? "Activated" : "Choose " + p}
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
      <div>
        <b>{p.flag} {p.name}</b>
        <span>{p.lang}</span>
      </div>
      <i className={p.online ? "online" : ""}>●</i>
    </button>
  );
}

createRoot(document.getElementById("root")).render(<App />);
