import React from "react";
import { Button } from "../../design-system";
import { TaskFilterProps } from "./types";

export const TaskFilter: React.FC<TaskFilterProps> = ({ 
  currentFilter, 
  onFilterChange 
}) => {
  return (
    <div className="flex justify-center space-x-4 mb-6">
      <Button
        onClick={() => onFilterChange("all")}
        variant={currentFilter === "all" ? "primary" : "secondary"}
      >
        All
      </Button>
      <Button
        onClick={() => onFilterChange("completed")}
        variant={currentFilter === "completed" ? "primary" : "secondary"}
      >
        Completed
      </Button>
      <Button
        onClick={() => onFilterChange("pending")}
        variant={currentFilter === "pending" ? "primary" : "secondary"}
      >
        Pending
      </Button>
    </div>
  );
};
