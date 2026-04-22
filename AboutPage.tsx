import { Zap, Users, Target } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div
      style={{
        animation: 'fadeIn 0.5s ease',
      }}
    >
      <div
        style={{
          marginBottom: '2rem',
        }}
      >
        <h1
          style={{
            color: '#f8fafc',
            fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
            fontWeight: 800,
            fontFamily: 'system-ui, sans-serif',
            letterSpacing: '-0.03em',
            margin: '0 0 0.5rem',
          }}
        >
          About TaskFlow
        </h1>
        <p
          style={{
            color: '#64748b',
            fontSize: '1rem',
            fontFamily: 'system-ui, sans-serif',
            margin: 0,
          }}
        >
          The modern task management solution for teams and individuals
        </p>
      </div>

      <div
        style={{
          background: 'linear-gradient(135deg, rgba(22,78,99,0.8) 0%, rgba(15,118,110,0.6) 100%)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 16,
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}
      >
        <h2
          style={{
            color: '#f8fafc',
            fontSize: '1.5rem',
            fontWeight: 700,
            margin: '0 0 1rem',
          }}
        >
          Our Mission
        </h2>
        <p
          style={{
            color: '#cbd5e1',
            fontSize: '1rem',
            lineHeight: '1.6',
            margin: 0,
          }}
        >
          TaskFlow is designed to help you manage your workflow efficiently. Whether you're working on personal projects or collaborating with a team, our intuitive Kanban board makes it easy to visualize progress, prioritize work, and stay organized. We believe that great task management is the foundation of productivity.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{
            background: 'rgba(22,78,99,0.6)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
            padding: '1.5rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1rem',
            }}
          >
            <div
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                borderRadius: 8,
                padding: '0.5rem',
                display: 'flex',
              }}
            >
              <Zap size={20} color="#fff" />
            </div>
            <h3
              style={{
                color: '#f8fafc',
                fontSize: '1.125rem',
                fontWeight: 700,
                margin: 0,
              }}
            >
              Fast & Responsive
            </h3>
          </div>
          <p
            style={{
              color: '#cbd5e1',
              fontSize: '0.9375rem',
              lineHeight: '1.6',
              margin: 0,
            }}
          >
            Lightning-fast interface with smooth drag-and-drop functionality that responds instantly to your actions.
          </p>
        </div>

        <div
          style={{
            background: 'rgba(22,78,99,0.6)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
            padding: '1.5rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1rem',
            }}
          >
            <div
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                borderRadius: 8,
                padding: '0.5rem',
                display: 'flex',
              }}
            >
              <Users size={20} color="#fff" />
            </div>
            <h3
              style={{
                color: '#f8fafc',
                fontSize: '1.125rem',
                fontWeight: 700,
                margin: 0,
              }}
            >
              Team Friendly
            </h3>
          </div>
          <p
            style={{
              color: '#cbd5e1',
              fontSize: '0.9375rem',
              lineHeight: '1.6',
              margin: 0,
            }}
          >
            Built for collaboration with real-time updates and seamless integration with your team workflow.
          </p>
        </div>

        <div
          style={{
            background: 'rgba(22,78,99,0.6)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
            padding: '1.5rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1rem',
            }}
          >
            <div
              style={{
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                borderRadius: 8,
                padding: '0.5rem',
                display: 'flex',
              }}
            >
              <Target size={20} color="#fff" />
            </div>
            <h3
              style={{
                color: '#f8fafc',
                fontSize: '1.125rem',
                fontWeight: 700,
                margin: 0,
              }}
            >
              Goal Oriented
            </h3>
          </div>
          <p
            style={{
              color: '#cbd5e1',
              fontSize: '0.9375rem',
              lineHeight: '1.6',
              margin: 0,
            }}
          >
            Organize tasks by priority and category to focus on what matters most and achieve your goals.
          </p>
        </div>
      </div>

      <div
        style={{
          background: 'rgba(22,78,99,0.5)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16,
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            color: '#f8fafc',
            fontSize: '1.25rem',
            fontWeight: 700,
            margin: '0 0 0.5rem',
          }}
        >
          Ready to Get Started?
        </h2>
        <p
          style={{
            color: '#64748b',
            fontSize: '0.9375rem',
            margin: '0 0 1.5rem',
          }}
        >
          Join thousands of users managing their tasks more efficiently
        </p>
        <button
          onClick={() => onNavigate('workspace')}
          style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '0.75rem 1.5rem',
            fontSize: '0.9375rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
          }}
        >
          Go to Workspace
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
