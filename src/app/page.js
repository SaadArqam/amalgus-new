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

  const featuredProducts = glassProducts.slice(0, 4);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      localStorage.setItem('amalgus-ai-query', searchQuery.trim());
      router.push('/smart-match');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0C0C0C' }}>
      
      {/* HERO SECTION */}
      <section style={{
        minHeight: '92vh',
        borderBottom: '1px solid #2A2A2A',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        
        {/* Top-left coords */}
        <div style={{
          position: 'absolute',
          top: '32px',
          left: '32px',
          color: '#4A4540',
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: '20px',
          letterSpacing: '0.12em'
        }}>28.6139°N / 77.2090°E</div>
        
        {/* Top-right status */}
        <div style={{
          position: 'absolute',
          top: '32px',
          right: '32px',
          color: '#4A4540',
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: '13px',
          letterSpacing: '0.12em'
        }}>SYS:LIVE_<span style={{ animation: 'blink 1s step-end infinite' }}>_</span></div>
        
        {/* Role indicator */}
        {role && (
          <div style={{
            position: 'absolute',
            top: '60px',
            left: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{
              padding: '4px 8px',
              border: `1px solid ${role === 'Homeowner' ? '#3ECA7A' : role === 'Architect' ? '#4A9EDB' : role === 'Builder' ? '#E84040' : '#F5A623'}`,
              background: 'transparent'
            }}>
              <span style={{
                color: '#7A7570',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '20px',
                fontWeight: 'bold',
                letterSpacing: '0.12em'
              }}>{role}</span>
            </div>
            <span style={{ color: '#4A4540' }}>—</span>
            <span style={{
              color: '#7A7570',
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: '13px',
              letterSpacing: '0.12em'
            }}>B2B2C GLASS INTELLIGENCE PLATFORM</span>
          </div>
        )}

        <div style={{
          textAlign: 'center',
          maxWidth: '1200px',
          padding: '0 24px'
        }}>
          {/* Giant serif heading */}
          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(48px, 9vw, 108px)',
            fontWeight: 'normal',
            lineHeight: '0.95',
            margin: '0 0 32px 0',
            color: '#F0EDE8'
          }}>
            GLASS<br/>
            <span style={{ color: '#F5A623' }}>INTEL</span>LIGENCE
          </h1>
          
          {/* Amber divider */}
          <div style={{
            width: '80px',
            height: '2px',
            background: '#F5A623',
            margin: '0 auto 32px auto'
          }}></div>
          
          {/* Subtitle */}
          <p style={{
            color: '#7A7570',
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: '24px',
            letterSpacing: '0.12em',
            marginBottom: '48px',
            maxWidth: '600px',
            margin: '0 auto 48px auto'
          }}>
            AI-POWERED GLASS MATCHING · LIVE FACTORY RATES · MULTI-VENDOR COMPARISON
          </p>
          
          {/* AI Search Bar */}
          <form onSubmit={handleSearch} style={{
            maxWidth: '600px',
            margin: '0 auto 32px auto',
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
                fontSize: '22px',
                fontWeight: 'bold',
                letterSpacing: '0.12em'
              }}>AI ▶</span>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Describe your glass requirements..."
              style={{
                flex: 1,
                padding: '16px',
                background: 'transparent',
                border: 'none',
                color: '#F0EDE8',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '24px',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                padding: '16px 24px',
                background: '#F5A623',
                color: '#0C0C0C',
                border: 'none',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '22px',
                fontWeight: 'bold',
                letterSpacing: '0.12em',
                cursor: 'pointer'
              }}
            >
              MATCH →
            </button>
          </form>
          
          {/* Sample query hint */}
          <p style={{
            color: '#4A4540',
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: '13px',
            letterSpacing: '0.12em',
            marginBottom: '48px'
          }}>
            TRY: "Glass for bathroom shower" or "Soundproof office cabin"
          </p>
          
          {/* CTA Links */}
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link
              href="/catalog"
              style={{
                padding: '12px 24px',
                border: '1px solid #2A2A2A',
                color: '#7A7570',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '21px',
                fontWeight: 'bold',
                letterSpacing: '0.12em',
                textDecoration: 'none',
                cursor: 'pointer'
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
              VIEW CATALOG
            </Link>
            <Link
              href="/rates"
              style={{
                padding: '12px 24px',
                border: '1px solid #2A2A2A',
                color: '#7A7570',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '15px',
                fontWeight: 'bold',
                letterSpacing: '0.12em',
                textDecoration: 'none',
                cursor: 'pointer'
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
              LIVE RATES
            </Link>
            <button
              onClick={() => router.push('/estimate')}
              style={{
                padding: '12px 24px',
                border: '1px solid #F5A623',
                background: 'transparent',
                color: '#F5A623',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '21px',
                fontWeight: 'bold',
                letterSpacing: '0.12em',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#F5A623';
                e.target.style.color = '#0C0C0C';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#F5A623';
              }}
            >
              SELECT ROLE
            </button>
          </div>
          
          {/* Stats Row */}
          <div style={{
            display: 'flex',
            gap: '0px',
            marginTop: '80px',
            borderTop: '1px solid #2A2A2A',
            borderLeft: '1px solid #2A2A2A',
            borderRight: '1px solid #2A2A2A',
            overflow: 'hidden'
          }}>
            {[
              { value: '$150B+', label: 'MARKET SIZE' },
              { value: '5-7%', label: 'ANNUAL GROWTH' },
              { value: '604+', label: 'VENDORS' },
              { value: '52', label: 'CITIES' },
              { value: 'LIVE', label: 'RATES', color: '#3ECA7A' }
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: '24px',
                  borderRight: i < 4 ? '1px solid #2A2A2A' : 'none',
                  flex: 1,
                  textAlign: 'center'
                }}
              >
                <div style={{
                  color: stat.color || '#F5A623',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '32px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em',
                  marginBottom: '4px'
                }}>{stat.value}</div>
                <div style={{
                  color: '#7A7570',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '20px',
                  letterSpacing: '0.12em'
                }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 01: FEATURED PRODUCTS */}
      <section style={{
        padding: '80px 24px',
        borderBottom: '1px solid #2A2A2A'
      }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto'
        }}>
          {/* Section Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '48px',
            paddingBottom: '16px',
            borderBottom: '1px solid #2A2A2A'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <span style={{
                color: '#F5A623',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '28px',
                fontWeight: 'bold',
                letterSpacing: '0.12em'
              }}>01</span>
              <div>
                <h2 style={{
                  color: '#F0EDE8',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '24px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em',
                  margin: 0
                }}>FEATURED PRODUCTS</h2>
                <p style={{
                  color: '#7A7570',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '21px',
                  letterSpacing: '0.12em',
                  margin: '4px 0 0 0'
                }}>CURATED GLASS SOLUTIONS</p>
              </div>
            </div>
            <Link
              href="/catalog"
              style={{
                color: '#7A7570',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '15px',
                fontWeight: 'bold',
                letterSpacing: '0.12em',
                textDecoration: 'none'
              }}
            >
              VIEW ALL →
            </Link>
          </div>

          {/* Product Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0px',
            border: '1px solid #2A2A2A',
            borderTop: 'none'
          }}>
            {featuredProducts.map((product, i) => (
              <Link
                key={product.id}
                href={`/catalog/${product.id}`}
                style={{
                  padding: '32px 24px',
                  borderRight: i < 3 ? '1px solid #2A2A2A' : 'none',
                  borderBottom: '1px solid #2A2A2A',
                  display: 'block',
                  textDecoration: 'none',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#141414';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                }}
              >
                {/* Top row: icon + thickness */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    fontSize: '36px'
                  }}>{product.imageIcon}</div>
                  <div style={{
                    padding: '4px 8px',
                    background: '#F5A62320',
                    border: '1px solid #F5A623',
                    color: '#F5A623',
                    fontFamily: "'Courier New', Courier, monospace",
                    fontSize: '19px',
                    fontWeight: 'bold',
                    letterSpacing: '0.12em'
                  }}>{product.thickness}</div>
                </div>
                
                {/* Product info */}
                <div style={{
                  color: '#F0EDE8',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '24px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em',
                  marginBottom: '8px'
                }}>{product.name}</div>
                
                <div style={{
                  color: '#7A7570',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '21px',
                  letterSpacing: '0.12em',
                  marginBottom: '8px'
                }}>{product.process}</div>
                
                <div style={{
                  color: '#4A4540',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '20px',
                  letterSpacing: '0.12em',
                  marginBottom: '16px'
                }}>{product.application}</div>
                
                {/* Price */}
                <div style={{
                  color: '#F5A623',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '24px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em'
                }}>
                  ₹{product.priceMin}-{product.priceMax}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 02: LIVE RATES */}
      <section style={{
        padding: '80px 24px',
        borderBottom: '1px solid #2A2A2A'
      }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto'
        }}>
          {/* Section Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '48px',
            paddingBottom: '16px',
            borderBottom: '1px solid #2A2A2A'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <span style={{
                color: '#F5A623',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '28px',
                fontWeight: 'bold',
                letterSpacing: '0.12em'
              }}>02</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#3ECA7A'
                }}></div>
                <div>
                  <h2 style={{
                    color: '#F0EDE8',
                    fontFamily: "'Courier New', Courier, monospace",
                    fontSize: '24px',
                    fontWeight: 'bold',
                    letterSpacing: '0.12em',
                    margin: 0
                  }}>LIVE RATES</h2>
                  <p style={{
                    color: '#7A7570',
                    fontFamily: "'Courier New', Courier, monospace",
                    fontSize: '21px',
                    letterSpacing: '0.12em',
                    margin: '4px 0 0 0'
                  }}>REAL-TIME MARKET PRICES</p>
                </div>
              </div>
            </div>
            <Link
              href="/rates"
              style={{
                color: '#7A7570',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '15px',
                fontWeight: 'bold',
                letterSpacing: '0.12em',
                textDecoration: 'none'
              }}
            >
              FULL DASHBOARD →
            </Link>
          </div>

          {/* Rate Strip */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0px',
            border: '1px solid #2A2A2A',
            borderTop: 'none'
          }}>
            {featuredProducts.slice(0, 4).map((product, i) => (
              <div
                key={i}
                style={{
                  padding: '24px',
                  borderRight: i < 3 ? '1px solid #2A2A2A' : 'none',
                  borderBottom: '1px solid #2A2A2A'
                }}
              >
                <div style={{
                  color: '#7A7570',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '21px',
                  letterSpacing: '0.12em',
                  marginBottom: '8px'
                }}>{product.name}</div>
                <div style={{
                  color: '#F5A623',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '24px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em',
                  marginBottom: '8px'
                }}>
                  ₹{product.priceMin}-{product.priceMax}
                </div>
                <div style={{
                  padding: '4px 8px',
                  background: '#3ECA7A20',
                  border: '1px solid #3ECA7A',
                  color: '#3ECA7A',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '15px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em',
                  display: 'inline-block'
                }}>STABLE</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 03: FEATURES GRID */}
      <section style={{
        padding: '80px 24px',
        borderBottom: '1px solid #2A2A2A'
      }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto'
        }}>
          {/* Section Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '48px',
            paddingBottom: '16px',
            borderBottom: '1px solid #2A2A2A'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <span style={{
                color: '#F5A623',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '28px',
                fontWeight: 'bold',
                letterSpacing: '0.12em'
              }}>03</span>
              <div>
                <h2 style={{
                  color: '#F0EDE8',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '24px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em',
                  margin: 0
                }}>FEATURES</h2>
                <p style={{
                  color: '#7A7570',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '21px',
                  letterSpacing: '0.12em',
                  margin: '4px 0 0 0'
                }}>INTELLIGENT TOOLS</p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0px',
            border: '1px solid #2A2A2A',
            borderTop: 'none'
          }}>
            {[
              {
                number: '001',
                title: 'AI SMART MATCHER',
                description: 'Natural language processing converts your requirements into technical glass specifications',
                cta: 'TRY MATCHER →'
              },
              {
                number: '002',
                title: 'LIVE RATE FEED',
                description: 'Real-time factory prices updated daily with trend analysis and market indicators',
                cta: 'VIEW RATES →'
              },
              {
                number: '003',
                title: 'ESTIMATE ENGINE',
                description: 'Instant calculations with mm to sq.ft conversion, GST, and role-based discounts',
                cta: 'CALCULATE →'
              }
            ].map((feature, i) => (
              <div
                key={i}
                style={{
                  padding: '40px 32px',
                  borderRight: i < 2 ? '1px solid #2A2A2A' : 'none',
                  borderBottom: '1px solid #2A2A2A'
                }}
              >
                <div style={{
                  color: '#F5A623',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '24px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em',
                  marginBottom: '16px'
                }}>{feature.number}</div>
                <h3 style={{
                  color: '#F0EDE8',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '24px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em',
                  marginBottom: '12px',
                  margin: '0 0 12px 0'
                }}>{feature.title}</h3>
                <p style={{
                  color: '#7A7570',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '22px',
                  letterSpacing: '0.12em',
                  lineHeight: '1.5',
                  marginBottom: '24px'
                }}>{feature.description}</p>
                <Link
                  href={feature.number === '001' ? '/smart-match' : feature.number === '002' ? '/rates' : '/estimate'}
                  style={{
                    color: '#7A7570',
                    fontFamily: "'Courier New', Courier, monospace",
                    fontSize: '21px',
                    fontWeight: 'bold',
                    letterSpacing: '0.12em',
                    textDecoration: 'none'
                  }}
                >
                  {feature.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{
        padding: '120px 24px',
        borderBottom: '1px solid #2A2A2A'
      }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '52px',
              fontWeight: 'normal',
              lineHeight: '1.1',
              color: '#F0EDE8',
              margin: 0
            }}>
              FIND YOUR<br/>
              <span style={{ color: '#F5A623' }}>EXACT GLASS</span>
            </h2>
          </div>
          <div style={{
            display: 'flex',
            gap: '16px'
          }}>
            <Link
              href="/smart-match"
              style={{
                padding: '16px 32px',
                background: '#F5A623',
                color: '#0C0C0C',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '20px',
                fontWeight: 'bold',
                letterSpacing: '0.12em',
                textDecoration: 'none',
                cursor: 'pointer'
              }}
            >
              AI MATCHER →
            </Link>
            <Link
              href="/catalog"
              style={{
                padding: '16px 32px',
                border: '1px solid #2A2A2A',
                color: '#7A7570',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '20px',
                fontWeight: 'bold',
                letterSpacing: '0.12em',
                textDecoration: 'none',
                cursor: 'pointer'
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
              BROWSE CATALOG
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
