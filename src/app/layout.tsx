"use client";

import "@/styles/globals.css";
import { TopBanner } from "@/components/top-banner";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        {/* <SidebarProvider> */}
        <div className="flex flex-col min-h-screen">
          <TopBanner />
          <div className="w-full">
            {/* <AppSidebar /> */}
            {/* <SidebarInset className="max-w-[calc(100vw-var(--sidebar-width))] peer-data-[state=collapsed]:max-w-[calc(100vw-var(--sidebar-width-icon))]"> */}
            <main>{children}</main>
            {/* </SidebarInset> */}
          </div>
        </div>
        {/* </SidebarProvider> */}
      </body>
    </html>
  );
}
