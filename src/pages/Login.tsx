import { useState } from "react";
import { motion } from "motion/react";
import { Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { isAdminEmail } from "../lib/admin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      navigate(isAdminEmail(user.email) ? "/admindashboard" : "/dashboard");
    } catch (err: any) {
      console.error("Login Error:", err);
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError("E-Mail oder Passwort ist falsch.");
      } else if (err.code === "auth/invalid-email") {
        setError("Ungültige E-Mail Adresse.");
      } else {
        setError("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center bg-muted/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl border border-muted p-10"
      >
        <div className="text-center mb-10">
          <img
            src="/bergsiteslogov1.png"
            alt="Bergsites Logo"
            className="w-16 h-16 rounded-2xl object-cover mx-auto mb-6 shadow-lg rotate-3"
          />

          <h1 className="text-3xl font-display font-black tracking-tighter mb-2">Kunden Login</h1>
          <p className="text-muted-foreground">Willkommen zurück im Bergsites Portal.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-medium">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-2">
            <label className="text-sm font-bold ml-1">E-Mail Adresse</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@firma.de"
                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-muted/50 border-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold ml-1">Passwort</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-muted/50 border-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-muted text-primary focus:ring-primary" />
              <span className="text-muted-foreground">Angemeldet bleiben</span>
            </label>
            <Link to="#" className="text-primary font-bold hover:underline">Passwort vergessen?</Link>
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>Anmelden <ArrowRight className="ml-2" size={20} /></>
            )}
          </Button>
        </form>

        <div className="mt-10 pt-8 border-t border-muted text-center">
          <p className="text-muted-foreground text-sm">
            Noch kein Kunde? <Link to="/kontakt" className="text-primary font-bold hover:underline">Jetzt Projekt anfragen</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
