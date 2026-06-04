import React from 'react';
import { MOCK_DATA } from '../mock-data';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export function RepositoryHealth() {
  const { repositories } = MOCK_DATA;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Repository Health</h1>
          <p className="text-muted-foreground mt-1">Codebase quality, tech debt, and risk assessments.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6 rounded-xl flex flex-col min-h-[400px]"
        >
          <div className="mb-4">
            <h3 className="font-semibold text-lg">Tech Debt vs Health Score</h3>
          </div>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={repositories.slice(0, 8)} margin={{ top: 20, right: 30, left: -10, bottom: 5 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#3f3f46" />
                <XAxis type="number" stroke="#a1a1aa" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="#a1a1aa" fontSize={12} width={100} />
                <Tooltip 
                  cursor={{fill: '#27272a', opacity: 0.4}}
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#e4e4e7' }}
                />
                <Legend iconType="circle" />
                <Bar dataKey="healthScore" name="Health Score" fill="#10b981" radius={[0, 4, 4, 0]} barSize={12} />
                <Bar dataKey="techDebtScore" name="Tech Debt Score" fill="#f43f5e" radius={[0, 4, 4, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="glass-panel p-4 rounded-xl flex items-center gap-4">
              <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-lg">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">{repositories.filter(r => r.riskLevel === 'Low').length}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mt-1">Healthy Repos</div>
              </div>
            </div>
            
            <div className="glass-panel p-4 rounded-xl flex items-center gap-4">
              <div className="p-3 bg-rose-500/10 text-rose-500 rounded-lg">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">{repositories.filter(r => r.riskLevel === 'High').length}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mt-1">Critical Risk</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel rounded-xl overflow-hidden"
          >
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-background text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-4 py-3 font-semibold">Repository</th>
                  <th className="px-4 py-3 font-semibold">Open PRs</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {repositories.map((repo, i) => (
                  <tr key={repo.id} className="border-b border-border hover:bg-muted transition-colors">
                    <td className="px-4 py-3 font-medium flex items-center gap-2">
                       {repo.name}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {repo.openPRs} pending
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full border ${
                        repo.riskLevel === 'Low' ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' : 
                        repo.riskLevel === 'High' ? 'text-rose-400 bg-rose-400/10 border-rose-400/20' : 
                        'text-amber-400 bg-amber-400/10 border-amber-400/20'
                      }`}>
                        {repo.riskLevel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
