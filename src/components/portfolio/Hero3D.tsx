import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Play, MapPin, Clock, Star, Baby } from "lucide-react";
import heroBg from "@/assets/photos/hero.jpeg";

const stats = [
  { v: "10+", l: "Enfants heureux" },
  { v: "7+", l: "Familles accompagnées" },
  { v: "98%", l: "Parents satisfaits" },
];

const marqueeItems = [
  "Éveil sensoriel",
  "Bienveillance",
  "Sécurité",
  "Créativité",
  "Jeu libre",
  "Tendresse",
  "Découverte",
  "Épanouissement",
];

function Petal({
  className,
  delay = 0,
  size = 40,
  rotate = 0,
}: {
  className?: string;
  delay?: number;
  size?: number;
  rotate?: number;
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      animate={{ y: [0, -12, 0], rotate: [rotate, rotate + 8, rotate] }}
      transition={{
        duration: 6 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <ellipse cx="20" cy="20" rx="9" ry="18" fill="currentColor" opacity="0.18" transform={`rotate(${rotate} 20 20)`} />
      <ellipse cx="20" cy="20" rx="9" ry="18" fill="currentColor" opacity="0.12" transform={`rotate(${rotate + 60} 20 20)`} />
      <ellipse cx="20" cy="20" rx="9" ry="18" fill="currentColor" opacity="0.10" transform={`rotate(${rotate + 120} 20 20)`} />
    </motion.svg>
  );
}

function HeroInfoCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 1.1, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
      className="hidden lg:flex flex-col gap-5 w-[260px] xl:w-[280px]"
    >
      <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-cream/10 backdrop-blur-md border border-cream/20 w-fit">
        <span className="w-2 h-2 rounded-full bg-mint animate-pulse shadow-[0_0_8px_2px] shadow-mint/50" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-cream/90 font-semibold">
          Ouvert maintenant
        </span>
      </div>

      <div className="rounded-2xl bg-cream/8 backdrop-blur-xl border border-cream/15 p-6 flex flex-col gap-5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]">
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-petal/20 border border-petal/30 flex items-center justify-center flex-shrink-0">
            <Baby className="w-4 h-4 text-petal" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-cream/55 mb-0.5">Âges acceptés</p>
            <p className="text-sm font-semibold text-cream">12mois — 4 ans</p>
          </div>
        </div>

        <div className="h-px bg-cream/10" />

        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-sun/20 border border-sun/30 flex items-center justify-center flex-shrink-0">
            <Clock className="w-4 h-4 text-sun" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-cream/55 mb-0.5">Horaires d'accueil</p>
            <p className="text-sm font-semibold text-cream">Lun – Ven · 9h00 – 17h00</p>
          </div>
        </div>

        <div className="h-px bg-cream/10" />

        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-sky/20 border border-sky/30 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-4 h-4 text-sky" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-cream/55 mb-0.5">Localisation</p>
            <p className="text-sm font-semibold text-cream">Nyamata, Rwanda</p>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-cream/8 backdrop-blur-xl border border-cream/15 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]"
      >
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-sun text-sun" />
          ))}
        </div>
        <div className="h-4 w-px bg-cream/20" />
        <p className="text-[11px] text-cream/80 leading-tight">
          <span className="font-bold text-cream">4.9</span> · 10+ avis Google
        </p>
      </motion.div>
    </motion.div>
  );
}

function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div className="relative overflow-hidden w-full max-w-xl">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="flex gap-3 w-max"
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cream/20 text-[10px] uppercase tracking-[0.2em] text-cream/65 whitespace-nowrap"
          >
            <span className="w-1 h-1 rounded-full bg-petal/70" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-ink"
    >
      <motion.div
        style={{ y: bgY, scale: bgScale, backgroundImage: `url(${heroBg})` }}
        className="absolute inset-0 bg-cover bg-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/65 to-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/40" />
      <div
        className="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />

      {/* Floating decorative petals */}
      <Petal className="absolute top-[18%] right-[28%] text-petal pointer-events-none" size={84} rotate={40} delay={0} />
      <Petal className="absolute top-[55%] right-[12%] text-sun pointer-events-none" size={62} rotate={65} delay={1.5} />
      <Petal className="absolute top-[35%] right-[42%] text-mint pointer-events-none" size={42} rotate={-30} delay={2.8} />
      <Petal className="absolute bottom-[20%] right-[32%] text-lavender pointer-events-none" size={60} rotate={30} delay={0.8} />

      {/* Vertical edge markers */}
      <div className="absolute top-32 left-5 z-20 text-[10px] tracking-[0.4em] uppercase text-cream/55 [writing-mode:vertical-rl] rotate-180 hidden md:block">
        Est. 2026 · Nyamata — RW
      </div>
      <div className="absolute bottom-32 right-5 z-20 text-[10px] tracking-[0.4em] uppercase text-cream/55 [writing-mode:vertical-rl] hidden md:block">
        Scroll to discover
      </div>

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 md:px-14 lg:px-20"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-cream text-ink text-[10px] uppercase tracking-[0.3em] font-semibold shadow-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-petal animate-pulse" />
            Crèche & Éveil · Nyamata
          </span>
        </motion.div>

        {/* Headline row — text left, info card right */}
        <div className="flex items-center justify-between gap-8">
          <div className="max-w-5xl flex-1">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="font-display font-bold text-cream leading-[0.92] tracking-[-0.03em]"
            >
              <motion.span
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="block text-[clamp(2.75rem,9vw,8.5rem)]"
              >
                L'aube
              </motion.span>
              <motion.span
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="block italic font-light text-[clamp(2.75rem,9vw,8.5rem)] -mt-1 md:-mt-3 text-sun"
              >
                des pétales.
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.85 }}
              className="mt-8 max-w-xl text-base md:text-lg text-cream/85 leading-relaxed"
            >
              Un sanctuaire d'enfance où chaque pétale éclôt à son propre rythme,
              entre rires, découvertes et tendresse.
            </motion.p>

            {/* Scrolling keyword marquee */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.95 }}
              className="mt-6"
            >
              <Marquee />
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <button
                onClick={() =>
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                }
                className="group relative overflow-hidden px-7 py-4 rounded-full text-ink font-medium text-sm bg-cream flex items-center gap-3 shadow-glow hover:scale-[1.03] active:scale-[0.97] transition-transform"
              >
                <span className="relative z-10">Réserver une visite</span>
                <span className="relative z-10 w-8 h-8 rounded-full bg-ink text-cream flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </button>
              <button
                onClick={() =>
                  document.querySelector("#notre-univers")?.scrollIntoView({ behavior: "smooth" })
                }
                className="group flex items-center gap-3 text-sm font-medium text-cream/90 hover:text-cream transition-colors"
              >
                <span className="w-11 h-11 rounded-full border border-cream/40 flex items-center justify-center group-hover:bg-cream group-hover:text-ink group-hover:border-cream transition-all duration-500">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </span>
                Découvrir notre univers
              </button>
            </motion.div>
          </div>

          {/* Right: floating info card */}
          <HeroInfoCard />
        </div>

        {/* Bottom bar — stats + scroll cue */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-t border-cream/15 pt-8"
        >
          <div className="grid grid-cols-3 gap-8 md:gap-14">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 + i * 0.1 }}
                className="flex flex-col"
              >
                <span className="font-display text-2xl md:text-4xl text-cream font-bold leading-none">
                  {s.v}
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-cream/65 mt-2">
                  {s.l}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-cream/70">
            <span>Faites défiler</span>
            <span className="relative w-px h-10 bg-cream/25 overflow-hidden">
              <motion.span
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-x-0 top-0 h-1/2 bg-cream"
              />
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}