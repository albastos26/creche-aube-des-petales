import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
 
const menuItems = [
  { label: "Notre Univers", href: "#notre-univers" },
  { label: "Nos Valeurs", href: "#nos-valeurs" },
  { label: "Activités", href: "#activites" },
  { label: "Galerie", href: "#galerie" },
  { label: "Contact", href: "#contact" },
];
 
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
 
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
 
  const go = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };
 
  // On hero (not scrolled): cream/pink text on dark bg
  // After scroll: ink text on light glass bg
  const logoColor = scrolled ? "text-petal" : "text-cream";
  const linkColor = scrolled
    ? "text-ink hover:text-petal"
    : "text-petal-soft hover:text-cream";
  const menuBtnColor = scrolled ? "text-ink" : "text-cream";
 
  return (
    <>
      {/* Floating pill navbar */}
      <div className="fixed top-5 inset-x-0 z-50 flex justify-center px-5 md:px-10">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`w-full max-w-6xl transition-all duration-500 ${
            scrolled
              ? "rounded-2xl bg-white/75 backdrop-blur-2xl shadow-[0_8px_40px_-8px_rgba(44,62,80,0.18)] border border-white/60 py-3 px-6"
              : "rounded-2xl bg-white/8 backdrop-blur-md border border-cream/15 py-4 px-6"
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`font-display text-xl md:text-2xl font-bold tracking-tight transition-colors duration-500 outline-none ${logoColor}`}
            >
              L'Aube des Pétales
            </a>
 
            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-7">
              {menuItems.map((it, i) => (
                <motion.button
                  key={it.href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.2 }}
                  onClick={() => go(it.href)}
                  className={`story-link text-sm font-medium transition-colors duration-300 ${linkColor}`}
                >
                  {it.label}
                </motion.button>
              ))}
 
              {/* CTA button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => go("#contact")}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-500 ${
                  scrolled
                    ? "bg-gradient-petal text-white shadow-soft hover:shadow-glow"
                    : "bg-cream/15 text-cream border border-cream/30 backdrop-blur-sm hover:bg-cream/25"
                }`}
              >
                Nous contacter
              </motion.button>
            </div>
 
            {/* Mobile burger */}
            <button
              onClick={() => setOpen(!open)}
              className={`md:hidden p-1.5 transition-colors ${menuBtnColor}`}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </motion.nav>
      </div>
 
      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed top-24 inset-x-5 z-40 md:hidden rounded-2xl bg-white/85 backdrop-blur-2xl border border-white/60 shadow-[0_20px_60px_-12px_rgba(44,62,80,0.25)] overflow-hidden"
          >
            {/* Subtle gradient top stripe */}
            <div className="h-1 w-full bg-gradient-to-r from-petal via-sun to-mint opacity-80" />
 
            <div className="flex flex-col p-6 gap-1">
              {menuItems.map((it, i) => (
                <motion.button
                  key={it.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  onClick={() => go(it.href)}
                  className="text-left text-base font-medium text-ink hover:text-petal transition-colors py-3 px-2 rounded-xl hover:bg-petal/5 border-b border-ink/5 last:border-0"
                >
                  {it.label}
                </motion.button>
              ))}
 
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => go("#contact")}
                className="mt-3 w-full px-6 py-3 rounded-full text-white text-sm font-semibold bg-gradient-petal shadow-soft"
              >
                Nous contacter
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
