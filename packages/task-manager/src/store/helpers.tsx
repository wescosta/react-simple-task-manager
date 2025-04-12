import { Task, FilterType } from './models';

export const getFilteredTasks = (tasks: Task[], filter: FilterType): Task[] => {
  return tasks.filter(task => {
    if (filter === 'completed') return task.completed === true;
    if (filter === 'pending') return task.completed === false;
    return true;
  });
};
