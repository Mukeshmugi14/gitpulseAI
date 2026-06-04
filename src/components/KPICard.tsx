import React from 'react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface KPICardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon?: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export function KPICard({ title, value, trend, icon, subtitle, className }: KPICardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("p-5 glass-panel rounded-xl flex flex-col", className)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon && <div className="text-muted-foreground/50">{icon}</div>}
      </div>
      <div className="flex items-baseline space-x-2">
        <h2 className="text-3xl font-semibold tracking-tight">{value}</h2>
        {trend !== undefined && (
          <span className={cn(
            "text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1", 
            trend > 0 ? "text-emerald-400 bg-emerald-400/10" : "text-rose-400 bg-rose-400/10"
          )}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      {subtitle && <p className="text-xs text-muted-foreground mt-2">{subtitle}</p>}
    </motion.div>
  );
}
