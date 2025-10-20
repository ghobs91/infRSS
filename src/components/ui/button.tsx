interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({ className = "", variant = "default", size = "md", children, ...props }) => {
  const base = "font-semibold rounded-3xl transition-all duration-300 active:scale-95 relative overflow-hidden";
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg",
  };
  const variants = {
    default: "bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white shadow-lg hover:shadow-xl hover:scale-105",
    destructive: "bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl hover:scale-105",
    ghost: "glass-button text-[var(--text-primary)] hover:scale-105",
    outline: "glass-button text-[var(--text-primary)] border-[var(--border)] hover:border-[var(--primary)] hover:scale-105",
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
