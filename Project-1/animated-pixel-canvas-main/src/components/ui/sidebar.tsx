
// Import necessary React components
import * as React from "react"
import { cn } from "@/lib/utils"

// Define sidebar component props
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children: React.ReactNode
}

// Main sidebar component
export function Sidebar({ className, children, ...props }: SidebarProps) {
  return (
    <div className={cn("flex flex-col h-full", className)} {...props}>
      {children}
    </div>
  )
}

// Sidebar header component
interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children: React.ReactNode
}

export function SidebarHeader({ className, children, ...props }: SidebarHeaderProps) {
  return (
    <div className={cn("p-4 border-b", className)} {...props}>
      {children}
    </div>
  )
}

// Sidebar content component
interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children: React.ReactNode
}

export function SidebarContent({ className, children, ...props }: SidebarContentProps) {
  return (
    <div className={cn("flex-1 overflow-auto p-4", className)} {...props}>
      {children}
    </div>
  )
}

// Sidebar footer component
interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children: React.ReactNode
}

export function SidebarFooter({ className, children, ...props }: SidebarFooterProps) {
  return (
    <div className={cn("p-4 border-t mt-auto", className)} {...props}>
      {children}
    </div>
  )
}

// Sidebar nav component
interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children: React.ReactNode
}

export function SidebarNav({ className, children, ...props }: SidebarNavProps) {
  return (
    <nav className={cn("grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center", className)} {...props}>
      {children}
    </nav>
  )
}

// Sidebar nav item component
interface SidebarNavItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  className?: string
  children: React.ReactNode
  href: string
  active?: boolean
  icon?: React.ReactNode
}

export function SidebarNavItem({ className, children, href, active, icon, ...props }: SidebarNavItemProps) {
  return (
    <a 
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-accent hover:text-accent-foreground",
        active ? "bg-accent text-accent-foreground" : "transparent",
        className
      )}
      {...props}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      <span>{children}</span>
    </a>
  )
}
