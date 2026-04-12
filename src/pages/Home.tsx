import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Zap, Shield, TrendingUp, Cpu, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { WebsiteShowcase } from "@/components/ui/WebsiteShowcase";

const stats = [
  { label: "Projekte", value: "150+" },
  { label: "Kunden", value: "80+" },
  { label: "Automatisierungen", value: "500+" },
  { label: "Erfahrung", value: "10 J." },
];

const services = [
  {
    title: "Webdesign & Entwicklung",
    description: "Hochwertige, performante Websites mit Fokus auf UX, Design und Conversion.",
    icon: <Zap className="text-primary" />,
    link: "/webdesign"
  },
  {
    title: "Prozess-Automatisierung",
    description: "Wir automatisieren Ihre Aufgaben mit n8n Workflows und sparen Ihnen wertvolle Zeit.",
    icon: <TrendingUp className="text-primary" />,
    link: "/automatisierung"
  },
  {
    title: "KI-Integration",
    description: "Nutzen Sie die Kraft von AI für Chatbots und intelligente, skalierbare Systeme.",
    icon: <Cpu className="text-primary" />,
    link: "/ki-integration"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#F8FAF7]">
        {/* Mountain Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 0.1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute bottom-0 left-0 w-full h-1/2 bg-primary/10"
            style={{ clipPath: "polygon(0 100%, 30% 20%, 50% 60%, 70% 10%, 100% 100%)" }}
          />
          <motion.div 
            initial={{ opacity: 0, y: 150 }}
            animate={{ opacity: 0.05, y: 0 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
            className="absolute bottom-0 left-0 w-full h-2/3 bg-primary/20"
            style={{ clipPath: "polygon(0 100%, 20% 40%, 40% 10%, 60% 50%, 80% 20%, 100% 100%)" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
              <Mountain size={16} />
              <span>Digitale Lösungen aus den Bergen</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold leading-[1.1] mb-6">
              Präzision trifft <br />
              <span className="text-primary">Innovation.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
              Wir entwickeln hochwertige Websites und intelligente Automatisierungen, die Ihr Unternehmen nachhaltig wachsen lassen. Lokal verwurzelt, technisch am Puls der Zeit.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button nativeButton={false} render={<Link to="/kontakt" />} size="lg" className="rounded-full px-8 text-lg">
                Projekt starten
              </Button>
              <Button nativeButton={false} render={<Link to="/leistungen" />} variant="outline" size="lg" className="rounded-full px-8 text-lg">
                Unsere Leistungen
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-display font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <WebsiteShowcase />
          </motion.div>
        </div>
      </section>

      {/* Services Teaser */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Was wir für Sie tun</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Von der ersten Idee bis zur vollautomatisierten Prozesskette – wir begleiten Sie auf Ihrem Weg zum digitalen Erfolg.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-none bg-muted/50 group">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="mb-6 p-4 bg-white rounded-2xl w-fit shadow-sm group-hover:scale-110 transition-transform">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                    <p className="text-muted-foreground mb-8 flex-grow">
                      {service.description}
                    </p>
                    <Link to={service.link} className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                      Mehr erfahren <ArrowRight size={18} />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 px-6 bg-foreground text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Warum Bergsites?</h2>
              <div className="space-y-6">
                {[
                  { title: "Lokal & Nahbar", desc: "Persönliche Beratung direkt bei Ihnen vor Ort und Umgebung." },
                  { title: "Technisch Exzellent", desc: "Wir nutzen modernste Tech-Stacks für maximale Performance." },
                  { title: "Ergebnisorientiert", desc: "Kein Design um des Designs willen – wir liefern messbare Ergebnisse." },
                  { title: "Zukunftssicher", desc: "Automatisierung und KI sind bei uns Standard, nicht Ausnahme." }
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="bg-primary/20 p-1 rounded-full h-fit mt-1">
                      <CheckCircle2 className="text-primary" size={20} />
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
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img 
                  src="https://picsum.photos/seed/mountain-view/800/800" 
                  alt="Mountain View" 
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary p-8 rounded-2xl shadow-2xl">
                <div className="text-4xl font-bold mb-1">100%</div>
                <div className="text-sm opacity-80 uppercase tracking-widest">Kundenzufriedenheit</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-muted/50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Wie viel Potenzial steckt in Ihrem Unternehmen?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Nutzen Sie unseren kostenlosen Selbstcheck und erfahren Sie in wenigen Sekunden, wie eine moderne Website und Automatisierung Ihr Wachstum beschleunigen können.
            </p>
            <Button nativeButton={false} render={<Link to="/selbstcheck" />} size="lg" className="rounded-full px-8">
              Jetzt Selbstcheck starten
            </Button>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-primary/10 text-center">
             <div className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Beispiel Ergebnis</div>
             <div className="text-7xl font-display font-black text-primary mb-4">+65%</div>
             <p className="font-medium">Mehr Anfragen für Zahnarztpraxen durch Online-Terminbuchung.</p>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-primary rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <Mountain className="absolute -bottom-20 -left-20 w-96 h-96" />
             <Mountain className="absolute -top-20 -right-20 w-64 h-64" />
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Bereit für den <br />nächsten Gipfel?</h2>
            <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto">
              Lassen Sie uns gemeinsam besprechen, wie wir Ihr Unternehmen digital stärken können. Unverbindlich und professionell.
            </p>
            <Button nativeButton={false} render={<Link to="/kontakt" />} size="lg" variant="secondary" className="rounded-full px-10 text-lg h-14">
              Jetzt Gespräch anfragen
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
