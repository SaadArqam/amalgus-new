"use client";
import { useState, useMemo, useEffect } from 'react';
import { glassProducts } from '@/data/glassProducts';
import { alliedProducts } from '@/data/alliedProducts';
import { useToast } from '@/components/ToastProvider';
import { useRole } from '@/components/RoleProvider';

export default function EstimatePage() {
  const { showToast } = useToast();
  const { role } = useRole();
  const [formData, setFormData] = useState({
    glassTypeId: glassProducts[0]?.id || 1,
    width: 1000,
    height: 1000,
    quantity: 1,
    selectedAllied: []
  });

  const [showModal, setShowModal] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  const selectedGlass = useMemo(() => 
    glassProducts.find(p => p.id === parseInt(formData.glassTypeId))
  , [formData.glassTypeId]);

  const calculations = useMemo(() => {
    if (!selectedGlass) return null;
    const sqft = (formData.width * formData.height) / 92903.04;
    const totalSqft = sqft * formData.quantity;
    const midPrice = (selectedGlass.priceMin + selectedGlass.priceMax) / 2;
    const basePrice = midPrice * totalSqft;
    const discountMap = { 'Homeowner': 0, 'Architect': 0.05, 'Builder': 0.08, 'Dealer': 0.12 };
    const discountRate = discountMap[role || 'Homeowner'] || 0;
    const discountAmount = basePrice * discountRate;
    let alliedCost = 0;
    formData.selectedAllied.forEach(id => {
      const product = alliedProducts.find(p => p.id === id);
      if (product?.name === 'UPVC Frame') alliedCost += 350 * totalSqft;
      else if (product?.name === 'Structural Silicone') alliedCost += 450 * formData.quantity;
      else alliedCost += 2500 * formData.quantity;
    });
    const netAmount = basePrice - discountAmount + alliedCost;
    const gst = netAmount * 0.18;
    const total = netAmount + gst;
    return {
      sqftPerPanel: sqft.toFixed(2),
      totalSqft: totalSqft.toFixed(2),
      basePrice: Math.round(basePrice),
      discountAmount: Math.round(discountAmount),
      alliedCost: Math.round(alliedCost),
      gst: Math.round(gst),
      total: Math.round(total),
      ratePerSqft: midPrice
    };
  }, [formData, selectedGlass, role]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const id = parseInt(value);
      setFormData(prev => ({
        ...prev,
        selectedAllied: checked 
          ? [...prev.selectedAllied, id] 
          : prev.selectedAllied.filter(x => x !== id)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePrint = () => {
    showToast("Generating professional estimate PDF...");
    setTimeout(() => window.print(), 500);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0C0C0C', paddingTop: '28px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', gap: '48px' }}>
          
          {/* Left Panel - Parameters */}
          <div style={{ width: '400px', flexShrink: 0 }}>
            <div style={{
              border: '1px solid #2A2A2A',
              padding: '32px',
              marginBottom: '32px',
              display: 'block'
            }} className="print:hidden">
              <h2 style={{
                color: '#F0EDE8',
                fontFamily: 'Courier New, Courier, monospace',
                fontSize: '20px',
                fontWeight: 'bold',
                letterSpacing: '0.12em',
                marginBottom: '32px'
              }}>ESTIMATE PARAMETERS</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Glass Type */}
                <div>
                  <div style={{
                    color: '#7A7570',
                    fontFamily: 'Courier New, Courier, monospace',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: '8px'
                  }}>Glass Type</div>
                  <select 
                    name="glassTypeId" 
                    value={formData.glassTypeId} 
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#141414',
                      border: '1px solid #2A2A2A',
                      color: '#F0EDE8',
                      fontFamily: 'Courier New, Courier, monospace',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      letterSpacing: '0.12em',
                      outline: 'none'
                    }}
                  >
                    {glassProducts.map(p => <option key={p.id} value={p.id}>{p.name} ({p.thickness})</option>)}
                  </select>
                </div>

                {/* Dimensions */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <div style={{
                      color: '#7A7570',
                      fontFamily: 'Courier New, Courier, monospace',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: '8px'
                    }}>Width (mm)</div>
                    <input 
                      type="number" 
                      name="width" 
                      value={formData.width} 
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: '#141414',
                        border: '1px solid #2A2A2A',
                        color: '#F0EDE8',
                        fontFamily: 'Courier New, Courier, monospace',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        letterSpacing: '0.12em',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <div>
                    <div style={{
                      color: '#7A7570',
                      fontFamily: 'Courier New, Courier, monospace',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: '8px'
                    }}>Height (mm)</div>
                    <input 
                      type="number" 
                      name="height" 
                      value={formData.height} 
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: '#141414',
                        border: '1px solid #2A2A2A',
                        color: '#F0EDE8',
                        fontFamily: 'Courier New, Courier, monospace',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        letterSpacing: '0.12em',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <div style={{
                    color: '#7A7570',
                    fontFamily: 'Courier New, Courier, monospace',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: '8px'
                  }}>Quantity (Panels)</div>
                  <input 
                    type="number" 
                    name="quantity" 
                    value={formData.quantity} 
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#141414',
                      border: '1px solid #2A2A2A',
                      color: '#F0EDE8',
                      fontFamily: 'Courier New, Courier, monospace',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      letterSpacing: '0.12em',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Role Display */}
                <div>
                  <div style={{
                    color: '#7A7570',
                    fontFamily: 'Courier New, Courier, monospace',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: '8px'
                  }}>Selected Customer Role</div>
                  <div style={{
                    padding: '16px',
                    background: '#F5A62310',
                    border: '1px solid #F5A623',
                    color: '#F0EDE8',
                    fontFamily: 'Courier New, Courier, monospace',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    letterSpacing: '0.12em'
                  }}>
                    {role || 'Homeowner'}
                    <div style={{
                      color: '#7A7570',
                      fontSize: '14px',
                      marginTop: '4px'
                    }}>
                      Discount: {(({ 'Homeowner': 0, 'Architect': 5, 'Builder': 8, 'Dealer': 12 })[role] || 0)}%
                    </div>
                  </div>
                </div>

                {/* Allied Products */}
                <div>
                  <div style={{
                    color: '#7A7570',
                    fontFamily: 'Courier New, Courier, monospace',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: '16px'
                  }}>Allied Products</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {alliedProducts.map(product => (
                      <label key={product.id} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        cursor: 'pointer'
                      }}>
                        <input 
                          type="checkbox" 
                          value={product.id} 
                          checked={formData.selectedAllied.includes(product.id)} 
                          onChange={handleInputChange}
                          style={{
                            width: '16px',
                            height: '16px',
                            accentColor: '#F5A623'
                          }}
                        />
                        <span style={{
                          color: '#7A7570',
                          fontFamily: 'Courier New, Courier, monospace',
                          fontSize: '15px',
                          fontWeight: 'bold',
                          letterSpacing: '0.12em'
                        }}>{product.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Estimate Display */}
          <div style={{ flex: 1 }}>
            <div style={{
              border: '1px solid #2A2A2A',
              background: 'transparent',
              overflow: 'hidden'
            }}>
              {/* Header */}
              <div style={{
                padding: '32px',
                borderBottom: '1px solid #2A2A2A',
                background: '#141414'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{
                      color: '#F0EDE8',
                      fontFamily: 'Georgia, serif',
                      fontSize: '36px',
                      fontWeight: 'normal',
                      lineHeight: '1.1',
                      marginBottom: '8px'
                    }}>AmalGus Estimate</div>
                    <div style={{
                      color: '#F5A623',
                      fontFamily: 'Courier New, Courier, monospace',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase'
                    }}>Architectural Glass Solution</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      color: '#7A7570',
                      fontFamily: 'Courier New, Courier, monospace',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: '4px'
                    }}>Issue Date</div>
                    <div style={{
                      color: '#F0EDE8',
                      fontFamily: 'Courier New, Courier, monospace',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      letterSpacing: '0.12em'
                    }}>{currentDate || "--/--/----"}</div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '32px' }}>
                {/* Materials Table */}
                <div style={{ marginBottom: '48px', overflowX: 'auto' }}>
                  <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    minWidth: '600px'
                  }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #2A2A2A' }}>
                        <th style={{
                          padding: '16px 0',
                          color: '#7A7570',
                          fontFamily: 'Courier New, Courier, monospace',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          textAlign: 'left'
                        }}>Material Description</th>
                        <th style={{
                          padding: '16px 0',
                          color: '#7A7570',
                          fontFamily: 'Courier New, Courier, monospace',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          textAlign: 'left'
                        }}>Qty</th>
                        <th style={{
                          padding: '16px 0',
                          color: '#7A7570',
                          fontFamily: 'Courier New, Courier, monospace',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          textAlign: 'left'
                        }}>Rate (₹/sqft)</th>
                        <th style={{
                          padding: '16px 0',
                          color: '#7A7570',
                          fontFamily: 'Courier New, Courier, monospace',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          textAlign: 'right'
                        }}>Total (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #2A2A2A' }}>
                        <td style={{ padding: '20px 0' }}>
                          <div style={{
                            color: '#F0EDE8',
                            fontFamily: 'Courier New, Courier, monospace',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            letterSpacing: '0.12em',
                            marginBottom: '4px'
                          }}>{selectedGlass?.name} Glass</div>
                          <div style={{
                            color: '#7A7570',
                            fontFamily: 'Courier New, Courier, monospace',
                            fontSize: '15px',
                            letterSpacing: '0.12em',
                            marginBottom: '4px'
                          }}>{formData.width}mm x {formData.height}mm | {calculations?.totalSqft} sq.ft total</div>
                          <div style={{
                            color: '#4A4540',
                            fontFamily: 'Courier New, Courier, monospace',
                            fontSize: '14px',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase'
                          }}>Config: {selectedGlass?.thickness} • {selectedGlass?.process}</div>
                        </td>
                        <td style={{ padding: '20px 0' }}>
                          <div style={{
                            color: '#F0EDE8',
                            fontFamily: 'Courier New, Courier, monospace',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            letterSpacing: '0.12em'
                          }}>{formData.quantity}</div>
                        </td>
                        <td style={{ padding: '20px 0' }}>
                          <div style={{
                            color: '#F0EDE8',
                            fontFamily: 'Courier New, Courier, monospace',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            letterSpacing: '0.12em'
                          }}>₹{calculations?.ratePerSqft}</div>
                        </td>
                        <td style={{ padding: '20px 0', textAlign: 'right' }}>
                          <div style={{
                            color: '#F5A623',
                            fontFamily: 'Courier New, Courier, monospace',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            letterSpacing: '0.12em'
                          }}>₹{calculations?.basePrice}</div>
                        </td>
                      </tr>
                      {formData.selectedAllied.length > 0 && (
                        <tr style={{ borderBottom: '1px solid #2A2A2A' }}>
                          <td style={{ padding: '20px 0' }} colSpan="3">
                            <div style={{
                              color: '#F0EDE8',
                              fontFamily: 'Courier New, Courier, monospace',
                              fontSize: '18px',
                              fontWeight: 'bold',
                              letterSpacing: '0.12em',
                              marginBottom: '4px'
                            }}>Selected Allied Products</div>
                            <div style={{
                              color: '#7A7570',
                              fontFamily: 'Courier New, Courier, monospace',
                              fontSize: '15px',
                              letterSpacing: '0.12em'
                            }}>{formData.selectedAllied.map(id => alliedProducts.find(p => p.id === id)?.name).join(', ')}</div>
                          </td>
                          <td style={{ padding: '20px 0', textAlign: 'right' }}>
                            <div style={{
                              color: '#F0EDE8',
                              fontFamily: 'Courier New, Courier, monospace',
                              fontSize: '20px',
                              fontWeight: 'bold',
                              letterSpacing: '0.12em'
                            }}>₹{calculations?.alliedCost}</div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pricing Summary */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '48px' }}>
                  <div style={{ width: '400px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{
                          color: '#7A7570',
                          fontFamily: 'Courier New, Courier, monospace',
                          fontSize: '18px',
                          letterSpacing: '0.12em'
                        }}>Subtotal</span>
                        <span style={{
                          color: '#F0EDE8',
                          fontFamily: 'Courier New, Courier, monospace',
                          fontSize: '18px',
                          fontWeight: 'bold',
                          letterSpacing: '0.12em'
                        }}>₹{calculations?.basePrice + (calculations?.alliedCost || 0)}</span>
                      </div>
                      
                      {calculations?.discountAmount > 0 && (
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '12px 16px',
                          background: '#3ECA7A10',
                          border: '1px solid #3ECA7A'
                        }}>
                          <span style={{
                            color: '#3ECA7A',
                            fontFamily: 'Courier New, Courier, monospace',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase'
                          }}>{role || 'Homeowner'} Discount</span>
                          <span style={{
                            color: '#3ECA7A',
                            fontFamily: 'Courier New, Courier, monospace',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            letterSpacing: '0.12em'
                          }}>- ₹{calculations?.discountAmount}</span>
                        </div>
                      )}
                      
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: '16px',
                        borderTop: '1px solid #2A2A2A'
                      }}>
                        <span style={{
                          color: '#7A7570',
                          fontFamily: 'Courier New, Courier, monospace',
                          fontSize: '18px',
                          letterSpacing: '0.12em'
                        }}>GST (18%)</span>
                        <span style={{
                          color: '#F0EDE8',
                          fontFamily: 'Courier New, Courier, monospace',
                          fontSize: '18px',
                          fontWeight: 'bold',
                          letterSpacing: '0.12em'
                        }}>₹{calculations?.gst}</span>
                      </div>
                      
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: '24px',
                        borderTop: '2px solid #F5A62330'
                      }}>
                        <span style={{
                          color: '#F0EDE8',
                          fontFamily: 'Courier New, Courier, monospace',
                          fontSize: '24px',
                          fontWeight: 'bold',
                          letterSpacing: '0.12em'
                        }}>Grand Total</span>
                        <span style={{
                          color: '#F5A623',
                          fontFamily: 'Courier New, Courier, monospace',
                          fontSize: '32px',
                          fontWeight: 'bold',
                          letterSpacing: '0.12em'
                        }}>₹{calculations?.total}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <div style={{
                  padding: '24px',
                  background: '#141414',
                  border: '1px solid #2A2A2A',
                  marginBottom: '48px'
                }}>
                  <div style={{
                    color: '#7A7570',
                    fontFamily: 'Courier New, Courier, monospace',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: '8px'
                  }}>Legal Disclaimer</div>
                  <p style={{
                    color: '#7A7570',
                    fontFamily: 'Courier New, Courier, monospace',
                    fontSize: '15px',
                    letterSpacing: '0.12em',
                    lineHeight: '1.5',
                    margin: 0,
                    fontStyle: 'italic'
                  }}>
                    Rates are indicative and subject to change based on actual site measurements. Final quote issued by vendor after physical inspection.
                  </p>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '16px' }} className="print:hidden">
                  <button 
                    onClick={handlePrint}
                    style={{
                      flex: 1,
                      padding: '16px',
                      background: 'transparent',
                      color: '#7A7570',
                      border: '1px solid #2A2A2A',
                      fontFamily: 'Courier New, Courier, monospace',
                      fontSize: '16px',
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
                    Download Estimate
                  </button>
                  <button 
                    onClick={() => setShowModal(true)}
                    style={{
                      flex: 1,
                      padding: '16px',
                      background: '#F5A623',
                      color: '#0C0C0C',
                      border: 'none',
                      fontFamily: 'Courier New, Courier, monospace',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      letterSpacing: '0.12em',
                      cursor: 'pointer',
                      textTransform: 'uppercase'
                    }}
                  >
                    Request Formal Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Request Modal */}
      {showModal && (
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
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'transparent'
            }}
            onClick={() => setShowModal(false)}
          ></div>
          <div style={{
            background: '#141414',
            border: '1px solid #2A2A2A',
            padding: '40px',
            maxWidth: '500px',
            width: '100%',
            position: 'relative',
            zIndex: 10
          }}>
            <h3 style={{
              color: '#F0EDE8',
              fontFamily: 'Courier New, Courier, monospace',
              fontSize: '24px',
              fontWeight: 'bold',
              letterSpacing: '0.12em',
              marginBottom: '16px'
            }}>Finalize Quote</h3>
            <p style={{
              color: '#7A7570',
              fontFamily: 'Courier New, Courier, monospace',
              fontSize: '16px',
              letterSpacing: '0.12em',
              lineHeight: '1.5',
              marginBottom: '32px'
            }}>
              Enter your details for our expert to schedule a site measurement.
            </p>
            <form 
              onSubmit={(e) => { 
                e.preventDefault(); 
                showToast("Formal request sent to 3 local factories!"); 
                setShowModal(false); 
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
            >
              <div>
                <div style={{
                  color: '#7A7570',
                  fontFamily: 'Courier New, Courier, monospace',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '8px'
                }}>Full Name</div>
                <input 
                  required 
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
                />
              </div>
              <div>
                <div style={{
                  color: '#7A7570',
                  fontFamily: 'Courier New, Courier, monospace',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '8px'
                }}>WhatsApp Number</div>
                <input 
                  required 
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
                />
              </div>
              <button 
                type="submit"
                style={{
                  width: '100%',
                  padding: '20px',
                  background: '#F5A623',
                  color: '#0C0C0C',
                  border: 'none',
                  fontFamily: 'Courier New, Courier, monospace',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em',
                  cursor: 'pointer',
                  textTransform: 'uppercase'
                }}
              >
                Send Fast Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
