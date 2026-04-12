import { motion } from "motion/react";
import { Cpu, MessageSquare, Brain, Sparkles, Zap, Bot, Network, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const aiFeatures = [
  {
    title: "Intelligente Chatbots",
    desc: "24/7 Kundensupport, der wirklich versteht und hilft. Wir integrieren modernste LLMs direkt in Ihre Website.",
    icon: <MessageSquare size={32} />
  },
  {
    title: "Automatisierte Workflows",
    desc: "Wir verbinden Ihre Tools und lassen KI die Arbeit erledigen. Von der Datenerfassung bis zur E-Mail-Antwort.",
    icon: <Network size={32} />
  },
  {
    title: "Daten-Analyse",
    desc: "KI-gestützte Auswertung Ihrer Unternehmensdaten für bessere Entscheidungen und tiefere Einblicke.",
    icon: <BarChart3 size={32} />
  },
  {
    title: "Content-Generierung",
    desc: "Automatisierte Erstellung von Texten, Bildern und Berichten – perfekt abgestimmt auf Ihre Brand Voice.",
    icon: <Sparkles size={32} />
  }
];

export default function AIIntegration() {
  return (
    <div className="dark-matter min-h-screen pt-20 text-foreground overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary/40 blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-accent/30 blur-[150px] rounded-full"
        />
      </div>

      {/* Hero */}
      <section className="relative py-32 px-6 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary font-bold mb-8 animate-pulse-purple"
          >
            <Brain size={20} />
            <span>The Future of Business</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-display font-black mb-8 tracking-tighter"
          >
            AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Integration</span>
          </motion.h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Wir machen Ihr Unternehmen intelligent. Durch die nahtlose Integration von Künstlicher Intelligenz in Ihre bestehenden Prozesse schaffen wir Effizienz, die bisher unvorstellbar war.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          {aiFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-10 rounded-[3rem] bg-card/50 border border-border backdrop-blur-xl hover:border-primary/50 transition-all group"
            >
              <div className="mb-6 p-5 bg-primary/10 rounded-2xl w-fit text-primary group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-3xl font-bold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Visual Section */}
      <section className="py-24 px-6 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-card to-background p-12 md:p-24 rounded-[4rem] border border-border relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Kein Hype. <br />Echter <span className="text-primary">Mehrwert.</span>
              </h2>
              <div className="space-y-6">
                {[
                  "Automatisierung von Routineaufgaben",
                  "Personalisierte Kundenerlebnisse",
                  "Skalierbarkeit ohne Personalaufbau",
                  "Fehlerreduktion durch KI-Validierung"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="bg-primary/20 p-1 rounded-full">
                      <Zap size={20} className="text-primary" />
                    </div>
                    <span className="text-lg font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <Button nativeButton={false} render={<Link to="/kontakt" />} size="lg" className="mt-12 rounded-full px-10 h-14 text-lg purple-glow">
                KI-Potenzial prüfen
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-full border-2 border-primary/20 flex items-center justify-center animate-[spin_20s_linear_infinite]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-card border border-border rounded-2xl shadow-2xl">
                   <Bot className="text-primary" size={32} />
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 p-4 bg-card border border-border rounded-2xl shadow-2xl">
                   <Network className="text-accent" size={32} />
                </div>
                <div className="w-2/3 h-2/3 rounded-full border-2 border-accent/20 flex items-center justify-center animate-[spin_15s_linear_infinite_reverse]">
                   <div className="w-1/2 h-1/2 rounded-full bg-gradient-to-br from-primary to-accent opacity-20 blur-2xl" />
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Cpu size={64} className="text-primary animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center relative z-10">
        <h2 className="text-5xl md:text-7xl font-bold mb-8">Bereit für die <span className="text-primary">Zukunft?</span></h2>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Lassen Sie uns gemeinsam besprechen, wie wir KI in Ihr Unternehmen integrieren können.
        </p>
        <Button nativeButton={false} render={<Link to="/kontakt" />} size="lg" variant="outline" className="rounded-full px-12 h-16 text-xl border-primary/30 hover:bg-primary/10">
          Jetzt KI-Beratung anfragen
        </Button>
      </section>
    </div>
  );
}
