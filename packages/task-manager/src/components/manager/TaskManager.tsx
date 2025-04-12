import { LoadingIndicator } from '@lateral/design-system';
import React, { useEffect } from 'react';

import { useTasksStore } from '../../store';
import { TaskFilter } from '../filter';
import { TaskForm } from '../form';
import { TasksList } from '../list';

export const TaskManager: React.FC = () => {
  const {
    filteredTasks,
    filter,
    addTask,
    deleteTask,
    toggleTask,
    setFilter,
    fetchTasks,
    isLoading,
  } = useTasksStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="container mx-auto bg-white p-3 sm:p-6 rounded-lg shadow-md max-w-2xl my-4 sm:my-8">
      <div className="sticky top-0 bg-white p-4 shadow-sm z-10">
        <TaskForm onAddTask={addTask} />
        <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
      </div>

      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <TasksList tasks={filteredTasks} onDelete={deleteTask} onToggle={toggleTask} />
      )}
    </div>
  );
};
