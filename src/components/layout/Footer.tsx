import { Link } from "react-router-dom";
import { Mountain, Mail, MapPin, Phone, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg text-white">
              <Mountain size={24} />
            </div>
            <span className="font-display text-2xl font-bold tracking-tight">Bergsites</span>
          </Link>
          <p className="text-muted-foreground max-w-xs">
            Premium Webdesign & Automatisierung. Wir bringen Ihr Unternehmen digital auf das nächste Level.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary transition-colors">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg font-bold mb-6">Leistungen</h4>
          <ul className="space-y-4 text-muted-foreground">
            <li><Link to="/webdesign" className="hover:text-primary transition-colors">Webdesign</Link></li>
            <li><Link to="/webentwicklung" className="hover:text-primary transition-colors">Webentwicklung</Link></li>
            <li><Link to="/automatisierung" className="hover:text-primary transition-colors">Automatisierung</Link></li>
            <li><Link to="/ki-integration" className="hover:text-primary transition-colors">KI-Integration</Link></li>
            <li><Link to="/leistungen" className="hover:text-primary transition-colors">Website-Relaunch</Link></li>
            <li><Link to="/leistungen" className="hover:text-primary transition-colors">SEO & Performance</Link></li>
            <li><Link to="/leistungen" className="hover:text-primary transition-colors">Alle Leistungen</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-bold mb-6">Agentur</h4>
          <ul className="space-y-4 text-muted-foreground">
            <li><Link to="/ueber-uns" className="hover:text-primary transition-colors">Über uns</Link></li>
            <li><Link to="/warum-wir" className="hover:text-primary transition-colors">Warum wir</Link></li>
            <li><Link to="/referenzen" className="hover:text-primary transition-colors">Referenzen</Link></li>
            <li><Link to="/preise" className="hover:text-primary transition-colors">Preise</Link></li>
            <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            <li><Link to="/selbstcheck" className="hover:text-primary transition-colors font-bold text-primary">Potenzial-Check</Link></li>
            <li><Link to="/kontakt" className="hover:text-primary transition-colors">Kontakt</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-bold mb-6">Kontakt</h4>
          <ul className="space-y-4 text-muted-foreground">
            <li className="flex items-start gap-3">
              <MapPin size={20} className="text-primary shrink-0" />
              <span>Deutschland</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={20} className="text-primary shrink-0" />
              <span>hallo@bergsites.de</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={20} className="text-primary shrink-0" />
              <span>+49 (0) 123 456789</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
        <p>© {currentYear} Bergsites. Alle Rechte vorbehalten.</p>
        <div className="flex gap-6">
          <Link to="/impressum" className="hover:text-white transition-colors">Impressum</Link>
          <Link to="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
        </div>
      </div>
    </footer>
  );
}
