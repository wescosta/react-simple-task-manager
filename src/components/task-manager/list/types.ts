import { Task } from "../types";

export interface TasksListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}
