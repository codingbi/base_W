import React, { useState } from 'react';
import { Download, RefreshCw, BarChart3, PieChart, TrendingUp, DollarSign, ShoppingCart, FileText, Package, AlertTriangle, ArrowUpRight, ArrowDownRight, Calendar, Users, Building } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell, LineChart, Line, Area } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#ef4444'];

const budgetData = [
  { name: 'Q1', budget: 1500000, actual: 1350000 },
  { name: 'Q2', budget: 1800000, actual: 1720000 },
  { name: 'Q3', budget: 2000000, actual: 1850000 },
  { name: 'Q4', budget: 1700000, actual: 0 },
];

const incomeExpenseData = [
  { month: '1月', income: 800000, expense: 750000 },
  { month: '2月', income: 950000, expense: 880000 },
  { month: '3月', income: 1200000, expense: 1100000 },
  { month: '4月', income: 1100000, expense: 980000 },
  { month: '5月', income: 1300000, expense: 1150000 },
];

const purchaseData = [
  { type: '政府采购', amount: 850000, count: 12 },
  { type: '网上商城', amount: 320000, count: 28 },
  { type: '校内集采', amount: 560000, count: 8 },
  { type: '自行采购', amount: 180000, count: 45 },
];

const contractData = [
  { name: '服务合同', value: 650000, percentage: 35 },
  { name: '采购合同', value: 580000, percentage: 31 },
  { name: '工程合同', value: 420000, percentage: 23 },
  { name: '其他合同', value: 210000, percentage: 11 },
];

const projectData = [
  { name: '进行中', value: 15 },
  { name: '已完成', value: 28 },
  { name: '待审批', value: 8 },
  { name: '已终止', value: 2 },
];

const assetData = [
  { type: '办公设备', value: 120, percentage: 42 },
  { type: '仪器设备', value: 60, percentage: 21 },
  { type: '家具', value: 85, percentage: 30 },
  { type: '车辆', value: 15, percentage: 5 },
  { type: '房产', value: 8, percentage: 2 },
];

const tripleMajorData = [
  { type: '重大决策', count: 8, amount: 25000000 },
  { type: '重要人事', count: 12, amount: 0 },
  { type: '重大项目', count: 5, amount: 18000000 },
  { type: '大额资金', count: 15, amount: 32000000 },
];

const kpiData = [
  { name: '预算执行率', value: 92, target: 95, trend: 'up' },
  { name: '采购合规率', value: 98, target: 95, trend: 'up' },
  { name: '合同履约率', value: 95, target: 95, trend: 'stable' },
  { name: '项目完成率', value: 65, target: 70, trend: 'down' },
  { name: '资产完好率', value: 94, target: 90, trend: 'up' },
  { name: '风险控制率', value: 88, target: 90, trend: 'down' },
];

const summaryCards = [
  { title: '预算执行总额', value: '5,920,000', unit: '元', icon: DollarSign, color: 'blue', change: '+12.5%' },
  { title: '收入总额', value: '5,350,000', unit: '元', icon: TrendingUp, color: 'green', change: '+8.3%' },
  { title: '采购订单数', value: '93', unit: '笔', icon: ShoppingCart, color: 'yellow', change: '+15.2%' },
  { title: '合同总数', value: '186', unit: '份', icon: FileText, color: 'purple', change: '+5.1%' },
  { title: '项目数量', value: '53', unit: '个', icon: Building, color: 'orange', change: '+3.8%' },
  { title: '资产总数', value: '288', unit: '件', icon: Package, color: 'cyan', change: '+2.1%' },
];

export default function BiReportsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('year');

  const tabs = [
    { id: 'overview', name: '总览看板' },
    { id: 'budget', name: '预算管理' },
    { id: 'income', name: '收支管理' },
    { id: 'purchase', name: '采购管理' },
    { id: 'contract', name: '合同管理' },
    { id: 'project', name: '项目管理' },
    { id: 'asset', name: '资产管理' },
    { id: 'triple', name: '三重一大' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">BI报表决策分析</h1>
          <p className="text-gray-500 mt-1">6大经济业务与三重一大主题数据分析</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="month">本月</option>
            <option value="quarter">本季度</option>
            <option value="year">本年度</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <RefreshCw size={18} />
            刷新数据
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download size={18} />
            导出报表
          </button>
        </div>
      </div>

      <div className="flex border-b border-gray-200 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id 
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {summaryCards.map((card) => (
              <div key={card.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 bg-${card.color}-100 rounded-full flex items-center justify-center`}>
                    <card.icon size={20} className={`text-${card.color}-600`} />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-medium ${card.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {card.change.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {card.change}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-3">{card.title}</p>
                <div className="flex items-baseline mt-1">
                  <span className="text-2xl font-bold text-gray-900">{card.value}</span>
                  <span className="text-sm text-gray-500 ml-1">{card.unit}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 size={20} className="text-blue-500" />
                收支趋势分析
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={incomeExpenseData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} name="收入" />
                    <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} name="支出" />
                    <Area type="monotone" dataKey="income" fill="#d1fae5" />
                    <Area type="monotone" dataKey="expense" fill="#fee2e2" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-green-500" />
                KPI指标完成情况
              </h3>
              <div className="space-y-4">
                {kpiData.map((kpi) => (
                  <div key={kpi.name}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{kpi.name}</span>
                      <span className="text-sm font-medium text-gray-900">{kpi.value}%</span>
                    </div>
                    <div className="mt-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${kpi.value >= kpi.target ? 'bg-green-500' : 'bg-yellow-500'}`}
                        style={{ width: `${kpi.value}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">目标: {kpi.target}%</span>
                      <span className={`text-xs font-medium ${kpi.trend === 'up' ? 'text-green-600' : kpi.trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
                        {kpi.trend === 'up' ? '↑' : kpi.trend === 'down' ? '↓' : '→'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <PieChart size={20} className="text-purple-500" />
                合同类型分布
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={contractData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {contractData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle size={20} className="text-yellow-500" />
                风险预警概览
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <span className="font-medium text-gray-900">高风险预警</span>
                  </div>
                  <span className="text-2xl font-bold text-red-600">3</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <span className="font-medium text-gray-900">中风险预警</span>
                  </div>
                  <span className="text-2xl font-bold text-yellow-600">7</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="font-medium text-gray-900">低风险预警</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'budget' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">预算执行对比</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={budgetData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="budget" fill="#3b82f6" name="预算" />
                    <Bar dataKey="actual" fill="#10b981" name="实际执行" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">预算执行率分析</h3>
              <div className="space-y-4">
                {budgetData.map((item) => {
                  const rate = Math.round((item.actual / item.budget) * 100);
                  return (
                    <div key={item.name}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">{item.name}</span>
                        <span className="text-sm font-medium text-gray-900">{rate}%</span>
                      </div>
                      <div className="mt-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all ${rate >= 90 ? 'bg-green-500' : rate >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${rate}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">总预算执行率</span>
                  <span className="text-2xl font-bold text-blue-600">92%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'income' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">收支趋势对比</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={incomeExpenseData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="income" fill="#10b981" name="收入" />
                    <Bar dataKey="expense" fill="#ef4444" name="支出" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">收支统计</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500">总收入</p>
                    <p className="text-2xl font-bold text-green-600">5,350,000</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">同比增长</p>
                    <p className="text-sm font-medium text-green-600">+8.3%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500">总支出</p>
                    <p className="text-2xl font-bold text-red-600">4,860,000</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">同比增长</p>
                    <p className="text-sm font-medium text-red-600">+6.2%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500">收支结余</p>
                    <p className="text-2xl font-bold text-blue-600">490,000</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">结余率</p>
                    <p className="text-sm font-medium text-blue-600">9.2%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'purchase' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">采购类型分布</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={purchaseData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      dataKey="amount"
                      nameKey="type"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {purchaseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">采购统计详情</h3>
              <div className="space-y-4">
                {purchaseData.map((item) => (
                  <div key={item.type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{item.type}</p>
                      <p className="text-sm text-gray-500">{item.count}笔订单</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{(item.amount / 10000).toFixed(1)}万</p>
                      <p className="text-xs text-gray-500">占比 {((item.amount / 1910000) * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">采购总金额</span>
                  <span className="text-2xl font-bold text-purple-600">191万</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'contract' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">合同类型金额分布</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={contractData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={80} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">合同执行状态</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="font-medium text-gray-900">已完成</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">128</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="font-medium text-gray-900">执行中</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">45</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <span className="font-medium text-gray-900">待签署</span>
                  </div>
                  <span className="text-2xl font-bold text-yellow-600">13</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'project' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">项目状态分布</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={projectData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {projectData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">项目统计</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg text-center">
                  <p className="text-3xl font-bold text-blue-600">53</p>
                  <p className="text-sm text-gray-500">项目总数</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg text-center">
                  <p className="text-3xl font-bold text-green-600">28</p>
                  <p className="text-sm text-gray-500">已完成</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg text-center">
                  <p className="text-3xl font-bold text-yellow-600">15</p>
                  <p className="text-sm text-gray-500">进行中</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-3xl font-bold text-gray-600">8</p>
                  <p className="text-sm text-gray-500">待审批</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">项目完成率</span>
                  <span className="text-2xl font-bold text-purple-600">52.8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'asset' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">资产类型分布</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={assetData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      dataKey="value"
                      nameKey="type"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {assetData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">资产统计</h3>
              <div className="space-y-3">
                {assetData.map((item) => (
                  <div key={item.type} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[assetData.indexOf(item) % COLORS.length] }} />
                      <span className="text-sm text-gray-700">{item.type}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-900">{item.value}件</span>
                      <span className="text-xs text-gray-500">{item.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">资产总值</span>
                  <span className="text-2xl font-bold text-cyan-600">520万</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'triple' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle size={20} className="text-red-500" />
              三重一大事项统计
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {tripleMajorData.map((item) => (
                <div key={item.type} className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">{item.type}</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-bold text-gray-900">{item.count}</span>
                    <span className="text-sm text-gray-500">项</span>
                  </div>
                  {item.amount > 0 && (
                    <p className="text-sm text-blue-600 mt-2">涉及金额: {(item.amount / 10000).toFixed(0)}万</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">三重一大执行监控</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-700">决策合规率</span>
                    <span className="text-sm font-medium text-green-600">98%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '98%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-700">流程完成率</span>
                    <span className="text-sm font-medium text-blue-600">95%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '95%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-700">公示及时率</span>
                    <span className="text-sm font-medium text-purple-600">100%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">风险预警</h3>
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-900">大额资金审批超时</span>
                    <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded">待处理</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">涉及金额: 500万</p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-900">重大项目变更未公示</span>
                    <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">紧急</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">项目名称: XX建设工程</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}