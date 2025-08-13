import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={`border border-[var(--input-border)] rounded-xl px-4 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-[var(--input-focus)] focus:border-[var(--input-focus)] bg-[var(--input-bg)] text-[var(--text-primary)] transition-colors ${className}`}
      {...props}
    />
  );
};