import { ToastProvider } from '@lateral/design-system';
import React from 'react';

import { TaskManager } from './components/manager';

export function App() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-100 p-4">
        <header className="text-center mb-4">
          <h1 className="text-3xl font-bold">Task Manager</h1>
        </header>
        <main>
          <TaskManager />
        </main>
      </div>
    </ToastProvider>
  );
}
