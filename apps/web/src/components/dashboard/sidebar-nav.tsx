// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { motion } from "framer-motion";
// import { cn } from "@/lib/utils";
// import { Home, Folder, Settings, Plus } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const navItems = [
// //   { name: "Overview", href: "/dashboard", icon: Home },
//   { name: "Projects", href: "/dashboard/projects", icon: Folder },
//   { name: "Settings", href: "/dashboard/settings", icon: Settings },
// ];

// export function SidebarNav() {
//   const pathname = usePathname();

//   return (
//     <nav className="flex justify-between widt-full space-y-2 px-2 py-4">
//       <div className="flex ">
//         {navItems.map((item, i) => (
//           <motion.div
//             key={item.href}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: i * 0.1 }}
//             className="w-full  "
//           >
//             <Link
//               href={item.href}
//               className={cn(
//                 "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent",
//                 pathname === item.href ? "bg-accent" : "transparent",
//               )}
//             >
//               <item.icon className="mr-2 h-4 w-4" />
//               {item.name}
//             </Link>
//           </motion.div>
//         ))}
//       </div>
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: navItems.length * 0.1 }}
//         className="mr-2 "
//       >
//         <Button className="w-[150px]" variant="outline">
//           <Plus className="mr-2 h-4 w-4" />
//           New Project
//         </Button>
//       </motion.div>
//     </nav>
//   );
// }
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Home, Folder, Settings, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";

const navItems = [
//   { name: "Overview", href: "/dashboard", icon: Home },
  { name: "Projects", href: "/dashboard/projects", icon: Folder },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function SidebarNav() {
  const pathname = usePathname();
  const [projectName, setProjectName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle project creation logic here
    console.log("Creating project:", projectName);
    // Reset form
    setProjectName("");
  };

  return (
    <div className="flex items-center justify-between px-2 py-4">
      {/* Navigation Items on the left */}
      <nav className="flex items-start space-x-2">
        {navItems.map((item, i) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              href={item.href}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent",
                pathname === item.href ? "bg-accent" : "transparent",
              )}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* New Project button and drawer */}
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: navItems.length * 0.1 }}
          >
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </motion.div>
        </DrawerTrigger>

        <DrawerContent className="h-screen top-0 right-0 left-auto mt-0 w-[400px] rounded-none bg-background/95 backdrop-blur-sm">
          <div className="mx-auto w-full p-4">
            <DrawerHeader>
              <DrawerTitle>Create New Project</DrawerTitle>
              <DrawerDescription>
                Add details for your new project
              </DrawerDescription>
            </DrawerHeader>

            <form onSubmit={handleSubmit} className="p-4 pb-0">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    placeholder="My Awesome Project"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>

                {/* Add more form fields as needed */}
              </div>

              <DrawerFooter className="px-0">
                <Button type="submit">Create Project</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}