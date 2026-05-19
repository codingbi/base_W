import { Router } from 'express';
import { getData, updateData } from '../data/store';
import type { ApiResponse, DashboardStats } from '../../shared/types';

const router = Router();

// 获取仪表盘统计数据
router.get('/dashboard', (req, res) => {
  const data = getData();
  const stats: DashboardStats = {
    pendingTasks: data.expenses.filter(e => e.status === 'pending').length,
    budgetUsed: Math.round((data.budgets.reduce((sum, b) => sum + b.used, 0) / data.budgets.reduce((sum, b) => sum + b.allocated, 0)) * 100),
    projectsActive: data.projects.filter(p => p.status === 'active').length,
    contractsActive: data.contracts.filter(c => c.status === 'active').length,
  };
  
  const response: ApiResponse<DashboardStats> = { success: true, data: stats };
  res.json(response);
});

// 获取项目列表
router.get('/projects', (req, res) => {
  const data = getData();
  const response: ApiResponse<any> = { success: true, data: data.projects };
  res.json(response);
});

// 获取预算列表
router.get('/budgets', (req, res) => {
  const data = getData();
  const response: ApiResponse<any> = { success: true, data: data.budgets };
  res.json(response);
});

// 获取合同列表
router.get('/contracts', (req, res) => {
  const data = getData();
  const response: ApiResponse<any> = { success: true, data: data.contracts };
  res.json(response);
});

// 获取支出列表
router.get('/expenses', (req, res) => {
  const data = getData();
  const response: ApiResponse<any> = { success: true, data: data.expenses };
  res.json(response);
});

// 获取风险列表
router.get('/risks', (req, res) => {
  const data = getData();
  const response: ApiResponse<any> = { success: true, data: data.risks };
  res.json(response);
});

// 获取资产列表
router.get('/assets', (req, res) => {
  const data = getData();
  const response: ApiResponse<any> = { success: true, data: data.assets };
  res.json(response);
});

// 获取绩效指标
router.get('/performance', (req, res) => {
  const data = getData();
  const response: ApiResponse<any> = { success: true, data: data.performanceMetrics };
  res.json(response);
});

// 审批支出
router.post('/expenses/:id/approve', (req, res) => {
  const data = getData();
  const expenseId = req.params.id;
  const expenseIndex = data.expenses.findIndex(e => e.id === expenseId);
  
  if (expenseIndex !== -1) {
    data.expenses[expenseIndex].status = 'approved';
    updateData({ expenses: data.expenses });
    const response: ApiResponse<any> = { success: true, data: data.expenses[expenseIndex], message: '审批成功' };
    res.json(response);
  } else {
    const response: ApiResponse<any> = { success: false, data: null, message: '支出记录不存在' };
    res.status(404).json(response);
  }
});

// 拒绝支出
router.post('/expenses/:id/reject', (req, res) => {
  const data = getData();
  const expenseId = req.params.id;
  const expenseIndex = data.expenses.findIndex(e => e.id === expenseId);
  
  if (expenseIndex !== -1) {
    data.expenses[expenseIndex].status = 'rejected';
    updateData({ expenses: data.expenses });
    const response: ApiResponse<any> = { success: true, data: data.expenses[expenseIndex], message: '已拒绝' };
    res.json(response);
  } else {
    const response: ApiResponse<any> = { success: false, data: null, message: '支出记录不存在' };
    res.status(404).json(response);
  }
});

export default router;
