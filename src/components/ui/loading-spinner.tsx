import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  variant?: "primary" | "secondary" | "gradient";
}

export default function LoadingSpinner({
  size = "md",
  className,
  variant = "primary",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  };

  const variantClasses = {
    primary: "border-primary border-t-transparent",
    secondary: "border-gray-300 border-t-gray-600",
    gradient:
      "border-[rgba(255,255,255,0.1)] border-t-[conic-gradient(from_0deg,#f69898,#f5deb3,#aaf0d1,#a8c0f0,#f69898)]",
  };

  return (
    <div className="flex items-center justify-center py-4">
      <div
        className={cn(
          "animate-spin rounded-full",
          sizeClasses[size],
          variantClasses[variant],
          className,
        )}
      />
    </div>
  );
}
