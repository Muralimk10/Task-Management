import { CheckCircle2, Circle, Clock, Flame } from 'lucide-react';

interface ProgressStatsProps {
  stats: {
    total: number;
    todo: number;
    inProgress: number;
    done: number;
    progress: number;
  };
}

const statCards = [
  {
    key: 'total',
    label: 'Total Tasks',
    icon: Circle,
    color: 'text-fuchsia-600',
    bg: 'bg-gradient-to-br from-fuchsia-50 to-fuchsia-100/50',
    border: 'border-fuchsia-200/60',
    iconBg: 'bg-fuchsia-100/70',
  },
  {
    key: 'todo',
    label: 'To Do',
    icon: Circle,
    color: 'text-orange-600',
    bg: 'bg-gradient-to-br from-orange-50 to-orange-100/50',
    border: 'border-orange-200/60',
    iconBg: 'bg-orange-100/70',
  },
  {
    key: 'inProgress',
    label: 'In Progress',
    icon: Clock,
    color: 'text-sky-600',
    bg: 'bg-gradient-to-br from-sky-50 to-sky-100/40',
    border: 'border-sky-200/60',
    iconBg: 'bg-sky-100/70',
  },
  {
    key: 'done',
    label: 'Completed',
    icon: CheckCircle2,
    color: 'text-emerald-600',
    bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100/50',
    border: 'border-emerald-200/60',
    iconBg: 'bg-emerald-100/70',
  },
];

export function ProgressStats({ stats }: ProgressStatsProps) {
  const values: Record<string, number> = {
    total: stats.total,
    todo: stats.todo,
    inProgress: stats.inProgress,
    done: stats.done,
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {statCards.map(card => {
          const Icon = card.icon;
          return (
            <div
              key={card.key}
              className={`${card.bg} border ${card.border} rounded-2xl p-4 flex items-center gap-3 transition-transform hover:-translate-y-0.5 bg-opacity-10 border-opacity-40`}
            >
              <div className={`${card.iconBg} rounded-xl p-2 shrink-0 bg-opacity-20`}>
                <Icon size={18} className={card.color} />
              </div>
              <div className="min-w-0">
                <div className={`text-2xl font-bold ${card.color}`}>{values[card.key]}</div>
                <div className="text-xs text-fuchsia-300/70 font-medium truncate">{card.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-slate-800/40 border border-fuchsia-400/30 rounded-2xl p-4 sm:p-5 shadow-lg shadow-fuchsia-500/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Flame size={16} className="text-fuchsia-400" />
            <span className="text-sm font-bold bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              Completion Progress
            </span>
          </div>
          <span className="text-sm font-bold bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            {stats.progress}%
          </span>
        </div>
        <div className="h-3 bg-slate-700/60 rounded-full overflow-hidden border border-fuchsia-400/30">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-fuchsia-400 shadow-lg shadow-fuchsia-400/60"
            style={{ width: `${stats.progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-fuchsia-300/70">{stats.done} of {stats.total} tasks completed</span>
          {stats.progress === 100 && (
            <span className="text-xs font-bold bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              All done!
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
