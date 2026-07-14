import { motion } from "motion/react";
import {
  Server,
  Database,
  Cloud,
  KeyRound,
  Plug,
  Workflow,
  Layers,
  BarChart3,
  Boxes,
  ShieldCheck,
  GitBranch,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const offerings = [
  {
    icon: <Plug size={24} />,
    title: "Custom APIs & Schnittstellen",
    desc: "REST- und GraphQL-APIs, die Ihre Systeme verbinden – ERP, CRM, Shop, Buchhaltung, Logistik. Saubere Verträge, dokumentiert, versioniert.",
  },
  {
    icon: <Boxes size={24} />,
    title: "Interne Tools & Admin-Panels",
    desc: "Maßgeschneiderte Dashboards für Operations, Sales und Service. Schluss mit Excel-Chaos und 12 offenen Tabs pro Mitarbeiter.",
  },
  {
    icon: <Database size={24} />,
    title: "Datenbanken & Datenmodelle",
    desc: "Strukturen, die mit Ihrem Geschäft skalieren. Postgres, MySQL, Firestore – inklusive Migrationen, Backups und Performance-Tuning.",
  },
  {
    icon: <KeyRound size={24} />,
    title: "Auth & Rollen-Systeme",
    desc: "Sicheres Login, Mehrbenutzer, Rechteverwaltung, SSO. DSGVO-konform und so streng wie Sie es brauchen.",
  },
  {
    icon: <Workflow size={24} />,
    title: "Business-Logik & Prozesse",
    desc: "Bestellungen, Freigaben, Abrechnungen, Reporting – als Code statt als Klickarbeit. Wiederholbar, prüfbar, automatisierbar.",
  },
  {
    icon: <Cloud size={24} />,
    title: "Cloud-Infrastruktur",
    desc: "Hosting, Monitoring, CI/CD und Skalierung. Wir betreiben es oder übergeben sauber an Ihr IT-Team.",
  },
];

const possibilities = [
  {
    title: "Kundenportale",
    desc: "Self-Service-Bereiche, in denen Kunden Aufträge sehen, Dokumente abrufen oder Tickets anlegen.",
  },
  {
    title: "Mitarbeiter-Tools",
    desc: "Interne Apps für Bestellabwicklung, Lagerverwaltung, Zeiterfassung oder Außendienst.",
  },
  {
    title: "Reporting & BI",
    desc: "Live-Dashboards mit den Zahlen, die wirklich zählen – statt monatlicher Excel-Exporte.",
  },
  {
    title: "ERP/CRM-Integration",
    desc: "Daten zwischen DATEV, SAP, HubSpot, Pipedrive & Co. fließen lassen – ohne manuelle Übertragung.",
  },
  {
    title: "Workflow-Automatisierung",
    desc: "Freigaben, Benachrichtigungen, Trigger und Folge-Aktionen über Systemgrenzen hinweg.",
  },
  {
    title: "Multi-Tenant SaaS",
    desc: "Sie wollen Ihr Geschäftsmodell digital skalieren? Wir bauen die Plattform dahinter.",
  },
];

const stack = [
  "Node.js",
  "TypeScript",
  "PostgreSQL",
  "Firebase",
  "Docker",
  "REST / GraphQL",
  "n8n",
  "OAuth / SSO",
];

const principles = [
  "Sauber dokumentiert – auch wenn wir mal nicht da sind",
  "DSGVO-konform und revisionssicher gebaut",
  "Versionskontrolle, Tests und CI/CD ab Tag 1",
  "Skalierbar von 5 auf 5.000 Nutzer ohne Umbau",
];

export default function BackendSystems() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
              <Server size={16} />
              <span>Backend-Systeme für Unternehmen</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black leading-[1.1] mb-6">
              Das System <br />
              <span className="text-primary">hinter dem System</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Eine Website ist die Spitze des Eisbergs. Darunter laufen Datenbanken, Schnittstellen, Logik
              und Prozesse, die Ihr Unternehmen wirklich am Laufen halten. Wir bauen genau das – maßgeschneidert,
              sauber und für Wachstum gemacht.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                nativeButton={false}
                render={<Link to="/kontakt" />}
                size="lg"
                className="rounded-full px-8"
              >
                Projekt besprechen
                <ArrowRight size={18} className="ml-2" />
              </Button>
              <Button
                nativeButton={false}
                render={<Link to="/selbstcheck" />}
                variant="outline"
                size="lg"
                className="rounded-full px-8"
              >
                Potenzial-Check starten
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="bg-foreground rounded-[2.5rem] p-10 shadow-2xl text-white border-8 border-white/5">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-mono text-white/60">api.unternehmen.de</span>
              </div>
              <div className="space-y-4">
                {[
                  { icon: <Database size={18} />, label: "Database", value: "Connected" },
                  { icon: <Plug size={18} />, label: "ERP Sync", value: "Live" },
                  { icon: <Workflow size={18} />, label: "Auto-Workflows", value: "12 aktiv" },
                  { icon: <ShieldCheck size={18} />, label: "Auth", value: "OAuth 2.0" },
                  { icon: <BarChart3 size={18} />, label: "Reporting", value: "Echtzeit" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between p-3 rounded-2xl bg-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-primary">{row.icon}</div>
                      <span className="font-mono text-sm">{row.label}</span>
                    </div>
                    <span className="text-sm font-bold text-primary">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-primary p-6 rounded-2xl shadow-xl text-white">
              <Server size={32} />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-muted">
              <Layers size={32} className="text-primary" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Was wir anbieten */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
              <span>Unser Angebot</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black mb-4">
              Was wir für Sie bauen
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Vom einzelnen Microservice bis zur kompletten Unternehmensplattform.
              Modular gedacht, ganzheitlich umgesetzt.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-8 bg-white rounded-3xl border border-muted shadow-sm hover:shadow-xl hover:border-primary/30 transition-all group"
              >
                <div className="inline-flex p-3 bg-primary/10 text-primary rounded-2xl mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Möglichkeiten / Use Cases */}
      <section className="py-24 px-6 bg-foreground text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-bold mb-4">
                <span>Was möglich ist</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-black mb-4">
                Konkrete Anwendungsfälle
              </h2>
            </div>
            <p className="text-xl text-white/70 leading-relaxed">
              Nicht jedes Unternehmen braucht das Gleiche. Diese Beispiele zeigen, was wir
              bereits umgesetzt haben oder umsetzen können – als Inspiration für Ihr Vorhaben.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {possibilities.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-8 rounded-3xl border border-white/10 hover:bg-white/5 hover:border-primary/40 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <GitBranch size={20} className="text-primary" />
                  <h3 className="text-xl font-bold">{p.title}</h3>
                </div>
                <p className="text-white/70 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Prinzipien + Stack */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-black mb-8">
              Wie wir bauen
            </h2>
            <ul className="space-y-5">
              {principles.map((p) => (
                <li key={p} className="flex items-start gap-4">
                  <div className="mt-1 text-primary shrink-0">
                    <CheckCircle2 size={24} />
                  </div>
                  <span className="text-lg leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
              <span>Tech-Stack</span>
            </div>
            <h3 className="text-2xl font-bold mb-6">
              Bewährt, wartbar, zukunftssicher
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {stack.map((tech) => (
                <div
                  key={tech}
                  className="p-5 bg-white rounded-2xl border border-muted text-center font-bold hover:border-primary/30 hover:text-primary transition-colors"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-display font-black mb-6">
            Welches System fehlt Ihnen heute?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Erzählen Sie uns von dem Prozess, der zu lange dauert, der Excel-Datei,
            die niemand mehr versteht, oder der Schnittstelle, die nie kommt.
            Wir hören zu und zeigen Ihnen, wie es besser geht.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              nativeButton={false}
              render={<Link to="/kontakt" />}
              size="lg"
              className="rounded-full px-8"
            >
              Unverbindliches Erstgespräch
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
