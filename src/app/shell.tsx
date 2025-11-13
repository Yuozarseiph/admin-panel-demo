//app/shell.tsx
"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative flex h-dvh">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex flex-1 flex-col">
        <header className="sticky max-w-full top-0 z-20 h-14 border-b border-gray-200 bg-white/70 backdrop-blur dark:border-gray-800 dark:bg-gray-900/70">
          <div className="flex max-w-full h-full items-center px-4">
            <Header onMenuToggle={() => setSidebarOpen((v) => !v)} />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-2 sm:p-4">{children}</main>
      </div>
    </div>
  );
}
