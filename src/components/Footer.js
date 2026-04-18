"use client";
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      background: '#141414',
      borderTop: '1px solid #2A2A2A',
      marginTop: '120px'
    }} className="print:hidden">
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '48px 24px'
      }}>
        {/* Top Row: Logo + Stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '48px',
          paddingBottom: '24px',
          borderBottom: '1px solid #2A2A2A'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              border: '2px solid #F5A623',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{
                color: '#F5A623',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '20px',
                fontWeight: 'bold'
              }}>A</span>
            </div>
            <div>
              <div style={{
                color: '#F0EDE8',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '18px',
                fontWeight: 'bold',
                letterSpacing: '0.12em'
              }}>AMALGUS</div>
              <div style={{
                color: '#7A7570',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '17px',
                letterSpacing: '0.12em'
              }}>INDIA'S MOST INTELLIGENT GLASS MARKETPLACE</div>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            gap: '32px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                color: '#F5A623',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '22px',
                fontWeight: 'bold',
                letterSpacing: '0.12em'
              }}>150B+</div>
              <div style={{
                color: '#7A7570',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '16px',
                letterSpacing: '0.12em'
              }}>GLOBAL MARKET</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                color: '#F5A623',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '20px',
                fontWeight: 'bold',
                letterSpacing: '0.12em'
              }}>52+</div>
              <div style={{
                color: '#7A7570',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '13px',
                letterSpacing: '0.12em'
              }}>CUSTOMER TYPES</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                color: '#F5A623',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '20px',
                fontWeight: 'bold',
                letterSpacing: '0.12em'
              }}>8+</div>
              <div style={{
                color: '#7A7570',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '13px',
                letterSpacing: '0.12em'
              }}>GLASS CATEGORIES</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                color: '#3ECA7A',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '20px',
                fontWeight: 'bold',
                letterSpacing: '0.12em'
              }}>LIVE</div>
              <div style={{
                color: '#7A7570',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '13px',
                letterSpacing: '0.12em'
              }}>FACTORY RATES</div>
            </div>
          </div>
        </div>

        {/* Middle: 3 Column Link Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '0px',
          marginBottom: '48px'
        }}>
          <div style={{
            padding: '32px',
            borderRight: '1px solid #2A2A2A'
          }}>
            <h4 style={{
              color: '#7A7570',
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: '17px',
              fontWeight: 'bold',
              letterSpacing: '0.12em',
              marginBottom: '16px'
            }}>PLATFORM</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link href="/" style={{
                color: '#7A7570',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '15px',
                letterSpacing: '0.12em',
                textDecoration: 'none'
              }}>HOME</Link>
              <Link href="/catalog" style={{
                color: '#7A7570',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '15px',
                letterSpacing: '0.12em',
                textDecoration: 'none'
              }}>CATALOG</Link>
              <Link href="/smart-match" style={{
                color: '#7A7570',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '15px',
                letterSpacing: '0.12em',
                textDecoration: 'none'
              }}>AI MATCHER</Link>
              <Link href="/estimate" style={{
                color: '#7A7570',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '15px',
                letterSpacing: '0.12em',
                textDecoration: 'none'
              }}>ESTIMATE</Link>
            </div>
          </div>
          
          <div style={{
            padding: '32px',
            borderRight: '1px solid #2A2A2A'
          }}>
            <h4 style={{
              color: '#7A7570',
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: '17px',
              fontWeight: 'bold',
              letterSpacing: '0.12em',
              marginBottom: '16px'
            }}>NETWORK</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link href="/vendors" style={{
                color: '#7A7570',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '15px',
                letterSpacing: '0.12em',
                textDecoration: 'none'
              }}>VENDORS</Link>
              <Link href="/service-partners" style={{
                color: '#7A7570',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '15px',
                letterSpacing: '0.12em',
                textDecoration: 'none'
              }}>SERVICE PARTNERS</Link>
              <Link href="/rates" style={{
                color: '#7A7570',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '15px',
                letterSpacing: '0.12em',
                textDecoration: 'none'
              }}>DAILY RATES</Link>
              <Link href="/allied" style={{
                color: '#7A7570',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '15px',
                letterSpacing: '0.12em',
                textDecoration: 'none'
              }}>ALLIED PRODUCTS</Link>
            </div>
          </div>
          
          <div style={{
            padding: '32px'
          }}>
            <h4 style={{
              color: '#7A7570',
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: '17px',
              fontWeight: 'bold',
              letterSpacing: '0.12em',
              marginBottom: '16px'
            }}>GLASS TYPES</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{
                color: '#7A7570',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '15px',
                letterSpacing: '0.12em'
              }}>CLEAR FLOAT</span>
              <span style={{
                color: '#7A7570',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '15px',
                letterSpacing: '0.12em'
              }}>TOUGHENED</span>
              <span style={{
                color: '#7A7570',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '15px',
                letterSpacing: '0.12em'
              }}>LAMINATED</span>
              <span style={{
                color: '#7A7570',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '15px',
                letterSpacing: '0.12em'
              }}>DGU/IGU</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '24px',
          borderTop: '1px solid #2A2A2A'
        }}>
          <div style={{
            color: '#4A4540',
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: '16px',
            letterSpacing: '0.12em'
          }}>
            © {new Date().getFullYear()} AMALGUS. ALL RIGHTS RESERVED.
          </div>
          <div style={{
            color: '#4A4540',
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: '16px',
            letterSpacing: '0.12em'
          }}>
            PROTOTYPE BUILD · NOT FOR PRODUCTION USE
          </div>
        </div>
      </div>
    </footer>
  );
}
