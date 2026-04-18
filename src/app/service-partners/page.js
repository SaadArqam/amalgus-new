"use client";
import { useState } from 'react';
import { servicePartners } from '@/data/servicePartners';
import { useToast } from '@/components/ToastProvider';

export default function ServicePartnersPage() {
  const { showToast } = useToast();
  const [filterCity, setFilterCity] = useState("");
  const [filterType, setFilterType] = useState("");

  const cities = ["Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad"];
  const types = ["Installer", "Measurement", "Glazing Contractor", "AMC Provider"];

  const filtered = servicePartners.filter(p => {
    return (!filterCity || p.city === filterCity) && 
           (!filterType || p.type === filterType);
  });

  return (
    <div style={{ minHeight: '100vh', background: '#0C0C0C', paddingTop: '28px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h1 style={{
            color: '#F0EDE8',
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(42px, 7vw, 84px)',
            fontWeight: 'normal',
            lineHeight: '1.1',
            marginBottom: '24px'
          }}>Expert Service Partners</h1>
          <p style={{
            color: '#7A7570',
            fontFamily: 'Courier New, Courier, monospace',
            fontSize: '20px',
            letterSpacing: '0.12em',
            lineHeight: '1.5',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            Verified professionals for measuring, installing, and maintaining your glass projects.
          </p>
        </div>

        {/* Filters */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          marginBottom: '64px',
          flexWrap: 'wrap'
        }}>
          <select 
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
            style={{
              padding: '16px',
              background: '#141414',
              border: '1px solid #2A2A2A',
              color: '#F0EDE8',
              fontFamily: 'Courier New, Courier, monospace',
              fontSize: '16px',
              fontWeight: 'bold',
              letterSpacing: '0.12em',
              outline: 'none',
              minWidth: '200px'
            }}
          >
            <option value="">All Cities</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{
              padding: '16px',
              background: '#141414',
              border: '1px solid #2A2A2A',
              color: '#F0EDE8',
              fontFamily: 'Courier New, Courier, monospace',
              fontSize: '16px',
              fontWeight: 'bold',
              letterSpacing: '0.12em',
              outline: 'none',
              minWidth: '200px'
            }}
          >
            <option value="">All Services</option>
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0px',
          border: '1px solid #2A2A2A'
        }}>
          {filtered.map((partner, index) => (
            <div key={partner.id} style={{
              padding: '40px',
              borderRight: (index + 1) % 3 !== 0 ? '1px solid #2A2A2A' : 'none',
              borderBottom: index < filtered.length - 3 ? '1px solid #2A2A2A' : 'none',
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
                  width: '64px',
                  height: '64px',
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
                  {partner.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end'
                }}>
                  <div style={{
                    display: 'flex',
                    color: '#F5A623',
                    marginBottom: '4px'
                  }}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{
                        color: i < Math.floor(partner.rating) ? '#F5A623' : '#2A2A2A'
                      }}>★</span>
                    ))}
                  </div>
                  <div style={{
                    color: '#7A7570',
                    fontFamily: 'Courier New, Courier, monospace',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase'
                  }}>{partner.rating} Rating</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <h3 style={{
                    color: '#F0EDE8',
                    fontFamily: 'Courier New, Courier, monospace',
                    fontSize: '28px',
                    fontWeight: 'bold',
                    letterSpacing: '0.12em',
                    lineHeight: '1.2'
                  }}>{partner.name}</h3>
                  <span style={{
                    color: '#3ECA7A',
                    fontSize: '24px'
                  }} title="Verified Partner">✓</span>
                </div>
                
                <div style={{
                  color: '#4A9EDB',
                  fontFamily: 'Courier New, Courier, monospace',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em'
                }}>
                  {partner.type} • {partner.experience} yrs exp
                </div>
                
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
                  </svg>
                  Serves: {partner.city}
                </div>

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}>
                  {partner.specializations.map(tag => (
                    <span key={tag} style={{
                      padding: '8px 12px',
                      background: '#141414',
                      border: '1px solid #2A2A2A',
                      color: '#7A7570',
                      fontFamily: 'Courier New, Courier, monospace',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => showToast(`Service request sent to ${partner.name}!`)}
                style={{
                  width: '100%',
                  padding: '16px',
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
                Request Service
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
