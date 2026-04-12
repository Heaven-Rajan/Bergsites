import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Zap, Cpu, ArrowRight } from "lucide-react";

const mockups = [
  {
    id: 1,
    title: "Premium E-Commerce",
    image: "https://picsum.photos/seed/minimal-shop/1200/800",
    color: "bg-primary",
    tag: "Performance",
    icon: <Zap size={20} />
  },
  {
    id: 2,
    title: "AI Dashboard",
    image: "https://picsum.photos/seed/tech-ui/1200/800",
    color: "bg-accent",
    tag: "Intelligence",
    icon: <Cpu size={20} />
  },
  {
    id: 3,
    title: "Corporate Identity",
    image: "https://picsum.photos/seed/modern-biz/1200/800",
    color: "bg-foreground",
    tag: "Security",
    icon: <Shield size={20} />
  }
];

export function WebsiteShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockups.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto perspective-1000 py-12">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9, rotateX: 5 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          exit={{ opacity: 0, scale: 1.1, rotateX: -5 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          {/* MacBook Mockup */}
          <div className="relative mx-auto w-full max-w-[800px]">
            {/* Screen */}
            <div className="relative bg-[#1a1a1a] rounded-t-2xl p-[1.5%] shadow-2xl border-x border-t border-[#333]">
              <div className="aspect-[16/10] bg-black rounded-lg overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={mockups[currentIndex].image}
                    src={mockups[currentIndex].image}
                    alt={mockups[currentIndex].title}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
                
                {/* Screen Glare */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10 pointer-events-none" />
              </div>
            </div>
            
            {/* Base */}
            <div className="relative h-4 bg-[#2a2a2a] rounded-b-xl border-x border-b border-[#333] shadow-xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#1a1a1a] rounded-b-md" />
            </div>
            <div className="mx-auto w-[90%] h-1 bg-black/20 blur-md rounded-full mt-2" />

            {/* Floating Info Card */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -right-8 top-1/2 -translate-y-1/2 glass-card p-6 rounded-3xl shadow-2xl border-white/20 z-20 hidden xl:block w-64"
            >
              <div className={`${mockups[currentIndex].color} w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg`}>
                {mockups[currentIndex].icon}
              </div>
              <h4 className="text-xl font-bold mb-2">{mockups[currentIndex].title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Maßgeschneiderte Lösungen für maximale Performance und Benutzerfreundlichkeit.
              </p>
              <div className="mt-4 flex items-center gap-2 text-primary font-bold text-sm">
                <span>Case Study</span>
                <ArrowRight size={14} />
              </div>
            </motion.div>
          </div>

          {/* Background Glow */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full ${mockups[currentIndex].color} opacity-10 blur-[120px] -z-10 rounded-full transition-colors duration-1000`} />
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
        {mockups.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`group relative h-2 transition-all duration-500 ${
              currentIndex === i ? "w-12 bg-primary" : "w-2 bg-muted-foreground/20 hover:bg-muted-foreground/40"
            } rounded-full`}
          >
             {currentIndex === i && (
               <motion.div 
                 layoutId="active-dot"
                 className="absolute inset-0 bg-primary rounded-full"
                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
               />
             )}
          </button>
        ))}
      </div>
    </div>
  );
}
