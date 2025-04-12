import { create } from 'zustand';

import { getFilteredTasks } from './helpers';
import type { FilterType, Task } from './models';
import { fetchTasks, addTask, updateTask, deleteTask } from './service';
import type { TasksState } from './types';

const initialTasks: Task[] = [];

export const useTasksStore = create<TasksState>((set, get) => ({
  tasks: initialTasks,
  filter: 'all',
  filteredTasks: initialTasks,
  isLoading: false,

  fetchTasks: async () => {
    set({ isLoading: true });

    const tasks = await fetchTasks();

    set(state => ({
      tasks,
      filteredTasks: getFilteredTasks(tasks, state.filter),
      isLoading: false,
    }));
  },

  addTask: async (title: string) => {
    const newTaskData = {
      title,
      completed: false,
    };

    // temporary id for optimistic updates
    const tempId = `temp-${Date.now()}`;

    set(state => {
      const updatedTasks = [{ ...newTaskData, id: tempId }, ...state.tasks];

      return {
        tasks: updatedTasks,
        filteredTasks: getFilteredTasks(updatedTasks, state.filter),
      };
    });

    const persistedTask = await addTask(newTaskData);

    if (persistedTask) {
      set(state => {
        const updatedTasks = state.tasks.map(task => (task.id === tempId ? persistedTask : task));
        return {
          tasks: updatedTasks,
          filteredTasks: getFilteredTasks(updatedTasks, state.filter),
        };
      });
    }
  },

  deleteTask: async (id: string) => {
    // optimistically update UI
    const taskToDelete = get().tasks.find(task => task.id === id);

    set(state => {
      const updatedTasks = state.tasks.filter(task => task.id !== id);

      return {
        tasks: updatedTasks,
        filteredTasks: getFilteredTasks(updatedTasks, state.filter),
      };
    });

    const success = await deleteTask(id);

    // if there was a problem deleting, then revert it
    if (!success && taskToDelete) {
      set(state => {
        const updatedTasks = [...state.tasks, taskToDelete];

        return {
          tasks: updatedTasks,
          filteredTasks: getFilteredTasks(updatedTasks, state.filter),
        };
      });
    }
  },

  toggleTask: async (id: string) => {
    const taskToUpdate = get().tasks.find(task => task.id === id);
    if (!taskToUpdate) return;

    const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };

    set(state => {
      const updatedTasks = state.tasks.map(task => (task.id === id ? updatedTask : task));
      return {
        tasks: updatedTasks,
        filteredTasks: getFilteredTasks(updatedTasks, state.filter),
      };
    });

    const result = await updateTask(updatedTask);

    if (!result) {
      set(state => {
        const revertedTasks = state.tasks.map(task => (task.id === id ? taskToUpdate : task));
        return {
          tasks: revertedTasks,
          filteredTasks: getFilteredTasks(revertedTasks, state.filter),
        };
      });
    }
  },

  setFilter: (filter: FilterType) => {
    set(state => ({
      filter,
      filteredTasks: getFilteredTasks(state.tasks, filter),
    }));
  },
}));
