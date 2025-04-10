import React from "react";
import { TaskItem } from "../item/TaskItem";
import type { TasksListProps } from "./types";

export const TasksList: React.FC<TasksListProps> = ({
  tasks,
  onDelete,
  onToggle
}) => (
  <div className="bg-gray-50 rounded-md border border-gray-100">
    {tasks.length > 0 ? (
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={onDelete}
            onToggle={onToggle} />
        ))}
      </ul>
    ) : (
      <p className="text-gray-500 text-center py-8">No tasks found</p>
    )}
  </div>
);


