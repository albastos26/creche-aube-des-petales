import { motion, useInView, useAnimation, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle, MessageCircle, User, Baby, Loader2, ArrowRight, Sparkles, Heart, Zap, Star, ChevronRight, Waves, Flower2, Feather } from "lucide-react";
import emailjs from "@emailjs/browser";

// ─────────────────────────────────────────────────────────────
//  ⚙️  CONFIG
// ─────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "service_39rrvx4";
const EMAILJS_TEMPLATE_ID = "template_mqyg2ng";
const EMAILJS_PUBLIC_KEY  = "ocwXb17pnHpQIA-Ik";
const WHATSAPP_NUMBER     = "250787026169";
// ─────────────────────────────────────────────────────────────

const infoCards = [
  { icon: MapPin,  title: "Adresse",  content: "Nyamata, Rwanda",               sub: "Venez nous rendre visite",  accent: "bg-petal",   glow: "group-hover:shadow-petal/30"   },
  { icon: Phone,   title: "Téléphone",content: "+250 787 026 169",              sub: "Lun – Ven · 8h00 – 17h",   accent: "bg-mint",    glow: "group-hover:shadow-mint/30"    },
  { icon: Mail,    title: "Email",     content: "aubedespetales@gmail.com",    sub: "Réponse rapide",          accent: "bg-lavender",glow: "group-hover:shadow-lavender/30"},
  { icon: Clock,   title: "Horaires", content: "Lun – Ven · 8h00 – 17h",       sub: "Accueil toute l'année",     accent: "bg-sun",     glow: "group-hover:shadow-sun/30"     },
];

type Status = "idle" | "loading" | "success" | "error";

interface FormData {
  parentName: string;
  childName: string;
  phone: string;
  email: string;
}

// ── Magnetic Button Component ─────────────────────────────────────
function MagneticButton({ children, className, ...props }: any) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// ── 3D Card Component ───────────────────────────────────────────────
function ThreeDCard({ children, className, ...props }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    rotateY.set(mouseX / 20);
    rotateX.set(-mouseY / 20);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ 
        rotateX, 
        rotateY,
        transformStyle: "preserve-3d"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ── Floating Particles Background ───────────────────────────────────
function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.id % 4 === 0 ? 'var(--color-petal)' : 
                           particle.id % 4 === 1 ? 'var(--color-mint)' :
                           particle.id % 4 === 2 ? 'var(--color-sun)' : 'var(--color-lavender)',
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

// ── Premium Input Field Component ───────────────────────────────────
function PremiumField({
  label, id, type = "text", placeholder, icon: Icon, value, onChange, required = true,
}: {
  label: string; id: keyof FormData; type?: string; placeholder: string;
  icon: React.ElementType; value: string;
  onChange: (v: string) => void; required?: boolean;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    setIsFilled(value.length > 0);
  }, [value]);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/60 flex items-center gap-2">
        {label}{required && <span className="text-petal ml-1">*</span>}
        {isFilled && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-mint"><CheckCircle2 className="w-3 h-3" /></motion.span>}
      </label>
      <div className="relative group">
        <motion.div 
          className={`absolute -inset-0.5 rounded-xl bg-gradient-to-r ${isFocused ? 'from-petal via-sun to-mint' : 'from-cream/10 to-cream/5'} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`}
          animate={{ opacity: isFocused ? 1 : 0 }}
        />
        <div className="relative">
          <motion.div 
            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${isFocused ? 'text-petal' : 'text-cream/35'}`}
            animate={{ scale: isFocused ? 1.1 : 1 }}
          >
            <Icon className="w-4 h-4" />
          </motion.div>
          <input
            id={id}
            name={id}
            type={type}
            required={required}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full pl-11 pr-4 py-4 rounded-xl bg-ink/80 border border-cream/12 text-cream placeholder:text-cream/30 text-sm outline-none focus:border-petal/60 focus:bg-ink/90 transition-all duration-300 backdrop-blur-sm"
          />
        </div>
      </div>
    </div>
  );
}

// ── Premium Contact Form ───────────────────────────────────────────
function PremiumContactForm() {
  const [form, setForm] = useState<FormData>({ parentName: "", childName: "", phone: "", email: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [currentField, setCurrentField] = useState(0);

  const set = (key: keyof FormData) => (v: string) => setForm((f) => ({ ...f, [key]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          parent_name: form.parentName,
          child_name:  form.childName,
          phone:       form.phone,
          email:       form.email,
          reply_to:    form.email,
          time:        new Date().toLocaleString("fr-FR", {
            dateStyle: "long",
            timeStyle: "short",
          }),
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setStatus("success");
      setForm({ parentName: "", childName: "", phone: "", email: "" });
    } catch {
      setStatus("error");
    }
  };

  const whatsappText = encodeURIComponent(
    `Bonjour ! Je souhaite inscrire mon enfant à l'Aube des Pétales.\n\n👤 Parent : ${form.parentName || "…"}\n👶 Enfant : ${form.childName || "…"}\n📞 Tél : ${form.phone || "…"}\n📧 Email : ${form.email || "…"}`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`;

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-6 py-16 text-center relative"
      >
        <motion.div 
          className="relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-mint/20 rounded-full blur-xl animate-pulse" />
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-mint to-sky border-2 border-mint/30 flex items-center justify-center shadow-2xl">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
        </motion.div>
        <div className="space-y-3">
          <motion.h4 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-3xl font-bold text-cream"
          >
            Message envoyé ! 🎉
          </motion.h4>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-cream/60 text-sm max-w-xs"
          >
            Nous vous remercions pour votre confiance. Nous vous contacterons dans les 24h. À très bientôt !
          </motion.p>
        </div>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={() => setStatus("idle")}
          className="mt-4 text-xs text-cream/45 hover:text-cream underline-offset-4 underline transition-colors flex items-center gap-2"
        >
          <ArrowRight className="w-3 h-3" />
          Envoyer un autre message
        </motion.button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:gap-6 p-6 md:p-8 lg:p-10 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-16 -right-16 w-32 h-32 md:w-40 md:h-40 bg-petal/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -bottom-16 -left-16 w-32 h-32 md:w-40 md:h-40 bg-mint/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 4 }}
        />
      </div>

      {/* Form header */}
      <div className="mb-1 md:mb-2 relative">
        <motion.div 
          className="flex items-center gap-3 mb-3 md:mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-petal flex items-center justify-center">
            <Mail className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <div>
            <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-cream">Contactez-nous</h3>
            <p className="text-cream/50 text-xs md:text-sm mt-0.5">Remplissez le formulaire et nous vous rappelons</p>
          </div>
        </motion.div>
      </div>

      <PremiumField label="Votre nom complet"       id="parentName" placeholder="Nom et Prénom"       icon={User}                   value={form.parentName} onChange={set("parentName")} />
      <PremiumField label="Nom complet de l'enfant" id="childName"  placeholder="Nom et Prénom"       icon={Baby}                   value={form.childName}  onChange={set("childName")} />
      <PremiumField label="Numéro de téléphone"     id="phone"      placeholder="Ex. : 0780 000 000"  icon={Phone} type="tel"       value={form.phone}      onChange={set("phone")} />
      <PremiumField label="Votre email"             id="email"      placeholder="username@email.com"   icon={Mail}  type="email"     value={form.email}      onChange={set("email")} />

      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs md:text-sm"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            Erreur d'envoi. Essayez WhatsApp ci-dessous.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary CTA — email submit */}
      <MagneticButton
        type="submit"
        disabled={status === "loading"}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="w-full relative group overflow-hidden rounded-xl md:rounded-2xl bg-gradient-petal text-white font-semibold text-xs md:text-sm shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        <div className="relative flex items-center justify-center gap-3 py-3 md:py-4">
          {status === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Envoi en cours…</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Envoyer le message</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </div>
      </MagneticButton>

      {/* Divider */}
      <div className="flex items-center gap-4 relative">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cream/20 to-transparent" />
        <span className="text-[10px] uppercase tracking-widest text-cream/35 font-medium">ou</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cream/20 to-transparent" />
      </div>

      {/* Secondary CTA — WhatsApp */}
      <MagneticButton
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        as="a"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="w-full relative group overflow-hidden rounded-xl md:rounded-2xl bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] font-semibold text-xs md:text-sm hover:bg-[#25D366]/25 transition-all duration-300"
      >
        <div className="relative flex items-center justify-center gap-3 py-3 md:py-4">
          <MessageCircle className="w-4 h-4" />
          <span>Écrire sur WhatsApp</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </MagneticButton>
      <p className="text-[9px] md:text-[10px] text-cream/30 text-center -mt-2">
        Vos informations du formulaire seront pré-remplies dans WhatsApp
      </p>
    </form>
  );
}

// ── Premium Info Card ─────────────────────────────────────────────
function PremiumInfoCard({ card, index }: { card: typeof infoCards[0]; index: number }) {
  return (
    <ThreeDCard
      initial={{ opacity: 0, y: 30 }}
      whileHover={{ y: -8 }}
      className={`group relative rounded-2xl border border-cream/10 bg-ink/50 backdrop-blur-md p-6 flex flex-col gap-4 transition-all duration-500 hover:shadow-[0_0_40px_-4px] ${card.glow} overflow-hidden`}
    >
      {/* Hover effect background */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-br ${card.accent}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />
      
      {/* Content */}
      <div className="relative">
        <motion.div 
          className={`w-12 h-12 rounded-xl ${card.accent} flex items-center justify-center shadow-lg`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <card.icon className="w-6 h-6 text-white" />
        </motion.div>
        <div className="mt-4">
          <p className="text-[10px] uppercase tracking-[0.25em] text-cream/45 mb-1 font-medium">{card.title}</p>
          <p className="text-sm font-semibold text-cream leading-snug">{card.content}</p>
          <p className="text-[11px] text-cream/50 mt-0.5">{card.sub}</p>
        </div>
      </div>

      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-3xl" />
    </ThreeDCard>
  );
}

// ── Main Premium Contact Section ───────────────────────────────────
export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.07 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section id="contact" ref={ref} className="relative py-20 md:py-32 lg:py-48 bg-ink overflow-hidden">
      {/* Premium background */}
      <div className="absolute inset-0">
        <FloatingParticles />
        <div className="absolute -top-40 -left-40 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full bg-petal/10 blur-[80px] md:blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-[350px] md:w-[500px] h-[350px] md:h-[500px] rounded-full bg-lavender/10 blur-[70px] md:blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] rounded-full bg-mint/5 blur-[120px] md:blur-[150px] pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">

        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="mb-16 md:mb-24"
        >
          <motion.div 
            className="flex items-center gap-3 mb-4 md:mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-petal flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
            </div>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-petal font-semibold">
              05 — Contact
            </span>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 md:gap-8">
            <div className="max-w-full lg:max-w-2xl">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="font-display text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold text-cream leading-[0.95] tracking-tight"
              >
                Parlons de votre{" "}
                <span className="italic text-petal-soft relative">
                  enfant.
                  <motion.div 
                    className="absolute -bottom-2 left-0 w-full h-2 md:h-3 bg-petal/30 rounded-full"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "100%" } : {}}
                    transition={{ delay: 0.8, duration: 1 }}
                  />
                </span>
              </motion.h2>
            </div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="text-sm md:text-base lg:text-lg text-cream/60 max-w-sm leading-relaxed lg:text-right"
            >
              Nous serions ravis de vous accueillir et de répondre à toutes vos questions.
            </motion.p>
          </div>
          
          <motion.div 
            className="mt-8 md:mt-12 h-px bg-gradient-to-r from-cream/20 via-cream/40 to-cream/20"
            initial={{ width: 0 }}
            animate={isInView ? { width: "100%" } : {}}
            transition={{ delay: 0.7, duration: 1 }}
          />
        </motion.div>

        {/* Premium Info Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mb-12 md:mb-20">
          {infoCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i + 0.4 }}
            >
              <PremiumInfoCard card={card} index={i} />
            </motion.div>
          ))}
        </div>

        {/* Form + Premium Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 lg:gap-20 items-start">

          {/* Premium Form Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3 relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-petal via-sun to-mint rounded-2xl md:rounded-3xl blur opacity-20" />
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-cream/10 bg-ink/80 backdrop-blur-xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
              <PremiumContactForm />
            </div>
          </motion.div>

          {/* Premium Editorial Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 flex flex-col gap-6 md:gap-10"
          >
            {/* Quote Section */}
            <div className="relative pl-6 md:pl-8 border-l-2 border-gradient-to-b from-petal to-mint">
              <motion.div 
                className="absolute top-0 left-0 w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-petal flex items-center justify-center -translate-x-1/2"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Heart className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
              </motion.div>
              <p className="font-display text-xl md:text-2xl lg:text-3xl text-cream italic leading-snug">
                "Chaque enfant mérite un espace où il peut fleurir à son propre rythme."
              </p>
              <p className="mt-4 md:mt-6 text-xs md:text-sm text-cream/50 not-italic font-medium flex items-center gap-2">
                <Flower2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-petal" />
                l'Aube des Pétales
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-cream/20 to-transparent" />

            {/* How it works */}
            <div className="flex flex-col gap-4 md:gap-6">
              <motion.div 
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.8 }}
              >
                <Zap className="w-4 h-4 md:w-5 md:h-5 text-sun" />
                <p className="text-[10px] uppercase tracking-[0.3em] text-cream/45 font-semibold">Comment ça marche</p>
              </motion.div>
              
              {[
                { n: "01", t: "Remplissez le formulaire", d: "Partagez votre adresse et vos questions.", icon: User },
                { n: "02", t: "Nous vous rappelons",      d: "Sous 24h pour planifier une visite.", icon: Phone },
                { n: "03", t: "Venez nous rencontrer",    d: "Découvrez nos espaces.", icon: Star },
              ].map((step, i) => (
                <motion.div 
                  key={step.n} 
                  className="flex items-start gap-3 md:gap-4 group"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.9 + i * 0.1 }}
                >
                  <div className="relative">
                    <span className="font-display text-2xl md:text-3xl text-cream/15 font-bold leading-none flex-shrink-0 w-10 md:w-12 group-hover:text-petal/30 transition-colors">
                      {step.n}
                    </span>
                    <motion.div 
                      className="absolute inset-0 bg-petal/10 rounded-lg -z-10"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs md:text-sm font-semibold text-cream flex items-center gap-2">
                      {step.t}
                      <step.icon className="w-2.5 h-2.5 md:w-3 md:h-3 text-petal opacity-0 group-hover:opacity-100 transition-opacity" />
                    </p>
                    <p className="text-[10px] md:text-xs text-cream/50 mt-0.5 leading-relaxed">{step.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="h-px bg-gradient-to-r from-cream/20 to-transparent" />

            {/* Trust Badge */}
            <motion.div 
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2 }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-petal via-sun to-mint rounded-xl md:rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="relative flex items-center gap-3 md:gap-4 px-4 md:px-6 py-4 md:py-5 rounded-xl md:rounded-2xl bg-ink/50 backdrop-blur border border-cream/10">
                <div className="flex -space-x-2 md:-space-x-3">
                  {["bg-petal","bg-mint","bg-sun","bg-lavender"].map((c,i)=>(
                    <motion.div 
                      key={i} 
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${c} border-2 border-ink flex items-center justify-center text-cream/70 text-[10px] md:text-xs font-bold`}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      {i + 1}
                    </motion.div>
                  ))}
                </div>
                <div className="flex-1">
                  <p className="text-xs md:text-sm text-cream leading-snug">
                    <span className="text-petal font-bold">10+ familles</span> nous font déjà confiance
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 md:w-3 md:h-3 text-sun fill-sun" />
                    ))}
                  </div>
                </div>
                <motion.div 
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-petal flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Feather className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}