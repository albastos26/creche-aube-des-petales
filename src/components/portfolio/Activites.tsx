import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Palette, Music, BookOpen, Puzzle, Rocket, Sun } from "lucide-react";
import imgPeinture from "@/assets/photos/peinture.jpeg";
import imgBalles from "@/assets/photos/balles.jpeg";
import imgPlay2 from "@/assets/photos/play2.jpeg";
import imgPlay3 from "@/assets/photos/play3.jpeg";
import imgTricycles from "@/assets/photos/tricycles.jpeg";
import imgHero from "@/assets/photos/hero.jpeg";
 
const activites = [
  {
    icon: Palette,
    title: "Arts & Créativité",
    description: "Peinture, dessin, modelage… libre cours à l'imagination de chaque enfant.",
    image: imgPeinture,
    accent: "bg-petal",
    tag: "01",
  },
  {
    icon: Music,
    title: "Éveil Sensoriel",
    description: "Découverte des sons, couleurs et textures pour stimuler tous les sens.",
    image: imgBalles,
    accent: "bg-mint",
    tag: "02",
  },
  {
    icon: BookOpen,
    title: "Histoires & Lecture",
    description: "Des moments de lecture partagée pour développer le langage et l'imaginaire.",
    image: imgPlay2,
    accent: "bg-lavender",
    tag: "03",
  },
  {
    icon: Puzzle,
    title: "Jeux Éducatifs",
    description: "Apprentissage ludique et adapté à chaque tranche d'âge.",
    image: imgPlay3,
    accent: "bg-sun",
    tag: "04",
  },
  {
    icon: Rocket,
    title: "Activités Motrices",
    description: "Coordination, équilibre et motricité développés par le jeu.",
    image: imgTricycles,
    accent: "bg-sky",
    tag: "05",
  },
  {
    icon: Sun,
    title: "Jeux en Plein Air",
    description: "Une cour aménagée, sécurisée et stimulante pour s'épanouir.",
    image: imgHero,
    accent: "bg-petal-soft",
    tag: "06",
  },
];
 
const VERT_MARGIN = 7; // vh — top sticky offset and vertical padding
 
interface StickyActivityCardProps {
  activite: (typeof activites)[number];
}
 
function StickyActivityCard({ activite }: StickyActivityCardProps) {
  const container = useRef<HTMLDivElement>(null);
  const [maxScrollY, setMaxScrollY] = useState(Infinity);
 
  const filter = useMotionValue(0);
  const negateFilter = useTransform(filter, (v) => -v);
  const scale = useMotionValue(1);
 
  const { scrollY } = useScroll({ target: container });
 
  const isInView = useInView(container, {
    margin: `0px 0px -${100 - VERT_MARGIN}% 0px`,
    once: true,
  });
 
  // Drive scale + rotation from scroll position
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (y) => {
      let val = 1;
      if (y > maxScrollY) {
        val = Math.max(0, 1 - (y - maxScrollY) / 8000);
      }
      scale.set(val);
      filter.set((1 - val) * 18); // max 18° rotation — subtle vs original 100°
    });
    return unsubscribe;
  }, [maxScrollY, scrollY, scale, filter]);
 
  useEffect(() => {
    if (isInView) {
      setMaxScrollY(scrollY.get());
    }
  }, [isInView, scrollY]);
 
  const Icon = activite.icon;
 
  return (
    <motion.div
      ref={container}
      className="sticky w-full max-w-5xl mx-auto overflow-hidden rounded-3xl shadow-[0_20px_80px_-20px_rgba(44,62,80,0.45)]"
      style={{
        scale,
        rotate: filter,
        height: `${100 - 2 * VERT_MARGIN}vh`,
        top: `${VERT_MARGIN}vh`,
      }}
    >
      {/* Background photo counter-rotated so it stays level */}
      <motion.img
        src={activite.image}
        alt={activite.title}
        style={{ rotate: negateFilter }}
        className="absolute inset-0 h-full w-full scale-[1.15] object-cover"
      />
 
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/50 to-transparent" />
 
      {/* Tag number — top left */}
      <div className="absolute top-8 left-10 text-[11px] uppercase tracking-[0.35em] text-cream/50 font-semibold">
        {activite.tag} — Activité
      </div>
 
      {/* Icon badge — top right */}
      <div
        className={`absolute top-8 right-10 w-14 h-14 rounded-2xl ${activite.accent} flex items-center justify-center shadow-soft`}
      >
        <Icon className="w-7 h-7 text-white" />
      </div>
 
      {/* Text content — bottom left */}
      <div className="absolute bottom-0 inset-x-0 p-10 md:p-14">
        <motion.h3
          style={{ rotate: negateFilter }}
          className="font-display text-4xl md:text-6xl font-bold text-cream leading-tight mb-4 tracking-tight"
        >
          {activite.title}
        </motion.h3>
        <p className="text-cream/80 text-base md:text-lg max-w-xl leading-relaxed">
          {activite.description}
        </p>
      </div>
    </motion.div>
  );
}
 
export function Activites() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
 
  return (
    <section id="activites" className="relative bg-gradient-dawn">
      {/* Section header */}
      <div
        ref={headerRef}
        className="container mx-auto px-6 max-w-7xl pt-16 md:pt-20 pb-10 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-block mb-4 text-xs uppercase tracking-[0.3em] text-petal font-semibold"
        >
          03 — Activités
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-4xl md:text-6xl font-bold text-ink mb-6"
        >
          Un programme <span className="italic">riche & vivant</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-ink-soft max-w-3xl mx-auto leading-relaxed"
        >
          Pour éveiller tous les sens et révéler les talents de chaque enfant.
        </motion.p>
        {/* Scroll hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 text-[11px] uppercase tracking-[0.3em] text-ink/35"
        >
          ↓ Faites défiler pour explorer
        </motion.p>
      </div>
 
      {/* Sticky scroll stack */}
      <div
        className="flex flex-col px-4 pb-[20vh]"
        style={{ gap: "10vh", paddingTop: "5vh" }}
      >
        {activites.map((a, i) => (
          <StickyActivityCard key={i} activite={a} />
        ))}
      </div>
    </section>
  );
}