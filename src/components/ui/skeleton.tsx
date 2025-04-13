import React from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "", ...props }) => {
  return (
    <div
      className={`bg-[var(--accent)] rounded-lg ${className}`}
      style={{ animation: "pulse 1.5s ease-in-out infinite" }}
      {...props}
    />
  );
}; 