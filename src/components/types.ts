export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export type FilterType = 'all' | 'completed' | 'pending';

export interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}
