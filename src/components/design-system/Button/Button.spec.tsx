import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { Button } from './Button';
import { ButtonProps } from './types';

describe('Button', () => {
  it('renders with default props', async () => {
    const { getByRole } = render(<Button>Click me</Button>);

    const button = await getByRole('button', { name: /click me/i });
    await expect.element(button).toBeInTheDocument();
    await expect.element(button).toHaveAttribute('type', 'button');
  });

  it.each(
    ['primary', 'secondary', 'danger'] as ButtonProps['variant'][]
  )('renders with %s variant', async (variant) => {
    const { getByRole } = render(
      <Button variant={variant}>{variant}</Button>
    );

    const button = await getByRole('button', { name: variant });
    await expect.element(button).toBeInTheDocument();
  });

  it('renders with custom type', async () => {
    const { getByRole } = render(<Button type="submit">Submit</Button>);

    const button = await getByRole('button', { name: /submit/i });
    await expect.element(button).toHaveAttribute('type', 'submit');
  });

  it('triggers onClick when clicked', async () => {
    const handleClick = vi.fn();
    const { getByRole } = render(<Button onClick={handleClick}>Click me</Button>);

    const button = await getByRole('button', { name: /click me/i });
    await button.click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', async () => {
    const { getByRole } = render(<Button disabled>Disabled</Button>);

    const button = await getByRole('button', { name: /disabled/i });
    await expect.element(button).toBeDisabled();
  });
});
