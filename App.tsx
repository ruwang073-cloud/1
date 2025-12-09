import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, Leaf, BookOpen, Briefcase, Landmark, PenTool, 
  Menu, X, Sparkles, AlertCircle, Info 
} from 'lucide-react';
import { RESOURCE_DATA, DESIGN_CONCEPTS } from './constants';
import { CategoryId } from './types';
import LinkCard from './components/LinkCard';
import AssistantModal from './components/AssistantModal';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CategoryId>('parks');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  // Load favorites on mount
  useEffect(() => {
    const saved = localStorage.getItem('linlv_favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // Save favorites
  const toggleFavorite = (id: string) => {
    const newFavs = favorites.includes(id) 
      ? favorites.filter(f => f !== id)
      : [...favorites, id];
    setFavorites(newFavs);
    localStorage.setItem('linlv_favorites', JSON.stringify(newFavs));
  };

  // Filter Logic
  const filteredData = useMemo(() => {
    // Flatten all items for search, or just use active tab
    const currentSection = RESOURCE_DATA.find(s => s.id === activeTab);
    
    // If we are in "Design Doc", we handle it separately in render
    if (activeTab === 'design_doc') return [];

    let items = currentSection ? currentSection.items : [];

    if (searchQuery.trim()) {
      // If searching, search across ALL categories
      const allItems = RESOURCE_DATA.flatMap(s => s.items);
      return allItems.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return items;
  }, [activeTab, searchQuery]);

  // Icons Mapping
  const getIcon = (name: string, size = 20) => {
    switch (name) {
      case 'Leaf': return <Leaf size={size} />;
      case 'Landmark': return <Landmark size={size} />;
      case 'BookOpen': return <BookOpen size={size} />;
      case 'Briefcase': return <Briefcase size={size} />;
      default: return <Leaf size={size} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F0Fdf9] font-sans text-slate-800 selection:bg-emerald-200">
      
      {/* Mobile Header */}
      <div className="lg:hidden bg-emerald-900 text-white border-b border-emerald-800 p-4 flex justify-between items-center sticky top-0 z-30 shadow-lg">
        <div className="flex items-center gap-2 font-bold text-xl tracking-wide">
          <Leaf className="fill-emerald-400 text-emerald-400" /> LinLv Nav
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-emerald-100 hover:text-white">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <div className="flex h-screen overflow-hidden">
        
        {/* Sidebar - Premium Dark Green */}
        <aside className={`
          fixed inset-y-0 left-0 z-40 w-72 bg-emerald-950 text-emerald-50 transform transition-transform duration-500 cubic-bezier(0.19, 1, 0.22, 1) lg:static lg:translate-x-0 shadow-2xl
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="h-full flex flex-col relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-emerald-900 to-transparent opacity-50 pointer-events-none" />
            
            <div className="p-8 relative z-10">
              <div className="flex items-center gap-3 text-white font-bold text-3xl tracking-tight mb-2">
                <div className="bg-emerald-500 p-2 rounded-xl shadow-lg shadow-emerald-900/50">
                   <Leaf className="fill-white text-white" size={24} />
                </div>
                <span>LinLv</span>
              </div>
              <p className="text-emerald-400 text-xs font-medium tracking-widest uppercase pl-1">CSUFT · Professional Nav</p>
            </div>

            <nav className="flex-1 px-4 py-2 space-y-2 overflow-y-auto relative z-10 custom-scrollbar">
              <div className="text-[10px] font-bold text-emerald-600 px-4 mb-3 uppercase tracking-widest">Discover</div>
              {RESOURCE_DATA.map((section) => (
                <button
                  key={section.id}
                  onClick={() => { setActiveTab(section.id); setIsMobileMenuOpen(false); setSearchQuery(''); }}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                    activeTab === section.id 
                      ? 'bg-gradient-to-r from-emerald-800 to-emerald-900 text-white shadow-lg shadow-emerald-950/20 border border-emerald-700/50' 
                      : 'text-emerald-300/70 hover:bg-emerald-900/50 hover:text-emerald-200'
                  }`}
                >
                  <span className={`${activeTab === section.id ? 'text-emerald-400' : 'text-emerald-600 group-hover:text-emerald-400'} transition-colors`}>
                    {getIcon(section.iconName, 22)}
                  </span>
                  <span className="font-medium">{section.label}</span>
                </button>
              ))}
              
              <div className="mt-8 pt-6 border-t border-emerald-900/50 mx-2">
                <div className="text-[10px] font-bold text-emerald-600 px-2 mb-3 uppercase tracking-widest">About</div>
                <button
                  onClick={() => { setActiveTab('design_doc'); setIsMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                    activeTab === 'design_doc'
                      ? 'bg-emerald-800/80 text-white shadow-lg border border-emerald-700/50'
                      : 'text-emerald-300/70 hover:bg-emerald-900/50 hover:text-emerald-200'
                  }`}
                >
                  <PenTool size={20} className={activeTab === 'design_doc' ? 'text-emerald-400' : 'text-emerald-600 group-hover:text-emerald-400'} />
                  <span className="font-medium">Design & Branding</span>
                </button>
              </div>
            </nav>

            <div className="p-4 relative z-10">
               <div className="bg-gradient-to-br from-teal-800 to-emerald-900 rounded-2xl p-5 border border-emerald-700/30 shadow-xl">
                 <div className="flex items-center gap-2 mb-3 text-emerald-200 font-semibold text-sm">
                   <Sparkles size={16} className="text-emerald-400" /> Research Assistant
                 </div>
                 <p className="text-xs text-emerald-400/80 mb-4 leading-relaxed">
                   Unlock insights on policies & journals with our AI helper.
                 </p>
                 <button 
                   onClick={() => setIsAssistantOpen(true)}
                   className="w-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 text-xs font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-900/20 active:scale-95"
                 >
                   Start Chat
                 </button>
               </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 relative overflow-hidden flex flex-col">
          
          {/* Real-world Background Image Layer */}
          <div className="absolute inset-0 z-0">
             {/* High-quality Nature/Forest Image */}
             <img 
               src="https://images.unsplash.com/photo-1501854140884-074cf2b21d25?q=80&w=2070&auto=format&fit=crop" 
               alt="National Park Background" 
               className="w-full h-full object-cover object-center"
             />
             {/* Advanced Overlay: Gradient + Blur for Readability */}
             <div className="absolute inset-0 bg-gradient-to-br from-[#f0fdf9]/95 via-[#f0fdf9]/90 to-[#ecfdf5]/80 backdrop-blur-[2px]"></div>
          </div>

          {/* Scrollable Content (Sits above background) */}
          <div className="flex-1 overflow-y-auto relative z-10 scroll-smooth">
            
            {/* Top Bar - Glassmorphism */}
            <header className="sticky top-0 z-20 bg-[#f0fdf9]/70 backdrop-blur-xl border-b border-emerald-100/50 px-8 py-5 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all">
              <div>
                <h1 className="text-2xl font-bold text-emerald-950 tracking-tight">
                  {activeTab === 'design_doc' ? 'Design Documentation' : 
                    searchQuery ? 'Search Results' : RESOURCE_DATA.find(s => s.id === activeTab)?.label}
                </h1>
                <p className="text-sm text-emerald-700/80 mt-1 font-medium hidden md:block">
                  {activeTab === 'design_doc' ? 'Project Requirements & Identity' : RESOURCE_DATA.find(s => s.id === activeTab)?.description}
                </p>
              </div>

              <div className="relative w-full md:w-96 group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="text-emerald-500/70 group-focus-within:text-emerald-700 transition-colors" size={20} />
                </div>
                <input 
                  type="text" 
                  placeholder="Search parks, policies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3 bg-white/60 border border-emerald-100/50 rounded-2xl text-sm placeholder-emerald-800/40 text-emerald-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/30 focus:bg-white transition-all shadow-sm shadow-emerald-900/5 outline-none"
                />
              </div>
            </header>

            <div className="p-6 md:p-10 max-w-[1600px] mx-auto min-h-[calc(100vh-100px)]">
              
              {/* Welcome Alert */}
              {showWelcome && (
                <div className="mb-10 bg-white/80 backdrop-blur-md border border-emerald-100/60 rounded-3xl p-6 flex items-start gap-4 relative animate-fade-in shadow-xl shadow-emerald-900/5 overflow-hidden">
                  <div className="absolute left-0 top-0 w-1.5 h-full bg-emerald-500"></div>
                  <div className="p-2 bg-emerald-50 rounded-2xl text-emerald-600">
                    <Info size={24} />
                  </div>
                  <div className="pr-10 pt-1">
                    <h4 className="font-bold text-emerald-950 text-base">Welcome to the Professional Navigator</h4>
                    <p className="text-sm text-emerald-700/80 mt-1 leading-relaxed">
                      Designed for CSUFT students. Access authoritative resources for National Parks management and Tourism research.
                    </p>
                  </div>
                  <button onClick={() => setShowWelcome(false)} className="absolute top-4 right-4 text-emerald-400 hover:text-emerald-600 transition-colors bg-transparent hover:bg-emerald-50 rounded-full p-2">
                    <X size={20} />
                  </button>
                </div>
              )}

              {/* Main Grid Render */}
              {activeTab !== 'design_doc' ? (
                <>
                  {filteredData.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
                      {filteredData.map(item => (
                        <LinkCard 
                          key={item.id} 
                          item={item} 
                          isFavorite={favorites.includes(item.id)}
                          onToggleFavorite={toggleFavorite}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-32 text-emerald-800/30">
                      <AlertCircle size={64} className="mb-6 opacity-40" />
                      <p className="text-xl font-medium tracking-tight text-emerald-900/50">No resources found</p>
                      <p className="text-base text-emerald-800/40 mt-2">Try adjusting your search terms.</p>
                    </div>
                  )}
                </>
              ) : (
                /* Design Doc Section */
                <div className="space-y-10 animate-fade-in pb-20">
                  <section className="bg-white/90 backdrop-blur-sm rounded-3xl border border-emerald-100/60 p-10 shadow-xl shadow-emerald-900/5">
                    <h2 className="text-3xl font-bold text-emerald-950 mb-8 flex items-center gap-3">
                      <PenTool className="text-emerald-600" size={32} /> Branding Strategy
                    </h2>
                    
                    <div className="grid lg:grid-cols-2 gap-12">
                      <div>
                        <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-6">Naming Options</h3>
                        <div className="space-y-5">
                          {DESIGN_CONCEPTS.names.map((n, i) => (
                            <div key={i} className="bg-[#fcfdfc] p-6 rounded-2xl border-l-4 border-emerald-500 shadow-sm hover:shadow-md transition-shadow">
                              <p className="font-bold text-xl text-emerald-950 mb-2">{n.name}</p>
                              <p className="text-sm text-emerald-700/70 leading-relaxed">{n.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-6">Visual Identity</h3>
                        <div className="bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] p-8 rounded-3xl space-y-8 border border-slate-100">
                          <div>
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full uppercase tracking-wider">Primary Color</span>
                              <div className="flex items-center gap-5 mt-4">
                                <div className="w-20 h-20 rounded-2xl bg-emerald-600 shadow-xl shadow-emerald-600/20 ring-4 ring-white"></div>
                                <div className="w-20 h-20 rounded-2xl bg-emerald-950 shadow-xl shadow-emerald-950/20 ring-4 ring-white"></div>
                                <div className="space-y-1">
                                  <p className="font-mono text-sm text-slate-500">#059669</p>
                                  <p className="font-bold text-slate-800">Forest Emerald</p>
                                </div>
                              </div>
                          </div>
                          <hr className="border-slate-200" />
                          <div>
                            <p className="font-bold text-slate-800 mb-2 text-lg">Logo Concept</p>
                            <p className="text-sm text-slate-600 leading-7">{DESIGN_CONCEPTS.logo.visual}</p>
                            <div className="mt-4 p-4 bg-white rounded-xl border border-slate-100 italic text-slate-500 text-sm">
                              "{DESIGN_CONCEPTS.logo.concept}"
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="bg-white/90 backdrop-blur-sm rounded-3xl border border-emerald-100/60 p-10 shadow-xl shadow-emerald-900/5">
                    <h2 className="text-2xl font-bold text-emerald-950 mb-8">UX Enhancements</h2>
                    <div className="grid sm:grid-cols-3 gap-6">
                      <div className="p-6 bg-gradient-to-br from-orange-50 to-white rounded-2xl border border-orange-100 shadow-sm hover:shadow-md transition-all">
                        <h4 className="font-bold text-orange-900 mb-3 text-lg">1. Global Search</h4>
                        <p className="text-sm text-orange-800/70 leading-relaxed">Real-time filtering across active databases with tag recognition.</p>
                      </div>
                      <div className="p-6 bg-gradient-to-br from-yellow-50 to-white rounded-2xl border border-yellow-100 shadow-sm hover:shadow-md transition-all">
                        <h4 className="font-bold text-yellow-900 mb-3 text-lg">2. Bookmarks</h4>
                        <p className="text-sm text-yellow-800/70 leading-relaxed">Persistent local storage implementation for saving key resources.</p>
                      </div>
                      <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-all">
                        <h4 className="font-bold text-blue-900 mb-3 text-lg">3. Access Levels</h4>
                        <p className="text-sm text-blue-800/70 leading-relaxed">Clear visual distinctions for Public vs Campus IP restricted content.</p>
                      </div>
                    </div>
                  </section>
                </div>
              )}
            </div>
            
            <footer className="p-8 text-center text-emerald-800/50 text-xs mt-auto font-medium relative z-10">
              © 2024 LinLv Nav for CSUFT. Designed for Tourism Management Students.
            </footer>
          </div>
        </main>
      </div>

      <AssistantModal isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
    </div>
  );
};

export default App;