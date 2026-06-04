/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ExecutiveDashboard } from './views/ExecutiveDashboard';
import { DeveloperAnalytics } from './views/DeveloperAnalytics';
import { RepositoryHealth } from './views/RepositoryHealth';
import { PredictiveAnalytics } from './views/PredictiveAnalytics';
import { AIInsights } from './views/AIInsights';
import { Bell, Search, UserCircle } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('executive');

  const renderView = () => {
    switch (currentView) {
      case 'executive': return <ExecutiveDashboard />;
      case 'developers': return <DeveloperAnalytics />;
      case 'repositories': return <RepositoryHealth />;
      case 'predictive': return <PredictiveAnalytics />;
      case 'insights': return <AIInsights />;
      default: return <ExecutiveDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-background text-foreground font-sans overflow-hidden">
      <Sidebar currentView={currentView} onNavigate={setCurrentView} />
      
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border bg-background flex items-center justify-between px-6 sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-3 text-muted-foreground w-1/3 min-w-[200px]">
            <Search className="w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search developers, repos, insights..." 
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground/70"
            />
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative text-muted-foreground hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute 0 right-0 w-2 h-2 bg-indigo-500 rounded-full border-2 border-background" />
            </button>
            <div className="flex items-center gap-2 cursor-pointer border-l border-border pl-6">
              <div className="text-sm font-medium hidden sm:block">Demo User</div>
              <UserCircle className="w-8 h-8 text-indigo-400" />
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-6 space-y-6">
          <div className="max-w-7xl mx-auto w-full">
            {renderView()}
          </div>
        </div>

        <footer className="h-10 border-t border-border px-6 flex items-center justify-between text-[10px] text-[#71717a] font-mono shrink-0">
          <div>CONNECTED TO CLUSTER-US-EAST-1 &bull; SYNCED 2M AGO</div>
          <div className="flex space-x-4 uppercase tracking-tighter">
            <span>System Status: <span className="text-emerald-400">Operational</span></span>
            <span>API Response: 42ms</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
