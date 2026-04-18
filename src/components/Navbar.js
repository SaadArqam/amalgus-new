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
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const navLinks = [
    { name: 'CATALOG', href: '/catalog' },
    { name: 'AI MATCH', href: '/smart-match' },
    { name: 'RATES', href: '/rates' },
    { name: 'VENDORS', href: '/vendors' },
    { name: 'SERVICES', href: '/service-partners' },
  ];

  const getRoleColor = (role) => {
    switch(role) {
      case 'Homeowner': return '#3ECA7A';
      case 'Architect': return '#4A9EDB';
      case 'Builder': return '#E84040';
      case 'Dealer': return '#F5A623';
      default: return '#7A7570';
    }
  };

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
      {/* Amber Ticker Bar */}
      <div style={{
        height: '28px',
        background: '#F5A623',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          whiteSpace: 'nowrap',
          paddingLeft: '100%'
        }}>
          <span style={{
            color: '#0C0C0C',
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: '21px',
            fontWeight: 'bold',
            letterSpacing: '0.12em',
            paddingRight: '100px'
          }}>
            INDIA'S FIRST GLASS INTELLIGENCE PLATFORM ⬥ LIVE FACTORY RATES UPDATED DAILY ⬥ AI-POWERED PRODUCT MATCHING ⬥ VERIFIED VENDOR NETWORK ⬥ ROLE-BASED PRICING ⬥ INSTANT ESTIMATES
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav style={{
        position: 'fixed',
        top: '28px',
        left: 0,
        right: 0,
        zIndex: 50,
        background: '#0C0C0C',
        borderBottom: '1px solid #2A2A2A',
        height: '56px'
      }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 24px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          
          {/* Logo */}
          <Link href="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              border: '2px solid #F5A623',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent'
            }}>
              <span style={{
                color: '#F5A623',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '26px',
                fontWeight: 'bold'
              }}>A</span>
            </div>
            <span style={{
              color: '#F0EDE8',
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: '24px',
              fontWeight: 'bold',
              letterSpacing: '0.12em'
            }}>AMALGUS</span>
          </Link>
          
          {/* Desktop Nav Links */}
          <div style={{
            display: isLargeScreen ? 'flex' : 'none',
            alignItems: 'center',
            gap: '32px'
          }}>
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                style={{
                  color: '#7A7570',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '21px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em',
                  textDecoration: 'none',
                  borderBottom: '2px solid transparent',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#F0EDE8';
                  e.target.style.background = '#141414';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#7A7570';
                  e.target.style.background = 'transparent';
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            {/* Role Badge */}
            {role && (
              <div style={{
                display: isLargeScreen ? 'flex' : 'none',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                border: `1px solid ${getRoleColor(role)}`,
                background: 'transparent'
              }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: getRoleColor(role)
                }}></div>
                <span style={{
                  color: '#7A7570',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '20px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em'
                }}>{role}</span>
              </div>
            )}
            
            {/* Role Button */}
            <button 
              onClick={() => setIsModalOpen(true)}
              style={{
                display: isLargeScreen ? 'block' : 'none',
                padding: '8px 16px',
                border: '1px solid #2A2A2A',
                background: 'transparent',
                color: '#7A7570',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '16px',
                fontWeight: 'bold',
                letterSpacing: '0.12em',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#141414';
                e.target.style.borderColor = '#F5A623';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.borderColor = '#2A2A2A';
              }}
            >
              ROLE
            </button>

            
            {/* Estimate Button */}
            <Link href="/estimate" style={{
              padding: '8px 16px',
              background: '#F5A623',
              color: '#0C0C0C',
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: '16px',
              fontWeight: 'bold',
              letterSpacing: '0.12em',
              textDecoration: 'none',
              cursor: 'pointer'
            }}>
              ESTIMATE →
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              style={{
                display: isLargeScreen ? 'none' : 'flex',
                background: 'none',
                border: 'none',
                color: '#7A7570',
                cursor: 'pointer',
                padding: '4px'
              }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div style={{
            display: isLargeScreen ? 'none' : 'block',
            background: '#0C0C0C',
            borderTop: '1px solid #2A2A2A'
          }}>
            <div style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}>
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href} 
                  style={{
                    display: 'block',
                    padding: '12px 16px',
                    border: '1px solid #2A2A2A',
                    color: '#7A7570',
                    fontFamily: "'Courier New', Courier, monospace",
                    fontSize: '15px',
                    fontWeight: 'bold',
                    letterSpacing: '0.12em',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#141414';
                    e.target.style.color = '#F0EDE8';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#7A7570';
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              <div style={{
                display: 'flex',
                gap: '8px',
                marginTop: '16px'
              }}>
                <button 
                  onClick={() => {
                    setIsModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    border: '1px solid #2A2A2A',
                    background: 'transparent',
                    color: '#7A7570',
                    fontFamily: "'Courier New', Courier, monospace",
                    fontSize: '14px',
                    fontWeight: 'bold',
                    letterSpacing: '0.12em',
                    cursor: 'pointer'
                  }}
                >
                  ROLE
                </button>
                <Link 
                  href="/estimate" 
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    background: '#F5A623',
                    color: '#0C0C0C',
                    fontFamily: "'Courier New', Courier, monospace",
                    fontSize: '14px',
                    fontWeight: 'bold',
                    letterSpacing: '0.12em',
                    textAlign: 'center',
                    textDecoration: 'none'
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  ESTIMATE →
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div style={{ height: '84px' }}></div>
      
      {/* Auth Modal */}
      {isAuthModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          background: 'rgba(0,0,0,0.92)',
          backdropFilter: 'blur(8px)'
        }}>
          <div style={{
            background: '#141414',
            border: '1px solid #2A2A2A',
            maxWidth: '640px',
            width: '100%',
            padding: '32px',
            position: 'relative'
          }}>
            <button 
              onClick={() => setIsAuthModalOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                color: '#7A7570',
                cursor: 'pointer',
                padding: '8px'
              }}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                color: '#F0EDE8',
                fontFamily: 'Georgia, serif',
                fontSize: '28px',
                fontWeight: 'normal',
                marginBottom: '8px'
              }}>Welcome Back</h3>
              <p style={{
                color: '#7A7570',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '16px',
                letterSpacing: '0.12em'
              }}>SIGN IN TO YOUR AMALGUS ACCOUNT</p>
            </div>
            
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{
                  display: 'block',
                  color: '#7A7570',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '14px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em',
                  marginBottom: '8px'
                }}>EMAIL</label>
                <input 
                  name="email" 
                  type="email" 
                  required 
                  placeholder="name@company.com" 
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: '#0C0C0C',
                    border: '1px solid #2A2A2A',
                    color: '#F0EDE8',
                    fontFamily: "'Courier New', Courier, monospace",
                    fontSize: '20px',
                    outline: 'none'
                  }}
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  color: '#7A7570',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '14px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em',
                  marginBottom: '8px'
                }}>PASSWORD</label>
                <input 
                  type="password" 
                  required 
                  placeholder="••••••••" 
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: '#0C0C0C',
                    border: '1px solid #2A2A2A',
                    color: '#F0EDE8',
                    fontFamily: "'Courier New', Courier, monospace",
                    fontSize: '20px',
                    outline: 'none'
                  }}
                />
              </div>
              <button 
                type="submit" 
                style={{
                  padding: '16px',
                  background: '#F5A623',
                  color: '#0C0C0C',
                  border: 'none',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '20px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em',
                  cursor: 'pointer'
                }}
              >
                SIGN IN
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
