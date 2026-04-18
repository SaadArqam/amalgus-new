"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ToastProvider';
import { getLocalMatch, getAiMatch } from '@/data/matchLogic';

const sampleQueries = [
  "I need glass for my bathroom shower",
  "Soundproof glass for my office cabin",
  "Glass railing for my balcony on 15th floor",
  "Energy efficient glass for south-facing facade",
  "Back painted glass for my kitchen backsplash",
  "Privacy glass for conference room partition"
];

export default function SmartMatchPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [matchType, setMatchType] = useState(null); // 'local' or 'ai'

  useEffect(() => {
    const savedQuery = localStorage.getItem('amalgus-ai-query');
    if (savedQuery) {
      setQuery(savedQuery);
      localStorage.removeItem('amalgus-ai-query');
      handleMatch(savedQuery);
    }
  }, []);

  const handleMatch = async (inputQuery = query) => {
    if (!inputQuery.trim()) return;
    
    setLoading(true);
    setResults([]);
    
    // Try local rule-based match first
    const localResults = getLocalMatch(inputQuery);
    
    if (localResults.length > 0) {
      setResults(localResults);
      setMatchType('local');
      setLoading(false);
    } else {
      // Fallback to AI
      const aiResults = await getAiMatch(inputQuery);
      if (aiResults) {
        setResults(aiResults);
        setMatchType('ai');
      } else {
        setResults([]);
        setMatchType(null);
      }
      setLoading(false);
    }
  };

  const handleSampleClick = (q) => {
    setQuery(q);
    handleMatch(q);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0C0C0C', paddingTop: '28px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '80px', paddingTop: '48px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 20px',
            background: '#F5A62320',
            border: '1px solid #F5A623',
            borderRadius: '0px',
            color: '#F5A623',
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: '14px',
            fontWeight: 'bold',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '32px'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#3ECA7A'
            }}></div>
            AI-POWERED RECOMMENDATIONS
          </div>
          
          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(48px, 8vw, 96px)',
            fontWeight: 'normal',
            lineHeight: '1.1',
            color: '#F0EDE8',
            margin: '0 0 24px 0'
          }}>
            FIND YOUR<br/>
            <span style={{ color: '#F5A623' }}>PERFECT GLASS</span>
          </h1>
          
          <div style={{
            width: '80px',
            height: '2px',
            background: '#F5A623',
            margin: '0 auto 32px auto'
          }}></div>
          
          <p style={{
            color: '#7A7570',
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: '18px',
            letterSpacing: '0.12em',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Describe your project requirements in plain language. Our intelligent engine converts natural language into technical specifications.
          </p>
        </div>

        {/* Search Input Section */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{
            border: '1px solid #2A2A2A',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
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
              }}>AI ENGINE</span>
            </div>
            
            <textarea 
              style={{
                width: '100%',
                padding: '48px 16px 80px 16px',
                background: 'transparent',
                border: 'none',
                color: '#F0EDE8',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '18px',
                outline: 'none',
                resize: 'none',
                minHeight: '200px',
                lineHeight: '1.6'
              }}
              placeholder="Describe your glass requirements, e.g., 'I need safe glass for my staircase railing on the second floor...'"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            
            <div style={{
              position: 'absolute',
              bottom: '16px',
              right: '16px'
            }}>
              <button 
                onClick={() => handleMatch()}
                disabled={loading}
                style={{
                  padding: '16px 32px',
                  background: loading ? '#4A4540' : '#F5A623',
                  color: '#0C0C0C',
                  border: 'none',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '16px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                {loading ? (
                  <>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid #0C0C0C',
                      borderTop: '2px solid transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    ANALYZING...
                  </>
                ) : (
                  <>
                    MATCH GLASS
                    <span style={{ fontSize: '20px' }}>→</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Sample Queries */}
        <div style={{ marginBottom: '120px' }}>
          <p style={{
            color: '#7A7570',
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: '15px',
            fontWeight: 'bold',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: '24px'
          }}>SAMPLE QUERIES</p>
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            justifyContent: 'center'
          }}>
            {sampleQueries.map((q, i) => (
              <button 
                key={i}
                onClick={() => handleSampleClick(q)}
                style={{
                  padding: '12px 20px',
                  border: '1px solid #2A2A2A',
                  background: 'transparent',
                  color: '#7A7570',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '15px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em',
                  cursor: 'pointer',
                  textTransform: 'uppercase'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#141414';
                  e.target.style.color = '#F0EDE8';
                  e.target.style.borderColor = '#F5A623';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#7A7570';
                  e.target.style.borderColor = '#2A2A2A';
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Results Section */}
        {results.length > 0 && (
          <div style={{ marginBottom: '80px' }}>
            {/* Results Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '48px',
              paddingBottom: '16px',
              borderBottom: '1px solid #2A2A2A'
            }}>
              <h2 style={{
                color: '#F0EDE8',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '24px',
                fontWeight: 'bold',
                letterSpacing: '0.12em',
                margin: 0
              }}>RECOMMENDED SOLUTIONS</h2>
              
              <span style={{
                padding: '8px 16px',
                background: matchType === 'ai' ? '#4A9EDB20' : '#3ECA7A20',
                border: `1px solid ${matchType === 'ai' ? '#4A9EDB' : '#3ECA7A'}`,
                color: matchType === 'ai' ? '#4A9EDB' : '#3ECA7A',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '14px',
                fontWeight: 'bold',
                letterSpacing: '0.12em',
                textTransform: 'uppercase'
              }}>
                {matchType === 'ai' ? 'DEEP AI MATCH' : 'EXPERT RULE MATCH'}
              </span>
            </div>

            {/* Results Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0px',
              border: '1px solid #2A2A2A',
              borderTop: 'none'
            }}>
              {results.map((result, i) => (
                <div
                  key={i}
                  style={{
                    padding: '40px 32px',
                    borderRight: i % 2 === 0 ? '1px solid #2A2A2A' : 'none',
                    borderBottom: '1px solid #2A2A2A',
                    background: 'transparent'
                  }}
                >
                  <h3 style={{
                    color: '#F0EDE8',
                    fontFamily: "'Courier New', Courier, monospace",
                    fontSize: '24px',
                    fontWeight: 'bold',
                    letterSpacing: '0.12em',
                    marginBottom: '16px',
                    textTransform: 'uppercase'
                  }}>{result.name}</h3>
                  
                  <div style={{
                    color: '#7A7570',
                    fontFamily: "'Courier New', Courier, monospace",
                    fontSize: '16px',
                    letterSpacing: '0.12em',
                    lineHeight: '1.5',
                    marginBottom: '24px',
                    fontStyle: 'italic'
                  }}>
                    "{result.reason}"
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                    marginBottom: '32px'
                  }}>
                    <div style={{
                      padding: '16px',
                      background: '#141414',
                      border: '1px solid #2A2A2A'
                    }}>
                      <div style={{
                        color: '#7A7570',
                        fontFamily: "'Courier New', Courier, monospace",
                        fontSize: '14px',
                        fontWeight: 'bold',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        marginBottom: '8px'
                      }}>Thickness</div>
                      <div style={{
                        color: '#F0EDE8',
                        fontFamily: "'Courier New', Courier, monospace",
                        fontSize: '20px',
                        fontWeight: 'bold',
                        letterSpacing: '0.12em'
                      }}>{result.thickness}</div>
                    </div>
                    
                    <div style={{
                      padding: '16px',
                      background: '#141414',
                      border: '1px solid #2A2A2A'
                    }}>
                      <div style={{
                        color: '#7A7570',
                        fontFamily: "'Courier New', Courier, monospace",
                        fontSize: '14px',
                        fontWeight: 'bold',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        marginBottom: '8px'
                      }}>Market Rate</div>
                      <div style={{
                        color: '#F5A623',
                        fontFamily: "'Courier New', Courier, monospace",
                        fontSize: '20px',
                        fontWeight: 'bold',
                        letterSpacing: '0.12em'
                      }}>{result.priceRange}</div>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      showToast(`Saving ${result.name} to your session...`);
                      router.push(`/catalog?search=${encodeURIComponent(result.name)}`);
                    }}
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: 'transparent',
                      color: '#7A7570',
                      border: '1px solid #2A2A2A',
                      fontFamily: "'Courier New', Courier, monospace",
                      fontSize: '15px',
                      fontWeight: 'bold',
                      letterSpacing: '0.12em',
                      cursor: 'pointer',
                      textTransform: 'uppercase'
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
                    GET QUOTE FROM VENDORS →
                  </button>
                </div>
              ))}
            </div>
            
            {/* Disclaimer */}
            <div style={{
              padding: '24px',
              background: '#F5A62310',
              border: '1px solid #F5A623',
              marginTop: '48px'
            }}>
              <p style={{
                color: '#7A7570',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '15px',
                letterSpacing: '0.12em',
                lineHeight: '1.5',
                margin: 0
              }}>
                NOTE: Recommendations based on standard architectural practices. Consult structural engineer for load-bearing installations.
              </p>
            </div>
          </div>
        )}

        {/* Fallback for no results */}
        {!loading && query && results.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '80px 24px',
            border: '1px solid #2A2A2A'
          }}>
            <div style={{
              color: '#4A4540',
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: '18px',
              fontWeight: 'bold',
              letterSpacing: '0.12em',
              marginBottom: '16px'
            }}>NO MATCH FOUND</div>
            <div style={{
              color: '#7A7570',
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: '15px',
              letterSpacing: '0.12em'
            }}>REPHRASE REQUIREMENT OR CONTACT EXPERTS</div>
          </div>
        )}
      </div>
    </div>
  );
}
