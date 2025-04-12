import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';

import { TaskFilter } from './TaskFilter';

describe('TaskFilter', () => {
  it('renders all filter buttons', async () => {
    const { getByRole } = render(<TaskFilter currentFilter="all" onFilterChange={() => {}} />);

    await expect.element(getByRole('button', { name: /all/i })).toBeInTheDocument();
    await expect.element(getByRole('button', { name: /completed/i })).toBeInTheDocument();
    await expect.element(getByRole('button', { name: /pending/i })).toBeInTheDocument();
  });

  it('applies primary variant to selected filter', async () => {
    const { getByRole } = render(
      <TaskFilter currentFilter="completed" onFilterChange={() => {}} />
    );

    const allButton = getByRole('button', { name: /all/i });
    const completedButton = getByRole('button', { name: /completed/i });

    await expect(completedButton).toHaveClass('bg-blue-500');
    await expect(allButton).not.toHaveClass('bg-blue-500');
  });

  it('calls onFilterChange with correct filter value when clicked', async () => {
    const onFilterChange = vi.fn();
    const { getByRole } = render(
      <TaskFilter currentFilter="all" onFilterChange={onFilterChange} />
    );

    const pendingButton = await getByRole('button', { name: /pending/i });
    await pendingButton.click();

    expect(onFilterChange).toHaveBeenCalledWith('pending');
  });
});
