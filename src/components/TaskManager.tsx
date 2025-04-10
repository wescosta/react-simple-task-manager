import React, { useState } from "react";

import TaskItem from "./TaskItem";
import { Task, FilterType } from "./types";

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Buy groceries", completed: false },
    { id: 2, title: "Clean the house", completed: true },
  ]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [newTask, setNewTask] = useState<string>("");

  // Fixed filter conditions
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed === true;
    if (filter === "pending") return task.completed === false;
    return true;
  });

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() === "") return;

    const newTaskObj: Task = {
      id: tasks.length + 1,
      title: newTask,
      completed: false,
    };
    
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  // Fixed: Creating a new array for immutable state updates with .filter when deleting
  const handleDeleteTask = (id: number) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (id: number) => {
    const updatedTasks = tasks.map((task) => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="container mx-auto bg-white p-6 rounded-lg shadow-md max-w-2xl my-8">
      <form onSubmit={handleAddTask} className="mb-6 flex">
        <input
          type="text"
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-grow border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-r-md transition-colors font-medium"
        >
          Add
        </button>
      </form>
      
      <div className="flex justify-center space-x-4 mb-6">
        <button 
          onClick={() => setFilter("all")} 
          className={`px-4 py-2 rounded-md transition-colors ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded-md transition-colors ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          Completed
        </button>
        <button 
          onClick={() => setFilter("pending")} 
          className={`px-4 py-2 rounded-md transition-colors ${filter === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          Pending
        </button>
      </div>
      
      <div className="bg-gray-50 rounded-md border border-gray-100">
        {filteredTasks.length > 0 ? (
          <ul>
            {filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={handleDeleteTask}
                onToggle={toggleTaskCompletion}
              />
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center py-8">No tasks found</p>
        )}
      </div>
    </div>
  );
};

export default TaskManager;
