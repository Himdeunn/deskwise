import React, { HTMLAttributes } from "react";
import { clsx } from "clsx";

export const Skeleton: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={clsx("animate-pulse rounded-md bg-slate-200/80", className)}
      {...props}
    />
  );
};
