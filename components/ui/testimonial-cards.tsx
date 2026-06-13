"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Search, GitBranch, Cpu, Rocket, ArrowRight, Sparkles } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Position = "front" | "middle" | "back" | "hidden";

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
    icon: <Search className="w-8 h-8" />,
    cardBg: "from-purple-950/80 via-pink-950/60 to-slate-900/80",
    glowColor: "rgba(168,85,247,0.4)",
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
    icon: <GitBranch className="w-8 h-8" />,
    cardBg: "from-indigo-950/80 via-violet-950/60 to-slate-900/80",
    glowColor: "rgba(99,102,241,0.4)",
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
    icon: <Cpu className="w-8 h-8" />,
    cardBg: "from-cyan-950/80 via-purple-950/60 to-slate-900/80",
    glowColor: "rgba(6,182,212,0.4)",
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
    icon: <Rocket className="w-8 h-8" />,
    cardBg: "from-amber-950/80 via-pink-950/60 to-slate-900/80",
    glowColor: "rgba(245,158,11,0.4)",
  },
];

// ─── Particles ────────────────────────────────────────────────────────────────

function Particles({ activeIndex }: { activeIndex: number }) {
  const colors = [
    "rgba(168,85,247,0.7)",
    "rgba(99,102,241,0.7)",
    "rgba(6,182,212,0.7)",
    "rgba(245,158,11,0.7)",
  ];
  const color = colors[activeIndex] ?? colors[0];

  const particles = React.useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
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
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: color,
          }}
          animate={{ y: [0, -35, 0], opacity: [0, 0.9, 0], scale: [0.5, 1.3, 0.5] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ─── Progress Indicator ───────────────────────────────────────────────────────

function ProgressIndicator({ activeIndex }: { activeIndex: number }) {
  const labels = ["Clarify", "Align", "Implement", "Scale"];

  return (
    <div className="flex items-center mb-10 select-none w-full max-w-xs sm:max-w-sm">
      {labels.map((label, i) => (
        <React.Fragment key={label}>
          <div className="flex flex-col items-center">
            <motion.div
              animate={{
                scale: i === activeIndex ? 1.2 : 1,
                backgroundColor: i <= activeIndex ? "#a855f7" : "#334155",
                boxShadow: i === activeIndex ? "0 0 16px rgba(168,85,247,0.7)" : "none",
              }}
              transition={{ duration: 0.4 }}
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
            >
              {i + 1}
            </motion.div>
            <motion.span
              animate={{ opacity: i === activeIndex ? 1 : 0.35 }}
              transition={{ duration: 0.4 }}
              className="text-[10px] mt-1.5 font-semibold text-slate-400 hidden sm:block tracking-wide"
            >
              {label}
            </motion.span>
          </div>
          {i < labels.length - 1 && (
            <motion.div
              animate={{ backgroundColor: i < activeIndex ? "#a855f7" : "#1e293b" }}
              transition={{ duration: 0.5 }}
              className="h-[2px] flex-1 mx-2 mt-[-14px] sm:mt-[-22px] rounded-full"
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── CTA Card ─────────────────────────────────────────────────────────────────

function CTACard({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 flex flex-col items-center justify-center gap-5 rounded-2xl border border-purple-500/30 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-xl text-center"
      style={{
        boxShadow:
          "0 0 80px rgba(168,85,247,0.2), 0 0 0 1px rgba(168,85,247,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* Glow backdrop */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(168,85,247,0.12), transparent)" }}
      />

      <motion.div
        animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles className="w-12 h-12 text-purple-400" />
      </motion.div>

      <div className="relative z-10 space-y-3">
        <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
          Ready to identify your next step?
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed max-w-xs mx-auto">
          Whether you need clarity, implementation support, or a strategy for scaling AI across your organisation — every transformation starts with one conversation.
        </p>
      </div>

      <a
        href="#strategy-call"
        className="relative z-10 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:from-purple-500 hover:to-pink-500 hover:shadow-purple-500/40 hover:shadow-2xl hover:scale-105 active:scale-95"
      >
        Book Your Complimentary Strategy Call
        <ArrowRight className="w-4 h-4" />
      </a>

      <button
        onClick={onReset}
        className="relative z-10 text-xs text-slate-600 hover:text-slate-300 transition-colors underline underline-offset-4"
      >
        Explore the stages again
      </button>
    </motion.div>
  );
}

// ─── Stage Card ───────────────────────────────────────────────────────────────

interface CardProps {
  stage: Stage;
  position: Position;
  handleShuffle: () => void;
}

function StageCard({ stage, position, handleShuffle }: CardProps) {
  const dragRef = React.useRef(0);
  const isFront = position === "front";

  const variants: Record<Position, { rotate: string; x: string; scale: number; filter: string; zIndex: number }> = {
    front:  { rotate: "-4deg",  x: "0%",   scale: 1,    filter: "blur(0px)",   zIndex: 10 },
    middle: { rotate: "1deg",   x: "5%",   scale: 0.96, filter: "blur(0.5px)", zIndex: 5  },
    back:   { rotate: "5deg",   x: "10%",  scale: 0.92, filter: "blur(1.5px)", zIndex: 2  },
    hidden: { rotate: "8deg",   x: "15%",  scale: 0.88, filter: "blur(3px)",   zIndex: 0  },
  };

  const v = variants[position];

  return (
    <motion.div
      animate={{ rotate: v.rotate, x: v.x, scale: v.scale, filter: v.filter }}
      style={{ zIndex: v.zIndex }}
      drag={isFront}
      dragElastic={0.2}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragStart={(e: any) => {
        dragRef.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
      }}
      onDragEnd={(e: any) => {
        const endX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? 0;
        if (dragRef.current - endX > 90) {
          handleShuffle();
        }
        dragRef.current = 0;
      }}
      transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
      className={[
        "absolute inset-0 select-none rounded-2xl border border-white/[0.08] flex flex-col justify-between overflow-hidden",
        `bg-gradient-to-br ${stage.cardBg}`,
        "p-7 shadow-2xl backdrop-blur-xl",
        isFront ? "cursor-grab active:cursor-grabbing" : "pointer-events-none",
      ].join(" ")}
    >
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: `radial-gradient(circle at 25% 15%, ${stage.glowColor}, transparent 55%)`,
        }}
      />

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
            animate={isFront ? { rotate: [0, 8, -8, 0] } : { rotate: 0 }}
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

      {/* Drag hint — fades out after a moment */}
      {isFront && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ delay: 0.8, duration: 2.5, times: [0, 0.2, 0.8, 1] }}
          className="relative z-10 mt-4 flex items-center justify-center gap-1.5 text-[10px] text-slate-500"
        >
          <ArrowRight className="w-3 h-3" />
          Drag left to reveal the next stage
        </motion.div>
      )}
    </motion.div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function RoadmapCards() {
  const totalStages = stages.length;
  const [order, setOrder] = React.useState<number[]>(stages.map((_, i) => i));
  const [showCTA, setShowCTA] = React.useState(false);
  const shuffleCount = React.useRef(0);

  const activeIndex = order[0];

  const handleShuffle = React.useCallback(() => {
    shuffleCount.current += 1;
    setOrder((prev) => {
      const next = [...prev];
      const front = next.shift()!;
      next.push(front);
      return next;
    });
    if (shuffleCount.current >= totalStages) {
      setTimeout(() => setShowCTA(true), 500);
    }
  }, [totalStages]);

  const handleReset = () => {
    shuffleCount.current = 0;
    setShowCTA(false);
    setOrder(stages.map((_, i) => i));
  };

  const positionFor = (orderIndex: number): Position => {
    if (orderIndex === 0) return "front";
    if (orderIndex === 1) return "middle";
    if (orderIndex === 2) return "back";
    return "hidden";
  };

  return (
    <div className="relative min-h-screen w-full bg-[#04040c] flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/25 via-[#04040c] to-indigo-950/15" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(99,102,241,0.12), transparent)",
          }}
        />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Particles */}
      <Particles activeIndex={activeIndex} />

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
            className="inline-block"
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
          Drag each stage to reveal the next phase of transformation.
        </motion.p>
      </div>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="relative z-10"
      >
        <ProgressIndicator activeIndex={activeIndex} />
      </motion.div>

      {/* Card stack */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-[90vw] max-w-[340px] sm:max-w-[400px] md:max-w-[440px]"
        style={{ height: 490 }}
      >
        {showCTA ? (
          <CTACard onReset={handleReset} />
        ) : (
          order.map((stageIndex, orderIndex) => (
            <StageCard
              key={stages[stageIndex].id}
              stage={stages[stageIndex]}
              position={positionFor(orderIndex)}
              handleShuffle={handleShuffle}
            />
          ))
        )}
      </motion.div>

      {/* Counter */}
      {!showCTA && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="relative z-10 mt-8 text-[11px] text-slate-700 tracking-widest uppercase"
        >
          Stage {activeIndex + 1} of {totalStages}
        </motion.p>
      )}
    </div>
  );
}
