import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';

import { TasksList } from './TasksList';

vi.mock('../item/TaskItem', () => ({
  TaskItem: ({ task }: { task: { id: string; title: string } }) => (
    <div data-testid="task-item" data-id={task.id}>
      {task.title}
    </div>
  ),
}));

describe('TasksList', () => {
  const mockTasks = [
    { id: '1', title: 'Task 1', completed: false },
    { id: '2', title: 'Task 2', completed: true },
  ];

  it('renders a list of task items', async () => {
    const { container } = render(
      <TasksList tasks={mockTasks} onDelete={() => {}} onToggle={() => {}} />
    );

    const taskItems = await container.querySelectorAll('[data-testid="task-item"]');

    expect(taskItems.length).toBe(2);
    await expect.element(taskItems[0]).toHaveTextContent('Task 1');
    await expect.element(taskItems[1]).toHaveTextContent('Task 2');
  });

  it('renders "No tasks found" message when tasks array is empty', async () => {
    const { container } = render(<TasksList tasks={[]} onDelete={() => {}} onToggle={() => {}} />);

    await expect.element(container).toHaveTextContent('No tasks found');
    const taskItems = await container.querySelectorAll('[data-testid="task-item"]');
    expect(taskItems.length).toBe(0);
  });

  it('passes correct props to TaskItem components', async () => {
    const onDelete = vi.fn();
    const onToggle = vi.fn();
    const { container } = render(
      <TasksList tasks={mockTasks} onDelete={onDelete} onToggle={onToggle} />
    );

    const taskItems = await container.querySelectorAll('[data-testid="task-item"]');
    expect(taskItems[0].getAttribute('data-id')).toBe('1');
    expect(taskItems[1].getAttribute('data-id')).toBe('2');
  });
});
