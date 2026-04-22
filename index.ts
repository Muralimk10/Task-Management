export type TaskStatus = 'todo' | 'in_progress' | 'completed';
export type TaskCategory = 'work' | 'personal' | 'study' | 'health' | 'other';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  category: TaskCategory;
  priority: TaskPriority;
  position: number;
  created_at: string;
  updated_at: string;
  due_date?: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  status: TaskStatus;
  category: TaskCategory;
  priority: TaskPriority;
  due_date?: string;
}
