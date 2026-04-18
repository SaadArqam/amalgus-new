"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const RoleContext = createContext();

export function RoleProvider({ children }) {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem('amalgus-role');
    const savedUser = localStorage.getItem('amalgus-user');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (!savedRole) {
      setIsModalOpen(true);
    } else {
      setRole(savedRole);
    }

    const handleOpenModal = () => setIsModalOpen(true);
    const switcher = document.getElementById('role-switcher');
    if (switcher) switcher.addEventListener('click', handleOpenModal);

    return () => {
      if (switcher) switcher.removeEventListener('click', handleOpenModal);
    };
  }, []);

  const changeRole = (newRole) => {
    setRole(newRole);
    localStorage.setItem('amalgus-role', newRole);
    setIsModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('amalgus-user');
  };

  return (
    <RoleContext.Provider value={{ role, changeRole, setIsModalOpen, user, setUser, logout }}>
      {children}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          background: 'rgba(0,0,0,0.92)',
          backdropFilter: 'blur(8px)'
        }}>
          <div style={{
            background: '#141414',
            border: '1px solid #2A2A2A',
            maxWidth: '640px',
            width: '100%',
            padding: '32px',
            position: 'relative'
          }}>
            {/* Header Section */}
            <div style={{
              borderBottom: '1px solid #2A2A2A',
              paddingBottom: '24px',
              marginBottom: '32px'
            }}>
              <div style={{
                color: '#7A7570',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '17px',
                fontWeight: 'bold',
                letterSpacing: '0.12em',
                marginBottom: '8px'
              }}>SELECT YOUR ROLE</div>
              <h2 style={{
                color: '#F0EDE8',
                fontFamily: 'Georgia, serif',
                fontSize: '36px',
                fontWeight: 'normal',
                margin: 0
              }}>WHO ARE YOU?</h2>
            </div>
            
            {/* Role Buttons Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px'
            }}>
              {[
                { id: 'Homeowner', title: 'HOMEOWNER', desc: 'Renovating my home', discount: '0%', color: '#3ECA7A' },
                { id: 'Architect', title: 'ARCHITECT', desc: 'Designing projects', discount: '5%', color: '#4A9EDB' },
                { id: 'Builder', title: 'BUILDER', desc: 'Constructing sites', discount: '8%', color: '#E84040' },
                { id: 'Dealer', title: 'DEALER', desc: 'Factory procurement', discount: '12%', color: '#F5A623' },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => changeRole(r.id)}
                  style={{
                    padding: '20px',
                    border: '1px solid #2A2A2A',
                    background: 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    textAlign: 'left',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = r.color;
                    e.target.style.background = r.color + '20';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = '#2A2A2A';
                    e.target.style.background = 'transparent';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: r.color
                    }}></div>
                    <div style={{
                      color: '#F0EDE8',
                      fontFamily: "'Courier New', Courier, monospace",
                      fontSize: '20px',
                      fontWeight: 'bold',
                      letterSpacing: '0.12em'
                    }}>{r.title}</div>
                  </div>
                  <div style={{
                    color: '#7A7570',
                    fontFamily: "'Courier New', Courier, monospace",
                    fontSize: '17px',
                    letterSpacing: '0.12em'
                  }}>{r.desc}</div>
                  {r.discount !== '0%' && (
                    <div style={{
                      alignSelf: 'flex-start',
                      padding: '4px 8px',
                      background: r.color + '20',
                      border: `1px solid ${r.color}`,
                      color: r.color,
                      fontFamily: "'Courier New', Courier, monospace",
                      fontSize: '15px',
                      fontWeight: 'bold',
                      letterSpacing: '0.12em'
                    }}>{r.discount} DISCOUNT</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </RoleContext.Provider>
  );
}

export function useRole() {
  return useContext(RoleContext);
}
