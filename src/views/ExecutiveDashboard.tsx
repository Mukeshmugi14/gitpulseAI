import React from 'react';
import { MOCK_DATA } from '../mock-data';
import { KPICard } from '../components/KPICard';
import { Users, GitCommit, GitPullRequest, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';

export function ExecutiveDashboard() {
  const { timeline, developers, repositories } = MOCK_DATA;
  
  const totalCommits = timeline.reduce((acc, curr) => acc + curr.commits, 0);
  const avgHealth = Math.round(repositories.reduce((acc, curr) => acc + curr.healthScore, 0) / repositories.length);
  const activePRs = repositories.reduce((acc, curr) => acc + curr.openPRs, 0);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Executive Dashboard</h1>
          <p className="text-muted-foreground mt-1">Platform overview and engineering health at a glance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard 
          title="Active Developers" 
          value={developers.length} 
          trend={4.2} 
          icon={<Users className="w-4 h-4" />} 
          subtitle="Across 5 active teams"
        />
        <KPICard 
          title="Total Commits (YTD)" 
          value={totalCommits.toLocaleString()} 
          trend={12.5} 
          icon={<GitCommit className="w-4 h-4" />} 
          subtitle="Up from last year"
        />
        <KPICard 
          title="Open Pull Requests" 
          value={activePRs} 
          trend={-2.1} 
          icon={<GitPullRequest className="w-4 h-4" />} 
          subtitle="Pending reviews"
        />
        <KPICard 
          title="Avg Repository Health" 
          value={`${avgHealth}/100`} 
          trend={1.2} 
          icon={<Activity className="w-4 h-4" />} 
          subtitle="Based on static analysis"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 glass-panel p-6 rounded-xl flex flex-col min-h-[400px]"
        >
          <div className="mb-4">
            <h3 className="font-semibold text-lg">Productivity Trends</h3>
            <p className="text-sm text-muted-foreground">Monthly commit and PR volume.</p>
          </div>
          <div className="flex-1 min-h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3f3f46" />
                <XAxis dataKey="date" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#e4e4e7' }}
                />
                <Area type="monotone" dataKey="commits" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorCommits)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-6 rounded-xl flex flex-col"
        >
          <div className="mb-4">
             <h3 className="font-semibold text-lg">Critical Repositories</h3>
             <p className="text-sm text-muted-foreground">Identified by high tech debt.</p>
          </div>
          <div className="space-y-4 flex-1 overflow-y-auto pr-2">
            {repositories.slice(0, 5).map(repo => (
              <div key={repo.id} className="flex flex-col gap-1.5 p-3 rounded-lg bg-background border border-border">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm truncate">{repo.name}</span>
                  <span className="text-xs font-mono text-rose-400 bg-rose-400/10 px-2 rounded-full">Score: {repo.healthScore}</span>
                </div>
                <div className="w-full bg-neutral-800 rounded-full h-1.5">
                  <div 
                    className="bg-indigo-500 h-1.5 rounded-full" 
                    style={{ width: `${repo.healthScore}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
