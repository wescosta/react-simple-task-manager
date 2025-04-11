import React from "react";

import { ButtonProps } from "./types";
import { baseStyles, variantStyles } from "./styles";

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  type = "button",
  variant = "primary",
  className = "",
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`${baseStyles} ${variantStyles[variant]} ${className}`}
  >
    {children}
  </button>
);
