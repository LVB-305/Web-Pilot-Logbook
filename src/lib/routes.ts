import {
  BookOpen,
  BarChartIcon as ChartSpline,
  Code,
  FileBadge,
  Map,
  Plane,
  TowerControl,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navigation: NavSection[] = [
  {
    title: "Main",
    items: [
      {
        title: "Logbook",
        href: "/app/logbook",
        icon: BookOpen,
      },
      {
        title: "Crew",
        href: "/app/crew",
        icon: Users,
      },
      {
        title: "Fleet",
        href: "/app/fleet",
        icon: Plane,
      },
      {
        title: "Airports",
        href: "/app/",
        icon: TowerControl,
      },
      {
        title: "Dev: Logbook Table",
        href: "/dev",
        icon: Code,
      },
    ],
  },
  {
    title: "Tools",
    items: [
      {
        title: "Statistics",
        href: "/statistics",
        icon: ChartSpline,
      },
      {
        title: "Map",
        href: "/app/map",
        icon: Map,
      },
      {
        title: "Qualifications",
        href: "/app/qualifications",
        icon: FileBadge,
      },
    ],
  },
];
