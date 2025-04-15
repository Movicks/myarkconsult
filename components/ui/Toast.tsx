import * as React from "react";

export interface ToastProps {
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  duration?: number;
  variant?: "default" | "destructive" | "success" | "warning" | "info";
}

export type ToastActionElement = React.ReactElement<{
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}>;

export interface ToastComponentProps extends ToastProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  children?: React.ReactNode;
}

export function Toast({ 
  className, 
  open = true, 
  onOpenChange, 
  duration = 3000, 
  variant = "default",
  title,
  description,
  action,
  children 
}: ToastComponentProps) {
  // Implementation would go here
  return (
    <div className={className} data-variant={variant}>
      {title && <h3>{title}</h3>}
      {description && <p>{description}</p>}
      {action && React.cloneElement(action, {
        onClick: () => {
          action.props.onClick?.();
          onOpenChange?.(false);
        }
      })}
      {children}
    </div>
  );
}