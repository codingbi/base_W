import { DataStore } from '../../shared/types';

export const initialData: DataStore = {
  users: [
    { id: '1', name: '张三', role: 'admin', department: '办公室' },
    { id: '2', name: '李四', role: 'manager', department: '财务部' },
    { id: '3', name: '王五', role: 'staff', department: '业务部' },
    { id: '4', name: '赵六', role: 'manager', department: '信息中心' },
    { id: '5', name: '钱七', role: 'staff', department: '采购部' },
  ],
  projects: [
    { id: '1', name: '信息化建设项目', department: '信息中心', budget: 500000, usedBudget: 350000, progress: 70, status: 'active', startDate: '2024-01-01', endDate: '2024-12-31' },
    { id: '2', name: '办公楼改造工程', department: '办公室', budget: 800000, usedBudget: 200000, progress: 25, status: 'active', startDate: '2024-03-01', endDate: '2024-10-31' },
    { id: '3', name: '业务系统升级', department: '业务部', budget: 300000, usedBudget: 300000, progress: 100, status: 'completed', startDate: '2023-10-01', endDate: '2024-03-31' },
    { id: '4', name: '档案数字化项目', department: '办公室', budget: 150000, usedBudget: 0, progress: 0, status: 'planning', startDate: '2024-07-01', endDate: '2024-12-31' },
  ],
  budgets: [
    { id: '1', category: '办公费用', allocated: 100000, used: 65000, remaining: 35000, period: '2024年度' },
    { id: '2', category: '差旅费', allocated: 80000, used: 45000, remaining: 35000, period: '2024年度' },
    { id: '3', category: '设备购置', allocated: 300000, used: 180000, remaining: 120000, period: '2024年度' },
    { id: '4', category: '培训费用', allocated: 50000, used: 20000, remaining: 30000, period: '2024年度' },
    { id: '5', category: '信息化建设', allocated: 600000, used: 400000, remaining: 200000, period: '2024年度' },
  ],
  contracts: [
    { id: '1', name: '软件开发服务合同', partyA: '本单位', partyB: '科技公司', amount: 300000, startDate: '2024-01-01', endDate: '2024-06-30', status: 'active' },
    { id: '2', name: '办公设备采购合同', partyA: '本单位', partyB: '设备供应商', amount: 150000, startDate: '2024-02-15', endDate: '2024-04-15', status: 'active' },
    { id: '3', name: '物业管理服务合同', partyA: '本单位', partyB: '物业公司', amount: 200000, startDate: '2023-01-01', endDate: '2023-12-31', status: 'expired' },
    { id: '4', name: '网络安全服务合同', partyA: '本单位', partyB: '安全公司', amount: 80000, startDate: '2024-04-01', endDate: '2025-03-31', status: 'draft' },
  ],
  expenses: [
    { id: '1', title: '办公用品采购', amount: 2500, category: '办公费', date: '2024-05-15', status: 'approved', applicant: '张三' },
    { id: '2', title: '出差报销', amount: 3800, category: '差旅费', date: '2024-05-10', status: 'pending', applicant: '王五' },
    { id: '3', title: '培训费用', amount: 5000, category: '培训费', date: '2024-05-08', status: 'approved', applicant: '李四' },
    { id: '4', title: '设备维修费', amount: 1200, category: '维修费', date: '2024-05-05', status: 'rejected', applicant: '赵六' },
    { id: '5', title: '会议场地费', amount: 4500, category: '会议费', date: '2024-05-01', status: 'pending', applicant: '钱七' },
  ],
  risks: [
    { id: '1', title: '信息安全风险', level: 'high', category: '信息技术', description: '系统存在安全漏洞，可能导致数据泄露', status: 'mitigating' },
    { id: '2', title: '预算超支风险', level: 'medium', category: '财务管理', description: '部分项目预算执行过快，可能超支', status: 'identified' },
    { id: '3', title: '人员流失风险', level: 'low', category: '人力资源', description: '关键岗位人员稳定性有待加强', status: 'resolved' },
    { id: '4', title: '项目延期风险', level: 'medium', category: '项目管理', description: '部分项目进度滞后，可能影响整体计划', status: 'identified' },
  ],
  assets: [
    { id: '1', name: '办公电脑', type: '电子设备', value: 5000, purchaseDate: '2023-05-10', status: 'in_use', department: '信息中心' },
    { id: '2', name: '打印机', type: '办公设备', value: 3000, purchaseDate: '2023-03-15', status: 'available', department: '办公室' },
    { id: '3', name: '投影仪', type: '会议设备', value: 8000, purchaseDate: '2022-10-20', status: 'in_use', department: '业务部' },
    { id: '4', name: '服务器', type: '网络设备', value: 50000, purchaseDate: '2023-08-01', status: 'maintenance', department: '信息中心' },
    { id: '5', name: '办公桌椅', type: '家具', value: 2000, purchaseDate: '2023-01-10', status: 'in_use', department: '财务部' },
  ],
  performanceMetrics: [
    { id: '1', name: '预算执行率', target: 90, current: 75, unit: '%', period: '2024年Q2' },
    { id: '2', name: '项目完成率', target: 85, current: 80, unit: '%', period: '2024年Q2' },
    { id: '3', name: '审批及时率', target: 95, current: 92, unit: '%', period: '2024年Q2' },
    { id: '4', name: '资产利用率', target: 80, current: 78, unit: '%', period: '2024年Q2' },
    { id: '5', name: '风险管控覆盖率', target: 100, current: 95, unit: '%', period: '2024年Q2' },
  ],
};
