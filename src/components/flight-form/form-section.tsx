"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronDown, Edit2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  rightIcon?: React.ReactNode;
  className?: string;
  onEditFields?: () => void;
  showEditFields?: boolean;
}

export function FormSection({
  title,
  children,
  collapsible = false,
  defaultOpen = true,
  rightIcon,
  className,
  onEditFields,
  showEditFields = false,
}: FormSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Card className={cn("rounded-none shadow-none", className)}>
      <CardHeader
        className={cn("bg-gray-100 px-4 py-3", collapsible && "cursor-pointer")}
        onClick={collapsible ? () => setIsOpen(!isOpen) : undefined}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">{title}</h2>
          <div className="flex items-center gap-2">
            {showEditFields && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditFields?.();
                }}
              >
                <Edit2 className="h-4 w-4 text-orange-500" />
              </Button>
            )}
            {rightIcon}
            {collapsible && (
              <ChevronDown
                className={cn(
                  "h-5 w-5 text-orange-500 transition-transform",
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
