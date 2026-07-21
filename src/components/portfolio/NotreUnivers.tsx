import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Heart, Sparkles as SparkleIcon, Users, ArrowUpRight } from "lucide-react";
import uPlay from "@/assets/photos/hero.jpeg";
import uPaint from "@/assets/photos/peinture.jpeg";
import uShare from "@/assets/photos/play3.jpeg";

const features = [
  {
    num: "I.",
    icon: Heart,
    title: "Un espace pensé pour l'enfant",
    description: "Locaux modernes et colorés, conçus pour stimuler la curiosité et assurer le confort.",
    accent: "from-petal to-petal-soft",
    tag: "Architecture",
    image: uPlay,
  },
  {
    num: "II.",
    icon: SparkleIcon,
    title: "Une pédagogie innovante",
    description: "Jeux, apprentissage et créativité pour un développement harmonieux et joyeux.",
    accent: "from-sun to-petal-soft",
    tag: "Méthode",
    image: uPaint,
  },
  {
    num: "III.",
    icon: Users,
    title: "Une équipe qualifiée et dédiée",
    description: "Des éducateurs passionnés qui accompagnent chaque enfant avec bienveillance.",
    accent: "from-mint to-sky",
    tag: "Équipe",
    image: uShare,
  },
];

export function NotreUnivers() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const titleX = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      id="notre-univers"
      ref={ref}
      className="relative min-h-screen py-14 md:py-20 overflow-hidden bg-cream"
    >
      {/* Floating parallax blobs */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-[10%] w-80 h-80 rounded-full bg-sky/50 blur-3xl animate-blob" />
        <div className="absolute bottom-1/4 right-[5%] w-[28rem] h-[28rem] rounded-full bg-sun/30 blur-3xl animate-blob" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full bg-lavender/40 blur-3xl animate-blob" style={{ animationDelay: "6s" }} />
      </motion.div>

      {/* Giant scrolling background word */}
      <motion.div
        style={{ x: titleX }}
        className="absolute top-16 left-0 right-0 pointer-events-none select-none whitespace-nowrap font-display italic font-bold text-[18vw] leading-none text-ink/[0.04] tracking-tighter"
      >
        Univers · Univers · Univers
      </motion.div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        {/* Editorial header */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 mb-8 md:mb-14">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="col-span-12 md:col-span-5 flex flex-col gap-4 md:gap-6"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 md:w-12 h-px bg-petal" />
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-petal font-semibold">
                Chapitre 01 — Notre Univers
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl lg:text-7xl font-bold text-ink leading-[0.95] tracking-tight">
              Un lieu
              <span className="block italic font-light text-petal">imaginé</span>
              pour l'enfance.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="col-span-12 md:col-span-6 md:col-start-7 flex flex-col justify-end gap-4 md:gap-6"
          >
            <p className="text-base md:text-lg lg:text-xl text-ink-soft leading-relaxed">
              L'Aube des Pétales n'est pas qu'une crèche. C'est un <em className="text-ink font-display not-italic">sanctuaire d'éveil</em> un univers où la lumière du matin rencontre les premiers rires, où chaque pétale s'ouvre à son propre rythme.
            </p>
            <div className="flex items-center gap-3 text-sm text-ink/70">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-petal border-2 border-cream" />
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-sun border-2 border-cream" />
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-meadow border-2 border-cream" />
              </div>
              <span className="text-xs md:text-sm">Une équipe à cœur ouvert</span>
            </div>
          </motion.div>
        </div>

        {/* Bento asymmetric grid - mobile optimized */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {features.map((f, i) => {
            const layouts = [
              "col-span-1 md:col-span-7 md:row-span-2 min-h-[24rem] md:min-h-[40rem]",
              "col-span-1 md:col-span-5 min-h-[18rem] md:min-h-[20rem]",
              "col-span-1 md:col-span-5 min-h-[18rem] md:min-h-[20rem]",
            ];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 80 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                className={`group relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] shadow-soft hover:shadow-glow transition-shadow ${layouts[i]}`}
              >
                {/* Background image with kenburns */}
                <div
                  className="absolute inset-0 bg-cover bg-center scale-110 group-hover:scale-100 transition-transform duration-[1.4s] ease-out"
                  style={{ backgroundImage: `url(${f.image})` }}
                />
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${f.accent} opacity-80 group-hover:opacity-70 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-6 md:p-8 lg:p-10 text-white">
                  <div className="flex items-start justify-between">
                    <span className="font-display italic text-2xl md:text-3xl lg:text-4xl opacity-80">{f.num}</span>
                    <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] backdrop-blur-md bg-white/20 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full border border-white/30">
                      {f.tag}
                    </span>
                  </div>

                  <div>
                    <motion.div
                      whileHover={{ rotate: 12, scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                      className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center mb-4 md:mb-5"
                    >
                      <f.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </motion.div>
                    <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3 leading-tight">
                      {f.title}
                    </h3>
                    <p className="text-white/90 leading-relaxed text-sm md:text-base max-w-md">
                      {f.description}
                    </p>

                    <div className="mt-4 md:mt-6 flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.25em] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                      <span>Explorer</span>
                      <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </div>
                  </div>
                </div>

                {/* Hover sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}