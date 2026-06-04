import React from 'react';
import { LayoutDashboard, Users, GitBranch, Lightbulb, TrendingUp, Settings } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

const NAV_MAP = [
  { id: 'executive', label: 'Executive Dashboard', icon: LayoutDashboard },
  { id: 'developers', label: 'Developer Analytics', icon: Users },
  { id: 'repositories', label: 'Repository Health', icon: GitBranch },
  { id: 'predictive', label: 'Predictive Analytics', icon: TrendingUp },
  { id: 'insights', label: 'AI Insights', icon: Lightbulb },
];

export function Sidebar({ currentView, onNavigate }: SidebarProps) {
  return (
    <aside className="w-60 flex-shrink-0 border-r border-border bg-background flex flex-col p-4 space-y-8 h-screen sticky top-0 z-20">
      <div className="flex items-center space-x-3 px-2">
        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white shadow-sm">
          <GitBranch className="h-4 w-4 text-white" />
        </div>
        <div>
          <span className="text-lg font-semibold tracking-tight text-white">GitPulse AI</span>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1">
        {NAV_MAP.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={cn(
              "flex items-center space-x-3 px-3 py-2 w-full rounded-md text-sm font-medium transition-colors appearance-none",
              currentView === item.id 
                ? "bg-muted text-white" 
                : "text-muted-foreground hover:bg-muted hover:text-white"
            )}
          >
            <item.icon className={cn("h-4 w-4", currentView === item.id ? "text-indigo-400 opacity-100" : "opacity-70")} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="p-3 bg-muted rounded-xl border border-border">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-2">Project Context</div>
        <div className="text-xs text-foreground font-medium">Project Alpha &bull; v2.4.0</div>
        <div className="mt-2 h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-500 w-[82%]"></div>
        </div>
      </div>
    </aside>
  );
}
