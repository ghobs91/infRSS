interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({ className = "", variant = "default", size = "md", children, ...props }) => {
  const base = "font-semibold rounded-xl shadow-sm transition-colors";
  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };
  const variants = {
    default: "bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white",
    destructive: "bg-red-600 hover:bg-red-700 text-white",
    ghost: "bg-transparent hover:bg-[var(--muted)] text-[var(--foreground)]",
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
