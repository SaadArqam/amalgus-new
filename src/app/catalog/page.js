"use client";
import { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { glassProducts } from '@/data/glassProducts';
import { useToast } from '@/components/ToastProvider';
import ProductSkeleton from '@/components/ProductSkeleton';

function CatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();
  const [filters, setFilters] = useState({
    type: "",
    thickness: "",
    application: "",
  });

  useEffect(() => {
    const q = searchParams.get('search');
    if (q) {
      setSearchQuery(decodeURIComponent(q));
    }
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [searchParams]);

  const uniqueThickness = [...new Set(glassProducts.map(p => p.thickness))];
  const uniqueApplications = [...new Set(glassProducts.map(p => p.application))];

  const filteredProducts = useMemo(() => {
    return glassProducts.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesType = !filters.type || p.name === filters.type;
      const matchesThickness = !filters.thickness || p.thickness === filters.thickness;
      const matchesApp = !filters.application || p.application === filters.application;
      
      return matchesSearch && matchesType && matchesThickness && matchesApp;
    });
  }, [searchQuery, filters]);

  const toggleFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key] === value ? "" : value
    }));
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24">
      <div className="max-w-[1440px] mx-auto px-6">
        
        <div className="mb-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Glass Products <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400">Catalog</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Discover our complete range of architectural glass solutions for every project need
            </p>
          </div>
          
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute inset-y-0 left-6 flex items-center text-slate-500">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Search glass types or tags..." 
              className="w-full pl-20 pr-8 py-6 bg-slate-900/50 border border-slate-700 rounded-3xl outline-none focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500/50 text-white placeholder-slate-500 text-lg transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 pb-24">
          <aside className="lg:w-80 space-y-10">
            <div className="bg-slate-900/30 rounded-3xl p-8 border border-slate-800">
              <h3 className="text-lg font-black text-white mb-8 uppercase tracking-widest text-sm">Filters</h3>
              
              <div className="mb-10">
                <h4 className="text-sm font-bold text-slate-300 mb-5">Glass Type</h4>
                <div className="space-y-3">
                  {glassProducts.map(p => (
                    <button
                      key={p.id}
                      onClick={() => toggleFilter('type', p.name)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                        filters.type === p.name 
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                          : 'text-slate-400 hover:bg-slate-800/50 border border-transparent'
                      }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-10">
                <h4 className="text-sm font-bold text-slate-300 mb-5">Thickness</h4>
                <div className="space-y-3">
                  {uniqueThickness.map(t => (
                    <button
                      key={t}
                      onClick={() => toggleFilter('thickness', t)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                        filters.thickness === t 
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                          : 'text-slate-400 hover:bg-slate-800/50 border border-transparent'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-300 mb-5">Application</h4>
                <div className="space-y-3">
                  {uniqueApplications.map(a => (
                    <button
                      key={a}
                      onClick={() => toggleFilter('application', a)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                        filters.application === a 
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                          : 'text-slate-400 hover:bg-slate-800/50 border border-transparent'
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-transparent rounded-3xl p-8 border border-amber-500/20">
              <h4 className="font-bold text-white text-xl mb-3">Need Help?</h4>
              <p className="text-sm text-slate-400 mb-6">
                Our technical experts are available 9am-6pm IST to guide you.
              </p>
              <button 
                onClick={() => showToast("Callback scheduled! Our expert will call between 9am-6pm IST.")} 
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 py-4 rounded-xl font-bold text-sm hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg"
              >
                Request Callback
              </button>
            </div>
          </aside>

          <main className="flex-1">
            <div className="flex justify-between items-center mb-10">
              <p className="text-slate-400 font-semibold">
                {isLoading ? "Loading products..." : (
                  <span>
                    Showing <span className="text-white font-black">{filteredProducts.length}</span> results
                  </span>
                )}
              </p>
              {(filters.type || filters.thickness || filters.application) && (
                <button 
                  onClick={() => setFilters({ type: "", thickness: "", application: "" })}
                  className="px-5 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-sm font-semibold hover:bg-slate-700 transition-all"
                >
                  Clear Filters
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {isLoading ? (
                [...Array(6)].map((_, i) => (
                  <div key={i} className="bg-slate-900/30 rounded-3xl h-[400px] border border-slate-800 animate-pulse"></div>
                ))
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  <Link 
                    key={p.id} 
                    href={`/catalog/${p.id}`}
                    className="group relative bg-slate-900/30 rounded-3xl overflow-hidden border border-slate-800 hover:border-amber-500/50 transition-all duration-500"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="aspect-[4/3] bg-slate-800/50 flex items-center justify-center text-7xl group-hover:scale-105 transition-transform duration-300">
                      {p.imageIcon}
                    </div>
                    
                    <div className="p-8">
                      <h3 className="text-2xl font-black text-white mb-3 group-hover:text-amber-400 transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-black uppercase tracking-widest mb-5">
                        {p.thickness} • {p.process}
                      </p>
                      <p className="text-slate-400 mb-8">
                        Best for: {p.application}
                      </p>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                        <div>
                          <span className="text-xs text-slate-500 font-bold uppercase block mb-1">
                            Market Rate
                          </span>
                          <span className="text-2xl font-black text-amber-400 italic">
                            ₹{p.priceMin} - {p.priceMax}
                          </span>
                        </div>
                        
                        <div className="px-5 py-3 bg-slate-800 text-white rounded-xl font-bold text-sm group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-orange-500 group-hover:text-slate-950 transition-all">
                          View Details
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-24">
                  <div className="text-6xl mb-6">🔍</div>
                  <h3 className="text-2xl font-bold text-white mb-3">No products found</h3>
                  <p className="text-slate-400">Try adjusting your filters or search query</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 pt-24 text-center">
        <div className="text-2xl font-semibold text-slate-400">Loading Catalog...</div>
      </div>
    }>
      <CatalogContent />
    </Suspense>
  );
}
