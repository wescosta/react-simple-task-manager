import { create } from 'zustand';
import type { TaskState } from './types';
import type { FilterType, Task } from './models';
import { generateTaskId, getFilteredTasks } from './helpers';

const initialTasks: Task[] = [
  { id: 1, title: "Buy groceries", completed: false },
  { id: 2, title: "Clean the house", completed: true },
];

export const useTasksStore = create<TaskState>((set, get) => ({
  tasks: initialTasks,
  filter: 'all',
  filteredTasks: initialTasks,

  addTask: (title: string) => {
    const { tasks } = get();
    const newTask: Task = {
      id: generateTaskId(tasks),
      title,
      completed: false,
    };
    
    set(state => {
      const updatedTasks = [...state.tasks, newTask];
      return {
        tasks: updatedTasks,
        filteredTasks: getFilteredTasks(updatedTasks, state.filter)
      };
    });
  },

  deleteTask: (id: number) => {
    set(state => {
      const updatedTasks = state.tasks.filter(task => task.id !== id);
      return {
        tasks: updatedTasks,
        filteredTasks: getFilteredTasks(updatedTasks, state.filter)
      };
    });
  },

  toggleTask: (id: number) => {
    set(state => {
      const updatedTasks = state.tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      return {
        tasks: updatedTasks,
        filteredTasks: getFilteredTasks(updatedTasks, state.filter)
      };
    });
  },

  setFilter: (filter: FilterType) => {
    set(state => ({
      filter,
      filteredTasks: getFilteredTasks(state.tasks, filter)
    }));
  }
}));
