import { useState } from 'react';
import { Plus, ListTodo, Clock, CheckCircle, Inbox } from 'lucide-react';
import { Task, TaskStatus } from '../types';
import TaskCard from './TaskCard';

interface ColumnConfig {
  status: TaskStatus;
  label: string;
  icon: React.ReactNode;
  accent: string;
  border: string;
  glow: string;
  emptyMsg: string;
}

const COLUMNS: ColumnConfig[] = [
  {
    status: 'todo',
    label: 'To Do',
    icon: <ListTodo size={16} />,
    accent: '#fb923c',
    border: 'rgba(249,115,22,0.2)',
    glow: 'rgba(249,115,22,0.15)',
    emptyMsg: 'No tasks to do yet',
  },
  {
    status: 'in_progress',
    label: 'In Progress',
    icon: <Clock size={16} />,
    accent: '#fbbf24',
    border: 'rgba(245,158,11,0.2)',
    glow: 'rgba(245,158,11,0.15)',
    emptyMsg: 'Nothing in progress',
  },
  {
    status: 'completed',
    label: 'Completed',
    icon: <CheckCircle size={16} />,
    accent: '#34d399',
    border: 'rgba(16,185,129,0.2)',
    glow: 'rgba(16,185,129,0.15)',
    emptyMsg: 'No completed tasks',
  },
];

interface KanbanBoardProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => Promise<void>;
  onMove: (taskId: string, newStatus: TaskStatus) => void;
  onAddToColumn: (status: TaskStatus) => void;
}

export default function KanbanBoard({ tasks, onEdit, onDelete, onMove, onAddToColumn }: KanbanBoardProps) {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<TaskStatus | null>(null);

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedId(taskId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverCol(null);
  };

  const handleDragOver = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverCol(status);
  };

  const handleDrop = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      onMove(taskId, status);
    }
    setDraggedId(null);
    setDragOverCol(null);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverCol(null);
    }
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
      }}
      className="kanban-grid"
    >
      {COLUMNS.map(col => {
        const colTasks = tasks.filter(t => t.status === col.status);
        const isDragOver = dragOverCol === col.status;

        return (
          <div
            key={col.status}
            onDragOver={e => handleDragOver(e, col.status)}
            onDrop={e => handleDrop(e, col.status)}
            onDragLeave={handleDragLeave}
            style={{
              background: isDragOver
                ? `rgba(22,78,99,0.9)`
                : 'rgba(15,118,110,0.3)',
              border: `1px solid ${isDragOver ? col.border : 'rgba(255,255,255,0.08)'}`,
              borderRadius: 14,
              padding: '1rem',
              minHeight: 300,
              transition: 'all 0.2s ease',
              boxShadow: isDragOver ? `0 0 30px ${col.glow}` : 'none',
              display: 'flex',
              flexDirection: 'column',
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    background: `${col.accent}15`,
                    border: `1px solid ${col.accent}25`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: col.accent,
                  }}
                >
                  {col.icon}
                </div>
                <span
                  style={{
                    color: col.accent,
                    fontWeight: 700,
                    fontSize: '0.9375rem',
                    fontFamily: 'system-ui, sans-serif',
                  }}
                >
                  {col.label}
                </span>
                <span
                  style={{
                    background: `${col.accent}20`,
                    color: col.accent,
                    border: `1px solid ${col.accent}30`,
                    borderRadius: 99,
                    padding: '0.1rem 0.5rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    fontFamily: 'system-ui, sans-serif',
                  }}
                >
                  {colTasks.length}
                </span>
              </div>
              <button
                onClick={() => onAddToColumn(col.status)}
                title={`Add to ${col.label}`}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 6,
                  color: '#64748b',
                  cursor: 'pointer',
                  padding: '0.25rem',
                  display: 'flex',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.color = col.accent;
                  (e.currentTarget as HTMLButtonElement).style.borderColor = col.border;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.color = '#64748b';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.08)';
                }}
              >
                <Plus size={14} />
              </button>
            </div>

            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.625rem',
              }}
            >
              {colTasks.length === 0 ? (
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 160,
                    color: '#334155',
                    gap: '0.5rem',
                    border: `2px dashed ${isDragOver ? col.border : 'rgba(255,255,255,0.04)'}`,
                    borderRadius: 10,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Inbox size={24} />
                  <span style={{ fontSize: '0.8125rem', fontFamily: 'system-ui, sans-serif' }}>
                    {isDragOver ? 'Drop here' : col.emptyMsg}
                  </span>
                </div>
              ) : (
                colTasks.map(task => (
                  <div
                    key={task.id}
                    style={{
                      opacity: draggedId === task.id ? 0.4 : 1,
                      transition: 'opacity 0.15s',
                    }}
                  >
                    <TaskCard
                      task={task}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}

      <style>{`
        @media (max-width: 900px) {
          .kanban-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 600px) and (max-width: 900px) {
          .kanban-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
