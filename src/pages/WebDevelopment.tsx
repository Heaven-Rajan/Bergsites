import { motion } from "motion/react";
import { Globe, Code2, Zap, Shield, Database, Terminal, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function WebDevelopment() {
  return (
    <div className="pt-20">
      <section className="py-24 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="bg-foreground rounded-[2.5rem] p-10 shadow-2xl font-mono text-sm text-primary-foreground/80 overflow-hidden border-8 border-white/5">
              <div className="flex gap-2 mb-8">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <pre className="space-y-2">
                <code><span className="text-primary">const</span> project = <span className="text-accent">{'{'}</span></code>
                <code>  name: <span className="text-accent">"Bergsites Premium"</span>,</code>
                <code>  tech: [<span className="text-accent">"React"</span>, <span className="text-accent">"Vite"</span>, <span className="text-accent">"Tailwind"</span>],</code>
                <code>  performance: <span className="text-accent">100</span>,</code>
                <code>  status: <span className="text-accent">"Optimized"</span></code>
                <code><span className="text-accent">{'}'}</span>;</code>
                <br />
                <code><span className="text-primary">function</span> <span className="text-accent">deploy</span>() {'{'}</code>
                <code>  console.<span className="text-accent">log</span>(<span className="text-accent">"Scaling to the peak..."</span>);</code>
                <code>{'}'}</code>
              </pre>
            </div>
            <div className="absolute -top-6 -right-6 bg-primary p-6 rounded-2xl shadow-xl text-white">
              <Terminal size={32} />
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
              <Code2 size={16} />
              <span>Technik & Performance</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black leading-[1.1] mb-6">
              Saubere <br /><span className="text-primary">Entwicklung</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Wir bauen keine Websites von der Stange. Wir entwickeln individuelle, hochperformante Web-Applikationen mit modernsten Technologien und Fokus auf sauberen Aufbau.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-10">
              {[
                { title: "Performance", icon: <Zap size={20} /> },
                { title: "Sicherheit", icon: <Shield size={20} /> },
                { title: "Skalierbarkeit", icon: <Database size={20} /> },
                { title: "Clean Code", icon: <Code2 size={20} /> }
              ].map(item => (
                <div key={item.title} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-muted shadow-sm">
                  <div className="text-primary">{item.icon}</div>
                  <span className="font-bold">{item.title}</span>
                </div>
              ))}
            </div>
            <Button nativeButton={false} render={<Link to="/kontakt" />} size="lg" className="rounded-full px-8">
              Technisches Gespräch
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6 bg-foreground text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Unser Tech-Stack</h2>
            <p className="text-muted-foreground">Wir setzen auf bewährte und zukunftssichere Technologien.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {["React", "Vite", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "n8n", "OpenAI API"].map(tech => (
              <div key={tech} className="p-8 border border-white/10 rounded-3xl text-center hover:bg-white/5 transition-colors group">
                <div className="text-xl font-bold group-hover:text-primary transition-colors">{tech}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
