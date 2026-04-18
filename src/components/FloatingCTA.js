"use client";
import Link from 'next/link';

export default function FloatingCTA() {
  return (
    <div style={{
      position: 'fixed',
      bottom: '32px',
      right: '32px',
      zIndex: 100,
      display: 'block'
    }} className="print:hidden">
      <Link 
        href="/estimate"
        style={{
          position: 'relative',
          display: 'flex',
          height: '64px',
          width: '64px',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          borderRadius: '50%',
          background: '#F5A623',
          color: '#0C0C0C',
          textDecoration: 'none',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.width = '256px';
          const bgDiv = e.target.querySelector('div[style*="translateY"]');
          if (bgDiv) bgDiv.style.transform = 'translateY(0)';
          const textSpan = e.target.querySelector('span');
          if (textSpan) textSpan.style.display = 'block';
        }}
        onMouseLeave={(e) => {
          e.target.style.width = '64px';
          const bgDiv = e.target.querySelector('div[style*="translateY"]');
          if (bgDiv) bgDiv.style.transform = 'translateY(100%)';
          const textSpan = e.target.querySelector('span');
          if (textSpan) textSpan.style.display = 'none';
        }}
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          background: '#4A9EDB',
          transform: 'translateY(100%)',
          transition: 'transform 0.3s ease'
        }}></div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          position: 'relative',
          zIndex: 10,
          paddingLeft: '16px'
        }}>
          <svg style={{
            height: '32px',
            width: '32px',
            flexShrink: 0,
            color: '#0C0C0C'
          }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <span style={{
            whiteSpace: 'nowrap',
            fontFamily: 'Courier New, Courier, monospace',
            fontWeight: 'bold',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontSize: '20px',
            color: '#0C0C0C',
            display: 'none'
          }}>
            Get Instant Estimate
          </span>
        </div>
      </Link>
    </div>
  );
}
