import { supabase } from '../lib/supabase';

import type { Task } from './models';

export async function fetchTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }

  return data || [];
}

export async function addTask(task: Omit<Task, 'id'>): Promise<Task | null> {
  const { data, error } = await supabase.from('tasks').insert([task]).select().single();

  if (error) {
    console.error('Error adding task:', error);
    return null;
  }

  return data;
}

export async function updateTask(task: Task): Promise<Task | null> {
  const { data, error } = await supabase
    .from('tasks')
    .update({ title: task.title, completed: task.completed })
    .eq('id', task.id)
    .select()
    .single();

  if (error) {
    console.error('Error updating task:', error);
    return null;
  }

  return data;
}

export async function deleteTask(id: string): Promise<boolean> {
  const { error } = await supabase.from('tasks').delete().eq('id', id);

  if (error) {
    console.error('Error deleting task:', error);
    return false;
  }

  return true;
}
