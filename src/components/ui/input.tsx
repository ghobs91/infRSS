import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={`border border-[var(--card-border)] rounded-xl px-4 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--card-bg)] text-[var(--text-primary)] ${className}`}
      {...props}
    />
  );
};