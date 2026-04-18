"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ToastProvider';
import { getLocalMatch, getAiMatch } from '@/data/matchLogic';

const sampleQueries = [
  "I need glass for my bathroom shower",
  "Soundproof glass for my office cabin",
  "Glass railing for my balcony on 15th floor",
  "Energy efficient glass for south-facing facade",
  "Back painted glass for my kitchen backsplash",
  "Privacy glass for conference room partition"
];

export default function SmartMatchPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [matchType, setMatchType] = useState(null); // 'local' or 'ai'

  useEffect(() => {
    const savedQuery = localStorage.getItem('glassiq-ai-query');
    if (savedQuery) {
      setQuery(savedQuery);
      localStorage.removeItem('glassiq-ai-query');
      handleMatch(savedQuery);
    }
  }, []);

  const handleMatch = async (inputQuery = query) => {
    if (!inputQuery.trim()) return;
    
    setLoading(true);
    setResults([]);
    
    // Try local rule-based match first
    const localResults = getLocalMatch(inputQuery);
    
    if (localResults.length > 0) {
      setResults(localResults);
      setMatchType('local');
      setLoading(false);
    } else {
      // Fallback to AI
      const aiResults = await getAiMatch(inputQuery);
      if (aiResults) {
        setResults(aiResults);
        setMatchType('ai');
      } else {
        setResults([]);
        setMatchType(null);
      }
      setLoading(false);
    }
  };

  const handleSampleClick = (q) => {
    setQuery(q);
    handleMatch(q);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-widest mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            AI-Powered Recommendations
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-tight">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400">Perfect Glass</span> in Seconds
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Describe your project, safety concerns, or aesthetic needs in plain English, and our smart engine will recommend the technical specs you need.
          </p>
        </div>

        {/* Search Input Section */}
        <div className="relative mb-16">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-[2rem] blur-lg opacity-20 group-hover:opacity-30 transition-all duration-300"></div>
            <div className="relative">
              <textarea 
                className="w-full p-8 md:p-10 text-lg md:text-xl bg-slate-900/70 border border-slate-700/50 rounded-[2rem] outline-none focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500/50 transition-all h-52 md:h-64 resize-none placeholder-slate-500 text-white"
                placeholder="Describe your glass needs, e.g., 'I want safe glass for my staircase railing...'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="absolute bottom-6 right-6">
                <button 
                  onClick={() => handleMatch()}
                  disabled={loading}
                  className="px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold rounded-2xl flex items-center justify-center gap-3 hover:from-amber-400 hover:to-orange-400 transition-all shadow-xl disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center gap-3">
                      <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </span>
                  ) : (
                    <>
                      Find Best Glass
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sample Queries */}
        <div className="mb-20">
          <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6 text-center">Try these examples</p>
          <div className="flex flex-wrap items-center justify-center gap-3 px-2">
            {sampleQueries.map((q, i) => (
              <button 
                key={i}
                onClick={() => handleSampleClick(q)}
                className="px-5 py-3 bg-slate-900/50 border border-slate-700/50 rounded-full text-sm font-semibold text-slate-300 hover:border-amber-500/30 hover:text-amber-400 hover:bg-amber-500/5 transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center justify-between border-b border-slate-800 pb-6">
              <h2 className="text-3xl font-black text-white">Recommended Solutions</h2>
              <span className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest ${matchType === 'ai' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                {matchType === 'ai' ? '✨ Deep AI Match' : '✔️ Expert Rule Match'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {results.map((result, i) => (
                <div key={i} className="group relative bg-slate-900/40 backdrop-blur-sm rounded-[2.5rem] border border-slate-800 overflow-hidden hover:border-amber-500/40 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative p-10">
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-4 group-hover:text-amber-400 transition-colors">
                      {result.name}
                    </h3>
                    
                    <p className="text-slate-400 text-base leading-relaxed mb-8 italic">
                      "{result.reason}"
                    </p>

                    <div className="grid grid-cols-2 gap-5 mb-10">
                      <div className="bg-slate-800/50 p-6 rounded-2xl">
                        <p className="text-[11px] text-slate-500 font-black uppercase tracking-widest mb-2">Thickness</p>
                        <p className="font-black text-white text-xl">{result.thickness}</p>
                      </div>
                      <div className="bg-slate-800/50 p-6 rounded-2xl">
                        <p className="text-[11px] text-slate-500 font-black uppercase tracking-widest mb-2">Market Rate</p>
                        <p className="font-black text-amber-400 text-xl">{result.priceRange}</p>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        showToast(`Saving ${result.name} to your session...`);
                        router.push(`/catalog?search=${encodeURIComponent(result.name)}`);
                      }}
                      className="w-full bg-gradient-to-r from-slate-800 to-slate-900 text-white py-5 rounded-2xl font-black hover:from-amber-500 hover:to-orange-500 hover:text-slate-950 transition-all shadow-lg"
                    >
                      Get Quote from Verified Vendors
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-8 bg-amber-500/5 rounded-[2rem] mt-10 text-center border border-amber-500/10">
              <p className="text-sm text-amber-300 font-medium">
                Note: These recommendations are based on standard architectural practices. Always consult with a structural engineer for load-bearing installations.
              </p>
            </div>
          </div>
        )}

        {/* Fallback for no results */}
        {!loading && query && results.length === 0 && (
          <div className="text-center py-24">
            <div className="text-6xl mb-6">🤔</div>
            <h3 className="text-2xl font-black text-white mb-3">We couldn't find a perfect match.</h3>
            <p className="text-slate-400">Try rephrasing your requirement or contact our human experts.</p>
          </div>
        )}
      </div>
    </div>
  );
}
