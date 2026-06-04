import React from 'react';
import { motion } from 'motion/react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { BrainCircuit, TrendingUp, TrendingDown, Layers } from 'lucide-react';
import { MOCK_DATA } from '../mock-data';
import { KPICard } from '../components/KPICard';

export function PredictiveAnalytics() {
  const pastData = MOCK_DATA.timeline.slice(-6);
  // generate 3 months of prediction
  const lastMonth = new Date(pastData[pastData.length - 1].date + ' 1 2026'); // approximation
  
  const predictiveData = [
    ...pastData.map(d => ({ ...d, type: 'Historical', predictedCommits: undefined })),
    { date: 'Jul', type: 'Forecast', commits: undefined, predictedCommits: 380, lower: 340, upper: 420 },
    { date: 'Aug', type: 'Forecast', commits: undefined, predictedCommits: 410, lower: 350, upper: 470 },
    { date: 'Sep', type: 'Forecast', commits: undefined, predictedCommits: 450, lower: 370, upper: 530 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Predictive Analytics</h1>
          <p className="text-muted-foreground mt-1">Machine-learning forecasts for sprint velocity and velocity.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPICard 
          title="30-Day Commit Forecast" 
          value="450" 
          trend={8.5} 
          icon={<TrendingUp className="w-4 h-4" />} 
          subtitle="Expected peak in September"
        />
        <KPICard 
          title="Sprint Delay Probability" 
          value="18%" 
          trend={-2.4} 
          icon={<TrendingDown className="w-4 h-4 text-emerald-400" />} 
          subtitle="Lower risk than last sprint"
        />
        <KPICard 
          title="Predicted Bottleneck" 
          value="Code Review" 
          trend={0} 
          icon={<Layers className="w-4 h-4" />} 
          subtitle="Frontend monorepo"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 rounded-xl flex flex-col min-h-[450px]"
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-indigo-400" />
              Commit Velocity Forecast
            </h3>
            <p className="text-sm text-muted-foreground">Historical data vs AI predicted future sprint volume (with confidence intervals).</p>
          </div>
          <div className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
            92% Model Confidence
          </div>
        </div>
        <div className="flex-1 min-h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={predictiveData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3f3f46" />
              <XAxis dataKey="date" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#e4e4e7' }}
              />
              <Legend />
              <Bar dataKey="commits" name="Historical Commits" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Line type="monotone" dataKey="predictedCommits" name="Forecast" stroke="#10b981" strokeWidth={3} strokeDasharray="5 5" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
