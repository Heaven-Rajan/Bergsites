import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Stethoscope, 
  Hammer, 
  Utensils, 
  ShoppingBag, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  Zap,
  RefreshCw,
  Users,
  Target,
  Globe,
  Loader2,
  Scale,
  Home,
  Truck,
  GraduationCap,
  Dumbbell,
  Store,
  AlertCircle,
  Euro,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const industries = [
  { id: "medical", name: "Arztpraxis / Medizin", icon: <Stethoscope size={24} />, industryAvg: 65 },
  { id: "crafts", name: "Handwerk / Bau", icon: <Hammer size={24} />, industryAvg: 45 },
  { id: "gastronomy", name: "Gastronomie", icon: <Utensils size={24} />, industryAvg: 75 },
  { id: "ecommerce", name: "E-Commerce / Shop", icon: <ShoppingBag size={24} />, industryAvg: 85 },
  { id: "service", name: "Dienstleistung / Beratung", icon: <Briefcase size={24} />, industryAvg: 55 },
  { id: "law", name: "Kanzleien / Recht", icon: <Scale size={24} />, industryAvg: 50 },
  { id: "realestate", name: "Immobilien", icon: <Home size={24} />, industryAvg: 70 },
  { id: "logistics", name: "Logistik / Transport", icon: <Truck size={24} />, industryAvg: 40 },
  { id: "education", name: "Bildung / Coaching", icon: <GraduationCap size={24} />, industryAvg: 80 },
  { id: "fitness", name: "Fitness / Wellness", icon: <Dumbbell size={24} />, industryAvg: 60 },
  { id: "retail", name: "Einzelhandel", icon: <Store size={24} />, industryAvg: 50 },
];

const digitalStates = [
  { id: "none", name: "Keine Website vorhanden", bonus: 35 },
  { id: "old", name: "Veraltete Website (5+ Jahre)", bonus: 25 },
  { id: "basic", name: "Einfache Visitenkarte", bonus: 15 },
  { id: "modern", name: "Moderne Website, aber kaum Anfragen", bonus: 10 },
];

const employeeCounts = [
  { id: "1-5", name: "1 - 5 Mitarbeiter", factor: 1.0 },
  { id: "6-20", name: "6 - 20 Mitarbeiter", factor: 1.15 },
  { id: "21-50", name: "21 - 50 Mitarbeiter", factor: 1.3 },
  { id: "50+", name: "Über 50 Mitarbeiter", factor: 1.5 },
];

const painPoints = [
  { id: "leads", name: "Zu wenig Neukunden", icon: <Users size={20} /> },
  { id: "time", name: "Zu viel manuelle Arbeit", icon: <Clock size={20} /> },
  { id: "visibility", name: "Geringe Sichtbarkeit", icon: <Globe size={20} /> },
  { id: "image", name: "Veraltetes Image", icon: <Target size={20} /> },
];

const budgets = [
  { id: "low", name: "Unter 500€ / Monat", factor: 1.0 },
  { id: "mid", name: "500€ - 2.000€ / Monat", factor: 1.2 },
  { id: "high", name: "Über 2.000€ / Monat", factor: 1.4 },
  { id: "none", name: "Bisher kein festes Budget", factor: 1.1 },
];

export default function Selbstcheck() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [selection, setSelection] = useState({
    industry: null,
    state: null,
    employees: null,
    painPoint: null,
    budget: null,
  });

  const handleIndustrySelect = (industry) => {
    setSelection({ ...selection, industry });
    setStep(2);
  };

  const handleStateSelect = (state) => {
    setSelection({ ...selection, state });
    setStep(3);
  };

  const handleEmployeeSelect = (employees) => {
    setSelection({ ...selection, employees });
    setStep(4);
  };

  const handlePainPointSelect = (painPoint) => {
    setSelection({ ...selection, painPoint });
    setStep(5);
  };

  const handleBudgetSelect = (budget) => {
    setSelection({ ...selection, budget });
    startCalculation();
  };

  const startCalculation = () => {
    setIsLoading(true);
    setStep(6);
    
    const texts = [
      "Analysiere Branchendaten...",
      "Vergleiche mit Referenzprojekten...",
      "Berechne Automatisierungspotenzial...",
      "Prüfe Skalierbarkeit...",
      "Finalisiere Wachstumsprognose...",
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < texts.length) {
        setLoadingText(texts[i]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsLoading(false), 800);
      }
    }, 800);
  };

  const reset = () => {
    setStep(1);
    setIsLoading(false);
    setSelection({ industry: null, state: null, employees: null, painPoint: null, budget: null });
  };

  const calculateResult = () => {
    if (!selection.industry || !selection.state) return 0;
    
    const basePotential = selection.industry.industryAvg;
    const stateBonus = selection.state.bonus;
    const employeeFactor = selection.employees?.factor || 1.0;
    const budgetFactor = selection.budget?.factor || 1.0;
    
    let final = (basePotential + stateBonus) * employeeFactor * budgetFactor;
    
    // Add some randomness/variance based on pain point
    if (selection.painPoint?.id === "time") final += 5;
    if (selection.painPoint?.id === "leads") final += 8;

    return Math.min(99, Math.round(final));
  };

  const result = calculateResult();

  return (
    <div className="pt-20 min-h-screen bg-muted/30">
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Digitaler <span className="text-primary">Potenzial-Check</span></h1>
            <p className="text-xl text-muted-foreground">
              Präzise Analyse Ihres digitalen Wachstums-Potenzials.
            </p>
          </div>

          <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white min-h-[600px] flex flex-col">
            <CardContent className="p-8 md:p-12 flex-grow flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="text-center">
                      <span className="text-sm font-bold text-primary uppercase tracking-widest">Schritt 1 von 5</span>
                      <h2 className="text-3xl font-bold mt-2">In welcher Branche sind Sie tätig?</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {industries.map((ind) => (
                        <button
                          key={ind.id}
                          onClick={() => handleIndustrySelect(ind)}
                          className="flex items-center gap-3 p-4 rounded-xl border-2 border-muted hover:border-primary hover:bg-primary/5 transition-all text-left group"
                        >
                          <div className="p-2 bg-muted rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                            {ind.icon}
                          </div>
                          <span className="font-bold text-sm">{ind.name}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="text-center">
                      <button onClick={() => setStep(1)} className="text-sm text-muted-foreground hover:text-primary mb-2">← Zurück</button>
                      <br />
                      <span className="text-sm font-bold text-primary uppercase tracking-widest">Schritt 2 von 5</span>
                      <h2 className="text-3xl font-bold mt-2">Wie ist Ihr aktueller digitaler Stand?</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {digitalStates.map((state) => (
                        <button
                          key={state.id}
                          onClick={() => handleStateSelect(state)}
                          className="flex items-center justify-between p-6 rounded-2xl border-2 border-muted hover:border-primary hover:bg-primary/5 transition-all text-left group"
                        >
                          <span className="font-bold text-lg">{state.name}</span>
                          <ArrowRight className="text-muted-foreground group-hover:text-primary transition-colors" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="text-center">
                      <button onClick={() => setStep(2)} className="text-sm text-muted-foreground hover:text-primary mb-2">← Zurück</button>
                      <br />
                      <span className="text-sm font-bold text-primary uppercase tracking-widest">Schritt 3 von 5</span>
                      <h2 className="text-3xl font-bold mt-2">Wie viele Mitarbeiter hat Ihr Unternehmen?</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {employeeCounts.map((count) => (
                        <button
                          key={count.id}
                          onClick={() => handleEmployeeSelect(count)}
                          className="flex items-center gap-4 p-6 rounded-2xl border-2 border-muted hover:border-primary hover:bg-primary/5 transition-all text-left group"
                        >
                          <div className="p-3 bg-muted rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                            <Building2 size={24} />
                          </div>
                          <span className="font-bold text-lg">{count.name}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="text-center">
                      <button onClick={() => setStep(3)} className="text-sm text-muted-foreground hover:text-primary mb-2">← Zurück</button>
                      <br />
                      <span className="text-sm font-bold text-primary uppercase tracking-widest">Schritt 4 von 5</span>
                      <h2 className="text-3xl font-bold mt-2">Was ist Ihre größte Herausforderung?</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {painPoints.map((point) => (
                        <button
                          key={point.id}
                          onClick={() => handlePainPointSelect(point)}
                          className="flex items-center gap-4 p-6 rounded-2xl border-2 border-muted hover:border-primary hover:bg-primary/5 transition-all text-left group"
                        >
                          <div className="p-3 bg-muted rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                            {point.icon}
                          </div>
                          <span className="font-bold text-lg">{point.name}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="text-center">
                      <button onClick={() => setStep(4)} className="text-sm text-muted-foreground hover:text-primary mb-2">← Zurück</button>
                      <br />
                      <span className="text-sm font-bold text-primary uppercase tracking-widest">Schritt 5 von 5</span>
                      <h2 className="text-3xl font-bold mt-2">Geplantes monatliches Marketing-Budget?</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {budgets.map((budget) => (
                        <button
                          key={budget.id}
                          onClick={() => handleBudgetSelect(budget)}
                          className="flex items-center gap-4 p-6 rounded-2xl border-2 border-muted hover:border-primary hover:bg-primary/5 transition-all text-left group"
                        >
                          <div className="p-3 bg-muted rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                            <Euro size={24} />
                          </div>
                          <span className="font-bold text-lg">{budget.name}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 6 && isLoading && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center space-y-6"
                  >
                    <div className="relative inline-block">
                      <Loader2 size={64} className="text-primary animate-spin" />
                    </div>
                    <h2 className="text-2xl font-bold animate-pulse">{loadingText}</h2>
                    <p className="text-muted-foreground">Unsere Algorithmen berechnen Ihr individuelles Wachstumspotenzial...</p>
                  </motion.div>
                )}

                {step === 6 && !isLoading && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-10"
                  >
                    <div>
                      <div className="inline-flex p-4 bg-primary/10 rounded-full text-primary mb-6">
                        <TrendingUp size={48} />
                      </div>
                      <h2 className="text-4xl font-bold mb-4">Analyse abgeschlossen!</h2>
                      <p className="text-xl text-muted-foreground">
                        Für ein Unternehmen in der Branche <span className="text-foreground font-bold">{selection.industry?.name}</span> mit <span className="text-foreground font-bold">{selection.employees?.name}</span> liegt das Potenzial bei:
                      </p>
                    </div>

                    <div className="relative inline-block">
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12, delay: 0.2 }}
                        className="text-8xl md:text-9xl font-display font-black text-primary"
                      >
                        {result}%
                      </motion.div>
                      <div className="absolute -top-4 -right-12 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-bold rotate-12 shadow-lg">
                        Wachstum
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 text-left">
                      <div className="p-6 bg-muted/50 rounded-2xl">
                        <CheckCircle2 className="text-primary mb-3" />
                        <h4 className="font-bold mb-1">Markt-Vorteil</h4>
                        <p className="text-sm text-muted-foreground">Sie überholen ca. {Math.round(result * 0.75)}% Ihrer direkten Konkurrenz.</p>
                      </div>
                      <div className="p-6 bg-muted/50 rounded-2xl">
                        <Clock className="text-primary mb-3" />
                        <h4 className="font-bold mb-1">Effizienz</h4>
                        <p className="text-sm text-muted-foreground">Automatisierung spart Ihnen bis zu 20h/Woche.</p>
                      </div>
                      <div className="p-6 bg-muted/50 rounded-2xl">
                        <Zap className="text-primary mb-3" />
                        <h4 className="font-bold mb-1">ROI</h4>
                        <p className="text-sm text-muted-foreground">Signifikante Steigerung der Lead-Qualität erwartet.</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                      <Button nativeButton={false} render={<Link to="/kontakt" />} size="lg" className="rounded-full px-10 text-lg h-14">
                        Ergebnis im Detail besprechen
                      </Button>
                      <Button onClick={reset} variant="outline" size="lg" className="rounded-full px-10 text-lg h-14 gap-2">
                        <RefreshCw size={18} /> Erneut testen
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
