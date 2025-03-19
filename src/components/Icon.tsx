
import React from "react";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  className,
  ...props
}) => {
  const LucideIcon = LucideIcons[name as keyof typeof LucideIcons] as React.FC<
    LucideIcons.LucideProps
  >;

  if (!LucideIcon) {
    return <div className={cn("w-6 h-6", className)} {...props} />;
  }

  return (
    <div className={cn("flex items-center justify-center", className)} {...props}>
      <LucideIcon size={size} />
    </div>
  );
};
