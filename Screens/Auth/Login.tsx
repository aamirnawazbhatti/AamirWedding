import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Key, CheckCircle2, ArrowRight } from "lucide-react";
import Layout from "../../sharecomponents/Layout";

function Login() {
  const navigate = useNavigate();
  const [guestCode, setGuestCode] = useState("");
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Prevent browser back button loop
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
  }, []);

  const handleVIPCodeLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestCode.trim()) {
      setError("Please enter your invitation access code");
      return;
    }

    setLoading(true);
    setError("");

    setTimeout(() => {
      const codeUpper = guestCode.trim().toUpperCase();
      let guestName = "Honored Guest";
      let tableNo = "Table 1 - Grand Ballroom";

      if (codeUpper === "786AY2026" || codeUpper === "786AY2026") {
        guestName = "VIP Family Member";
      } else if (codeUpper.startsWith("GUEST")) {
        guestName = "Special Guest";
      } else {
        guestName = guestCode.trim();
      }

      const userData = {
        guest_name: guestName,
        guest_code: codeUpper,
        table_no: tableNo,
        role: "Invited Guest",
        login_time: new Date().toISOString()
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setSuccessMsg("Welcome! Opening your personal wedding invitation...");

      setTimeout(() => {
        setLoading(false);
        navigate("/home");
      }, 1200);
    }, 800);
  };



  const usePresetCode = (code: string) => {
    setGuestCode(code);
    setIsEnvelopeOpen(true);
  };

  return (
    <Layout>
      <div
        style={{
          minHeight: "calc(100vh - 160px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1rem",
          background: "radial-gradient(circle at center, #fdf6f5 0%, #faf7f2 70%, #f3e8e6 100%)",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Animated Background Ring Watermark */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            border: "1px dashed rgba(212, 175, 55, 0.15)",
            pointerEvents: "none"
          }}
        />

        <div style={{ width: "100%", maxWidth: "520px", position: "relative", zIndex: 10 }}>
          {/* Animated Wax Seal / Envelope Entrance */}
          {!isEnvelopeOpen ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="glass-card"
              style={{
                padding: "3rem 2rem",
                textAlign: "center",
                border: "2px solid rgba(212, 175, 55, 0.4)",
                boxShadow: "0 25px 60px rgba(74, 21, 37, 0.12)",
                position: "relative"
              }}
            >
              {/* Couple Header Monogram */}
              <div style={{ marginBottom: "1.5rem" }}>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  onClick={() => setIsEnvelopeOpen(true)}
                  style={{
                    width: "84px",
                    height: "84px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #d4af37 0%, #aa771c 100%)",
                    margin: "0 auto 1.25rem auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 10px 25px rgba(212, 175, 55, 0.4)",
                    cursor: "pointer",
                    border: "3px solid #ffffff"
                  }}
                >
                  <span className="font-serif" style={{ fontSize: "2rem", color: "#ffffff", fontWeight: "bold" }}>
                    A&Y
                  </span>
                </motion.div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#c89d54", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "2px", fontWeight: 600 }}>
                  <Sparkles size={14} /> You Are Cordially Invited <Sparkles size={14} />
                </div>
                <h1 className="font-script" style={{ fontSize: "3.2rem", color: "#4a1525", margin: "0.5rem 0 0.2rem 0" }}>
                  Aamir & Yousra
                </h1>
                <p className="font-serif" style={{ fontSize: "1.15rem", color: "#7d6b73", fontStyle: "italic" }}>
                  Request the pleasure of your company at their Barat & Walima wedding celebrations
                </p>
              </div>

              <div className="ornament-divider">
                <Heart size={18} fill="#c89d54" color="#c89d54" />
              </div>

              {/* Interactive Envelope Wax Seal Action */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEnvelopeOpen(true)}
                className="btn-gold"
                style={{
                  width: "100%",
                  padding: "16px 24px",
                  fontSize: "1.05rem",
                  marginTop: "1rem",
                  boxShadow: "0 10px 25px rgba(212, 175, 55, 0.4)"
                }}
              >
                <Key size={18} /> Open Invitation & VIP Portal
              </motion.button>

              <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
                <button
                  onClick={() => usePresetCode("")}
                  style={chipStyle}
                >
                  ✨ VIP Pass Code
                </button>
                <button
                  onClick={() => usePresetCode("786ay2026")}
                  style={chipStyle}
                >
                  💍 VIP Family Pass
                </button>
              </div>
            </motion.div>
          ) : (
            /* Open Invitation Portal Form */
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-card"
              style={{
                padding: "2.5rem 2rem",
                border: "2px solid rgba(212, 175, 55, 0.35)",
                boxShadow: "0 25px 50px rgba(74, 21, 37, 0.15)"
              }}
            >
              <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
                <span className="font-script" style={{ fontSize: "2.4rem", color: "#4a1525" }}>
                  Guest Invitation Portal
                </span>
                <p style={{ fontSize: "0.9rem", color: "#7d6b73", marginTop: "4px" }}>
                  Enter your invitation access code or guest name
                </p>
              </div>

              {/* Form Content */}
              <form onSubmit={handleVIPCodeLogin} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div>
                  <label style={labelStyle}>Invitation Passcode </label>
                  <div style={{ position: "relative" }}>
                    <input
                      className="input-field"
                      placeholder="Enter Code"
                      value={guestCode}
                      onChange={(e) => setGuestCode(e.target.value)}
                      style={{
                        paddingLeft: "42px",
                        borderColor: "rgba(212, 175, 55, 0.4)",
                        background: "#ffffff"
                      }}
                    />
                    <Key size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#c89d54" }} />
                  </div>
                  {/* <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                    <span style={{ fontSize: "0.75rem", color: "#7d6b73" }}>Quick try:</span>
                    <button
                      type="button"
                      onClick={() => setGuestCode("WEDDING2026")}
                      style={{ background: "none", border: "none", color: "#c89d54", fontSize: "0.75rem", textDecoration: "underline", cursor: "pointer", fontWeight: 600 }}
                    >
                      WEDDING2026
                    </button>
                  </div> */}
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      style={errorStyle}
                    >
                      {error}
                    </motion.div>
                  )}
                  {successMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={successStyle}
                    >
                      <CheckCircle2 size={16} /> {successMsg}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  className="btn-gold"
                  disabled={loading}
                  style={{ width: "100%", padding: "14px", marginTop: "0.5rem" }}
                >
                  {loading ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Sparkles className="animate-spin" size={18} />
                      <span>Verifying Invitation...</span>
                    </div>
                  ) : (
                    <>
                      <span>Enter Wedding Portal</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>

              {/* Direct Link to Home without code */}
              {/* <div style={{ marginTop: "1.75rem", textAlign: "center" }}>
                <button
                  type="button"
                  onClick={() => navigate("/home")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#4a1525",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    fontWeight: 600,
                    textDecoration: "underline"
                  }}
                >
                  Continue as Guest directly without Login →
                </button>
              </div> */}
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "0.4rem",
  fontWeight: 600,
  fontSize: "0.85rem",
  color: "#4a1525"
};

const chipStyle: React.CSSProperties = {
  background: "rgba(212, 175, 55, 0.12)",
  border: "1px solid rgba(212, 175, 55, 0.3)",
  borderRadius: "20px",
  padding: "6px 14px",
  fontSize: "0.78rem",
  color: "#4a1525",
  fontWeight: 600,
  cursor: "pointer",
  transition: "all 0.2s ease"
};

const errorStyle: React.CSSProperties = {
  color: "#b81c34",
  backgroundColor: "#fde8eb",
  padding: "0.75rem",
  borderRadius: "12px",
  fontSize: "0.85rem",
  textAlign: "center",
  border: "1px solid #f8b4be"
};

const successStyle: React.CSSProperties = {
  color: "#15803d",
  backgroundColor: "#f0fdf4",
  padding: "0.75rem",
  borderRadius: "12px",
  fontSize: "0.85rem",
  textAlign: "center",
  border: "1px solid #bbf7d0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "6px"
};

export default Login;