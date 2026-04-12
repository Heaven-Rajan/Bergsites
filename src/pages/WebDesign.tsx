import { motion } from "motion/react";
import { Layout, Smartphone, Palette, MousePointer2, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function WebDesign() {
  return (
    <div className="pt-20">
      <section className="py-24 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
              <Palette size={16} />
              <span>Design & Conversion</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black leading-[1.1] mb-6">
              Modernes <br /><span className="text-primary">Webdesign</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Ihre Website ist Ihr digitaler Verkaufsraum. Wir gestalten Erlebnisse, die nicht nur gut aussehen, sondern Ihre Besucher in Kunden verwandeln.
            </p>
            <div className="space-y-4 mb-10">
              {[
                "Individuelle UI/UX Konzepte",
                "Mobile-First & Responsive Design",
                "Psychologisch optimierte Layouts",
                "Fokus auf Conversion & ROI"
              ].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-primary" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
            <Button nativeButton={false} render={<Link to="/kontakt" />} size="lg" className="rounded-full px-8">
              Design-Anfrage starten
            </Button>
          </motion.div>
          <div className="relative">
            <div className="aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://picsum.photos/seed/webdesign/1200/800" 
                alt="Webdesign Showcase" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 glass-card p-8 rounded-2xl shadow-xl hidden md:block">
              <div className="text-primary font-bold text-4xl mb-1">90%</div>
              <div className="text-sm text-muted-foreground uppercase tracking-widest">Bessere Conversion</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Unser Fokus</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "User Experience",
                desc: "Intuitive Bedienung, die Spaß macht und den Nutzer zum Ziel führt.",
                icon: <MousePointer2 className="text-primary" size={32} />
              },
              {
                title: "Brand Identity",
                desc: "Wir übersetzen Ihre Markenwerte in eine visuelle Sprache.",
                icon: <Palette className="text-primary" size={32} />
              },
              {
                title: "Responsive",
                desc: "Perfekte Darstellung auf Smartphone, Tablet und Desktop.",
                icon: <Smartphone className="text-primary" size={32} />
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
