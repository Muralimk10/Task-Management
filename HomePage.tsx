import { Task } from '../types';
import { CheckCircle2, Circle, AlertCircle } from 'lucide-react';

interface HomePageProps {
  tasks: Task[];
  onNavigate: (page: string) => void;
}

export default function HomePage({ tasks, onNavigate }: HomePageProps) {
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const completionPercentage = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;
  const inProgressCount = tasks.filter(t => t.status === 'in_progress').length;
  const todoCount = tasks.filter(t => t.status === 'todo').length;

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
          Welcome Back Chief🫡
        </h1>
        <p
          style={{
            color: '#64748b',
            fontSize: '1rem',
            fontFamily: 'system-ui, sans-serif',
            margin: 0,
          }}
        >
          Here's your task completion overview
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
            background: 'linear-gradient(135deg, rgba(22,78,99,0.8) 0%, rgba(15,118,110,0.6) 100%)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 16,
            padding: '1.5rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
            }}
          >
            <h3
              style={{
                color: '#e0f2fe',
                fontSize: '0.875rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                margin: 0,
              }}
            >
              Completion Rate
            </h3>
            <CheckCircle2 size={24} color="#10b981" />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.5rem',
              marginBottom: '1rem',
            }}
          >
            <span
              style={{
                fontSize: '3rem',
                fontWeight: 900,
                color: '#10b981',
                fontFamily: 'system-ui, monospace',
              }}
            >
              {completionPercentage}%
            </span>
            <span
              style={{
                fontSize: '0.875rem',
                color: '#64748b',
                fontWeight: 500,
              }}
            >
              of {tasks.length} tasks
            </span>
          </div>
          <div
            style={{
              width: '100%',
              height: 8,
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 99,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${completionPercentage}%`,
                background: 'linear-gradient(90deg, #10b981, #059669)',
                transition: 'width 0.6s ease',
              }}
            />
          </div>
        </div>

        <div
          style={{
            background: 'linear-gradient(135deg, rgba(22,78,99,0.8) 0%, rgba(15,118,110,0.6) 100%)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 16,
            padding: '1.5rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
            }}
          >
            <h3
              style={{
                color: '#e0f2fe',
                fontSize: '0.875rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                margin: 0,
              }}
            >
              In Progress
            </h3>
            <AlertCircle size={24} color="#f59e0b" />
          </div>
          <div
            style={{
              fontSize: '2.5rem',
              fontWeight: 900,
              color: '#f59e0b',
              fontFamily: 'system-ui, monospace',
            }}
          >
            {inProgressCount}
          </div>
          <p
            style={{
              color: '#64748b',
              fontSize: '0.875rem',
              margin: '0.5rem 0 0',
            }}
          >
            Tasks actively being worked on
          </p>
        </div>

        <div
          style={{
            background: 'linear-gradient(135deg, rgba(22,78,99,0.8) 0%, rgba(15,118,110,0.6) 100%)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 16,
            padding: '1.5rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
            }}
          >
            <h3
              style={{
                color: '#e0f2fe',
                fontSize: '0.875rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                margin: 0,
              }}
            >
              To Do
            </h3>
            <Circle size={24} color="#60a5fa" />
          </div>
          <div
            style={{
              fontSize: '2.5rem',
              fontWeight: 900,
              color: '#60a5fa',
              fontFamily: 'system-ui, monospace',
            }}
          >
            {todoCount}
          </div>
          <p
            style={{
              color: '#64748b',
              fontSize: '0.875rem',
              margin: '0.5rem 0 0',
            }}
          >
            Tasks awaiting your attention
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
            margin: '0 0 1rem',
          }}
        >
          Need Help?
        </h2>
        <p
          style={{
            color: '#64748b',
            fontSize: '0.9375rem',
            margin: '0 0 1.5rem',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Check out our guides and learn how to maximize your productivity with our task management system.
        </p>
        <button
          onClick={() => onNavigate('help')}
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
          View Help Center
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
