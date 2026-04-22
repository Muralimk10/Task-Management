import { useState, useEffect } from 'react';
import { X, Plus, Save } from 'lucide-react';
import { Task, TaskFormData, TaskCategory, TaskPriority, TaskStatus } from '../types';

interface TaskModalProps {
  open: boolean;
  editTask: Task | null;
  defaultStatus?: TaskStatus;
  onClose: () => void;
  onSave: (data: TaskFormData) => Promise<void>;
}

const CATEGORIES: TaskCategory[] = ['work', 'personal', 'study', 'health', 'other'];
const PRIORITIES: TaskPriority[] = ['low', 'medium', 'high'];
const STATUSES: { value: TaskStatus; label: string }[] = [
  { value: 'todo', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];

const PRIORITY_COLORS: Record<TaskPriority, string> = {
  low: '#10b981',
  medium: '#f59e0b',
  high: '#ef4444',
};

const CATEGORY_ICONS: Record<TaskCategory, string> = {
  work: '💼',
  personal: '👤',
  study: '📚',
  health: '❤️',
  other: '✦',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(15,118,110,0.4)',
  border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: 8,
  color: '#f1f5f9',
  fontSize: '0.9375rem',
  fontFamily: 'system-ui, sans-serif',
  padding: '0.625rem 0.875rem',
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  color: '#94a3b8',
  fontSize: '0.8125rem',
  fontWeight: 600,
  fontFamily: 'system-ui, sans-serif',
  display: 'block',
  marginBottom: '0.375rem',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
};

export default function TaskModal({ open, editTask, defaultStatus = 'todo', onClose, onSave }: TaskModalProps) {
  const [form, setForm] = useState<TaskFormData>({
    title: '',
    description: '',
    status: defaultStatus,
    category: 'other',
    priority: 'medium',
  });
  const [saving, setSaving] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
      if (editTask) {
        setForm({
          title: editTask.title,
          description: editTask.description,
          status: editTask.status,
          category: editTask.category,
          priority: editTask.priority,
        });
      } else {
        setForm({ title: '', description: '', status: defaultStatus, category: 'other', priority: 'medium' });
      }
    } else {
      setVisible(false);
    }
  }, [open, editTask, defaultStatus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSaving(true);
    await onSave(form);
    setSaving(false);
    onClose();
  };

  if (!open && !visible) return null;

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(8px)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        transition: 'opacity 0.25s ease',
        opacity: open ? 1 : 0,
      }}
    >
      <div
        style={{
          background: 'linear-gradient(160deg, #164e63 0%, #0f766e 100%)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 16,
          padding: '1.75rem',
          width: '100%',
          maxWidth: 520,
          boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
          transition: 'transform 0.3s ease, opacity 0.3s ease',
          transform: open ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(16px)',
          opacity: open ? 1 : 0,
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h2
            style={{
              color: '#f8fafc',
              fontSize: '1.125rem',
              fontWeight: 700,
              fontFamily: 'system-ui, sans-serif',
              margin: 0,
            }}
          >
            {editTask ? 'Edit Task' : 'New Task'}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8,
              color: '#64748b',
              cursor: 'pointer',
              padding: '0.375rem',
              display: 'flex',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#f1f5f9')}
            onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={labelStyle}>Title *</label>
            <input
              type="text"
              placeholder="What needs to be done?"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              required
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = 'rgba(59,130,246,0.5)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
            />
          </div>

          <div>
            <label style={labelStyle}>Description</label>
            <textarea
              placeholder="Add more details..."
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              rows={3}
              style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }}
              onFocus={e => (e.currentTarget.style.borderColor = 'rgba(59,130,246,0.5)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Status</label>
              <select
                value={form.status}
                onChange={e => setForm(f => ({ ...f, status: e.target.value as TaskStatus }))}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                {STATUSES.map(s => (
                  <option key={s.value} value={s.value} style={{ background: '#0f766e' }}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Priority</label>
              <select
                value={form.priority}
                onChange={e => setForm(f => ({ ...f, priority: e.target.value as TaskPriority }))}
                style={{ ...inputStyle, cursor: 'pointer', color: PRIORITY_COLORS[form.priority] }}
              >
                {PRIORITIES.map(p => (
                  <option key={p} value={p} style={{ background: '#0f766e', color: PRIORITY_COLORS[p] }}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label style={labelStyle}>Category</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, category: cat }))}
                  style={{
                    padding: '0.375rem 0.75rem',
                    borderRadius: 8,
                    border: `1px solid ${form.category === cat ? 'rgba(59,130,246,0.5)' : 'rgba(255,255,255,0.08)'}`,
                    background: form.category === cat ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.03)',
                    color: form.category === cat ? '#60a5fa' : '#64748b',
                    cursor: 'pointer',
                    fontSize: '0.8125rem',
                    fontFamily: 'system-ui, sans-serif',
                    fontWeight: form.category === cat ? 600 : 400,
                    transition: 'all 0.15s',
                    textTransform: 'capitalize',
                  }}
                >
                  {CATEGORY_ICONS[cat]} {cat}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '0.75rem',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8,
                color: '#64748b',
                cursor: 'pointer',
                fontSize: '0.9375rem',
                fontFamily: 'system-ui, sans-serif',
                transition: 'all 0.15s',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !form.title.trim()}
              style={{
                flex: 2,
                padding: '0.75rem',
                background: saving ? 'rgba(59,130,246,0.4)' : 'linear-gradient(135deg, #3b82f6, #2563eb)',
                border: 'none',
                borderRadius: 8,
                color: '#fff',
                cursor: saving ? 'not-allowed' : 'pointer',
                fontSize: '0.9375rem',
                fontWeight: 600,
                fontFamily: 'system-ui, sans-serif',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 0 20px rgba(59,130,246,0.3)',
                transition: 'all 0.15s',
              }}
            >
              {editTask ? <Save size={15} /> : <Plus size={15} />}
              {saving ? 'Saving...' : editTask ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
