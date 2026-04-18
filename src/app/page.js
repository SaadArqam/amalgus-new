"use client";
import Link from "next/link";
import { glassProducts } from "@/data/glassProducts";
import { useRole } from "@/components/RoleProvider";
import { useToast } from "@/components/ToastProvider";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { role } = useRole();
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const featuredProducts = glassProducts.slice(0, 4);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      localStorage.setItem('glassiq-ai-query', searchQuery.trim());
      router.push('/smart-match');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Hero Section with Grid Background */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.15),transparent_60%)]"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
          <div className="text-center space-y-10">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-sm font-semibold tracking-wide text-slate-300">India's Most Intelligent Glass Marketplace</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight">
                <span className="block text-white">Your Glass,</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400">
                  Perfectly Matched
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                From homeowners to architects, our AI-powered GlassIQ delivers instant recommendations, pricing, and quotes for your glass needs.
              </p>
            </div>

            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
                <div className="relative flex items-center bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-2">
                  <div className="pl-6 pr-4">
                    <svg className="w-7 h-7 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Describe your glass needs, e.g., 'Shower glass for bathroom'"
                    className="flex-1 bg-transparent border-none outline-none text-lg text-white placeholder-slate-500 py-4"
                  />
                  <button
                    type="submit"
                    className="ml-4 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold rounded-2xl hover:from-amber-400 hover:to-orange-400 transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-5">
              <Link
                href="/estimate"
                className="px-10 py-4 bg-slate-800 text-white font-semibold rounded-2xl border border-slate-700 hover:bg-slate-700 hover:border-slate-600 transition-all duration-300 flex items-center gap-3"
              >
                <span>Get Instant Estimate</span>
              </Link>
              <Link
                href="/catalog"
                className="px-10 py-4 bg-white text-slate-950 font-semibold rounded-2xl hover:bg-slate-100 transition-all duration-300 flex items-center gap-3"
              >
                <span>Explore Catalog</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-slate-600 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-slate-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-32 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Popular Glass Types
              </h2>
              <p className="text-slate-400 text-lg">
                Discover our most sought-after glass solutions
              </p>
            </div>
            <Link
              href="/catalog"
              className="hidden md:flex items-center gap-2 text-amber-400 font-semibold hover:text-amber-300 transition-colors"
            >
              View All Products
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/catalog/${product.id}`}
                className="group relative bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-slate-800 overflow-hidden hover:border-amber-500/50 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {product.imageIcon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                  <p className="text-slate-500 text-sm mb-6">{product.application}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <span className="text-2xl font-black text-amber-400">
                      ₹{product.priceMin} - {product.priceMax}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">/sq.ft</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 text-amber-400 font-semibold"
            >
              View All Products
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-slate-900 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(245,158,11,0.08),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Why Choose GlassIQ?
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Experience the future of glass procurement with our intelligent platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🧠",
                title: "AI-Powered Matching",
                description: "Describe your needs in plain English and get instant, accurate glass recommendations."
              },
              {
                icon: "💎",
                title: "Transparent Pricing",
                description: "No hidden fees. View real-time market rates and quotes from verified vendors."
              },
              {
                icon: "⚡",
                title: "Instant Estimates",
                description: "Convert mm to sq.ft, apply discounts, and calculate GST in seconds."
              },
              {
                icon: "🏗️",
                title: "Role-Based Access",
                description: "Tailored experiences for Homeowners, Architects, Builders, and Dealers."
              },
              {
                icon: "🤝",
                title: "Verified Vendors",
                description: "Connect with trusted manufacturers and service partners in your area."
              },
              {
                icon: "🔧",
                title: "Complete Solutions",
                description: "Find everything you need, from glass to hardware and installation services."
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-slate-950/50 backdrop-blur-sm rounded-3xl border border-slate-800 p-10 hover:border-amber-500/30 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-slate-950">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 rounded-[3rem] border border-slate-800 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(245,158,11,0.15),transparent_50%)]"></div>
            <div className="relative p-12 md:p-20 text-center">
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                Ready to Find Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400">
                  Perfect Glass?
                </span>
              </h2>
              <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust GlassIQ for their glass needs.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <Link
                  href="/smart-match"
                  className="px-12 py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-lg rounded-2xl hover:from-amber-400 hover:to-orange-400 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl"
                >
                  Try AI Matcher
                </Link>
                <Link
                  href="/catalog"
                  className="px-12 py-5 bg-white text-slate-950 font-bold text-lg rounded-2xl hover:bg-slate-100 transition-all duration-300"
                >
                  Browse Catalog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
