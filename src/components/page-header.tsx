"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MobileNavOverlay } from "./nav/mobile-nav-overlay";

interface PageHeaderProps {
  title: string;
  backHref?: string;
  showBackButton?: boolean;
  isTopLevelPage?: boolean;
  onBackClick?: () => void;
  actionButton?: React.ReactNode;
}

export function PageHeader({
  title,
  backHref = "/app/logbook",
  showBackButton = true,
  isTopLevelPage = false,
  onBackClick,
  actionButton,
}: PageHeaderProps) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [navOverlayOpen, setNavOverlayOpen] = useState(false);

  // Detect mobile devices
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint in Tailwind
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      router.back();
    }
  };

  return (
    <>
      <header className="flex items-center justify-between p-4 border-b">
        {showBackButton ? (
          isMobile ? (
            <Button
              variant="ghost"
              size="icon"
              className="text-blue-600"
              onClick={() => setNavOverlayOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          ) : isTopLevelPage ? (
            // Spacer for top level pages with no return
            <div className="w-10" />
          ) : backHref ? (
            <Button
              variant="ghost"
              size="icon"
              className="text-blue-600"
              asChild
            >
              <Link href={backHref}>
                <ChevronLeft className="h-6 w-6" />
              </Link>
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="text-blue-600"
              onClick={handleBackClick}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          )
        ) : (
          // Spacer for no return
          <div className="w-10" />
        )}
        {!showBackButton && <div className="w-10" />}{" "}
        {/* Spacer when no back button */}
        <h1 className="text-xl font-medium">{title}</h1>
        {actionButton ? (
          actionButton
        ) : (
          <div className="w-10" /> /* Spacer when no action button */
        )}
      </header>

      <MobileNavOverlay
        isOpen={navOverlayOpen}
        onClose={() => setNavOverlayOpen(false)}
      />
    </>
  );
}
