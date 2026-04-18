"use client";
import { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        pointerEvents: 'none'
      }}>
        {toasts.map((t) => (
          <div 
            key={t.id}
            style={{
              padding: '16px 24px',
              borderRadius: '2px',
              border: `1px solid ${t.type === 'success' ? '#4A9EDB' : '#E84040'}`,
              background: t.type === 'success' ? '#F5A623' : '#E84040',
              color: t.type === 'success' ? '#0C0C0C' : '#F0EDE8',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              pointerEvents: 'auto',
              animation: 'slideIn 0.3s ease-out'
            }}
          >
            <span style={{ fontSize: '24px' }}>{t.type === 'success' ? '✅' : '❌'}</span>
            <span style={{
              fontFamily: 'Courier New, Courier, monospace',
              fontWeight: 'bold',
              fontSize: '20px',
              letterSpacing: '0.12em'
            }}>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
