import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from 'vitest-browser-react';

import { TaskFilterProps } from '../filter/types';
import { TaskFormProps } from '../form/types';
import { TasksListProps } from '../list';

import { TaskManager } from './TaskManager';

const mockFilteredTasks = [
  { id: '1', title: 'Task 1', completed: false },
  { id: '2', title: 'Task 2', completed: true },
];

const mockStore = {
  filteredTasks: mockFilteredTasks,
  filter: 'all',
  addTask: vi.fn(),
  deleteTask: vi.fn(),
  toggleTask: vi.fn(),
  setFilter: vi.fn(),
  fetchTasks: vi.fn(),
  isLoading: false,
};

vi.mock('../../store', () => ({
  useTasksStore: () => mockStore,
}));

vi.mock('../filter', () => ({
  TaskFilter: ({ currentFilter, onFilterChange }: TaskFilterProps) => (
    <div data-testid="task-filter" data-filter={currentFilter}>
      <button onClick={() => onFilterChange('all')}>All</button>
      <button onClick={() => onFilterChange('completed')}>Completed</button>
      <button onClick={() => onFilterChange('pending')}>Pending</button>
    </div>
  ),
}));

vi.mock('../form', () => ({
  TaskForm: ({ onAddTask }: TaskFormProps) => (
    <form
      data-testid="task-form"
      onSubmit={e => {
        e.preventDefault();
        onAddTask('New Task');
      }}
    >
      <button type="submit">Add</button>
    </form>
  ),
}));

vi.mock('../list', () => ({
  TasksList: ({ tasks, onDelete, onToggle }: TasksListProps) => (
    <>
      <h2>Tasks List</h2>
      <div data-testid="tasks-list" data-count={tasks.length}>
        {tasks.map(task => (
          <div key={task.id}>
            <span onClick={() => onToggle(task.id)}>{task.title}</span>
            <button onClick={() => onDelete(task.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  ),
}));

vi.mock('@lateral/design-system', () => ({
  LoadingIndicator: () => <div data-testid="loading-indicator">Loading...</div>,
}));

describe('TaskManager', () => {
  beforeEach(vi.clearAllMocks);

  it('renders all child components', async () => {
    const { getByTestId } = render(<TaskManager />);

    await expect.element(getByTestId('task-form')).toBeInTheDocument();
    await expect.element(getByTestId('task-filter')).toBeInTheDocument();
    await expect.element(getByTestId('tasks-list')).toBeInTheDocument();
  });

  it('calls fetchTasks on mount', async () => {
    render(<TaskManager />);
    expect(mockStore.fetchTasks).toHaveBeenCalledTimes(1);
  });

  it('passes correct props to TaskFilter', async () => {
    const { getByTestId } = render(<TaskManager />);

    const filter = await getByTestId('task-filter');
    expect(filter).toHaveAttribute('data-filter', 'all');
  });

  it('passes tasks to TasksList', async () => {
    const { getByTestId } = render(<TaskManager />);

    const tasksList = await getByTestId('tasks-list');
    expect(tasksList).toHaveAttribute('data-count', '2');
  });

  it('shows loading indicator when isLoading is true', async () => {
    mockStore.isLoading = true;
    const { getByText } = render(<TaskManager />);

    expect(getByText('Loading...')).toBeInTheDocument();
    // expect(getByText('Tasks List')).not.toBeInTheDocument();

    mockStore.isLoading = false;
  });
});
