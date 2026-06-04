export interface Developer {
  id: string;
  name: string;
  avatar: string;
  team: string;
  productivityScore: number;
  reviewEfficiency: number;
  commitsCount: number;
  burnoutRisk: 'Low' | 'Medium' | 'High';
}

export interface Repository {
  id: string;
  name: string;
  healthScore: number;
  techDebtScore: number;
  openPRs: number;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface TimelineDataPoint {
  date: string;
  commits: number;
  prs: number;
  bugs: number;
}

export interface AIInsight {
  id: string;
  text: string;
  type: 'warning' | 'info' | 'success';
}

export interface AppMockData {
  developers: Developer[];
  repositories: Repository[];
  timeline: TimelineDataPoint[];
  insights: AIInsight[];
}
