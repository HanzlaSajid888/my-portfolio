import { useState, useEffect } from "react";

const CYAN = "#00C2D4";
const DARK = "#0d1117";
const PANEL_BG = "#111820";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Space+Mono:wght@400;700&family=Nunito:wght@400;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #1a1a2e;
    font-family: 'Nunito', sans-serif;
    color: #fff;
    overflow-x: hidden;
  }

  .ticker {
    background: #00C2D4;
    color: #0d1117;
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2px;
    padding: 8px 0;
    overflow: hidden;
    white-space: nowrap;
  }
  .ticker-inner {
    display: inline-block;
    animation: ticker 18s linear infinite;
  }
  @keyframes ticker {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .header {
    background: #0d1117;
    border-bottom: 3px solid #00C2D4;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 32px;
  }
  .header-badge {
    background: #00C2D4;
    color: #0d1117;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 2px;
    letter-spacing: 1px;
  }
  .header-title {
    font-family: 'Bangers', cursive;
    font-size: 28px;
    letter-spacing: 3px;
    color: #fff;
  }

  .folio-wrap {
    max-width: 780px;
    margin: 0 auto;
    padding: 24px 16px 48px;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .panel {
    background: #111820;
    border: 2.5px solid #fff;
    border-radius: 4px;
    margin-bottom: 16px;
    overflow: hidden;
    position: relative;
  }
  .panel-label {
    position: absolute;
    top: 14px; left: 14px;
    background: #00C2D4;
    color: #0d1117;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 2px;
    letter-spacing: 1px;
    z-index: 2;
  }

  .hero-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 56px 24px 32px;
    gap: 0;
  }
  .speech-bubble {
    background: #fff;
    color: #0d1117;
    font-family: 'Nunito', sans-serif;
    font-size: 17px;
    font-weight: 800;
    padding: 14px 28px;
    border-radius: 30px;
    border: 2.5px solid #0d1117;
    position: relative;
    margin-bottom: 0;
    text-align: center;
    min-height: 54px;
  }
  .speech-bubble::after {
    content: '';
    position: absolute;
    bottom: -18px; left: 50%;
    transform: translateX(-50%);
    border: 9px solid transparent;
    border-top-color: #0d1117;
  }
  .speech-bubble::before {
    content: '';
    position: absolute;
    bottom: -14px; left: 50%;
    transform: translateX(-50%);
    border: 8px solid transparent;
    border-top-color: #fff;
    z-index: 1;
  }
  .avatar-wrap {
    margin-top: 20px;
    position: relative;
  }
  .click-btn {
    position: absolute;
    right: -30px; bottom: 30px;
    background: #00C2D4;
    color: #0d1117;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    padding: 6px 12px;
    border-radius: 20px;
    border: 2px solid #0d1117;
    cursor: pointer;
    animation: bob 2s ease-in-out infinite;
  }
  @keyframes bob {
    0%,100% { transform: translateY(0); }
    50%      { transform: translateY(-5px); }
  }
  .hero-name {
    font-family: 'Bangers', cursive;
    font-size: 36px;
    letter-spacing: 4px;
    color: #fff;
    margin-top: 18px;
  }
  .hero-sub {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    color: #00C2D4;
    margin-top: 4px;
  }
  .bubble-prompts {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    margin-top: 20px;
  }
  .bubble-chip {
    background: transparent;
    border: 1.5px solid #00C2D4;
    color: #00C2D4;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    padding: 5px 12px;
    border-radius: 20px;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
  }
  .bubble-chip:hover, .bubble-chip.active {
    background: #00C2D4;
    color: #0d1117;
  }
  .custom-say {
    display: flex;
    gap: 8px;
    margin-top: 12px;
    width: 100%;
    max-width: 420px;
  }
  .custom-say input {
    flex: 1;
    background: #0d1117;
    border: 1.5px solid #444;
    border-radius: 20px;
    color: #fff;
    font-family: 'Nunito', sans-serif;
    font-size: 13px;
    padding: 8px 16px;
    outline: none;
  }
  .custom-say input:focus { border-color: #00C2D4; }
  .bubble-btn {
    background: #00C2D4;
    color: #0d1117;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    padding: 8px 16px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
  }

  .skills-inner {
    padding: 56px 24px 32px;
    text-align: center;
  }
  .skills-title {
    font-family: 'Bangers', cursive;
    font-size: 28px;
    letter-spacing: 3px;
    color: #fff;
    margin-bottom: 6px;
  }
  .skills-sub {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    color: #888;
    margin-bottom: 28px;
    letter-spacing: 1px;
  }
  .skills-grid {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
  }
  .skill-card {
    background: #0d1117;
    border: 2px solid #333;
    border-radius: 12px;
    width: 100px;
    padding: 16px 12px;
    cursor: pointer;
    transition: border-color 0.2s, transform 0.2s;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  .skill-card:hover, .skill-card.active {
    border-color: #00C2D4;
    transform: translateY(-4px);
  }
  .skill-icon { font-size: 36px; }
  .skill-name {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    color: #fff;
  }
  .skill-info-box {
    margin-top: 20px;
    background: #0d1117;
    border: 1.5px dashed #444;
    border-radius: 8px;
    padding: 14px 20px;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    color: #00C2D4;
    letter-spacing: 1px;
    min-height: 52px;
    transition: all 0.3s;
  }

  .projects-inner {
    padding: 56px 24px 32px;
    text-align: center;
  }
  .projects-title {
    font-family: 'Bangers', cursive;
    font-size: 28px;
    letter-spacing: 3px;
    color: #fff;
    margin-bottom: 6px;
  }
  .projects-sub {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    color: #888;
    margin-bottom: 28px;
    letter-spacing: 1px;
  }
  .phones-row {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
  }
  .phone-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    cursor: pointer;
  }
  .phone-shell {
    width: 130px;
    background: #0d1117;
    border: 3px solid #fff;
    border-radius: 22px;
    overflow: hidden;
    transition: transform 0.2s, border-color 0.2s;
  }
  .phone-wrap:hover .phone-shell {
    border-color: #00C2D4;
    transform: translateY(-6px);
  }
  .phone-notch {
    background: #000;
    height: 14px;
    width: 50%;
    margin: 0 auto;
    border-radius: 0 0 10px 10px;
  }
  .phone-screen {
    padding: 8px;
    min-height: 190px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .phone-label-btn {
    background: #0d1117;
    border: 1.5px solid #fff;
    color: #fff;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    padding: 6px 16px;
    border-radius: 20px;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
  }
  .phone-wrap:hover .phone-label-btn {
    background: #00C2D4;
    color: #0d1117;
    border-color: #00C2D4;
  }

  .lux-header { font-family:'Space Mono',monospace; font-size:9px; color:#fff; display:flex; justify-content:space-between; align-items:center; }
  .lux-sale { background:#00C2D4; color:#0d1117; font-size:8px; font-weight:700; padding:1px 5px; border-radius:3px; }
  .lux-product { background:#1a1a2e; border-radius:6px; padding:8px; text-align:center; }
  .lux-shoe { font-size:28px; }
  .lux-name { font-family:'Space Mono',monospace; font-size:7px; color:#aaa; margin-top:2px; }
  .lux-price { background:#00C2D4; color:#0d1117; font-size:7px; font-weight:700; padding:1px 5px; border-radius:3px; float:right; }
  .lux-items { display:flex; gap:4px; margin-top:4px; }
  .lux-item { background:#1a1a2e; border-radius:4px; flex:1; padding:4px; text-align:center; font-family:'Space Mono',monospace; font-size:7px; color:#aaa; }
  .lux-btn { background:#00C2D4; color:#0d1117; font-family:'Space Mono',monospace; font-size:7px; font-weight:700; padding:4px; border-radius:4px; margin-top:auto; text-align:center; }

  .sk-header { font-family:'Space Mono',monospace; font-size:9px; color:#fff; display:flex; justify-content:space-between; }
  .sk-badge { background:#e63946; color:#fff; font-size:7px; padding:1px 5px; border-radius:3px; }
  .sk-circle { width:50px; height:50px; border-radius:50%; border:3px solid #00C2D4; display:flex; align-items:center; justify-content:center; margin:6px auto; font-family:'Space Mono',monospace; font-size:10px; color:#00C2D4; font-weight:700; }
  .sk-course { font-family:'Space Mono',monospace; font-size:7px; color:#aaa; text-align:left; margin-bottom:2px; }
  .sk-item { display:flex; justify-content:space-between; font-family:'Space Mono',monospace; font-size:7px; color:#ccc; padding:2px 0; border-bottom:1px solid #222; }
  .sk-done { color:#00C2D4; }
  .sk-todo { color:#888; }
  .sk-btn { background:#00C2D4; color:#0d1117; font-family:'Space Mono',monospace; font-size:7px; font-weight:700; padding:4px; border-radius:4px; margin-top:auto; text-align:center; }

  .fiverr-inner {
    padding: 56px 24px 32px;
    text-align: center;
  }
  .fiverr-title {
    font-family: 'Bangers', cursive;
    font-size: 28px;
    letter-spacing: 3px;
    color: #fff;
    margin-bottom: 6px;
  }
  .fiverr-sub {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    color: #888;
    margin-bottom: 24px;
    letter-spacing: 1px;
  }
  .fiverr-card {
    background: #0d1117;
    border: 2px solid #1dbf73;
    border-radius: 12px;
    padding: 20px 24px;
    max-width: 420px;
    margin: 0 auto 20px;
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .fiverr-avatar {
    width: 48px; height: 48px;
    border-radius: 50%;
    background: #1dbf73;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Bangers', cursive;
    font-size: 20px;
    color: #fff;
    flex-shrink: 0;
  }
  .fiverr-info { text-align: left; flex: 1; }
  .fiverr-name {
    font-family: 'Space Mono', monospace;
    font-size: 13px;
    font-weight: 700;
    color: #fff;
  }
  .fiverr-handle {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    color: #888;
    margin-top: 2px;
  }
  .fiverr-stats {
    display: flex;
    gap: 12px;
    margin-top: 8px;
  }
  .fiverr-stat {
    background: #111820;
    border: 1px solid #333;
    border-radius: 6px;
    padding: 6px 12px;
    text-align: center;
  }
  .fiverr-stat-val {
    font-family: 'Bangers', cursive;
    font-size: 18px;
    color: #1dbf73;
  }
  .fiverr-stat-label {
    font-family: 'Space Mono', monospace;
    font-size: 8px;
    color: #888;
    margin-top: 2px;
  }
  .fiverr-order-btn {
    display: inline-block;
    background: #1dbf73;
    color: #fff;
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    font-weight: 700;
    padding: 10px 24px;
    border-radius: 6px;
    text-decoration: none;
    letter-spacing: 1px;
    flex-shrink: 0;
    transition: opacity 0.2s;
  }
  .fiverr-order-btn:hover { opacity: 0.85; }
  .fiverr-review {
    background: #111820;
    border: 2px solid #1dbf73;
    border-radius: 12px;
    padding: 20px 24px;
    max-width: 420px;
    margin: 0 auto;
    text-align: left;
  }
  .fiverr-review-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }
  .fiverr-review-label {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    color: #1dbf73;
    letter-spacing: 1px;
  }
  .fiverr-stars { color: #f5c518; font-size: 14px; }
  .fiverr-review-text {
    font-family: 'Nunito', sans-serif;
    font-size: 13px;
    color: #ccc;
    line-height: 1.6;
    font-style: italic;
    margin-bottom: 12px;
  }
  .fiverr-reviewer {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    color: #888;
  }
  .fiverr-reviewer span { color: #1dbf73; }

  .contact-inner {
    padding: 56px 24px 40px;
    text-align: center;
    background: #0d1117;
  }
  .contact-title {
    font-family: 'Bangers', cursive;
    font-size: 32px;
    letter-spacing: 2px;
    color: #fff;
    margin-bottom: 20px;
    line-height: 1.3;
  }
  .contact-title span { color: #00C2D4; text-decoration: underline; }
  .contact-icons {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-bottom: 28px;
  }
  .contact-icon-btn {
    width: 50px; height: 50px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    cursor: pointer;
    text-decoration: none;
    transition: background 0.2s, transform 0.2s;
  }
  .contact-icon-btn:hover {
    background: #00C2D4;
    transform: scale(1.1);
  }
  .modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    padding: 20px;
  }
  .modal-box {
    background: #111820;
    border: 2.5px solid #fff;
    border-radius: 12px;
    padding: 28px 24px;
    max-width: 400px;
    width: 100%;
    position: relative;
    box-shadow: 6px 6px 0 #00C2D4;
  }
  .modal-close {
    position: absolute;
    top: 12px; right: 14px;
    background: transparent;
    border: none;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
  }
  .modal-title {
    font-family: 'Bangers', cursive;
    font-size: 26px;
    letter-spacing: 2px;
    color: #fff;
    margin-bottom: 6px;
  }
  .modal-stack {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    color: #00C2D4;
    margin-bottom: 14px;
    letter-spacing: 1px;
  }
  .modal-desc {
    font-family: 'Nunito', sans-serif;
    font-size: 13px;
    color: #ccc;
    margin-bottom: 14px;
    line-height: 1.6;
  }
  .modal-features {
    list-style: none;
    margin-bottom: 18px;
  }
  .modal-features li {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    color: #fff;
    padding: 4px 0;
    border-bottom: 1px solid #222;
  }
  .modal-features li::before { content: "▶ "; color: #00C2D4; }
  .modal-github-btn {
    display: block;
    width: 100%;
    background: #00C2D4;
    color: #0d1117;
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    font-weight: 700;
    padding: 12px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    letter-spacing: 1px;
    transition: opacity 0.2s;
  }
  .modal-github-btn:hover { opacity: 0.85; }
  .footer-text {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    color: #444;
    margin-top: 28px;
    letter-spacing: 1px;
  }
`;

const skillData = {
  Flutter: { icon: "🐦", info: "Cross-platform mobile apps with a single codebase. Building LuxeMart, Skillora & EduStream with it!" },
  Firebase: { icon: "🔥", info: "Auth, Firestore, Real-Time DB & Storage — the backbone of all real-time features." },
  Dart: { icon: "🎯", info: "The language behind Flutter. Clean OOP, async/await, and stream-based architecture." },
  "VS Code": { icon: "💻", info: "Primary code editor with Flutter & Dart extensions for a smooth dev experience." },
  "Android Studio": { icon: "🤖", info: "Official IDE for Android & Flutter development — used for emulators, debugging, and production builds." },
};

const bubbles = [
  "Hi, I build mobile apps 🚀",
  "Flutter is my jam 🐦",
  "Let's scale your app 📱",
];

export default function App() {
  const [saying, setSaying] = useState(bubbles[0]);
  const [displayed, setDisplayed] = useState(bubbles[0]);
  const [custom, setCustom] = useState("");
  const [activeSkill, setActiveSkill] = useState(null);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(saying.slice(0, i));
      if (i >= saying.length) clearInterval(interval);
    }, 45);
    return () => clearInterval(interval);
  }, [saying]);

  const tickerText = "HANZLA SAJID // FLUTTER DEVELOPER // MOBILE APP ENGINEER // FIREBASE // DART // UI/UX // REAL-TIME APPS // ";

  return (
    <>
      <style>{styles}</style>

      <div className="ticker">
        <span className="ticker-inner">{tickerText.repeat(4)}</span>
      </div>

      <div className="header">
        <span className="header-badge">ISSUE #01 &nbsp; EST. 2026</span>
        <span className="header-title">HANZLA SAJID // FOLIO</span>
        <a href="https://hanzlasajid888.github.io/my-portfolio/Hanzla_Sajid_CV.pdf" download style={{ background: "transparent", color: "#00C2D4", border: "1px solid #00C2D4", fontFamily:"'Space Mono',monospace", fontSize:"11px", fontWeight:"700", padding:"4px 10px", borderRadius:"2px", letterSpacing:"1px", textDecoration:"none", cursor:"pointer" }}>📄 DOWNLOAD CV</a>
      </div>

      <div className="folio-wrap">

        {/* PANEL 1 — HERO */}
        <div className="panel">
          <span className="panel-label">PANEL 1 // INTRO</span>
          <div className="hero-inner">
            <div className="speech-bubble">{displayed}</div>
            <div className="avatar-wrap">
              <img
                src="https://hanzlasajid888.github.io/my-portfolio/photo.png"
                alt="Hanzla Sajid"
                style={{ width:"160px", height:"160px", borderRadius:"50%", border:"3px solid #fff", objectFit:"cover", display:"block" }}
              />
              <div className="click-btn">Click to code!</div>
            </div>
            <div className="hero-name">HANZLA SAJID</div>
            <div className="hero-sub">MOBILE APPLICATION ENGINEER // FLUTTER DEVELOPER</div>
            <div style={{ marginTop:16, fontFamily:"'Space Mono',monospace", fontSize:10, color:"#888", letterSpacing:1 }}>
              💡 TRY MAKING HANZLA SAY:
            </div>
            <div className="bubble-prompts">
              {bubbles.map(b => (
                <button key={b} className={`bubble-chip ${saying === b ? "active" : ""}`} onClick={() => setSaying(b)}>{b}</button>
              ))}
            </div>
            <div className="custom-say">
              <input
                placeholder="Write custom text..."
                value={custom}
                onChange={e => setCustom(e.target.value)}
                onKeyDown={e => e.key === "Enter" && custom.trim() && (setSaying(custom), setCustom(""))}
              />
              <button className="bubble-btn" onClick={() => { if (custom.trim()) { setSaying(custom); setCustom(""); } }}>Bubble!</button>
            </div>
          </div>
        </div>

        {/* PANEL 2 — SKILLS */}
        <div className="panel">
          <span className="panel-label">PANEL 2 // STACK</span>
          <div className="skills-inner">
            <div className="skills-title">ARSENAL OF TOOLS</div>
            <div className="skills-sub">Click an icon to read Hanzla's stack profile</div>
            <div className="skills-grid">
              {Object.entries(skillData).map(([name, { icon }]) => (
                <div key={name} className={`skill-card ${activeSkill === name ? "active" : ""}`} onClick={() => setActiveSkill(activeSkill === name ? null : name)}>
                  <div className="skill-icon">{icon}</div>
                  <div className="skill-name">{name}</div>
                </div>
              ))}
            </div>
            <div className="skill-info-box">
              {activeSkill ? `👾 ${skillData[activeSkill].info}` : "👆 CLICK AN ICON ABOVE TO READ HANZLA'S STACK PROFILE"}
            </div>
          </div>
        </div>

        {/* PANEL 3 — PROJECTS */}
        <div className="panel">
          <span className="panel-label">PANEL 3 // WORK</span>
          <div className="projects-inner">
            <div className="projects-title">SIMULATED PROJECTS</div>
            <div className="projects-sub">Tap any mobile device to explore the project</div>
            <div className="phones-row">

              <div className="phone-wrap" onClick={() => setActiveProject("luxemart")}>
                <div className="phone-shell">
                  <div className="phone-notch" />
                  <div className="phone-screen">
                    <div className="lux-header">LuxeMart <span className="lux-sale">SALE</span></div>
                    <div className="lux-product">
                      <div className="lux-shoe">👟</div>
                      <div className="lux-name">Retro Air Kick <span className="lux-price">$99</span></div>
                    </div>
                    <div className="lux-items">
                      <div className="lux-item">$45<br />Hoodie</div>
                      <div className="lux-item">$29<br />Cap</div>
                    </div>
                    <div className="lux-btn">⚡ Tap to Shop</div>
                  </div>
                </div>
                <button className="phone-label-btn">LuxeMart</button>
              </div>

              <div className="phone-wrap" onClick={() => setActiveProject("skillora")}>
                <div className="phone-shell">
                  <div className="phone-notch" />
                  <div className="phone-screen">
                    <div className="sk-header">Skillora <span className="sk-badge">14 Days</span></div>
                    <div className="sk-circle">50%</div>
                    <div className="sk-course">Course Progress</div>
                    <div className="sk-item"><span>1. Dart Basics</span><span className="sk-done">✓ Done</span></div>
                    <div className="sk-item"><span>2. Widgets Flow</span><span className="sk-done">✓ Done</span></div>
                    <div className="sk-item"><span>3. State Mgmt</span><span className="sk-todo">○ Todo</span></div>
                    <div className="sk-btn">🎯 Learn &amp; Checklist</div>
                  </div>
                </div>
                <button className="phone-label-btn">Skillora</button>
              </div>

              <div className="phone-wrap" onClick={() => setActiveProject("edustream")}>
                <div className="phone-shell">
                  <div className="phone-notch" />
                  <div className="phone-screen">
                    <div style={{fontFamily:"'Space Mono',monospace",fontSize:"9px",color:"#00C2D4",display:"flex",justifyContent:"space-between"}}>EduStream <span style={{background:"#00C2D4",color:"#0d1117",fontSize:"7px",padding:"1px 5px",borderRadius:"3px"}}>WEB</span></div>
                    <div style={{background:"#1a1a2e",borderRadius:"6px",padding:"6px",marginTop:"4px"}}>
                      <div style={{fontFamily:"'Space Mono',monospace",fontSize:"7px",color:"#888"}}>Dashboard</div>
                      <div style={{display:"flex",gap:"3px",marginTop:"4px",flexWrap:"wrap"}}>
                        <div style={{background:"#0d1117",borderRadius:"4px",padding:"3px 4px",fontFamily:"'Space Mono',monospace",fontSize:"6px",color:"#00C2D4"}}>👨‍🎓 Students</div>
                        <div style={{background:"#0d1117",borderRadius:"4px",padding:"3px 4px",fontFamily:"'Space Mono',monospace",fontSize:"6px",color:"#00C2D4"}}>💰 Fees</div>
                      </div>
                      <div style={{display:"flex",gap:"3px",marginTop:"3px",flexWrap:"wrap"}}>
                        <div style={{background:"#0d1117",borderRadius:"4px",padding:"3px 4px",fontFamily:"'Space Mono',monospace",fontSize:"6px",color:"#00C2D4"}}>📄 Invoices</div>
                        <div style={{background:"#0d1117",borderRadius:"4px",padding:"3px 4px",fontFamily:"'Space Mono',monospace",fontSize:"6px",color:"#00C2D4"}}>📅 Calendar</div>
                      </div>
                    </div>
                    <div style={{marginTop:"4px",background:"#1a1a2e",borderRadius:"4px",padding:"4px 6px"}}>
                      <div style={{fontFamily:"'Space Mono',monospace",fontSize:"6px",color:"#888"}}>Fee Trend</div>
                      <div style={{display:"flex",alignItems:"flex-end",gap:"3px",height:"24px",marginTop:"3px"}}>
                        {[40,60,45,80,55,90].map((h,i) => (
                          <div key={i} style={{flex:1,background:i===5?"#00C2D4":"#333",height:`${h}%`,borderRadius:"2px"}} />
                        ))}
                      </div>
                    </div>
                    <div style={{background:"#00C2D4",color:"#0d1117",fontFamily:"'Space Mono',monospace",fontSize:"7px",fontWeight:"700",padding:"4px",borderRadius:"4px",marginTop:"auto",textAlign:"center"}}>📊 View System</div>
                  </div>
                </div>
                <button className="phone-label-btn">EduStream</button>
              </div>

              <div className="phone-wrap" onClick={() => setActiveProject("portfolio")}>
                <div className="phone-shell">
                  <div className="phone-notch" />
                  <div className="phone-screen">
                    <div style={{fontFamily:"'Space Mono',monospace",fontSize:"9px",color:"#00C2D4"}}>MY PORTFOLIO</div>
                    <div style={{textAlign:"center",marginTop:"8px"}}>
                      <div style={{fontSize:"32px"}}>🌐</div>
                      <div style={{fontFamily:"'Space Mono',monospace",fontSize:"7px",color:"#fff",marginTop:"4px"}}>Hanzla Sajid</div>
                      <div style={{fontFamily:"'Space Mono',monospace",fontSize:"6px",color:"#888",marginTop:"2px"}}>Flutter Developer</div>
                    </div>
                    <div style={{marginTop:"8px",display:"flex",flexDirection:"column",gap:"4px"}}>
                      <div style={{background:"#1a1a2e",borderRadius:"4px",padding:"4px 6px",fontFamily:"'Space Mono',monospace",fontSize:"7px",color:"#00C2D4"}}>📱 Mobile Apps</div>
                      <div style={{background:"#1a1a2e",borderRadius:"4px",padding:"4px 6px",fontFamily:"'Space Mono',monospace",fontSize:"7px",color:"#00C2D4"}}>🔥 Firebase</div>
                      <div style={{background:"#1a1a2e",borderRadius:"4px",padding:"4px 6px",fontFamily:"'Space Mono',monospace",fontSize:"7px",color:"#00C2D4"}}>🎯 Dart & Flutter</div>
                    </div>
                    <div style={{background:"#00C2D4",color:"#0d1117",fontFamily:"'Space Mono',monospace",fontSize:"7px",fontWeight:"700",padding:"4px",borderRadius:"4px",marginTop:"auto",textAlign:"center"}}>🚀 View Portfolio</div>
                  </div>
                </div>
                <button className="phone-label-btn">Portfolio</button>
              </div>

            </div>
          </div>
        </div>

        {/* PANEL FIVERR */}
        <div className="panel">
          <span className="panel-label">PANEL 4 // FIVERR</span>
          <div className="fiverr-inner">
            <div className="fiverr-title">CLIENT REVIEWS</div>
            <div className="fiverr-sub">Verified reviews from real clients on Fiverr</div>
            <div className="fiverr-card">
              <div className="fiverr-avatar">fi</div>
              <div className="fiverr-info">
                <div className="fiverr-name">Fiverr Profile</div>
                <div className="fiverr-handle">@hanzla_sajid00</div>
                <div className="fiverr-stats">
                  <div className="fiverr-stat">
                    <div className="fiverr-stat-val">5.0</div>
                    <div className="fiverr-stat-label">★ RATING</div>
                  </div>
                  <div className="fiverr-stat">
                    <div className="fiverr-stat-val">1+</div>
                    <div className="fiverr-stat-label">ORDERS</div>
                  </div>
                  <div className="fiverr-stat">
                    <div className="fiverr-stat-val">NEW</div>
                    <div className="fiverr-stat-label">SELLER</div>
                  </div>
                </div>
              </div>
              <a className="fiverr-order-btn" href="https://fiverr.com/hanzla_sajid00" target="_blank" rel="noreferrer">Order →</a>
            </div>
            <div className="fiverr-review">
              <div className="fiverr-review-header">
                <span className="fiverr-review-label">⭐ Client Testimonial</span>
                <span className="fiverr-stars">★★★★★</span>
              </div>
              <div className="fiverr-review-text">
                "Hanzla delivered excellent work! Fixed all Flutter bugs quickly and efficiently. Clean code, great communication, and fast delivery. Highly recommended!"
              </div>
              <div className="fiverr-reviewer">
                🇬🇧 <span>alambodlah</span> — United Kingdom •
              </div>
            </div>
          </div>
        </div>

        {/* PANEL 5 — CONTACT */}
        <div className="panel">
          <span className="panel-label">PANEL 5 // CONTACT</span>
          <div className="contact-inner">
            <div className="contact-title">Let's <span>build something cool</span> together!</div>
            <div className="contact-icons">
              <a href="mailto:ranahunzlaa.huni888@gmail.com" className="contact-icon-btn" title="Email">✉️</a>
              <a href="https://github.com/HanzlaSajid888" target="_blank" rel="noreferrer" className="contact-icon-btn" title="GitHub">🐙</a>
              <a href="https://linkedin.com/in/hanzla-sajid-flutter" target="_blank" rel="noreferrer" className="contact-icon-btn" title="LinkedIn">💼</a>
            </div>
            <a href="https://hanzlasajid888.github.io/my-portfolio/Hanzla_Sajid_CV.pdf" download style={{ display:"inline-block", background:"#00C2D4", color:"#0d1117", fontFamily:"'Space Mono',monospace", fontSize:"13px", fontWeight:"700", padding:"12px 32px", borderRadius:"8px", textDecoration:"none", letterSpacing:"1px", marginBottom:"16px", boxShadow:"4px 4px 0 #fff", transition:"opacity 0.2s" }}>📄 DOWNLOAD CV</a>
            <a href="https://wa.me/923248619806?text=Hi%20Hanzla!%20I%20saw%20your%20portfolio%20and%20would%20love%20to%20connect%20%F0%9F%9A%80" target="_blank" rel="noreferrer" style={{ display:"inline-block", background:"#25D366", color:"#fff", fontFamily:"'Space Mono',monospace", fontSize:"13px", fontWeight:"700", padding:"12px 32px", borderRadius:"8px", textDecoration:"none", letterSpacing:"1px", marginBottom:"24px", boxShadow:"4px 4px 0 #fff", transition:"opacity 0.2s" }}>💬 CHAT ON WHATSAPP</a>
            <div className="footer-text">© 2026 Hanzla Sajid. Handcoded with Flutter love &amp; React.</div>
          </div>
        </div>

        {/* PROJECT MODAL */}
        {activeProject && (
          <div className="modal-overlay" onClick={() => setActiveProject(null)}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setActiveProject(null)}>✕</button>

              {activeProject === "luxemart" && (<>
                <div className="modal-title">LuxeMart</div>
                <div className="modal-stack">Flutter • Firebase • UI/UX</div>
                <div className="modal-desc">A fully functional e-commerce mobile app built with Flutter & Firebase. Started as a class project — evolved into a production-ready shopping experience.</div>
                <ul className="modal-features">
                  <li>Product listings & cart management</li>
                  <li>Firebase Authentication & Firestore</li>
                  <li>Clean modern UI/UX design</li>
                  <li>Real-time data sync</li>
                </ul>
                <a className="modal-github-btn" href="https://github.com/HanzlaSajid888/grproject" target="_blank" rel="noreferrer">🐙 View on GitHub</a>
                <a className="modal-github-btn" href="https://www.linkedin.com/posts/hanzla-sajid-flutter_flutter-firebase-mobileapp-ugcPost-7463820417816846336-thyj/" target="_blank" rel="noreferrer" style={{marginTop:"8px", background:"#0077b5", display:"block"}}>💼 View Demo on LinkedIn</a>
              </>)}

              {activeProject === "skillora" && (<>
                <div className="modal-title">Skillora</div>
                <div className="modal-stack">Flutter • Firebase • Real-Time</div>
                <div className="modal-desc">A peer-to-peer skill-sharing platform where users teach what they know and learn what they don't. No money — just skills.</div>
                <ul className="modal-features">
                  <li>Real-time chat & session management</li>
                  <li>Firebase Real-Time Database</li>
                  <li>Skill matching & user profiles</li>
                  <li>Audio & video calling features</li>
                </ul>
                <a className="modal-github-btn" href="https://github.com/HanzlaSajid888/skillswap" target="_blank" rel="noreferrer">🐙 View on GitHub</a>
                <a className="modal-github-btn" href="https://www.linkedin.com/posts/hanzla-sajid-flutter_flutter-mobiledevelopment-appdevelopment-ugcPost-7456197532134629377-3dWy/" target="_blank" rel="noreferrer" style={{marginTop:"8px", background:"#0077b5", display:"block"}}>💼 View Demo on LinkedIn</a>
              </>)}

              {activeProject === "edustream" && (<>
                <div className="modal-title">EduStream</div>
                <div className="modal-stack">Flutter • Dart • REST API • JWT • Web + Android + iOS</div>
                <div className="modal-desc">A full-featured School Management System built with Flutter — runs on Web, Android & iOS. Includes JWT auth, real-time dashboard, fee charts, student directory, and PDF invoice generation.</div>
                <ul className="modal-features">
                  <li>JWT login with token persistence</li>
                  <li>Dashboard — students, fees, pending invoices</li>
                  <li>Fee trend chart (last 6 months)</li>
                  <li>Student directory — enroll, search, filter</li>
                  <li>PDF invoice with QR code & FBR integration</li>
                  <li>Academic calendar with events</li>
                </ul>
                <a className="modal-github-btn" href="https://github.com/HanzlaSajid888/schoolsyestem" target="_blank" rel="noreferrer">🐙 View on GitHub</a>
                <a className="modal-github-btn" href="https://www.linkedin.com/posts/hanzla-sajid-flutter_flutter-flutterdev-dart-ugcPost-7466810476862201856-bE4-/" target="_blank" rel="noreferrer" style={{marginTop:"8px", background:"#0077b5", display:"block"}}>💼 View Demo on LinkedIn</a>
              </>)}

              {activeProject === "portfolio" && (<>
                <div className="modal-title">This Portfolio!</div>
                <div className="modal-stack">React • CSS Animations • Google AI Studio</div>
                <div className="modal-desc">The comic-strip style portfolio you're looking at right now! Designed with Google AI Studio & built with React.</div>
                <ul className="modal-features">
                  <li>Comic strip panel layout</li>
                  <li>Typing animation & interactive bubbles</li>
                  <li>Clickable project mockups</li>
                  <li>Fiverr reviews section</li>
                </ul>
                <a className="modal-github-btn" href="https://github.com/HanzlaSajid888/my-portfolio" target="_blank" rel="noreferrer">🐙 View on GitHub</a>
              </>)}

            </div>
          </div>
        )}

      </div>
    </>
  );
}
