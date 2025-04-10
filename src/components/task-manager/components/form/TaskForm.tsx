import React, { useState, useCallback } from "react";
import type { TaskFormProps } from "./types";
import { Button, Input } from "../../../design-system";

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState<string>("");

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() === "") return;

    onAddTask(newTask);
    setNewTask("");
  }, [newTask, onAddTask]);

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex flex-col space-y-2 sm:mb-6 sm:flex-row sm:space-y-0">
      <Input
        value={newTask}
        placeholder="New task..."
        className="flex-grow rounded-md text-sm sm:text-base sm:rounded-r-none"
        onChange={(e) => setNewTask(e.target.value)}
      />
      <Button 
        type="submit" 
        className="rounded-md w-full px-3 text-sm sm:text-base sm:w-auto sm:rounded-l-none sm:px-6"
      >
        Add
      </Button>
    </form>
  );
};
