import { motion } from "motion/react";
import { Mountain, Heart, Target, Users, MapPin, CheckCircle2 } from "lucide-react";

export default function About() {
  return (
    <div className="pt-20">
      <section className="py-24 px-6 bg-muted">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex p-4 bg-primary rounded-3xl text-white mb-8"
          >
            <Mountain size={48} />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Wir sind <span className="text-primary">Bergsites</span></h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Digitale Exzellenz aus dem Herzen des Oberbergischen Kreises. Wir verbinden lokale Nähe mit globalem technischem Standard.
          </p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8">Unsere Story</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Bergsites wurde mit einer klaren Vision gegründet: Den Mittelstand in Deutschland digital fit für die Zukunft zu machen. Wir glauben, dass hochwertige Technik und modernes Design nicht nur großen Konzernen vorbehalten sein sollten.
            </p>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Von unserem Standort aus arbeiten wir für Kunden in ganz Deutschland. Dabei setzen wir auf eine direkte, ehrliche Kommunikation und echte Partnerschaften auf Augenhöhe.
            </p>
            <div className="grid grid-cols-2 gap-8">
               <div className="flex gap-3">
                  <div className="bg-primary/10 p-1 rounded-full h-fit mt-1"><CheckCircle2 className="text-primary" size={20} /></div>
                  <div>
                    <h4 className="font-bold">Lokal verwurzelt</h4>
                    <p className="text-sm text-muted-foreground">Stolz auf unsere Wurzeln.</p>
                  </div>
               </div>
               <div className="flex gap-3">
                  <div className="bg-primary/10 p-1 rounded-full h-fit mt-1"><CheckCircle2 className="text-primary" size={20} /></div>
                  <div>
                    <h4 className="font-bold">Technisch vorne</h4>
                    <p className="text-sm text-muted-foreground">Immer am Puls der Zeit.</p>
                  </div>
               </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img src="https://picsum.photos/seed/team1/400/600" alt="Team 1" className="rounded-3xl w-full h-80 object-cover" referrerPolicy="no-referrer" />
              <img src="https://picsum.photos/seed/office/400/400" alt="Office" className="rounded-3xl w-full h-48 object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="space-y-4 mt-12">
              <img src="https://picsum.photos/seed/team2/400/400" alt="Team 2" className="rounded-3xl w-full h-48 object-cover" referrerPolicy="no-referrer" />
              <img src="https://picsum.photos/seed/mountain/400/600" alt="Mountain" className="rounded-3xl w-full h-80 object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-foreground text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Unsere Werte</h2>
            <p className="text-muted-foreground">Was uns antreibt und wie wir arbeiten.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "Ehrlichkeit", icon: <Heart className="text-primary" />, desc: "Wir sagen Ihnen, was sinnvoll ist – und was nicht. Transparenz ist unsere Basis." },
              { title: "Präzision", icon: <Target className="text-primary" />, desc: "Wie ein Schweizer Uhrwerk – wir achten auf jedes Detail in Code und Design." },
              { title: "Wachstum", icon: <Users className="text-primary" />, desc: "Ihr Erfolg ist unser Erfolg. Wir denken langfristig und skalierbar." }
            ].map(item => (
              <div key={item.title} className="text-center p-8 border border-white/10 rounded-3xl">
                <div className="mb-6 mx-auto w-fit">{item.icon}</div>
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
