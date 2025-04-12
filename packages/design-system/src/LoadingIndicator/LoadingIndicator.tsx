import React from 'react';

export const LoadingIndicator = () => (
  <div
    role="status"
    aria-live="polite"
    aria-label="Loading..."
    className="flex justify-center items-center py-8"
  >
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);
