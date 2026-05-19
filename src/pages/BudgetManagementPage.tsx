import React, { useEffect, useState } from 'react';
import { Plus, Download, Upload, Filter, Search, RefreshCw, X, Send, Save, FileText, Printer, ChevronRight, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { useAppStore } from '../store';
import { api } from '../lib/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

// 模拟数据
const projectNames = [
  { id: '1', code: 'XM-001', level1: '教学科研', level2: '教学改革', level3: '课程建设', department: '教务处', status: 'approved' },
  { id: '2', code: 'XM-002', level1: '教学科研', level2: '科学研究', level3: '科研项目', department: '科研处', status: 'approved' },
  { id: '3', code: 'XM-003', level1: '学生工作', level2: '学生活动', level3: '', department: '学工部', status: 'pending' },
];

const budgetNotifications = [
  { id: '1', year: '2024', title: '2024年度预算编制通知', status: 'published' },
  { id: '2', year: '2023', title: '2023年度预算编制通知', status: 'closed' },
];

const revenueBudgetData = [
  { id: '1', code: 'SR-2024-001', project: '教学科研', income: 500000, expense: 300000, status: 'approved', year: '2024', department: '继续教育学院' },
  { id: '2', code: 'SR-2024-002', project: '培训服务', income: 300000, expense: 200000, status: 'pending', year: '2024', department: '对外交流及规划处' },
];

const budgetDeclarationData = [
  { id: '1', code: 'YS-2024-001', project: '教学科研', level1: '教学科研', level2: '教学改革', level3: '课程建设', amount: 500000, status: 'pending', year: '2024', department: '教务处' },
  { id: '2', code: 'YS-2024-002', project: '学生工作', level1: '学生工作', level2: '学生活动', level3: '', amount: 200000, status: 'approved', year: '2024', department: '学工部' },
];

export default function BudgetManagementPage() {
  const { budgets, incomeBudgets, setBudgets, setIncomeBudgets, loading, setLoading } = useAppStore();
  const [activeTab, setActiveTab] = useState('projectLibrary');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState('2024');

  // 表单状态
  const [projectForm, setProjectForm] = useState({
    level1: '',
    level2: '',
    level3: '',
  });
  const [revenueForm, setRevenueForm] = useState({
    project: '',
    level1: '',
    level2: '',
    level3: '',
    income: 0,
    expense: 0,
    remark: '',
  });
  const [budgetForm, setBudgetForm] = useState({
    project: '',
    level1: '',
    level2: '',
    level3: '',
    amount: 0,
    remark: '',
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [budgetsRes, incomeBudgetsRes] = await Promise.all([
          api.getBudgets(),
          api.getIncomeBudgets(),
        ]);
        setBudgets(budgetsRes.data);
        setIncomeBudgets(incomeBudgetsRes.data);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [setBudgets, setIncomeBudgets, setLoading]);

  const expenseChartData = budgets.map(b => ({
    name: b.category,
    allocated: b.allocated,
    used: b.used,
    remaining: b.remaining,
  }));

  const incomeChartData = incomeBudgets.map(ib => ({
    name: ib.type,
    value: ib.amount,
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'published':
        return 'bg-blue-100 text-blue-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return '已审批';
      case 'submitted':
        return '已提交';
      case 'pending':
        return '审批中';
      case 'draft':
        return '草稿';
      case 'rejected':
        return '已退回';
      case 'published':
        return '已发布';
      case 'closed':
        return '已关闭';
      default:
        return '未知';
    }
  };

  const totalIncome = incomeBudgets.reduce((sum, ib) => sum + ib.amount, 0);
  const totalExpense = budgets.reduce((sum, b) => sum + b.allocated, 0);
  const totalUsed = budgets.reduce((sum, b) => sum + b.used, 0);
  const totalRemaining = budgets.reduce((sum, b) => sum + b.remaining, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">预算管理</h1>
          <p className="text-gray-500 mt-1">管理单位预算编制、执行与监控</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <Download size={18} />
            导出报表
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">总预算金额</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">¥{(totalExpense / 10000).toFixed(1)}万</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">已使用</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">¥{(totalUsed / 10000).toFixed(1)}万</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">剩余预算</p>
          <p className="text-2xl font-bold text-green-600 mt-2">¥{(totalRemaining / 10000).toFixed(1)}万</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">执行率</p>
          <p className="text-2xl font-bold text-purple-600 mt-2">{totalExpense > 0 ? Math.round((totalUsed / totalExpense) * 100) : 0}%</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex border-b border-gray-100 overflow-x-auto">
          <button
            onClick={() => setActiveTab('projectLibrary')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'projectLibrary' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            项目名称库
          </button>
          <button
            onClick={() => setActiveTab('budgetDeclaration')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'budgetDeclaration' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            预算申报
          </button>
          <button
            onClick={() => setActiveTab('expense')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'expense' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            支出预算汇总
          </button>
          <button
            onClick={() => setActiveTab('income')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'income' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            收入预算管理
          </button>
          <button
            onClick={() => setActiveTab('decompose')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'decompose' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            预算分解与导入
          </button>
          <button
            onClick={() => setActiveTab('query')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'query' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            预算查询
          </button>
          <button
            onClick={() => setActiveTab('adjust')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'adjust' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            预算调整
          </button>
        </div>

        {/* 项目名称库 */}
        {activeTab === 'projectLibrary' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">项目名称库</h3>
              <button 
                onClick={() => setShowModal('addProject')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus size={18} />
                新增项目名称
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">项目编码</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">一级项目</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">二级项目</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">三级项目</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">申报部门</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projectNames.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{project.code}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{project.level1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.level2 || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.level3 || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {getStatusText(project.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 预算申报 */}
        {activeTab === 'budgetDeclaration' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 rounded-xl p-6 cursor-pointer hover:bg-blue-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <FileText size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">创收预算申报</h4>
                    <p className="text-sm text-gray-600">申报创收收入和支出预算</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowModal('revenueBudget')}
                  className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  打开申报表
                </button>
              </div>

              <div className="bg-green-50 rounded-xl p-6 cursor-pointer hover:bg-green-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <FileText size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">预算申报表</h4>
                    <p className="text-sm text-gray-600">申报年度预算项目</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowModal('budgetDeclaration')}
                  className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  打开申报表
                </button>
              </div>
            </div>

            {/* 创收预算申报列表 */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">创收预算申报记录</h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">申报编码</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">项目名称</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">收入金额</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">支出金额</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">申报部门</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {revenueBudgetData.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.code}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.project}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">¥{item.income.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">¥{item.expense.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.department}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {getStatusText(item.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-blue-600 hover:text-blue-800 mr-3">查看</button>
                          {item.status === 'approved' && (
                            <button className="text-green-600 hover:text-green-800 flex items-center gap-1">
                              <Printer size={14} />
                              打印
                            </button>
                          )}
                          {item.status === 'rejected' && (
                            <button className="text-orange-600 hover:text-orange-800">重新提交</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 预算申报列表 */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">预算申报记录</h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">申报编码</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">项目名称</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">一级项目</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">二级项目</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">申报金额</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {budgetDeclarationData.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.code}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.project}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.level1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.level2}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">¥{item.amount.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {getStatusText(item.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-blue-600 hover:text-blue-800 mr-3">查看</button>
                          {item.status === 'approved' && (
                            <button className="text-green-600 hover:text-green-800 flex items-center gap-1">
                              <Printer size={14} />
                              打印
                            </button>
                          )}
                          {item.status === 'rejected' && (
                            <button className="text-orange-600 hover:text-orange-800">重新提交</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 支出预算汇总 */}
        {activeTab === 'expense' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">支出预算分析</h4>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={expenseChartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
                      <Bar dataKey="allocated" name="预算金额" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="used" name="已使用" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">预算执行统计</h4>
                <div className="space-y-4">
                  {budgets.map((budget, index) => (
                    <div key={budget.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">{budget.category}</span>
                        <span className="text-sm text-gray-500">
                          {budget.period} • {(budget.used / budget.allocated * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(budget.used / budget.allocated * 100)}%`,
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">已用: ¥{budget.used.toLocaleString()}</span>
                        <span className="text-gray-600">预算: ¥{budget.allocated.toLocaleString()}</span>
                        <span className="text-gray-600">剩余: ¥{budget.remaining.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-gray-100 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">预算明细</h4>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="搜索预算项目..."
                    />
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">预算项目</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">期间</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">预算金额</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">已使用</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">执行率</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {budgets.map((budget) => {
                      const rate = (budget.used / budget.allocated * 100);
                      return (
                        <tr key={budget.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{budget.category}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{budget.period}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">¥{budget.allocated.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">¥{budget.used.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              rate >= 90 ? 'bg-red-100 text-red-800' : rate >= 70 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {rate.toFixed(0)}%
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              rate >= 100 ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {rate >= 100 ? '执行完毕' : '执行中'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 收入预算管理 */}
        {activeTab === 'income' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">收入预算分布</h4>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={incomeChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ¥${(percent * totalIncome / 10000).toFixed(1)}万`}
                      >
                        {incomeChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">收入预算明细</h4>
                <div className="space-y-4">
                  {incomeBudgets.map((income) => (
                    <div key={income.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{income.type}</p>
                        <p className="text-sm text-gray-500">{income.department} • {income.period}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">¥{(income.amount / 10000).toFixed(1)}万</p>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(income.status)}`}>
                          {getStatusText(income.status)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">收入预算汇总表</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-500">财政拨款收入</p>
                  <p className="text-xl font-bold text-blue-600 mt-2">¥{(incomeBudgets.filter(i => i.type === '财政拨款收入').reduce((sum, i) => sum + i.amount, 0) / 10000).toFixed(1)}万</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-500">事业收入</p>
                  <p className="text-xl font-bold text-green-600 mt-2">¥{(incomeBudgets.filter(i => i.type === '事业收入').reduce((sum, i) => sum + i.amount, 0) / 10000).toFixed(1)}万</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-500">其他收入</p>
                  <p className="text-xl font-bold text-purple-600 mt-2">¥{(incomeBudgets.filter(i => i.type === '其他收入').reduce((sum, i) => sum + i.amount, 0) / 10000).toFixed(1)}万</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 预算分解与导入 */}
        {activeTab === 'decompose' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">预算分解</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">选择预算来源</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">请选择预算来源</option>
                      <option value="first-calculation">一下测算明细</option>
                      <option value="first-budget">一下年度预算</option>
                      <option value="second-calculation">二下测算明细</option>
                      <option value="second-budget">二下年度预算</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">分解方式</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="department">按部门分解</option>
                      <option value="project">按项目分解</option>
                      <option value="person">按负责人分解</option>
                    </select>
                  </div>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    生成分解方案
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">预算导入</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg">
                    <Upload size={20} className="text-gray-400" />
                    <span className="text-sm text-gray-500">点击或拖拽上传Excel分解模板</span>
                  </div>
                  <button className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    <Download size={18} />
                    下载导入模板
                  </button>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm text-yellow-800">
                      提示：导入前请确保Excel文件格式正确，系统将自动检查数据有效性并生成异常报告。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-white rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">分解结果预览</h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">预算项目</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">分解对象</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">分解金额</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">支出范围</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">关联指标</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">办公费用</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">办公室</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">¥50,000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">办公用品、水电费</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">ZWFY-2024-001</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">差旅费</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">业务部</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">¥40,000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">交通费、住宿费</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">ZWFY-2024-002</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex gap-3 mt-4">
                <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100">
                  重置
                </button>
                <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  确认导入
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 预算查询 */}
        {activeTab === 'query' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">预算查询</h3>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                <RefreshCw size={18} />
                刷新数据
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">负责人</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">全部</option>
                  <option value="1">张三</option>
                  <option value="2">李四</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">归口部门</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">全部</option>
                  <option value="1">财务部</option>
                  <option value="2">办公室</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">预算类型</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">全部</option>
                  <option value="income">收入预算</option>
                  <option value="expense">支出预算</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">期间</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">全部</option>
                  <option value="2024">2024年度</option>
                  <option value="2023">2023年度</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">预算执行明细</h4>
                <div className="space-y-4">
                  {budgets.map((budget) => (
                    <div key={budget.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{budget.category}</p>
                        <p className="text-sm text-gray-500">{budget.period}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">¥{(budget.remaining / 10000).toFixed(1)}万</p>
                        <p className="text-sm text-gray-500">剩余可用</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">预算执行概览</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">批复预算</span>
                      <span className="font-medium text-gray-900">¥{(totalExpense / 10000).toFixed(1)}万</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">到位资金</span>
                      <span className="font-medium text-gray-900">¥{(totalExpense / 10000).toFixed(1)}万</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">已核销资金</span>
                      <span className="font-medium text-gray-900">¥{(totalUsed / 10000).toFixed(1)}万</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">剩余可用</span>
                      <span className="font-medium text-green-600">¥{(totalRemaining / 10000).toFixed(1)}万</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 预算调整 */}
        {activeTab === 'adjust' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">预算调整申请</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">调整类型</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">请选择调整类型</option>
                      <option value="追加">项目间追加预算</option>
                      <option value="调减">项目间调减预算</option>
                      <option value="special">特殊项目增加预算</option>
                      <option value="advance">垫支预算调整</option>
                      <option value="writeoff">核销金额调减</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">金额</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="输入调整金额"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">调整原因</label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      placeholder="请输入调整原因..."
                    />
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 flex items-center justify-center gap-2">
                      <Save size={16} />
                      保存草稿
                    </button>
                    <button className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                      <Send size={16} />
                      提交审批
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">调整记录</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-900">办公费用调增</span>
                        <span className="text-green-600">+¥50,000</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">2024-05-10 • 已审批</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-900">差旅费调减</span>
                        <span className="text-red-600">-¥20,000</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">2024-05-05 • 已审批</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-900">设备购置追加</span>
                        <span className="text-green-600">+¥100,000</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">2024-05-01 • 审批中</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">调整统计</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">本月调整次数</span>
                      <span className="font-medium text-gray-900">5次</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">累计调增金额</span>
                      <span className="font-medium text-green-600">¥350,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">累计调减金额</span>
                      <span className="font-medium text-red-600">-¥120,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 新增项目名称模态框 */}
      {showModal === 'addProject' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">新增项目名称</h3>
              <button onClick={() => setShowModal(null)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">一级项目名称 <span className="text-red-500">*</span></label>
                <select
                  value={projectForm.level1}
                  onChange={(e) => setProjectForm({ ...projectForm, level1: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">请选择一级项目</option>
                  <option value="教学科研">教学科研</option>
                  <option value="学生工作">学生工作</option>
                  <option value="行政管理">行政管理</option>
                  <option value="后勤保障">后勤保障</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">二级项目名称</label>
                <input
                  type="text"
                  value={projectForm.level2}
                  onChange={(e) => setProjectForm({ ...projectForm, level2: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="输入二级项目名称"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">三级项目名称</label>
                <input
                  type="text"
                  value={projectForm.level3}
                  onChange={(e) => setProjectForm({ ...projectForm, level3: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="输入三级项目名称（可选）"
                />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowModal(null)} className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100">
                  取消
                </button>
                <button 
                  onClick={() => setShowModal(null)}
                  className="flex-1 px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 flex items-center justify-center gap-2"
                >
                  <Save size={16} />
                  保存待发
                </button>
                <button 
                  onClick={() => setShowModal(null)}
                  className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  发送
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 创收预算申报模态框 */}
      {showModal === 'revenueBudget' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl my-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">创收预算申报表</h3>
              <button onClick={() => setShowModal(null)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <label className="block text-sm font-medium text-gray-700">预算年度</label>
                <div className="flex items-center gap-2 flex-1">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {budgetNotifications.map((n) => (
                      <option key={n.id} value={n.year}>{n.title}</option>
                    ))}
                  </select>
                  <button className="px-3 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 flex items-center gap-1">
                    <Calendar size={16} />
                    选择通知
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">一级项目名称 <span className="text-red-500">*</span></label>
                <select
                  value={revenueForm.level1}
                  onChange={(e) => setRevenueForm({ ...revenueForm, level1: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">请选择一级项目</option>
                  {projectNames.map((p) => (
                    <option key={p.id} value={p.level1}>{p.level1}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">二级项目名称</label>
                <select
                  value={revenueForm.level2}
                  onChange={(e) => setRevenueForm({ ...revenueForm, level2: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">请选择二级项目</option>
                  {projectNames.filter(p => p.level2).map((p) => (
                    <option key={p.id} value={p.level2}>{p.level2}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">三级项目名称</label>
                <select
                  value={revenueForm.level3}
                  onChange={(e) => setRevenueForm({ ...revenueForm, level3: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">请选择三级项目</option>
                  {projectNames.filter(p => p.level3).map((p) => (
                    <option key={p.id} value={p.level3}>{p.level3}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">创收收入预算金额</label>
                  <input
                    type="number"
                    value={revenueForm.income}
                    onChange={(e) => setRevenueForm({ ...revenueForm, income: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="输入收入金额"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">创收支出预算金额</label>
                  <input
                    type="number"
                    value={revenueForm.expense}
                    onChange={(e) => setRevenueForm({ ...revenueForm, expense: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="输入支出金额"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">备注</label>
                <textarea
                  value={revenueForm.remark}
                  onChange={(e) => setRevenueForm({ ...revenueForm, remark: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="输入备注信息"
                />
              </div>

              <div className="flex gap-3">
                <button onClick={() => setShowModal(null)} className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100">
                  取消
                </button>
                <button 
                  onClick={() => setShowModal(null)}
                  className="flex-1 px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 flex items-center justify-center gap-2"
                >
                  <Save size={16} />
                  保存待发
                </button>
                <button 
                  onClick={() => setShowModal(null)}
                  className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  发送
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 预算申报模态框 */}
      {showModal === 'budgetDeclaration' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl my-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">预算申报表</h3>
              <button onClick={() => setShowModal(null)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <label className="block text-sm font-medium text-gray-700">预算年度</label>
                <div className="flex items-center gap-2 flex-1">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {budgetNotifications.map((n) => (
                      <option key={n.id} value={n.year}>{n.title}</option>
                    ))}
                  </select>
                  <button className="px-3 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 flex items-center gap-1">
                    <Calendar size={16} />
                    选择通知
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">一级项目名称 <span className="text-red-500">*</span></label>
                <select
                  value={budgetForm.level1}
                  onChange={(e) => setBudgetForm({ ...budgetForm, level1: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">请选择一级项目</option>
                  {projectNames.map((p) => (
                    <option key={p.id} value={p.level1}>{p.level1}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">二级项目名称</label>
                <select
                  value={budgetForm.level2}
                  onChange={(e) => setBudgetForm({ ...budgetForm, level2: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">请选择二级项目</option>
                  {projectNames.filter(p => p.level2).map((p) => (
                    <option key={p.id} value={p.level2}>{p.level2}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">三级项目名称</label>
                <select
                  value={budgetForm.level3}
                  onChange={(e) => setBudgetForm({ ...budgetForm, level3: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">请选择三级项目</option>
                  {projectNames.filter(p => p.level3).map((p) => (
                    <option key={p.id} value={p.level3}>{p.level3}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">申报金额 <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  value={budgetForm.amount}
                  onChange={(e) => setBudgetForm({ ...budgetForm, amount: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="输入申报金额"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">备注</label>
                <textarea
                  value={budgetForm.remark}
                  onChange={(e) => setBudgetForm({ ...budgetForm, remark: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="输入备注信息"
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertCircle size={16} className="text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium">注意事项：</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>创收收入预算明细表只有继续教育学院和对外交流及规划处这两个部门能申报</li>
                      <li>其他部门只能填写创收支出预算</li>
                      <li>如有财务回退，请查看明细表批复备注，修改后重新提交</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setShowModal(null)} className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100">
                  取消
                </button>
                <button 
                  onClick={() => setShowModal(null)}
                  className="flex-1 px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 flex items-center justify-center gap-2"
                >
                  <Save size={16} />
                  保存待发
                </button>
                <button 
                  onClick={() => setShowModal(null)}
                  className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  发送
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}