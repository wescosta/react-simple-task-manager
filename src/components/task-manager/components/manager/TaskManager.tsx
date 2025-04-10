import React, { useEffect } from "react";

import { useTasksStore } from "../../store";
import { TaskFilter, TaskForm, TasksList } from "..";
import { LoadingIndicator } from "../../../design-system";

export const TaskManager: React.FC = () => {
  const {
    filteredTasks,
    filter,
    addTask,
    deleteTask,
    toggleTask,
    setFilter,
    fetchTasks,
    isLoading
  } = useTasksStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]); 

  return (
    <div className="container mx-auto bg-white p-6 rounded-lg shadow-md max-w-2xl my-8">
      <TaskForm onAddTask={addTask} />

      <TaskFilter
        currentFilter={filter}
        onFilterChange={setFilter}
      />

      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <TasksList
          tasks={filteredTasks}
          onDelete={deleteTask}
          onToggle={toggleTask}
        />
      )}
    </div>
  );
};
