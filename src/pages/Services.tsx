import { motion } from "motion/react";
import { 
  ArrowRight, 
  Zap, 
  TrendingUp, 
  Cpu, 
  Globe, 
  Shield, 
  Search, 
  Gauge, 
  Layout, 
  MessageSquare, 
  Database, 
  Link as LinkIcon,
  Code2,
  RefreshCw,
  Workflow,
  Target
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const allServices = [
  {
    title: "Webdesign",
    description: "Moderne, ästhetische und responsive Designs mit Fokus auf UX und Conversion.",
    icon: <Layout className="text-primary" />,
    href: "/webdesign",
    features: ["UX/UI Design", "Conversion Optimierung", "Responsive Layouts"]
  },
  {
    title: "Webentwicklung",
    description: "Individuelle Programmierung mit Fokus auf Performance, Sicherheit und sauberen Aufbau.",
    icon: <Code2 className="text-primary" />,
    href: "/webentwicklung",
    features: ["React & Vite", "Sauberer Code", "Skalierbare Architektur"]
  },
  {
    title: "Website-Relaunch",
    description: "Wir bringen Ihre bestehende Website auf den neuesten Stand – technisch und optisch.",
    icon: <RefreshCw className="text-primary" />,
    href: "/relaunch",
    features: ["Content Migration", "Modernisierung", "SEO Erhalt"]
  },
  {
    title: "Wartung & Support",
    description: "Langfristige Sicherheit und Betreuung für Ihre digitale Präsenz.",
    icon: <Shield className="text-primary" />,
    href: "/wartung",
    features: ["Sicherheits-Updates", "Backups", "Technischer Support"]
  },
  {
    title: "Automatisierung",
    description: "Effiziente Workflows mit n8n, die Ihre Geschäftsprozesse digitalisieren.",
    icon: <Workflow className="text-primary" />,
    href: "/automatisierung",
    features: ["n8n Workflows", "Prozess-Optimierung", "API Integration"]
  },
  {
    title: "KI-Integration",
    description: "Intelligente AI-Lösungen für Chatbots und automatisierte Systeme.",
    icon: <Cpu className="text-primary" />,
    href: "/ki-integration",
    features: ["AI Chatbots", "Intelligente Systeme", "Smart Automation"]
  },
  {
    title: "SEO & Performance",
    description: "Maximale Sichtbarkeit bei Google durch blitzschnelle Ladezeiten.",
    icon: <Search className="text-primary" />,
    href: "/seo",
    features: ["PageSpeed Fokus", "Google Ranking", "Core Web Vitals"]
  },
  {
    title: "Landingpages",
    description: "Hochkonvertierende Seiten mit klarem Fokus auf Sales und Leads.",
    icon: <Target className="text-primary" />,
    href: "/landingpages",
    features: ["Sales Fokus", "Lead Generierung", "A/B Testing"]
  }
];

export default function Services() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-muted py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Unsere <span className="text-primary">Leistungen</span>
          </motion.h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Wir bieten ganzheitliche digitale Lösungen – vom ersten Design-Entwurf bis zur komplexen KI-gestützten Automatisierung.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow border-none bg-white">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="mb-6 p-4 bg-muted rounded-2xl w-fit">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground mb-6 flex-grow">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {service.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button nativeButton={false} render={<Link to={service.href} />} variant="outline" className="w-full rounded-full">
                    Details ansehen
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-6 bg-foreground text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Unser Prozess</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Analyse", desc: "Wir verstehen Ihre Ziele und Anforderungen." },
              { step: "02", title: "Konzept", desc: "Strategie und Design-Entwurf." },
              { step: "03", title: "Entwicklung", desc: "Saubere Umsetzung mit modernster Technik." },
              { step: "04", title: "Launch", desc: "Go-Live und kontinuierliche Optimierung." }
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="text-6xl font-display font-black text-white/10 mb-4">{item.step}</div>
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
