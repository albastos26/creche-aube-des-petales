import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Shield, Heart, Flower2, Baby, ArrowUpRight } from "lucide-react";

const valeurs = [
  {
    num: "01",
    icon: Shield,
    title: "Sécurité",
    subtitle: "Confiance & sérénité",
    description: "Un environnement sûr, surveillé, certifié , où chaque enfant évolue en pleine confiance, à chaque instant.",
    accent: "var(--color-mint)",
    keywords: ["Surveillance ", "Locaux certifiés", "Protocole sanitaire"],
  },
  {
    num: "02",
    icon: Heart,
    title: "Bienveillance",
    subtitle: "Écoute & tendresse",
    description: "Une attention personnalisée, une écoute attentive , chaque émotion accueillie, chaque rire célébré.",
    accent: "var(--color-petal)",
    keywords: ["Écoute active", "Cadre rassurant", "Lien affectif"],
  },
  {
    num: "03",
    icon: Flower2,
    title: "Épanouissement",
    subtitle: "Créativité & éveil",
    description: "Des activités riches et variées qui stimulent l'imaginaire, la créativité et l'éveil sensoriel.",
    accent: "var(--color-lavender)",
    keywords: ["Arts plastiques", "Éveil musical", "Motricité libre"],
  },
  {
    num: "04",
    icon: Baby,
    title: "Développement",
    subtitle: "Autonomie & confiance",
    description: "Un accompagnement sur mesure qui révèle l'autonomie, la confiance et le plein potentiel de l'enfant.",
    accent: "var(--color-sun)",
    keywords: ["Suivi individuel", "Pédagogie active", "Bilans réguliers"],
  },
];

export function NosValeurs() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [active, setActive] = useState(0);

  const current = valeurs[active];

  return (
    <section
      id="nos-valeurs"
      ref={ref}
      className="relative min-h-screen py-12 md:py-20 bg-ink overflow-hidden flex flex-col justify-center"
    >
      {/* Animated mesh glow that follows the active value */}
      <motion.div
        key={active}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] md:w-[60rem] h-[40rem] md:h-[60rem] rounded-full blur-[120px] md:blur-[160px] pointer-events-none"
        style={{ background: current.accent }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        {/* Header */}
        <div className="grid grid-cols-12 mb-8 md:mb-14 gap-4 md:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="col-span-12 md:col-span-7"
          >
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <span className="w-8 md:w-12 h-px bg-petal" />
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-petal font-semibold">
                Chapitre 02 : Nos Valeurs
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl lg:text-7xl font-bold text-cream leading-[0.95] tracking-tight">
              Quatre valeurs,
              <span className="block italic font-light text-shimmer">Une promesse.</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="col-span-12 md:col-span-4 md:col-start-9 flex items-end"
          >
            <p className="text-sm md:text-base lg:text-lg text-cream/70 leading-relaxed">
              Des principes fondamentaux vivants qui guident chaque geste, chaque sourire, chaque journée.
            </p>
          </motion.div>
        </div>

        {/* Interactive split layout - mobile optimized */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-start">
          {/* Left — interactive list */}
          <div className="col-span-1 lg:col-span-7 flex flex-col">
            {valeurs.map((v, i) => {
              const isActive = active === i;
              return (
                <motion.button
                  key={i}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)} // Mobile tap support
                  onFocus={() => setActive(i)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.1 }}
                  className="group relative text-left border-t border-white/10 last:border-b py-5 md:py-7 lg:py-9 transition-colors"
                >
                  {/* Animated bg slide */}
                  <motion.span
                    initial={false}
                    animate={{ scaleY: isActive ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-0 top-0 bottom-0 w-1 origin-top"
                    style={{ background: v.accent }}
                  />
                  <div className="flex items-center gap-4 md:gap-6 lg:gap-10 pl-4 md:pl-6">
                    <span className="font-display italic text-xl md:text-2xl lg:text-3xl text-white/30 group-hover:text-white/60 transition-colors">
                      {v.num}
                    </span>

                    <motion.div
                      animate={{
                        scale: isActive ? 1.1 : 1,
                        rotate: isActive ? 8 : 0,
                      }}
                      transition={{ duration: 0.5 }}
                      className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl flex items-center justify-center shrink-0 backdrop-blur-md border border-white/20"
                      style={{ background: isActive ? v.accent : "rgba(255,255,255,0.05)" }}
                    >
                      <v.icon className={`w-5 h-5 md:w-6 md:h-6 ${isActive ? "text-ink" : "text-white/70"} transition-colors`} />
                    </motion.div>

                    <div className="flex-1 min-w-0">
                      <h3
                        className="font-display text-xl md:text-3xl lg:text-5xl font-bold leading-none tracking-tight transition-colors duration-500"
                        style={{ color: isActive ? "var(--color-cream)" : "rgba(255,255,255,0.45)" }}
                      >
                        {v.title}
                      </h3>
                    </div>

                    <motion.div
                      animate={{ x: isActive ? 0 : -10, opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.4 }}
                      className="hidden md:flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.3em] text-cream/80"
                    >
                      <span>{v.subtitle}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </motion.div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Right — animated display panel */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="col-span-1 lg:col-span-5 lg:sticky lg:top-28 order-first lg:order-last mb-6 lg:mb-0"
          >
            <div className="relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-white/10 backdrop-blur-2xl bg-white/[0.03] p-6 md:p-8 lg:p-10 min-h-[20rem] md:min-h-[26rem]">
              {/* Accent corner */}
              <motion.div
                key={`accent-${active}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.6 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -top-16 -right-16 md:-top-20 md:-right-20 w-48 h-48 md:w-64 md:h-64 rounded-full blur-3xl"
                style={{ background: current.accent }}
              />

              <motion.div
                key={`content-${active}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="flex items-center justify-between mb-4 md:mb-8">
                  <span className="font-display italic text-4xl md:text-5xl text-cream">{current.num}</span>
                  <div
                    className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center shadow-glow"
                    style={{ background: current.accent }}
                  >
                    <current.icon className="w-6 h-6 md:w-8 md:h-8 text-ink" />
                  </div>
                </div>

                <h4 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-cream mb-2 leading-tight">
                  {current.title}
                </h4>
                <p className="text-[10px] md:text-sm uppercase tracking-[0.3em] text-cream/50 mb-4 md:mb-6">
                  {current.subtitle}
                </p>
                <p className="text-cream/80 leading-relaxed text-sm md:text-base lg:text-lg mb-6 md:mb-8">
                  {current.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {current.keywords.map((k, i) => (
                    <motion.span
                      key={k}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.08 }}
                      className="text-[10px] md:text-xs px-2.5 py-1 md:px-3 md:py-1.5 rounded-full border border-white/15 text-cream/80 bg-white/5"
                    >
                      {k}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Quote band */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mt-10 md:mt-16 max-w-4xl mx-auto text-center"
        >
          <p className="font-display text-xl md:text-2xl lg:text-4xl italic text-cream/90 leading-relaxed px-4">
            « Chaque enfant est unique. Notre mission est de révéler
            <span className="text-shimmer not-italic font-normal"> son plein potentiel </span>
            dans un cadre aimant et stimulant. »
          </p>
          <div className="w-16 md:w-20 h-px bg-petal mx-auto mt-6 md:mt-8" />
          <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-cream/50 mt-3 md:mt-4">L'Aube des Pétales</p>
        </motion.div>
      </div>
    </section>
  );
}