import { motion } from "motion/react";
import { Shield, ArrowRight, CheckCircle2, Zap, Clock, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Maintenance() {
  return (
    <div className="pt-20">
      <section className="py-24 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
              <Shield size={16} />
              <span>Sicherheit & Kontinuität</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black leading-[1.1] mb-6">
              Wartung & <br /><span className="text-primary">Support</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Eine Website ist nie "fertig". Wir sorgen dafür, dass Ihre digitale Präsenz sicher, aktuell und performant bleibt – damit Sie sich auf Ihr Kerngeschäft konzentrieren können.
            </p>
            <div className="space-y-4 mb-10">
              {[
                "Regelmäßige Sicherheits-Updates",
                "Tägliche Backups & Monitoring",
                "Technischer Support bei Fragen",
                "Kontinuierliche Performance-Checks"
              ].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-primary" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
            <Button nativeButton={false} render={<Link to="/kontakt" />} size="lg" className="rounded-full px-8">
              Wartungs-Pakete ansehen
            </Button>
          </motion.div>
          <div className="relative">
            <div className="aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://picsum.photos/seed/maintenance/1200/800" 
                alt="Wartung & Support" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 glass-card p-8 rounded-2xl shadow-xl hidden md:block">
              <div className="text-primary font-bold text-4xl mb-1">24/7</div>
              <div className="text-sm text-muted-foreground uppercase tracking-widest">Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Rundum sorglos</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Sicherheit",
                desc: "Wir schützen Ihre Seite vor Angriffen und schließen Sicherheitslücken sofort.",
                icon: <Lock className="text-primary" size={32} />
              },
              {
                title: "Aktualität",
                desc: "Plugins, Themes und Core-Systeme werden von uns stets aktuell gehalten.",
                icon: <Zap className="text-primary" size={32} />
              },
              {
                title: "Support",
                desc: "Bei Problemen oder Änderungswünschen sind wir schnell für Sie erreichbar.",
                icon: <Clock className="text-primary" size={32} />
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
