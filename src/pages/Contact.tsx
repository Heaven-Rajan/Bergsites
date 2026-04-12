import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function Contact() {
  return (
    <div className="pt-20">
      <section className="py-24 px-6 bg-muted">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Kontaktieren Sie <span className="text-primary">uns</span></h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Bereit für den nächsten Schritt? Wir freuen uns darauf, von Ihrem Projekt zu hören.
          </p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-8">Lassen Sie uns <br />sprechen.</h2>
              <p className="text-muted-foreground mb-10">
                Ob eine kurze Frage oder eine detaillierte Projektanfrage – wir melden uns innerhalb von 24 Stunden bei Ihnen zurück.
              </p>
            </div>
            
            <div className="space-y-6">
              {[
                { icon: <Mail className="text-primary" />, title: "E-Mail", value: "hallo@bergsites.de" },
                { icon: <Phone className="text-primary" />, title: "Telefon", value: "+49 (0) 123 456789" },
                { icon: <MapPin className="text-primary" />, title: "Standort", value: "Deutschland" }
              ].map(item => (
                <div key={item.title} className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-muted">
                  <div className="bg-muted p-3 rounded-xl">{item.icon}</div>
                  <div>
                    <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">{item.title}</div>
                    <div className="text-lg font-bold">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <Card className="bg-primary text-white border-none rounded-3xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Clock size={24} />
                  <span className="font-bold">Bürozeiten</span>
                </div>
                <div className="space-y-2 opacity-90">
                  <div className="flex justify-between"><span>Mo - Fr:</span> <span>09:00 - 18:00</span></div>
                  <div className="flex justify-between"><span>Sa:</span> <span>Nach Absprache</span></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-muted">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold px-1">Name</label>
                    <Input placeholder="Ihr Name" className="rounded-xl h-12 border-muted focus:border-primary" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold px-1">E-Mail</label>
                    <Input type="email" placeholder="ihre@email.de" className="rounded-xl h-12 border-muted focus:border-primary" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold px-1">Unternehmen (Optional)</label>
                    <Input placeholder="Name Ihres Unternehmens" className="rounded-xl h-12 border-muted focus:border-primary" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold px-1">Interesse</label>
                    <select className="w-full h-12 rounded-xl border border-muted bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                      <option>Webdesign & Entwicklung</option>
                      <option>Automatisierung (n8n)</option>
                      <option>KI-Integration</option>
                      <option>Sonstiges</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold px-1">Nachricht</label>
                  <Textarea placeholder="Erzählen Sie uns von Ihrem Projekt..." className="rounded-xl min-h-[150px] border-muted focus:border-primary" />
                </div>
                <Button className="w-full h-14 rounded-xl text-lg gap-2">
                  Nachricht senden <Send size={18} />
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Mit dem Absenden des Formulars erklären Sie sich mit unserer <a href="/datenschutz" className="underline">Datenschutzerklärung</a> einverstanden.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
