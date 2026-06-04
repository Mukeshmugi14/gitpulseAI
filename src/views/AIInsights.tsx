import React from 'react';
import { motion } from 'motion/react';
import { MOCK_DATA } from '../mock-data';
import { Sparkles, AlertCircle, Info, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

export function AIInsights() {
  const { insights } = MOCK_DATA;

  const getIcon = (type: string) => {
    switch(type) {
      case 'warning': return <AlertCircle className="w-5 h-5 text-rose-400" />;
      case 'success': return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      default: return <Info className="w-5 h-5 text-indigo-400" />;
    }
  };

  const getBgStyle = (type: string) => {
    switch(type) {
      case 'warning': return 'bg-rose-500/5 border-rose-500/20';
      case 'success': return 'bg-emerald-500/5 border-emerald-500/20';
      default: return 'bg-indigo-500/5 border-indigo-500/20';
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Insights</h1>
          <p className="text-muted-foreground mt-1">Machine intelligence applied to your engineering data.</p>
        </div>
        <div className="bg-indigo-500/20 p-3 rounded-xl border border-indigo-500/30">
          <Sparkles className="w-6 h-6 text-indigo-400" />
        </div>
      </div>

      <div className="space-y-4 pt-4">
        {insights.map((insight, idx) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={cn("p-5 border rounded-xl flex gap-4 items-start", getBgStyle(insight.type))}
          >
            <div className="mt-0.5 p-2 bg-background rounded-lg shadow-sm border border-border">
              {getIcon(insight.type)}
            </div>
            <div>
              <div className="font-semibold capitalize mb-1 text-sm text-muted-foreground">
                {insight.type === 'info' ? 'Suggestion' : insight.type}
              </div>
              <p className="text-foreground leading-relaxed text-sm md:text-base">
                {insight.text}
              </p>
              
              <div className="mt-4 flex gap-3">
                <button className="text-xs font-semibold px-3 py-1.5 bg-muted hover:bg-white/10 transition-colors rounded-md border border-border">
                  View Data
                </button>
                <button className="text-xs font-semibold px-3 py-1.5 focus:outline-none text-muted-foreground hover:text-white transition-colors">
                  Dismiss
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
