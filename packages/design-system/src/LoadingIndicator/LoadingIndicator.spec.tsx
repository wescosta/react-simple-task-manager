import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { LoadingIndicator } from './LoadingIndicator';

describe('LoadingIndicator', () => {
  it('renders correctly', async () => {
    const { getByRole } = render(<LoadingIndicator />);

    const loadingElement = await getByRole('status');
    await expect.element(loadingElement).toBeInTheDocument();
  });
});
