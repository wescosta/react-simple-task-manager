import React from "react";

import { useTaskStore } from "../../store";
import { TaskFilter, TaskForm, TasksList } from "..";

export const TaskManager: React.FC = () => {
  const { 
    filteredTasks,
    filter,
    addTask,
    deleteTask,
    toggleTask,
    setFilter
  } = useTaskStore();

  return (
    <div className="container mx-auto bg-white p-6 rounded-lg shadow-md max-w-2xl my-8">
      <TaskForm onAddTask={addTask} />

      <TaskFilter
        currentFilter={filter}
        onFilterChange={setFilter}
      />

      <TasksList
        tasks={filteredTasks}
        onDelete={deleteTask}
        onToggle={toggleTask}
      />
    </div>
  );
};
