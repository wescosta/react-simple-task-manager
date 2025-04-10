import React from "react";

import { InputProps } from "./types";
import { baseStyles } from "./styles";

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  type = "text",
  placeholder = "",
  className = "",
}) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`${baseStyles} ${className}`}
  />
);
