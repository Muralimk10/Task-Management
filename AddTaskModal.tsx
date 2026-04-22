import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { Task, TaskPriority as Priority, TaskStatus as Status, TaskCategory as Category, TaskFormData } from '../types';

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (task: TaskFormData) => void;
  editingTask?: Task | null;
}

const defaultForm = {
  title: '',
  description: '',
  priority: 'medium' as Priority,
  status: 'todo' as Status,
  category: 'study' as Category,
  due_date: '',
};

export function AddTaskModal({ open, onClose, onSave, editingTask }: AddTaskModalProps) {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState<Partial<typeof defaultForm>>({});

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title,
        description: editingTask.description,
        priority: editingTask.priority,
        status: editingTask.status,
        category: editingTask.category,
        due_date: editingTask.due_date || '',
      });
    } else {
      setForm(defaultForm);
    }
    setErrors({});
  }, [editingTask, open]);

  const validate = () => {
    const e: Partial<typeof defaultForm> = {};
    if (!form.title.trim()) e.title = 'Title is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      title: form.title.trim(),
      description: form.description.trim(),
      priority: form.priority,
      status: form.status,
      category: form.category,
      due_date: form.due_date || undefined,
    });
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fadeIn" onClick={onClose} />

      <div className="relative bg-gradient-to-br from-white to-fuchsia-50/40 w-full sm:max-w-md sm:rounded-2xl rounded-t-3xl shadow-2xl shadow-fuchsia-300/30 animate-slideUp overflow-hidden border-t-4 border-gradient-to-r from-fuchsia-500 to-cyan-400">
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-fuchsia-200/50 bg-gradient-to-r from-white to-fuchsia-50/60">
          <div>
            <h2 className="font-bold bg-gradient-to-r from-fuchsia-600 to-cyan-600 bg-clip-text text-transparent text-lg">
              {editingTask ? 'Edit Task' : 'New Task'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              {editingTask ? 'Update task details' : 'Add a new task to your board'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-fuchsia-100 text-slate-400 hover:text-fuchsia-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-bold bg-gradient-to-r from-fuchsia-600 to-cyan-600 bg-clip-text text-transparent mb-1.5">
              Task Title *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="e.g., Complete assignment..."
              className={`w-full px-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 transition-all bg-gradient-to-r from-white to-cyan-50 ${
                errors.title ? 'border-red-300 focus:ring-red-100 focus:border-red-400' : 'border-fuchsia-200/60 focus:ring-fuchsia-100 focus:border-fuchsia-400'
              }`}
            />
            {errors.title && <p className="text-xs text-red-500 mt-1 font-semibold">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold bg-gradient-to-r from-fuchsia-600 to-cyan-600 bg-clip-text text-transparent mb-1.5">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Add details about this task..."
              rows={3}
              className="w-full px-3 py-2.5 text-sm border border-fuchsia-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-fuchsia-100 focus:border-fuchsia-400 bg-gradient-to-r from-white to-cyan-50 transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold bg-gradient-to-r from-fuchsia-600 to-cyan-600 bg-clip-text text-transparent mb-1.5">
                Priority
              </label>
              <select
                value={form.priority}
                onChange={e => setForm(f => ({ ...f, priority: e.target.value as Priority }))}
                className="w-full px-3 py-2.5 text-sm border border-fuchsia-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-fuchsia-100 focus:border-fuchsia-400 bg-gradient-to-r from-white to-cyan-50 transition-all font-medium"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold bg-gradient-to-r from-fuchsia-600 to-cyan-600 bg-clip-text text-transparent mb-1.5">
                Status
              </label>
              <select
                value={form.status}
                onChange={e => setForm(f => ({ ...f, status: e.target.value as Status }))}
                className="w-full px-3 py-2.5 text-sm border border-fuchsia-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-fuchsia-100 focus:border-fuchsia-400 bg-gradient-to-r from-white to-cyan-50 transition-all font-medium"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold bg-gradient-to-r from-fuchsia-600 to-cyan-600 bg-clip-text text-transparent mb-1.5">
                Category
              </label>
              <select
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value as Category }))}
                className="w-full px-3 py-2.5 text-sm border border-fuchsia-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-fuchsia-100 focus:border-fuchsia-400 bg-gradient-to-r from-white to-cyan-50 transition-all font-medium"
              >
                <option value="study">Study</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="health">Health</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold bg-gradient-to-r from-fuchsia-600 to-cyan-600 bg-clip-text text-transparent mb-1.5">
                Due Date
              </label>
              <input
                type="date"
                value={form.due_date}
                onChange={e => setForm(f => ({ ...f, due_date: e.target.value }))}
                className="w-full px-3 py-2.5 text-sm border border-fuchsia-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-fuchsia-100 focus:border-fuchsia-400 bg-gradient-to-r from-white to-cyan-50 transition-all font-medium"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 text-sm font-bold text-slate-600 bg-gradient-to-r from-slate-100 to-slate-50 hover:from-slate-200 hover:to-slate-100 rounded-xl transition-colors border border-slate-200/60"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-fuchsia-600 to-cyan-500 hover:from-fuchsia-700 hover:to-cyan-600 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-fuchsia-400/50 active:scale-95"
            >
              <Save size={15} />
              {editingTask ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
