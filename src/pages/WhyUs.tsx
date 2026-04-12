import { motion } from "motion/react";
import { 
  CheckCircle2, 
  Shield, 
  Zap, 
  TrendingUp, 
  Users, 
  Cpu, 
  Mountain, 
  Lock, 
  Server, 
  Code2, 
  Smartphone, 
  Search, 
  Workflow, 
  MessageSquare, 
  XCircle,
  Clock,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const badges = [
  { label: "DSGVO Ready", icon: <Lock size={14} /> },
  { label: "Performance Optimized", icon: <Zap size={14} /> },
  { label: "AI-Enabled", icon: <Cpu size={14} /> },
  { label: "Automation Ready", icon: <Workflow size={14} /> },
];

const miniStats = [
  { label: "Ladezeit", value: "< 2s" },
  { label: "Responsive", value: "100%" },
  { label: "Entwicklung", value: "Individuell" },
];

export default function WhyUs() {
  return (
    <div className="pt-20 min-h-screen bg-[#F8FAF7]">
      {/* Section 1: Intro */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold mb-8"
          >
            <Mountain size={20} />
            <span>Der Bergsites-Standard</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-display font-black mb-8 tracking-tighter"
          >
            Warum <span className="text-primary">Bergsites?</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12"
          >
            Es gibt viele Agenturen. Aber es gibt nur ein Bergsites. Wir verbinden technische Exzellenz mit lokalem Vertrauen und zukunftsweisender Automatisierung.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <Button nativeButton={false} render={<Link to="/admindashboard" />} size="lg" variant="outline" className="rounded-full px-8 border-primary/20 hover:bg-primary/5 text-primary font-bold">
              Admin Dashboard (Temporär)
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {badges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-muted text-sm font-bold">
                <span className="text-primary">{badge.icon}</span>
                {badge.label}
              </div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {miniStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                className="p-6 bg-white rounded-3xl shadow-sm border border-muted"
              >
                <div className="text-3xl font-black text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-bold uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Trust (DSGVO etc.) */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="p-3 bg-primary/10 rounded-2xl w-fit text-primary mb-6">
                <Shield size={32} />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Vertrauen & Rechtssicherheit</h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                In Deutschland ist Vertrauen die wichtigste Währung. Wir entwickeln Websites unter strikter Berücksichtigung der DSGVO – inklusive sauberer Cookie-Lösungen und transparenter Datenverarbeitung.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: <Lock size={18} />, text: "DSGVO-konforme Umsetzung" },
                  { icon: <Server size={18} />, text: "Hosting in Deutschland / EU" },
                  { icon: <CheckCircle2 size={18} />, text: "Cookie-Consent integriert" },
                  { icon: <Shield size={18} />, text: "Rechtssichere Dokumente" },
                  { icon: <Users size={18} />, text: "Kanzlei-Zusammenarbeit" },
                  { icon: <CheckCircle2 size={18} />, text: "Keine unsicheren Drittanbieter" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 font-medium">
                    <span className="text-primary">{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="relative">
              <div className="aspect-video bg-muted rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://picsum.photos/seed/security/800/600" 
                  alt="Security and Trust" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 glass-card p-6 rounded-2xl shadow-xl max-w-[240px]">
                <p className="text-sm font-bold italic">"Wir bauen nicht nur schön, sondern vor allem sicher und gesetzeskonform."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Technik */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-reveal">Technische Exzellenz</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Wir sind keine Baukasten-Entwickler. Wir bauen durchdachte, skalierbare Lösungen ohne unnötigen Ballast.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Zap />, title: "Core Web Vitals", desc: "Blitzschnelle Ladezeiten für besseres Ranking." },
              { icon: <Smartphone />, title: "Mobile First", desc: "Perfekte Darstellung auf jedem Endgerät." },
              { icon: <Code2 />, title: "Clean Code", desc: "Kein Müll, nur sauberer und skalierbarer Code." },
              { icon: <Search />, title: "SEO-Basics", desc: "Direkt integriert für maximale Sichtbarkeit." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-white rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-muted"
              >
                <div className="text-primary mb-6">{item.icon}</div>
                <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Automatisierung & AI (USP) */}
      <section className="py-24 px-6 bg-foreground text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -right-1/4 w-full h-full border-[100px] border-primary rounded-full blur-[100px]"
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="aspect-square bg-white/5 rounded-[4rem] border border-white/10 p-12 flex items-center justify-center relative">
                <div className="grid grid-cols-2 gap-8">
                  <div className="p-8 bg-primary/20 rounded-3xl border border-primary/30 text-center">
                    <Workflow size={40} className="mx-auto mb-4 text-primary" />
                    <div className="font-bold">Workflows</div>
                  </div>
                  <div className="p-8 bg-accent/20 rounded-3xl border border-accent/30 text-center">
                    <Cpu size={40} className="mx-auto mb-4 text-accent" />
                    <div className="font-bold">AI Integration</div>
                  </div>
                  <div className="p-8 bg-white/10 rounded-3xl border border-white/20 text-center">
                    <MessageSquare size={40} className="mx-auto mb-4" />
                    <div className="font-bold">Chatbots</div>
                  </div>
                  <div className="p-8 bg-white/10 rounded-3xl border border-white/20 text-center">
                    <BarChart3 size={40} className="mx-auto mb-4" />
                    <div className="font-bold">Analytics</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-foreground via-transparent to-transparent" />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary font-bold mb-8">
                <Zap size={20} />
                <span>Unser Alleinstellungsmerkmal</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Wir bauen nicht nur Websites – wir automatisieren Ihr Business.</h2>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                Der größte Hebel für KMUs liegt heute in der Digitalisierung von Prozessen. Wir integrieren KI und Automatisierung direkt in Ihren Workflow.
              </p>
              <ul className="space-y-6">
                {[
                  "n8n Automatisierungen für komplexe Ketten",
                  "Nahtlose API-Verbindungen Ihrer Tools",
                  "Automatische Lead-Verarbeitung & CRM-Sync",
                  "KI-gestützte Anfrage-Vorqualifizierung"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-lg font-medium">
                    <div className="bg-primary/20 p-1 rounded-full">
                      <CheckCircle2 className="text-primary" size={20} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Zusammenarbeit (Lokal) */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Lokal & Persönlich</h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Als lokales Unternehmen setzen wir auf direkte Kommunikation und kurze Wege. Bei uns gibt es kein anonymes Agency-Feeling, sondern feste Ansprechpartner.
              </p>
              <div className="space-y-6">
                {[
                  { title: "Direkte Kommunikation", desc: "Keine Umwege, keine Warteschleifen." },
                  { title: "Persönliche Betreuung", desc: "Wir denken aktiv für Ihr Unternehmen mit." },
                  { title: "Verlässlichkeit", desc: "Wir sind erreichbar, wenn Sie uns brauchen." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-6 bg-muted/30 rounded-2xl border border-muted">
                    <div className="bg-primary/10 p-2 rounded-xl h-fit">
                      <Users className="text-primary" size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-muted rounded-[4rem] overflow-hidden">
                <img 
                  src="https://picsum.photos/seed/local-biz/800/800" 
                  alt="Local Collaboration" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Ergebnisse */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ergebnis-Fokus</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Unser Ziel ist nicht nur eine schöne Website – sondern eine, die Anfragen generiert und Ihr Unternehmen wirtschaftlich voranbringt.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <TrendingUp />, title: "Lead-Fokus", desc: "Wir optimieren alles auf Kundenanfragen." },
              { icon: <BarChart3 />, title: "Conversion", desc: "Besucher werden zu zahlenden Kunden." },
              { icon: <Euro />, title: "Wirtschaftlichkeit", desc: "Digitalisierung, die sich bezahlt macht." },
            ].map((item, i) => (
              <div key={i} className="p-10 bg-white rounded-[3rem] shadow-sm border border-muted text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                  {item.icon}
                </div>
                <h4 className="text-2xl font-bold mb-4">{item.title}</h4>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: Was wir NICHT sind */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto bg-red-50 rounded-[3rem] p-12 md:p-20 border border-red-100">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-red-900">Was wir <span className="text-red-600">NICHT</span> sind</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {[
              "Kein Baukasten-System",
              "Keine 0815 Templates",
              "Keine langsamen Prozesse",
              "Kein Overengineering",
              "Keine versteckten Kosten",
              "Keine anonyme Massenabfertigung"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 text-lg font-bold text-red-800">
                <XCircle className="text-red-500 shrink-0" size={24} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: CTA */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-primary rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent opacity-50" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Bereit für den digitalen Aufstieg?</h2>
            <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto leading-relaxed">
              Lassen Sie uns in einem kostenlosen Erstgespräch analysieren, wie wir Ihr Unternehmen durch Design und Automatisierung stärken können.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button nativeButton={false} render={<Link to="/kontakt" />} size="lg" variant="secondary" className="rounded-full px-12 text-xl h-16 shadow-xl">
                Kostenlose Beratung sichern
              </Button>
              <Button nativeButton={false} render={<Link to="/selbstcheck" />} size="lg" variant="outline" className="rounded-full px-12 text-xl h-16 border-white/30 hover:bg-white/10">
                Potenzial-Check
              </Button>
            </div>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-80">
              <div className="flex items-center justify-center gap-2 text-sm font-bold">
                <Clock size={16} /> Schnelle Umsetzung
              </div>
              <div className="flex items-center justify-center gap-2 text-sm font-bold">
                <CheckCircle2 size={16} /> Feste Timelines
              </div>
              <div className="flex items-center justify-center gap-2 text-sm font-bold">
                <Shield size={16} /> Support nach Launch
              </div>
              <div className="flex items-center justify-center gap-2 text-sm font-bold">
                <RefreshCw size={16} /> Langfristige Wartung
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Helper for missing icon
function Euro({ size = 24 }: { size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M4 10h12" />
      <path d="M4 14h9" />
      <path d="M19 12a7 7 0 1 0-13.6 3.6" />
    </svg>
  );
}

function RefreshCw({ size = 24 }: { size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}
