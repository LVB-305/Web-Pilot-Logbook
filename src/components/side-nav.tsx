"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type React from "react";
import {
  BookOpen,
  Box,
  Code,
  FileText,
  Layout,
  List,
  Share2,
  ShieldCheck,
  Smartphone,
  Zap,
  HelpCircle,
  Users,
  BookOpenCheck,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navigation: NavSection[] = [
  {
    title: "Pilot Tools",
    items: [
      {
        title: "Logbook",
        href: "/logbook",
        icon: <BookOpenCheck className="h-4 w-4" />,
      },
      {
        title: "Contacts",
        href: "/contacts",
        icon: <Users className="h-4 w-4" />,
      },
      {
        title: "Dev: Logbook Table",
        href: "/dev",
        icon: <Code className="h-4 w-4" />,
      },
    ],
  },
  {
    title: "Getting Started",
    items: [
      {
        title: "Introduction",
        href: "/docs/introduction",
        icon: <BookOpen className="h-4 w-4" />,
      },
      {
        title: "Installation",
        href: "/docs/installation",
        icon: <Box className="h-4 w-4" />,
      },
      {
        title: "Architecture",
        href: "/docs/architecture",
        icon: <Layout className="h-4 w-4" />,
      },
      {
        title: "Best Practices",
        href: "/docs/best-practices",
        icon: <Zap className="h-4 w-4" />,
      },
    ],
  },
  {
    title: "Components",
    items: [
      {
        title: "Buttons",
        href: "/docs/components/buttons",
        icon: <Smartphone className="h-4 w-4" />,
      },
      {
        title: "Forms",
        href: "/docs/components/forms",
        icon: <FileText className="h-4 w-4" />,
      },
      {
        title: "Layout",
        href: "/docs/components/layout",
        icon: <Layout className="h-4 w-4" />,
      },
      {
        title: "Navigation",
        href: "/docs/components/navigation",
        icon: <List className="h-4 w-4" />,
      },
    ],
  },
  {
    title: "Resources",
    items: [
      {
        title: "Examples",
        href: "/docs/resources/examples",
        icon: <Code className="h-4 w-4" />,
      },
      {
        title: "Guidelines",
        href: "/docs/resources/guidelines",
        icon: <ShieldCheck className="h-4 w-4" />,
      },
      {
        title: "Templates",
        href: "/docs/resources/templates",
        icon: <Share2 className="h-4 w-4" />,
      },
      {
        title: "Support",
        href: "/docs/resources/support",
        icon: <HelpCircle className="h-4 w-4" />,
      },
    ],
  },
];

export function SideNav({
  className,
  isCollapsed,
}: {
  className?: string;
  isCollapsed: boolean;
}) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex flex-col gap-6 py-4 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-0 px-0" : "w-full md:w-64 lg:w-72 px-6",
        "fixed top-14 bottom-0 left-0 z-40 bg-background",
        isCollapsed ? "translate-x-[-100%]" : "translate-x-0",
        "overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100",
        className
      )}
    >
      {navigation.map((section) => (
        <div key={section.title} className="flex flex-col gap-1">
          <h2 className="text-sm font-semibold text-foreground mb-2">
            {section.title}
          </h2>
          <div className="flex flex-col gap-1">
            {section.items.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className="justify-start w-full text-sm font-normal px-2 py-1"
                asChild
              >
                <Link href={item.href}>
                  <span className="mr-2">{item.icon}</span>
                  {item.title}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}
