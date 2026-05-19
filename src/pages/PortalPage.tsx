import React, { useEffect } from 'react';
import { DollarSign, Briefcase, FileText, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useAppStore } from '../store';
import { api } from '../lib/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#ec4899'];

const budgetChartData = [
  { name: '办公费用', value: 65000, total: 100000 },
  { name: '差旅费', value: 45000, total: 80000 },
  { name: '设备购置', value: 180000, total: 300000 },
  { name: '其他', value: 420000, total: 650000 },
];

export default function PortalPage() {
  const { dashboardStats, projects, expenses, setDashboardStats, setProjects, setExpenses, loading, setLoading } = useAppStore();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [statsRes, projectsRes, expensesRes] = await Promise.all([
          api.getDashboardStats(),
          api.getProjects(),
          api.getExpenses(),
        ]);
        setDashboardStats(statsRes.data);
        setProjects(projectsRes.data);
        setExpenses(expensesRes.data);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [setDashboardStats, setProjects, setExpenses, setLoading]);

  const stats = [
    {
      label: '待审批任务',
      value: dashboardStats?.pendingTasks || 0,
      icon: <Clock className="text-orange-500" size={24} />,
      bgColor: 'bg-orange-50',
      change: '+2 今日新增',
      changeType: 'up',
    },
    {
      label: '预算执行率',
      value: `${dashboardStats?.budgetUsed || 0}%`,
      icon: <DollarSign className="text-blue-500" size={24} />,
      bgColor: 'bg-blue-50',
      change: '+5% 较上月',
      changeType: 'up',
    },
    {
      label: '进行中项目',
      value: dashboardStats?.projectsActive || 0,
      icon: <Briefcase className="text-green-500" size={24} />,
      bgColor: 'bg-green-50',
      change: '1 个已完成',
      changeType: 'down',
    },
    {
      label: '有效合同',
      value: dashboardStats?.contractsActive || 0,
      icon: <FileText className="text-purple-500" size={24} />,
      bgColor: 'bg-purple-50',
      change: '1 个即将到期',
      changeType: 'up',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">欢迎使用行政事业单位内控系统</h1>
        <p className="text-blue-100">今天是 {new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div className={`${stat.bgColor} p-3 rounded-lg`}>{stat.icon}</div>
              <div className={`flex items-center gap-1 text-sm ${stat.changeType === 'up' ? 'text-green-600' : 'text-orange-600'}`}>
                {stat.changeType === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                <span>{stat.change}</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Budget Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">预算执行情况</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">快捷入口</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
              <DollarSign size={20} />
              <span>费用报销申请</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
              <Briefcase size={20} />
              <span>项目立项申请</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
              <FileText size={20} />
              <span>合同审批</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Projects & Expenses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">最近项目</h3>
          <div className="space-y-4">
            {projects.slice(0, 3).map((project) => (
              <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{project.name}</p>
                  <p className="text-sm text-gray-500">{project.department}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-blue-600">¥{(project.usedBudget / 10000).toFixed(1)}万 / ¥{(project.budget / 10000).toFixed(1)}万</p>
                  <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Expenses */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">最近支出</h3>
          <div className="space-y-4">
            {expenses.slice(0, 3).map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{expense.title}</p>
                  <p className="text-sm text-gray-500">{expense.applicant} • {expense.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">¥{expense.amount.toLocaleString()}</p>
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      expense.status === 'approved'
                        ? 'bg-green-100 text-green-700'
                        : expense.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {expense.status === 'approved' ? '已审批' : expense.status === 'pending' ? '待审批' : '已拒绝'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
