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
import { Search, GitBranch, Cpu, Rocket, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Stage {
  id: number;
  stage: string;
  verb: string;
  headline: string;
  description: string;
  whatHappens: string[];
  accent: { from: string; via?: string; to: string };
  icon: React.ReactNode;
  cardBg: string;
  glowColor: string;
  particleColor: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const stages: Stage[] = [
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
];

// ─── Card position calculator ─────────────────────────────────────────────────

function getCardStyle(stageIndex: number, currentIndex: number) {
  const diff = stageIndex - currentIndex;
  switch (diff) {
    case 0:  return { x: "0%",    rotate: "-3deg", scale: 1,    opacity: 1,   filter: "blur(0px)",   zIndex: 10, interactive: true  };
    case 1:  return { x: "8%",    rotate: "3.5deg",scale: 0.93, opacity: 0.7, filter: "blur(1px)",   zIndex: 6,  interactive: false };
    case 2:  return { x: "14%",   rotate: "6deg",  scale: 0.87, opacity: 0.4, filter: "blur(2.5px)", zIndex: 3,  interactive: false };
    case -1: return { x: "-8%",   rotate: "-7deg", scale: 0.90, opacity: 0.5, filter: "blur(2px)",   zIndex: 5,  interactive: false };
    default: return { x: "0%",    rotate: "0deg",  scale: 0.82, opacity: 0,   filter: "blur(5px)",   zIndex: 0,  interactive: false };
  }
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
  const pc = stages[activeIndex]?.particleColor ?? "168,85,247";
  const count = prefersReduced ? 0 : celebrate ? 50 : 28;

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

  if (count === 0) return null;

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

// ─── Progress Spine ───────────────────────────────────────────────────────────

function ProgressSpine({
  currentIndex,
  total,
  celebrate,
  prefersReduced,
}: {
  currentIndex: number;
  total: number;
  celebrate: boolean;
  prefersReduced: boolean;
}) {
  const labels = ["Clarify", "Align", "Implement", "Scale"];
  const progress = currentIndex / (total - 1);

  return (
    <div className="relative z-10 mb-10 select-none w-full max-w-[320px] sm:max-w-sm">
      {/* Track */}
      <div className="relative flex items-center">
        {/* Background track line */}
        <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-slate-800" />

        {/* Filled track */}
        <motion.div
          className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full"
          style={{
            background: "linear-gradient(90deg, #a855f7, #6366f1, #06b6d4, #f59e0b)",
            boxShadow: celebrate ? "0 0 12px rgba(168,85,247,0.8)" : "none",
          }}
          animate={{ width: `${progress * 100}%` }}
          transition={prefersReduced ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 20 }}
        />

        {/* Nodes */}
        <div className="relative z-10 flex w-full justify-between">
          {labels.map((label, i) => {
            const isActive = i === currentIndex;
            const isPast = i < currentIndex;
            return (
              <div key={label} className="flex flex-col items-center">
                <motion.div
                  animate={{
                    scale: isActive ? 1.25 : 1,
                    backgroundColor: isPast || isActive ? "#a855f7" : "#1e293b",
                    boxShadow:
                      isActive
                        ? celebrate
                          ? "0 0 24px rgba(168,85,247,1)"
                          : "0 0 16px rgba(168,85,247,0.7)"
                        : "none",
                  }}
                  transition={prefersReduced ? { duration: 0 } : { type: "spring", stiffness: 200, damping: 20 }}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black text-white border border-slate-700"
                >
                  {i + 1}
                </motion.div>
                <motion.span
                  animate={{ opacity: isActive ? 1 : 0.3, y: isActive ? 0 : 2 }}
                  transition={{ duration: 0.35 }}
                  className="mt-2 text-[9px] font-bold tracking-widest uppercase text-slate-400 hidden sm:block"
                >
                  {label}
                </motion.span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Gesture Hint ─────────────────────────────────────────────────────────────

function GhostTouch({
  direction,
  accentColor,
}: {
  direction: "left" | "right";
  accentColor: string;
}) {
  // touch point travels from right→left or left→right across card centre
  const fromX = direction === "left" ? "55%" : "45%";
  const toX = direction === "left" ? "20%" : "80%";

  // Trail origin and direction
  const trailFromX = direction === "left" ? "55%" : "45%";

  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-2xl">
      {/* Swipe trail */}
      <motion.div
        className="absolute top-[52%] h-[2px] rounded-full"
        style={{
          left: direction === "left" ? "20%" : "45%",
          width: direction === "left" ? "35%" : "35%",
          background: `linear-gradient(${direction === "left" ? "to left" : "to right"}, transparent, ${accentColor}80, ${accentColor}40)`,
          filter: "blur(1.5px)",
        }}
        initial={{ scaleX: 0, opacity: 0, transformOrigin: direction === "left" ? "right" : "left" }}
        animate={{
          scaleX: [0, 0, 1, 1, 0.3, 0],
          opacity: [0, 0, 0.9, 0.9, 0.4, 0],
        }}
        transition={{ duration: 2.2, times: [0, 0.1, 0.35, 0.65, 0.85, 1], ease: "easeOut" }}
      />

      {/* Touch point */}
      <motion.div
        className="absolute top-[52%] -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full"
        style={{
          background: `radial-gradient(circle, ${accentColor}50 0%, ${accentColor}15 60%, transparent 100%)`,
          boxShadow: `0 0 20px ${accentColor}60, 0 0 0 1px ${accentColor}30`,
          backdropFilter: "blur(2px)",
        }}
        initial={{ left: fromX, opacity: 0, scale: 0.6 }}
        animate={{
          left: [fromX, fromX, toX, toX],
          opacity: [0, 1, 1, 0],
          scale: [0.6, 1, 0.9, 0.6],
        }}
        transition={{
          duration: 2.2,
          times: [0, 0.08, 0.72, 1],
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* Direction label */}
      <motion.div
        className="absolute bottom-[18%] left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase"
        style={{ color: `${accentColor}99` }}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: [0, 0, 1, 1, 0], y: [4, 4, 0, 0, -4] }}
        transition={{ duration: 2.2, times: [0, 0.2, 0.4, 0.75, 1] }}
      >
        {direction === "left" ? (
          <>
            <ChevronLeft className="w-3 h-3" />
            {direction === "left" ? "next stage" : "previous stage"}
          </>
        ) : (
          <>
            previous stage
            <ChevronRight className="w-3 h-3" />
          </>
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
  const accentColor = stages[activeIndex]?.accent.from ?? "#a855f7";
  // Alternate: even cycles go left, odd go right (unless at boundary)
  const direction: "left" | "right" =
    activeIndex === 0 ? "left" : activeIndex === stages.length - 1 ? "right" : cycle % 2 === 0 ? "left" : "right";

  React.useEffect(() => {
    if (!show || prefersReduced) return;
    const t = setTimeout(() => {
      setCycle((c) => c + 1);
      setHintKey((k) => k + 1);
    }, 5500);
    return () => clearTimeout(t);
  }, [show, cycle, prefersReduced]);

  if (prefersReduced) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="hint-wrapper"
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

// ─── CTA Card ─────────────────────────────────────────────────────────────────

function CTACard({ onReset, prefersReduced }: { onReset: () => void; prefersReduced: boolean }) {
  const [hovering, setHovering] = React.useState(false);

  const stagger = (i: number): { initial: TargetAndTransition; animate: TargetAndTransition; transition: Transition } => ({
    initial: { opacity: 0, y: prefersReduced ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: i * 0.12 + 0.1, duration: 0.55, ease: "easeOut" },
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.92, y: prefersReduced ? 0 : 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl border border-purple-500/25 bg-slate-950/95 p-7 shadow-2xl backdrop-blur-xl text-center overflow-hidden"
      style={{
        boxShadow:
          "0 0 80px rgba(168,85,247,0.18), 0 0 0 1px rgba(168,85,247,0.12), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 25%, rgba(168,85,247,0.1), transparent)",
        }}
      />

      {/* Logo */}
      <motion.div {...stagger(0)} className="relative z-10">
        <div className="relative">
          {/* Subtle logo glow */}
          <div
            className="pointer-events-none absolute inset-0 rounded-full -z-10"
            style={{
              background: "radial-gradient(circle, rgba(168,85,247,0.15), transparent 70%)",
              filter: "blur(12px)",
              transform: "scale(1.3)",
            }}
          />
          <Image
            src="/logo.png"
            alt="Business With AI Strategist"
            width={280}
            height={100}
            className="h-auto w-auto object-contain max-h-[70px] sm:max-h-[80px] md:max-h-[90px]"
            priority
          />
        </div>
      </motion.div>

      {/* Divider */}
      <motion.div
        {...stagger(1)}
        className="relative z-10 w-16 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.5), transparent)" }}
      />

      {/* Heading */}
      <motion.h3 {...stagger(2)} className="relative z-10 text-xl sm:text-2xl font-black text-white leading-tight">
        Ready to identify your next step?
      </motion.h3>

      {/* Body */}
      <motion.p {...stagger(3)} className="relative z-10 text-xs text-slate-400 leading-relaxed max-w-[260px]">
        Whether you need clarity, implementation support, or a strategy for scaling AI across your organisation — every transformation starts with one conversation.
      </motion.p>

      {/* CTA Button */}
      <motion.div {...stagger(4)} className="relative z-10 w-full">
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
          className="relative w-full overflow-hidden rounded-2xl px-6 py-4 text-sm font-bold text-white shadow-xl"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #a855f7, #ec4899)",
            minHeight: 56,
            boxShadow: hovering
              ? "0 0 40px rgba(168,85,247,0.5), 0 8px 32px rgba(168,85,247,0.3)"
              : "0 4px 24px rgba(168,85,247,0.25)",
          }}
        >
          {/* Shimmer on hover */}
          <AnimatePresence>
            {hovering && (
              <motion.div
                className="pointer-events-none absolute inset-0"
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: "100%", opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  background:
                    "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)",
                }}
              />
            )}
          </AnimatePresence>
          <span className="relative z-10 flex items-center justify-center gap-2">
            Book Your Complimentary Strategy Call
            <ArrowRight className="w-4 h-4" />
          </span>
        </motion.button>

        {/* Micro-copy on hover */}
        <AnimatePresence>
          {hovering && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.3 }}
              className="mt-2 text-[10px] text-slate-500 tracking-wide"
            >
              30 minutes · Complimentary · No obligation
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Reset */}
      <motion.button
        {...stagger(5)}
        onClick={onReset}
        className="relative z-10 text-[10px] text-slate-700 hover:text-slate-400 transition-colors underline underline-offset-4 tracking-wide"
      >
        Explore the stages again
      </motion.button>
    </motion.div>
  );
}

// ─── Stage Card ───────────────────────────────────────────────────────────────

interface CardProps {
  stage: Stage;
  stageIndex: number;
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onInteract: () => void;
  prefersReduced: boolean;
  showHint: boolean;
}

function StageCard({
  stage,
  stageIndex,
  currentIndex,
  onNext,
  onPrev,
  onInteract,
  prefersReduced,
  showHint,
}: CardProps) {
  const style = getCardStyle(stageIndex, currentIndex);
  const dragStartX = React.useRef(0);
  const isActive = style.interactive;

  const springConfig = prefersReduced
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 180, damping: 26 };

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
      transition={springConfig}
      drag={isActive ? "x" : false}
      dragElastic={{ left: 0.15, right: 0.15 }}
      dragConstraints={{ left: 0, right: 0 }}
      onDragStart={(e: any) => {
        dragStartX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
        onInteract();
      }}
      onDragEnd={(_e: any, info: any) => {
        const delta = info.offset.x;
        if (delta < -80) onNext();
        else if (delta > 80) onPrev();
      }}
      className={[
        "absolute inset-0 select-none rounded-2xl border border-white/[0.07] flex flex-col justify-between overflow-hidden",
        `bg-gradient-to-br ${stage.cardBg}`,
        "p-7 shadow-2xl backdrop-blur-xl",
        isActive ? "cursor-grab active:cursor-grabbing" : "pointer-events-none",
      ].join(" ")}
    >
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: `radial-gradient(circle at 25% 15%, ${stage.glowColor}, transparent 55%)`,
        }}
      />

      {/* Gesture hint overlay */}
      {isActive && (
        <SwipeHint show={showHint} activeIndex={currentIndex} prefersReduced={prefersReduced} />
      )}

      {/* Top */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-5">
          <span
            className="text-[10px] font-black tracking-[0.25em] uppercase px-3 py-1 rounded-full border"
            style={{
              color: stage.accent.from,
              borderColor: `${stage.accent.from}50`,
              background: `${stage.accent.from}18`,
            }}
          >
            {stage.stage}
          </span>
          <motion.div
            animate={isActive && !prefersReduced ? { rotate: [0, 8, -8, 0] } : { rotate: 0 }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ color: stage.accent.from }}
          >
            {stage.icon}
          </motion.div>
        </div>

        {/* Verb */}
        <h2
          className="text-5xl sm:text-6xl font-black mb-1 leading-none"
          style={{
            background: `linear-gradient(135deg, ${stage.accent.from}, ${stage.accent.via ?? stage.accent.to}, ${stage.accent.to})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {stage.verb}
        </h2>
        <h3 className="text-sm font-semibold text-white/85 mb-3 leading-snug">
          {stage.headline}
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">{stage.description}</p>
      </div>

      {/* Divider */}
      <div
        className="relative z-10 my-4 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${stage.accent.from}70, transparent)`,
        }}
      />

      {/* What Happens */}
      <div className="relative z-10">
        <p
          className="text-[9px] font-black tracking-[0.3em] uppercase mb-3"
          style={{ color: stage.accent.from }}
        >
          What Happens Here
        </p>
        <ul className="space-y-2">
          {stage.whatHappens.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-snug">
              <span
                className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: stage.accent.from }}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Nav arrows (always visible, keyboard / tap accessible) */}
      {isActive && (
        <div className="relative z-10 mt-5 flex items-center justify-between">
          <button
            onClick={onPrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-1 text-[10px] font-semibold text-slate-600 hover:text-slate-300 transition-colors disabled:opacity-0 disabled:pointer-events-none"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Back
          </button>
          <span className="text-[10px] text-slate-700 tracking-widest">
            {currentIndex + 1} / {stages.length}
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
  const glowColors = [
    "rgba(168,85,247,0.08)",
    "rgba(99,102,241,0.08)",
    "rgba(6,182,212,0.08)",
    "rgba(245,158,11,0.08)",
  ];
  const glow = glowColors[activeIndex] ?? glowColors[0];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/25 via-[#04040c] to-indigo-950/15" />
      <motion.div
        animate={{ backgroundColor: glow }}
        transition={prefersReduced ? { duration: 0 } : { duration: 1.2 }}
        className="absolute inset-0"
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(99,102,241,0.1), transparent)",
        }}
      />
      {/* Celebration pulse */}
      <AnimatePresence>
        {celebrate && !prefersReduced && (
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.3, 0], scale: [0.5, 2, 3] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.4), transparent 60%)",
              transformOrigin: "center",
            }}
          />
        )}
      </AnimatePresence>
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function RoadmapCards() {
  const prefersReduced = useReducedMotion() ?? false;
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [showCTA, setShowCTA] = React.useState(false);
  const [hasInteracted, setHasInteracted] = React.useState(false);
  const [showHint, setShowHint] = React.useState(false);
  const [celebrate, setCelebrate] = React.useState(false);
  const journeyCompletedOnce = React.useRef(false);
  const inactivityTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Show hint after 3s of inactivity (only before first interaction)
  const resetInactivityTimer = React.useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    if (!hasInteracted && !prefersReduced) {
      inactivityTimer.current = setTimeout(() => setShowHint(true), 3000);
    }
  }, [hasInteracted, prefersReduced]);

  React.useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [resetInactivityTimer]);

  const handleInteract = React.useCallback(() => {
    setHasInteracted(true);
    setShowHint(false);
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
  }, []);

  const handleNext = React.useCallback(() => {
    handleInteract();
    if (currentIndex < stages.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      // Completed the journey
      if (!journeyCompletedOnce.current) {
        journeyCompletedOnce.current = true;
        setCelebrate(true);
        setTimeout(() => setCelebrate(false), 2200);
      }
      setTimeout(() => setShowCTA(true), 400);
    }
  }, [currentIndex, handleInteract]);

  const handlePrev = React.useCallback(() => {
    handleInteract();
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex, handleInteract]);

  const handleReset = () => {
    setShowCTA(false);
    setCurrentIndex(0);
    setHasInteracted(false);
    setShowHint(false);
    resetInactivityTimer();
  };

  return (
    <div className="relative min-h-screen w-full bg-[#04040c] flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
      <AmbientBackground
        activeIndex={currentIndex}
        celebrate={celebrate}
        prefersReduced={prefersReduced}
      />
      <Particles
        activeIndex={currentIndex}
        celebrate={celebrate}
        prefersReduced={prefersReduced}
      />

      {/* Section header */}
      <div className="relative z-10 text-center mb-10">
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
          A strategic pathway from{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #a855f7, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            AI clarity
          </span>{" "}
          to proprietary capability.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 text-sm text-slate-500 max-w-sm mx-auto leading-relaxed"
        >
          Drag or use the arrows to navigate each stage of transformation.
        </motion.p>
      </div>

      {/* Progress spine */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="relative z-10"
      >
        <ProgressSpine
          currentIndex={currentIndex}
          total={stages.length}
          celebrate={celebrate}
          prefersReduced={prefersReduced}
        />
      </motion.div>

      {/* Card stack */}
      <motion.div
        initial={{ opacity: 0, y: prefersReduced ? 0 : 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-[90vw] max-w-[340px] sm:max-w-[400px] md:max-w-[440px]"
        style={{ height: 490 }}
      >
        <AnimatePresence>
          {showCTA ? (
            <CTACard key="cta" onReset={handleReset} prefersReduced={prefersReduced} />
          ) : (
            stages.map((stage, stageIndex) => (
              <StageCard
                key={stage.id}
                stage={stage}
                stageIndex={stageIndex}
                currentIndex={currentIndex}
                onNext={handleNext}
                onPrev={handlePrev}
                onInteract={handleInteract}
                prefersReduced={prefersReduced}
                showHint={showHint && stageIndex === currentIndex}
              />
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
