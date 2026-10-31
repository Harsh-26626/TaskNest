import React from "react";
import { Search, Plus, User } from "lucide-react";

export default function Header({ search, onSearch, onNew }) {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/95 backdrop-blur-xl h-16 border-b border-outline-variant/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-full flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-primary tracking-tight">TaskNest</span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search tasks..."
              className="w-64 bg-surface-container rounded-lg border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary pl-9 pr-4 py-1.5 text-sm text-on-surface placeholder:text-outline"
            />
          </div>

          <button
            onClick={() => onNew?.("todo")}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary-container text-on-primary-container text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New</span>
          </button>

          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
}
