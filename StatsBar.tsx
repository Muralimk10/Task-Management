import { useState, useEffect } from 'react';
import { ListTodo, Clock, CheckCircle, LayoutGrid, Search } from 'lucide-react';
import { Task } from '../types';

interface StatsBarProps {
  tasks: Task[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  accent: string;
  bg: string;
  border: string;
  glow: string;
  delay: number;
}

function StatCard({ label, value, icon, accent, bg, border, glow, delay }: StatCardProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      style={{
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 14,
        padding: '1.125rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        transition: 'all 0.5s ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        cursor: 'default',
        boxShadow: `0 0 0 rgba(0,0,0,0)`,
        flex: '1 1 0',
        minWidth: 0,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 24px ${glow}`;
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 0 rgba(0,0,0,0)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          background: `${accent}20`,
          border: `1px solid ${accent}30`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          color: accent,
        }}
      >
        {icon}
      </div>
      <div>
        <div
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: accent,
            fontFamily: 'system-ui, sans-serif',
            lineHeight: 1,
          }}
        >
          {value}
        </div>
        <div
          style={{
            fontSize: '0.8rem',
            color: '#94a3b8',
            fontFamily: 'system-ui, sans-serif',
            marginTop: '0.25rem',
            fontWeight: 500,
            letterSpacing: '0.02em',
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

export default function StatsBar({ tasks, searchQuery, onSearchChange }: StatsBarProps) {
  const todo = tasks.filter(t => t.status === 'todo').length;
  const inProgress = tasks.filter(t => t.status === 'in_progress').length;
  const completed = tasks.filter(t => t.status === 'completed').length;
  const total = tasks.length;

  const [searchVisible, setSearchVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setSearchVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div
        style={{
          transition: 'all 0.5s ease',
          opacity: searchVisible ? 1 : 0,
          transform: searchVisible ? 'translateY(0)' : 'translateY(-12px)',
          marginBottom: '1rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(30,41,59,0.8)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12,
            padding: '0 1rem',
            gap: '0.75rem',
            boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
          }}
        >
          <Search size={18} color="#60a5fa" />
          <input
            type="text"
            placeholder="Search tasks by title or description..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#f1f5f9',
              fontSize: '0.9375rem',
              fontFamily: 'system-ui, sans-serif',
              padding: '0.875rem 0',
              caretColor: '#3b82f6',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              style={{
                background: 'none',
                border: 'none',
                color: '#64748b',
                cursor: 'pointer',
                padding: '0.25rem',
                fontSize: '1.25rem',
                lineHeight: 1,
              }}
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '0.75rem',
          flexWrap: 'wrap',
        }}
      >
        <StatCard
          label="Total Tasks"
          value={total}
          icon={<LayoutGrid size={20} />}
          accent="#60a5fa"
          bg="rgba(59,130,246,0.08)"
          border="rgba(59,130,246,0.15)"
          glow="rgba(59,130,246,0.2)"
          delay={300}
        />
        <StatCard
          label="To Do"
          value={todo}
          icon={<ListTodo size={20} />}
          accent="#fb923c"
          bg="rgba(249,115,22,0.08)"
          border="rgba(249,115,22,0.15)"
          glow="rgba(249,115,22,0.2)"
          delay={400}
        />
        <StatCard
          label="In Progress"
          value={inProgress}
          icon={<Clock size={20} />}
          accent="#fbbf24"
          bg="rgba(245,158,11,0.08)"
          border="rgba(245,158,11,0.15)"
          glow="rgba(245,158,11,0.2)"
          delay={500}
        />
        <StatCard
          label="Completed"
          value={completed}
          icon={<CheckCircle size={20} />}
          accent="#34d399"
          bg="rgba(16,185,129,0.08)"
          border="rgba(16,185,129,0.15)"
          glow="rgba(16,185,129,0.2)"
          delay={600}
        />
      </div>

      <style>{`
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
