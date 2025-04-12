import React from 'react';

import { baseStyles } from './styles';
import { InputProps } from './types';

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  type = 'text',
  placeholder = '',
  className = '',
}) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`${baseStyles} ${className}`}
  />
);
