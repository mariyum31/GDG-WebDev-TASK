"use client";
import { useEffect, useRef, useState, ReactNode } from "react";

const C = ["#4285f4", "#ea4335", "#fbbc04", "#34a853"];
const NAV = [["Home", 0], ["About", 1], ["Events", 2], ["Team", 3], ["FAQs", 0], ["Contact", 1]] as const;
const FAQS = [
  ["What is GDG RBU?", "GDG RBU is a community empowering students through hands-on workshops, hackathons, mentorship and collaboration."],
  ["How to join GDG?", "Hit the Join button, fill in the form and attend our next orientation session."],
  ["What does a GDG Lead do?", "Leads organise events, mentor members and connect the chapter with Google's developer ecosystem."],
  ["How is GDG related to Google?", "GDG is a community program supported by Google Developers, run independently by local volunteers."],
  ["How to reach us?", "Email gdgrbu@rbunagpur.in or visit us on campus."],
];

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (el.classList.add("in"), io.disconnect()), { threshold: 0.15 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function Logo() { return <div className="logo">{C.map((c) => <i key={c} style={{ background: c }} />)}</div>; }

function Nav() {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.dataset.theme === "dark"), []);
  const toggle = () => {
    const t = dark ? "light" : "dark";
    document.documentElement.dataset.theme = t; localStorage.setItem("theme", t); setDark(!dark);
  };
  return (
    <nav><div className="wrap">
      <Logo />
      {NAV.map(([n], i) => <a key={n} href={`#${n.toLowerCase()}`} className="pill" style={{ background: C[i % 4] }}>{n}</a>)}
      <button className="btn" onClick={toggle} aria-label="Toggle theme">{dark ? "☀ Light" : "🌙 Dark"}</button>
    </div></nav>
  );
}

function AskGDG() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [msgs, setMsgs] = useState<{ u: boolean; t: string }[]>([{ u: false, t: "Hi! Ask me anything about GDG RBU ✨" }]);
  const send = async () => {
    if (!q.trim()) return;
    const question = q; setQ(""); setMsgs((m) => [...m, { u: true, t: question }]);
    const r = await fetch("/api/ask", { method: "POST", body: JSON.stringify({ question }) });
    const { answer } = await r.json(); setMsgs((m) => [...m, { u: false, t: answer }]);
  };
  return (
    <div className="chat">
      {open && <div className="box panel"><div className="msgs">{msgs.map((m, i) => m.u ? <b key={i}>{m.t}</b> : <span key={i}>{m.t}</span>)}</div>
        <input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Ask GDG AI…" /></div>}
      <button className="btn" style={{ background: "var(--yellow)", color: "#000" }} onClick={() => setOpen(!open)}>✦ Ask GDG AI</button>
    </div>
  );
}

export default function Home() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <>
      <Nav />
      <main className="wrap">
        <section id="home" className="hero">
          <Reveal>
            <h1>Google Developer Groups, RBU</h1>
            <p>Empowering students with cutting-edge tech skills, community, and resources for a future in technology</p>
            <a className="btn" href="#contact">Join Now</a> <a className="btn" href="#about">Learn More</a>
            <div><span className="tag">Ramdeobaba University</span></div>
          </Reveal>
          <Reveal><div className="blob"><span /></div></Reveal>
        </section>

        <section id="events">
          <h2 className="t">Upcoming Event</h2>
          <Reveal className="events">
            <div className="box ev"><h3>GDG ORIENTATION</h3><p style={{ fontSize: ".8rem" }}>Meet the team, explore what we do and find your track.</p></div>
            <div className="box ev2"><h3>New<br />Event</h3><div style={{ fontSize: ".75rem" }}>Oct 7, 2026 · 6:00 PM</div><a className="btn" style={{ background: "#000", color: "#fff" }} href="#contact">Register Now</a></div>
          </Reveal>
        </section>

        <section id="team"><Reveal className="box team">
          <div id="about"><h2>Meet the Google Developer Group Team</h2><p style={{ fontSize: ".85rem" }}>Our team of passionate students and mentors works to build a thriving tech community on campus.</p>
            <ul><li>◆ <b>Passionate Community Leaders</b> – dedicated to learning, sharing and growing together.</li><li>◇ <b>Empowering Developers</b> – hands-on sessions that turn ideas into projects.</li></ul></div>
          <div className="photo" role="img" aria-label="GDG team photo placeholder" />
        </Reveal></section>

        <section id="faqs">
          <h2 className="t" style={{ fontSize: "2.4rem" }}>FAQs</h2>
          <div className="faq">{FAQS.map(([q, a], i) => (
            <div key={q} className={`box ${openIdx === i ? "open" : ""}`} style={{ boxShadow: "3px 3px 0 var(--fg)" }}>
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)} aria-expanded={openIdx === i}>{q}<span>{openIdx === i ? "−" : "+"}</span></button>
              <div className="a"><p>{a}</p></div>
            </div>))}</div>
        </section>
      </main>

      <footer id="contact">
        <Reveal className="box foot">
          <Logo /><h3 style={{ margin: "8px 0 2px" }}>Google Developer Groups</h3><small>On Campus · Ramdeobaba University</small>
          <div className="row"><div style={{ background: C[0], color: "#000" }}>📍 Ramdeobaba University, Katol Road, Nagpur 440013</div>
            <div style={{ background: C[2], color: "#000" }}>✉ gdgrbu@rbunagpur.in</div></div>
        </Reveal>
        <div className="shapes" aria-hidden>{Array.from({ length: 40 }, (_, i) => (
          <i key={i} style={{ background: C[i % 4], height: 20 + ((i * 13) % 28), borderRadius: i % 3 === 0 ? "50%" : i % 3 === 1 ? "4px" : "50% 50% 0 0", animationDelay: `${i * 0.1}s` }} />))}</div>
      </footer>
      <AskGDG />
    </>
  );
}
