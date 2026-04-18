"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRole } from "@/components/RoleProvider";
import { useToast } from "@/components/ToastProvider";

export default function Navbar() {
  const { setIsModalOpen, role, user, setUser, logout } = useRole();
  const { showToast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Products', href: '/catalog' },
    { name: 'Smart Match', href: '/smart-match', highlight: true },
    { name: 'Vendors', href: '/vendors' },
    { name: 'Rates', href: '/rates' },
    { name: 'Services', href: '/service-partners' },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    showToast("Authenticating " + email + "...");
    
    setTimeout(() => {
      const newUser = { email, name: email.split('@')[0] };
      setUser(newUser);
      localStorage.setItem('amalgus-user', JSON.stringify(newUser));
      setIsAuthModalOpen(false);
      showToast("Signed in as " + newUser.name, "success");
    }, 800);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-slate-800' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex justify-between h-20 items-center">
            
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <span className="text-xl font-black text-slate-950">G</span>
                </div>
                <span className="text-xl font-black tracking-tight text-white">
                  GlassIQ
                </span>
              </Link>
              
              <div className="hidden xl:flex items-center gap-6">
                {role && (
                  <div className="flex items-center gap-2 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-sm font-semibold text-slate-300">
                      Welcome, <span className="text-amber-400">{role}</span>
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="hidden lg:flex items-center space-x-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    link.highlight 
                      ? 'text-amber-400 bg-amber-500/10' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-700 text-sm font-semibold text-slate-300 hover:border-amber-500/50 hover:text-amber-400 transition-all"
              >
                <span>Switch Role</span>
              </button>
              
              <div className="hidden sm:flex items-center gap-3">
                {user ? (
                  <button 
                    onClick={logout}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-sm font-semibold hover:bg-slate-700 transition-all"
                  >
                    {user.name}
                  </button>
                ) : (
                  <button 
                    onClick={() => setIsAuthModalOpen(true)}
                    className="px-5 py-2.5 rounded-xl text-slate-300 text-sm font-semibold hover:text-white transition-all"
                  >
                    Sign In
                  </button>
                )}
                <Link href="/estimate" className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-sm hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg shadow-amber-500/20">
                  Get Estimate
                </Link>
              </div>

              <button 
                className="lg:hidden p-2 text-slate-300 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-slate-950 border-t border-slate-800">
            <div className="px-6 py-8 space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className={`block px-4 py-4 rounded-2xl text-lg font-semibold ${
                    link.highlight 
                      ? 'text-amber-400 bg-amber-500/10' 
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-6 border-t border-slate-800 space-y-3">
                <button 
                  onClick={() => {
                    setIsModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-4 rounded-2xl text-left text-slate-400 font-semibold hover:bg-slate-900"
                >
                  Switch Role
                </button>
                <div className="flex gap-3">
                  {user ? (
                    <button 
                      onClick={logout} 
                      className="flex-1 px-4 py-4 rounded-2xl bg-slate-900 text-slate-300 font-semibold"
                    >
                      Sign Out
                    </button>
                  ) : (
                    <button 
                      onClick={() => {
                        setIsAuthModalOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex-1 px-4 py-4 rounded-2xl bg-slate-900 text-slate-300 font-semibold"
                    >
                      Sign In
                    </button>
                  )}
                  <Link 
                    href="/estimate" 
                    className="flex-1 px-4 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Estimate
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-20"></div>

      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" onClick={() => setIsAuthModalOpen(false)}></div>
          <div className="bg-slate-900 rounded-[2rem] p-10 max-w-md w-full relative z-10 shadow-2xl border border-slate-800">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-3xl font-black text-white mb-2">Welcome Back</h3>
                <p className="text-slate-400 text-sm">Sign in to your GlassIQ account</p>
              </div>
              <button onClick={() => setIsAuthModalOpen(false)} className="p-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form className="space-y-5" onSubmit={handleLogin}>
              <div>
                <label className="block text-xs font-black uppercase text-slate-500 mb-2 tracking-widest">Email</label>
                <input name="email" type="email" required placeholder="name@company.com" className="w-full px-5 py-4 bg-slate-950 rounded-xl border border-slate-700 outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 font-semibold text-white placeholder-slate-600 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-black uppercase text-slate-500 mb-2 tracking-widest">Password</label>
                <input type="password" required placeholder="••••••••" className="w-full px-5 py-4 bg-slate-950 rounded-xl border border-slate-700 outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 font-semibold text-white placeholder-slate-600 transition-all" />
              </div>
              <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black uppercase tracking-widest text-sm hover:from-amber-400 hover:to-orange-400 shadow-xl">
                Sign In
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
