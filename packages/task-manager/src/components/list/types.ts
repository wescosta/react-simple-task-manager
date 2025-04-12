import type { Task } from '../../store/models';

export interface TasksListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}
