import { motion } from "motion/react";
import { Workflow, ArrowRight, CheckCircle2, Zap, Cpu, Database, Settings, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Automation() {
  return (
    <div className="pt-20">
      <section className="py-24 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
              <Workflow size={16} />
              <span>Effizienz & Skalierung</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black leading-[1.1] mb-6">
              Prozess <br /><span className="text-primary">Automatisierung</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Verschwenden Sie keine Zeit mehr mit manuellen Aufgaben. Wir automatisieren Ihre Geschäftsprozesse mit n8n und intelligenten Workflows.
            </p>
            <div className="space-y-4 mb-10">
              {[
                "Individuelle n8n Workflows",
                "Nahtlose API-Integrationen",
                "Automatisierte Lead-Verarbeitung",
                "Synchronisation Ihrer Tools (CRM, ERP)"
              ].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-primary" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
            <Button nativeButton={false} render={<Link to="/kontakt" />} size="lg" className="rounded-full px-8">
              Automatisierungs-Check
            </Button>
          </motion.div>
          <div className="relative">
            <div className="aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-foreground p-8 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-4 w-full max-w-md">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                  <motion.div
                    key={i}
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                    className="aspect-square bg-primary/20 rounded-xl border border-primary/30 flex items-center justify-center"
                  >
                    <Settings className="text-primary/50" size={24} />
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 glass-card p-8 rounded-2xl shadow-xl hidden md:block">
              <div className="text-primary font-bold text-4xl mb-1">-80%</div>
              <div className="text-sm text-muted-foreground uppercase tracking-widest">Manuelle Arbeit</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Intelligente Workflows</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "n8n Expertise",
                desc: "Wir sind Experten für n8n und bauen komplexe Automatisierungen, die stabil laufen.",
                icon: <Workflow className="text-primary" size={32} />
              },
              {
                title: "Tool-Connect",
                desc: "Wir verbinden Ihre bestehenden Tools (Slack, CRM, E-Mail) zu einem flüssigen System.",
                icon: <Database className="text-primary" size={32} />
              },
              {
                title: "Skalierbarkeit",
                desc: "Automatisierte Prozesse wachsen mit Ihrem Unternehmen mit, ohne Mehrkosten.",
                icon: <BarChart3 className="text-primary" size={32} />
              }
            ].map(item => (
              <div key={item.title} className="p-10 bg-muted/30 rounded-[2.5rem] border border-muted">
                <div className="mb-6">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
