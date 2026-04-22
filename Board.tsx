import { useState } from 'react';
import { Circle, Clock, CheckCircle2, SlidersHorizontal } from 'lucide-react';
import { Task, TaskStatus as Status, TaskCategory as Category, TaskPriority as Priority } from '../types';
import { Column } from './Column';

interface BoardProps {
  tasks: Task[];
  allTasks: Task[];
  filterCategory: Category | 'all';
  setFilterCategory: (c: Category | 'all') => void;
  filterPriority: Priority | 'all';
  setFilterPriority: (p: Priority | 'all') => void;
  draggedId: string | null;
  onDrop: (status: Status) => void;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragEnd: () => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onAddTask: () => void;
}

const columns: { id: Status; title: string; icon: React.ReactNode; accentColor: string; headerBg: string }[] = [
  {
    id: 'todo',
    title: 'To Do',
    icon: <Circle size={14} className="text-orange-600" />,
    accentColor: 'bg-gradient-to-br from-orange-100 to-orange-50',
    headerBg: 'bg-gradient-to-r from-orange-50/90 to-orange-100/60',
  },
  {
    id: 'in_progress',
    title: 'In Progress',
    icon: <Clock size={14} className="text-cyan-600" />,
    accentColor: 'bg-gradient-to-br from-cyan-100 to-cyan-50',
    headerBg: 'bg-gradient-to-r from-cyan-50/90 to-cyan-100/60',
  },
  {
    id: 'completed',
    title: 'Done',
    icon: <CheckCircle2 size={14} className="text-emerald-600" />,
    accentColor: 'bg-gradient-to-br from-emerald-100 to-emerald-50',
    headerBg: 'bg-gradient-to-r from-emerald-50/90 to-emerald-100/60',
  },
];

const categories: Array<{ value: Category | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'study', label: 'Study' },
  { value: 'work', label: 'Work' },
  { value: 'personal', label: 'Personal' },
  { value: 'health', label: 'Health' },
  { value: 'other', label: 'Other' },
];

const priorities: Array<{ value: Priority | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

export function Board({
  tasks,
  filterCategory,
  setFilterCategory,
  filterPriority,
  setFilterPriority,
  draggedId,
  onDrop,
  onDragStart,
  onDragEnd,
  onDelete,
  onEdit,
  onAddTask,
}: BoardProps) {
  const [showFilters, setShowFilters] = useState(false);

  const getColumnTasks = (status: Status) => tasks.filter(t => t.status === status);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold bg-gradient-to-r from-fuchsia-600 to-cyan-600 bg-clip-text text-transparent">
          Your Board
        </h2>
        <button
          onClick={() => setShowFilters(v => !v)}
          className={`flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-xl border transition-all ${
            showFilters || filterCategory !== 'all' || filterPriority !== 'all'
              ? 'bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white border-fuchsia-400 shadow-lg shadow-fuchsia-400/40'
              : 'bg-white text-slate-600 border-fuchsia-200/50 hover:border-fuchsia-400'
          }`}
        >
          <SlidersHorizontal size={14} />
          Filters
          {(filterCategory !== 'all' || filterPriority !== 'all') && (
            <span className="bg-white/30 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
              {(filterCategory !== 'all' ? 1 : 0) + (filterPriority !== 'all' ? 1 : 0)}
            </span>
          )}
        </button>
      </div>

      {showFilters && (
        <div className="bg-slate-800/50 border border-fuchsia-400/30 rounded-2xl p-4 space-y-3 animate-slideDown shadow-lg shadow-fuchsia-500/20">
          <div>
            <p className="text-xs font-bold bg-gradient-to-r from-fuchsia-600 to-cyan-600 bg-clip-text text-transparent uppercase tracking-wider mb-2">
              Category
            </p>
            <div className="flex flex-wrap gap-2">
              {categories.map(c => (
                <button
                  key={c.value}
                  onClick={() => setFilterCategory(c.value)}
                  className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition-all ${
                    filterCategory === c.value
                      ? 'bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white shadow-lg shadow-fuchsia-400/60'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700/80 border border-slate-600/40'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold bg-gradient-to-r from-fuchsia-600 to-cyan-600 bg-clip-text text-transparent uppercase tracking-wider mb-2">
              Priority
            </p>
            <div className="flex flex-wrap gap-2">
              {priorities.map(p => (
                <button
                  key={p.value}
                  onClick={() => setFilterPriority(p.value)}
                  className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition-all ${
                    filterPriority === p.value
                      ? 'bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white shadow-lg shadow-fuchsia-400/60'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700/80 border border-slate-600/40'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {columns.map(col => (
          <Column
            key={col.id}
            {...col}
            tasks={getColumnTasks(col.id)}
            draggedId={draggedId}
            onDrop={onDrop}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDelete={onDelete}
            onEdit={onEdit}
            onAddTask={onAddTask}
          />
        ))}
      </div>
    </div>
  );
}
