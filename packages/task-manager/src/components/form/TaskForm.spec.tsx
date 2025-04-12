import { userEvent } from '@vitest/browser/context';
import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';

import { TaskForm } from './TaskForm';

describe('TaskForm', () => {
  it('renders form with input and button', async () => {
    const { getByRole, getByPlaceholder } = render(<TaskForm onAddTask={() => {}} />);

    await expect.element(getByPlaceholder('New task...')).toBeInTheDocument();
    await expect.element(getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('button is disabled when input is empty', async () => {
    const { getByRole } = render(<TaskForm onAddTask={() => {}} />);

    const button = await getByRole('button', { name: /add/i });
    await expect.element(button).toBeDisabled();
  });

  it('button is enabled when input has value', async () => {
    const { getByRole, getByPlaceholder } = render(<TaskForm onAddTask={() => {}} />);

    const input = await getByPlaceholder('New task...');
    const button = await getByRole('button', { name: /add/i });

    await userEvent.type(input, 'New task');

    await expect.element(button).not.toBeDisabled();
  });

  it('calls onAddTask with input value on submit', async () => {
    const onAddTask = vi.fn();
    const { getByRole, getByPlaceholder } = render(<TaskForm onAddTask={onAddTask} />);

    const input = await getByPlaceholder('New task...');
    const button = await getByRole('button', { name: /add/i });

    await userEvent.type(input, 'Test task');
    await button.click();

    expect(onAddTask).toHaveBeenCalledWith('Test task');
    expect(input).toHaveValue('');
  });

  it('does not call onAddTask when input is empty', async () => {
    const onAddTask = vi.fn();
    const { container, getByRole } = render(<TaskForm onAddTask={onAddTask} />);

    const addButton = await getByRole('button', { name: /add/i });
    expect(addButton).toBeDisabled();

    await container.querySelector('form')?.dispatchEvent(new Event('submit', { bubbles: true }));

    expect(onAddTask).not.toHaveBeenCalled();
  });

  it('trims whitespace from input value', async () => {
    const onAddTask = vi.fn();
    const { getByRole, getByPlaceholder } = render(<TaskForm onAddTask={onAddTask} />);

    const input = await getByPlaceholder('New task...');
    const button = await getByRole('button', { name: /add/i });

    await userEvent.type(input, '  Trim me  ');
    await button.click();

    expect(onAddTask).toHaveBeenCalledWith('Trim me');
  });
});
