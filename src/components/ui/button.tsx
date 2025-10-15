interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({ className = "", variant = "default", size = "md", children, ...props }) => {
  const base = "font-semibold rounded-2xl transition-all duration-200 active:scale-95";
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5",
    lg: "px-7 py-3.5 text-lg",
  };
  const variants = {
    default: "bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white shadow-md hover:shadow-lg",
    destructive: "bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg",
    ghost: "glass-button text-[var(--text-primary)]",
    outline: "glass-button text-[var(--text-primary)] border-[var(--border)]",
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
