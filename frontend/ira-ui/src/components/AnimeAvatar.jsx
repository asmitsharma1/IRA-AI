import { useState, useEffect } from "react"
import iraGif from "../assets/IRA.gif"

export default function AnimeAvatar({ status = "idle", mood = "happy" }) {
  const [particles, setParticles] = useState([])

  // Generate random particles
  useEffect(() => {
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2,
      size: 4 + Math.random() * 8
    }))
    setParticles(newParticles)
  }, [mood])

  const glowColors = {
    happy: "#ff5edf",
    cute: "#ff9ff3",
    serious: "#04c8de",
    excited: "#f368e0"
  }

  const moodEmojis = {
    happy: ["✨", "⭐", "💫"],
    cute: ["💕", "💗", "💖"],
    serious: ["🔵", "💠", "🌀"],
    excited: ["🔥", "⚡", "✨"]
  }

  const statusText = {
    idle: "💕 Online",
    talking: "💬 Speaking.. .",
    thinking: "🤔 Thinking...",
    listening: "🎤 Listening..."
  }

  return (
    <div style={styles.wrapper}>
      {/* Status Badge */}
      <div style={{
        ... styles.statusBadge,
        background: status === "talking" ? "#ff5edf" : 
                   status === "thinking" ? "#ffc048" : "#4cd137"
      }}>
        {statusText[status]}
      </div>

      {/* Main Avatar Container */}
      <div style={styles.avatarContainer}>
        
        {/* Rotating Aura Rings */}
        <div className="aura-ring ring1" style={{
          ... styles.auraRing,
          borderColor: glowColors[mood]
        }}/>
        <div className="aura-ring ring2" style={{
          ...styles.auraRing2,
          borderColor: glowColors[mood]
        }}/>

        {/* Floating Particles */}
        {particles.map(p => (
          <div
            key={p.id}
            className="particle"
            style={{
              ...styles.particle,
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              fontSize: `${p.size}px`
            }}
          >
            {moodEmojis[mood][p.id % 3]}
          </div>
        ))}

        {/* Avatar Box with Glow */}
        <div 
          className={`avatar-box ${status === "talking" ? "talking" : ""} ${status === "thinking" ? "thinking" : ""}`}
          style={{
            ...styles.avatarBox,
            boxShadow: `0 0 40px ${glowColors[mood]}, 
                       0 0 80px ${glowColors[mood]}50,
                       inset 0 0 30px ${glowColors[mood]}30`
          }}
        >
          {/* Inner Glow Effect */}
          <div style={{
            ...styles.innerGlow,
            background: `radial-gradient(circle, ${glowColors[mood]}20 0%, transparent 70%)`
          }}/>

          {/* Avatar Image */}
          <img
            src={iraGif}
            alt="IRA"
            className="avatar-img"
            style={styles.avatarImg}
          />

          {/* Sound Waves (Talking) */}
          {status === "talking" && (
            <div style={styles.soundWaves}>
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i} 
                  className="wave"
                  style={{ 
                    ...styles.wave,
                    animationDelay: `${i * 0.1}s`,
                    background: glowColors[mood]
                  }}
                />
              ))}
            </div>
          )}

          {/* Thinking Dots */}
          {status === "thinking" && (
            <div style={styles.thinkingDots}>
              {[...Array(3)].map((_, i) => (
                <span 
                  key={i}
                  className="dot"
                  style={{ 
                    ...styles.dot,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Sparkle Effects */}
        <div className="sparkle s1" style={styles.sparkle}>✦</div>
        <div className="sparkle s2" style={{... styles.sparkle, top: "20%", right: "5%"}}>✧</div>
        <div className="sparkle s3" style={{...styles.sparkle, bottom: "20%", left: "5%"}}>✦</div>
        <div className="sparkle s4" style={{...styles.sparkle, bottom: "10%", right: "15%"}}>✧</div>
      </div>

      {/* Mood Indicator */}
      <div style={styles.moodBadge}>
        {mood === "happy" && "😊 Happy"}
        {mood === "cute" && "🥰 Cute"}
        {mood === "serious" && "😌 Calm"}
        {mood === "excited" && "✨ Excited"}
      </div>

      {/* All CSS Animations */}
      <style>{`
        /* Floating Animation */
        .avatar-box {
          animation: float 3s ease-in-out infinite;
        }
        
        . avatar-box.talking {
          animation: float 3s ease-in-out infinite, talkBounce 0.3s ease-in-out infinite;
        }
        
        . avatar-box.thinking {
          animation: float 3s ease-in-out infinite, pulse 1. 5s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform:  translateY(-15px); }
        }

        @keyframes talkBounce {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform:  scale(1.02) translateY(-5px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        /* Rotating Aura Rings */
        .aura-ring {
          animation: rotateRing 8s linear infinite;
        }
        
        .ring2 {
          animation: rotateRing 6s linear infinite reverse;
        }

        @keyframes rotateRing {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        /* Floating Particles */
        .particle {
          animation: floatUp 3s ease-in-out infinite;
        }

        @keyframes floatUp {
          0% { 
            transform: translateY(100px) scale(0);
            opacity: 0;
          }
          50% { 
            opacity: 1;
            transform:  translateY(-20px) scale(1);
          }
          100% { 
            transform: translateY(-100px) scale(0);
            opacity: 0;
          }
        }

        /* Sound Waves */
        .wave {
          animation: waveAnim 0.5s ease-in-out infinite;
        }

        @keyframes waveAnim {
          0%, 100% { height: 8px; }
          50% { height: 25px; }
        }

        /* Thinking Dots */
        .dot {
          animation: dotBounce 0.6s ease-in-out infinite;
        }

        @keyframes dotBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        /* Sparkle Animation */
        .sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }
        
        . s1 { animation-delay: 0s; }
        .s2 { animation-delay: 0.5s; }
        .s3 { animation-delay: 1s; }
        .s4 { animation-delay: 1.5s; }

        @keyframes sparkle {
          0%, 100% { 
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          50% { 
            opacity: 1;
            transform: scale(1) rotate(180deg);
          }
        }

        /* Avatar Image Hover */
        .avatar-img {
          transition: transform 0.3s ease;
        }
        
        .avatar-box:hover .avatar-img {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  )
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
    padding: "20px"
  },

  statusBadge: {
    padding: "8px 20px",
    borderRadius: "25px",
    fontSize: "13px",
    fontWeight: "bold",
    color: "white",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
  },

  avatarContainer: {
    position: "relative",
    width: "280px",
    height: "280px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  auraRing: {
    position: "absolute",
    width: "260px",
    height: "260px",
    borderRadius: "50%",
    border: "2px dashed",
    opacity: 0.4,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },

  auraRing2: {
    position:  "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    border: "1px dashed",
    opacity:  0.2,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },

  particle: {
    position: "absolute",
    pointerEvents: "none",
    zIndex: 10
  },

  avatarBox:  {
    position: "relative",
    width: "200px",
    height: "200px",
    borderRadius: "20px",
    overflow: "hidden",
    background: "linear-gradient(145deg, #1a1a2e, #16213e)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5
  },

  innerGlow:  {
    position: "absolute",
    width: "100%",
    height: "100%",
    pointerEvents: "none"
  },

  avatarImg: {
    width: "100%",
    height: "100%",
    objectFit:  "cover",
    borderRadius: "15px"
  },

  soundWaves: {
    position:  "absolute",
    bottom: "15px",
    display: "flex",
    gap: "4px",
    alignItems: "flex-end"
  },

  wave: {
    width: "5px",
    height: "8px",
    borderRadius: "3px"
  },

  thinkingDots: {
    position:  "absolute",
    bottom: "20px",
    display: "flex",
    gap: "6px"
  },

  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#ffc048"
  },

  sparkle: {
    position: "absolute",
    top: "10%",
    left: "10%",
    fontSize: "20px",
    color: "#ff5edf",
    zIndex: 15
  },

  moodBadge: {
    padding: "6px 15px",
    borderRadius: "15px",
    fontSize: "14px",
    background: "rgba(255,255,255,0.1)",
    color: "white"
  }
}