"use client";
import type React from "react";
import { SidebarProvider, useSidebar } from "../context/contextAdmin";
import AdminSidebar from "../components/navbar/AdminSidebar";

// This component will dynamically adjust based on sidebar state
function MainContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <main
      className={`transition-all duration-300 p-4 md:p-8 pt-16 md:pt-8 ${
        isCollapsed ? "md:ml-16" : "md:ml-64"
      }`}
    >
      {children}
    </main>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-100">
        <AdminSidebar />
        <MainContent>{children}</MainContent>
      </div>
    </SidebarProvider>
  );
}
