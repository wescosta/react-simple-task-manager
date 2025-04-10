export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export type FilterType = 'all' | 'completed' | 'pending';
