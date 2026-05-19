import React, { useEffect, useState } from 'react';
import { Plus, Download, Upload, Filter, Search, RefreshCw, X } from 'lucide-react';
import { useAppStore } from '../store';
import { api } from '../lib/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

export default function BudgetManagementPage() {
  const { budgets, incomeBudgets, setBudgets, setIncomeBudgets, loading, setLoading } = useAppStore();
  const [activeTab, setActiveTab] = useState('expense');
  const [searchTerm, setSearchTerm] = useState('');
  const [showImportModal, setShowImportModal] = useState<string | false>(false);
  const [newIncomeBudget, setNewIncomeBudget] = useState({
    type: '',
    amount: 0,
    department: '',
    period: new Date().getFullYear().toString() + '年度',
  });
  const [adjustRequest, setAdjustRequest] = useState({
    type: '',
    amount: 0,
    reason: '',
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

  const filteredBudgets = budgets.filter(b =>
    b.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'submitted':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
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
      case 'draft':
        return '草稿';
      default:
        return '未知';
    }
  };

  const handleAddIncomeBudget = () => {
    const newBudget = {
      id: Date.now().toString(),
      ...newIncomeBudget,
      status: 'draft' as const,
    };
    setIncomeBudgets([...incomeBudgets, newBudget]);
    setNewIncomeBudget({
      type: '',
      amount: 0,
      department: '',
      period: new Date().getFullYear().toString() + '年度',
    });
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
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus size={18} />
            新增预算
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
          <p className="text-2xl font-bold text-purple-600 mt-2">{Math.round((totalUsed / totalExpense) * 100)}%</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex border-b border-gray-100 overflow-x-auto">
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
                    {filteredBudgets.map((budget) => {
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

        {activeTab === 'income' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">收入预算编制</h3>
              <button onClick={() => setShowImportModal('income')} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus size={18} />
                新增收入预算
              </button>
            </div>

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
                        paddingAngle={2}
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

        {activeTab === 'adjust' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">预算调整申请</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">调整类型</label>
                      <select
                        value={adjustRequest.type}
                        onChange={(e) => setAdjustRequest({ ...adjustRequest, type: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
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
                        value={adjustRequest.amount}
                        onChange={(e) => setAdjustRequest({ ...adjustRequest, amount: Number(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="输入调整金额"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">调整原因</label>
                    <textarea
                      value={adjustRequest.reason}
                      onChange={(e) => setAdjustRequest({ ...adjustRequest, reason: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      placeholder="请输入调整原因..."
                    />
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100">
                      保存草稿
                    </button>
                    <button className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
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

      {showImportModal === 'income' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">新增收入预算</h3>
              <button onClick={() => setShowImportModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">收入类型</label>
                <select
                  value={newIncomeBudget.type}
                  onChange={(e) => setNewIncomeBudget({ ...newIncomeBudget, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">请选择收入类型</option>
                  <option value="财政拨款收入">财政拨款收入</option>
                  <option value="事业收入">事业收入</option>
                  <option value="其他收入">其他收入</option>
                  <option value="财政专户管理资金预算收入">财政专户管理资金预算收入</option>
                  <option value="上级补助预算收入">上级补助预算收入</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">金额</label>
                  <input
                    type="number"
                    value={newIncomeBudget.amount}
                    onChange={(e) => setNewIncomeBudget({ ...newIncomeBudget, amount: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="输入金额"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">申报部门</label>
                  <input
                    type="text"
                    value={newIncomeBudget.department}
                    onChange={(e) => setNewIncomeBudget({ ...newIncomeBudget, department: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="输入部门"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowImportModal(false)} className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100">
                  取消
                </button>
                <button onClick={handleAddIncomeBudget} className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  保存
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}