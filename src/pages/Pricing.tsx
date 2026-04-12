import { motion } from "motion/react";
import { Check, Zap, Shield, TrendingUp, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "Ab 1.490€",
    desc: "Perfekt für kleine Unternehmen & Selbstständige.",
    features: [
      "Individuelles Webdesign",
      "Bis zu 5 Unterseiten",
      "Responsive Optimierung",
      "SEO Basiskonfiguration",
      "Kontaktformular",
      "1 Monat Support"
    ],
    icon: <Zap className="text-primary" />,
    popular: false
  },
  {
    name: "Business",
    price: "Ab 2.990€",
    desc: "Die ideale Lösung für wachsende Betriebe.",
    features: [
      "Alles aus Starter",
      "Bis zu 12 Unterseiten",
      "Blog / News System",
      "Erweiterte SEO-Analyse",
      "1 Automatisierung (n8n)",
      "3 Monate Support"
    ],
    icon: <Star className="text-accent" />,
    popular: true
  },
  {
    name: "Premium",
    price: "Ab 5.490€",
    desc: "Maximale Power für anspruchsvolle Projekte.",
    features: [
      "Alles aus Business",
      "Unbegrenzte Unterseiten",
      "KI-Integration (Chatbot)",
      "Komplexe n8n Workflows",
      "Performance-Garantie",
      "6 Monate Support"
    ],
    icon: <Shield className="text-primary" />,
    popular: false
  }
];

export default function Pricing() {
  return (
    <div className="pt-20">
      <section className="py-24 px-6 bg-muted">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Transparente <span className="text-primary">Preise</span></h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Keine versteckten Kosten. Wir bieten faire Pakete für jede Unternehmensgröße.
          </p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-bold z-10">
                  Meistgewählt
                </div>
              )}
              <Card className={`h-full flex flex-col rounded-[2rem] border-2 transition-all duration-300 ${plan.popular ? 'border-accent shadow-2xl scale-105' : 'border-transparent shadow-lg hover:shadow-xl'}`}>
                <CardHeader className="p-8 text-center">
                  <div className="mb-4 mx-auto w-fit p-3 bg-muted rounded-2xl">
                    {plan.icon}
                  </div>
                  <CardTitle className="text-3xl font-bold mb-2">{plan.name}</CardTitle>
                  <div className="text-4xl font-display font-black text-primary mb-2">{plan.price}</div>
                  <CardDescription className="text-base">{plan.desc}</CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0 flex-grow">
                  <div className="space-y-4 mb-10">
                    {plan.features.map(feature => (
                      <div key={feature} className="flex items-center gap-3">
                        <Check className="text-primary shrink-0" size={18} />
                        <span className="text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button nativeButton={false} render={<Link to="/kontakt" />} className={`w-full rounded-full h-12 text-lg ${plan.popular ? 'bg-accent hover:bg-accent/90' : ''}`}>
                    Paket anfragen
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 bg-foreground text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Individuelle Lösungen?</h2>
          <p className="text-xl text-muted-foreground mb-10">
            Sie benötigen eine spezielle Web-Applikation, komplexe API-Anbindungen oder eine umfassende KI-Strategie? Wir erstellen Ihnen gerne ein maßgeschneidertes Angebot.
          </p>
          <Button nativeButton={false} render={<Link to="/kontakt" />} variant="outline" size="lg" className="rounded-full px-10 border-white/20 hover:bg-white/10">
            Individuelles Angebot anfordern
          </Button>
        </div>
      </section>
    </div>
  );
}
