import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Task, TaskStatus as Status } from '../types';
import TaskCard from './TaskCard';

interface ColumnProps {
  id: Status;
  title: string;
  icon: React.ReactNode;
  accentColor: string;
  headerBg: string;
  tasks: Task[];
  draggedId: string | null;
  onDrop: (status: Status) => void;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragEnd: () => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onAddTask: () => void;
}

export function Column({
  id,
  title,
  icon,
  accentColor,
  headerBg,
  tasks,
  draggedId,
  onDrop,
  onDragStart,
  onDragEnd,
  onDelete,
  onEdit,
  onAddTask,
}: ColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    onDrop(id);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex flex-col rounded-2xl border-2 transition-all duration-200 min-h-[400px] ${
        isDragOver && draggedId
          ? 'border-fuchsia-400 bg-fuchsia-500/20 shadow-lg shadow-fuchsia-500/40'
          : 'border-slate-700/60 bg-slate-800/30'
      }`}
    >
      <div className={`${headerBg} rounded-t-xl px-4 py-3 flex items-center justify-between bg-opacity-50`}>
        <div className="flex items-center gap-2.5">
          <div className={`${accentColor} rounded-lg p-1.5 bg-opacity-20`}>
            {icon}
          </div>
          <span className="font-bold text-fuchsia-300 text-sm">{title}</span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-fuchsia-400/20 text-fuchsia-300 border border-fuchsia-400/40`}>
            {tasks.length}
          </span>
        </div>
        <button
          onClick={onAddTask}
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-fuchsia-500/30 text-fuchsia-400/60 hover:text-fuchsia-300 transition-colors"
        >
          <Plus size={15} />
        </button>
      </div>

      <div className="flex-1 p-3 space-y-3 overflow-y-auto max-h-[600px]">
        {tasks.length === 0 ? (
          <div
            className={`flex flex-col items-center justify-center h-32 rounded-xl border-2 border-dashed transition-colors ${
              isDragOver && draggedId ? 'border-blue-400 bg-blue-50' : 'border-slate-200'
            }`}
          >
            <p className="text-xs text-slate-400 font-medium">
              {isDragOver && draggedId ? 'Drop here' : 'No tasks'}
            </p>
          </div>
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDelete}
              onEdit={onEdit}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            />
          ))
        )}

        {isDragOver && draggedId && tasks.length > 0 && (
          <div className="h-16 rounded-xl border-2 border-dashed border-blue-400 bg-blue-50 flex items-center justify-center">
            <span className="text-xs text-blue-500 font-semibold">Drop here</span>
          </div>
        )}
      </div>
    </div>
  );
}
