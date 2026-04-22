interface LoaderProps {
  visible: boolean;
}

export default function Loader({ visible }: LoaderProps) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(135deg, #0f766e 0%, #164e63 50%, #0f766e 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        transition: 'opacity 0.6s ease, visibility 0.6s ease',
        opacity: visible ? 1 : 0,
        visibility: visible ? 'visible' : 'hidden',
      }}
    >
      <div style={{ position: 'relative', marginBottom: '2rem' }}>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            border: '3px solid rgba(59,130,246,0.15)',
            borderTopColor: '#3b82f6',
            animation: 'spin 1s linear infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 10,
            borderRadius: '50%',
            border: '3px solid rgba(16,185,129,0.15)',
            borderBottomColor: '#10b981',
            animation: 'spin 1.4s linear infinite reverse',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 22,
            borderRadius: '50%',
            border: '3px solid rgba(249,115,22,0.15)',
            borderLeftColor: '#f97316',
            animation: 'spin 1.8s linear infinite',
          }}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h1
          style={{
            color: '#f8fafc',
            fontSize: '1.75rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            marginBottom: '0.5rem',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          TaskFlow
        </h1>
        <p
          style={{
            color: '#94a3b8',
            fontSize: '0.875rem',
            fontFamily: 'system-ui, sans-serif',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        >
          Loading your workspace...
        </p>
      </div>
      <div
        style={{
          marginTop: '2rem',
          width: 200,
          height: 3,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: 99,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #3b82f6, #10b981)',
            borderRadius: 99,
            animation: 'loadBar 2s ease-in-out infinite',
          }}
        />
      </div>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        @keyframes loadBar {
          0% { width:0%; margin-left:0; }
          50% { width:70%; margin-left:0; }
          100% { width:0%; margin-left:100%; }
        }
      `}</style>
    </div>
  );
}
