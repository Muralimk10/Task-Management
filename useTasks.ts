import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Task, TaskFormData, TaskStatus } from '../types';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('position', { ascending: true });
      if (error) throw error;
      setTasks(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (formData: TaskFormData) => {
    try {
      const statusTasks = tasks.filter(t => t.status === formData.status);
      const position = statusTasks.length;
      const { data, error } = await supabase
        .from('tasks')
        .insert([{ ...formData, position }])
        .select()
        .single();
      if (error) throw error;
      setTasks(prev => [...prev, data]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Failed to add task' };
    }
  };

  const updateTask = async (id: string, updates: Partial<TaskFormData>) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      setTasks(prev => prev.map(t => (t.id === id ? data : t)));
      return { success: true };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Failed to update task' };
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase.from('tasks').delete().eq('id', id);
      if (error) throw error;
      setTasks(prev => prev.filter(t => t.id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Failed to delete task' };
    }
  };

  const moveTask = async (taskId: string, newStatus: TaskStatus) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.status === newStatus) return;

    const newStatusTasks = tasks.filter(t => t.status === newStatus);
    const newPosition = newStatusTasks.length;

    setTasks(prev =>
      prev.map(t => (t.id === taskId ? { ...t, status: newStatus, position: newPosition } : t))
    );

    try {
      const { error } = await supabase
        .from('tasks')
        .update({ status: newStatus, position: newPosition, updated_at: new Date().toISOString() })
        .eq('id', taskId);
      if (error) throw error;
    } catch {
      setTasks(prev =>
        prev.map(t => (t.id === taskId ? { ...t, status: task.status, position: task.position } : t))
      );
    }
  };

  return { tasks, loading, error, addTask, updateTask, deleteTask, moveTask, refetch: fetchTasks };
}
