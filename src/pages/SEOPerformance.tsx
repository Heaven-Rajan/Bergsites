import { motion } from "motion/react";
import { Search, ArrowRight, CheckCircle2, Zap, BarChart3, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function SEOPerformance() {
  return (
    <div className="pt-20">
      <section className="py-24 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
              <Search size={16} />
              <span>Sichtbarkeit & Speed</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black leading-[1.1] mb-6">
              SEO & <br /><span className="text-primary">Performance</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Was nützt die schönste Website, wenn sie nicht gefunden wird oder zu langsam lädt? Wir optimieren Ihre Seite für Google und Ihre Besucher.
            </p>
            <div className="space-y-4 mb-10">
              {[
                "Optimierung der Core Web Vitals",
                "On-Page SEO Strategie",
                "Blitzschnelle Ladezeiten (< 1s)",
                "Strukturierte Daten für Google"
              ].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-primary" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
            <Button nativeButton={false} render={<Link to="/kontakt" />} size="lg" className="rounded-full px-8">
              SEO-Analyse anfordern
            </Button>
          </motion.div>
          <div className="relative">
            <div className="aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://picsum.photos/seed/seo/1200/800" 
                alt="SEO & Performance" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 glass-card p-8 rounded-2xl shadow-xl hidden md:block">
              <div className="text-primary font-bold text-4xl mb-1">100/100</div>
              <div className="text-sm text-muted-foreground uppercase tracking-widest">PageSpeed Score</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Gefunden werden. Überzeugen.</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "PageSpeed",
                desc: "Geschwindigkeit ist ein Rankingfaktor. Wir optimieren jedes Byte für maximale Performance.",
                icon: <Gauge className="text-primary" size={32} />
              },
              {
                title: "On-Page SEO",
                desc: "Wir optimieren Inhalte, Metadaten und Strukturen für die beste Sichtbarkeit.",
                icon: <BarChart3 className="text-primary" size={32} />
              },
              {
                title: "Technisches SEO",
                desc: "Sauberer Code und korrekte Indexierung sorgen für eine perfekte Basis.",
                icon: <Zap className="text-primary" size={32} />
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
