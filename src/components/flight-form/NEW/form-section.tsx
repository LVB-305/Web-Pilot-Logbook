"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  rightIcon?: React.ReactNode;
  className?: string;
}

export function FormSection({
  title,
  children,
  collapsible = false,
  defaultOpen = true,
  rightIcon,
  className,
}: FormSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    if (collapsible) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <Card className={cn("rounded-md shadow-none", className)}>
      <CardHeader
        className={cn("bg-gray-100 px-4 py-3", collapsible && "cursor-pointer")}
        onClick={handleToggle}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">{title}</h2>
          <div className="flex items-center gap-2">
            {rightIcon}
            {collapsible && (
              <ChevronDown
                className={cn(
                  "h-5 w-5 text-blue-600 transition-transform",
                  isOpen ? "transform rotate-180" : ""
                )}
              />
            )}
          </div>
        </div>
      </CardHeader>
      {(!collapsible || isOpen) && (
        <CardContent className="p-0">
          <div className="divide-y">{children}</div>
        </CardContent>
      )}
    </Card>
  );
}
