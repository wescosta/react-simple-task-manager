import React, { useEffect } from 'react';

import { TOAST_AUTO_CLOSE_TIMEOUT } from './constants';
import { colorClasses, toastClasses } from './styles';
import { ToastProps } from './types';

export const Toast: React.FC<ToastProps> = ({ message, onClose, type = 'success' }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, TOAST_AUTO_CLOSE_TIMEOUT);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${toastClasses} ${colorClasses[type]}`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 hover:text-gray-200 focus:outline-none">
        &times;
      </button>
    </div>
  );
};
