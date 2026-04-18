export default function ProductSkeleton() {
  return (
    <div style={{
      border: '1px solid #2A2A2A',
      borderRadius: '2px',
      overflow: 'hidden',
      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
    }}>
      <div style={{
        aspectRatio: '4/3',
        background: '#141414'
      }}></div>
      <div style={{
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{
          height: '24px',
          background: '#141414',
          borderRadius: '2px',
          width: '66%'
        }}></div>
        <div style={{
          height: '12px',
          background: '#0C0C0C',
          borderRadius: '2px',
          width: '33%'
        }}></div>
        <div style={{
          height: '48px',
          background: '#0C0C0C',
          borderRadius: '2px',
          width: '100%'
        }}></div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '16px',
          borderTop: '1px solid #2A2A2A'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{
              height: '8px',
              background: '#0C0C0C',
              borderRadius: '2px',
              width: '48px'
            }}></div>
            <div style={{
              height: '24px',
              background: '#141414',
              borderRadius: '2px',
              width: '80px'
            }}></div>
          </div>
          <div style={{
            height: '40px',
            background: '#141414',
            borderRadius: '2px',
            width: '96px'
          }}></div>
        </div>
      </div>
    </div>
  );
}
