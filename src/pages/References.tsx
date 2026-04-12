import { motion } from "motion/react";
import { ExternalLink, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const projects = [
  {
    title: "Kanzlei am Berg",
    category: "Webdesign & Entwicklung",
    desc: "Moderner Relaunch für eine renommierte Anwaltskanzlei. Fokus auf Seriosität und Lead-Generierung.",
    image: "https://picsum.photos/seed/law/800/600",
    tags: ["Recht", "Professional", "SEO"]
  },
  {
    title: "Gourmet Neustadt",
    category: "E-Commerce & Automatisierung",
    desc: "Online-Bestellsystem mit automatisierter Rechnungsstellung und n8n-Anbindung an das CRM.",
    image: "https://picsum.photos/seed/food/800/600",
    tags: ["Gastronomie", "Shop", "n8n"]
  },
  {
    title: "Handwerk & Co.",
    category: "Webdesign",
    desc: "Authentische Website für einen lokalen Handwerksbetrieb. Optimiert für mobile Endgeräte.",
    image: "https://picsum.photos/seed/craft/800/600",
    tags: ["Handwerk", "Lokal", "Responsive"]
  },
  {
    title: "TechConsult AI",
    category: "KI-Integration",
    desc: "Implementierung eines intelligenten Chatbots zur Vorqualifizierung von Beratungsanfragen.",
    image: "https://picsum.photos/seed/tech/800/600",
    tags: ["Consulting", "AI", "Automation"]
  },
  {
    title: "Modehaus Berg",
    category: "Webentwicklung",
    desc: "Performanter Onlineshop mit Fokus auf User Experience und schnellen Ladezeiten.",
    image: "https://picsum.photos/seed/fashion/800/600",
    tags: ["Fashion", "E-Commerce", "Performance"]
  },
  {
    title: "Steuerberater Müller",
    category: "Automatisierung",
    desc: "Digitalisierung des Onboarding-Prozesses für Neumandanten mittels smarter Formulare.",
    image: "https://picsum.photos/seed/tax/800/600",
    tags: ["Finanzen", "Prozesse", "n8n"]
  }
];

export default function References() {
  return (
    <div className="pt-20">
      <section className="py-24 px-6 bg-muted">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Unsere <span className="text-primary">Referenzen</span></h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ein Auszug aus Projekten, die wir mit Leidenschaft und technischer Präzision umgesetzt haben.
          </p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                    <Button variant="secondary" className="rounded-full gap-2">
                      Case Study <ExternalLink size={16} />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-8">
                  <div className="text-sm font-bold text-primary uppercase tracking-widest mb-2">{project.category}</div>
                  <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                  <p className="text-muted-foreground mb-6 line-clamp-2">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-muted rounded-full text-xs font-medium flex items-center gap-1">
                        <Tag size={12} /> {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ihr Projekt als nächstes?</h2>
          <p className="text-xl opacity-90 mb-10">Lassen Sie uns gemeinsam besprechen, wie wir auch Ihr Unternehmen digital nach vorne bringen können.</p>
          <Button nativeButton={false} render={<Link to="/kontakt" />} size="lg" variant="secondary" className="rounded-full px-10">
            Jetzt anfragen
          </Button>
        </div>
      </section>
    </div>
  );
}
