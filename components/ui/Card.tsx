import React, { HTMLAttributes } from "react";
import { clsx } from "clsx";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
}

export const Card: React.FC<CardProps> = ({
  children,
  padding = "md",
  className,
  ...props
}) => {
  const paddings = {
    none: "p-0",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={clsx(
        "bg-white border border-slate-100 rounded-2xl shadow-xs hover:shadow-md transition-all duration-200",
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
