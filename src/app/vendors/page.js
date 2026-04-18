"use client";
import { useState } from 'react';
import { vendors } from '@/data/vendors';
import { glassProducts } from '@/data/glassProducts';
import { useToast } from '@/components/ToastProvider';

export default function VendorsPage() {
  const { showToast } = useToast();
  const [filterCity, setFilterCity] = useState("");
  const [filterType, setFilterType] = useState("");

  const cities = [...new Set(vendors.map(v => v.city))];
  const glassTypes = [...new Set(vendors.map(v => v.glassType))];

  const filteredVendors = vendors.filter(v => {
    return (!filterCity || v.city === filterCity) && 
           (!filterType || v.glassType === filterType);
  });

  return (
    <div style={{ minHeight: '100vh', background: '#0C0C0C', paddingTop: '28px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header Section */}
        <div style={{ marginBottom: '64px' }}>
          <h1 style={{
            color: '#F0EDE8',
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(42px, 7vw, 84px)',
            fontWeight: 'normal',
            lineHeight: '1.1',
            marginBottom: '24px'
          }}>Verified Factory Partners</h1>
          <p style={{
            color: '#7A7570',
            fontFamily: 'Courier New, Courier, monospace',
            fontSize: '20px',
            letterSpacing: '0.12em',
            lineHeight: '1.5',
            maxWidth: '800px'
          }}>
            Direct access to India's most reliable glass fabricators and processing units, vetted for quality and lead times.
          </p>
        </div>

        {/* Filters */}
        <div style={{
          display: 'flex',
          gap: '24px',
          marginBottom: '64px',
          padding: '32px',
          background: '#141414',
          border: '1px solid #2A2A2A'
        }}>
          <div style={{ flex: 1, minWidth: '240px' }}>
            <div style={{
              color: '#7A7570',
              fontFamily: 'Courier New, Courier, monospace',
              fontSize: '14px',
              fontWeight: 'bold',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '8px'
            }}>Filter by City</div>
            <select 
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              style={{
                width: '100%',
                padding: '16px',
                background: '#0C0C0C',
                border: '1px solid #2A2A2A',
                color: '#F0EDE8',
                fontFamily: 'Courier New, Courier, monospace',
                fontSize: '16px',
                fontWeight: 'bold',
                letterSpacing: '0.12em',
                outline: 'none'
              }}
            >
              <option value="">All Regions</option>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ flex: 1, minWidth: '240px' }}>
            <div style={{
              color: '#7A7570',
              fontFamily: 'Courier New, Courier, monospace',
              fontSize: '14px',
              fontWeight: 'bold',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '8px'
            }}>Glass Specialization</div>
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={{
                width: '100%',
                padding: '16px',
                background: '#0C0C0C',
                border: '1px solid #2A2A2A',
                color: '#F0EDE8',
                fontFamily: 'Courier New, Courier, monospace',
                fontSize: '16px',
                fontWeight: 'bold',
                letterSpacing: '0.12em',
                outline: 'none'
              }}
            >
              <option value="">All Glass Types</option>
              {glassTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        {/* Vendor Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0px',
          border: '1px solid #2A2A2A'
        }}>
          {filteredVendors.map((vendor, index) => (
            <div key={vendor.id} style={{
              padding: '40px',
              borderRight: (index + 1) % 3 !== 0 ? '1px solid #2A2A2A' : 'none',
              borderBottom: index < filteredVendors.length - 3 ? '1px solid #2A2A2A' : 'none',
              background: 'transparent',
              display: 'flex',
              flexDirection: 'column',
              gap: '32px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  background: '#141414',
                  border: '1px solid #2A2A2A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#F0EDE8',
                  fontSize: '28px',
                  fontFamily: 'Courier New, Courier, monospace',
                  fontWeight: 'bold'
                }}>
                  {vendor.vendorName.charAt(0)}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '4px',
                    marginBottom: '4px'
                  }}>
                    <span style={{ color: '#F5A623', fontSize: '20px' }}>★</span>
                    <span style={{
                      color: '#F0EDE8',
                      fontFamily: 'Courier New, Courier, monospace',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      letterSpacing: '0.12em'
                    }}>{vendor.rating}</span>
                  </div>
                  <div style={{
                    color: '#7A7570',
                    fontFamily: 'Courier New, Courier, monospace',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase'
                  }}>Global Rating</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{
                  color: '#F0EDE8',
                  fontFamily: 'Courier New, Courier, monospace',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em',
                  lineHeight: '1.2'
                }}>
                  {vendor.vendorName}
                </h3>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#7A7570',
                  fontFamily: 'Courier New, Courier, monospace',
                  fontSize: '16px',
                  letterSpacing: '0.12em'
                }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {vendor.city}, India
                </div>

                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '8px 16px',
                  background: '#4A9EDB20',
                  border: '1px solid #4A9EDB',
                  color: '#4A9EDB',
                  fontFamily: 'Courier New, Courier, monospace',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  width: 'fit-content'
                }}>
                  {vendor.glassType} Specialist
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                paddingTop: '24px',
                borderTop: '1px solid #2A2A2A'
              }}>
                <div>
                  <div style={{
                    color: '#7A7570',
                    fontFamily: 'Courier New, Courier, monospace',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: '4px'
                  }}>Avg Lead Time</div>
                  <div style={{
                    color: '#F0EDE8',
                    fontFamily: 'Courier New, Courier, monospace',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    letterSpacing: '0.12em'
                  }}>{vendor.deliveryDays} Days</div>
                </div>
                <button 
                  onClick={() => showToast(`Portfolio request sent to ${vendor.vendorName}!`)}
                  style={{
                    padding: '12px 24px',
                    background: '#F5A623',
                    color: '#0C0C0C',
                    border: 'none',
                    fontFamily: 'Courier New, Courier, monospace',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    cursor: 'pointer'
                  }}
                >
                  Request Portfolio
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredVendors.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '120px 32px',
            background: '#141414',
            border: '1px solid #2A2A2A'
          }}>
            <h3 style={{
              color: '#F0EDE8',
              fontFamily: 'Courier New, Courier, monospace',
              fontSize: '28px',
              fontWeight: 'bold',
              letterSpacing: '0.12em',
              marginBottom: '16px'
            }}>No vendors found in this region</h3>
            <p style={{
              color: '#7A7570',
              fontFamily: 'Courier New, Courier, monospace',
              fontSize: '18px',
              letterSpacing: '0.12em'
            }}>Try expanding your search parameters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
