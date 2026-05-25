import React, { useEffect } from 'react';
import { DollarSign, Briefcase, FileText, Clock, ArrowUpRight, ArrowDownRight, TrendingUp, Users, AlertCircle } from 'lucide-react';
import { useAppStore } from '../store';
import { api } from '../lib/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const budgetChartData = [
  { name: '办公费用', value: 65000, total: 100000, color: '#667eea' },
  { name: '差旅费', value: 45000, total: 80000, color: '#764ba2' },
  { name: '设备购置', value: 180000, total: 300000, color: '#f093fb' },
  { name: '其他', value: 420000, total: 650000, color: '#4facfe' },
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
      icon: <Clock className="text-white" size={24} />,
      gradient: 'from-orange-500 to-rose-500',
      shadowColor: 'rgba(251, 146, 60, 0.3)',
      change: '+2 今日新增',
      changeType: 'up',
    },
    {
      label: '预算执行率',
      value: `${dashboardStats?.budgetUsed || 0}%`,
      icon: <DollarSign className="text-white" size={24} />,
      gradient: 'from-indigo-500 to-purple-600',
      shadowColor: 'rgba(99, 102, 241, 0.3)',
      change: '+5% 较上月',
      changeType: 'up',
    },
    {
      label: '进行中项目',
      value: dashboardStats?.projectsActive || 0,
      icon: <Briefcase className="text-white" size={24} />,
      gradient: 'from-emerald-500 to-teal-600',
      shadowColor: 'rgba(16, 185, 129, 0.3)',
      change: '1 个已完成',
      changeType: 'down',
    },
    {
      label: '有效合同',
      value: dashboardStats?.contractsActive || 0,
      icon: <FileText className="text-white" size={24} />,
      gradient: 'from-pink-500 to-rose-600',
      shadowColor: 'rgba(236, 72, 153, 0.3)',
      change: '1 个即将到期',
      changeType: 'warning',
    },
  ];

  const quickActions = [
    { label: '费用报销申请', icon: DollarSign, gradient: 'from-blue-500 to-indigo-600', description: '提交费用报销单据' },
    { label: '项目立项申请', icon: Briefcase, gradient: 'from-emerald-500 to-teal-600', description: '发起新项目立项' },
    { label: '合同审批', icon: FileText, gradient: 'from-purple-500 to-pink-600', description: '审批合同流程' },
    { label: '预算调整', icon: TrendingUp, gradient: 'from-orange-500 to-red-600', description: '调整预算分配' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 p-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 mb-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/10 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1">欢迎回来，管理员</h1>
              <p className="text-indigo-100 text-sm">今天是 {new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-sm text-indigo-100 mb-1">今日待办</div>
              <div className="text-2xl font-bold">12 项</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-sm text-indigo-100 mb-1">本月支出</div>
              <div className="text-2xl font-bold">¥285.6万</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-sm text-indigo-100 mb-1">系统消息</div>
              <div className="text-2xl font-bold flex items-center gap-2">
                3 <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 card-hover"
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                  stat.changeType === 'up' ? 'bg-emerald-100 text-emerald-700' :
                  stat.changeType === 'warning' ? 'bg-amber-100 text-amber-700' :
                  'bg-rose-100 text-rose-700'
                }`}>
                  {stat.changeType === 'up' ? <ArrowUpRight size={12} /> : 
                   stat.changeType === 'warning' ? <AlertCircle size={12} /> : 
                   <ArrowDownRight size={12} />}
                  {stat.change}
                </div>
              </div>
              
              <div className="mt-6">
                <p className="text-3xl font-bold text-slate-900 group-hover:text-white transition-colors duration-300">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-500 mt-1 group-hover:text-white/80 transition-colors duration-300">
                  {stat.label}
                </p>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500" />
          </div>
        ))}
      </div>

      {/* Charts & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Budget Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">预算执行情况</h3>
              <p className="text-sm text-slate-500 mt-1">实时监控各项目预算使用进度</p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">本季度</span>
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetChartData} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white',
                    boxShadow: '0 10px 40px rgba(102, 126, 234, 0.3)',
                  }}
                  formatter={(value) => [`¥${value.toLocaleString()}`, '已使用']}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {budgetChartData.map((entry, index) => (
                    <rect key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-xl font-bold text-slate-900 mb-6">快捷入口</h3>
          <div className="space-y-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  className="w-full group relative overflow-hidden bg-gradient-to-r from-slate-50 to-slate-100 hover:from-indigo-50 hover:to-purple-50 rounded-xl p-4 transition-all duration-300 text-left card-shine"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                      <Icon size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors">
                        {action.label}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">{action.description}</div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Projects & Expenses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">最近项目</h3>
              <p className="text-sm text-slate-500 mt-1">查看项目进度和状态</p>
            </div>
            <button className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-xl text-sm font-medium hover:bg-indigo-200 transition-colors">
              查看全部
            </button>
          </div>
          
          <div className="space-y-4">
            {projects.slice(0, 3).map((project, index) => (
              <div
                key={project.id}
                className="group p-4 bg-gradient-to-r from-slate-50 to-slate-100/50 hover:from-indigo-50 hover:to-purple-50 rounded-xl transition-all duration-300 table-row-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors">
                      {project.name}
                    </p>
                    <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                      <Users size={14} />
                      {project.department}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      ¥{(project.usedBudget / 10000).toFixed(1)}万 / ¥{(project.budget / 10000).toFixed(1)}万
                    </p>
                    <div className="w-32 h-2 bg-slate-200 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Expenses */}
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">最近支出</h3>
              <p className="text-sm text-slate-500 mt-1">最新费用报销记录</p>
            </div>
            <button className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl text-sm font-medium hover:bg-emerald-200 transition-colors">
              查看全部
            </button>
          </div>
          
          <div className="space-y-4">
            {expenses.slice(0, 3).map((expense, index) => (
              <div
                key={expense.id}
                className="group p-4 bg-gradient-to-r from-slate-50 to-slate-100/50 hover:from-emerald-50 hover:to-teal-50 rounded-xl transition-all duration-300 table-row-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {expense.title}
                    </p>
                    <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                      <Users size={14} />
                      {expense.applicant} • {expense.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      ¥{expense.amount.toLocaleString()}
                    </p>
                    <span
                      className={`inline-block px-3 py-1 text-xs rounded-full font-medium mt-2 ${
                        expense.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-700'
                          : expense.status === 'pending'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {expense.status === 'approved' ? '已审批' : expense.status === 'pending' ? '待审批' : '已拒绝'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
