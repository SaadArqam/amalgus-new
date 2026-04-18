"use client";
import { use } from 'react';
import Link from 'next/link';
import { glassProducts } from '@/data/glassProducts';
import { alliedProducts } from '@/data/alliedProducts';
import { vendors } from '@/data/vendors';
import { notFound } from 'next/navigation';
import VendorComparison from '@/components/VendorComparison';

export default function ProductDetailPage({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const product = glassProducts.find(p => p.id === parseInt(id));
  
  if (!product) {
    notFound();
  }
  
  const productVendors = vendors.filter(v => v.glassType === product.name);
  const relatedAlliedProducts = alliedProducts.filter(ap => 
    ap.relatedGlassTypes.includes(product.name)
  ).slice(0, 4);

  return (
    <div style={{ minHeight: '100vh', background: '#0C0C0C', paddingTop: '28px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Breadcrumbs */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '48px',
          padding: '16px 0',
          borderBottom: '1px solid #2A2A2A'
        }}>
          <Link 
            href="/" 
            style={{
              color: '#7A7570',
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: '15px',
              fontWeight: 'bold',
              letterSpacing: '0.12em',
              textDecoration: 'none'
            }}
          >HOME</Link>
          <span style={{ color: '#4A4540' }}>⬥</span>
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
          >CATALOG</Link>
          <span style={{ color: '#4A4540' }}>⬥</span>
          <span style={{
            color: '#F0EDE8',
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: '15px',
            fontWeight: 'bold',
            letterSpacing: '0.12em'
          }}>{product.name}</span>
        </nav>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', marginBottom: '120px' }}>
          
          {/* Product Visual Section */}
          <div>
            <div style={{
              aspectRatio: '1/1',
              border: '1px solid #2A2A2A',
              background: '#141414',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '164px',
              position: 'sticky',
              top: '80px'
            }}>
              {product.imageIcon}
              <div style={{
                position: 'absolute',
                bottom: '24px',
                right: '24px'
              }}>
                <span style={{
                  padding: '8px 16px',
                  background: '#3ECA7A20',
                  border: '1px solid #3ECA7A',
                  color: '#3ECA7A',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '14px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase'
                }}>VERIFIED GRADE</span>
              </div>
            </div>
          </div>

          {/* Product Info Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {/* Header */}
            <div>
              <div style={{
                display: 'inline-block',
                padding: '8px 16px',
                background: '#F5A62320',
                border: '1px solid #F5A623',
                color: '#F5A623',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '14px',
                fontWeight: 'bold',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '24px'
              }}>Category: Architectural Glass</div>
              
              <h1 style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(42px, 6vw, 76px)',
                fontWeight: 'normal',
                lineHeight: '1.1',
                color: '#F0EDE8',
                margin: '0 0 24px 0'
              }}>
                {product.name}<br/>
                <span style={{ color: '#F5A623' }}>GLASS</span>
              </h1>
              
              <p style={{
                color: '#7A7570',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '18px',
                letterSpacing: '0.12em',
                lineHeight: '1.6'
              }}>
                Precision-engineered {product.name} glass optimized for {product.application.toLowerCase()}. 
                Featuring {product.process} processing for superior durability and clarity.
              </p>
            </div>

            {/* Specifications Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '32px',
              padding: '32px 0',
              borderTop: '1px solid #2A2A2A',
              borderBottom: '1px solid #2A2A2A'
            }}>
              <div>
                <div style={{
                  color: '#7A7570',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '14px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '8px'
                }}>Standard Thickness</div>
                <div style={{
                  color: '#F0EDE8',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '28px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em'
                }}>{product.thickness}</div>
              </div>
              
              <div>
                <div style={{
                  color: '#7A7570',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '14px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '8px'
                }}>Processing Method</div>
                <div style={{
                  color: '#F0EDE8',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '28px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em'
                }}>{product.process}</div>
              </div>
              
              <div>
                <div style={{
                  color: '#7A7570',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '14px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '8px'
                }}>Primary Application</div>
                <div style={{
                  color: '#F0EDE8',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '28px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em'
                }}>{product.application}</div>
              </div>
              
              <div>
                <div style={{
                  color: '#7A7570',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '14px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '8px'
                }}>Est. Market Rate</div>
                <div style={{
                  color: '#F5A623',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '28px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em'
                }}>₹{product.priceMin}-{product.priceMax}/sq.ft</div>
              </div>
            </div>

            {/* Performance Tags */}
            <div>
              <div style={{
                color: '#7A7570',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '16px',
                fontWeight: 'bold',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '16px'
              }}>Performance Tags</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {product.tags.map(tag => (
                  <span 
                    key={tag} 
                    style={{
                      padding: '8px 16px',
                      border: '1px solid #2A2A2A',
                      background: '#141414',
                      color: '#7A7570',
                      fontFamily: "'Courier New', Courier, monospace",
                      fontSize: '14px',
                      fontWeight: 'bold',
                      letterSpacing: '0.12em'
                    }}
                  >#{tag}</span>
                ))}
              </div>
            </div>

            {/* Quote Request Card */}
            <div style={{
              border: '1px solid #F5A623',
              padding: '40px',
              background: '#F5A62310',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '-40px',
                right: '-40px',
                width: '120px',
                height: '120px',
                background: 'radial-gradient(circle, #F5A62320 0%, transparent 70%)'
              }}></div>
              
              <h3 style={{
                color: '#F0EDE8',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '24px',
                fontWeight: 'bold',
                letterSpacing: '0.12em',
                marginBottom: '16px'
              }}>Request Site Measurement</h3>
              
              <p style={{
                color: '#7A7570',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '16px',
                letterSpacing: '0.12em',
                lineHeight: '1.5',
                marginBottom: '32px'
              }}>
                Get exact pricing from 3 verified local fabricators within 24 hours.
              </p>
              
              <div style={{ display: 'flex', gap: '16px' }}>
                <Link 
                  href="/estimate" 
                  style={{
                    flex: 1,
                    padding: '16px',
                    background: '#F5A623',
                    color: '#0C0C0C',
                    border: 'none',
                    fontFamily: "'Courier New', Courier, monospace",
                    fontSize: '16px',
                    fontWeight: 'bold',
                    letterSpacing: '0.12em',
                    textDecoration: 'none',
                    textAlign: 'center',
                    cursor: 'pointer',
                    textTransform: 'uppercase'
                  }}
                >Instant Estimate</Link>
                
                <Link 
                  href="/service-partners" 
                  style={{
                    flex: 1,
                    padding: '16px',
                    border: '1px solid #2A2A2A',
                    background: 'transparent',
                    color: '#7A7570',
                    fontFamily: "'Courier New', Courier, monospace",
                    fontSize: '16px',
                    fontWeight: 'bold',
                    letterSpacing: '0.12em',
                    textDecoration: 'none',
                    textAlign: 'center',
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
                >Contact Expert</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Vendor Comparison Section */}
        <VendorComparison vendors={productVendors} basePrice={product.priceMin} />

        {/* Complete Your System Section */}
        {relatedAlliedProducts.length > 0 && (
          <section style={{ marginTop: '120px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              marginBottom: '48px',
              paddingBottom: '16px',
              borderBottom: '1px solid #2A2A2A'
            }}>
              <span style={{
                color: '#F5A623',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '28px',
                fontWeight: 'bold',
                letterSpacing: '0.12em'
              }}>04</span>
              <div>
                <h2 style={{
                  color: '#F0EDE8',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '20px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em',
                  margin: 0
                }}>COMPLETE YOUR SYSTEM</h2>
                <p style={{
                  color: '#7A7570',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '15px',
                  letterSpacing: '0.12em',
                  margin: '4px 0 0 0'
                }}>RELATED ALLIED PRODUCTS</p>
              </div>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '0px',
              border: '1px solid #2A2A2A',
              borderTop: 'none'
            }}>
              {relatedAlliedProducts.map((item, i) => (
                <div
                  key={item.id}
                  style={{
                    padding: '32px 24px',
                    borderRight: i < 3 ? '1px solid #2A2A2A' : 'none',
                    borderBottom: '1px solid #2A2A2A',
                    background: 'transparent'
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    border: '1px solid #2A2A2A',
                    background: '#141414',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                    fontSize: '24px'
                  }}>🔧</div>
                  
                  <div style={{
                    color: '#7A7570',
                    fontFamily: "'Courier New', Courier, monospace",
                    fontSize: '14px',
                    fontWeight: 'bold',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: '8px'
                  }}>{item.category}</div>
                  
                  <h4 style={{
                    color: '#F0EDE8',
                    fontFamily: "'Courier New', Courier, monospace",
                    fontSize: '18px',
                    fontWeight: 'bold',
                    letterSpacing: '0.12em',
                    marginBottom: '8px'
                  }}>{item.name}</h4>
                  
                  <p style={{
                    color: '#7A7570',
                    fontFamily: "'Courier New', Courier, monospace",
                    fontSize: '16px',
                    letterSpacing: '0.12em',
                    marginBottom: '16px'
                  }}>{item.price}</p>
                  
                  <Link 
                    href="/catalog" 
                    style={{
                      color: '#F5A623',
                      fontFamily: "'Courier New', Courier, monospace",
                      fontSize: '15px',
                      fontWeight: 'bold',
                      letterSpacing: '0.12em',
                      textDecoration: 'none'
                    }}
                  >VIEW PRODUCT →</Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
