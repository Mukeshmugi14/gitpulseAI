import React from 'react';
import { MOCK_DATA } from '../mock-data';
import { motion } from 'motion/react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts';
import { cn } from '../lib/utils';

export function DeveloperAnalytics() {
  const { developers } = MOCK_DATA;
  
  // Format data for bubble chart
  const scatterData = developers.map(dev => ({
    name: dev.name,
    productivity: dev.productivityScore,
    efficiency: dev.reviewEfficiency,
    commits: dev.commitsCount,
    burnout: dev.burnoutRisk
  }));

  const getBurnoutColor = (risk: string) => {
    if (risk === 'High') return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
    if (risk === 'Medium') return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
    return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Developer Analytics</h1>
          <p className="text-muted-foreground mt-1">Deep dive into team performance and workload balance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6 rounded-xl min-h-[400px] flex flex-col"
        >
          <div className="mb-4">
            <h3 className="font-semibold text-lg">Productivity vs Review Efficiency</h3>
            <p className="text-sm text-muted-foreground">Bubble size represents commit volume.</p>
          </div>
          <div className="flex-1 min-h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid stroke="#3f3f46" strokeDasharray="3 3"/>
                <XAxis type="number" dataKey="productivity" name="Productivity" unit=" pts" stroke="#a1a1aa" domain={[30, 100]} />
                <YAxis type="number" dataKey="efficiency" name="Efficiency" unit="%" stroke="#a1a1aa" domain={[40, 100]} />
                <ZAxis type="number" dataKey="commits" range={[50, 400]} name="Commits" />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#e4e4e7' }}
                />
                <Scatter name="Developers" data={scatterData} fill="#8b5cf6" fillOpacity={0.6} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-6 rounded-xl flex flex-col overflow-hidden max-h-[500px]"
        >
          <div className="mb-4">
            <h3 className="font-semibold text-lg">Developer Leaderboard</h3>
            <p className="text-sm text-muted-foreground">Top performers by productivity score.</p>
          </div>
          
          <div className="overflow-y-auto space-y-3 pr-2 flex-1">
            {developers.slice(0, 10).map((dev, idx) => (
              <div key={dev.id} className="flex items-center justify-between p-3 rounded-lg border border-border bg-background hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-medium text-muted-foreground w-4">{idx + 1}</div>
                  <img src={dev.avatar} alt={dev.name} className="w-8 h-8 rounded-full bg-neutral-800" />
                  <div>
                    <div className="font-medium text-sm">{dev.name}</div>
                    <div className="text-xs text-muted-foreground">{dev.team}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-semibold">{dev.productivityScore}</div>
                    <div className="text-xs text-muted-foreground">Score</div>
                  </div>
                  <div className={cn("text-[10px] px-2 py-1 rounded-full border uppercase tracking-wider font-semibold", getBurnoutColor(dev.burnoutRisk))}>
                    {dev.burnoutRisk} RISK
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
