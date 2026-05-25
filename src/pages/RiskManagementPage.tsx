import React, { useState } from 'react';
import { Plus, Download, Search, X, AlertTriangle, TrendingUp, Shield, Bell, CheckCircle, BarChart3, PieChart, LineChart, MapPin, FileText, Edit2, Trash2, ChevronRight } from 'lucide-react';
import { PieChart as RePieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart as ReLineChart, Line, Area } from 'recharts';

const riskTypes = [
  { id: '1', name: '财务风险', description: '资金安全、财务报表真实性', color: '#ef4444' },
  { id: '2', name: '运营风险', description: '业务流程、运营效率', color: '#f97316' },
  { id: '3', name: '合规风险', description: '法律法规、政策合规', color: '#eab308' },
  { id: '4', name: '战略风险', description: '战略规划、市场竞争', color: '#22c55e' },
  { id: '5', name: '技术风险', description: '信息系统、数据安全', color: '#3b82f6' },
];

const riskIndicators = [
  { id: '1', name: '预算偏差率', type: '财务风险', threshold: '>10%', status: 'normal' },
  { id: '2', name: '合同逾期率', type: '运营风险', threshold: '>5%', status: 'warning' },
  { id: '3', name: '审计问题数', type: '合规风险', threshold: '>3个', status: 'critical' },
  { id: '4', name: '项目延期率', type: '运营风险', threshold: '>8%', status: 'normal' },
  { id: '5', name: '资金缺口', type: '财务风险', threshold: '>50万', status: 'warning' },
];

const riskMeasures = [
  { id: '1', riskId: '1', name: '加强预算监控', description: '建立月度预算执行分析机制', status: 'implemented' },
  { id: '2', riskId: '2', name: '合同预警机制', description: '提前30天提醒合同到期', status: 'implemented' },
  { id: '3', riskId: '3', name: '审计整改跟踪', description: '建立审计问题整改台账', status: 'pending' },
];

const riskForms = [
  { id: '1', code: 'RF-2024-001', name: '采购流程风险', type: '运营风险', status: 'active', level: 'medium' },
  { id: '2', code: 'RF-2024-002', name: '资金支付风险', type: '财务风险', status: 'resolved', level: 'high' },
  { id: '3', code: 'RF-2024-003', name: '合同合规风险', type: '合规风险', status: 'active', level: 'low' },
];

const riskAlerts = [
  { id: '1', title: '预算超支预警', department: '财务部', date: '2024-05-20', level: 'high', status: 'pending' },
  { id: '2', title: '合同即将到期', department: '采购部', date: '2024-05-19', level: 'medium', status: 'processing' },
  { id: '3', title: '审计问题未整改', department: '审计处', date: '2024-05-18', level: 'high', status: 'pending' },
];

const riskDisposals = [
  { id: '1', alertId: '1', action: '已通知部门负责人核实原因', assignee: '张三', status: 'completed' },
  { id: '2', alertId: '2', action: '已发送合同续签提醒', assignee: '李四', status: 'completed' },
  { id: '3', alertId: '3', action: '已启动整改流程', assignee: '王五', status: 'processing' },
];

const riskStats = {
  total: 15,
  high: 3,
  medium: 7,
  low: 5,
  resolved: 12,
};

const departmentRiskData = [
  { name: '财务部', value: 5 },
  { name: '采购部', value: 4 },
  { name: '审计处', value: 3 },
  { name: '业务部', value: 2 },
  { name: '信息中心', value: 1 },
];

const monthlyTrendData = [
  { month: '1月', count: 8 },
  { month: '2月', count: 12 },
  { month: '3月', count: 10 },
  { month: '4月', count: 15 },
  { month: '5月', count: 13 },
];

const riskTypeData = [
  { name: '财务风险', value: 4, color: '#ef4444' },
  { name: '运营风险', value: 5, color: '#f97316' },
  { name: '合规风险', value: 3, color: '#eab308' },
  { name: '战略风险', value: 2, color: '#22c55e' },
  { name: '技术风险', value: 1, color: '#3b82f6' },
];

const riskTypeDistributionData = [
  { type: '财务风险', color: '#ef4444', x: 75, y: 20, count: 4 },
  { type: '财务风险', color: '#ef4444', x: 82, y: 35, count: 3 },
  { type: '财务风险', color: '#ef4444', x: 68, y: 28, count: 2 },
  { type: '财务风险', color: '#ef4444', x: 90, y: 45, count: 1 },
  
  { type: '运营风险', color: '#f97316', x: 55, y: 55, count: 5 },
  { type: '运营风险', color: '#f97316', x: 62, y: 48, count: 4 },
  { type: '运营风险', color: '#f97316', x: 48, y: 62, count: 3 },
  { type: '运营风险', color: '#f97316', x: 70, y: 42, count: 2 },
  { type: '运营风险', color: '#f97316', x: 45, y: 70, count: 1 },
  
  { type: '合规风险', color: '#eab308', x: 30, y: 40, count: 3 },
  { type: '合规风险', color: '#eab308', x: 25, y: 55, count: 2 },
  { type: '合规风险', color: '#eab308', x: 35, y: 48, count: 1 },
  
  { type: '战略风险', color: '#22c55e', x: 20, y: 75, count: 2 },
  { type: '战略风险', color: '#22c55e', x: 28, y: 82, count: 1 },
  
  { type: '技术风险', color: '#3b82f6', x: 88, y: 15, count: 1 },
];

const riskAssessmentData = [
  { id: '1', name: '资金流动性风险', likelihood: 70, impact: 80, type: '财务风险' },
  { id: '2', name: '采购流程风险', likelihood: 60, impact: 50, type: '运营风险' },
  { id: '3', name: '合同合规风险', likelihood: 50, impact: 70, type: '合规风险' },
  { id: '4', name: '系统安全风险', likelihood: 40, impact: 90, type: '技术风险' },
  { id: '5', name: '市场竞争风险', likelihood: 30, impact: 60, type: '战略风险' },
];

const getLevelColor = (level: string) => {
  switch (level) {
    case 'high': return 'bg-red-100 text-red-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'low': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getLevelText = (level: string) => {
  switch (level) {
    case 'high': return '高风险';
    case 'medium': return '中风险';
    case 'low': return '低风险';
    default: return '未知';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-red-100 text-red-800';
    case 'resolved': return 'bg-green-100 text-green-800';
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'processing': return 'bg-blue-100 text-blue-800';
    case 'completed': return 'bg-green-100 text-green-800';
    case 'implemented': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'active': return '活跃';
    case 'resolved': return '已解决';
    case 'pending': return '待处理';
    case 'processing': return '处理中';
    case 'completed': return '已完成';
    case 'implemented': return '已实施';
    default: return '未知';
  }
};

export default function RiskManagementPage() {
  const [activeTab, setActiveTab] = useState('identify');
  const [showModal, setShowModal] = useState<string | null>(null);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">风险管理</h1>
          <p className="text-gray-500 mt-1">风险识别评估、指标库管理与风险应对处置</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <Download size={18} />
            导出报表
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus size={18} />
            新增风险
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <AlertTriangle size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">总风险数</p>
              <p className="text-2xl font-bold text-gray-900">{riskStats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle size={20} className="text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">高风险</p>
              <p className="text-2xl font-bold text-red-600">{riskStats.high}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <AlertTriangle size={20} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">中风险</p>
              <p className="text-2xl font-bold text-yellow-600">{riskStats.medium}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">低风险</p>
              <p className="text-2xl font-bold text-green-600">{riskStats.low}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <TrendingUp size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">已解决</p>
              <p className="text-2xl font-bold text-blue-600">{riskStats.resolved}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex border-b border-gray-100 overflow-x-auto">
          <button
            onClick={() => setActiveTab('identify')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'identify' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            风险识别评估
          </button>
          <button
            onClick={() => setActiveTab('indicators')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'indicators' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            风险指标库
          </button>
          <button
            onClick={() => setActiveTab('measures')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'measures' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            风险措施库
          </button>
          <button
            onClick={() => setActiveTab('response')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'response' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            风险业务应付
          </button>
          <button
            onClick={() => setActiveTab('monitor')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'monitor' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            风险监控统计
          </button>
          <button
            onClick={() => setActiveTab('evaluation')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'evaluation' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            风险评价管理
          </button>
        </div>

        {activeTab === 'identify' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">风险类型管理</h3>
                <div className="space-y-3">
                  {riskTypes.map((type) => (
                    <div key={type.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }} />
                        <div>
                          <h4 className="font-medium text-gray-900">{type.name}</h4>
                          <p className="text-sm text-gray-500">{type.description}</p>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800">
                        <Edit2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">风险坐标图</h3>
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="relative h-96">
                    <div className="absolute inset-0">
                      <svg viewBox="0 0 400 400" className="w-full h-full">
                        <rect x="20" y="20" width="180" height="180" fill="#fef2f2" opacity="0.6" />
                        <rect x="200" y="20" width="180" height="180" fill="#fef9c3" opacity="0.6" />
                        <rect x="20" y="200" width="180" height="180" fill="#fef9c3" opacity="0.6" />
                        <rect x="200" y="200" width="180" height="180" fill="#f0fdf4" opacity="0.6" />
                        
                        <text x="110" y="110" fill="#dc2626" textAnchor="middle" fontSize="14" fontWeight="500">高风险</text>
                        <text x="290" y="110" fill="#ca8a04" textAnchor="middle" fontSize="14" fontWeight="500">中风险</text>
                        <text x="110" y="290" fill="#ca8a04" textAnchor="middle" fontSize="14" fontWeight="500">中风险</text>
                        <text x="290" y="290" fill="#16a34a" textAnchor="middle" fontSize="14" fontWeight="500">低风险</text>
                        
                        <line x1="20" y1="200" x2="380" y2="200" stroke="#d1d5db" strokeWidth="2" />
                        <line x1="200" y1="20" x2="200" y2="380" stroke="#d1d5db" strokeWidth="2" />
                        
                        <text x="385" y="205" fill="#374151" fontSize="14" fontWeight="600">可能性</text>
                        <text x="200" y="15" fill="#374151" textAnchor="middle" fontSize="14" fontWeight="600">影响程度</text>
                        
                        <text x="20" y="215" fill="#6b7280" fontSize="12">低</text>
                        <text x="200" y="215" fill="#6b7280" textAnchor="middle" fontSize="12">中</text>
                        <text x="380" y="215" fill="#6b7280" textAnchor="end" fontSize="12">高</text>
                        
                        <text x="10" y="205" fill="#6b7280" textAnchor="end" fontSize="12">低</text>
                        <text x="10" y="20" fill="#6b7280" textAnchor="end" fontSize="12">高</text>
                        
                        {riskAssessmentData.map((risk) => {
                          const color = risk.type === '财务风险' ? '#ef4444' : risk.type === '运营风险' ? '#f97316' : risk.type === '合规风险' ? '#eab308' : risk.type === '技术风险' ? '#3b82f6' : '#22c55e';
                          return (
                            <g key={risk.id}>
                              <circle
                                cx={20 + (risk.likelihood / 100) * 360}
                                cy={380 - (risk.impact / 100) * 360}
                                r="12"
                                fill={color}
                                opacity="0.9"
                                stroke="white"
                                strokeWidth="2"
                              />
                              <text
                                x={20 + (risk.likelihood / 100) * 360}
                                y={380 - (risk.impact / 100) * 360 + 4}
                                fill="white"
                                textAnchor="middle"
                                fontSize="10"
                                fontWeight="bold"
                              >
                                {risk.id}
                              </text>
                            </g>
                          );
                        })}
                      </svg>
                    </div>
                  </div>
                  
                  <div className="mt-6 border-t pt-4">
                    <div className="flex flex-wrap gap-6 justify-center">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-red-500" />
                        <span className="text-sm text-gray-700">财务风险</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-orange-500" />
                        <span className="text-sm text-gray-700">运营风险</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-yellow-500" />
                        <span className="text-sm text-gray-700">合规风险</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-blue-500" />
                        <span className="text-sm text-gray-700">技术风险</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-500" />
                        <span className="text-sm text-gray-700">战略风险</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">风险详情</h4>
                    <div className="space-y-2">
                      {riskAssessmentData.map((risk) => {
                        const color = risk.type === '财务风险' ? '#ef4444' : risk.type === '运营风险' ? '#f97316' : risk.type === '合规风险' ? '#eab308' : risk.type === '技术风险' ? '#3b82f6' : '#22c55e';
                        const level = risk.likelihood * risk.impact > 5000 ? 'high' : risk.likelihood * risk.impact > 2500 ? 'medium' : 'low';
                        return (
                          <div key={risk.id} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                                style={{ backgroundColor: color }}
                              >
                                {risk.id}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{risk.name}</p>
                                <p className="text-xs text-gray-500">{risk.type}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-center">
                                <p className="text-xs text-gray-500">可能性</p>
                                <p className="text-sm font-semibold text-gray-900">{risk.likelihood}%</p>
                              </div>
                              <div className="text-center">
                                <p className="text-xs text-gray-500">影响程度</p>
                                <p className="text-sm font-semibold text-gray-900">{risk.impact}%</p>
                              </div>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${level === 'high' ? 'bg-red-100 text-red-800' : level === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                {level === 'high' ? '高风险' : level === 'medium' ? '中风险' : '低风险'}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">风险评估列表</h3>
              <div className="space-y-3">
                {riskAssessmentData.map((risk) => (
                  <div key={risk.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                    <div>
                      <h4 className="font-medium text-gray-900">{risk.name}</h4>
                      <span className="text-sm text-gray-500">{risk.type}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-500">可能性</p>
                        <p className="font-medium text-gray-900">{risk.likelihood}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">影响程度</p>
                        <p className="font-medium text-gray-900">{risk.impact}%</p>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        查看详情
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'indicators' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">风险指标库</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus size={18} />
                添加指标
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {riskIndicators.map((indicator) => (
                <div key={indicator.id} className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{indicator.name}</h4>
                      <span className="text-sm text-gray-500">{indicator.type}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${indicator.status === 'critical' ? 'bg-red-100 text-red-800' : indicator.status === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                      {indicator.status === 'critical' ? '严重' : indicator.status === 'warning' ? '警告' : '正常'}
                    </span>
                  </div>
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">阈值: <span className="font-medium">{indicator.threshold}</span></p>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                      编辑
                    </button>
                    <button className="px-3 py-1 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50">
                      删除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'measures' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">风险措施库</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus size={18} />
                添加措施
              </button>
            </div>
            <div className="space-y-4">
              {riskMeasures.map((measure) => (
                <div key={measure.id} className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{measure.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">{measure.description}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(measure.status)}`}>
                      {getStatusText(measure.status)}
                    </span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                      查看详情
                    </button>
                    <button className="px-3 py-1 text-sm text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50">
                      编辑
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'response' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">风险表单</h3>
                  <div className="space-y-3">
                    {riskForms.map((form) => (
                      <div key={form.id} className="border border-gray-200 rounded-xl p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-500">{form.code}</span>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getLevelColor(form.level)}`}>
                                {getLevelText(form.level)}
                              </span>
                            </div>
                            <h4 className="font-semibold text-gray-900 mt-1">{form.name}</h4>
                            <span className="text-sm text-gray-500">{form.type}</span>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(form.status)}`}>
                            {getStatusText(form.status)}
                          </span>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <button className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                            关联流程
                          </button>
                          <button className="px-3 py-1 text-sm text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50">
                            设置动态风险
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">风险处置记录</h3>
                  <div className="space-y-3">
                    {riskDisposals.map((disposal) => (
                      <div key={disposal.id} className="border border-gray-200 rounded-xl p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">{disposal.action}</h4>
                            <p className="text-sm text-gray-500 mt-1">负责人: {disposal.assignee}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(disposal.status)}`}>
                            {getStatusText(disposal.status)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <Bell size={18} className="text-yellow-500" />
                    风险预警
                  </h4>
                  <div className="space-y-3">
                    {riskAlerts.map((alert) => (
                      <div key={alert.id} className="p-3 bg-white rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <h5 className="font-medium text-gray-900 text-sm">{alert.title}</h5>
                            <p className="text-xs text-gray-500 mt-1">{alert.department} · {alert.date}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getLevelColor(alert.level)}`}>
                            {getLevelText(alert.level)}
                          </span>
                        </div>
                        <button className="mt-2 w-full py-1.5 text-sm text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50">
                          处理预警
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">快捷操作</h4>
                  <div className="space-y-2">
                    <button className="w-full py-2 text-left text-sm text-gray-700 bg-white rounded-lg hover:bg-gray-100 px-3">
                      <ChevronRight size={16} className="inline mr-2" />
                      关联流程风险
                    </button>
                    <button className="w-full py-2 text-left text-sm text-gray-700 bg-white rounded-lg hover:bg-gray-100 px-3">
                      <ChevronRight size={16} className="inline mr-2" />
                      设置动态风险
                    </button>
                    <button className="w-full py-2 text-left text-sm text-gray-700 bg-white rounded-lg hover:bg-gray-100 px-3">
                      <ChevronRight size={16} className="inline mr-2" />
                      配置预警规则
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'monitor' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin size={20} />
                  风险类型分布
                </h3>
                <div className="relative h-96">
                  <svg viewBox="0 0 500 400" className="w-full h-full">
                    <rect x="50" y="30" width="200" height="170" fill="#fef2f2" opacity="0.6" />
                    <rect x="250" y="30" width="200" height="170" fill="#fef9c3" opacity="0.6" />
                    <rect x="50" y="200" width="200" height="170" fill="#fef9c3" opacity="0.6" />
                    <rect x="250" y="200" width="200" height="170" fill="#f0fdf4" opacity="0.6" />
                    
                    <text x="150" y="115" fill="#dc2626" textAnchor="middle" fontSize="12" fontWeight="500">高风险区</text>
                    <text x="350" y="115" fill="#ca8a04" textAnchor="middle" fontSize="12" fontWeight="500">中风险区</text>
                    <text x="150" y="285" fill="#ca8a04" textAnchor="middle" fontSize="12" fontWeight="500">中风险区</text>
                    <text x="350" y="285" fill="#16a34a" textAnchor="middle" fontSize="12" fontWeight="500">低风险区</text>
                    
                    <line x1="50" y1="200" x2="450" y2="200" stroke="#d1d5db" strokeWidth="2" />
                    <line x1="250" y1="30" x2="250" y2="370" stroke="#d1d5db" strokeWidth="2" />
                    
                    <text x="460" y="205" fill="#374151" fontSize="12" fontWeight="600">影响程度</text>
                    <text x="250" y="20" fill="#374151" textAnchor="middle" fontSize="12" fontWeight="600">发生频率</text>
                    
                    <text x="50" y="215" fill="#6b7280" fontSize="10">低</text>
                    <text x="250" y="215" fill="#6b7280" textAnchor="middle" fontSize="10">中</text>
                    <text x="450" y="215" fill="#6b7280" textAnchor="end" fontSize="10">高</text>
                    
                    <text x="240" y="380" fill="#6b7280" textAnchor="end" fontSize="10">低</text>
                    <text x="240" y="40" fill="#6b7280" textAnchor="end" fontSize="10">高</text>
                    
                    {riskTypeDistributionData.map((item, index) => {
                      const x = 50 + (item.x / 100) * 400;
                      const y = 370 - (item.y / 100) * 340;
                      return (
                        <g key={index}>
                          <circle
                            cx={x}
                            cy={y}
                            r={6 + item.count * 2}
                            fill={item.color}
                            opacity="0.8"
                            stroke="white"
                            strokeWidth="2"
                          />
                        </g>
                      );
                    })}
                  </svg>
                </div>
                
                <div className="mt-6 border-t pt-4">
                  <div className="flex flex-wrap gap-4 justify-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="text-sm text-gray-700">财务风险</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500" />
                      <span className="text-sm text-gray-700">运营风险</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span className="text-sm text-gray-700">合规风险</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-sm text-gray-700">战略风险</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      <span className="text-sm text-gray-700">技术风险</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <BarChart3 size={20} />
                  部门风险统计
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={departmentRiskData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <LineChart size={20} />
                  月份风险趋势
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <ReLineChart data={monthlyTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} />
                      <Area type="monotone" dataKey="count" fill="#dbeafe" />
                    </ReLineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin size={20} />
                  风险分布图
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-red-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-red-600">{riskStats.high}</p>
                    <p className="text-sm text-gray-600">高风险</p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-yellow-600">{riskStats.medium}</p>
                    <p className="text-sm text-gray-600">中风险</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">{riskStats.low}</p>
                    <p className="text-sm text-gray-600">低风险</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-blue-600">{riskStats.resolved}</p>
                    <p className="text-sm text-gray-600">已解决</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'evaluation' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText size={20} className="text-blue-500" />
                  自我评价
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">评价周期</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>2024年度</option>
                      <option>2024上半年</option>
                      <option>2024下半年</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">评价得分</label>
                    <div className="flex items-center gap-3">
                      <input type="range" min="0" max="100" defaultValue="85" className="flex-1" />
                      <span className="font-semibold text-gray-900">85</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">评价说明</label>
                    <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg" rows={3} placeholder="请输入评价说明..."></textarea>
                  </div>
                  <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    提交评价
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText size={20} className="text-green-500" />
                  评价报告
                </h3>
                <div className="space-y-3">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">2024年度风险评价报告</h4>
                      <span className="text-sm text-green-600">已生成</span>
                    </div>
                    <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
                      下载报告
                    </button>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">2024上半年风险评价报告</h4>
                      <span className="text-sm text-green-600">已生成</span>
                    </div>
                    <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
                      下载报告
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertTriangle size={20} className="text-yellow-500" />
                  缺陷整改
                </h3>
                <div className="space-y-3">
                  <div className="p-4 bg-red-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">审计问题整改</h4>
                        <p className="text-sm text-gray-500 mt-1">3个问题待整改</p>
                      </div>
                      <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">待整改</span>
                    </div>
                    <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
                      开始整改
                    </button>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">流程优化建议</h4>
                        <p className="text-sm text-gray-500 mt-1">已完成整改</p>
                      </div>
                      <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">已完成</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">新增风险</h3>
              <button onClick={() => setShowModal(null)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">风险名称</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="输入风险名称" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">风险类型</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  {riskTypes.map((type) => (
                    <option key={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowModal(null)} className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100">
                  取消
                </button>
                <button onClick={() => setShowModal(null)} className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
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
