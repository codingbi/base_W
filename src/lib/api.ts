import type { ApiResponse, DashboardStats, Project, Budget, Contract, Expense, Risk, Asset, PerformanceMetric } from '../../shared/types';

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
  // 仪表盘
  getDashboardStats: () => request<ApiResponse<DashboardStats>>('/dashboard'),
  
  // 项目
  getProjects: () => request<ApiResponse<Project[]>>('/projects'),
  
  // 预算
  getBudgets: () => request<ApiResponse<Budget[]>>('/budgets'),
  
  // 合同
  getContracts: () => request<ApiResponse<Contract[]>>('/contracts'),
  
  // 支出
  getExpenses: () => request<ApiResponse<Expense[]>>('/expenses'),
  approveExpense: (id: string) => request<ApiResponse<Expense>>(`/expenses/${id}/approve`, { method: 'POST' }),
  rejectExpense: (id: string) => request<ApiResponse<Expense>>(`/expenses/${id}/reject`, { method: 'POST' }),
  
  // 风险
  getRisks: () => request<ApiResponse<Risk[]>>('/risks'),
  
  // 资产
  getAssets: () => request<ApiResponse<Asset[]>>('/assets'),
  
  // 绩效
  getPerformance: () => request<ApiResponse<PerformanceMetric[]>>('/performance'),
};
