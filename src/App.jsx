import { useState, useEffect, useRef } from "react";

const projects = [
  {
    title: "AI Caption Generator",
    desc: "Generates viral social media captions using AI in seconds.",
    tags: ["React", "OpenAI API", "CSS"],
    color: "#a78bfa",
    icon: "✦",
  },
  {
    title: "Portfolio Website",
    desc: "Personal website to showcase skills, projects and identity.",
    tags: ["React", "CSS3", "Vite"],
    color: "#34d399",
    icon: "◈",
  },
  {
    title: "Landing Page UI",
    desc: "Modern, responsive landing page with silky animations.",
    tags: ["HTML", "CSS", "JS"],
    color: "#f472b6",
    icon: "❋",
  },
];

const skills = ["HTML", "CSS", "JavaScript", "React", "Vite", "Git", "Python", "Node.js"];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [big, setBig] = useState(false);
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = () => setBig(true);
    const out = () => setBig(false);
    window.addEventListener("mousemove", move);
    document.querySelectorAll("a,button,.card").forEach((el) => {
      el.addEventListener("mouseenter", over);
      el.addEventListener("mouseleave", out);
    });
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        width: big ? 40 : 14,
        height: big ? 40 : 14,
        borderRadius: "50%",
        background: big ? "rgba(167,139,250,0.18)" : "#a78bfa",
        border: "1.5px solid #a78bfa",
        transform: "translate(-50%,-50%)",
        pointerEvents: "none",
        transition: "width .18s, height .18s, background .18s",
        zIndex: 9999,
        mixBlendMode: "screen",
      }}
    />
  );
}

export default function App() {
  const [heroRef, heroVis] = useInView(0.1);
  const [aboutRef, aboutVis] = useInView();
  const [projRef, projVis] = useInView();
  const [skillRef, skillVis] = useInView();
  const [contactRef, contactVis] = useInView();
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("aryanbmistry@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ background: "#080b14", minHeight: "100vh", color: "#e2e8f0", overflowX: "hidden" }}>
      <Cursor />

      {/* NOISE OVERLAY */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
        opacity: 0.4,
      }} />

      {/* GLOW BLOBS */}
      <div style={{
        position: "fixed", top: "-10%", left: "50%", transform: "translateX(-50%)",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", bottom: "10%", right: "-10%",
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, width: "100%", zIndex: 100,
        background: "rgba(8,11,20,0.8)", backdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 5vw", height: 60,
      }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, letterSpacing: 1, color: "#a78bfa" }}>
          AM<span style={{ color: "#34d399" }}>.</span>
        </span>
        {/* Desktop links */}
        <div className="nav-links" style={{ display: "flex", gap: 32 }}>
          {["about", "projects", "skills", "contact"].map((s) => (
            <a key={s} href={`#${s}`} style={{
              color: "#94a3b8", fontSize: 14, textDecoration: "none",
              letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "'DM Mono', monospace",
              transition: "color .2s",
            }}
              onMouseEnter={e => e.target.style.color = "#a78bfa"}
              onMouseLeave={e => e.target.style.color = "#94a3b8"}
            >{s}</a>
          ))}
        </div>
        {/* Hamburger */}
        <button onClick={() => setMenuOpen(v => !v)} style={{
          display: "none", background: "none", border: "none", color: "#e2e8f0",
          fontSize: 22, cursor: "pointer",
        }} className="hamburger">☰</button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 60, left: 0, right: 0, zIndex: 99,
          background: "rgba(8,11,20,0.97)", padding: "20px 5vw 30px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          {["about", "projects", "skills", "contact"].map((s) => (
            <a key={s} href={`#${s}`} onClick={() => setMenuOpen(false)} style={{
              display: "block", color: "#94a3b8", fontSize: 16, textDecoration: "none",
              padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.04)",
              letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "'DM Mono', monospace",
            }}>{s}</a>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="hero" ref={heroRef} style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", textAlign: "center", padding: "100px 5vw 60px",
        position: "relative", zIndex: 1,
      }}>
        <p style={{
          fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#a78bfa",
          letterSpacing: 4, textTransform: "uppercase", marginBottom: 20,
          opacity: heroVis ? 1 : 0, transform: heroVis ? "translateY(0)" : "translateY(20px)",
          transition: "opacity .7s .1s, transform .7s .1s",
        }}>Hello, I'm</p>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(52px, 10vw, 96px)",
          fontWeight: 700, lineHeight: 1.05,
          background: "linear-gradient(135deg, #e2e8f0 30%, #a78bfa 70%, #34d399 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          margin: "0 0 8px",
          opacity: heroVis ? 1 : 0, transform: heroVis ? "translateY(0)" : "translateY(30px)",
          transition: "opacity .8s .25s, transform .8s .25s",
        }}>Aryan Mistry</h1>

        <p style={{
          fontFamily: "'DM Mono', monospace", fontSize: "clamp(13px, 2vw, 16px)",
          color: "#64748b", letterSpacing: 2, textTransform: "uppercase", marginBottom: 40,
          opacity: heroVis ? 1 : 0, transform: heroVis ? "translateY(0)" : "translateY(20px)",
          transition: "opacity .7s .45s, transform .7s .45s",
        }}>Web Developer · UI Designer · AI Enthusiast</p>

        <div style={{
          display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center",
          opacity: heroVis ? 1 : 0, transform: heroVis ? "translateY(0)" : "translateY(20px)",
          transition: "opacity .7s .6s, transform .7s .6s",
        }}>
          <a href="#projects" style={{
            padding: "13px 32px", borderRadius: 50,
            background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
            color: "#fff", textDecoration: "none", fontWeight: 600,
            fontSize: 14, letterSpacing: 1, fontFamily: "'DM Sans', sans-serif",
            boxShadow: "0 0 30px rgba(139,92,246,0.4)", transition: "transform .2s, box-shadow .2s",
          }}
            onMouseEnter={e => { e.target.style.transform = "scale(1.05)"; e.target.style.boxShadow = "0 0 50px rgba(139,92,246,0.6)"; }}
            onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 0 30px rgba(139,92,246,0.4)"; }}
          >View Projects</a>
          <a href="#contact" style={{
            padding: "13px 32px", borderRadius: 50,
            border: "1px solid rgba(167,139,250,0.4)",
            color: "#a78bfa", textDecoration: "none", fontWeight: 600,
            fontSize: 14, letterSpacing: 1, fontFamily: "'DM Sans', sans-serif",
            background: "rgba(167,139,250,0.05)", transition: "border-color .2s, background .2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#a78bfa"; e.currentTarget.style.background = "rgba(167,139,250,0.12)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(167,139,250,0.4)"; e.currentTarget.style.background = "rgba(167,139,250,0.05)"; }}
          >Get In Touch</a>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          opacity: 0.4, animation: "bounce 2s infinite",
        }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 2, color: "#64748b" }}>SCROLL</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #64748b, transparent)" }} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" ref={aboutRef} style={{
        padding: "100px 5vw", maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1,
      }}>
        <div style={{
          opacity: aboutVis ? 1 : 0, transform: aboutVis ? "translateY(0)" : "translateY(40px)",
          transition: "opacity .8s, transform .8s",
        }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#a78bfa", letterSpacing: 4, textTransform: "uppercase", marginBottom: 12 }}>01 / About</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, marginBottom: 28, lineHeight: 1.2 }}>
            Crafting digital<br /><span style={{ color: "#a78bfa" }}>experiences</span> that matter
          </h2>
          <p style={{
            fontSize: 17, lineHeight: 1.9, color: "#94a3b8", maxWidth: 640,
            fontFamily: "'DM Sans', sans-serif",
          }}>
            I'm a passionate web developer who turns ideas into clean, fast, and beautiful interfaces. I love building things that live on the internet — from sleek landing pages to AI-powered tools that actually solve real problems.
          </p>
          <div style={{ display: "flex", gap: 32, marginTop: 40, flexWrap: "wrap" }}>
            {[["3+", "Projects Built"], ["1", "Year Experience"], ["100%", "Dedication"]].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, color: "#a78bfa", fontWeight: 700 }}>{num}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#64748b", letterSpacing: 2, textTransform: "uppercase" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" ref={projRef} style={{ padding: "100px 5vw", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{
            opacity: projVis ? 1 : 0, transform: projVis ? "translateY(0)" : "translateY(30px)",
            transition: "opacity .7s, transform .7s",
          }}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#34d399", letterSpacing: 4, textTransform: "uppercase", marginBottom: 12 }}>02 / Projects</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, marginBottom: 48, lineHeight: 1.2 }}>
              Things I've <span style={{ color: "#34d399" }}>built</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {projects.map((p, i) => (
              <div key={p.title} className="card" style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid rgba(255,255,255,0.07)`,
                borderRadius: 20, padding: "28px 28px 24px",
                transition: "transform .3s, border-color .3s, box-shadow .3s",
                cursor: "pointer",
                opacity: projVis ? 1 : 0,
                transform: projVis ? "translateY(0)" : "translateY(40px)",
                transitionDelay: `${i * 0.12}s`,
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.borderColor = `${p.color}55`;
                  e.currentTarget.style.boxShadow = `0 20px 60px ${p.color}18`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 16, color: p.color }}>{p.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, marginBottom: 10, color: "#e2e8f0" }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>{p.desc}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
                  {p.tags.map(t => (
                    <span key={t} style={{
                      fontSize: 11, padding: "4px 10px", borderRadius: 20,
                      background: `${p.color}15`, color: p.color,
                      fontFamily: "'DM Mono', monospace", letterSpacing: 1,
                    }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  {["Live ↗", "GitHub"].map(label => (
                    <button key={label} style={{
                      flex: 1, padding: "9px 0",
                      background: label.includes("Live") ? `${p.color}18` : "transparent",
                      border: `1px solid ${label.includes("Live") ? p.color + "44" : "rgba(255,255,255,0.1)"}`,
                      color: label.includes("Live") ? p.color : "#64748b",
                      borderRadius: 10, fontSize: 13, cursor: "pointer",
                      fontFamily: "'DM Mono', monospace", letterSpacing: 1,
                      transition: "background .2s",
                    }}
                      onMouseEnter={e => e.target.style.background = `${p.color}28`}
                      onMouseLeave={e => e.target.style.background = label.includes("Live") ? `${p.color}18` : "transparent"}
                    >{label}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" ref={skillRef} style={{ padding: "80px 5vw", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{
            opacity: skillVis ? 1 : 0, transform: skillVis ? "translateY(0)" : "translateY(30px)",
            transition: "opacity .7s, transform .7s",
          }}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#f472b6", letterSpacing: 4, textTransform: "uppercase", marginBottom: 12 }}>03 / Skills</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, marginBottom: 40 }}>
              My <span style={{ color: "#f472b6" }}>toolkit</span>
            </h2>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              {skills.map((s, i) => (
                <div key={s} style={{
                  padding: "10px 22px", borderRadius: 50,
                  border: "1px solid rgba(244,114,182,0.2)",
                  background: "rgba(244,114,182,0.05)",
                  color: "#f472b6", fontFamily: "'DM Mono', monospace",
                  fontSize: 13, letterSpacing: 1,
                  opacity: skillVis ? 1 : 0,
                  transform: skillVis ? "scale(1)" : "scale(0.8)",
                  transition: `opacity .5s ${i * 0.07}s, transform .5s ${i * 0.07}s`,
                  cursor: "default",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(244,114,182,0.15)"; e.currentTarget.style.transform = "scale(1.05)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(244,114,182,0.05)"; e.currentTarget.style.transform = "scale(1)"; }}
                >{s}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" ref={contactRef} style={{
        padding: "100px 5vw 120px", position: "relative", zIndex: 1,
        textAlign: "center",
      }}>
        <div style={{
          opacity: contactVis ? 1 : 0, transform: contactVis ? "translateY(0)" : "translateY(40px)",
          transition: "opacity .8s, transform .8s",
          maxWidth: 600, margin: "0 auto",
        }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#a78bfa", letterSpacing: 4, textTransform: "uppercase", marginBottom: 12 }}>04 / Contact</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, marginBottom: 16, lineHeight: 1.2 }}>
            Let's build something<br /><span style={{ color: "#a78bfa" }}>great together</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#64748b", lineHeight: 1.8, marginBottom: 40 }}>
            I'm currently open to freelance projects and internship opportunities. Drop me a message!
          </p>
          <button onClick={copyEmail} style={{
            padding: "16px 40px", borderRadius: 50, fontSize: 15,
            background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
            color: "#fff", border: "none", cursor: "pointer", fontWeight: 600,
            letterSpacing: 1, fontFamily: "'DM Sans', sans-serif",
            boxShadow: "0 0 40px rgba(139,92,246,0.35)", transition: "transform .2s, box-shadow .2s",
          }}
            onMouseEnter={e => { e.target.style.transform = "scale(1.04)"; e.target.style.boxShadow = "0 0 60px rgba(139,92,246,0.5)"; }}
            onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 0 40px rgba(139,92,246,0.35)"; }}
          >
            {copied ? "✓ Email Copied!" : "✉ aryanbmistry@gmail.com"}
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "24px 5vw",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 12, position: "relative", zIndex: 1,
      }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#a78bfa" }}>AM<span style={{ color: "#34d399" }}>.</span></span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#334155", letterSpacing: 1 }}>© 2026 Aryan Mistry</span>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Mono:wght@400&family=DM+Sans:wght@400;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        @media (max-width: 640px) {
          .nav-links { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </div>
  );
}
