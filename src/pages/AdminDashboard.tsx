import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  MessageSquare, 
  Download, 
  FolderOpen, 
  FileText, 
  Send,
  ChevronDown,
  ChevronUp,
  X,
  Upload,
  Lock
} from 'lucide-react';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDoc,
  setDoc,
  serverTimestamp,
  orderBy,
  getDocs
} from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../lib/firebase';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ProjectStep {
  label: string;
  status: 'not-started' | 'in-progress' | 'completed';
}

interface Project {
  id: string;
  title: string;
  status: string;
  description: string;
  ownerUid: string;
  steps: ProjectStep[];
}

interface AppUser {
  uid: string;
  email: string;
  displayName: string;
}

interface Message {
  id: string;
  text: string;
  senderUid: string;
  createdAt: any;
}

interface AppDocument {
  id: string;
  title: string;
  url: string;
  type: string;
  ownerUid: string;
}

interface Asset {
  id: string;
  name: string;
  url: string;
  ownerUid: string;
}

const AdminDashboard = () => {
  console.log("AdminDashboard rendering...");
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<AppUser | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [documents, setDocuments] = useState<AppDocument[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [isMilestoneCreatorOpen, setIsMilestoneCreatorOpen] = useState(false);
  
  // New Milestone Form
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectStepsCount, setNewProjectStepsCount] = useState(4);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user) {
        // Check for specific admin emails
        const isHardcodedAdmin = user.email === 'galaxiegameri@gmail.com' || user.email === 'admin@bergsites.com';
        
        if (isHardcodedAdmin) {
          setIsAdminUser(true);
        } else {
          // Check Firestore for role
          try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists() && userDoc.data().role === 'admin') {
              setIsAdminUser(true);
            } else {
              setIsAdminUser(false);
            }
          } catch (e) {
            setIsAdminUser(false);
          }
        }
      } else {
        setIsAdminUser(false);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError(null);
    try {
      await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
      // Auth state listener will handle the rest
    } catch (err: any) {
      console.error("Admin Login Error:", err);
      setLoginError("Login fehlgeschlagen. Bitte Daten prüfen.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Fetch projects for selected user
  useEffect(() => {
    if (!selectedUser) return;

    const q = query(collection(db, 'projects'), where('ownerUid', '==', selectedUser.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project)));
    });

    return () => unsubscribe();
  }, [selectedUser]);

  // Fetch documents for selected user
  useEffect(() => {
    if (!selectedUser) return;

    const q = query(collection(db, 'documents'), where('ownerUid', '==', selectedUser.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setDocuments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AppDocument)));
    });

    return () => unsubscribe();
  }, [selectedUser]);

  // Fetch assets for selected user
  useEffect(() => {
    if (!selectedUser) return;

    const q = query(collection(db, 'assets'), where('ownerUid', '==', selectedUser.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAssets(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Asset)));
    });

    return () => unsubscribe();
  }, [selectedUser]);

  // Fetch messages for selected user
  useEffect(() => {
    if (!selectedUser) return;

    const q = query(
      collection(db, 'messages'), 
      where('chatId', '==', selectedUser.uid),
      orderBy('createdAt', 'asc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message)));
    });

    return () => unsubscribe();
  }, [selectedUser]);

  const handleSearch = async () => {
    if (!searchQuery) return;
    
    try {
      console.log("Searching for:", searchQuery, "as", auth.currentUser?.email);
      // 1. Try searching by email in 'users' collection
      const q = query(collection(db, 'users'), where('email', '==', searchQuery));
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        const userData = snapshot.docs[0].data() as AppUser;
        setSelectedUser({ ...userData, uid: snapshot.docs[0].id });
        return;
      }

      // 2. Try searching by direct Document ID (UID)
      const userDoc = await getDoc(doc(db, 'users', searchQuery));
      if (userDoc.exists()) {
        const userData = userDoc.data() as AppUser;
        setSelectedUser({ ...userData, uid: userDoc.id });
        return;
      }

      // 3. Fallback: If it looks like a UID or Email, create a temporary user object
      // This allows managing users who exist in Auth but don't have a Firestore doc yet
      if (searchQuery.includes('@') || searchQuery.length >= 20) {
        const isEmail = searchQuery.includes('@');
        const newUser: AppUser = {
          uid: isEmail ? '' : searchQuery, // We'll need to be careful here
          email: isEmail ? searchQuery : '',
          displayName: isEmail ? searchQuery.split('@')[0] : 'Kunde (' + searchQuery.substring(0, 5) + '...)'
        };
        
        // If it's a UID, we can use it directly
        if (!isEmail) {
          newUser.uid = searchQuery;
        }

        setSelectedUser(newUser);
        
        // Auto-create the user document if it's a UID to make it "official"
        if (!isEmail) {
          try {
            await setDoc(doc(db, 'users', searchQuery), {
              uid: searchQuery,
              email: isEmail ? searchQuery : 'kunde@beispiel.de',
              displayName: newUser.displayName,
              role: 'client',
              createdAt: serverTimestamp()
            }, { merge: true });
          } catch (e) {
            console.warn("Could not auto-create user doc (might be permission issue):", e);
          }
        }
      } else {
        alert('Benutzer nicht gefunden. Bitte gib eine vollständige E-Mail oder UID ein.');
      }
    } catch (error) {
      console.error("Search error:", error);
      alert('Fehler bei der Suche. Details in der Konsole.');
    }
  };

  const createProject = async () => {
    if (!selectedUser || !newProjectTitle) return;

    const steps: ProjectStep[] = Array.from({ length: newProjectStepsCount }, (_, i) => ({
      label: `Schritt ${i + 1}`,
      status: 'not-started'
    }));

    await addDoc(collection(db, 'projects'), {
      title: newProjectTitle,
      status: 'In Planung',
      description: 'Neues Projekt erstellt',
      ownerUid: selectedUser.uid,
      steps,
      updatedAt: serverTimestamp()
    });

    setNewProjectTitle('');
    setIsMilestoneCreatorOpen(false);
  };

  const updateStepStatus = async (projectId: string, stepIndex: number, newStatus: ProjectStep['status']) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const newSteps = [...project.steps];
    newSteps[stepIndex].status = newStatus;

    await updateDoc(doc(db, 'projects', projectId), {
      steps: newSteps,
      updatedAt: serverTimestamp()
    });
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedUser || !auth.currentUser) return;

    await addDoc(collection(db, 'messages'), {
      text: newMessage,
      senderUid: auth.currentUser.uid,
      receiverUid: selectedUser.uid,
      chatId: selectedUser.uid,
      createdAt: serverTimestamp()
    });

    setNewMessage('');
  };

  const deleteItem = async (col: string, id: string) => {
    if (confirm('Wirklich löschen?')) {
      await deleteDoc(doc(db, col, id));
    }
  };

  const uploadMockFile = async (type: 'asset' | 'document') => {
    if (!selectedUser) return;
    
    const name = prompt(`Name für ${type === 'asset' ? 'Asset' : 'Rechnung'}:`);
    if (!name) return;

    if (type === 'asset') {
      await addDoc(collection(db, 'assets'), {
        name,
        url: `https://picsum.photos/seed/${name}/800/600`,
        ownerUid: selectedUser.uid
      });
    } else {
      await addDoc(collection(db, 'documents'), {
        title: name,
        url: '#',
        type: 'invoice',
        ownerUid: selectedUser.uid,
        createdAt: serverTimestamp()
      });
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!isAdminUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl border border-[#e9ecef] p-10"
        >
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg rotate-3">
              <Lock className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-black tracking-tighter mb-2 uppercase">Admin Login</h1>
            <p className="text-muted-foreground">Bergsites Management Panel</p>
          </div>

          {currentUser && !isAdminUser && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-100 text-amber-700 rounded-2xl text-sm font-medium">
              Angemeldet als {currentUser.email}, aber kein Admin-Zugriff.
            </div>
          )}

          {loginError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-medium">
              {loginError}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">E-Mail</label>
              <input 
                type="email" 
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@bergsites.com"
                className="w-full h-14 px-6 rounded-2xl bg-[#f8f9fa] border-2 border-transparent focus:border-primary outline-none transition-all font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Passwort</label>
              <input 
                type="password" 
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-14 px-6 rounded-2xl bg-[#f8f9fa] border-2 border-transparent focus:border-primary outline-none transition-all font-medium"
              />
            </div>

            <Button 
              type="submit" 
              disabled={isLoggingIn}
              className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20"
            >
              {isLoggingIn ? "Wird geladen..." : "Einloggen"}
            </Button>
          </form>

          {currentUser && (
            <button 
              onClick={() => auth.signOut()}
              className="w-full mt-6 text-sm font-bold text-muted-foreground hover:text-primary transition-colors"
            >
              Abmelden
            </button>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#343a40] font-sans p-8">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">
            Admin<span className="text-primary">.</span>Panel
          </h1>
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mt-1">
            Kunde: <span className="text-[#343a40]">{selectedUser?.displayName || selectedUser?.email || "Kein Kunde ausgewählt"}</span>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text" 
              placeholder="Email oder ID eingeben..."
              className="pl-12 pr-6 py-3 bg-white border-2 border-[#e9ecef] rounded-full w-80 focus:outline-none focus:border-primary transition-all font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button onClick={handleSearch} className="rounded-full px-8 font-bold">Suchen</Button>
        </div>
      </div>

      {!selectedUser ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-muted-foreground">
          <Search size={64} className="mb-4 opacity-20" />
          <p className="text-xl font-bold">Suche einen Kunden, um ihn zu verwalten</p>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-8">
          
          {/* Left Column: Assets & Invoices */}
          <div className="col-span-3 space-y-8">
            {/* Assets */}
            <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-[#e9ecef]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <FolderOpen size={20} className="text-primary" />
                  <h3 className="font-bold">Assets</h3>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full" onClick={() => uploadMockFile('asset')}>
                  <Plus size={20} />
                </Button>
              </div>
              <div className="space-y-3">
                {assets.map(asset => (
                  <div key={asset.id} className="flex items-center justify-between p-3 bg-[#f8f9fa] rounded-xl group">
                    <span className="text-sm font-medium truncate max-w-[150px]">{asset.name}</span>
                    <button onClick={() => deleteItem('assets', asset.id)} className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                {assets.length === 0 && <p className="text-xs text-muted-foreground text-center py-4">Keine Assets</p>}
              </div>
            </section>

            {/* Invoices */}
            <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-[#e9ecef]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-primary" />
                  <h3 className="font-bold">Rechnungen</h3>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full" onClick={() => uploadMockFile('document')}>
                  <Plus size={20} />
                </Button>
              </div>
              <div className="space-y-3">
                {documents.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between p-3 bg-[#f8f9fa] rounded-xl group">
                    <span className="text-sm font-medium truncate max-w-[150px]">{doc.title}</span>
                    <button onClick={() => deleteItem('documents', doc.id)} className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                {documents.length === 0 && <p className="text-xs text-muted-foreground text-center py-4">Keine Rechnungen</p>}
              </div>
            </section>
          </div>

          {/* Center Column: Milestones */}
          <div className="col-span-6 space-y-8">
            {/* Current Milestone View (Preview) */}
            <section className="bg-[#343a40] text-white rounded-[2.5rem] p-8 shadow-xl">
              <h3 className="text-sm font-black uppercase tracking-widest text-white/40 mb-6">Vorschau Kundenansicht</h3>
              {projects.length > 0 ? (
                <div className="relative py-4">
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 -translate-y-1/2 rounded-full" />
                  <div className="relative flex justify-between items-center">
                    {projects[0].steps.map((step, idx) => (
                      <div key={idx} className="w-8 h-8 rounded-full border-4 border-[#343a40] flex items-center justify-center z-10" style={{ 
                        backgroundColor: step.status === 'completed' ? '#22c55e' : step.status === 'in-progress' ? '#eab308' : '#ef4444' 
                      }}>
                        {step.status === 'completed' && <CheckCircle2 size={14} className="text-white" />}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-center py-8 text-white/40">Kein aktives Projekt</p>
              )}
            </section>

            {/* Milestone Management */}
            <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-[#e9ecef]">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-bold text-xl">Statusleisten verwalten</h3>
                <Button 
                  variant="outline" 
                  className="rounded-full border-2"
                  onClick={() => setIsMilestoneCreatorOpen(!isMilestoneCreatorOpen)}
                >
                  {isMilestoneCreatorOpen ? <X size={18} /> : <Plus size={18} className="mr-2" />}
                  {isMilestoneCreatorOpen ? "Schließen" : "Neu erstellen"}
                </Button>
              </div>

              <AnimatePresence>
                {isMilestoneCreatorOpen && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mb-8 p-6 bg-[#f8f9fa] rounded-3xl border-2 border-dashed border-[#e9ecef]"
                  >
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Name der Statusleiste</label>
                        <input 
                          type="text" 
                          className="w-full p-3 rounded-xl border-2 border-[#e9ecef] focus:border-primary outline-none"
                          placeholder="z.B. Webdesign Projekt"
                          value={newProjectTitle}
                          onChange={(e) => setNewProjectTitle(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Anzahl Meilensteine</label>
                        <input 
                          type="number" 
                          min="1" 
                          max="10"
                          className="w-full p-3 rounded-xl border-2 border-[#e9ecef] focus:border-primary outline-none"
                          value={newProjectStepsCount}
                          onChange={(e) => setNewProjectStepsCount(parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                    <Button className="w-full rounded-xl py-6 font-bold" onClick={createProject}>Erstellen</Button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-6">
                {projects.map(project => (
                  <div key={project.id} className="p-6 bg-[#f8f9fa] rounded-3xl border border-[#e9ecef]">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="font-bold">{project.title}</h4>
                      <Button variant="ghost" size="icon" className="text-red-500" onClick={() => deleteItem('projects', project.id)}>
                        <Trash2 size={18} />
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {project.steps.map((step, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-2xl border border-[#e9ecef]">
                          <span className="text-sm font-bold">{step.label}</span>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => updateStepStatus(project.id, idx, 'not-started')}
                              className={`w-6 h-6 rounded-full border-2 ${step.status === 'not-started' ? 'bg-red-500 border-red-500' : 'border-red-200'}`}
                            />
                            <button 
                              onClick={() => updateStepStatus(project.id, idx, 'in-progress')}
                              className={`w-6 h-6 rounded-full border-2 ${step.status === 'in-progress' ? 'bg-yellow-500 border-yellow-500' : 'border-yellow-200'}`}
                            />
                            <button 
                              onClick={() => updateStepStatus(project.id, idx, 'completed')}
                              className={`w-6 h-6 rounded-full border-2 ${step.status === 'completed' ? 'bg-green-500 border-green-500' : 'border-green-200'}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Chat */}
          <div className="col-span-3">
            <motion.div 
              layout
              initial={false}
              className={`fixed bottom-8 right-8 bg-white rounded-[2.5rem] shadow-2xl border border-[#e9ecef] overflow-hidden flex flex-col transition-all duration-500 z-50 ${
                isChatExpanded ? 'w-[450px] h-[650px]' : 'w-24 h-24 hover:scale-110 cursor-pointer'
              }`}
              whileHover={!isChatExpanded ? { scale: 1.15 } : {}}
              whileTap={!isChatExpanded ? { scale: 0.95 } : {}}
              onClick={() => !isChatExpanded && setIsChatExpanded(true)}
            >
              {!isChatExpanded ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-primary gap-1">
                  <MessageSquare size={32} />
                  <span className="text-[10px] font-black uppercase tracking-tighter">Chat</span>
                </div>
              ) : (
                <>
                  <div className="p-6 bg-[#343a40] text-white flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <MessageSquare size={20} />
                      <h3 className="font-bold">Chat mit {selectedUser.displayName || "Kunde"}</h3>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); setIsChatExpanded(false); }} className="text-white/60 hover:text-white">
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#f8f9fa]">
                    {messages.map(msg => (
                      <div key={msg.id} className={`flex ${msg.senderUid === auth.currentUser?.uid ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                          msg.senderUid === auth.currentUser?.uid 
                            ? 'bg-primary text-white rounded-tr-none' 
                            : 'bg-white border border-[#e9ecef] rounded-tl-none'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 bg-white border-t border-[#e9ecef]">
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Nachricht..."
                        className="flex-1 bg-[#f8f9fa] border-2 border-[#e9ecef] rounded-xl px-4 py-2 focus:outline-none focus:border-primary"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                      />
                      <Button size="icon" className="rounded-xl" onClick={sendMessage}>
                        <Send size={18} />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>

        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
