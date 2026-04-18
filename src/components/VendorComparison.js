"use client";
import { useState, useMemo } from 'react';
import { useToast } from '@/components/ToastProvider';

export default function VendorComparison({ vendors, basePrice }) {
  const { showToast } = useToast();
  const [sortKey, setSortKey] = useState('price');

  const vendorList = useMemo(() => {
    const list = vendors.map(v => ({
      ...v,
      finalPrice: Math.round(basePrice * (1 + v.priceVariation / 100))
    }));

    return list.sort((a, b) => {
      if (sortKey === 'price') return a.finalPrice - b.finalPrice;
      if (sortKey === 'rating') return b.rating - a.rating;
      if (sortKey === 'delivery') return a.deliveryDays - b.deliveryDays;
      return 0;
    });
  }, [vendors, basePrice, sortKey]);

  return (
    <section style={{ marginTop: '80px' }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: '32px',
        gap: '16px'
      }}>
        <div>
          <h2 style={{
            color: '#F0EDE8',
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(30px, 5vw, 48px)',
            fontWeight: 'normal',
            lineHeight: '1.1',
            marginBottom: '8px'
          }}>Vendor Price Comparison</h2>
          <p style={{
            color: '#7A7570',
            fontFamily: 'Courier New, Courier, monospace',
            fontSize: '18px',
            letterSpacing: '0.12em',
            lineHeight: '1.5'
          }}>
            Compare real-time quotes from verified factory partners in your region.
          </p>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '8px',
          background: '#141414',
          border: '1px solid #2A2A2A'
        }}>
          <span style={{
            color: '#7A7570',
            fontFamily: 'Courier New, Courier, monospace',
            fontSize: '14px',
            fontWeight: 'bold',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            paddingLeft: '8px'
          }}>Sort by:</span>
          {['price', 'rating', 'delivery'].map(key => (
            <button
              key={key}
              onClick={() => setSortKey(key)}
              style={{
                padding: '6px 16px',
                background: sortKey === key ? '#F5A623' : 'transparent',
                color: sortKey === key ? '#0C0C0C' : '#7A7570',
                border: 'none',
                fontFamily: 'Courier New, Courier, monospace',
                fontSize: '14px',
                fontWeight: 'bold',
                letterSpacing: '0.12em',
                textTransform: 'capitalize',
                cursor: 'pointer'
              }}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      <div style={{
        background: '#141414',
        border: '1px solid #2A2A2A',
        overflow: 'hidden'
      }}>
        <table style={{
          width: '100%',
          textAlign: 'left'
        }}>
          <thead style={{
            background: '#141414'
          }}>
            <tr style={{
              color: '#7A7570',
              fontFamily: 'Courier New, Courier, monospace',
              fontSize: '14px',
              fontWeight: 'bold',
              letterSpacing: '0.12em',
              textTransform: 'uppercase'
            }}>
              <th style={{ padding: '20px 32px' }}>Vendor Name</th>
              <th style={{ padding: '20px 32px' }}>Location</th>
              <th style={{ padding: '20px 32px' }}>Price (/sqft)</th>
              <th style={{ padding: '20px 32px' }}>Rating</th>
              <th style={{ padding: '20px 32px' }}>Est. Delivery</th>
              <th style={{ padding: '20px 32px', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {vendorList.map((vendor, i) => (
              <tr key={vendor.id} style={{
                background: i === 0 ? '#3ECA7A10' : 'transparent',
                borderBottom: '1px solid #2A2A2A'
              }}>
                <td style={{
                  padding: '24px 32px',
                  color: '#F0EDE8',
                  fontFamily: 'Courier New, Courier, monospace',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    {vendor.vendorName}
                    {i === 0 && (
                      <span style={{
                        background: '#3ECA7A20',
                        color: '#3ECA7A',
                        fontSize: '13px',
                        fontFamily: 'Courier New, Courier, monospace',
                        fontWeight: 'bold',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        padding: '2px 8px',
                        border: '1px solid #3ECA7A'
                      }}>
                        Best Value
                      </span>
                    )}
                  </div>
                </td>
                <td style={{
                  padding: '24px 32px',
                  color: '#7A7570',
                  fontFamily: 'Courier New, Courier, monospace',
                  fontSize: '16px',
                  letterSpacing: '0.12em'
                }}>{vendor.city}</td>
                <td style={{
                  padding: '24px 32px',
                  color: '#F0EDE8',
                  fontFamily: 'Courier New, Courier, monospace',
                  fontSize: '22px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em'
                }}>
                  ₹{vendor.finalPrice}
                </td>
                <td style={{
                  padding: '24px 32px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <span style={{ color: '#F5A623', fontSize: '20px' }}>★</span>
                    <span style={{
                      color: '#F0EDE8',
                      fontFamily: 'Courier New, Courier, monospace',
                      fontWeight: 'bold',
                      letterSpacing: '0.12em'
                    }}>{vendor.rating}</span>
                  </div>
                </td>
                <td style={{
                  padding: '24px 32px',
                  color: '#7A7570',
                  fontFamily: 'Courier New, Courier, monospace',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em'
                }}>
                  {vendor.deliveryDays} Days
                </td>
                <td style={{
                  padding: '24px 32px',
                  textAlign: 'right'
                }}>
                  <button 
                    onClick={() => showToast(`Quote request sent to ${vendor.vendorName}!`)}
                    style={{
                      background: 'transparent',
                      border: '1px solid #2A2A2A',
                      padding: '8px 24px',
                      color: '#7A7570',
                      fontFamily: 'Courier New, Courier, monospace',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#F5A623';
                      e.target.style.color = '#0C0C0C';
                      e.target.style.borderColor = '#F5A623';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.color = '#7A7570';
                      e.target.style.borderColor = '#2A2A2A';
                    }}
                  >
                    Get Quote
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
