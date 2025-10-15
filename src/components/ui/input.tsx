import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={`glass-card border border-[var(--input-border)] rounded-2xl px-4 py-3 w-full text-base focus:outline-none focus:ring-2 focus:ring-[var(--input-focus)] focus:border-transparent bg-[var(--input-bg)] text-[var(--text-primary)] transition-all duration-200 placeholder:text-[var(--text-secondary)] ${className}`}
      {...props}
    />
  );
};