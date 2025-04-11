import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { userEvent } from '@vitest/browser/context'
import { render } from 'vitest-browser-react';
import { Input } from './Input';
import { InputProps } from './types';

describe('Input', () => {
  const handleChange = vi.fn();

  beforeEach(vi.clearAllMocks);

  it('renders correctly with default props', async () => {
    const { getByRole } = render(<Input value="" onChange={handleChange} />);

    const input = await getByRole('textbox');
    await expect.element(input).toBeInTheDocument();
    await expect.element(input).toHaveAttribute('type', 'text');
    await expect.element(input).toHaveValue('');
  });

  it('displays the provided value', async () => {
    const { getByRole } = render(<Input value="Test value" onChange={handleChange} />);

    const input = await getByRole('textbox');
    await expect.element(input).toHaveValue('Test value');
  });

  it('calls onChange handler when input changes', async () => {
    const StatefullInput = (props: InputProps) => {
      const [value, setValue] = React.useState(props.value);
      return <Input {...props} value={value} onChange={(e) => { setValue(e.target.value); props.onChange?.(e); }} />;
    };

    const { getByRole } = render(<StatefullInput value='initial value' onChange={handleChange} />);

    const input = await getByRole('textbox');
    
    await expect(input).toHaveValue('initial value');
    await expect(handleChange).not.toHaveBeenCalled();

    await userEvent.clear(input);
    await userEvent.type(input, 'New value');

    await expect(input).toHaveValue('New value');
    await expect(handleChange).toHaveBeenCalled();

    const calls = handleChange.mock.calls;
    await expect(calls[calls.length - 1][0].target.value).toBe('New value');
  });

  it('applies custom type', async () => {
    const { getByRole } = render(<Input type="password" value="secret" onChange={handleChange} />);

    const input = await getByRole('textbox');
    await expect.element(input).toHaveAttribute('type', 'password');
  });

  it('applies placeholder text', async () => {
    const { getByPlaceholder } = render(<Input value="" onChange={handleChange} placeholder="Enter your name" />);

    const input = await getByPlaceholder('Enter your name');
    await expect.element(input).toBeInTheDocument();
  });
});
