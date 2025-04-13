import { SidebarNav } from "@/components/dashboard/sidebar-nav"
import { Breadcrumbs } from "@/components/dashboard/breadcrumbs"
import { FramerMotionWrapper } from "@/components/framer-motion-wrapper"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <FramerMotionWrapper>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-10 border-b bg-background">
          <div className="container flex h-16 items-center justify-between">
            <Breadcrumbs />
            {/* User avatar/controls would go here */}
          </div>
        </header>
        
        <div className="container flex flex-col">
          <aside className="hidden w-full flex-col md:flex">
            <SidebarNav />
          </aside>
          
          <main className="flex w-full flex-1 flex-col overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </FramerMotionWrapper>
  )
}