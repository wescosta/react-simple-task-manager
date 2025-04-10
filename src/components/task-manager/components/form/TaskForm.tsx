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
    <form onSubmit={handleSubmit} className="mb-6 flex">
      <Input
        value={newTask}
        placeholder="New task..."
        className="flex-grow rounded-l-md"
        onChange={(e) => setNewTask(e.target.value)}
      />
      <Button 
        type="submit" 
        className="rounded-l-none rounded-r-md px-6"
      >
        Add
      </Button>
    </form>
  );
};
