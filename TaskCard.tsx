import { useState } from 'react';
import { Pencil, Trash2, GripVertical, Tag, Calendar } from 'lucide-react';
import { Task } from '../types';

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  work:     { bg: 'rgba(59,130,246,0.12)', text: '#60a5fa', border: 'rgba(59,130,246,0.25)' },
  personal: { bg: 'rgba(168,85,247,0.12)', text: '#c084fc', border: 'rgba(168,85,247,0.25)' },
  study:    { bg: 'rgba(16,185,129,0.12)', text: '#34d399', border: 'rgba(16,185,129,0.25)' },
  health:   { bg: 'rgba(239,68,68,0.12)',  text: '#f87171', border: 'rgba(239,68,68,0.25)' },
  other:    { bg: 'rgba(100,116,139,0.12)', text: '#94a3b8', border: 'rgba(100,116,139,0.25)' },
};

const PRIORITY_COLORS: Record<string, { dot: string; label: string }> = {
  high:   { dot: '#ef4444', label: '#fca5a5' },
  medium: { dot: '#f59e0b', label: '#fcd34d' },
  low:    { dot: '#10b981', label: '#6ee7b7' },
};

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onDragEnd: () => void;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function TaskCard({ task, onEdit, onDelete, onDragStart, onDragEnd }: TaskCardProps) {
  const [hovered, setHovered] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const cat = CATEGORY_COLORS[task.category] ?? CATEGORY_COLORS.other;
  const pri = PRIORITY_COLORS[task.priority] ?? PRIORITY_COLORS.medium;

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(task.id);
  };

  return (
    <div
      draggable
      onDragStart={e => onDragStart(e, task.id)}
      onDragEnd={onDragEnd}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(22,78,99,0.95)' : 'rgba(22,78,99,0.6)',
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 12,
        padding: '0.875rem 1rem',
        cursor: 'grab',
        transition: 'all 0.2s ease',
        boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.25)' : '0 2px 8px rgba(0,0,0,0.1)',
        transform: hovered ? 'scale(1.01)' : 'scale(1)',
        opacity: deleting ? 0.5 : 1,
        userSelect: 'none',
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
        <GripVertical
          size={14}
          color="#475569"
          style={{ marginTop: 2, flexShrink: 0 }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
            <h3
              style={{
                color: '#f1f5f9',
                fontSize: '0.9375rem',
                fontWeight: 600,
                fontFamily: 'system-ui, sans-serif',
                lineHeight: 1.4,
                margin: 0,
                wordBreak: 'break-word',
              }}
            >
              {task.title}
            </h3>
            <div
              style={{
                display: 'flex',
                gap: '0.25rem',
                flexShrink: 0,
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.2s ease',
              }}
            >
              <button
                onClick={() => onEdit(task)}
                title="Edit"
                style={{
                  background: 'rgba(59,130,246,0.15)',
                  border: '1px solid rgba(59,130,246,0.2)',
                  borderRadius: 6,
                  color: '#60a5fa',
                  cursor: 'pointer',
                  padding: '0.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(59,130,246,0.3)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(59,130,246,0.15)')}
              >
                <Pencil size={13} />
              </button>
              <button
                onClick={handleDelete}
                title="Delete"
                style={{
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.15)',
                  borderRadius: 6,
                  color: '#f87171',
                  cursor: 'pointer',
                  padding: '0.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.25)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.1)')}
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>

          {task.description && (
            <p
              style={{
                color: '#64748b',
                fontSize: '0.8125rem',
                fontFamily: 'system-ui, sans-serif',
                marginTop: '0.375rem',
                lineHeight: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {task.description}
            </p>
          )}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.375rem',
              marginTop: '0.625rem',
            }}
          >
            <span
              style={{
                background: cat.bg,
                color: cat.text,
                border: `1px solid ${cat.border}`,
                padding: '0.2rem 0.5rem',
                borderRadius: 99,
                fontSize: '0.7rem',
                fontWeight: 600,
                fontFamily: 'system-ui, sans-serif',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                textTransform: 'capitalize',
              }}
            >
              <Tag size={9} />
              {task.category}
            </span>

            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.7rem',
                fontFamily: 'system-ui, sans-serif',
                color: pri.label,
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: pri.dot,
                  display: 'inline-block',
                  boxShadow: `0 0 6px ${pri.dot}`,
                }}
              />
              {task.priority}
            </span>

            <span
              style={{
                marginLeft: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.7rem',
                color: '#475569',
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              <Calendar size={10} />
              {formatDate(task.created_at)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
