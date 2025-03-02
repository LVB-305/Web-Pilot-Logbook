import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BookOpen,
  BookOpenCheck,
  Box,
  Code,
  FileText,
  HelpCircle,
  Layout,
  List,
  LucideIcon,
  Share2,
  ShieldCheck,
  Smartphone,
  Users,
  Zap,
} from "lucide-react";
import { usePathname } from "next/navigation";

interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
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
        icon: BookOpenCheck,
      },
      {
        title: "Contacts",
        href: "/contacts",
        icon: Users,
      },
      {
        title: "Dev: Logbook Table",
        href: "/dev",
        icon: Code,
      },
    ],
  },
  {
    title: "Getting Started",
    items: [
      {
        title: "Introduction",
        href: "/docs/introduction",
        icon: BookOpen,
      },
      {
        title: "Installation",
        href: "/docs/installation",
        icon: Box,
      },
      {
        title: "Architecture",
        href: "/docs/architecture",
        icon: Layout,
      },
      {
        title: "Best Practices",
        href: "/docs/best-practices",
        icon: Zap,
      },
    ],
  },
  {
    title: "Components",
    items: [
      {
        title: "Buttons",
        href: "/docs/components/buttons",
        icon: Smartphone,
      },
      {
        title: "Forms",
        href: "/docs/components/forms",
        icon: FileText,
      },
      {
        title: "Layout",
        href: "/docs/components/layout",
        icon: Layout,
      },
      {
        title: "Navigation",
        href: "/docs/components/navigation",
        icon: List,
      },
    ],
  },
  {
    title: "Resources",
    items: [
      {
        title: "Examples",
        href: "/docs/resources/examples",
        icon: Code,
      },
      {
        title: "Guidelines",
        href: "/docs/resources/guidelines",
        icon: ShieldCheck,
      },
      {
        title: "Templates",
        href: "/docs/resources/templates",
        icon: Share2,
      },
      {
        title: "Support",
        href: "/docs/resources/support",
        icon: HelpCircle,
      },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      className="mt-14 transition-all duration-200 ease-in-out"
      side="left"
    >
      <SidebarContent>
        {navigation.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel className="text-sm font-semibold text-foreground mb-2">
              {section.title}
            </SidebarGroupLabel>
            <SidebarMenu>
              {section.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className="justify-start w-full text-sm font-normal px-2 py-1"
                  >
                    <a href={item.href}>
                      <item.icon className="h-4 w-4 mr-2" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
