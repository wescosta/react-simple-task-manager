import type { ButtonProps, ConfirmDialogProps } from '@lateral/design-system';
import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';

import { TaskItem } from './TaskItem';

vi.mock('@lateral/design-system', () => ({
  Button: ({ children, onClick, variant, className }: ButtonProps) => (
    <button onClick={onClick} data-variant={variant} className={className}>
      {children}
    </button>
  ),
  ConfirmDialog: ({ isOpen, onConfirm, onCancel, title, message }: ConfirmDialogProps) =>
    isOpen ? (
      <div role="dialog" data-testid="confirm-dialog">
        <div>{title}</div>
        <div>{message}</div>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    ) : null,
  useToast: () => ({
    showToast: vi.fn(),
  }),
}));

describe('TaskItem', () => {
  const mockTask = {
    id: '1',
    title: 'Test Task',
    completed: false,
  };

  it('renders task item with correct title', async () => {
    const { container } = render(
      <TaskItem task={mockTask} onDelete={() => {}} onToggle={() => {}} />
    );

    await expect.element(container).toHaveTextContent('Test Task');
  });

  it('applies strikethrough style when task is completed', async () => {
    const completedTask = { ...mockTask, completed: true };
    const { container } = render(
      <TaskItem task={completedTask} onDelete={() => {}} onToggle={() => {}} />
    );

    const taskText = await container.querySelector('.text-green-500.line-through');
    await expect.element(taskText).toHaveTextContent('Test Task');
  });

  it('calls onToggle when task text is clicked', async () => {
    const onToggle = vi.fn();
    const { getByText } = render(
      <TaskItem task={mockTask} onDelete={() => {}} onToggle={onToggle} />
    );

    const taskText = await getByText('Test Task');
    await taskText.click();

    expect(onToggle).toHaveBeenCalledWith('1');
  });

  it('shows confirm dialog when delete button is clicked', async () => {
    const { getByRole } = render(
      <TaskItem task={mockTask} onDelete={() => {}} onToggle={() => {}} />
    );

    const dialog = await getByRole('dialog');
    await expect.element(dialog).not.toBeInTheDocument();

    const deleteButton = await getByRole('button', { name: /delete/i });
    await deleteButton.click();

    await expect.element(getByRole('dialog')).toBeInTheDocument();
    await expect
      .element(getByRole('dialog'))
      .toHaveTextContent('Are you sure you want to delete "Test Task"?');
  });

  it('calls onDelete when confirm button is clicked', async () => {
    const onDelete = vi.fn();
    const { getByRole } = render(
      <TaskItem task={mockTask} onDelete={onDelete} onToggle={() => {}} />
    );

    const deleteButton = await getByRole('button', { name: /delete/i });
    await deleteButton.click();

    const confirmButton = await getByRole('button', { name: /confirm/i });
    await confirmButton.click();

    expect(onDelete).toHaveBeenCalledWith('1');
  });

  it('hides confirm dialog when cancel button is clicked', async () => {
    const { getByRole } = render(
      <TaskItem task={mockTask} onDelete={() => {}} onToggle={() => {}} />
    );

    const deleteButton = await getByRole('button', { name: /delete/i });
    await deleteButton.click();

    await expect.element(getByRole('dialog')).toBeInTheDocument();

    const cancelButton = await getByRole('button', { name: /cancel/i });
    await cancelButton.click();

    await expect.element(getByRole('dialog')).not.toBeInTheDocument();
  });
});
