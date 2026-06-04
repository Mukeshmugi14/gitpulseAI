import { Developer, Repository, TimelineDataPoint, AIInsight } from './types';

function generateRandomString(length: number): string {
  return Math.random().toString(36).substring(2, length + 2);
}

const TEAMS = ['Core API', 'Frontend', 'Platform', 'Security', 'Data Science'];

export const generateDevelopers = (count: number): Developer[] => {
  const firstNames = ['Sarah', 'John', 'Alex', 'Mike', 'Emily', 'Chris', 'Katie', 'David', 'Laura', 'James', 'Nina', 'Mark', 'Sophie'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  
  return Array.from({ length: count }).map((_, i) => {
    const pScore = 40 + Math.random() * 60; // 40-100
    let burnout: 'Low' | 'Medium' | 'High' = 'Low';
    if (pScore > 90) burnout = Math.random() > 0.5 ? 'High' : 'Medium';
    else if (pScore > 80) burnout = 'Medium';

    return {
      id: `dev-${i}`,
      name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
      avatar: `https://i.pravatar.cc/150?u=${generateRandomString(6)}`,
      team: TEAMS[Math.floor(Math.random() * TEAMS.length)],
      productivityScore: Math.floor(pScore),
      reviewEfficiency: Math.floor(50 + Math.random() * 50),
      commitsCount: Math.floor(10 + Math.random() * 500),
      burnoutRisk: burnout,
    };
  });
};

export const generateRepositories = (count: number): Repository[] => {
  const names = ['api-gateway', 'frontend-monorepo', 'auth-service', 'payment-processor', 'data-pipeline', 'ml-models', 'infrastructure-as-code', 'docs-site', 'user-service', 'notification-engine'];
  
  return Array.from({ length: count }).map((_, i) => {
    const health = 50 + Math.random() * 50;
    let risk: 'Low' | 'Medium' | 'High' = 'Low';
    if (health < 65) risk = 'High';
    else if (health < 80) risk = 'Medium';

    return {
      id: `repo-${i}`,
      name: names[i] || `repo-${generateRandomString(4)}`,
      healthScore: Math.floor(health),
      techDebtScore: Math.floor(Math.random() * 100),
      openPRs: Math.floor(Math.random() * 25),
      riskLevel: risk,
    };
  });
};

export const generateTimeline = (months: number): TimelineDataPoint[] => {
  const data: TimelineDataPoint[] = [];
  const now = new Date();
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    data.push({
      date: date.toLocaleString('default', { month: 'short' }),
      commits: Math.floor(300 + Math.random() * 200),
      prs: Math.floor(50 + Math.random() * 50),
      bugs: Math.floor(10 + Math.random() * 30),
    });
  }
  return data;
};

export const mockInsights: AIInsight[] = [
  { id: '1', text: 'Productivity dropped 14% this week due to increased review delays in frontend-monorepo.', type: 'warning' },
  { id: '2', text: 'Sarah Smith may be overloaded. Her commit volume is up 40% but review efficiency dropped.', type: 'warning' },
  { id: '3', text: 'Sprint 42 completion probability is 82%. On track to deliver core MVP features.', type: 'success' },
  { id: '4', text: 'Repository api-gateway shows rising technical debt. Consider allocating 15% of next sprint to refactoring.', type: 'info' }
];

export const MOCK_DATA = {
  developers: generateDevelopers(50).sort((a, b) => b.productivityScore - a.productivityScore),
  repositories: generateRepositories(10).sort((a, b) => b.healthScore - a.healthScore),
  timeline: generateTimeline(12),
  insights: mockInsights,
};
