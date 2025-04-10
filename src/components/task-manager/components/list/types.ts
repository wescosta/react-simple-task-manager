import type { Task } from "../../store/models";

export interface TasksListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}
