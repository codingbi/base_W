import { create } from 'zustand';
import type { DashboardStats, Project, Budget, Contract, Expense, Risk, Asset, PerformanceMetric } from '../../shared/types';

interface AppState {
  // 状态
  sidebarOpen: boolean;
  activePage: string;
  dashboardStats: DashboardStats | null;
  projects: Project[];
  budgets: Budget[];
  contracts: Contract[];
  expenses: Expense[];
  risks: Risk[];
  assets: Asset[];
  performanceMetrics: PerformanceMetric[];
  loading: boolean;
  
  // 操作
  toggleSidebar: () => void;
  setActivePage: (page: string) => void;
  setDashboardStats: (stats: DashboardStats) => void;
  setProjects: (projects: Project[]) => void;
  setBudgets: (budgets: Budget[]) => void;
  setContracts: (contracts: Contract[]) => void;
  setExpenses: (expenses: Expense[]) => void;
  setRisks: (risks: Risk[]) => void;
  setAssets: (assets: Asset[]) => void;
  setPerformanceMetrics: (metrics: PerformanceMetric[]) => void;
  setLoading: (loading: boolean) => void;
  updateExpenseStatus: (id: string, status: Expense['status']) => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  activePage: 'portal',
  dashboardStats: null,
  projects: [],
  budgets: [],
  contracts: [],
  expenses: [],
  risks: [],
  assets: [],
  performanceMetrics: [],
  loading: false,
  
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setActivePage: (page) => set({ activePage: page }),
  setDashboardStats: (stats) => set({ dashboardStats: stats }),
  setProjects: (projects) => set({ projects }),
  setBudgets: (budgets) => set({ budgets }),
  setContracts: (contracts) => set({ contracts }),
  setExpenses: (expenses) => set({ expenses }),
  setRisks: (risks) => set({ risks }),
  setAssets: (assets) => set({ assets }),
  setPerformanceMetrics: (metrics) => set({ performanceMetrics: metrics }),
  setLoading: (loading) => set({ loading }),
  updateExpenseStatus: (id, status) => set((state) => ({
    expenses: state.expenses.map((expense) =>
      expense.id === id ? { ...expense, status } : expense
    ),
  })),
}));
