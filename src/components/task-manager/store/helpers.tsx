import { Task, FilterType } from "./models";

export const getFilteredTasks = (tasks: Task[], filter: FilterType): Task[] => {
  return tasks.filter((task) => {
    if (filter === "completed") return task.completed === true;
    if (filter === "pending") return task.completed === false;
    return true;
  });
};

export const generateTaskId = (tasks: Task[]): number => {
  return tasks.length > 0
    ? Math.max(...tasks.map(task => task.id)) + 1
    : 1;
};
