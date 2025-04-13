import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  variant?: 'default' | 'ghost';
}

export const IconButton: React.FC<IconButtonProps> = ({ 
  icon, 
  label, 
  variant = 'default', 
  className = '', 
  ...props 
}) => {
  const base = "p-2 rounded-full transition-colors";
  const variants = {
    default: "bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white",
    ghost: "hover:bg-[var(--background-hover)] text-[var(--text-primary)]",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      aria-label={label}
      {...props}
    >
      {icon}
    </button>
  );
}; 