import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Calendar, MapPin, Clock, Sparkles,
  Gift, Camera, Utensils, X
} from "lucide-react";
import Layout from "../../sharecomponents/Layout";
import pic1 from "../Assets/AAS02538.JPG"
import pic2 from "../Assets/AAS01894.JPG"
import pic33 from "../Assets/AAS02219.JPG"
import pic3 from "../Assets/AAS02522.JPG"
function Home() {
  // Target Wedding Date: Barat Oct 3, 2026 18:00:00
  const weddingDate = new Date("2026-10-03T18:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Lightbox Modal state
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // Countdown Timer logic
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const galleryImages = [
    // {
    //   url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    //   caption: "Aamir & Yousra - Bat Pakki"
    // },
    {
      url: pic1,
      caption: "Pre-Wedding Moments"
    },
    {
      url: pic2,
      caption: "Pre-Wedding Moments"
    },
    {
      url: pic3,
      caption: "Pre-Wedding Moments"
    },
    {
      url: pic33,
      caption: "The Ring Ceremony"
    },

  ];

  const storyTimeline = [
    {
      year: "28 Jan 2025",
      title: "First Meeting of Our Families",
      desc: "Our families met for the first time, marking the beginning of a beautiful journey filled with love, trust, and countless blessings."
    },
    {
      year: "8 Feb 2025",
      title: "Baat Pakki & Dua-e-Khair",
      desc: "With the prayers and blessings of our loved ones, our families officially celebrated the beginning of our lifelong commitment."
    },
    {
      year: "23 Mar 2026",
      title: "Nikkah Ceremony",
      desc: "On this blessed day, we were united in the sacred bond of Nikah, surrounded by the love, prayers, and happiness of our family."
    },
    {
      year: "3–4 Oct 2026",
      title: "Barat & Walima",
      desc: "With the blessings of Allah and our families, we look forward to celebrating our Barat and Walima in Islamabad as we begin our new journey together. Join us as we celebrate our Barat and Walima. Your presence and blessings will make our special days even more memorable."
    }
  ];

  return (
    <Layout>
      <div style={{ width: "100%", overflowX: "hidden" }}>

        {/* HERO SECTION */}
        <section
          id="hero"
          style={{
            minHeight: "88vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "3rem 1.5rem",
            position: "relative",
            background: "linear-gradient(180deg, #fdf6f5 0%, #faf7f2 100%)"
          }}
        >
          {/* Couple Monogram Badge */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              background: "var(--gold-gradient)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              boxShadow: "0 12px 30px rgba(212, 175, 55, 0.35)",
              margin: "0 auto 1.5rem auto",
              border: "3px solid #ffffff"
            }}
          >
            <span className="font-serif" style={{ fontSize: "2.2rem", fontWeight: "bold" }}>
              A&Y
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#c89d54", letterSpacing: "3px", textTransform: "uppercase", fontSize: "0.9rem", fontWeight: 600 }}>
              <Sparkles size={16} /> Save The Date <Sparkles size={16} />
            </div>

            <h1 className="font-script" style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)", color: "#4a1525", margin: "0.2rem 0" }}>
              Aamir & Yousra
            </h1>

            <p className="font-serif" style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", color: "#7d6b73", fontStyle: "italic", maxWidth: "650px", margin: "0 auto 1.5rem auto" }}>
              Are getting married! We cordially invite you to celebrate our Barat & Walima ceremonies with us.
            </p>
          </motion.div>

          {/* Date & Location Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-card"
            style={{
              padding: "1rem 2rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "24px",
              flexWrap: "wrap",
              justifyContent: "center",
              marginBottom: "2.5rem",
              border: "1.5px solid rgba(212, 175, 55, 0.4)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#4a1525", fontWeight: 600 }}>
              <Calendar size={20} color="#c89d54" />
              <span>Barat: Oct 3, 2026 (Sat) • Walima: Oct 4, 2026 (Sun)</span>
            </div>
            <div style={{ width: "1px", height: "20px", background: "rgba(212, 175, 55, 0.4)" }} className="d-none d-sm-block" />
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#4a1525", fontWeight: 600 }}>
              <MapPin size={20} color="#c89d54" />
              <span>Islamabad, Pakistan</span>
            </div>
          </motion.div>

          {/* Action Callouts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}
          >
            <a href="#events" className="btn-gold" style={{ padding: "14px 32px", fontSize: "1.05rem" }}>
              <Clock size={18} /> Venue & Event Details
            </a>
            <a href="#story" className="btn-outline-gold" style={{ padding: "14px 32px", fontSize: "1.05rem" }}>
              <Heart size={18} /> Our Story
            </a>
          </motion.div>
        </section>

        {/* LIVE COUNTDOWN SECTION */}
        <section style={{ padding: "4rem 1.5rem", background: "#ffffff" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
            <span style={{ color: "#c89d54", fontSize: "0.85rem", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700 }}>
              Counting Down To Barat Day
            </span>
            <h2 className="font-serif" style={{ fontSize: "2.5rem", color: "#4a1525", marginTop: "0.2rem" }}>
              Until October 3, 2026
            </h2>
            <div className="ornament-divider">
              <Heart size={16} fill="#c89d54" color="#c89d54" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "1.5rem", marginTop: "2rem" }}>
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -6 }}
                  className="glass-card"
                  style={{
                    padding: "1.75rem 1rem",
                    textAlign: "center",
                    border: "1.5px solid rgba(212, 175, 55, 0.3)",
                    background: "radial-gradient(circle at top, #ffffff 0%, #faf7f2 100%)"
                  }}
                >
                  <span className="font-serif text-gold" style={{ fontSize: "2.8rem", fontWeight: "bold", lineHeight: 1 }}>
                    {String(item.value).padStart(2, "0")}
                  </span>
                  <span style={{ display: "block", fontSize: "0.85rem", color: "#7d6b73", textTransform: "uppercase", letterSpacing: "1px", marginTop: "6px", fontWeight: 600 }}>
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* OUR STORY SECTION */}
        <section id="story" style={{ padding: "5rem 1.5rem", background: "#faf7f2" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span style={{ color: "#c89d54", fontSize: "0.85rem", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700 }}>
                Our Journey Together
              </span>
              <h2 className="font-script" style={{ fontSize: "3.5rem", color: "#4a1525", margin: "0" }}>
                Aamir & Yousra's Story
              </h2>
            </div>

            <div style={{ position: "relative", paddingLeft: "1.5rem" }}>
              {/* Timeline Vertical Guide */}
              <div
                style={{
                  position: "absolute",
                  left: "24px",
                  top: "10px",
                  bottom: "10px",
                  width: "2px",
                  background: "linear-gradient(180deg, #d4af37 0%, rgba(212, 175, 55, 0.2) 100%)"
                }}
              />

              {storyTimeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  style={{ display: "flex", gap: "24px", marginBottom: "2.5rem", position: "relative" }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: "var(--gold-gradient)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ffffff",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                      boxShadow: "0 6px 15px rgba(212, 175, 55, 0.3)",
                      flexShrink: 0,
                      zIndex: 2
                    }}
                  >
                    <Heart size={20} fill="#ffffff" />
                  </div>

                  <div className="glass-card" style={{ flex: 1, padding: "1.5rem 2rem" }}>
                    <span style={{ fontSize: "0.85rem", color: "#c89d54", fontWeight: 700 }}>{item.year}</span>
                    <h3 className="font-serif" style={{ fontSize: "1.5rem", color: "#4a1525", margin: "4px 0 8px 0" }}>
                      {item.title}
                    </h3>
                    <p style={{ color: "#7d6b73", lineHeight: 1.6, fontSize: "0.95rem", margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* EVENT SCHEDULE & VENUE DETAILS */}
        <section id="events" style={{ padding: "5rem 1.5rem", background: "#ffffff" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <span style={{ color: "#c89d54", fontSize: "0.85rem", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700 }}>
                Celebrate With Us In Islamabad
              </span>
              <h2 className="font-serif" style={{ fontSize: "2.8rem", color: "#4a1525" }}>
                Wedding Ceremonies & Venues
              </h2>
              <div className="ornament-divider">
                <Heart size={16} fill="#c89d54" color="#c89d54" />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "2.5rem" }}>
              {/* Event 1: Barat Ceremony */}
              <motion.div
                whileHover={{ y: -8 }}
                className="glass-card"
                style={{ padding: "2.5rem 2rem", borderTop: "4px solid #c89d54", position: "relative" }}
              >
                <div style={{ width: "50px", height: "50px", borderRadius: "16px", background: "rgba(212, 175, 55, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#c89d54", marginBottom: "1.25rem" }}>
                  <Sparkles size={24} />
                </div>
                <span style={{ fontSize: "0.85rem", color: "#c89d54", fontWeight: 700 }}>SATURDAY • OCT 3, 2026</span>
                <h3 className="font-serif" style={{ fontSize: "1.8rem", color: "#4a1525", margin: "0.4rem 0 0.8rem 0" }}>
                  Barat Ceremony
                </h3>
                <p style={{ color: "#7d6b73", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  Join us as the Barat arrives for the grand wedding celebration and dinner banquet.
                </p>
                <div style={{ borderTop: "1px solid rgba(212, 175, 55, 0.2)", paddingTop: "1.25rem", marginTop: "1.25rem", fontSize: "0.9rem", color: "#4a1525" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
                    <Clock size={18} color="#c89d54" />
                    {/* <span>Dinner served at 7:00 PM</span> */}

                    <span>Sehra Bandi Ceremony & Barat Departure – 7:00 PM</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "10px" }}>
                    <MapPin size={20} color="#c89d54" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <div>
                      <strong style={{ display: "block", fontSize: "1rem" }}>Majesty Marquee</strong>
                      <span style={{ color: "#7d6b73", fontSize: "0.85rem" }}>
                        Main Expressway near PSO Petrol Pump, Kurri Road, Islamabad
                      </span>
                    </div>
                  </div>

                  <a
                    href="https://maps.google.com/?q=Majesty+Marquee+Kurri+Road+Islamabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold"
                    style={{ width: "100%", padding: "10px", fontSize: "0.88rem" }}
                  >
                    <MapPin size={16} /> Open Location in Google Maps
                  </a>
                </div>
              </motion.div>

              {/* Event 2: Walima Reception */}
              <motion.div
                whileHover={{ y: -8 }}
                className="glass-card"
                style={{ padding: "2.5rem 2rem", borderTop: "4px solid #c89d54", position: "relative" }}
              >
                <div style={{ width: "50px", height: "50px", borderRadius: "16px", background: "rgba(212, 175, 55, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#c89d54", marginBottom: "1.25rem" }}>
                  <Utensils size={24} />
                </div>
                <span style={{ fontSize: "0.85rem", color: "#c89d54", fontWeight: 700 }}>SUNDAY • OCT 4, 2026</span>
                <h3 className="font-serif" style={{ fontSize: "1.8rem", color: "#4a1525", margin: "0.4rem 0 0.8rem 0" }}>
                  Walima Reception
                </h3>
                <p style={{ color: "#7d6b73", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  Celebrate the auspicious occasion of Walima reception with family, friends & loved ones.
                </p>
                <div style={{ borderTop: "1px solid rgba(212, 175, 55, 0.2)", paddingTop: "1.25rem", marginTop: "1.25rem", fontSize: "0.9rem", color: "#4a1525" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
                    <Clock size={18} color="#c89d54" />
                    <span>Reception Dinner at 2:00 PM</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "10px" }}>
                    <MapPin size={20} color="#c89d54" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <div>
                      <strong style={{ display: "block", fontSize: "1rem" }}>Reet Marquee</strong>
                      <span style={{ color: "#7d6b73", fontSize: "0.85rem" }}>
                        Near Khanna Pull, Khanna Service Road, Islamabad
                      </span>
                    </div>
                  </div>

                  <a
                    href="https://maps.google.com/?q=Reet+Marquee+Khanna+Service+Road+Islamabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold"
                    style={{ width: "100%", padding: "10px", fontSize: "0.88rem" }}
                  >
                    <MapPin size={16} /> Open Location in Google Maps
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>



        {/* PHOTO GALLERY SECTION */}
        <section id="gallery" style={{ padding: "5rem 1.5rem", background: "#ffffff" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span style={{ color: "#c89d54", fontSize: "0.85rem", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700 }}>
                Pre-Wedding Moments
              </span>
              <h2 className="font-script" style={{ fontSize: "3.5rem", color: "#4a1525", margin: 0 }}>
                Photo Gallery
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
              {galleryImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => setSelectedImage(img.url)}
                  style={{
                    position: "relative",
                    borderRadius: "20px",
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                    height: "280px"
                  }}
                >
                  <img
                    src={img.url}
                    alt={img.caption}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(180deg, transparent 40%, rgba(26,15,20,0.85) 100%)",
                      display: "flex",
                      alignItems: "flex-end",
                      padding: "1.25rem",
                      color: "#ffffff"
                    }}
                  >
                    <div>
                      <Camera size={18} color="#d4af37" style={{ marginBottom: "4px" }} />
                      <p style={{ margin: 0, fontSize: "0.9rem", fontWeight: 600 }}>{img.caption}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* LIGHTBOX MODAL */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 100,
                background: "rgba(0,0,0,0.85)",
                backdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem"
              }}
            >
              <div style={{ position: "relative", maxWidth: "800px", width: "100%" }} onClick={e => e.stopPropagation()}>
                <button
                  onClick={() => setSelectedImage(null)}
                  style={{
                    position: "absolute",
                    top: "-40px",
                    right: 0,
                    background: "none",
                    border: "none",
                    color: "#ffffff",
                    cursor: "pointer"
                  }}
                >
                  <X size={28} />
                </button>
                <img
                  src={selectedImage}
                  alt="Gallery enlarged"
                  style={{ width: "100%", borderRadius: "16px", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* WISHING WELL / REGISTRY */}
        <section id="registry" style={{ padding: "5rem 1.5rem", background: "#faf7f2" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
            <motion.div className="glass-card" style={{ padding: "3rem 2rem", border: "2px solid rgba(212, 175, 55, 0.3)" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "rgba(212, 175, 55, 0.15)",
                  color: "#c89d54",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.25rem auto"
                }}
              >
                <Gift size={28} />
              </div>
              <h2 className="font-serif" style={{ fontSize: "2.4rem", color: "#4a1525" }}>
                Prayers & Good Wishes
              </h2>
              <p style={{ color: "#7d6b73", lineHeight: 1.6, maxWidth: "550px", margin: "0.75rem auto 1.5rem auto", fontSize: "0.95rem" }}>
                Your presence and earnest prayers for Aamir & Yousra on their wedding days are the greatest gifts we could ever ask for.
              </p>
              <div style={{ display: "inline-flex", gap: "12px", background: "#ffffff", padding: "12px 24px", borderRadius: "50px", border: "1px solid rgba(212, 175, 55, 0.4)", fontWeight: 600, color: "#4a1525", fontSize: "0.9rem" }}>
                <span>✨ "May Allah bless them and unite them in goodness and happiness."</span>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </Layout>
  );
}

export default Home;