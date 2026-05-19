// 通用响应类型
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// 统计数据类型
export interface DashboardStats {
  pendingTasks: number;
  budgetUsed: number;
  projectsActive: number;
  contractsActive: number;
}

// 用户类型
export interface User {
  id: string;
  name: string;
  role: 'admin' | 'manager' | 'staff';
  department: string;
}

// 项目类型
export interface Project {
  id: string;
  name: string;
  department: string;
  budget: number;
  usedBudget: number;
  progress: number;
  status: 'planning' | 'active' | 'completed';
  startDate: string;
  endDate: string;
}

// 预算类型
export interface Budget {
  id: string;
  category: string;
  allocated: number;
  used: number;
  remaining: number;
  period: string;
}

// 合同类型
export interface Contract {
  id: string;
  name: string;
  partyA: string;
  partyB: string;
  amount: number;
  startDate: string;
  endDate: string;
  status: 'draft' | 'active' | 'expired';
}

// 支出类型
export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  applicant: string;
}

// 风险类型
export interface Risk {
  id: string;
  title: string;
  level: 'low' | 'medium' | 'high';
  category: string;
  description: string;
  status: 'identified' | 'mitigating' | 'resolved';
}

// 资产类型
export interface Asset {
  id: string;
  name: string;
  type: string;
  value: number;
  purchaseDate: string;
  status: 'available' | 'in_use' | 'maintenance';
  department: string;
}

// 绩效指标类型
export interface PerformanceMetric {
  id: string;
  name: string;
  target: number;
  current: number;
  unit: string;
  period: string;
}

// 数据存储类型
export interface DataStore {
  users: User[];
  projects: Project[];
  budgets: Budget[];
  contracts: Contract[];
  expenses: Expense[];
  risks: Risk[];
  assets: Asset[];
  performanceMetrics: PerformanceMetric[];
}
