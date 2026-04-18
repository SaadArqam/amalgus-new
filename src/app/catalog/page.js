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

  return (
    <div style={{ minHeight: '100vh', background: '#0C0C0C', paddingTop: '28px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header Section */}
        <div style={{ marginBottom: '80px', paddingTop: '48px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h1 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(42px, 7vw, 84px)',
              fontWeight: 'normal',
              lineHeight: '1.1',
              color: '#F0EDE8',
              margin: '0 0 16px 0'
            }}>
              PRODUCT<br/>
              <span style={{ color: '#F5A623' }}>CATALOG</span>
            </h1>
            <div style={{
              width: '60px',
              height: '2px',
              background: '#F5A623',
              margin: '0 auto 24px auto'
            }}></div>
            <p style={{
              color: '#7A7570',
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: '18px',
              letterSpacing: '0.12em',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              COMPLETE ARCHITECTURAL GLASS SOLUTIONS · TECHNICAL SPECIFICATIONS · LIVE PRICING
            </p>
          </div>
          
          {/* Search Bar */}
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            border: '1px solid #2A2A2A',
            display: 'flex',
            alignItems: 'stretch'
          }}>
            <div style={{
              padding: '16px',
              borderRight: '1px solid #2A2A2A',
              background: '#141414',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{
                color: '#F5A623',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '16px',
                fontWeight: 'bold',
                letterSpacing: '0.12em'
              }}>SEARCH</span>
            </div>
            <input
              type="text"
              placeholder="Filter by type, thickness, or application..."
              style={{
                flex: 1,
                padding: '16px',
                background: 'transparent',
                border: 'none',
                color: '#F0EDE8',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '18px',
                outline: 'none'
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '48px', marginBottom: '80px' }}>
          {/* Filters Sidebar */}
          <aside style={{ width: '320px', flexShrink: 0 }}>
            <div style={{
              border: '1px solid #2A2A2A',
              padding: '32px',
              marginBottom: '32px'
            }}>
              <h3 style={{
                color: '#F0EDE8',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '18px',
                fontWeight: 'bold',
                letterSpacing: '0.12em',
                marginBottom: '24px',
                textTransform: 'uppercase'
              }}>FILTERS</h3>
              
              {/* Glass Type Filter */}
              <div style={{ marginBottom: '32px' }}>
                <h4 style={{
                  color: '#7A7570',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '15px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em',
                  marginBottom: '16px',
                  textTransform: 'uppercase'
                }}>Glass Type</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[...new Set(glassProducts.map(p => p.name))].map(type => (
                    <button
                      key={type}
                      onClick={() => toggleFilter('type', type)}
                      style={{
                        padding: '12px 16px',
                        border: `1px solid ${filters.type === type ? '#F5A623' : '#2A2A2A'}`,
                        background: filters.type === type ? '#F5A62320' : 'transparent',
                        color: filters.type === type ? '#F5A623' : '#7A7570',
                        fontFamily: "'Courier New', Courier, monospace",
                        fontSize: '15px',
                        fontWeight: 'bold',
                        letterSpacing: '0.12em',
                        textAlign: 'left',
                        cursor: 'pointer',
                        textTransform: 'uppercase'
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Thickness Filter */}
              <div style={{ marginBottom: '32px' }}>
                <h4 style={{
                  color: '#7A7570',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '15px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em',
                  marginBottom: '16px',
                  textTransform: 'uppercase'
                }}>Thickness</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {uniqueThickness.map(thickness => (
                    <button
                      key={thickness}
                      onClick={() => toggleFilter('thickness', thickness)}
                      style={{
                        padding: '12px 16px',
                        border: `1px solid ${filters.thickness === thickness ? '#F5A623' : '#2A2A2A'}`,
                        background: filters.thickness === thickness ? '#F5A62320' : 'transparent',
                        color: filters.thickness === thickness ? '#F5A623' : '#7A7570',
                        fontFamily: "'Courier New', Courier, monospace",
                        fontSize: '15px',
                        fontWeight: 'bold',
                        letterSpacing: '0.12em',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      {thickness}
                    </button>
                  ))}
                </div>
              </div>

              {/* Application Filter */}
              <div>
                <h4 style={{
                  color: '#7A7570',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '15px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em',
                  marginBottom: '16px',
                  textTransform: 'uppercase'
                }}>Application</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {uniqueApplications.map(app => (
                    <button
                      key={app}
                      onClick={() => toggleFilter('application', app)}
                      style={{
                        padding: '12px 16px',
                        border: `1px solid ${filters.application === app ? '#F5A623' : '#2A2A2A'}`,
                        background: filters.application === app ? '#F5A62320' : 'transparent',
                        color: filters.application === app ? '#F5A623' : '#7A7570',
                        fontFamily: "'Courier New', Courier, monospace",
                        fontSize: '15px',
                        fontWeight: 'bold',
                        letterSpacing: '0.12em',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      {app}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Help Box */}
            <div style={{
              border: '1px solid #F5A623',
              padding: '32px',
              background: '#F5A62310'
            }}>
              <h4 style={{
                color: '#F0EDE8',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '18px',
                fontWeight: 'bold',
                letterSpacing: '0.12em',
                marginBottom: '16px'
              }}>NEED ASSISTANCE?</h4>
              <p style={{
                color: '#7A7570',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '15px',
                letterSpacing: '0.12em',
                lineHeight: '1.5',
                marginBottom: '24px'
              }}>
                Technical experts available 9AM-6PM IST for product guidance and specifications.
              </p>
              <button
                onClick={() => showToast("Callback scheduled! Our expert will call between 9am-6pm IST.")}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: '#F5A623',
                  color: '#0C0C0C',
                  border: 'none',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '15px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em',
                  cursor: 'pointer',
                  textTransform: 'uppercase'
                }}
              >
                REQUEST CALLBACK
              </button>
            </div>
          </aside>

          {/* Products Grid */}
          <main style={{ flex: 1 }}>
            {/* Results Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '32px',
              paddingBottom: '16px',
              borderBottom: '1px solid #2A2A2A'
            }}>
              <div style={{
                color: '#7A7570',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '16px',
                letterSpacing: '0.12em'
              }}>
                {isLoading ? "LOADING PRODUCTS..." : (
                  <span>
                    <span style={{ color: '#F0EDE8', fontWeight: 'bold' }}>{filteredProducts.length}</span> PRODUCTS FOUND
                  </span>
                )}
              </div>
              {(filters.type || filters.thickness || filters.application) && (
                <button
                  onClick={() => setFilters({ type: "", thickness: "", application: "" })}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #2A2A2A',
                    background: 'transparent',
                    color: '#7A7570',
                    fontFamily: "'Courier New', Courier, monospace",
                    fontSize: '14px',
                    fontWeight: 'bold',
                    letterSpacing: '0.12em',
                    cursor: 'pointer',
                    textTransform: 'uppercase'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#141414';
                    e.target.style.color = '#F0EDE8';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#7A7570';
                  }}
                >
                  CLEAR FILTERS
                </button>
              )}
            </div>

            {/* Products Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0px',
              border: '1px solid #2A2A2A',
              borderTop: 'none'
            }}>
              {isLoading ? (
                [...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '32px 24px',
                      borderRight: (i + 1) % 3 !== 0 ? '1px solid #2A2A2A' : 'none',
                      borderBottom: '1px solid #2A2A2A',
                      height: '320px',
                      background: '#141414',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <div style={{
                      color: '#4A4540',
                      fontFamily: "'Courier New', Courier, monospace",
                      fontSize: '15px',
                      letterSpacing: '0.12em'
                    }}>LOADING...</div>
                  </div>
                ))
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((p, i) => (
                  <Link
                    key={p.id}
                    href={`/catalog/${p.id}`}
                    style={{
                      padding: '32px 24px',
                      borderRight: (i + 1) % 3 !== 0 ? '1px solid #2A2A2A' : 'none',
                      borderBottom: '1px solid #2A2A2A',
                      display: 'block',
                      textDecoration: 'none',
                      position: 'relative',
                      background: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#141414';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                    }}
                  >
                    {/* Icon */}
                    <div style={{
                      fontSize: '52px',
                      marginBottom: '20px',
                      filter: 'grayscale(100%) contrast(0.5)'
                    }}>{p.imageIcon}</div>
                    
                    {/* Product Name */}
                    <h3 style={{
                      color: '#F0EDE8',
                      fontFamily: "'Courier New', Courier, monospace",
                      fontSize: '20px',
                      fontWeight: 'bold',
                      letterSpacing: '0.12em',
                      marginBottom: '12px',
                      textTransform: 'uppercase'
                    }}>{p.name}</h3>
                    
                    {/* Specs */}
                    <div style={{
                      color: '#7A7570',
                      fontFamily: "'Courier New', Courier, monospace",
                      fontSize: '14px',
                      letterSpacing: '0.12em',
                      marginBottom: '8px'
                    }}>{p.thickness} • {p.process}</div>
                    
                    {/* Application */}
                    <div style={{
                      color: '#4A4540',
                      fontFamily: "'Courier New', Courier, monospace",
                      fontSize: '14px',
                      letterSpacing: '0.12em',
                      marginBottom: '16px'
                    }}>{p.application}</div>
                    
                    {/* Price */}
                    <div style={{
                      color: '#F5A623',
                      fontFamily: "'Courier New', Courier, monospace",
                      fontSize: '22px',
                      fontWeight: 'bold',
                      letterSpacing: '0.12em'
                    }}>
                      ₹{p.priceMin}-{p.priceMax}
                    </div>
                  </Link>
                ))
              ) : (
                <div style={{
                  gridColumn: '1 / -1',
                  padding: '80px 24px',
                  textAlign: 'center',
                  borderBottom: '1px solid #2A2A2A'
                }}>
                  <div style={{
                    color: '#4A4540',
                    fontFamily: "'Courier New', Courier, monospace",
                    fontSize: '18px',
                    letterSpacing: '0.12em',
                    marginBottom: '16px'
                  }}>NO PRODUCTS FOUND</div>
                  <div style={{
                    color: '#7A7570',
                    fontFamily: "'Courier New', Courier, monospace",
                    fontSize: '15px',
                    letterSpacing: '0.12em'
                  }}>ADJUST FILTERS OR SEARCH QUERY</div>
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
      <div style={{ minHeight: '100vh', background: '#0C0C0C', paddingTop: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          color: '#7A7570',
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: '18px',
          letterSpacing: '0.12em'
        }}>LOADING CATALOG...</div>
      </div>
    }>
      <CatalogContent />
    </Suspense>
  );
}
