import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle, MessageCircle, User, Baby, Loader2 } from "lucide-react";
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
 
// ── Input field component ─────────────────────────────────────
function Field({
  label, id, type = "text", placeholder, icon: Icon, value, onChange, required = true,
}: {
  label: string; id: keyof FormData; type?: string; placeholder: string;
  icon: React.ElementType; value: string;
  onChange: (v: string) => void; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/60">
        {label}{required && <span className="text-petal ml-1">*</span>}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/35 pointer-events-none">
          <Icon className="w-4 h-4" />
        </div>
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-cream/6 border border-cream/12 text-cream placeholder:text-cream/30 text-sm outline-none focus:border-petal/60 focus:bg-cream/10 focus:ring-4 focus:ring-petal/10 transition-all duration-300"
        />
      </div>
    </div>
  );
}
 
// ── The custom form ───────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState<FormData>({ parentName: "", childName: "", phone: "", email: "" });
  const [status, setStatus] = useState<Status>("idle");
 
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
        className="flex flex-col items-center justify-center gap-6 py-16 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-mint/20 border border-mint/30 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-mint" />
        </div>
        <div>
          <h4 className="font-display text-2xl font-bold text-cream mb-2">Message envoyé !</h4>
          <p className="text-cream/60 text-sm max-w-xs">Nous vous contacterons dans les 24h. À très bientôt !</p>
        </div>
        <button
          onClick={() => setStatus("idle")}
          className="text-xs text-cream/45 hover:text-cream underline-offset-4 underline transition-colors"
        >
          Envoyer un autre message
        </button>
      </motion.div>
    );
  }
 
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-7 md:p-9">
      {/* Form header */}
      <div className="mb-1">
        <h3 className="font-display text-2xl md:text-3xl font-bold text-cream">Contactez-nous</h3>
        <p className="text-cream/50 text-sm mt-1">Remplissez le formulaire et nous vous rappelons.</p>
      </div>
 
      <Field label="Votre nom complet"       id="parentName" placeholder="Nom et Prénom"       icon={User}                   value={form.parentName} onChange={set("parentName")} />
      <Field label="Nom complet de l'enfant" id="childName"  placeholder="Nom et Prénom"       icon={Baby}                   value={form.childName}  onChange={set("childName")} />
      <Field label="Numéro de téléphone"     id="phone"      placeholder="Ex. : 0780 000 000"  icon={Phone} type="tel"       value={form.phone}      onChange={set("phone")} />
      <Field label="Votre email"             id="email"      placeholder="username@email.com"   icon={Mail}  type="email"     value={form.email}      onChange={set("email")} />
 
      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          Erreur d'envoi. Essayez WhatsApp ci-dessous.
        </motion.div>
      )}
 
      {/* Primary CTA — email submit */}
      <motion.button
        type="submit"
        disabled={status === "loading"}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-petal text-white font-semibold text-sm shadow-soft hover:shadow-glow transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Envoi en cours…</>
        ) : (
          <><Send className="w-4 h-4" /> Envoyer le message</>
        )}
      </motion.button>
 
      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-cream/10" />
        <span className="text-[10px] uppercase tracking-widest text-cream/35">ou</span>
        <div className="flex-1 h-px bg-cream/10" />
      </div>
 
      {/* Secondary CTA — WhatsApp */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] font-semibold text-sm hover:bg-[#25D366]/25 transition-all duration-300"
      >
        <MessageCircle className="w-4 h-4" />
        Écrire sur WhatsApp
      </motion.a>
      <p className="text-[10px] text-cream/30 text-center -mt-2">
        Vos informations du formulaire seront pré-remplies dans WhatsApp
      </p>
    </form>
  );
}
 
// ── Main section ──────────────────────────────────────────────
export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.07 });
 
  return (
    <section id="contact" ref={ref} className="relative py-28 md:py-40 bg-ink overflow-hidden">
      {/* Background blobs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-petal/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-lavender/10 blur-[100px] pointer-events-none" />
 
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
 
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="mb-20"
        >
          <span className="inline-block mb-5 text-xs uppercase tracking-[0.3em] text-petal font-semibold">
            05 — Contact
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-cream leading-[0.95] tracking-tight max-w-xl">
              Parlons de votre{" "}
              <span className="italic text-petal-soft">enfant.</span>
            </h2>
            <p className="text-base md:text-lg text-cream/60 max-w-sm leading-relaxed lg:text-right">
              Nous serions ravis de vous accueillir et de répondre à toutes vos questions.
            </p>
          </div>
          <div className="mt-10 h-px bg-cream/10" />
        </motion.div>
 
        {/* Info cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {infoCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i + 0.3 }}
              whileHover={{ y: -4 }}
              className={`group relative rounded-2xl border border-cream/10 bg-cream/5 backdrop-blur-sm p-5 flex flex-col gap-4 transition-all duration-500 hover:shadow-[0_0_30px_-4px] ${card.glow}`}
            >
              <div className={`w-11 h-11 rounded-xl ${card.accent} flex items-center justify-center shadow-soft`}>
                <card.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-cream/45 mb-1">{card.title}</p>
                <p className="text-sm font-semibold text-cream leading-snug">{card.content}</p>
                <p className="text-[11px] text-cream/50 mt-0.5">{card.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
 
        {/* Form + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
 
          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3 rounded-3xl overflow-hidden border border-cream/10 bg-ink-soft shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
          >
            <ContactForm />
          </motion.div>
 
          {/* Editorial sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 flex flex-col gap-8"
          >
            <div className="relative pl-6 border-l-2 border-petal">
              <p className="font-display text-2xl md:text-3xl text-cream italic leading-snug">
                "Chaque enfant mérite un espace où il peut fleurir à son propre rythme."
              </p>
              <p className="mt-4 text-sm text-cream/50 not-italic font-medium">
                l'Aube des Pétales
              </p>
            </div>
 
            <div className="h-px bg-cream/10" />
 
            <div className="flex flex-col gap-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-cream/45 font-semibold">Comment ça marche</p>
              {[
                { n: "01", t: "Remplissez le formulaire", d: "Partagez votre adresse et vos questions." },
                { n: "02", t: "Nous vous rappelons",      d: "Sous 24h pour planifier une visite." },
                { n: "03", t: "Venez nous rencontrer",    d: "Découvrez nos espaces." },
              ].map((step) => (
                <div key={step.n} className="flex items-start gap-4">
                  <span className="font-display text-3xl text-cream/15 font-bold leading-none flex-shrink-0 w-10">{step.n}</span>
                  <div>
                    <p className="text-sm font-semibold text-cream">{step.t}</p>
                    <p className="text-xs text-cream/50 mt-0.5 leading-relaxed">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
 
            <div className="h-px bg-cream/10" />
 
            <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-cream/5 border border-cream/10">
              <div className="flex -space-x-2">
                {["bg-petal","bg-mint","bg-sun","bg-lavender"].map((c,i)=>(
                  <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-ink`}/>
                ))}
              </div>
              <p className="text-xs text-cream/70 leading-snug">
                <span className="text-cream font-semibold">10+ familles</span> nous font déjà confiance
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
