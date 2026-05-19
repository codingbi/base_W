import { create } from 'zustand';
import type { DashboardStats, Project, ProjectType, Budget, IncomeBudget, Contract, ContractTemplate, Expense, Risk, Asset, PerformanceMetric, PurchaseType, PurchaseIntention, PurchaseApplication, Account, IncomeRecord, PreApplication, PerformanceEvaluation } from '../../shared/types';

interface AppState {
  sidebarOpen: boolean;
  activePage: string;
  dashboardStats: DashboardStats | null;
  projects: Project[];
  projectTypes: ProjectType[];
  budgets: Budget[];
  incomeBudgets: IncomeBudget[];
  contracts: Contract[];
  contractTemplates: ContractTemplate[];
  expenses: Expense[];
  risks: Risk[];
  assets: Asset[];
  performanceMetrics: PerformanceMetric[];
  purchaseTypes: PurchaseType[];
  purchaseIntentions: PurchaseIntention[];
  purchaseApplications: PurchaseApplication[];
  accounts: Account[];
  incomeRecords: IncomeRecord[];
  preApplications: PreApplication[];
  performanceEvaluations: PerformanceEvaluation[];
  loading: boolean;
  
  toggleSidebar: () => void;
  setActivePage: (page: string) => void;
  setDashboardStats: (stats: DashboardStats) => void;
  setProjects: (projects: Project[]) => void;
  setProjectTypes: (types: ProjectType[]) => void;
  setBudgets: (budgets: Budget[]) => void;
  setIncomeBudgets: (budgets: IncomeBudget[]) => void;
  setContracts: (contracts: Contract[]) => void;
  setContractTemplates: (templates: ContractTemplate[]) => void;
  setExpenses: (expenses: Expense[]) => void;
  setRisks: (risks: Risk[]) => void;
  setAssets: (assets: Asset[]) => void;
  setPerformanceMetrics: (metrics: PerformanceMetric[]) => void;
  setPurchaseTypes: (types: PurchaseType[]) => void;
  setPurchaseIntentions: (intentions: PurchaseIntention[]) => void;
  setPurchaseApplications: (applications: PurchaseApplication[]) => void;
  setAccounts: (accounts: Account[]) => void;
  setIncomeRecords: (records: IncomeRecord[]) => void;
  setPreApplications: (apps: PreApplication[]) => void;
  setPerformanceEvaluations: (evals: PerformanceEvaluation[]) => void;
  setLoading: (loading: boolean) => void;
  updateExpenseStatus: (id: string, status: Expense['status']) => void;
  updateProjectStatus: (id: string, status: Project['status']) => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  activePage: 'portal',
  dashboardStats: null,
  projects: [],
  projectTypes: [],
  budgets: [],
  incomeBudgets: [],
  contracts: [],
  contractTemplates: [],
  expenses: [],
  risks: [],
  assets: [],
  performanceMetrics: [],
  purchaseTypes: [],
  purchaseIntentions: [],
  purchaseApplications: [],
  accounts: [],
  incomeRecords: [],
  preApplications: [],
  performanceEvaluations: [],
  loading: false,
  
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setActivePage: (page) => set({ activePage: page }),
  setDashboardStats: (stats) => set({ dashboardStats: stats }),
  setProjects: (projects) => set({ projects }),
  setProjectTypes: (types) => set({ projectTypes: types }),
  setBudgets: (budgets) => set({ budgets }),
  setIncomeBudgets: (budgets) => set({ incomeBudgets: budgets }),
  setContracts: (contracts) => set({ contracts }),
  setContractTemplates: (templates) => set({ contractTemplates: templates }),
  setExpenses: (expenses) => set({ expenses }),
  setRisks: (risks) => set({ risks }),
  setAssets: (assets) => set({ assets }),
  setPerformanceMetrics: (metrics) => set({ performanceMetrics: metrics }),
  setPurchaseTypes: (types) => set({ purchaseTypes: types }),
  setPurchaseIntentions: (intentions) => set({ purchaseIntentions: intentions }),
  setPurchaseApplications: (applications) => set({ purchaseApplications: applications }),
  setAccounts: (accounts) => set({ accounts }),
  setIncomeRecords: (records) => set({ incomeRecords: records }),
  setPreApplications: (apps) => set({ preApplications: apps }),
  setPerformanceEvaluations: (evals) => set({ performanceEvaluations: evals }),
  setLoading: (loading) => set({ loading }),
  updateExpenseStatus: (id, status) => set((state) => ({
    expenses: state.expenses.map((expense) =>
      expense.id === id ? { ...expense, status } : expense
    ),
  })),
  updateProjectStatus: (id, status) => set((state) => ({
    projects: state.projects.map((project) =>
      project.id === id ? { ...project, status, progress: status === 'completed' ? 100 : project.progress } : project
    ),
  })),
}));
