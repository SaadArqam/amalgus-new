"use client";
import { dailyRates } from '@/data/dailyRates';
import { glassProducts } from '@/data/glassProducts';

export default function RatesDashboard() {
  const timestamp = "9:00 AM IST, " + new Date().toLocaleDateString();

  // Mock yesterday's rates and trends
  const ratesWithTrends = dailyRates.map((rate, i) => {
    const todayNum = rate.low;
    const rateString = `₹${rate.low} - ₹${rate.high}`;
    
    // Generate a mocked yesterday rate (within +/- 5% of today)
    const diff = (i % 2 === 0 ? 1 : -1) * (i + 2);
    const yesterdayRate = todayNum - diff;
    const changePct = ((todayNum - yesterdayRate) / yesterdayRate * 100).toFixed(1);
    
    return {
      ...rate,
      name: rate.type,
      rate: rateString,
      yesterday: `₹${yesterdayRate}`,
      change: changePct,
      isUp: todayNum > yesterdayRate
    };
  });

  return (
    <div style={{ minHeight: '100vh', background: '#0C0C0C', paddingTop: '28px', paddingBottom: '80px' }}>
      
      {/* Marquee Ticker */}
      <div style={{
        background: '#141414',
        padding: '12px 0',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        borderBottom: '1px solid #2A2A2A',
        marginTop: '80px'
      }}>
        <div style={{
          display: 'flex',
          width: '200%',
          animation: 'marquee 30s linear infinite'
        }}>
          {[...ratesWithTrends, ...ratesWithTrends].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              marginRight: '48px'
            }}>
              <span style={{
                color: '#7A7570',
                fontFamily: 'Courier New, Courier, monospace',
                fontSize: '14px',
                fontWeight: 'bold',
                letterSpacing: '0.12em',
                textTransform: 'uppercase'
              }}>{item.name}</span>
              <span style={{
                color: '#F0EDE8',
                fontFamily: 'Courier New, Courier, monospace',
                fontSize: '16px',
                fontWeight: 'bold',
                letterSpacing: '0.12em'
              }}>{item.rate.split(' - ')[0]}</span>
              <span style={{
                color: item.isUp ? '#3ECA7A' : '#E84040',
                fontFamily: 'Courier New, Courier, monospace',
                fontSize: '14px',
                fontWeight: 'bold',
                letterSpacing: '0.12em'
              }}>
                {item.isUp ? '▲' : '▼'} {Math.abs(item.change)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header Section */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '48px',
          gap: '24px'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 20px',
              background: '#4A9EDB20',
              border: '1px solid #4A9EDB',
              borderRadius: '0px',
              color: '#4A9EDB',
              fontFamily: 'Courier New, Courier, monospace',
              fontSize: '14px',
              fontWeight: 'bold',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '24px'
            }}>
              Real-time Market Index
            </div>
            <h1 style={{
              color: '#F0EDE8',
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(42px, 7vw, 84px)',
              fontWeight: 'normal',
              lineHeight: '1.1',
              marginBottom: '16px'
            }}>Daily Glass Pulse</h1>
            <p style={{
              color: '#7A7570',
              fontFamily: 'Courier New, Courier, monospace',
              fontSize: '18px',
              letterSpacing: '0.12em',
              lineHeight: '1.5'
            }}>
              Official market indices for primary architectural glass grades.
            </p>
          </div>
          <div style={{
            borderLeft: '2px solid #4A9EDB20',
            paddingLeft: '16px'
          }}>
            <div style={{
              color: '#7A7570',
              fontFamily: 'Courier New, Courier, monospace',
              fontSize: '14px',
              fontWeight: 'bold',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '4px'
            }}>Last Updated</div>
            <div style={{
              color: '#F0EDE8',
              fontFamily: 'Courier New, Courier, monospace',
              fontSize: '20px',
              fontWeight: 'bold',
              letterSpacing: '0.12em'
            }}>{timestamp}</div>
          </div>
        </div>

        {/* Rates Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0px',
          border: '1px solid #2A2A2A',
          borderTop: 'none'
        }}>
          {ratesWithTrends.map((rate, i) => (
            <div key={i} style={{
              padding: '40px 32px',
              borderRight: i % 2 === 0 ? '1px solid #2A2A2A' : 'none',
              borderBottom: '1px solid #2A2A2A',
              background: 'transparent',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '32px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '24px'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: '#141414',
                  border: '1px solid #2A2A2A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '36px',
                  flexShrink: 0
                }}>
                  {glassProducts.find(p => p.name === rate.name)?.imageIcon || '💎'}
                </div>
                <div>
                  <h3 style={{
                    color: '#F0EDE8',
                    fontFamily: 'Courier New, Courier, monospace',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    letterSpacing: '0.12em',
                    marginBottom: '8px'
                  }}>{rate.name}</h3>
                  <p style={{
                    color: '#7A7570',
                    fontFamily: 'Courier New, Courier, monospace',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    lineHeight: '1'
                  }}>Base Category</p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: '24px'
              }}>
                <div>
                  <div style={{
                    color: '#7A7570',
                    fontFamily: 'Courier New, Courier, monospace',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: '8px'
                  }}>Trend</div>
                  <div style={{
                    width: '80px',
                    height: '32px'
                  }}>
                    <svg viewBox="0 0 100 30" style={{ width: '100%', height: '100%' }}>
                      <path 
                        d={rate.isUp ? "M0 25 L20 20 L40 22 L60 10 L80 15 L100 5" : "M0 5 L20 15 L40 10 L60 22 L80 20 L100 25"} 
                        fill="none" 
                        stroke={rate.isUp ? "#3ECA7A" : "#E84040"} 
                        strokeWidth="2" 
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
                
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '8px',
                    marginBottom: '4px'
                  }}>
                    <span style={{
                      color: rate.isUp ? '#3ECA7A' : '#E84040',
                      fontFamily: 'Courier New, Courier, monospace',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      letterSpacing: '0.12em'
                    }}>
                      {rate.isUp ? '▲' : '▼'} {Math.abs(rate.change)}%
                    </span>
                    <span style={{
                      color: '#7A7570',
                      fontFamily: 'Courier New, Courier, monospace',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      letterSpacing: '0.12em'
                    }}>VS YESTERDAY</span>
                  </div>
                  <div style={{
                    color: '#F0EDE8',
                    fontFamily: 'Courier New, Courier, monospace',
                    fontSize: '36px',
                    fontWeight: 'bold',
                    letterSpacing: '0.12em'
                  }}>{rate.rate.split(' - ')[0]}</div>
                  <p style={{
                    color: '#7A7570',
                    fontFamily: 'Courier New, Courier, monospace',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    letterSpacing: '0.12em'
                  }}>Ex-Factory Price /sq.ft</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Market Notice */}
        <div style={{
          marginTop: '64px',
          padding: '32px',
          background: '#141414',
          border: '1px solid #2A2A2A'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px'
          }}>
            <div style={{
              color: '#4A9EDB',
              fontSize: '28px'
            }}>ℹ️</div>
            <div>
              <p style={{
                color: '#F0EDE8',
                fontFamily: 'Courier New, Courier, monospace',
                fontSize: '18px',
                fontWeight: 'bold',
                letterSpacing: '0.12em',
                marginBottom: '8px'
              }}>Market Notice</p>
              <p style={{
                color: '#7A7570',
                fontFamily: 'Courier New, Courier, monospace',
                fontSize: '16px',
                letterSpacing: '0.12em',
                lineHeight: '1.5',
                margin: 0
              }}>
                Rates listed above are indicative wholesale market indices. Actual prices may vary significantly based on the specific factory output, geographic location of the vendor, site logistics, and bulk order quantities.
                <br/><br/>
                For custom processing (Toughening, Lamination, Edging), additional conversion costs will apply. Always request a formal quote for billable projects.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
