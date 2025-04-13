"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Settings, Code, Database, Server } from "lucide-react";

const projectNavItems = [
  { name: "Overview", href: "overview", icon: Server },
  { name: "Deployments", href: "deployments", icon: Code },
  { name: "Database", href: "database", icon: Database },
  { name: "Settings", href: "settings", icon: Settings },
];

export function ProjectNav() {
  const pathname = usePathname();
  const { project } = useParams();

  return (
    <nav className="flex flex-col items-start space-y-2 px-2 py-4">
      {projectNavItems.map((item, i) => (
        <motion.div
          key={item.href}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="w-full"
        >
          <Link
            href={`/dashboard/${project}/${item.href}`}
            className={cn(
              "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent",
              pathname.includes(item.href) ? "bg-accent" : "transparent",
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.name}
          </Link>
        </motion.div>
      ))}
    </nav>
  );
}
