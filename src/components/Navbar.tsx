"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, BarChart2, Layers, Cpu, Search } from "lucide-react";
import { Suspense } from "react";

function NavContent({ onOpenSearch }: { onOpenSearch?: () => void }) {
  const pathname = usePathname();

  const navLinks = [
    { name: "Explore Models", href: "/", icon: Sparkles },
    { name: "Compare", href: "/compare", icon: Layers },
    { name: "Leaderboard", href: "/rankings", icon: BarChart2 },
    { name: "Labs & Providers", href: "/providers", icon: Cpu },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white tracking-tight">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
              ⚡
            </div>
            OneAtlas<span className="text-xs text-cyan-400 font-mono ml-1 px-1.5 py-0.5 rounded border border-cyan-800 bg-cyan-950/40">DEV</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-zinc-800 text-cyan-400"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-900 text-zinc-400 hover:text-white text-sm transition-all"
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Quick search models...</span>
            <kbd className="hidden sm:inline text-xs bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-400">⌘K</kbd>
          </button>
        </div>
      </div>
    </header>
  );
}

export function Navbar({ onOpenSearch }: { onOpenSearch?: () => void }) {
  return (
    <Suspense fallback={
      <header className="h-16 w-full border-b border-zinc-800 bg-zinc-950/80" />
    }>
      <NavContent onOpenSearch={onOpenSearch} />
    </Suspense>
  );
}