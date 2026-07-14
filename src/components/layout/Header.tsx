import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sparkles, Rocket, Cpu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "../../lib/firebase";
import { isAdminEmail } from "../../lib/admin";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const services = [
  { title: "Webdesign", href: "/webdesign", desc: "Design, UX & Conversion Fokus." },
  { title: "Webentwicklung", href: "/webentwicklung", desc: "Technik, Performance & Aufbau." },
  { title: "Website-Relaunch", href: "/relaunch", desc: "Modernisierung bestehender Seiten." },
  { title: "Wartung & Support", href: "/wartung", desc: "Langfristige Sicherheit & Betreuung." },
  { title: "Automatisierung", href: "/automatisierung", desc: "n8n Workflows & Prozesse." },
  { title: "KI-Integration", href: "/ki-integration", desc: "AI, Chatbots & intelligente Systeme." },
  { title: "SEO & Performance", href: "/seo", desc: "Ladezeiten & Google Ranking." },
  { title: "Landingpages", href: "/landingpages", desc: "Conversion & Sales Fokus." },
  { title: "Backend-Systeme", href: "/backend-systeme", desc: "Custom APIs, interne Tools & Datenbanken." },
];

const buzzwords = ["AI Integration", "Process Automation", "Premium Webdesign", "Future-Proof Tech", "ROI Focused"];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [buzzwordIndex, setBuzzwordIndex] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    
    const interval = setInterval(() => {
      setBuzzwordIndex((prev) => (prev + 1) % buzzwords.length);
    }, 3000);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
      unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const isAIPage = location.pathname === "/ki-integration";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isAIPage ? 'dark-matter text-foreground' : ''}`}>
      {/* Superheader */}
      <div className={`h-10 flex items-center justify-center overflow-hidden transition-colors duration-500 ${isAIPage ? 'bg-primary/20 border-b border-primary/30' : 'bg-foreground text-white'}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={buzzwordIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]"
          >
            <Sparkles size={14} className="text-primary" />
            <span>{buzzwords[buzzwordIndex]}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={`transition-all duration-500 ${isScrolled ? (isAIPage ? "bg-background/80 backdrop-blur-xl border-b border-border py-3" : "bg-white/80 backdrop-blur-xl border-b border-muted py-3") : "py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/bergsiteslogov1.png"
              alt="Bergsites Logo"
              className={`w-10 h-10 rounded-xl object-cover transition-all duration-500 group-hover:rotate-12 ${isAIPage ? 'purple-glow' : ''}`}
            />
            <span className="font-display text-2xl font-black tracking-tighter">Bergsites</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                  <NavigationMenuLink render={<Link to="/" />} className="px-4 py-2 font-bold hover:text-primary transition-colors">
                    Home
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={`font-bold ${isAIPage ? 'bg-transparent hover:bg-white/5' : ''}`}>Leistungen</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className={`grid w-[500px] gap-3 p-6 ${isAIPage ? 'dark-matter bg-card border-border' : ''}`}>
                      {services.map((service) => (
                        <NavigationMenuLink
                          key={service.title}
                          render={<Link to={service.href} />}
                          className={`block p-4 rounded-2xl transition-all ${service.href === '/ki-integration' ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted'}`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold">{service.title}</span>
                            {service.href === '/ki-integration' && <Sparkles size={14} className="text-primary animate-pulse" />}
                          </div>
                          <p className="text-sm text-muted-foreground">{service.desc}</p>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink render={<Link to="/warum-wir" />} className="px-4 py-2 font-bold hover:text-primary transition-colors">
                    Warum wir
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink render={<Link to="/selbstcheck" />} className="px-4 py-2 font-bold hover:text-primary transition-colors">
                    Potenzial-Check
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink 
                    render={<Link to="/ki-integration" />} 
                    className={`relative px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest transition-all duration-500 overflow-hidden group text-white purple-glow border border-primary/30 bg-transparent`}
                  >
                    {/* Background Layer to cover the center of the neon gradient */}
                    <div className="absolute inset-[1px] bg-[#0a0a0c] rounded-full z-10" />

                    {/* Neon Thread Animation */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                      <motion.div
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,#bf40bf_360deg)] opacity-80"
                      />
                    </div>
                    
                    <span className="relative z-20 flex items-center gap-2">
                      <Cpu size={16} className="animate-spin-slow" />
                      AI Future
                    </span>
                    
                    <motion.div 
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 z-30"
                    />
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

            {user ? (
              <div className="flex items-center gap-4">
                {isAdminEmail(user.email) && (
                  <Button nativeButton={false} render={<Link to="/admindashboard" />} variant="outline" className="rounded-full px-6 font-bold border-primary/30 text-primary">
                    Admin
                  </Button>
                )}
                <Button nativeButton={false} render={<Link to="/dashboard" />} className={`rounded-full px-6 font-bold ${isAIPage ? 'bg-primary purple-glow' : ''}`}>
                  Dashboard
                </Button>
                <Button onClick={handleLogout} variant="outline" className={`rounded-full px-6 font-bold flex items-center gap-2 ${isAIPage ? 'border-primary/30' : ''}`}>
                  <LogOut size={18} /> Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Button nativeButton={false} render={<Link to="/kontakt" />} className={`rounded-full px-6 font-bold ${isAIPage ? 'bg-primary purple-glow' : ''}`}>
                  Projekt starten
                </Button>
                <Button nativeButton={false} render={<Link to="/login" />} variant="outline" className={`rounded-full px-6 font-bold ${isAIPage ? 'border-primary/30' : ''}`}>
                  Kunden Login
                </Button>
              </div>
            )}

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden p-2" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed inset-0 z-[60] flex flex-col p-8 ${isAIPage ? 'dark-matter bg-background' : 'bg-white'}`}
          >
            <div className="flex items-center justify-between mb-12">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                <img
                  src="/bergsiteslogov1.png"
                  alt="Bergsites Logo"
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <span className="font-display text-2xl font-black tracking-tighter">Bergsites</span>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                <X size={32} />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6">
              {[
                { label: "Home", href: "/" },
                { label: "Leistungen", href: "/leistungen" },
                { label: "Warum wir", href: "/warum-wir" },
                { label: "Potenzial-Check", href: "/selbstcheck" },
                { label: "AI Integration", href: "/ki-integration", special: true },
                ...(user ? [
                  { label: "Dashboard", href: "/dashboard" },
                  { label: "Logout", href: "#", onClick: handleLogout }
                ] : [
                  { label: "Kunden Login", href: "/login" }
                ]),
                { label: "Kontakt", href: "/kontakt" },
              ].map((item) => (
                item.onClick ? (
                  <button
                    key={item.label}
                    onClick={() => { item.onClick!(); setIsMobileMenuOpen(false); }}
                    className="text-3xl font-black tracking-tight text-left"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-3xl font-black tracking-tight ${item.special ? 'text-primary' : ''}`}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </nav>

            <div className="mt-auto">
              <Button nativeButton={false} render={<Link to="/kontakt" />} size="lg" className="w-full rounded-2xl h-16 text-xl">
                Projekt starten
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
