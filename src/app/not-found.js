"use client";
import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px',
      textAlign: 'center'
    }}>
      <div style={{
        position: 'relative',
        marginBottom: '48px'
      }}>
        <div style={{
          fontSize: '196px',
          fontFamily: 'Courier New, Courier, monospace',
          fontWeight: 'bold',
          color: '#2A2A2A',
          opacity: 0.1,
          userSelect: 'none'
        }}>404</div>
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            fontSize: '148px',
            transition: 'transform 0.5s ease',
            cursor: 'default'
          }}>
            🪟
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '192px',
              height: '4px',
              background: 'rgba(232, 64, 64, 0.2)',
              filter: 'blur(8px)',
              transform: 'translate(-50%, -50%) rotate(45deg)'
            }}></div>
          </div>
        </div>
      </div>
      
      <h1 style={{
        color: '#F0EDE8',
        fontFamily: 'Georgia, serif',
        fontSize: 'clamp(42px, 7vw, 76px)',
        fontWeight: 'normal',
        lineHeight: '1.1',
        marginBottom: '16px'
      }}>Glass Shattered!</h1>
      <p style={{
        color: '#7A7570',
        fontFamily: 'Courier New, Courier, monospace',
        fontSize: '22px',
        letterSpacing: '0.12em',
        lineHeight: '1.5',
        maxWidth: '600px',
        margin: '0 auto 40px'
      }}>
        The page you are looking for has been moved or doesn't exist. Let's find you a solid alternative.
      </p>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        justifyContent: 'center'
      }}>
        <Link 
          href="/"
          style={{
            background: '#F5A623',
            color: '#0C0C0C',
            padding: '16px 32px',
            borderRadius: '2px',
            fontFamily: 'Courier New, Courier, monospace',
            fontWeight: 'bold',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#4A9EDB';
            e.target.style.color = '#0C0C0C';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = '#F5A623';
            e.target.style.color = '#0C0C0C';
          }}
        >
          Return Home
        </Link>
        <Link 
          href="/catalog"
          style={{
            background: 'transparent',
            color: '#7A7570',
            border: '1px solid #2A2A2A',
            padding: '16px 32px',
            borderRadius: '2px',
            fontFamily: 'Courier New, Courier, monospace',
            fontWeight: 'bold',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#141414';
            e.target.style.color = '#F0EDE8';
            e.target.style.borderColor = '#F0EDE8';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = '#7A7570';
            e.target.style.borderColor = '#2A2A2A';
          }}
        >
          Browse Catalog
        </Link>
      </div>
    </div>
  );
}
