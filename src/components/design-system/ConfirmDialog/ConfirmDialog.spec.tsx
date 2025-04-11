import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from 'vitest-browser-react';
import { ConfirmDialog } from './ConfirmDialog';

describe('ConfirmDialog', () => {
  const defaultProps = {
    isOpen: true,
    title: 'Confirm Action',
    message: 'Are you sure you want to proceed?',
    onCancel: vi.fn(),
    onConfirm: vi.fn()
  };

  beforeEach(vi.clearAllMocks);

  it('renders when isOpen is true', async () => {
    const { getByText, getByRole } = render(<ConfirmDialog {...defaultProps} />);
    
    await expect.element(await getByText('Confirm Action')).toBeInTheDocument();
    await expect.element(await getByText('Are you sure you want to proceed?')).toBeInTheDocument();
    await expect.element(await getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    await expect.element(await getByRole('button', { name: /confirm/i })).toBeInTheDocument();
  });

  it('does not render when isOpen is false', async () => {
    const { getByText } = render(<ConfirmDialog {...defaultProps} isOpen={false} />);
    
    await expect.element(await getByText('Confirm Action')).not.toBeInTheDocument();
    await expect.element(await getByText('Are you sure you want to proceed?')).not.toBeInTheDocument();
  });

  it('calls onCancel when cancel button is clicked', async () => {
    const { getByRole } = render(<ConfirmDialog {...defaultProps} />);
    
    const cancelButton = await getByRole('button', { name: /cancel/i });
    await cancelButton.click();
    
    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
    expect(defaultProps.onConfirm).not.toHaveBeenCalled();
  });

  it('calls onConfirm when confirm button is clicked', async () => {
    const { getByRole } = render(<ConfirmDialog {...defaultProps} />);
    
    const confirmButton = await getByRole('button', { name: /confirm/i });
    await confirmButton.click();
    
    expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
    expect(defaultProps.onCancel).not.toHaveBeenCalled();
  });

  it('displays custom button labels when provided', async () => {
    const { getByRole } = render(
      <ConfirmDialog 
        {...defaultProps} 
        cancelLabel="No, go back"
        confirmLabel="Yes, do it"
      />
    );
    
    await expect.element(await getByRole('button', { name: /no, go back/i })).toBeInTheDocument();
    await expect.element(await getByRole('button', { name: /yes, do it/i })).toBeInTheDocument();
  });
});
