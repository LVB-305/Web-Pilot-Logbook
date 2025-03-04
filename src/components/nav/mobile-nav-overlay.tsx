"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plane, Plus } from "lucide-react";
import { navigation } from "@/lib/routes";

interface MobileNavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNavOverlay({ isOpen, onClose }: MobileNavOverlayProps) {
  const router = useRouter();

  // Prevent scrolling when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNavigation = (href: string) => {
    router.push(href);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-white mr-3">
            <Plane className="size-4" />
          </div>
          <h1 className="text-xl font-medium">Web Pilot Logbook</h1>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {navigation.map((section) => (
          <div key={section.title} className="mb-6">
            <h2 className="text-sm font-semibold text-gray-500 mb-2">
              {section.title}
            </h2>
            <div className="space-y-1">
              {section.items.map((item) => (
                <button
                  key={item.title}
                  className="flex items-center w-full p-3 rounded-md hover:bg-gray-100"
                  onClick={() => handleNavigation(item.href)}
                >
                  <item.icon className="h-5 w-5 mr-3 text-blue-600" />
                  <span className="font-medium">{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <Button
          className="w-full bg-blue-600 text-white hover:bg-orange-600"
          onClick={() => handleNavigation("/flights/new")}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Flight
        </Button>
      </div>
    </div>
  );
}
