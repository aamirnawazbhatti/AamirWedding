import { useState, useEffect, useRef, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Heart, Music, VolumeX, Sparkles, LogOut } from "lucide-react";
import { motion } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register';

  const [user, setUser] = useState<any>(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthTimerRef = useRef<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
  }, [location.pathname]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (synthTimerRef.current) {
        clearInterval(synthTimerRef.current);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const startWebAudioSynth = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Romantic chord notes (C, E, G, B, D, F#)
      const notes = [261.63, 329.63, 392.00, 493.88, 587.33, 659.25, 783.99];
      let step = 0;

      synthTimerRef.current = setInterval(() => {
        if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Soft sine wave for celesta / harp feel
        osc.type = 'sine';
        const freq = notes[step % notes.length];
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 2.0);

        step++;
      }, 400);
    } catch (e) {
      console.error("Web Audio error:", e);
    }
  };

  const stopWebAudioSynth = () => {
    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.suspend();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const toggleMusic = () => {
    if (!isPlayingMusic) {
      setIsPlayingMusic(true);
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          console.log("Romantic wedding music playing!");
        }).catch(err => {
          console.warn("Audio element play prevented, fallback to Web Audio Synth", err);
          startWebAudioSynth();
        });
      } else {
        startWebAudioSynth();
      }
    } else {
      setIsPlayingMusic(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopWebAudioSynth();
    }
  };

  const scrollToSection = (id: string) => {
    if (isAuthPage) {
      navigate('/home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative", backgroundColor: "#faf7f2" }}>
      {/* Background Wedding Audio Stream */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=wedding-march-112349.mp3"
      />

      {/* Background Floating Petals Overlay */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1, overflow: "hidden" }}>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="petal"
            style={{
              left: `${(i * 8.5) % 100}%`,
              width: `${12 + (i % 4) * 4}px`,
              height: `${16 + (i % 4) * 5}px`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${8 + (i % 5) * 2}s`
            }}
          />
        ))}
      </div>

      {/* Romantic Header Navbar */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(250, 247, 242, 0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(212, 175, 55, 0.25)",
          padding: "0.75rem 1.5rem"
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Couple Monogram Logo */}
          <div 
            onClick={() => navigate('/home')}
            style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #d4af37 0%, #aa771c 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                boxShadow: "0 4px 12px rgba(212, 175, 55, 0.3)",
                fontFamily: "var(--font-serif)",
                fontWeight: "bold",
                fontSize: "1.1rem"
              }}
            >
              A&Y
            </div>
            <div>
              <span className="font-script" style={{ fontSize: "1.6rem", color: "#4a1525", fontWeight: "bold", lineHeight: 1 }}>
                Aamir & Yousra
              </span>
              <span style={{ display: "block", fontSize: "0.65rem", letterSpacing: "2px", color: "#c89d54", textTransform: "uppercase" }}>
                October 3 & 4, 2026 • Islamabad
              </span>
            </div>
          </div>

          {/* Navigation Links (Visible on Home or if logged in) */}
          {!isAuthPage && (
            <nav style={{ display: "flex", alignItems: "center", gap: "24px" }} className="d-none d-md-flex">
              <button onClick={() => scrollToSection('hero')} style={navBtnStyle}>Home</button>
              <button onClick={() => scrollToSection('story')} style={navBtnStyle}>Our Story</button>
              <button onClick={() => scrollToSection('events')} style={navBtnStyle}>Events</button>
              <button onClick={() => scrollToSection('gallery')} style={navBtnStyle}>Gallery</button>
              <button onClick={() => scrollToSection('registry')} style={navBtnStyle}>Registry</button>
            </nav>
          )}

          {/* Header Action Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Music Toggle Indicator */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMusic}
              title={isPlayingMusic ? "Mute ambient music" : "Play ambient music"}
              style={{
                background: isPlayingMusic ? "rgba(212, 175, 55, 0.15)" : "transparent",
                border: "1px solid rgba(212, 175, 55, 0.4)",
                color: "#4a1525",
                borderRadius: "50px",
                padding: "6px 14px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              {isPlayingMusic ? (
                <>
                  <Music size={16} color="#c89d54" className="animate-spin" />
                  <span className="d-none d-sm-inline" style={{ color: "#c89d54" }}>Music On</span>
                </>
              ) : (
                <>
                  <VolumeX size={16} color="#7d6b73" />
                  <span className="d-none d-sm-inline" style={{ color: "#7d6b73" }}>Music Off</span>
                </>
              )}
            </motion.button>

            {/* Logged in User Profile or Logout */}
            {user ? (
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span className="d-none d-lg-inline" style={{ fontSize: "0.85rem", color: "#4a1525", fontWeight: 600 }}>
                  Welcome, {user.guest_name || user.emp_name || "Guest"}
                </span>
                <button
                  onClick={handleLogout}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#7a283e",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "0.85rem",
                    fontWeight: 600
                  }}
                  title="Logout"
                >
                  <LogOut size={16} />
                  <span className="d-none d-sm-inline">Exit</span>
                </button>
              </div>
            ) : isAuthPage ? (
              <button
                onClick={() => navigate('/home')}
                className="btn-gold"
                style={{ padding: "6px 16px", fontSize: "0.85rem" }}
              >
                <Sparkles size={14} /> Preview Site
              </button>
            ) : (
              <button
                onClick={() => navigate('/')}
                className="btn-outline-gold"
                style={{ padding: "6px 16px", fontSize: "0.85rem" }}
              >
                VIP Access
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main style={{ flex: 1, zIndex: 2, position: "relative" }}>
        {children}
      </main>

      {/* Luxury Footer */}
      <footer
        style={{
          background: "#1a0f14",
          color: "#ffffff",
          padding: "3rem 1.5rem 1.5rem 1.5rem",
          zIndex: 10,
          position: "relative",
          borderTop: "1px solid rgba(212, 175, 55, 0.3)"
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <span className="font-script" style={{ fontSize: "2.8rem", color: "#e6ca94" }}>
              Aamir & Yousra
            </span>
            <div className="ornament-divider" style={{ margin: "0.5rem 0 1rem 0" }}>
              <Heart size={16} fill="#d4af37" color="#d4af37" />
            </div>
            <p style={{ color: "#a89b9d", fontSize: "0.95rem", maxWidth: "500px", margin: "0 auto 1.5rem auto" }}>
              We cannot wait to celebrate our special Barat and Walima ceremonies surrounded by our beloved family and dear friends.
            </p>
          </div>

          <div 
            style={{ 
              display: "flex", 
              justifyContent: "center", 
              gap: "20px", 
              flexWrap: "wrap", 
              marginBottom: "2rem",
              fontSize: "0.9rem",
              color: "#d4af37"
            }}
          >
            <span>📅 Barat: Oct 3, 2026</span>
            <span>•</span>
            <span>📅 Walima: Oct 4, 2026</span>
            <span>•</span>
            <span>📍 Islamabad, Pakistan</span>
          </div>

          <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)", paddingTop: "1.5rem", fontSize: "0.8rem", color: "#7d6b73" }}>
            Made with ❤️ for Aamir & Yousra's Wedding Celebration • © 2026 All Rights Reserved
          </div>
        </div>
      </footer>
    </div>
  );
};

const navBtnStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "#4a1525",
  fontSize: "0.9rem",
  fontWeight: 600,
  cursor: "pointer",
  letterSpacing: "0.5px",
  transition: "color 0.2s ease"
};

export default Layout;