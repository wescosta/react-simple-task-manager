import React, { useState, useCallback } from "react";

import { TaskForm } from "../form";
import { TaskFilter } from "../filter";
import { TasksList } from "../list";
import { FilterType, Task } from "../types";

import { TaskManagerProps } from "./types";
import { getFilteredTasks, generateTaskId } from "./helpers";

export const TaskManager: React.FC<TaskManagerProps> = ({ initialTasks = [] }) => {
  const [tasks, setTasks] = useState<Task[]>(
    initialTasks.length > 0 ? initialTasks : [
      { id: 1, title: "Buy groceries", completed: false },
      { id: 2, title: "Clean the house", completed: true },
    ]
  );
  const [filter, setFilter] = useState<FilterType>('all');
  const filteredTasks = React.useMemo(() => getFilteredTasks(tasks, filter), [tasks, filter]);

  const handleAddTask = useCallback((title: string) => {
    const newTaskObj: Task = {
      id: generateTaskId(tasks),
      title,
      completed: false,
    };

    setTasks(prevTasks => [...prevTasks, newTaskObj]);
  }, [tasks]);

  const handleDeleteTask = useCallback((id: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, []);

  const toggleTaskCompletion = useCallback((id: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const handleFilterChange = useCallback((newFilter: FilterType) => {
    setFilter(newFilter);
  }, []);

  return (
    <div className="container mx-auto bg-white p-6 rounded-lg shadow-md max-w-2xl my-8">
      <TaskForm onAddTask={handleAddTask} />

      <TaskFilter
        currentFilter={filter}
        onFilterChange={handleFilterChange}
      />

      <TasksList
        tasks={filteredTasks}
        onDelete={handleDeleteTask}
        onToggle={toggleTaskCompletion}
      />
    </div>
  );
};
