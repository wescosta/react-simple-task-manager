import type { Task, FilterType } from './models';

export interface TasksState {
  tasks: Task[];
  filter: FilterType;
  filteredTasks: Task[];
  isLoading: boolean;
  fetchTasks: () => void;
  addTask: (title: string) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  setFilter: (filter: FilterType) => void;
}
