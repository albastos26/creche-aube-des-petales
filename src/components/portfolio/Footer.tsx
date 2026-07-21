import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Heart, Instagram, Mail, Facebook, Twitter, MapPin, Phone, Clock, ArrowUpRight, Sparkles, Flower2, Waves, ChevronUp, Star, Feather, Zap } from "lucide-react";

// ── Magnetic Link Component ─────────────────────────────────────
function MagneticLink({ children, className, ...props }: any) {
  const ref = useRef<HTMLAnchorElement>(null);
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
    <motion.a
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      {...props}
    >
      {children}
    </motion.a>
  );
}

// ── Floating Flower Petals ───────────────────────────────────────
function FloatingPetals() {
  const petals = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 20 + 10,
    duration: Math.random() * 15 + 15,
    delay: Math.random() * 5,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute opacity-10"
          style={{
            left: `${petal.x}%`,
            top: `${petal.y}%`,
            width: petal.size,
            height: petal.size,
            background: petal.id % 3 === 0 ? 'var(--color-petal)' : 
                       petal.id % 3 === 1 ? 'var(--color-mint)' : 'var(--color-sun)',
            borderRadius: '50% 0 50% 50%',
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, 20, 0],
            rotate: [petal.rotation, petal.rotation + 180, petal.rotation + 360],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

// ── Social Icon Component ───────────────────────────────────────
function SocialIcon({ Icon, href, label }: { Icon: React.ElementType; href: string; label: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <MagneticLink
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
      aria-label={label}
    >
      <motion.div
        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center overflow-hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${isHovered ? 'from-petal to-sun' : 'from-transparent to-transparent'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <Icon className={`w-4 h-4 md:w-5 md:h-5 relative z-10 transition-colors ${isHovered ? 'text-white' : 'text-white/70'}`} />
      </motion.div>
      <motion.div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] text-white/90 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
        initial={{ y: 5 }}
        animate={{ y: isHovered ? 0 : 5 }}
      >
        {label}
      </motion.div>
    </MagneticLink>
  );
}

// ── Premium Footer Link ───────────────────────────────────────────
function FooterLink({ label, href, onClick }: { label: string; href: string; onClick?: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group inline-block"
    >
      <span className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-2">
        {label}
        <ArrowUpRight className={`w-3 h-3 transition-transform ${isHovered ? 'translate-x-1 -translate-y-1' : ''}`} />
      </span>
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-petal to-sun"
        initial={{ width: 0 }}
        animate={{ width: isHovered ? "100%" : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
}

// ── Scroll to Top Button ───────────────────────────────────────────
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-6 md:bottom-8 right-6 md:right-8 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-petal text-white shadow-lg hover:shadow-xl flex items-center justify-center backdrop-blur-md border border-white/20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronUp className="w-5 h-5 md:w-6 md:h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ── Premium Main Footer ───────────────────────────────────────────
export function Footer() {
  const year = new Date().getFullYear();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  const go = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const footerLinks = [
    { label: "Notre Univers", href: "#notre-univers" },
    { label: "Nos Valeurs", href: "#nos-valeurs" },
    { label: "Activités", href: "#activites" },
    { label: "Galerie", href: "#galerie" },
    { label: "Contact", href: "#contact" },
  ];

  const contactInfo = [
    { icon: MapPin, text: "Nyamata, Rwanda" },
    { icon: Phone, text: "+250 787 026 169" },
    { icon: Mail, text: "aubedespetales@gmail.com" },
    { icon: Clock, text: "Lun – Ven · 8h – 17h" },
  ];

  return (
    <>
      <ScrollToTop />
      <footer ref={ref} className="relative bg-ink text-white overflow-hidden">
        {/* Premium Background */}
        <div className="absolute inset-0">
          <FloatingPetals />
          <div className="absolute top-0 left-0 w-96 h-96 bg-petal/20 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-mint/15 rounded-full blur-3xl animate-blob" style={{ animationDelay: "4s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sun/5 rounded-full blur-3xl animate-blob" style={{ animationDelay: "8s" }} />
        </div>

        {/* Peekaboo Title */}
        <div className="relative h-24 md:h-32 overflow-hidden">
          <motion.span
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute bottom-[-1.5rem] left-1/2 -translate-x-1/2 whitespace-nowrap font-display font-black leading-none pointer-events-none select-none"
            style={{ fontSize: "clamp(40px, 8vw, 120px)", color: "rgba(255,255,255,0.06)", letterSpacing: "-2px" }}
          >
            L'Aube des Pétales
          </motion.span>
        </div>

        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10 pb-16 md:pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
            
            {/* Brand Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4 md:space-y-6"
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-petal flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Flower2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-white">L'Aube des Pétales</h3>
                  <p className="text-[10px] md:text-xs text-sun uppercase tracking-wider">Crèche bienveillante</p>
                </div>
              </div>
              
              <p className="text-white/70 leading-relaxed max-w-sm text-sm md:text-base">
                Un lieu d'éveil, de bienveillance et de joie où chaque enfant grandit en confiance.
              </p>
              
              <div className="flex items-center gap-2 pt-2 md:pt-4">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <Star className="w-3.5 h-3.5 md:w-4 md:w-4 fill-sun text-sun" />
                  </motion.div>
                ))}
              </div>
              
              <div className="flex gap-3 pt-2 md:pt-4">
                <SocialIcon Icon={Instagram} href="https://www.instagram.com/lespetitspetales" label="Instagram" />
                <SocialIcon Icon={Mail} href="mailto:aubedespetales@gmail.com" label="Email" />
              </div>
            </motion.div>

            {/* Quick Links Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 md:space-y-6"
            >
              <div className="flex items-center gap-2 md:gap-3">
                <Zap className="w-4 h-4 md:w-5 md:h-5 text-petal" />
                <h4 className="font-display text-base md:text-lg font-bold">Liens rapides</h4>
              </div>
              <ul className="space-y-3 md:space-y-4">
                {footerLinks.map((l) => (
                  <li key={l.href}>
                    <FooterLink label={l.label} href={l.href} onClick={() => go(l.href)} />
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4 md:space-y-6"
            >
              <div className="flex items-center gap-2 md:gap-3">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-mint" />
                <h4 className="font-display text-base md:text-lg font-bold">Nous contacter</h4>
              </div>
              <ul className="space-y-3 md:space-y-4 text-white/70 text-xs md:text-sm">
                {contactInfo.map((info, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <motion.div 
                      className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-petal transition-colors duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <info.icon className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
                    </motion.div>
                    <span className="group-hover:text-white transition-colors">{info.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4 md:space-y-6"
            >
              <div className="flex items-center gap-2 md:gap-3">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-sun" />
                <h4 className="font-display text-base md:text-lg font-bold">Restez informé</h4>
              </div>
              <p className="text-white/70 text-xs md:text-sm leading-relaxed">
                Recevez nos actualités et conseils pour le bien-être de vos enfants.
              </p>
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-xs md:text-sm outline-none focus:border-petal/60 focus:bg-white/15 transition-all duration-300 backdrop-blur-sm"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gradient-petal flex items-center justify-center"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                  </motion.button>
                </div>
                <p className="text-[9px] md:text-[10px] text-white/40">
                  En vous inscrivant, vous acceptez notre politique de confidentialité.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Premium Bottom Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="border-t border-white/10 pt-6 md:pt-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-white/50">
              <p>© {year} L'Aube des Pétales. A product of Bastos Dev</p>
              <p className="flex items-center gap-2">
                Créé avec <Heart className="w-3 h-3 md:w-4 md:h-4 text-petal fill-petal" /> pour nos petits explorateurs
              </p>
            </div>
          </motion.div>

          {/* Decorative Wave */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-petal via-sun to-mint opacity-50"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
          />
        </div>
      </footer>
    </>
  );
}