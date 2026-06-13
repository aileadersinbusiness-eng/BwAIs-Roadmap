"use client";

import * as React from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Transition,
  type TargetAndTransition,
} from "framer-motion";
import Image from "next/image";
import {
  Search,
  GitBranch,
  Cpu,
  Rocket,
  Compass,
  Users,
  Mic2,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Slide {
  id: number;
  stage: string;
  verb: string;
  headline: string;
  description: string;
  whatHappens?: string[];
  isCTA?: boolean;
  accent: { from: string; via?: string; to: string };
  icon: React.ReactNode;
  cardBg: string;
  glowColor: string;
  particleColor: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const slides: Slide[] = [
  {
    id: 1,
    stage: "Stage 01",
    verb: "Clarify",
    headline: "Diagnose where AI is now.",
    description:
      "The ideal starting point for leaders who need direction quickly and want to identify immediate opportunities.",
    whatHappens: [
      "Complimentary 30-min strategy call",
      "AI Power Hour — £295",
      "Identify gaps, opportunities & quick wins",
    ],
    accent: { from: "#a855f7", via: "#ec4899", to: "#f43f5e" },
    icon: <Search className="w-7 h-7" />,
    cardBg: "from-purple-950/90 via-pink-950/70 to-slate-900/90",
    glowColor: "rgba(168,85,247,0.45)",
    particleColor: "168,85,247",
  },
  {
    id: 2,
    stage: "Stage 02",
    verb: "Align",
    headline: "Set strategy and ownership.",
    description:
      "Move from fragmented experimentation to clear priorities, defined responsibilities, and confident decision-making.",
    whatHappens: [
      "In-person strategy session — 2hrs — £600",
      "AI Transformation Workshop — 3hrs — £1,200",
      "Pre-session prep & post-workshop support included",
    ],
    accent: { from: "#6366f1", via: "#8b5cf6", to: "#a78bfa" },
    icon: <GitBranch className="w-7 h-7" />,
    cardBg: "from-indigo-950/90 via-violet-950/70 to-slate-900/90",
    glowColor: "rgba(99,102,241,0.45)",
    particleColor: "99,102,241",
  },
  {
    id: 3,
    stage: "Stage 03",
    verb: "Implement",
    headline: "Build systems and workflows.",
    description:
      "Translate strategy into operational adoption through practical implementation and ongoing support.",
    whatHappens: [
      "Consultancy packages — £5,000–£15,000",
      "Monthly / bi-weekly support — 4 to 6 months",
      "Audits, infrastructure, workflow design & training",
    ],
    accent: { from: "#06b6d4", via: "#7c3aed", to: "#4f46e5" },
    icon: <Cpu className="w-7 h-7" />,
    cardBg: "from-cyan-950/90 via-purple-950/70 to-slate-900/90",
    glowColor: "rgba(6,182,212,0.45)",
    particleColor: "6,182,212",
  },
  {
    id: 4,
    stage: "Stage 04",
    verb: "Scale",
    headline: "Expand capability and influence.",
    description:
      "Build long-term competitive advantage through culture change, visibility, and proprietary capability.",
    whatHappens: [
      "Keynotes — £1,500 to £5,000",
      "Bespoke AI mini-courses & roundtables",
      "AI Clinics / JV Days — from £1,500/day",
    ],
    accent: { from: "#f59e0b", via: "#ec4899", to: "#d946ef" },
    icon: <Rocket className="w-7 h-7" />,
    cardBg: "from-amber-950/90 via-pink-950/70 to-slate-900/90",
    glowColor: "rgba(245,158,11,0.45)",
    particleColor: "245,158,11",
  },
  {
    id: 5,
    stage: "Stage 05",
    verb: "Connect",
    headline: "Ready to identify your next step?",
    description:
      "Whether you need clarity, implementation support, or a strategy for scaling AI across your organisation — every transformation starts with one conversation.",
    isCTA: true,
    accent: { from: "#a855f7", via: "#6366f1", to: "#f59e0b" },
    icon: <Sparkles className="w-7 h-7" />,
    cardBg: "from-violet-950/95 via-purple-950/90 to-slate-950/95",
    glowColor: "rgba(168,85,247,0.35)",
    particleColor: "168,85,247",
  },
];

const TOTAL = slides.length;

// ─── Circular distance helper ─────────────────────────────────────────────────

function circularDiff(slideIndex: number, currentIndex: number) {
  return ((slideIndex - currentIndex) % TOTAL + TOTAL) % TOTAL;
}

function getCardStyle(slideIndex: number, currentIndex: number) {
  const diff = circularDiff(slideIndex, currentIndex);
  const prevDiff = TOTAL - 1;

  if (diff === 0)
    return { x: "0%", rotate: "-3deg", scale: 1, opacity: 1, filter: "blur(0px)", zIndex: 10, interactive: true };
  if (diff === 1)
    return { x: "8%", rotate: "3.5deg", scale: 0.93, opacity: 0.72, filter: "blur(1px)", zIndex: 6, interactive: false };
  if (diff === 2)
    return { x: "14%", rotate: "6deg", scale: 0.87, opacity: 0.38, filter: "blur(2.5px)", zIndex: 3, interactive: false };
  if (diff === prevDiff)
    return { x: "-8%", rotate: "-7deg", scale: 0.90, opacity: 0.5, filter: "blur(2px)", zIndex: 5, interactive: false };
  // everything else: hidden
  return { x: "0%", rotate: "0deg", scale: 0.82, opacity: 0, filter: "blur(5px)", zIndex: 0, interactive: false };
}

// ─── Particles ────────────────────────────────────────────────────────────────

function Particles({
  activeIndex,
  celebrate,
  prefersReduced,
}: {
  activeIndex: number;
  celebrate: boolean;
  prefersReduced: boolean;
}) {
  if (prefersReduced) return null;

  const pc = slides[activeIndex]?.particleColor ?? "168,85,247";
  const count = celebrate ? 50 : 28;

  const particles = React.useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 9 + 6,
        delay: Math.random() * 5,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.slice(0, count).map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: `rgba(${pc},0.75)`,
          }}
          animate={
            celebrate
              ? { y: [0, -60, 0], opacity: [0, 1, 0], scale: [0.5, 2, 0.5] }
              : { y: [0, -35, 0], opacity: [0, 0.85, 0], scale: [0.5, 1.3, 0.5] }
          }
          transition={{
            duration: celebrate ? p.duration * 0.5 : p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Service Pillars ──────────────────────────────────────────────────────────

const pillars = [
  {
    icon: <Compass className="w-4 h-4" />,
    label: "Complimentary Strategy Call",
    color: "#a855f7",
  },
  {
    icon: <Users className="w-4 h-4" />,
    label: "Workshops & Consulting",
    color: "#6366f1",
  },
  {
    icon: <Mic2 className="w-4 h-4" />,
    label: "Keynotes & AI Clinics",
    color: "#f59e0b",
  },
];

function ServicePillars({ prefersReduced }: { prefersReduced: boolean }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6 mb-2">
      {pillars.map((p, i) => (
        <motion.div
          key={p.label}
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20, scale: prefersReduced ? 1 : 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4 + i * 0.14, duration: 0.5, ease: "easeOut" }}
          whileHover={prefersReduced ? {} : { y: -3, scale: 1.04 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border cursor-default select-none"
          style={{
            background: `${p.color}12`,
            borderColor: `${p.color}30`,
            boxShadow: `0 0 18px ${p.color}18, inset 0 1px 0 rgba(255,255,255,0.04)`,
            backdropFilter: "blur(12px)",
          }}
        >
          <span style={{ color: p.color }}>{p.icon}</span>
          <span className="text-[11px] font-semibold text-slate-300 whitespace-nowrap tracking-wide">
            {p.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Progress Spine ───────────────────────────────────────────────────────────

const spineLabels = ["Clarify", "Align", "Implement", "Scale", "Connect"];

function ProgressSpine({
  currentIndex,
  celebrate,
  prefersReduced,
}: {
  currentIndex: number;
  celebrate: boolean;
  prefersReduced: boolean;
}) {
  return (
    <div className="relative z-10 mb-10 select-none w-full max-w-[340px] sm:max-w-md">
      <div className="relative flex items-center">
        {/* Track */}
        <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-slate-800" />

        {/* Nodes */}
        <div className="relative z-10 flex w-full justify-between">
          {spineLabels.map((label, i) => {
            const isActive = i === currentIndex;
            // In circular mode: a node is "completed" if it comes before currentIndex
            // But since it loops, we just highlight active strongly and adjacent softly
            const isPast = i < currentIndex;
            const accentFrom = slides[currentIndex]?.accent.from ?? "#a855f7";

            return (
              <React.Fragment key={label}>
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{
                      scale: isActive ? 1.25 : 1,
                      backgroundColor: isActive ? accentFrom : isPast ? "#6d28d9" : "#1e293b",
                      boxShadow: isActive
                        ? celebrate
                          ? `0 0 28px ${accentFrom}`
                          : `0 0 16px ${accentFrom}aa`
                        : "none",
                    }}
                    transition={
                      prefersReduced
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 200, damping: 22 }
                    }
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black text-white border border-slate-700/60"
                  >
                    {i + 1}
                  </motion.div>
                  <motion.span
                    animate={{ opacity: isActive ? 1 : 0.28, y: isActive ? 0 : 1 }}
                    transition={{ duration: 0.35 }}
                    className="mt-2 text-[8px] sm:text-[9px] font-bold tracking-widest uppercase text-slate-400 hidden xs:block"
                    style={{ color: isActive ? accentFrom : undefined }}
                  >
                    {label}
                  </motion.span>
                </div>
                {/* Connector */}
                {i < spineLabels.length - 1 && (
                  <motion.div
                    animate={{
                      backgroundColor: i < currentIndex ? "#6d28d9" : "#1e293b",
                    }}
                    transition={
                      prefersReduced ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }
                    }
                    className="flex-1 mx-1 h-[2px] rounded-full mt-[-16px]"
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Ambient Background ───────────────────────────────────────────────────────

function AmbientBackground({
  activeIndex,
  celebrate,
  prefersReduced,
}: {
  activeIndex: number;
  celebrate: boolean;
  prefersReduced: boolean;
}) {
  const slide = slides[activeIndex];
  const glow = `${slide?.glowColor?.replace("0.45", "0.06") ?? "rgba(168,85,247,0.06)"}`;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 via-[#04040c] to-indigo-950/12" />
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={prefersReduced ? { duration: 0 } : { duration: 1.4 }}
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 55% at 50% 30%, ${glow}, transparent)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <AnimatePresence>
        {celebrate && !prefersReduced && (
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: [0, 0.35, 0], scale: [0.4, 2.2, 3.5] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 55%, rgba(168,85,247,0.45), transparent 55%)",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Ghost Touch / Gesture Hint ───────────────────────────────────────────────

function GhostTouch({
  direction,
  accentColor,
}: {
  direction: "left" | "right";
  accentColor: string;
}) {
  const fromX = direction === "left" ? "58%" : "42%";
  const toX   = direction === "left" ? "22%" : "78%";

  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-2xl">
      {/* Trail */}
      <motion.div
        className="absolute top-[52%] -translate-y-1/2 h-[2px] rounded-full"
        style={{
          left:   direction === "left" ? "22%" : "42%",
          right:  direction === "left" ? "42%" : "22%",
          background: `linear-gradient(${direction === "left" ? "to left" : "to right"}, transparent, ${accentColor}90, ${accentColor}40)`,
          filter: "blur(1px)",
          transformOrigin: direction === "left" ? "right" : "left",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: [0, 0, 1, 1, 0.2, 0], opacity: [0, 0, 0.9, 0.9, 0.3, 0] }}
        transition={{ duration: 2.4, times: [0, 0.08, 0.38, 0.65, 0.85, 1], ease: "easeOut" }}
      />
      {/* Touch circle */}
      <motion.div
        className="absolute top-[52%] -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full"
        style={{
          background: `radial-gradient(circle, ${accentColor}50 0%, ${accentColor}18 60%, transparent 100%)`,
          boxShadow: `0 0 22px ${accentColor}55, 0 0 0 1px ${accentColor}28`,
        }}
        initial={{ left: fromX, opacity: 0, scale: 0.55 }}
        animate={{
          left: [fromX, fromX, toX, toX],
          opacity: [0, 1, 1, 0],
          scale: [0.55, 1, 0.9, 0.55],
        }}
        transition={{ duration: 2.4, times: [0, 0.07, 0.72, 1], ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Label */}
      <motion.div
        className="absolute bottom-[16%] left-1/2 -translate-x-1/2 flex items-center gap-1 text-[10px] font-semibold tracking-widest uppercase"
        style={{ color: `${accentColor}88` }}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: [0, 0, 1, 1, 0], y: [5, 5, 0, 0, -4] }}
        transition={{ duration: 2.4, times: [0, 0.18, 0.38, 0.78, 1] }}
      >
        {direction === "left" ? (
          <><ChevronLeft className="w-3 h-3" /> next stage</>
        ) : (
          <>prev stage <ChevronRight className="w-3 h-3" /></>
        )}
      </motion.div>
    </div>
  );
}

function SwipeHint({
  show,
  activeIndex,
  prefersReduced,
}: {
  show: boolean;
  activeIndex: number;
  prefersReduced: boolean;
}) {
  const [cycle, setCycle] = React.useState(0);
  const [hintKey, setHintKey] = React.useState(0);
  const accentColor = slides[activeIndex]?.accent.from ?? "#a855f7";
  // Alternate directions; at index 0 always go left first (to show "next")
  const direction: "left" | "right" = cycle % 2 === 0 ? "left" : "right";

  React.useEffect(() => {
    if (!show || prefersReduced) return;
    const t = setTimeout(() => {
      setCycle((c) => c + 1);
      setHintKey((k) => k + 1);
    }, 5600);
    return () => clearTimeout(t);
  }, [show, cycle, prefersReduced]);

  if (prefersReduced) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-30 rounded-2xl"
        >
          <GhostTouch key={hintKey} direction={direction} accentColor={accentColor} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── CTA Card Content ─────────────────────────────────────────────────────────

function CTAContent({ slide, isActive }: { slide: Slide; isActive: boolean }) {
  const [hovering, setHovering] = React.useState(false);

  const s = (i: number): { initial: TargetAndTransition; animate: TargetAndTransition; transition: Transition } => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 },
    transition: { delay: isActive ? i * 0.11 + 0.05 : 0, duration: 0.5, ease: "easeOut" },
  });

  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-full gap-3 text-center">
      {/* Stage badge */}
      <div className="w-full flex justify-between items-start mb-1">
        <span
          className="text-[10px] font-black tracking-[0.25em] uppercase px-3 py-1 rounded-full border"
          style={{
            color: slide.accent.from,
            borderColor: `${slide.accent.from}50`,
            background: `${slide.accent.from}18`,
          }}
        >
          {slide.stage}
        </span>
        <span style={{ color: slide.accent.from }}>{slide.icon}</span>
      </div>

      {/* Verb */}
      <h2
        className="text-5xl sm:text-6xl font-black leading-none self-start"
        style={{
          background: `linear-gradient(135deg, ${slide.accent.from}, ${slide.accent.via ?? slide.accent.to}, ${slide.accent.to})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {slide.verb}
      </h2>

      {/* Logo */}
      <motion.div {...s(0)} className="mt-1">
        <div className="relative inline-block">
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background: "radial-gradient(circle, rgba(168,85,247,0.18), transparent 70%)",
              filter: "blur(14px)",
              transform: "scale(1.4)",
            }}
          />
          <Image
            src="/logo.png"
            alt="Business With AI Strategist"
            width={260}
            height={90}
            className="h-auto w-auto object-contain max-h-[60px] sm:max-h-[72px]"
            priority
          />
        </div>
      </motion.div>

      {/* Divider */}
      <motion.div
        {...s(1)}
        className="w-14 h-px rounded-full"
        style={{ background: `linear-gradient(90deg, transparent, ${slide.accent.from}70, transparent)` }}
      />

      {/* Heading */}
      <motion.h3 {...s(2)} className="text-base sm:text-lg font-black text-white leading-snug max-w-[240px]">
        {slide.headline}
      </motion.h3>

      {/* Body */}
      <motion.p {...s(3)} className="text-[11px] text-slate-400 leading-relaxed max-w-[250px]">
        {slide.description}
      </motion.p>

      {/* Button */}
      <motion.div {...s(4)} className="w-full mt-1">
        <motion.button
          onHoverStart={() => setHovering(true)}
          onHoverEnd={() => setHovering(false)}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          onClick={() =>
            window.open(
              "https://calendly.com/chatwithmarnie/business-with-ai-strategist",
              "_blank",
              "noopener,noreferrer"
            )
          }
          className="relative w-full overflow-hidden rounded-2xl px-5 py-3.5 text-xs sm:text-sm font-bold text-white shadow-xl"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #a855f7, #ec4899)",
            minHeight: 52,
            boxShadow: hovering
              ? "0 0 40px rgba(168,85,247,0.5), 0 8px 28px rgba(168,85,247,0.3)"
              : "0 4px 20px rgba(168,85,247,0.22)",
          }}
        >
          <AnimatePresence>
            {hovering && (
              <motion.div
                className="pointer-events-none absolute inset-0"
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: "100%", opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55 }}
                style={{
                  background:
                    "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)",
                }}
              />
            )}
          </AnimatePresence>
          <span className="relative z-10 flex items-center justify-center gap-2">
            Book Your Complimentary Strategy Call
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </span>
        </motion.button>

        <AnimatePresence>
          {hovering && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 3 }}
              transition={{ duration: 0.28 }}
              className="mt-1.5 text-[10px] text-slate-600 tracking-wide"
            >
              30 minutes · Complimentary · No obligation
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// ─── Unified Slide Card ───────────────────────────────────────────────────────

interface CardProps {
  slide: Slide;
  slideIndex: number;
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onInteract: () => void;
  prefersReduced: boolean;
  showHint: boolean;
}

function SlideCard({
  slide,
  slideIndex,
  currentIndex,
  onNext,
  onPrev,
  onInteract,
  prefersReduced,
  showHint,
}: CardProps) {
  const style = getCardStyle(slideIndex, currentIndex);
  const isActive = style.interactive;
  const dragStartX = React.useRef(0);

  const spring = prefersReduced
    ? ({ duration: 0 } as Transition)
    : ({ type: "spring", stiffness: 175, damping: 26 } as Transition);

  return (
    <motion.div
      animate={{
        x: style.x,
        rotate: style.rotate,
        scale: style.scale,
        opacity: style.opacity,
        filter: style.filter,
        zIndex: style.zIndex,
      }}
      transition={spring}
      drag={isActive ? "x" : false}
      dragElastic={{ left: 0.14, right: 0.14 }}
      dragConstraints={{ left: 0, right: 0 }}
      onDragStart={(e: any) => {
        dragStartX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
        onInteract();
      }}
      onDragEnd={(_e: any, info: any) => {
        if (info.offset.x < -80) onNext();
        else if (info.offset.x > 80) onPrev();
      }}
      className={[
        "absolute inset-0 select-none rounded-2xl border border-white/[0.07]",
        "flex flex-col justify-between overflow-hidden",
        `bg-gradient-to-br ${slide.cardBg}`,
        "p-7 shadow-2xl backdrop-blur-xl",
        isActive ? "cursor-grab active:cursor-grabbing" : "pointer-events-none",
      ].join(" ")}
    >
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: `radial-gradient(circle at 25% 15%, ${slide.glowColor}, transparent 55%)`,
        }}
      />

      {/* Gesture hint */}
      {isActive && (
        <SwipeHint show={showHint} activeIndex={currentIndex} prefersReduced={prefersReduced} />
      )}

      {slide.isCTA ? (
        <CTAContent slide={slide} isActive={isActive} />
      ) : (
        <>
          {/* Stage card content */}
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-5">
              <span
                className="text-[10px] font-black tracking-[0.25em] uppercase px-3 py-1 rounded-full border"
                style={{
                  color: slide.accent.from,
                  borderColor: `${slide.accent.from}50`,
                  background: `${slide.accent.from}18`,
                }}
              >
                {slide.stage}
              </span>
              <motion.div
                animate={isActive && !prefersReduced ? { rotate: [0, 8, -8, 0] } : { rotate: 0 }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ color: slide.accent.from }}
              >
                {slide.icon}
              </motion.div>
            </div>
            <h2
              className="text-5xl sm:text-6xl font-black mb-1 leading-none"
              style={{
                background: `linear-gradient(135deg, ${slide.accent.from}, ${slide.accent.via ?? slide.accent.to}, ${slide.accent.to})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {slide.verb}
            </h2>
            <h3 className="text-sm font-semibold text-white/85 mb-3 leading-snug">
              {slide.headline}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">{slide.description}</p>
          </div>

          <div
            className="relative z-10 my-4 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${slide.accent.from}70, transparent)`,
            }}
          />

          <div className="relative z-10">
            <p
              className="text-[9px] font-black tracking-[0.3em] uppercase mb-3"
              style={{ color: slide.accent.from }}
            >
              What Happens Here
            </p>
            <ul className="space-y-2">
              {slide.whatHappens?.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-snug">
                  <span
                    className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: slide.accent.from }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* Bottom nav */}
      {isActive && (
        <div className="relative z-10 mt-5 flex items-center justify-between">
          <button
            onClick={onPrev}
            className="flex items-center gap-1 text-[10px] font-semibold text-slate-600 hover:text-slate-300 transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Back
          </button>
          <span className="text-[10px] text-slate-700 tracking-widest">
            {currentIndex + 1} / {TOTAL}
          </span>
          <button
            onClick={onNext}
            className="flex items-center gap-1 text-[10px] font-semibold text-slate-600 hover:text-slate-300 transition-colors"
          >
            Next
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </motion.div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function RoadmapCards() {
  const prefersReduced = useReducedMotion() ?? false;
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [hasInteracted, setHasInteracted] = React.useState(false);
  const [showHint, setShowHint] = React.useState(false);
  const [celebrate, setCelebrate] = React.useState(false);
  const journeyDone = React.useRef(false);
  const inactivityTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Inactivity hint
  const armHintTimer = React.useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    if (!hasInteracted && !prefersReduced) {
      inactivityTimer.current = setTimeout(() => setShowHint(true), 3000);
    }
  }, [hasInteracted, prefersReduced]);

  React.useEffect(() => {
    armHintTimer();
    return () => { if (inactivityTimer.current) clearTimeout(inactivityTimer.current); };
  }, [armHintTimer]);

  const handleInteract = React.useCallback(() => {
    setHasInteracted(true);
    setShowHint(false);
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
  }, []);

  const navigate = React.useCallback((dir: 1 | -1) => {
    handleInteract();
    setCurrentIndex((prev) => {
      const next = (prev + dir + TOTAL) % TOTAL;
      // Celebrate when hitting the CTA slide (index 4) for the first time going forward
      if (dir === 1 && next === TOTAL - 1 && !journeyDone.current) {
        journeyDone.current = true;
        setCelebrate(true);
        setTimeout(() => setCelebrate(false), 2200);
      }
      return next;
    });
  }, [handleInteract]);

  const onNext = React.useCallback(() => navigate(1), [navigate]);
  const onPrev = React.useCallback(() => navigate(-1), [navigate]);

  const activeSlide = slides[currentIndex];

  return (
    <div className="relative min-h-screen w-full bg-[#04040c] flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
      <AmbientBackground activeIndex={currentIndex} celebrate={celebrate} prefersReduced={prefersReduced} />
      <Particles activeIndex={currentIndex} celebrate={celebrate} prefersReduced={prefersReduced} />

      {/* Header */}
      <div className="relative z-10 text-center mb-4">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-[10px] font-black tracking-[0.35em] uppercase text-purple-400 mb-4"
        >
          Roadmap to AI Transformation
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight max-w-xl"
        >
          How Clients{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${activeSlide?.accent.from ?? "#a855f7"}, ${activeSlide?.accent.to ?? "#f43f5e"})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Work With Me
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-3 text-sm text-slate-500 max-w-md mx-auto leading-relaxed"
        >
          A strategic roadmap from AI clarity and alignment to implementation, scale, and proprietary capability.
        </motion.p>

        {/* Service pillars */}
        <ServicePillars prefersReduced={prefersReduced} />
      </div>

      {/* Progress spine */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 mt-4"
      >
        <ProgressSpine currentIndex={currentIndex} celebrate={celebrate} prefersReduced={prefersReduced} />
      </motion.div>

      {/* Card stack */}
      <motion.div
        initial={{ opacity: 0, y: prefersReduced ? 0 : 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-[90vw] max-w-[340px] sm:max-w-[400px] md:max-w-[440px]"
        style={{ height: 490 }}
      >
        {slides.map((slide, slideIndex) => (
          <SlideCard
            key={slide.id}
            slide={slide}
            slideIndex={slideIndex}
            currentIndex={currentIndex}
            onNext={onNext}
            onPrev={onPrev}
            onInteract={handleInteract}
            prefersReduced={prefersReduced}
            showHint={showHint && slideIndex === currentIndex}
          />
        ))}
      </motion.div>
    </div>
  );
}
