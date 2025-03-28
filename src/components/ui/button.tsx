interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive";
}

export const Button: React.FC<ButtonProps> = ({ className = "", variant = "default", children, ...props }) => {
  const base = "font-semibold px-4 py-2 rounded-xl shadow-sm transition-colors";
  const variants = {
    default: "bg-blue-600 hover:bg-blue-700 text-white",
    destructive: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
