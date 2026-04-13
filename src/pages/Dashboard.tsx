import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  FolderOpen, 
  HelpCircle, 
  ChevronRight, 
  Download, 
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  Plus,
  MoreVertical,
  Mountain,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { collection, query, where, onSnapshot, orderBy, limit, addDoc, serverTimestamp, Unsubscribe } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

// Types
enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string;
    email?: string | null;
    emailVerified?: boolean;
    isAnonymous?: boolean;
    tenantId?: string | null;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  // We don't throw here to avoid crashing the whole app, but we log it.
  return errInfo;
}

interface ProjectStep {
  label: string;
  description?: string;
  status: 'not-started' | 'in-progress' | 'completed';
}

interface Project {
  id: string;
  title: string;
  status: string;
  description: string;
  steps: ProjectStep[];
  ownerUid?: string;
}

interface AppDocument {
  id: string;
  title: string;
  url: string;
  type: 'invoice' | 'contract' | 'report';
  createdAt: any;
}

interface Asset {
  id: string;
  name: string;
  url: string;
  category: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface Message {
  id: string;
  text: string;
  senderUid: string;
  createdAt: any;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [documents, setDocuments] = useState<AppDocument[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    let unsubs: Unsubscribe[] = [];

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);
        
        // Clean up previous listeners if any
        unsubs.forEach(unsub => unsub());
        
        // Setup new listeners
        const uid = currentUser.uid;
        
        // Projects
        const qProjects = query(collection(db, "projects"), where("ownerUid", "==", uid));
        unsubs.push(onSnapshot(qProjects, 
          (snapshot) => setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project))),
          (err) => handleFirestoreError(err, OperationType.LIST, "projects")
        ));

        // Documents
        const qDocs = query(collection(db, "documents"), where("ownerUid", "==", uid), orderBy("createdAt", "desc"));
        unsubs.push(onSnapshot(qDocs, 
          (snapshot) => setDocuments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AppDocument))),
          (err) => handleFirestoreError(err, OperationType.LIST, "documents")
        ));

        // Assets
        const qAssets = query(collection(db, "assets"), where("ownerUid", "==", uid));
        unsubs.push(onSnapshot(qAssets, 
          (snapshot) => setAssets(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Asset))),
          (err) => handleFirestoreError(err, OperationType.LIST, "assets")
        ));

        // FAQs
        unsubs.push(onSnapshot(collection(db, "faqs"), 
          (snapshot) => setFaqs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FAQ))),
          (err) => handleFirestoreError(err, OperationType.LIST, "faqs")
        ));

        // Messages
        const qMsgs = query(
          collection(db, "messages"), 
          where("chatId", "==", uid),
          orderBy("createdAt", "asc"),
          limit(50)
        );
        unsubs.push(onSnapshot(qMsgs, 
          (snapshot) => {
            setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message)));
            setLoading(false);
          },
          (err) => handleFirestoreError(err, OperationType.LIST, "messages")
        ));
      }
    });

    return () => {
      unsubscribeAuth();
      unsubs.forEach(unsub => unsub());
    };
  }, [navigate]);

  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    try {
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        senderUid: user.uid,
        receiverUid: "admin",
        chatId: user.uid,
        createdAt: serverTimestamp()
      });
      setNewMessage("");
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, "messages");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const activeProject = projects[0];
  const projectSteps: ProjectStep[] = activeProject?.steps ?? [];
  const completedCount = projectSteps.filter(s => s.status === 'completed').length;
  const inProgressCount = projectSteps.filter(s => s.status === 'in-progress').length;
  const progress = projectSteps.length > 0
    ? Math.round(((completedCount + 0.5 * inProgressCount) / projectSteps.length) * 100)
    : 0;
  const activeStep = projectSteps.find(s => s.status === 'in-progress');

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#1a1a1a] font-sans selection:bg-primary/20">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-black tracking-tighter uppercase">Bergsites<span className="text-primary">.</span></span>
          </Link>
          <div className="h-6 w-px bg-[#e9ecef] hidden md:block" />
          <span className="text-muted-foreground font-medium text-sm hidden md:block">Nutzerkonto</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest mr-4 hidden sm:block">
            Zur Website
          </Link>
          <div className="hidden md:flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#e9ecef] shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">System Online</span>
          </div>
          <Button 
            variant="outline" 
            className="rounded-full px-6 font-bold border-2 border-[#e9ecef] hover:bg-[#e9ecef] transition-all flex items-center gap-2"
            onClick={() => {
              const chatSection = document.getElementById('chat-section');
              chatSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Zum Ansprechpartner <ChevronRight size={18} />
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column - 7/12 */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Milestone Status Card */}
            <section>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#343a40] text-white rounded-[2.5rem] p-10 shadow-2xl shadow-black/10 relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase tracking-widest text-white/40">Meilenstein Status</span>
                    <span className="text-xs font-black uppercase tracking-widest text-white/40 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                      Projekt ID: {activeProject?.id.slice(0, 8) || "---"}
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-6">
                    {activeProject?.title || "Kein aktives Projekt"}
                  </h2>

                  {activeStep && (
                    <div className="mb-10 p-5 bg-white/5 rounded-2xl border border-white/10 max-w-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-yellow-500">
                          Aktuell in Arbeit: {activeStep.label}
                        </span>
                      </div>
                      {activeStep.description && (
                        <p className="text-sm text-white/70 leading-relaxed">{activeStep.description}</p>
                      )}
                    </div>
                  )}
                  {!activeStep && activeProject?.description && (
                    <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-md">
                      {activeProject.description}
                    </p>
                  )}
                  {!activeProject && (
                    <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-md">
                      Hier siehst du den aktuellen Fortschritt deines Projekts. Wir halten dich über jeden Schritt auf dem Laufenden.
                    </p>
                  )}
                  
                  {/* Overlapping Status Windows */}
                  <div className="relative mb-12 py-4">
                    {/* The Line */}
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 -translate-y-1/2 rounded-full" />
                    
                    {/* The Steps */}
                    <div className="relative flex justify-between items-center">
                      {(activeProject?.steps || [
                        { label: "Konzept", status: "completed" },
                        { label: "Design", status: "in-progress" },
                        { label: "Entwicklung", status: "not-started" },
                        { label: "Launch", status: "not-started" }
                      ]).map((step, idx) => {
                        const getStatusColor = (status: string) => {
                          switch(status) {
                            case 'completed': return '#22c55e'; // Green
                            case 'in-progress': return '#eab308'; // Yellow
                            case 'not-started': return '#ef4444'; // Red
                            default: return '#495057';
                          }
                        };

                        const stepAny = step as ProjectStep;
                        return (
                          <div key={idx} className="relative flex flex-col items-center group">
                            {/* The Circle */}
                            <motion.div
                              initial={false}
                              animate={{
                                scale: step.status === 'in-progress' ? 1.2 : 1,
                                backgroundColor: getStatusColor(step.status)
                              }}
                              className={`w-10 h-10 rounded-full border-4 border-[#343a40] flex items-center justify-center transition-all z-10 shadow-lg cursor-help ${step.status === 'in-progress' ? 'ring-4 ring-yellow-500/30' : ''}`}
                            >
                              {step.status === 'completed' ? (
                                <CheckCircle2 size={18} className="text-white" />
                              ) : (
                                <span className="text-xs font-bold text-white">
                                  {idx + 1}
                                </span>
                              )}
                            </motion.div>

                            {/* Hover Tooltip */}
                            <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30 w-56">
                              <div className="bg-white text-[#343a40] rounded-2xl shadow-2xl border border-[#e9ecef] p-4">
                                <div className="flex items-center gap-2 mb-1">
                                  <div
                                    className="w-2 h-2 rounded-full shrink-0"
                                    style={{ backgroundColor: getStatusColor(step.status) }}
                                  />
                                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                    {step.status === 'completed' ? 'Abgeschlossen' : step.status === 'in-progress' ? 'In Arbeit' : 'Offen'}
                                  </span>
                                </div>
                                <div className="text-sm font-bold mb-1">{stepAny.label}</div>
                                <div className="text-xs text-muted-foreground leading-relaxed">
                                  {stepAny.description || 'Keine Details hinterlegt.'}
                                </div>
                              </div>
                              <div className="w-3 h-3 bg-white border-r border-b border-[#e9ecef] rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1.5" />
                            </div>

                            {/* The Label */}
                            <div className={`absolute -bottom-8 whitespace-nowrap text-[10px] font-black uppercase tracking-widest transition-colors ${step.status !== 'not-started' ? 'text-white' : 'text-white/40'}`}>
                              {step.label}
                            </div>

                            {/* Glow Effect for active step */}
                            {step.status === 'in-progress' && (
                              <motion.div 
                                layoutId="active-glow"
                                className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full -z-10"
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Progress Bar (Secondary) */}
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Gesamtfortschritt</span>
                        <div className="text-2xl font-black">{Math.round(progress)}%</div>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-white/60 flex items-center gap-2 mb-1">
                        <div className={`w-2 h-2 rounded-full animate-pulse ${
                          activeProject?.status === 'Abgeschlossen' ? 'bg-green-500' : 'bg-yellow-500'
                        }`} /> {activeProject?.status || "In Bearbeitung"}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Decorative background element */}
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/10 blur-[120px] rounded-full" />
              </motion.div>
            </section>

            {/* Documents Section */}
            <section>
              <div className="grid grid-cols-2 gap-6">
                {documents.length > 0 ? (
                  documents.slice(0, 2).map((doc) => (
                    <motion.div 
                      key={doc.id}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-[2rem] p-8 shadow-sm border border-[#e9ecef] flex flex-col items-center text-center group cursor-pointer"
                    >
                      <div className="w-16 h-16 bg-[#f8f9fa] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                        <FileText size={32} className="text-[#343a40] group-hover:text-primary transition-colors" />
                      </div>
                      <h3 className="font-bold text-lg mb-1">{doc.title}</h3>
                      <p className="text-sm text-muted-foreground mb-6">Herunterladen</p>
                      <div className="mt-auto">
                        <div className="w-10 h-10 rounded-full border-2 border-[#e9ecef] flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-all">
                          <Download size={18} />
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <>
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-[#e9ecef] flex flex-col items-center text-center opacity-50">
                      <div className="w-16 h-16 bg-[#f8f9fa] rounded-2xl flex items-center justify-center mb-6">
                        <FileText size={32} className="text-[#343a40]" />
                      </div>
                      <h3 className="font-bold text-lg mb-1">Rechnung</h3>
                      <p className="text-sm text-muted-foreground">Noch nicht verfügbar</p>
                    </div>
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-[#e9ecef] flex flex-col items-center text-center opacity-50">
                      <div className="w-16 h-16 bg-[#f8f9fa] rounded-2xl flex items-center justify-center mb-6">
                        <FileText size={32} className="text-[#343a40]" />
                      </div>
                      <h3 className="font-bold text-lg mb-1">Antrag</h3>
                      <p className="text-sm text-muted-foreground">Noch nicht verfügbar</p>
                    </div>
                  </>
                )}
              </div>
            </section>

            {/* Logout */}
            <section className="pt-12 border-t border-[#e9ecef] flex items-center justify-end">
              <div className="text-right">
                <h3 className="font-bold text-lg mb-4">Abmelden</h3>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-3 text-muted-foreground hover:text-red-500 transition-colors group ml-auto"
                >
                  <span className="text-sm font-medium">Du wirst abgemeldet</span>
                  <div className="w-10 h-10 rounded-xl border-2 border-[#e9ecef] flex items-center justify-center group-hover:border-red-500 group-hover:text-red-500 transition-all">
                    <LogOut size={18} />
                  </div>
                </button>
              </div>
            </section>
          </div>

          {/* Right Column - 5/12 */}
          <div className="lg:col-span-5 space-y-12">
            
            {/* FAQ Section */}
            <section>
              <h2 className="text-xl font-bold mb-2">Häufige Fragen</h2>
              <p className="text-sm text-primary font-medium mb-8">Alles Wichtige im Überblick.</p>
              
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.id} className="border-b border-[#e9ecef] last:border-0">
                    <button 
                      onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                      className="w-full py-4 flex items-center justify-between text-left group"
                    >
                      <span className={`font-medium transition-colors ${openFaq === faq.id ? 'text-primary' : 'text-muted-foreground group-hover:text-[#1a1a1a]'}`}>
                        {faq.question}
                      </span>
                      <ChevronRight size={18} className={`transition-transform ${openFaq === faq.id ? 'rotate-90 text-primary' : 'text-muted-foreground'}`} />
                    </button>
                    <AnimatePresence>
                      {openFaq === faq.id && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="pb-6 text-sm text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                {faqs.length === 0 && (
                  <div className="space-y-4 opacity-40">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="py-4 border-b border-[#e9ecef] flex justify-between">
                        <div className="h-4 bg-[#e9ecef] w-3/4 rounded" />
                        <ChevronRight size={18} className="text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Chat & Assets Split */}
            <div className="grid grid-cols-1 gap-8">
              {/* Chat Card */}
              <section id="chat-section" className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-[#e9ecef] h-[400px] flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                    <MessageSquare size={20} />
                  </div>
                  <h3 className="font-bold">Persönlicher Ansprechpartner</h3>
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-4 mb-6 no-scrollbar">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.senderUid === user?.uid ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${
                        msg.senderUid === user?.uid 
                          ? 'bg-primary text-white rounded-tr-none' 
                          : 'bg-[#f8f9fa] text-[#343a40] rounded-tl-none'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input 
                    type="text" 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Nachricht..."
                    className="flex-1 bg-[#f8f9fa] border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary transition-all"
                  />
                  <Button type="submit" size="icon" className="rounded-xl w-12 h-12">
                    <Send size={18} />
                  </Button>
                </form>
              </section>

              {/* Assets Section */}
              <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-[#e9ecef]">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#343a40] rounded-xl flex items-center justify-center text-white">
                      <FolderOpen size={20} />
                    </div>
                    <h3 className="font-bold">Assets</h3>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {assets.slice(0, 2).map((asset) => (
                    <div key={asset.id} className="aspect-square bg-[#f8f9fa] rounded-2xl overflow-hidden relative group">
                      <img 
                        src={asset.url} 
                        alt={asset.name} 
                        className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Download size={20} className="text-white" />
                      </div>
                    </div>
                  ))}
                  {assets.length === 0 && (
                    <>
                      <div className="aspect-square bg-[#f8f9fa] rounded-2xl border-2 border-dashed border-[#e9ecef]" />
                      <div className="aspect-square bg-[#f8f9fa] rounded-2xl border-2 border-dashed border-[#e9ecef]" />
                    </>
                  )}
                </div>
              </section>
            </div>

          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-[#e9ecef] flex items-center justify-between text-xs text-muted-foreground font-medium uppercase tracking-widest">
        <span>© 2026 Bergsites.de</span>
        <div className="flex items-center gap-8">
          <a href="#" className="hover:text-primary transition-colors">Kontakt</a>
          <a href="#" className="hover:text-primary transition-colors">Rechtliches</a>
        </div>
      </footer>
    </div>
  );
}
