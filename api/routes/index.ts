import { Router } from 'express';
import { getData, updateData } from '../data/store';
import type { ApiResponse, DashboardStats } from '../../shared/types';

const router = Router();

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

router.get('/projects', (req, res) => {
  const data = getData();
  const response: ApiResponse<any> = { success: true, data: data.projects };
  res.json(response);
});

router.get('/project-types', (req, res) => {
  const data = getData();
  const response: ApiResponse<any> = { success: true, data: data.projectTypes };
  res.json(response);
});

router.get('/budgets', (req, res) => {
  const data = getData();
  const response: ApiResponse<any> = { success: true, data: data.budgets };
  res.json(response);
});

router.get('/income-budgets', (req, res) => {
  const data = getData();
  const response: ApiResponse<any> = { success: true, data: data.incomeBudgets };
  res.json(response);
});

router.get('/contracts', (req, res) => {
  const data = getData();
  const response: ApiResponse<any> = { success: true, data: data.contracts };
  res.json(response);
});

router.get('/contract-templates', (req, res) => {
  const data = getData();
  const response: ApiResponse<any> = { success: true, data: data.contractTemplates };
  res.json(response);
});

router.get('/expenses', (req, res) => {
  const data = getData();
  const response: ApiResponse<any> = { success: true, data: data.expenses };
  res.json(response);
});

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

router.get('/risks', (req, res) => {
  const data = getData();
  const response: ApiResponse<any> = { success: true, data: data.risks };
  res.json(response);
});

router.get('/assets', (req, res) => {
  const data = getData();
  const response: ApiResponse<any> = { success: true, data: data.assets };
  res.json(response);
});

router.get('/performance', (req, res) => {
  const data = getData();
  const response: ApiResponse<any> = { success: true, data: data.performanceMetrics };
  res.json(response);
});

router.get('/purchase-types', (req, res) => {
  const data = getData();
  const response: ApiResponse<any> = { success: true, data: data.purchaseTypes };
  res.json(response);
});

router.get('/purchase-intentions', (req, res) => {
  const data = getData();
  const response: ApiResponse<any> = { success: true, data: data.purchaseIntentions };
  res.json(response);
});

router.get('/purchase-applications', (req, res) => {
  const data = getData();
  const response: ApiResponse<any> = { success: true, data: data.purchaseApplications };
  res.json(response);
});

router.get('/accounts', (req, res) => {
  const data = getData();
  const response: ApiResponse<any> = { success: true, data: data.accounts };
  res.json(response);
});

router.get('/income-records', (req, res) => {
  const data = getData();
  const response: ApiResponse<any> = { success: true, data: data.incomeRecords };
  res.json(response);
});

router.get('/pre-applications', (req, res) => {
  const data = getData();
  const response: ApiResponse<any> = { success: true, data: data.preApplications };
  res.json(response);
});

router.get('/performance-evaluations', (req, res) => {
  const data = getData();
  const response: ApiResponse<any> = { success: true, data: data.performanceEvaluations };
  res.json(response);
});

router.post('/projects/:id/complete', (req, res) => {
  const data = getData();
  const projectId = req.params.id;
  const projectIndex = data.projects.findIndex(p => p.id === projectId);
  
  if (projectIndex !== -1) {
    data.projects[projectIndex].status = 'completed';
    data.projects[projectIndex].progress = 100;
    updateData({ projects: data.projects });
    const response: ApiResponse<any> = { success: true, data: data.projects[projectIndex], message: '项目已完成' };
    res.json(response);
  } else {
    const response: ApiResponse<any> = { success: false, data: null, message: '项目不存在' };
    res.status(404).json(response);
  }
});

export default router;
