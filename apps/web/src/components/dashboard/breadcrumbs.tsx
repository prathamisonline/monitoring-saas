"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean); 

  return (
    <nav className="flex items-center space-x-2 text-sm">
      <Link href="/" className="text-muted-foreground hover:text-foreground">
        Home
      </Link>

      {paths.map((path, i) => (
        <motion.div
          key={path}
          className="flex items-center"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" />
          <Link
            href={`/${paths.slice(0, i + 1).join("/")}`}
            className={`${i === paths.length - 1 ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
          >
            {path}
          </Link>
        </motion.div>
      ))}
    </nav>
  );
}
