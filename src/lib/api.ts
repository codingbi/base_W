import type { ApiResponse, DashboardStats, Project, ProjectType, Budget, IncomeBudget, Contract, ContractTemplate, Expense, Risk, Asset, PerformanceMetric, PurchaseType, PurchaseIntention, PurchaseApplication, Account, IncomeRecord, PreApplication, PerformanceEvaluation } from '../../shared/types';

const API_BASE = '/api';

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

export const api = {
  getDashboardStats: () => request<ApiResponse<DashboardStats>>('/dashboard'),
  getProjects: () => request<ApiResponse<Project[]>>('/projects'),
  getProjectTypes: () => request<ApiResponse<ProjectType[]>>('/project-types'),
  completeProject: (id: string) => request<ApiResponse<Project>>(`/projects/${id}/complete`, { method: 'POST' }),
  getBudgets: () => request<ApiResponse<Budget[]>>('/budgets'),
  getIncomeBudgets: () => request<ApiResponse<IncomeBudget[]>>('/income-budgets'),
  getContracts: () => request<ApiResponse<Contract[]>>('/contracts'),
  createContract: (contract: Omit<Contract, 'id' | 'partyA' | 'status' | 'performanceBond' | 'warrantyBond' | 'paidAmount' | 'paymentSchedule'>) => 
    request<ApiResponse<Contract>>('/contracts', { 
      method: 'POST', 
      body: JSON.stringify(contract) 
    }),
  getContractTemplates: () => request<ApiResponse<ContractTemplate[]>>('/contract-templates'),
  getExpenses: () => request<ApiResponse<Expense[]>>('/expenses'),
  approveExpense: (id: string) => request<ApiResponse<Expense>>(`/expenses/${id}/approve`, { method: 'POST' }),
  rejectExpense: (id: string) => request<ApiResponse<Expense>>(`/expenses/${id}/reject`, { method: 'POST' }),
  getRisks: () => request<ApiResponse<Risk[]>>('/risks'),
  getAssets: () => request<ApiResponse<Asset[]>>('/assets'),
  getPerformanceMetrics: () => request<ApiResponse<PerformanceMetric[]>>('/performance'),
  getPurchaseTypes: () => request<ApiResponse<PurchaseType[]>>('/purchase-types'),
  getPurchaseIntentions: () => request<ApiResponse<PurchaseIntention[]>>('/purchase-intentions'),
  getPurchaseApplications: () => request<ApiResponse<PurchaseApplication[]>>('/purchase-applications'),
  getAccounts: () => request<ApiResponse<Account[]>>('/accounts'),
  getIncomeRecords: () => request<ApiResponse<IncomeRecord[]>>('/income-records'),
  getPreApplications: () => request<ApiResponse<PreApplication[]>>('/pre-applications'),
  getPerformanceEvaluations: () => request<ApiResponse<PerformanceEvaluation[]>>('/performance-evaluations'),
};
