import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FixFlowExperience.css";

/* =========================================================
   MAINTENANCE OBJECTS
   ========================================================= */

const tools = [
  { type: "screw", x: 8, delay: 0.2, duration: 18, size: 16 },
  { type: "spanner", x: 18, delay: 5, duration: 22, size: 22 },
  { type: "screwdriver", x: 29, delay: 2, duration: 20, size: 18 },
  { type: "hammer", x: 41, delay: 8, duration: 24, size: 24 },
  { type: "screw", x: 52, delay: 3, duration: 19, size: 14 },
  { type: "spanner", x: 64, delay: 10, duration: 23, size: 20 },
  { type: "screwdriver", x: 74, delay: 6, duration: 21, size: 17 },
  { type: "hammer", x: 84, delay: 1, duration: 25, size: 23 },
  { type: "screw", x: 92, delay: 12, duration: 20, size: 15 },
  { type: "spanner", x: 35, delay: 15, duration: 26, size: 19 },
];

function ToolIcon({ type }) {
  if (type === "hammer") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path
          d="M13 17h27c5 0 8 3 8 8v5H37v-3H13z"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M34 28l15 27"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "screwdriver") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path
          d="M16 14l12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M27 25l27 27"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M13 12l7-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "spanner") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path
          d="M42 10a15 15 0 0 0-13 21L10 50a6 6 0 0 0 8 8l19-19a15 15 0 0 0 21-13l-10 8-8-8z"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path
        d="M20 12v27"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M15 17h10M15 24h10M15 31h10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 39l-5 10 5 7 5-7z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  );
}

/* =========================================================
   HANGING INCANDESCENT BULB
   ========================================================= */

function IncandescentBulb({ intensity }) {
  return (
    <div
      className="bulb-system"
      style={{
        "--bulb-intensity": intensity,
      }}
    >
      <div className="ceiling-anchor" />

      <div className="bulb-wire">
        <span />
      </div>

      <div className="bulb-socket">
        <div className="socket-top" />
        <div className="socket-body">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="bulb-glass">
        <div className="glass-highlight" />

        <div className="filament-support left" />
        <div className="filament-support right" />

        <div className="filament">
          <span />
          <span />
          <span />
        </div>

        <div className="glass-neck" />
      </div>

      <div className="bulb-light-haze" />
    </div>
  );
}

/* =========================================================
   PHYSICAL CARD
   ========================================================= */

function WorkflowCard({ title, explanation, flip }) {
  return (
    <div className="workflow-card-wrapper">
      <div
        className="workflow-card"
        style={{
          transform: `rotateY(${flip * 180}deg)`,
        }}
      >
        <div className="workflow-card-face workflow-card-front">
          <span>{title}</span>
        </div>

        <div className="workflow-card-face workflow-card-back">
          <p>{explanation}</p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN EXPERIENCE
   ========================================================= */

export default function FixFlowExperience() {
  const navigate = useNavigate();

  const targetProgress = useRef(0);
  const smoothProgress = useRef(0);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      targetProgress.current =
        maxScroll > 0 ? Math.min(Math.max(scrollTop / maxScroll, 0), 1) : 0;
    };

    let animationFrame;

    const animate = () => {
      const current = smoothProgress.current;
      const target = targetProgress.current;

      const next = current + (target - current) * 0.075;

      smoothProgress.current = next;
      setProgress(next);

      animationFrame = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();
    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  /* =======================================================
     SCROLL STAGES
     ======================================================= */

  const sceneOne = Math.min(progress / 0.25, 1);

  const sceneTwo = Math.min(
    Math.max((progress - 0.25) / 0.25, 0),
    1
  );

  const sceneThree = Math.min(
    Math.max((progress - 0.5) / 0.25, 0),
    1
  );

  const sceneFour = Math.min(
    Math.max((progress - 0.75) / 0.25, 0),
    1
  );

  /* =======================================================
     BULB LIGHT
     ======================================================= */

  let bulbIntensity = 0;

  if (progress < 0.25) {
    bulbIntensity = (progress / 0.25) * 0.02;
  } else if (progress < 0.5) {
    bulbIntensity = 0.02 + sceneTwo * 0.48;
  } else if (progress < 0.75) {
    bulbIntensity = 0.5 + sceneThree * 0.25;
  } else {
    bulbIntensity = 0.75 + sceneFour * 0.25;
  }

  /* =======================================================
     PARALLAX LAYERS
     ======================================================= */

  const backgroundParallax = progress * -35;
  const middleParallax = progress * -85;
  const foregroundParallax = progress * -145;

  /* =======================================================
     TEXT MOVEMENT
     ======================================================= */

  const introY = sceneOne * -150;

  /*
     Scene 2 heading moves away during the transition
     into Scene 3.

     The cards themselves stay physically anchored.
  */
  const workflowY =
    sceneTwo < 0.5
      ? 90 - sceneTwo * 180
      : -sceneThree * 20;

  const finalY = 100 - sceneFour * 100;

  /* =======================================================
     CARD REVEAL
     ======================================================= */

  const cardsReveal = Math.min(sceneTwo * 1.5, 1);

  /* =======================================================
     CARD FLIP
     ======================================================= */

  const cardFlip = sceneThree;

  /* =======================================================
     SCENE SEPARATION
     ======================================================= */

  /*
     Scene 2 heading disappears as the cards begin their flip.
     The cards themselves remain visible throughout Scene 3.
  */
  const workflowHeadingOpacity = 1 - sceneThree;

  /*
     Keep the cards fully present while flipping.
     They only begin leaving near the end of Scene 3,
     so the user has enough time to see the completed flip.
  */
  const workflowCardsOpacity =
    sceneFour > 0
      ? Math.max(1 - sceneFour * 2.5, 0)
      : 1;

  /*
     Scene 3 caption waits until the cards are well into
     their flip before appearing.
  */
  const sceneThreeCaptionOpacity =
    Math.min(Math.max((sceneThree - 0.45) / 0.3, 0), 1) *
    (1 - sceneFour * 2);

  /*
     Scene 3 completely leaves before the final scene
     becomes dominant.
  */
  const sceneThreeOpacity =
    sceneThree * (1 - Math.min(sceneFour * 2.5, 1));

  return (
    <main className="fixflow-experience">
      <div className="experience-track">
        <div className="experience-camera">
          <div className="environment">

            {/* =================================================
                BACKGROUND
               ================================================= */}

            <div
              className="environment-background"
              style={{
                transform: `translate3d(0, ${backgroundParallax}px, 0)`,
              }}
            >
              <div className="background-wall" />
              <div className="background-grid" />
              <div className="background-vignette" />
            </div>

            {/* =================================================
                MIDDLE GROUND
               ================================================= */}

            <div
              className="environment-middleground"
              style={{
                transform: `translate3d(0, ${middleParallax}px, 0)`,
              }}
            >
              <div className="wall-line wall-line-one" />
              <div className="wall-line wall-line-two" />

              <div className="maintenance-shadow shadow-one" />
              <div className="maintenance-shadow shadow-two" />
            </div>

            {/* =================================================
                FALLING / DRIFTING TOOLS
               ================================================= */}

            <div
              className="tool-field"
              style={{
                transform: `translate3d(0, ${foregroundParallax}px, 0)`,
              }}
            >
              {tools.map((tool, index) => (
                <div
                  className="maintenance-tool"
                  key={index}
                  style={{
                    left: `${tool.x}%`,
                    animationDelay: `${tool.delay}s`,
                    animationDuration: `${tool.duration}s`,
                    width: `${tool.size}px`,
                    height: `${tool.size}px`,
                  }}
                >
                  <ToolIcon type={tool.type} />
                </div>
              ))}
            </div>

            {/* =================================================
                BULB — PHYSICALLY ANCHORED ENVIRONMENT OBJECT
               ================================================= */}

            <IncandescentBulb intensity={bulbIntensity} />

            {/* =================================================
                SCENE 1
               ================================================= */}

            <section
              className="scene scene-one"
              style={{
                opacity: 1 - sceneOne * 1.15,
                transform: `translate3d(0, ${introY}px, 0)`,
              }}
            >
              <div className="intro-content">
                <p className="eyebrow">FIXFLOW</p>

                <h1>WHAT IS FIXFLOW?</h1>

                <p className="intro-main">
                  A centralized platform for reporting, assigning,
                  tracking and resolving maintenance issues.
                </p>

                <p className="intro-support">
                  From the first report to the final resolution,
                  every issue stays connected.
                </p>
              </div>
            </section>

            {/* =================================================
                SCENE 2 — WORKFLOW CARDS
               ================================================= */}

            <section
              className="scene scene-two"
              style={{
                opacity: Math.min(cardsReveal, 1),
              }}
            >
              <div
                className="workflow-heading"
                style={{
                  opacity: workflowHeadingOpacity,
                  transform: `translate3d(0, ${workflowY}px, 0)`,
                }}
              >
                <p className="eyebrow">THE WORKFLOW</p>

                <h2>
                  ONE ISSUE.
                  <br />
                  ONE CONNECTED FLOW.
                </h2>

                <p>
                  Every maintenance request moves through a clear
                  sequence from report to resolution.
                </p>
              </div>

              <div
                className="workflow-cards"
                style={{
                  opacity: workflowCardsOpacity,
                }}
              >
                <WorkflowCard
                  title="REPORT."
                  explanation="Capture maintenance issues clearly and make problems visible from the moment they are reported."
                  flip={cardFlip}
                />

                <WorkflowCard
                  title="ASSIGN."
                  explanation="Direct each issue to the right person so responsibility is clear and work can move forward."
                  flip={cardFlip}
                />

                <WorkflowCard
                  title="RESOLVE."
                  explanation="Complete the work, record the resolution and keep the entire history connected."
                  flip={cardFlip}
                />
              </div>
            </section>

            

            {/* =================================================
                SCENE 4 — FINAL
               ================================================= */}

            <section
              className="scene scene-four"
              style={{
                opacity: sceneFour,
                transform: `translate3d(0, ${finalY}px, 0)`,
              }}
            >
              <div className="final-content">
                <p className="eyebrow">THE COMPLETE WORKFLOW</p>

                <h2>
                  FROM MAINTENANCE
                  <br />
                  TO RESOLUTION.
                </h2>

                <p className="final-description">
                  A centralized maintenance workflow designed to
                  keep every issue visible, accountable and
                  trackable.
                </p>

                <p className="final-flow">
                  REPORT. ASSIGN. TRACK. RESOLVE.
                </p>

                <button
                  className="enter-button"
                  onClick={() => navigate("/login")}
                >
                  ENTER FIXFLOW
                  <span>→</span>
                </button>
              </div>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}