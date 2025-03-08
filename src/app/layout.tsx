"use client";

import "@/styles/globals.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/nav/app-sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="overflow-auto">{children}</SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
