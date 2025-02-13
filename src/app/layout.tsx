"use client";

import "@/styles/globals.css";
import { useState, useEffect } from "react";
import { TopBanner } from "@/components/top-banner";
import { SideNav } from "@/components/side-nav";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const isTablet = useMediaQuery("(min-width: 768px)");
  const router = useRouter();

  useEffect(() => {
    setIsNavCollapsed(!isTablet);
  }, [isTablet]);

  // useEffect(() => {
  //   router.push("/");
  // }, [router]);

  return (
    <html lang="en">
      <body className="bg-gray-100">
        <div className="min-h-screen">
          <TopBanner
            onToggleNav={() => setIsNavCollapsed(!isNavCollapsed)}
            isNavCollapsed={isNavCollapsed}
          />
          <div className="flex">
            <SideNav isCollapsed={isNavCollapsed} className="border-r" />
            <main
              className={cn(
                "flex-1 p-6 transition-all duration-300 ease-in-out",
                isNavCollapsed ? "ml-0" : "md:ml-64 lg:ml-72"
              )}
            >
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
