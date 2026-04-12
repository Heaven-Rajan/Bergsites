import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Wie lange dauert die Erstellung einer Website?",
    a: "In der Regel dauert ein Standard-Projekt (Starter-Paket) etwa 3-5 Wochen. Komplexere Business- oder Premium-Projekte können 8-12 Wochen in Anspruch nehmen, abhängig von den gewünschten Funktionen und der Zuarbeit der Inhalte."
  },
  {
    q: "Was kostet eine professionelle Website bei Bergsites?",
    a: "Unsere Pakete starten bei 1.490€ für eine solide Starter-Website. Individuelle Lösungen und komplexe Automatisierungen werden nach Aufwand kalkuliert. Wir erstellen Ihnen gerne ein transparentes Angebot nach einem ersten Beratungsgespräch."
  },
  {
    q: "Arbeitet ihr nur mit lokalen Kunden zusammen?",
    a: "Nein, wir arbeiten deutschlandweit. Dank moderner Kommunikationstools wie Zoom, Slack und n8n können wir Projekte effizient aus der Ferne abwickeln. Dennoch freuen wir uns natürlich über lokale Kunden aus dem Oberbergischen Kreis für persönliche Treffen."
  },
  {
    q: "Bietet ihr auch Wartung und Support an?",
    a: "Absolut. Wir lassen Sie nach dem Launch nicht allein. Wir bieten verschiedene Wartungspakete an, die Sicherheitsupdates, Backups und kleinere inhaltliche Änderungen abdecken."
  },
  {
    q: "Was ist n8n und warum ist es für mich wichtig?",
    a: "n8n ist ein mächtiges Tool zur Workflow-Automatisierung. Es ermöglicht uns, verschiedene Software-Anwendungen (z.B. Ihr CRM, E-Mail-System, Kalender) miteinander zu verbinden. Dadurch sparen Sie Zeit bei manuellen Aufgaben und reduzieren Fehlerquellen."
  },
  {
    q: "Könnt ihr auch meine bestehende Website überarbeiten?",
    a: "Ja, wir bieten Website-Relaunches an. Wir analysieren Ihre bestehende Seite, identifizieren Schwachstellen und bringen Design sowie Technik auf den neuesten Stand, ohne dass Sie Ihre SEO-Rankings verlieren."
  },
  {
    q: "Ist die Website für Mobilgeräte optimiert?",
    a: "Selbstverständlich. Jede Website, die wir entwickeln, folgt dem Mobile-First-Ansatz. Sie wird auf Smartphones, Tablets und Desktops perfekt dargestellt und bedienbar sein."
  },
  {
    q: "Macht ihr auch KI-Integrationen?",
    a: "Ja, das ist einer unserer Schwerpunkte. Wir integrieren KI-Modelle (z.B. OpenAI) für intelligente Chatbots, automatisierte Texterstellung oder Datenanalyse direkt in Ihre Website oder Ihre internen Workflows."
  }
];

export default function FAQ() {
  return (
    <div className="pt-20">
      <section className="py-24 px-6 bg-muted">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Häufige <span className="text-primary">Fragen</span></h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hier finden Sie Antworten auf die am häufigsten gestellten Fragen zu unserer Arbeitsweise und unseren Leistungen.
          </p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <AccordionItem value={`item-${index}`} className="border-none bg-white rounded-2xl px-6 shadow-sm">
                  <AccordionTrigger className="text-left font-bold text-lg hover:no-underline py-6">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base pb-6 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-24 px-6 bg-primary text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Noch Fragen offen?</h2>
          <p className="text-lg opacity-90 mb-10">Kein Problem! Schreiben Sie uns einfach eine Nachricht oder rufen Sie uns an. Wir helfen Ihnen gerne weiter.</p>
          <Button nativeButton={false} render={<Link to="/kontakt" />} variant="secondary" size="lg" className="rounded-full px-10">
            Kontakt aufnehmen
          </Button>
        </div>
      </section>
    </div>
  );
}
