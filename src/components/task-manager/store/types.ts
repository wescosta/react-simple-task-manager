import type { Task, FilterType } from './models';

export interface TaskState {
  tasks: Task[];
  filter: FilterType;
  filteredTasks: Task[];
  addTask: (title: string) => void;
  deleteTask: (id: number) => void;
  toggleTask: (id: number) => void;
  setFilter: (filter: FilterType) => void;
}
